const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-10";

export { apiVersion, dataset, projectId };

export const hasValidSanityConfig =
  Boolean(projectId) &&
  Boolean(dataset) &&
  !projectId.includes("your-project-id") &&
  !dataset.includes("your-dataset");

