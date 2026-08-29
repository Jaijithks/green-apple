import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const currentDate = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/catering`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
