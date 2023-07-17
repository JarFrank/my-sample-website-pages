import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="min-h-screen max-w-5xl mx-auto px-4 py-16">
      <div className="z-10 w-full font-mono text-sm">
        <Component {...pageProps} />
      </div>
    </main>
  );
}
