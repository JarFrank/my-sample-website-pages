import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";
import "@contentful/live-preview/style.css";
import Layout from "@/components/layout";

export default function App({ Component, pageProps }: AppProps) {
  const draftMode = pageProps.draftMode ?? false;
  return (
    <ContentfulLivePreviewProvider
      locale="en-US"
      enableInspectorMode={draftMode}
      enableLiveUpdates={draftMode}
      debugMode={draftMode}
    >
      <Layout draftMode={draftMode}>
        <Component {...pageProps} />
      </Layout>
    </ContentfulLivePreviewProvider>
  );
}
