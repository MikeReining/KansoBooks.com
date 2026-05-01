-- KansoBooks.com control plane.
--
-- This schema stores identity, entitlement, Lemon Squeezy, and Eve credit
-- state only. It must not store customer books data such as transactions,
-- statements, receipts, ledgers, reconciliation state, or accountant packages.

create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lemon_squeezy_customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  lemon_squeezy_customer_id text not null unique,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null default 'lemonsqueezy',
  event_name text not null,
  external_event_id text not null,
  resource_type text not null,
  resource_id text not null,
  payload jsonb not null,
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (provider, external_event_id)
);

create table public.licenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  lemon_squeezy_license_key_id text unique,
  lemon_squeezy_order_id text,
  lemon_squeezy_order_item_id text,
  status text not null check (
    status in ('inactive', 'active', 'expired', 'disabled')
  ),
  product_name text,
  variant_id text,
  activated_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  entitlement_key text not null,
  source text not null check (source in ('license', 'subscription', 'manual')),
  source_id uuid,
  status text not null check (status in ('active', 'inactive')),
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, entitlement_key, source, source_id)
);

create table public.eve_credit_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  delta integer not null check (delta <> 0),
  reason text not null check (
    reason in ('purchase', 'usage', 'adjustment', 'expiration')
  ),
  lemon_squeezy_order_id text,
  webhook_event_id uuid references public.webhook_events(id) on delete set null,
  note text,
  created_at timestamptz not null default now()
);

create index profiles_email_idx on public.profiles (email);
create index lemon_squeezy_customers_user_id_idx
  on public.lemon_squeezy_customers (user_id);
create index webhook_events_resource_idx
  on public.webhook_events (provider, resource_type, resource_id);
create index licenses_user_id_idx on public.licenses (user_id);
create index entitlements_user_id_idx on public.entitlements (user_id);
create index eve_credit_ledger_user_id_created_at_idx
  on public.eve_credit_ledger (user_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.lemon_squeezy_customers enable row level security;
alter table public.webhook_events enable row level security;
alter table public.licenses enable row level security;
alter table public.entitlements enable row level security;
alter table public.eve_credit_ledger enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "lemon_squeezy_customers_select_own"
  on public.lemon_squeezy_customers for select
  using (auth.uid() = user_id);

create policy "licenses_select_own"
  on public.licenses for select
  using (auth.uid() = user_id);

create policy "entitlements_select_own"
  on public.entitlements for select
  using (auth.uid() = user_id);

create policy "eve_credit_ledger_select_own"
  on public.eve_credit_ledger for select
  using (auth.uid() = user_id);

comment on table public.webhook_events is
  'Verified merchant webhook receipts. Payloads must not contain customer books data.';
comment on table public.eve_credit_ledger is
  'Control-plane Eve credit balance ledger. Not a financial accounting ledger.';
