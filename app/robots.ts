import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/espace-sponsor"],
    },
    sitemap: "https://lematchduronvau.be/sitemap.xml",
  };
}
