export function isPackshotImage(src?: string) {
  return Boolean(src?.toLowerCase().endsWith(".png"));
}
