import "server-only";

type LeadType = "contact" | "wholesale" | "newsletter";

interface LeadCaptureInput {
  type: LeadType;
  payload: Record<string, unknown>;
}

function getWebhookUrl(type: LeadType) {
  if (type === "contact") {
    return process.env.CONTACT_FORM_WEBHOOK_URL || process.env.LEAD_CAPTURE_WEBHOOK_URL;
  }

  if (type === "wholesale") {
    return process.env.WHOLESALE_FORM_WEBHOOK_URL || process.env.LEAD_CAPTURE_WEBHOOK_URL;
  }

  return process.env.NEWSLETTER_FORM_WEBHOOK_URL || process.env.LEAD_CAPTURE_WEBHOOK_URL;
}

export async function captureLead({ type, payload }: LeadCaptureInput) {
  const webhookUrl = getWebhookUrl(type);
  const envelope = {
    type,
    submittedAt: new Date().toISOString(),
    payload,
  };

  if (!webhookUrl) {
    console.info(`[lead-capture:${type}]`, envelope);
    return { mode: "log-only" as const };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(envelope),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Lead capture webhook failed with status ${response.status}.`);
  }

  return { mode: "webhook" as const };
}
