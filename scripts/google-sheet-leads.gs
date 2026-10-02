// Google Apps Script for the "Endo demo leads" sheet. Paste this into the sheet (Extensions → Apps Script),
// set the SHARED_SECRET script property, and deploy it as a web app. README.md → "Demo requests" has the steps.
//
// The website (lib/leads-sheet.ts) POSTs JSON here with one of three actions:
//   create   – a /contact form submission: adds a row with status "form_submitted".
//   booked   – a Calendly booking: finds the row by lead ID, else the latest row with the same email,
//              else adds a row, and marks it "booked".
//   canceled – a Calendly cancellation: finds the row by Calendly invitee and marks it "cancelled",
//              or "rescheduled" when the invitee picked a new time (the new booking then marks it "booked" again).
//
// Columns are looked up by their header text in row 1 of the first tab, so they can be reordered,
// and new columns can be added to the right.

const STATUS = { submitted: "form_submitted", booked: "booked", cancelled: "cancelled", rescheduled: "rescheduled" };

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply({ ok: false, error: "Invalid JSON" });
  }

  const secret = PropertiesService.getScriptProperties().getProperty("SHARED_SECRET");
  if (!secret || body.secret !== secret) return reply({ ok: false, error: "Unauthorized" });

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const table = readTable(SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]);
    if (body.action === "create") createLead(table, body.lead);
    else if (body.action === "booked") markBooked(table, body);
    else if (body.action === "canceled") markCanceled(table, body);
    else return reply({ ok: false, error: "Unknown action" });
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function createLead(table, lead) {
  writeRow(table, -1, {
    "Lead ID": lead.leadId,
    "Submitted at": toDate(lead.submittedAt),
    "Name": lead.name,
    "Email": lead.email,
    "Role": lead.role,
    "Athletes": lead.athletes,
    "Help with": lead.helpWith,
    "Sports": lead.sports,
    "Status": STATUS.submitted,
    "Updated at": new Date(),
    "Source page": lead.sourcePage,
    "UTM source": lead.utmSource,
    "UTM medium": lead.utmMedium,
    "UTM campaign": lead.utmCampaign,
  });
}

function markBooked(table, booking) {
  let index = booking.leadId ? findRow(table, "Lead ID", booking.leadId) : -1;
  if (index < 0 && booking.email) index = findRow(table, "Email", booking.email.toLowerCase());

  const fields = {
    "Status": STATUS.booked,
    "Calendly event": booking.eventUri,
    "Calendly invitee": booking.inviteeUri,
    "Cancelled at": "",
    "Updated at": new Date(),
  };
  if (booking.meetingStart) fields["Meeting start"] = toDate(booking.meetingStart);

  if (index < 0) {
    // Booked without a matching form submission (a direct Calendly link, or the form save failed).
    fields["Lead ID"] = booking.leadId;
    fields["Name"] = booking.name;
    fields["Email"] = booking.email.toLowerCase();
    fields["Booked at"] = new Date();
    fields["Source page"] = booking.leadId ? "" : "Calendly (no form)";
    writeRow(table, -1, fields);
    return;
  }

  const row = table.rows[index];
  if (!row[table.col("Booked at")]) fields["Booked at"] = new Date();
  if (!row[table.col("Name")] && booking.name) fields["Name"] = booking.name;
  if (!row[table.col("Email")] && booking.email) fields["Email"] = booking.email.toLowerCase();
  writeRow(table, index, fields);
}

function markCanceled(table, cancellation) {
  // Matching on the invitee means a late cancellation of an old time can't undo a newer booking.
  const index = findRow(table, "Calendly invitee", cancellation.inviteeUri);
  if (index < 0) return;
  writeRow(table, index, cancellation.rescheduled
    ? { "Status": STATUS.rescheduled, "Updated at": new Date() }
    : { "Status": STATUS.cancelled, "Cancelled at": new Date(), "Updated at": new Date() });
}

function readTable(sheet) {
  const values = sheet.getDataRange().getValues();
  const headers = values[0].map(String);
  return {
    sheet: sheet,
    headers: headers,
    rows: values.slice(1),
    col: function (name) {
      const i = headers.indexOf(name);
      if (i < 0) throw new Error('The sheet is missing the "' + name + '" column');
      return i;
    },
  };
}

// The newest matching row, as an index into table.rows, or -1.
function findRow(table, column, value) {
  const c = table.col(column);
  for (let i = table.rows.length - 1; i >= 0; i--) {
    if (String(table.rows[i][c]).toLowerCase() === String(value).toLowerCase()) return i;
  }
  return -1;
}

// Writes fields into row `index` of table.rows, or appends a new row when index is -1.
function writeRow(table, index, fields) {
  const row = index < 0 ? table.headers.map(function () { return ""; }) : table.rows[index].slice();
  Object.keys(fields).forEach(function (name) { row[table.col(name)] = fields[name]; });
  // Every cell is escaped, not just the new ones: reading a row back drops the escape from text cells.
  const out = row.map(safe);
  if (index < 0) {
    table.sheet.appendRow(out);
    table.rows.push(row);
  } else {
    table.sheet.getRange(index + 2, 1, 1, out.length).setValues([out]);
    table.rows[index] = row;
  }
}

// Form text that starts like a formula is stored as plain text, so a submission can't run a formula in the sheet.
function safe(value) {
  if (value === undefined || value === null) return "";
  return typeof value === "string" && /^[=+\-@]/.test(value) ? "'" + value : value;
}

function toDate(iso) {
  const date = new Date(iso);
  return isNaN(date.getTime()) ? "" : date;
}

function reply(result) {
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
