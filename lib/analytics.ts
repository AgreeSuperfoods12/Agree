"use client";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

type AnalyticsPayload = Record<string, string | number | boolean | string[] | undefined>;

function hasWindow() {
  return typeof window !== "undefined";
}

export function trackEvent(eventName: string, payload: AnalyticsPayload = {}) {
  if (!hasWindow()) {
    return;
  }

  window.gtag?.("event", eventName, payload);
}

export function trackPageView(path: string) {
  if (!hasWindow()) {
    return;
  }

  const pageLocation = `${window.location.origin}${path}`;

  window.gtag?.("event", "page_view", {
    page_location: pageLocation,
    page_path: path,
    page_title: document.title,
  });
  window.fbq?.("track", "PageView");
}

export function trackCtaClick(payload: AnalyticsPayload) {
  trackEvent("cta_click", payload);
  if (hasWindow()) {
    window.fbq?.("trackCustom", "CtaClick", payload);
  }
}

export function trackLeadSubmit(
  type: "contact" | "wholesale" | "newsletter",
  payload: AnalyticsPayload = {},
) {
  trackEvent(`${type}_submit`, {
    form_type: type,
    ...payload,
  });

  if (hasWindow()) {
    window.fbq?.("track", "Lead", {
      content_name: type,
      ...payload,
    });
  }
}

export function trackProductView(payload: {
  slug: string;
  name: string;
  category: string;
  currency: string;
  value: number;
}) {
  if (!hasWindow()) {
    return;
  }

  window.gtag?.("event", "view_item", {
    currency: payload.currency,
    value: payload.value,
    items: [
      {
        item_id: payload.slug,
        item_name: payload.name,
        item_category: payload.category,
        price: payload.value,
      },
    ],
  });
  window.fbq?.("track", "ViewContent", {
    content_ids: [payload.slug],
    content_name: payload.name,
    content_category: payload.category,
    content_type: "product",
    currency: payload.currency,
    value: payload.value,
  });
}
