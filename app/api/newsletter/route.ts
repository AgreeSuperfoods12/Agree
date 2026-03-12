import { NextResponse } from "next/server";

import { newsletterSignupSchema } from "@/lib/forms";
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
      return NextResponse.json({ message: "Thanks. You are subscribed." });
    }
    const parsed = newsletterSignupSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message || "Invalid newsletter signup." },
        { status: 400 },
      );
    }

    await captureLead({
      type: "newsletter",
      payload: parsed.data,
    });

    return NextResponse.json({
      message: "Thanks. You are subscribed for Agree Superfoods updates and new content.",
    });
  } catch (error) {
    console.error("Newsletter signup failed", error);

    return NextResponse.json(
      { message: "We could not complete your signup right now. Please try again shortly." },
      { status: 500 },
    );
  }
}
