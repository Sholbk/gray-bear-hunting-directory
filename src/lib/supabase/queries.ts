import { createClient } from "./server";
import type { BlogPost, CalendarEvent, Profile, MembershipPlan } from "@/types";

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return data;
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId);
  if (error) throw error;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  return data || [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return data;
}

export async function getEvents(): Promise<CalendarEvent[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("events")
    .select("*")
    .gte("date", new Date().toISOString().split("T")[0])
    .order("date", { ascending: true });
  return data || [];
}

export async function getMembershipPlans(): Promise<MembershipPlan[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("membership_plans")
    .select("*")
    .order("price_monthly", { ascending: true });
  return data || [];
}
