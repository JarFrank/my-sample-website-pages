// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { COOKIE_NAME_PRERENDER_BYPASS } from "next/dist/server/api-utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { secret, slug } = req.query;

  if (secret !== process.env.APP_CONTENTFUL_SECRET_TOKEN || !slug) {
    return res.status(401).json({ message: "Invalid token" });
  }

  res.setDraftMode({ enable: true });

  const headers = res.getHeader("Set-Cookie");
  if (Array.isArray(headers)) {
    res.setHeader(
      "Set-Cookie",
      headers.map((cookie: string) => {
        if (cookie.includes(COOKIE_NAME_PRERENDER_BYPASS)) {
          return cookie.replace("SameSite=Lax", "SameSite=None; Secure");
        }
        return cookie;
      })
    );
  }

  const url = `/blog/${slug}`;

  res.setHeader("Location", url);
  return res.status(307).end();
}
