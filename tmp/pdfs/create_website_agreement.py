from pathlib import Path

from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer


OUTPUT = Path("output/pdf/endo-website-services-agreement.pdf")
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

styles = getSampleStyleSheet()
body = ParagraphStyle(
    "Body",
    parent=styles["BodyText"],
    fontName="Helvetica",
    fontSize=10.25,
    leading=14,
    spaceAfter=6,
)
heading = ParagraphStyle(
    "Heading",
    parent=body,
    fontName="Helvetica-Bold",
    spaceBefore=5,
    spaceAfter=2,
)
title = ParagraphStyle(
    "Title",
    parent=body,
    fontName="Helvetica-Bold",
    fontSize=14,
    leading=18,
    spaceAfter=12,
)


def p(text, style=body):
    return Paragraph(text, style)


story = [
    p("WEBSITE PROJECT AGREEMENT", title),
    p("<b>Date:</b> August 16, 2026"),
    p("<b>Prepared by:</b> Will Kusch"),
    p("<b>Company:</b> Relative Companies, Inc."),
    p("<b>Project:</b> Endo website buildout"),
    Spacer(1, 4),
    p("PROJECT PRICE", heading),
    p("The total project price is <b>$1,500 USD</b>."),
    p("- <b>$750 due upfront</b> before work begins"),
    p("- <b>$750 due upon completion</b> before the final website launch and project transfer"),
    p("WHAT IS INCLUDED", heading),
    p(
        "Completion of the remaining website pages based on the approved landing-page design, responsive "
        "desktop and mobile implementation, reasonable copy adjustments, testing, deployment to the client's "
        "hosting account, connection of one domain, and transfer of the Git repository after final payment."
    ),
    p("REVISIONS AND SCOPE", heading),
    p(
        "The price includes up to <b>two reasonable rounds of revisions</b> to the agreed website pages. Small "
        "adjustments such as copy edits, color tweaks, spacing, and similar details are no big deal and are included; "
        "they should simply be grouped into one combined feedback list for each round."
    ),
    p(
        "The revision limit gives both sides a clear finish line and prevents the project from turning into an "
        "open-ended cycle that could continue indefinitely. New pages, new features, major redesigns, additional "
        "revision rounds, or repeated changes to previously approved work are outside the $1,500 project scope and "
        "will require separate written pricing before that extra work begins."
    ),
    p("CLIENT MATERIALS AND TIMING", heading),
    p(
        "The client will provide needed copy, images, account access, and feedback in a timely manner. Delays in "
        "receiving these items may move the completion date. Relative Companies, Inc. is not responsible for delays "
        "caused by the client's hosting provider, domain provider, or other third-party services."
    ),
    p("COMPLETION AND HANDOFF", heading),
    p(
        "The project is considered complete when the agreed pages are built and the included revision rounds are "
        "finished. The final balance is then due. The production launch, domain connection, and Git repository "
        "transfer will be completed after full payment is received and the client provides the required account access."
    ),
    p("AGREEMENT", heading),
    p(
        "Payment of the $750 upfront amount confirms the client's acceptance of this project scope, price, payment "
        "schedule, and revision terms. Any change to these terms must be agreed to in writing."
    ),
]

doc = SimpleDocTemplate(
    str(OUTPUT),
    pagesize=LETTER,
    leftMargin=0.75 * inch,
    rightMargin=0.75 * inch,
    topMargin=0.65 * inch,
    bottomMargin=0.65 * inch,
    title="Endo Website Project Agreement",
    author="Will Kusch - Relative Companies, Inc.",
)
doc.build(story)
print(OUTPUT.resolve())
