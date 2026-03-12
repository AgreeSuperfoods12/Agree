import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { slugify } from "@/lib/utils";
import type { PortableTextBlock, PortableTextNode } from "@/types/blog";

function getBlockText(block?: PortableTextBlock) {
  if (!block?.children) {
    return "";
  }

  return block.children.map((child) => child.text).join("").trim();
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => (
      <h2 id={slugify(getBlockText(value as PortableTextBlock))}>{children}</h2>
    ),
    h3: ({ children, value }) => (
      <h3 id={slugify(getBlockText(value as PortableTextBlock))}>{children}</h3>
    ),
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  types: {
    image: ({ value }) =>
      value?.src ? (
        <figure className="my-8 overflow-hidden rounded-[1.75rem] bg-sand-100">
          <div className="relative aspect-[16/10]">
            <Image
              src={value.src}
              alt={value.alt || "Agree Superfoods editorial image"}
              fill
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-cover"
            />
          </div>
        </figure>
      ) : null,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "";

      if (!href) {
        return <>{children}</>;
      }

      if (href.startsWith("/")) {
        return <Link href={href}>{children}</Link>;
      }

      return (
        <a href={href} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    },
  },
};

interface PortableTextContentProps {
  value: PortableTextNode[];
}

export function PortableTextContent({ value }: PortableTextContentProps) {
  return <PortableText value={value} components={portableTextComponents} />;
}
