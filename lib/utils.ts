type ClassNameValue = string | number | false | null | undefined;

export function cn(...classes: ClassNameValue[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function absoluteUrl(path = "/") {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.agreesuperfoods.com";

  return path.startsWith("http") ? path : `${siteUrl}${path}`;
}

export function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trim()}...`;
}
