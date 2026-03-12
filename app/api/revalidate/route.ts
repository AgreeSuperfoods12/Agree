import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const typeToTags = {
  siteSettings: ["sanity:site-settings"],
  compliancePage: ["sanity:compliance-page"],
  product: ["sanity:products"],
  post: ["sanity:posts"],
} as const;

export async function POST(request: Request) {
  const secret =
    request.headers.get("x-revalidate-secret") ||
    new URL(request.url).searchParams.get("secret");

  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid revalidation secret." }, { status: 401 });
  }

  const payload = (await request.json().catch(() => ({}))) as {
    _type?: keyof typeof typeToTags;
    slug?: string;
  };

  const tags = payload._type ? typeToTags[payload._type] : [];

  tags.forEach((tag) => revalidateTag(tag, "max"));

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/products");
  revalidatePath("/blog");
  revalidatePath("/compliance");

  if (payload._type === "product" && payload.slug) {
    revalidatePath(`/products/${payload.slug}`);
  }

  if (payload._type === "post" && payload.slug) {
    revalidatePath(`/blog/${payload.slug}`);
  }

  return NextResponse.json({
    revalidated: true,
    tags,
    slug: payload.slug || null,
  });
}
