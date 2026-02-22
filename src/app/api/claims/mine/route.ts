import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getUserClaims } from "@/lib/supabase/queries";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const claims = await getUserClaims(user.id);
  return NextResponse.json(claims);
}
