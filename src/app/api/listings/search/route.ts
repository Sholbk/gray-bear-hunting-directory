import { NextRequest, NextResponse } from "next/server";
import { filterListings } from "@/lib/listings";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") || "";

  if (q.length < 2) {
    return NextResponse.json([]);
  }

  const results = filterListings({ query: q });

  const slim = results.slice(0, 20).map((l) => ({
    slug: l.slug,
    name: l.name,
    type: l.type,
    city: l.location.city,
    state: l.location.state,
  }));

  return NextResponse.json(slim);
}
