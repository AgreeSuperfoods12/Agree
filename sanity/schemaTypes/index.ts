import { compliancePageType } from "./documents/compliance-page";
import { postType } from "./documents/post";
import { productType } from "./documents/product";
import { siteSettingsType } from "./documents/site-settings";
import { faqItemType } from "./objects/faq-item";
import { linkItemType } from "./objects/link-item";
import { seoType } from "./objects/seo";

export const schemaTypes = [
  seoType,
  faqItemType,
  linkItemType,
  siteSettingsType,
  compliancePageType,
  productType,
  postType,
];
