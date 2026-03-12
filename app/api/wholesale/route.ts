import { NextResponse } from "next/server";

import { wholesaleInquirySchema } from "@/lib/forms";
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
    const parsed = wholesaleInquirySchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message || "Invalid submission." },
        { status: 400 },
      );
    }

    await captureLead({
      type: "wholesale",
      payload: parsed.data,
    });

    return NextResponse.json({
      message:
        "Thanks. Your Agree Superfoods bulk or wholesale enquiry has been received and the team will follow up shortly.",
    });
  } catch (error) {
    console.error("Wholesale enquiry failed", error);

    return NextResponse.json(
      { message: "We could not submit your enquiry right now. Please try again shortly." },
      { status: 500 },
    );
  }
}
