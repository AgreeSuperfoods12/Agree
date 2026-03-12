import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const publicDir = path.join(rootDir, "public");
const scanDirs = ["app", "components", "content", "lib"];
const scanExtensions = new Set([".ts", ".tsx", ".json", ".mdx"]);
const assetPattern = /\/images\/[A-Za-z0-9/_\-.]+/g;

function collectFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return collectFiles(fullPath);
    }

    if (!scanExtensions.has(path.extname(entry.name))) {
      return [];
    }

    return [fullPath];
  });
}

const missingAssets = [];

for (const scanDir of scanDirs) {
  const absoluteDir = path.join(rootDir, scanDir);

  if (!existsSync(absoluteDir) || !statSync(absoluteDir).isDirectory()) {
    continue;
  }

  for (const filePath of collectFiles(absoluteDir)) {
    const source = readFileSync(filePath, "utf8");
    const matches = [...source.matchAll(assetPattern)];
    const uniqueMatches = Array.from(new Set(matches.map((match) => match[0])));

    for (const assetPath of uniqueMatches) {
      const publicAssetPath = path.join(publicDir, assetPath.replace(/^\//, ""));

      if (!existsSync(publicAssetPath)) {
        missingAssets.push({
          file: path.relative(rootDir, filePath),
          asset: assetPath,
        });
      }
    }
  }
}

if (missingAssets.length > 0) {
  console.error("Missing local asset references found:\n");

  for (const item of missingAssets) {
    console.error(`- ${item.file}: ${item.asset}`);
  }

  process.exit(1);
}

console.log("Local asset audit passed.");
