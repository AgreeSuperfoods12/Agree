import type { CartCheckoutLine } from "@/types/cart";

const DEFAULT_WHATSAPP_NUMBER = "918050110271";

function digitsOnly(value: string) {
  return value.replace(/\D+/g, "");
}

function formatIndianPhoneNumber(value: string) {
  const digits = digitsOnly(value);

  if (digits.length === 12 && digits.startsWith("91")) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }

  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }

  return value;
}

const configuredNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;

export const whatsappNumber = digitsOnly(configuredNumber) || DEFAULT_WHATSAPP_NUMBER;
export const whatsappDisplayNumber = formatIndianPhoneNumber(whatsappNumber);

export function buildWhatsAppUrl(message: string) {
  const searchParams = new URLSearchParams({ text: message });

  return `https://wa.me/${whatsappNumber}?${searchParams.toString()}`;
}

export function buildGeneralOrderWhatsAppUrl() {
  return buildWhatsAppUrl(
    "Hi Agree Superfoods, I want to place an order. Please share the available products, final price, and payment details.",
  );
}

export function buildProductOrderWhatsAppUrl(productName: string, packSize?: string) {
  const packLabel = packSize ? ` (${packSize})` : "";

  return buildWhatsAppUrl(
    `Hi Agree Superfoods, I want to order ${productName}${packLabel}. Please share the final price, delivery timeline, and payment details.`,
  );
}

export function buildCartOrderWhatsAppUrl(
  lines: CartCheckoutLine[],
  options?: {
    estimatedTotal?: string;
  },
) {
  if (lines.length === 0) {
    return buildGeneralOrderWhatsAppUrl();
  }

  const lineItems = lines
    .map((line, index) => {
      const packLabel = line.packSize ? ` (${line.packSize})` : "";

      return `${index + 1}. ${line.productName}${packLabel} x ${line.quantity}`;
    })
    .join("\n");
  const estimatedTotal = options?.estimatedTotal
    ? `\nEstimated total: ${options.estimatedTotal}`
    : "";

  return buildWhatsAppUrl(
    `Hi Agree Superfoods, I want to place an order for the following items:\n${lineItems}${estimatedTotal}\n\nPlease confirm the final amount (including delivery), payment details, and expected delivery timeline.`,
  );
}

export function buildWholesaleWhatsAppUrl() {
  return buildWhatsAppUrl(
    "Hi Agree Superfoods, I need bulk or wholesale pricing. Please share the catalogue, MOQ, and delivery details.",
  );
}
