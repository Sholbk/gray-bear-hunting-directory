-- Profiles (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text not null default '',
  business_name text,
  membership_tier text not null default 'free' check (membership_tier in ('free', 'basic', 'premium', 'elite')),
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Listings
create table public.listings (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text not null,
  type text not null,
  description text not null default '',
  city text not null default '',
  state text not null default '',
  species text[] not null default '{}',
  success_rate integer not null default 0,
  price_min integer not null default 0,
  price_max integer not null default 0,
  physical_intensity integer not null default 1,
  rating numeric(2,1) not null default 0,
  review_count integer not null default 0,
  phone text not null default '',
  website text not null default '',
  image text not null default '',
  featured boolean not null default false,
  status text not null default 'active' check (status in ('active', 'pending', 'inactive')),
  owner_id uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.listings enable row level security;

create policy "Listings are viewable by everyone"
  on public.listings for select using (status = 'active');

create policy "Owners can insert own listings"
  on public.listings for insert with check (auth.uid() = owner_id);

create policy "Owners can update own listings"
  on public.listings for update using (auth.uid() = owner_id);

create policy "Owners can delete own listings"
  on public.listings for delete using (auth.uid() = owner_id);

-- Reviews
create table public.reviews (
  id uuid default gen_random_uuid() primary key,
  listing_id uuid references public.listings(id) on delete cascade not null,
  author_id uuid references public.profiles(id),
  author_name text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  text text not null default '',
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

create policy "Reviews are viewable by everyone"
  on public.reviews for select using (true);

create policy "Authenticated users can create reviews"
  on public.reviews for insert with check (auth.uid() is not null);

-- Blog posts
create table public.blog_posts (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  cover_image text,
  author_name text not null default 'Gray Bear Team',
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

create policy "Published posts are viewable by everyone"
  on public.blog_posts for select using (status = 'published');

create policy "Admins can manage posts"
  on public.blog_posts for all using (
    exists (select 1 from public.profiles where id = auth.uid() and membership_tier = 'elite')
  );

-- Events
create table public.events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null default '',
  date date not null,
  end_date date,
  location text,
  category text not null check (category in ('season', 'expo', 'class', 'tournament', 'meetup')),
  url text,
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;

create policy "Events are viewable by everyone"
  on public.events for select using (true);

-- Membership plans (reference data)
create table public.membership_plans (
  id uuid default gen_random_uuid() primary key,
  tier text unique not null check (tier in ('free', 'basic', 'premium', 'elite')),
  name text not null,
  price_monthly integer not null default 0,
  price_yearly integer not null default 0,
  features text[] not null default '{}',
  max_listings integer not null default 0,
  highlighted boolean not null default false
);

alter table public.membership_plans enable row level security;

create policy "Plans are viewable by everyone"
  on public.membership_plans for select using (true);
