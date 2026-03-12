import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from "react";
import Link from "next/link";

type InternalAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: ReactNode;
  href?: string;
};

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  children?: ReactNode;
};

export const mdxComponents = {
  a: ({ href = "", children, ...props }: InternalAnchorProps) => {
    if (href.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    );
  },
  h2: ({ id, children, ...props }: HeadingProps) => (
    <h2 id={id} {...props}>
      {children}
    </h2>
  ),
  h3: ({ id, children, ...props }: HeadingProps) => (
    <h3 id={id} {...props}>
      {children}
    </h3>
  ),
};
