import type { MetadataRoute } from "next";

const baseUrl = "https://lematchduronvau.be";

const publicPaths = [
  "/spectacle",
  "/oeuvres",
  "/billetterie",
  "/partenaires",
  "/infos",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...publicPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
