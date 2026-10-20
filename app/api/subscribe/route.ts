import { attioKey, saveSubscriber, type Subscriber } from "@/lib/attio";

const FIELDS = ["email", "sourcePage", "landingPage", "referrer", "utmSource", "utmMedium", "utmCampaign"] as const satisfies readonly (keyof Subscriber)[];

// Saves a footer newsletter signup to Attio. Unlike booking, a failure here is shown, since nothing
// else would have recorded the email.
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: "Invalid request" }, { status: 400 });

  // Hidden field only bots fill in: pretend it worked and store nothing.
  if (typeof body.website === "string" && body.website !== "") return Response.json({ ok: true });

  const subscriber = Object.fromEntries(FIELDS.map((field) => [field, String(body[field] ?? "").trim().slice(0, 500)])) as Subscriber;
  subscriber.email = subscriber.email.toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(subscriber.email)) {
    return Response.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  if (!attioKey()) {
    console.warn("ATTIO_API_KEY is not set; newsletter signup not saved:", subscriber.email);
    return Response.json({ ok: true });
  }
  try {
    await saveSubscriber(subscriber);
  } catch (error) {
    console.error("Saving newsletter signup to Attio failed", error);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
