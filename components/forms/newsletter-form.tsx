"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type SubmissionState =
  | { status: "idle"; message?: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

interface NewsletterFormProps {
  inverse?: boolean;
}

export function NewsletterForm({ inverse = false }: NewsletterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>({ status: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionState({ status: "idle" });

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Unable to submit right now.");
      }

      event.currentTarget.reset();
      setSubmissionState({
        status: "success",
        message:
          result.message ||
          "Thanks. You are on the list for product updates and new educational content.",
      });
    } catch (error) {
      setSubmissionState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "There was a problem with your newsletter signup.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <label htmlFor="newsletter-email" className="grid gap-2">
        <span className={cn("text-sm font-medium", inverse ? "text-sand-50" : "text-olive-900")}>
          Email address
        </span>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          className={cn(
            "min-h-12 rounded-full border px-4 text-sm outline-none transition focus:ring-2",
            inverse
              ? "border-white/10 bg-white/96 text-olive-950 focus:border-white/40 focus:ring-white/10"
              : "border-olive-950/10 bg-white text-olive-950 focus:border-olive-950/30 focus:ring-olive-950/10",
          )}
        />
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "min-h-12 rounded-full px-6 py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60",
            inverse
              ? "bg-sand-50 text-olive-950 hover:bg-white"
              : "bg-olive-950 text-sand-50 hover:bg-olive-900",
          )}
        >
          {isSubmitting ? "Submitting..." : "Join the list"}
        </button>
        <p className={cn("text-sm leading-6", inverse ? "text-sand-100/75" : "text-olive-700")}>
          Occasional product news, ingredient ideas, and brand updates only.
        </p>
      </div>
      {submissionState.status !== "idle" ? (
        <p
          aria-live="polite"
          className={cn(
            "rounded-2xl px-4 py-3 text-sm",
            submissionState.status === "success"
              ? inverse
                ? "bg-white/10 text-sand-50"
                : "bg-olive-50 text-olive-900"
              : "bg-[#fff1ef] text-[#8a3a2d]",
          )}
        >
          {submissionState.message}
        </p>
      ) : null}
    </form>
  );
}
