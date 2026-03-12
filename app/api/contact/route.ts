import { NextResponse } from "next/server";

import { contactInquirySchema } from "@/lib/forms";
import { captureLead } from "@/lib/lead-capture";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as unknown;
    if (
      payload &&
      typeof payload === "object" &&
      "website" in payload &&
      typeof payload.website === "string" &&
      payload.website.trim().length > 0
    ) {
      return NextResponse.json({ message: "Thanks. We have your enquiry." });
    }
    const parsed = contactInquirySchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message || "Invalid submission." },
        { status: 400 },
      );
    }

    await captureLead({
      type: "contact",
      payload: parsed.data,
    });

    return NextResponse.json({
      message:
        "Thanks. Agree Superfoods has received your enquiry and will respond within one business day.",
    });
  } catch (error) {
    console.error("Contact enquiry failed", error);

    return NextResponse.json(
      { message: "We could not submit your enquiry right now. Please try again shortly." },
      { status: 500 },
    );
  }
}
