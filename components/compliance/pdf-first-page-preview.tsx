"use client";

import { useEffect, useRef, useState } from "react";

type PreviewState = "loading" | "ready" | "error";

interface PdfFirstPagePreviewProps {
  src: string;
  title: string;
}

export function PdfFirstPagePreview({ src, title }: PdfFirstPagePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<PreviewState>("loading");

  useEffect(() => {
    let cancelled = false;
    let destroyDocument: (() => void) | undefined;
    let cancelRender: (() => void) | undefined;

    async function renderFirstPage() {
      try {
        setState("loading");

        const pdfjs = await import("pdfjs-dist/webpack.mjs");
        const loadingTask = pdfjs.getDocument({
          url: src,
          disableAutoFetch: true,
          disableRange: true,
          disableStream: true,
        });

        destroyDocument = () => {
          void loadingTask.destroy();
        };

        const pdf = await loadingTask.promise;

        if (cancelled) {
          destroyDocument();
          return;
        }

        const page = await pdf.getPage(1);
        const canvas = canvasRef.current;

        if (!canvas) {
          pdf.destroy();
          return;
        }

        const context = canvas.getContext("2d", { alpha: false });

        if (!context) {
          pdf.destroy();
          throw new Error("Canvas context unavailable");
        }

        const devicePixelRatio = window.devicePixelRatio || 1;
        const baseViewport = page.getViewport({ scale: 1 });
        const targetWidth = 460;
        const renderScale = (targetWidth / baseViewport.width) * devicePixelRatio;
        const viewport = page.getViewport({ scale: renderScale });

        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        canvas.style.width = `${Math.ceil(viewport.width / devicePixelRatio)}px`;
        canvas.style.height = `${Math.ceil(viewport.height / devicePixelRatio)}px`;

        const renderTask = page.render({
          canvas,
          canvasContext: context,
          viewport,
        });

        cancelRender = () => {
          renderTask.cancel();
        };

        await renderTask.promise;

        page.cleanup();
        pdf.cleanup();

        if (!cancelled) {
          setState("ready");
        }
      } catch {
        if (!cancelled) {
          setState("error");
        }
      }
    }

    void renderFirstPage();

    return () => {
      cancelled = true;
      cancelRender?.();
      destroyDocument?.();
    };
  }, [src]);

  return (
    <div
      className="mx-auto max-w-[30rem]"
      onContextMenu={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
    >
      <div className="relative overflow-hidden rounded-[1.8rem] border border-olive-950/10 bg-white shadow-[0_24px_60px_-38px_rgba(19,32,24,0.3)]">
        <div className="flex items-center justify-between border-b border-olive-950/8 bg-sand-50 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-olive-700">
            First-page preview
          </p>
          <p className="text-xs text-olive-600">View-only</p>
        </div>

        <div className="relative flex min-h-[28rem] items-start justify-center bg-[linear-gradient(180deg,#f7f2e9_0%,#fefcf7_100%)] px-4 py-5">
          <canvas
            ref={canvasRef}
            aria-label={`${title} first-page preview`}
            className={`max-w-full select-none rounded-[0.8rem] border border-olive-950/8 bg-white shadow-[0_24px_50px_-40px_rgba(19,32,24,0.45)] ${
              state === "ready" ? "opacity-100" : "opacity-0"
            }`}
          />

          {state !== "ready" ? (
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm leading-7 text-olive-700">
              {state === "error"
                ? "Preview unavailable right now. The document is still restricted to the compliance page."
                : "Preparing the first-page preview..."}
            </div>
          ) : null}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-sand-100/80 to-transparent" />
        </div>
      </div>
    </div>
  );
}
