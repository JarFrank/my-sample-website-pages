import React from "react";
import Navbar from "./navbar";

type LayoutProps = {
  children: React.ReactNode;
  draftMode: boolean;
};

function Layout({ children, draftMode }: LayoutProps) {
  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 py-16">
      <main>
        <Navbar draftMode={draftMode} />
        <div className="z-10 w-full font-mono text-sm">{children}</div>
      </main>
    </div>
  );
}

export default Layout;
