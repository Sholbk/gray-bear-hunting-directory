import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createListingClaim } from "@/lib/supabase/queries";
import { getListingBySlug } from "@/lib/listings";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { listingSlug, verificationNote } = await request.json();

  const listing = getListingBySlug(listingSlug);
  if (!listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  try {
    const claim = await createListingClaim(
      user.id,
      listingSlug,
      verificationNote || ""
    );
    return NextResponse.json(claim, { status: 201 });
  } catch (err: unknown) {
    const pgError = err as { code?: string };
    if (pgError?.code === "23505") {
      return NextResponse.json(
        { error: "You have already claimed this listing" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create claim" },
      { status: 500 }
    );
  }
}
