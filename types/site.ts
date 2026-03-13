export interface SeoFields {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage: string;
  keywords?: string[];
  noIndex?: boolean;
}

export interface ContentImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface HeaderMenuCard {
  eyebrow?: string;
  title: string;
  description: string;
  href: string;
  image: ContentImage;
}

export interface HeaderMenuSection {
  title: string;
  links: NavItem[];
}

export interface HeaderMenuItem {
  label: string;
  href?: string;
  badge?: string;
  layout?: "catalog" | "condensed" | "cards";
  sections?: HeaderMenuSection[];
  cards?: HeaderMenuCard[];
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface FeatureCard {
  title: string;
  description: string;
}

export interface MetricCard {
  value: string;
  label: string;
}

export interface IngredientFeature {
  name: string;
  blurb: string;
  benefit: string;
}

export interface ValuePillar {
  title: string;
  description: string;
}

export interface ComplianceBadge {
  title: string;
  description: string;
}

export interface ComplianceSignal {
  title: string;
  status: string;
  description: string;
}

export interface CertificationDocument {
  title: string;
  description: string;
  href: string;
  fileLabel?: string;
  issuedOn?: string;
}

export interface BusinessRegistrationDetails {
  gstin?: string;
  tradeName?: string;
  centreJurisdiction?: string;
  stateJurisdiction?: string;
  dateOfRegistration?: string;
  businessActivities?: string[];
  coreBusinessActivity?: string;
}

export interface ContactChannel {
  label: string;
  value: string;
  href?: string;
}

export interface BusinessRecord {
  businessName: string;
  address?: string;
  phone?: string;
  supportEmail: string;
  gstNumber?: string;
  fssaiLicense?: string;
  trademarkStatus?: string;
}

export interface BusinessConfig {
  records: BusinessRecord;
  registrations: BusinessRegistrationDetails;
  responseTime: string;
  supportNote: string;
  wholesaleTopics: string[];
  contactChannels: ContactChannel[];
  whatsappUrl?: string;
  whatsappLabel?: string;
  complianceSignals: ComplianceSignal[];
  certificationDocuments: CertificationDocument[];
  complianceDisclaimer: string;
}

export interface CategoryFeature {
  title: string;
  description: string;
  href: string;
}

export interface HeroLink {
  label: string;
  href: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: HeroLink;
  secondaryCta: HeroLink;
  supportingPoints: string[];
}

export interface NewsletterContent {
  eyebrow: string;
  title: string;
  description: string;
  privacyNote: string;
}

export interface ComplianceItem {
  title: string;
  description: string;
}

export interface LongFormSection {
  title: string;
  paragraphs: string[];
}

export interface SiteContent {
  hero: HeroContent;
  homepageIntro: string[];
  whyChooseCards: FeatureCard[];
  wellnessFeatures: IngredientFeature[];
  qualityPillars: ValuePillar[];
  brandStory: string[];
  packagingStory: string[];
  trustMetrics: MetricCard[];
  complianceBadges: ComplianceBadge[];
  complianceItems: ComplianceItem[];
  complianceDisclaimer: string;
  coreCategories: CategoryFeature[];
  globalFaqs: FaqItem[];
  contactHighlights: string[];
  wholesaleBenefits: string[];
  newsletter: NewsletterContent;
}

export interface CompliancePageContent {
  title: string;
  intro: string;
  sections: LongFormSection[];
  disclaimer: string;
}

export interface BrandSystemPaletteItem {
  name: string;
  hex: string;
  usage: string;
}

export interface BrandSystemGuideline {
  title: string;
  description: string;
}
