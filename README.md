# Agree Superfoods

Production-ready brand showcase website for Agree Superfoods, built with Next.js App Router, TypeScript, Tailwind CSS, structured local content, and optional Sanity CMS editing.

## Project architecture

```text
.
|-- app
|   |-- about/page.tsx
|   |-- api
|   |   |-- contact/route.ts
|   |   |-- newsletter/route.ts
|   |   |-- revalidate/route.ts
|   |   `-- wholesale/route.ts
|   |-- blog
|   |   |-- [slug]/page.tsx
|   |   `-- page.tsx
|   |-- compliance/page.tsx
|   |-- contact/page.tsx
|   |-- faq/page.tsx
|   |-- ingredients/page.tsx
|   |-- privacy-policy/page.tsx
|   |-- products
|   |   |-- [slug]/page.tsx
|   |   `-- page.tsx
|   |-- shipping-returns/page.tsx
|   |-- studio/[[...tool]]/page.tsx
|   |-- terms/page.tsx
|   |-- wholesale/page.tsx
|   |-- globals.css
|   |-- icon.svg
|   |-- layout.tsx
|   |-- loading.tsx
|   |-- not-found.tsx
|   |-- opengraph-image.tsx
|   |-- page.tsx
|   |-- robots.ts
|   `-- sitemap.ts
|-- components
|   |-- blog
|   |-- forms
|   |-- home
|   |-- layout
|   |-- products
|   |-- seo
|   |-- shared
|   `-- ui
|-- content
|   |-- blog/*.mdx
|   |-- products/*.json
|   |-- legal.ts
|   `-- site.ts
|-- docs
|   `-- brand-system.md
|-- lib
|   |-- content
|   |   |-- blog.ts
|   |   |-- products.ts
|   |   `-- site.ts
|   |-- seo
|   |   |-- metadata.ts
|   |   `-- schema.ts
|   |-- forms.ts
|   |-- site-config.ts
|   `-- utils.ts
|-- public
|   `-- images
|       |-- blog
|       `-- products
|-- sanity
|   |-- env.ts
|   |-- lib
|   |   |-- client.ts
|   |   `-- queries.ts
|   `-- schemaTypes
|       |-- documents
|       |-- objects
|       `-- index.ts
|-- styles/prose.css
|-- types
|   |-- blog.ts
|   |-- product.ts
|   `-- site.ts
|-- .env.example
|-- next.config.ts
|-- package.json
|-- sanity.cli.ts
|-- sanity.config.ts
`-- tsconfig.json
```

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- MDX for local blog content
- Local JSON product content
- Optional Sanity Studio at `/studio`
- SEO metadata + JSON-LD schema utilities
- Vercel-friendly API routes for forms and revalidation

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create local environment variables:

   ```bash
   copy .env.example .env.local
   ```

3. Update `.env.local`:

   ```env
   NEXT_PUBLIC_SITE_URL=https://www.agreesuperfoods.com
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2026-03-10
   SANITY_REVALIDATE_SECRET=replace-with-a-long-random-string
   NEXT_PUBLIC_WHATSAPP_URL=
   LEAD_CAPTURE_WEBHOOK_URL=
   CONTACT_FORM_WEBHOOK_URL=
   WHOLESALE_FORM_WEBHOOK_URL=
   NEWSLETTER_FORM_WEBHOOK_URL=
   ```

4. Start development:

   ```bash
   npm run dev
   ```

5. Open:
   - Site: `http://localhost:3000`
   - Studio: `http://localhost:3000/studio`

## Content workflow

The project is CMS-friendly by design.

- If Sanity env vars are configured, products, posts, and site settings are fetched from Sanity.
- If Sanity is not configured, the site automatically falls back to local files in `content/products`, `content/blog`, `content/site.ts`, and `content/legal.ts`.
- This lets development continue without blocking on CMS setup.

## How to add a new product

### Option 1: Sanity CMS

1. Open `/studio`.
2. Create a new `Product` document.
3. Fill:
   - name
   - slug
   - category
   - badge
   - shortDescription
   - description
   - fullDescription
   - benefits
   - ingredients
   - usageIdeas
   - bestFor
   - productDetails
   - images with alt text
   - highlights
   - FAQ items
   - SEO fields
4. Publish the document.
5. Trigger the Sanity webhook to `/api/revalidate` with your secret, or wait for the short cache window.

### Option 2: Local fallback content

1. Add a new JSON file to `content/products`, for example `content/products/hemp-seeds.json`.
2. Copy the structure from an existing file such as `content/products/chia-seeds.json`.
3. Add or replace imagery in `public/images/products`.
4. Keep the slug unique and stable.
5. Update the `seo` block and image alt text for the new product.
6. Run `npm run build` to verify the route statically generates.

## How to add a new blog post

### Option 1: Sanity CMS

1. Open `/studio`.
2. Create a new `Post`.
3. Fill:
   - title
   - slug
   - excerpt
   - author
   - authorRole
   - publish date
   - category
   - tags
   - cover image with alt text
   - body
   - related products
   - SEO fields
4. Publish and revalidate.

### Option 2: Local MDX

1. Add a new file in `content/blog`, for example `content/blog/how-to-store-seeds-properly.mdx`.
2. Copy an existing frontmatter block.
3. Use `##` and `###` headings so the TOC is generated automatically.
4. Use internal links to `/products/...`, `/blog/...`, `/faq`, or `/about`.
5. Add the cover art to `public/images/blog`.
6. Update the `seo` frontmatter block with a unique title, description, and canonical path.
7. Run `npm run build`.

## How to update compliance and business details

- Core business identity and support settings live in `lib/site-config.ts`.
- Update:
  - business response time
  - support channels
  - WhatsApp link
  - compliance signal messaging
  - trust disclaimer
- Compliance page long-form sections live in `content/legal.ts`.
- If Sanity is connected, long-form compliance copy can also be managed through the `compliancePage` schema.

## How to update images

- Product images live in `public/images/products`.
- Blog cover images live in `public/images/blog`.
- Update the `images` array in product JSON files and the `coverImage` field in blog MDX frontmatter.
- Every image should have descriptive alt text that reflects the visible subject and packaging or ingredient context.

## How to update SEO metadata

- Site-wide defaults live in `lib/seo/metadata.ts`.
- Schema helpers live in `lib/seo/schema.ts`.
- Product-level SEO is stored in each product JSON file under `seo`.
- Blog-level SEO is stored in each MDX frontmatter block under `seo`.
- Shared brand metadata and trust messaging live in `lib/site-config.ts`.

## Sanity CMS notes

- Studio is embedded directly in the Next.js app at `/studio`.
- Schemas live in `sanity/schemaTypes`.
- Site settings, compliance content, products, and posts all have schema definitions.
- The body editor supports inline images and link annotations.
- The frontend remains deployable even before Sanity is connected.

## SEO implementation

- Metadata API via `lib/seo/metadata.ts`
- JSON-LD helpers via `lib/seo/schema.ts`
- Dynamic metadata for product and blog detail routes
- Canonical URLs
- Open Graph and Twitter cards
- `robots.ts`
- `sitemap.ts`
- Organization, WebSite, Breadcrumb, Product, Article, and FAQ schema
- Crawlable slug-based architecture
- Strong internal linking between products, blog posts, FAQ, compliance, and contact routes

## Form handling

- `/contact` uses `app/api/contact/route.ts`
- `/wholesale` uses `app/api/wholesale/route.ts`
- Homepage newsletter uses `app/api/newsletter/route.ts`
- Lead forwarding is isolated in `lib/lead-capture.ts`
- Use `LEAD_CAPTURE_WEBHOOK_URL` for one shared destination or the form-specific webhook env vars for separate destinations

## Deploy to Vercel

1. Push the repository to GitHub.
2. Import the repo into Vercel.
3. Add environment variables from `.env.example`.
4. Set the production domain to `https://www.agreesuperfoods.com`.
5. Deploy.
6. Verify:
   - `/robots.txt`
   - `/sitemap.xml`
   - `/studio` access
   - product/blog metadata in page source
   - form submissions

## Future Shopify headless or custom ecommerce migration

The frontend is already structured for that migration.

- Keep product slugs stable so search equity and redirects remain clean.
- Map `Product` fields into Shopify products and metafields later.
- Preserve the current SEO layer and schema helpers instead of scattering metadata into templates.
- Keep content-led routes like FAQ, compliance, ingredients, and blog inside Next.js even if commerce moves to Shopify.
- Replace the current enquiry CTA layer with product availability, pricing, cart, and checkout endpoints later.
- Reuse the existing product detail layout as a commerce PDP shell.

## Brand system

See [docs/brand-system.md](./docs/brand-system.md) for:

- logo direction
- palette
- typography pairing
- tagline options
- homepage messaging hierarchy
- trust-first voice guidelines
- packaging-inspired UI direction
- CTA guidelines
- SEO-friendly brand messaging framework

## Validation

Run before every deploy:

```bash
npm run lint
npm run typecheck
npm run build
```
