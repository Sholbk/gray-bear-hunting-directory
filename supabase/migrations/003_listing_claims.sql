-- Listing claims: maps JSON listing slugs to Supabase users
create table public.listing_claims (
  id uuid default gen_random_uuid() primary key,
  listing_slug text not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  verification_note text not null default '',
  admin_note text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (listing_slug, user_id)
);

alter table public.listing_claims enable row level security;

-- Users can view their own claims
create policy "Users can view own claims"
  on public.listing_claims for select
  using (auth.uid() = user_id);

-- Users can create claims for themselves
create policy "Users can create claims"
  on public.listing_claims for insert
  with check (auth.uid() = user_id);

-- Anyone can see approved claims (for verified badge on listing pages)
create policy "Anyone can see approved claims"
  on public.listing_claims for select
  using (status = 'approved');

-- Admins (elite tier) can view all claims
create policy "Admins can view all claims"
  on public.listing_claims for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and membership_tier = 'elite'
    )
  );

-- Admins can update claims (approve/reject)
create policy "Admins can update claims"
  on public.listing_claims for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and membership_tier = 'elite'
    )
  );

-- Fast lookup for verified badge on listing pages
create index idx_listing_claims_slug_approved
  on public.listing_claims (listing_slug)
  where status = 'approved';
