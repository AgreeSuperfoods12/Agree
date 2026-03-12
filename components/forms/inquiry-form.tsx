"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type InquiryMode = "contact" | "wholesale";

interface InquiryFormProps {
  mode: InquiryMode;
}

type SubmissionState =
  | { status: "idle"; message?: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const contactInterestOptions = [
  "General enquiry",
  "Product information",
  "Retail or distribution",
  "Press or media",
];
const businessTypeOptions = ["Retailer", "Distributor", "Hospitality", "Corporate / gifting"];

const modeContent = {
  contact: {
    eyebrow: "General enquiries",
    title: "Tell us what you need help with.",
    description:
      "Use this form for product questions, gifting interest, retail conversations, or a first introduction to the brand.",
    submitLabel: "Send message",
  },
  wholesale: {
    eyebrow: "Bulk and wholesale",
    title: "Share your business requirement.",
    description:
      "Use this form for trade, distributor, gifting, hospitality, and larger quantity enquiries so the right team can respond quickly.",
    submitLabel: "Submit enquiry",
  },
} as const;

export function InquiryForm({ mode }: InquiryFormProps) {
  const [submissionState, setSubmissionState] = useState<SubmissionState>({ status: "idle" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionState({ status: "idle" });

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`/api/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong.");
      }

      event.currentTarget.reset();
      setSubmissionState({
        status: "success",
        message:
          result.message ||
          "Thanks. Your message has been received and the team will get back to you shortly.",
      });
    } catch (error) {
      setSubmissionState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "There was a problem submitting the form.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const isWholesale = mode === "wholesale";
  const content = modeContent[mode];

  return (
    <form onSubmit={handleSubmit} className="premium-panel grid gap-6 p-6 sm:p-8" aria-busy={isSubmitting}>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-olive-700">
          {content.eyebrow}
        </p>
        <h2 className="text-3xl">{content.title}</h2>
        <p className="max-w-2xl text-sm leading-7 text-olive-800">{content.description}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label={isWholesale ? "Contact person" : "Full name"} htmlFor={`${mode}-name`}>
          <input
            id={`${mode}-name`}
            name="name"
            required
            autoComplete="name"
            className={inputClassName}
            placeholder={isWholesale ? "Contact person" : "Your name"}
          />
        </Field>
        <Field label={isWholesale ? "Business email" : "Email"} htmlFor={`${mode}-email`}>
          <input
            id={`${mode}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClassName}
            placeholder="you@company.com"
          />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label={isWholesale ? "Business name" : "Company"} htmlFor={`${mode}-company`}>
          <input
            id={`${mode}-company`}
            name="company"
            required={isWholesale}
            autoComplete="organization"
            className={inputClassName}
            placeholder={isWholesale ? "Business name" : "Optional"}
          />
        </Field>
        <Field label="Phone" htmlFor={`${mode}-phone`}>
          <input
            id={`${mode}-phone`}
            name="phone"
            required={isWholesale}
            inputMode="tel"
            autoComplete="tel"
            className={inputClassName}
            placeholder="+91 98765 43210"
          />
        </Field>
      </div>

      {isWholesale ? (
        <>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="City / state" htmlFor="wholesale-city-state">
              <input
                id="wholesale-city-state"
                name="cityState"
                required
                className={inputClassName}
                placeholder="Mumbai, Maharashtra"
              />
            </Field>
            <Field label="Business type" htmlFor="wholesale-business-type">
              <select
                id="wholesale-business-type"
                name="businessType"
                className={inputClassName}
                required
              >
                <option value="">Select a business type</option>
                {businessTypeOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Product interest" htmlFor="wholesale-product-interest">
              <input
                id="wholesale-product-interest"
                name="productInterest"
                required
                className={inputClassName}
                placeholder="Chia Seeds, Makhana, Green Tea..."
              />
            </Field>
            <Field label="Order quantity" htmlFor="wholesale-order-quantity">
              <input
                id="wholesale-order-quantity"
                name="orderQuantity"
                required
                className={inputClassName}
                placeholder="Share estimated quantity or pack size"
              />
            </Field>
          </div>
        </>
      ) : (
        <Field label="Topic" htmlFor={`${mode}-interest`}>
          <select id={`${mode}-interest`} name="interest" className={inputClassName} required>
            <option value="">Select a topic</option>
            {contactInterestOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
      )}

      {isWholesale ? (
        <Field label="Notes" htmlFor={`${mode}-message`}>
          <textarea
            id={`${mode}-message`}
            name="message"
            required
            rows={6}
            className={cn(inputClassName, "rounded-[1.5rem] py-4")}
            placeholder="Share target channels, launch timing, sample requirements, or any specific product questions."
          />
        </Field>
      ) : (
        <Field label="How can we help?" htmlFor={`${mode}-message`}>
          <textarea
            id={`${mode}-message`}
            name="message"
            required
            rows={6}
            className={cn(inputClassName, "rounded-[1.5rem] py-4")}
            placeholder="Share what you are exploring, which products interest you, and your preferred next step."
          />
        </Field>
      )}

      {submissionState.status !== "idle" ? (
        <p
          aria-live="polite"
          className={cn(
            "rounded-[1.4rem] px-4 py-3 text-sm",
            submissionState.status === "success"
              ? "bg-olive-50 text-olive-900"
              : "bg-[#fff1ef] text-[#8a3a2d]",
          )}
        >
          {submissionState.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 rounded-[1.6rem] border border-olive-950/8 bg-white/72 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-olive-700">
          Share the most useful details you have right now. The team will route your enquiry to the
          right next step without unnecessary back-and-forth.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="min-h-12 rounded-full bg-olive-950 px-6 py-3 text-sm font-medium text-sand-50 transition hover:bg-olive-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : content.submitLabel}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="grid gap-2">
      <span className="text-sm font-medium text-olive-900">{label}</span>
      {children}
    </label>
  );
}

const inputClassName =
  "min-h-12 rounded-[1.4rem] border border-olive-950/10 bg-sand-50/70 px-4 text-sm text-olive-950 outline-none transition focus:border-olive-950/30 focus:bg-white focus:ring-2 focus:ring-olive-950/10";
