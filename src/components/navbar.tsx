import React from "react";
import Link from "next/link";

type NavbarProps = {
  draftMode: boolean;
};

const Navbar = ({ draftMode }: NavbarProps) => {
  const draftStyles = draftMode ? "border-red-500 border-b-4" : "";

  return (
    <nav
      className={`flex items-center justify-between p-6 gap-5 ${draftStyles}`}
    >
      <div className="text-white text-2xl">
        <Link href="/">My New Title</Link>
      </div>
      <div>
        <ul className="flex space-x-4">
          <li className="text-white">
            <Link href="/blog">Blog</Link>
          </li>
          <li className="text-white">
            <Link href="/blog/typescript">Typescript</Link>
          </li>
          <li className="text-white">
            <Link href="/blog/contentful">Contentful</Link>
          </li>
          <li className="text-white">
            <Link href="/blog/nextjs">Next Js</Link>
          </li>
          <li className="text-white">
            <Link href="/search">Search</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
