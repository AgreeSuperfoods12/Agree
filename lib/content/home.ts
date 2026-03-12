import "server-only";

import { cache } from "react";

import { defaultHomePageContent } from "@/content/home";

export const getHomePageContent = cache(async () => defaultHomePageContent);
