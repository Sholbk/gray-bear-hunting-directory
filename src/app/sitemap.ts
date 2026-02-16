import { MetadataRoute } from "next";
import { getAllListings } from "@/lib/listings";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gray-bear-hunting-directory.vercel.app";

  const staticPages = [
    "",
    "/search",
    "/directory",
    "/state",
    "/hunt",
    "/fish",
    "/about",
    "/contact",
    "/why-gray-bear",
    "/blog",
    "/calendar",
    "/membership",
    "/login",
    "/signup",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const listings = getAllListings().map((listing) => ({
    url: `${baseUrl}/listing/${listing.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...listings];
}
