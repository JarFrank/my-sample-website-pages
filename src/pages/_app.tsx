import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";
import "@contentful/live-preview/style.css";
import Layout from "@/components/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContentfulLivePreviewProvider
      locale="en-US"
      enableInspectorMode={true}
      enableLiveUpdates={true}
      debugMode={true}
    >
      <Layout draftMode={pageProps.draftMode ?? false}>
        <Component {...pageProps} />
      </Layout>
    </ContentfulLivePreviewProvider>
  );
}
