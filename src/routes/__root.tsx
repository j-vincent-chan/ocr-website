import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Office of Collaborative Research — UCSF" },
      {
        name: "description",
        content:
          "The strategic hub of ImmunoX and the Parnassus Institutes at UCSF — research development, project management and clinical coordination, data sharing, AI tools, and community management for research communities.",
      },
      { name: "author", content: "UCSF Office of Collaborative Research" },
      { property: "og:site_name", content: "UCSF Office of Collaborative Research" },
      { property: "og:title", content: "Office of Collaborative Research — UCSF" },
      {
        property: "og:description",
        content: "Where great science finds great partners. Research development, project management, data, AI tools, and community management for UCSF investigators.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ocr.ucsf.edu/" },
      { property: "og:image", content: "https://ocr.ucsf.edu/og-image.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Office of Collaborative Research — UCSF sunburst logo on dark background",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Office of Collaborative Research — UCSF" },
      {
        name: "twitter:description",
        content: "Where great science finds great partners. Research development, project management, data, AI tools, and community management for UCSF investigators.",
      },
      { name: "twitter:image", content: "https://ocr.ucsf.edu/og-image.jpg" },
      {
        name: "twitter:image:alt",
        content: "Office of Collaborative Research — UCSF sunburst logo on dark background",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Cache-bust favicon URLs when the mark changes.
      { rel: "icon", href: "/ocr-logo.svg?v=4", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico?v=4", sizes: "any" },
      { rel: "icon", href: "/favicon-32x32.png?v=4", type: "image/png", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png?v=4", sizes: "180x180" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        children:
          "(function(){try{var p=location.pathname==='/'&&!sessionStorage.getItem('ocr-intro-seen');document.documentElement.dataset.intro=p?'play':'skip'}catch(e){document.documentElement.dataset.intro='play'}})();",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <noscript
          dangerouslySetInnerHTML={{
            __html: "<style>[data-intro-overlay]{display:none}</style>",
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useLocation({ select: (location) => location.pathname });
  // Clear the play gate before paint when leaving /, so the header lockup
  // and page scroll are not stuck hidden on the next route.
  if (
    typeof document !== "undefined" &&
    pathname !== "/" &&
    document.documentElement.dataset.intro === "play"
  ) {
    document.documentElement.dataset.intro = "skip";
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
