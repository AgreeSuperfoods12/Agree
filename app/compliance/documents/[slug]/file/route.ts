import { NextResponse } from "next/server";

import {
  getComplianceDocumentAsset,
  isComplianceDocumentSlug,
  readComplianceDocument,
} from "@/lib/compliance-documents";

interface ComplianceDocumentFileRouteProps {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: ComplianceDocumentFileRouteProps) {
  const { slug } = await params;

  if (!isComplianceDocumentSlug(slug)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const file = await readComplianceDocument(slug);
    const asset = getComplianceDocumentAsset(slug);

    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${asset.fileName}"`,
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex, noarchive, nosnippet",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
