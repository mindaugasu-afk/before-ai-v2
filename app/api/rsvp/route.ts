import { createWixRsvp } from "../../wix-events";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const eventId = getString(body?.eventId);
  const fullName = getString(body?.fullName);
  const email = getString(body?.email);

  if (!eventId || !fullName || !email) {
    return Response.json(
      { error: "Event, name, and email are required." },
      { status: 400 },
    );
  }

  try {
    const result = await createWixRsvp({ eventId, fullName, email });

    return Response.json(result);
  } catch (error) {
    console.error("Failed to create Wix RSVP", error);

    return Response.json(
      { error: "Wix Events could not accept this RSVP yet." },
      { status: 502 },
    );
  }
}

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}
