import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";
import "@contentful/live-preview/style.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContentfulLivePreviewProvider
      locale="en-US"
      enableInspectorMode={true}
      enableLiveUpdates={true}
      debugMode={true}
    >
      <main className="min-h-screen max-w-5xl mx-auto px-4 py-16">
        <div className="z-10 w-full font-mono text-sm">
          <Component {...pageProps} />
        </div>
      </main>
    </ContentfulLivePreviewProvider>
  );
}
