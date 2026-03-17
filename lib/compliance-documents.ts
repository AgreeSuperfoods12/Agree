import path from "node:path";
import { promises as fs } from "node:fs";

const complianceDocumentAssets = {
  "gst-registration-certificate": {
    fileName: "agree-superfoods-gst-registration-certificate.pdf",
  },
  "udyam-registration-certificate": {
    fileName: "agree-superfoods-udyam-registration-certificate.pdf",
  },
  "food-license": {
    fileName: "agree-superfoods-food-license.pdf",
  },
  "pledge-document": {
    fileName: "agree-superfoods-pledge.pdf",
  },
} as const;

const complianceDocumentsDirectory = path.join(process.cwd(), "private-documents", "compliance");

export type ComplianceDocumentSlug = keyof typeof complianceDocumentAssets;

export const complianceDocumentSlugs = Object.keys(
  complianceDocumentAssets,
) as ComplianceDocumentSlug[];

export function isComplianceDocumentSlug(value: string): value is ComplianceDocumentSlug {
  return value in complianceDocumentAssets;
}

export function getComplianceDocumentAsset(slug: ComplianceDocumentSlug) {
  const asset = complianceDocumentAssets[slug];

  return {
    ...asset,
    filePath: path.join(complianceDocumentsDirectory, asset.fileName),
  };
}

export async function readComplianceDocument(slug: ComplianceDocumentSlug) {
  const asset = getComplianceDocumentAsset(slug);

  return fs.readFile(asset.filePath);
}
