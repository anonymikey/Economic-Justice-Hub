-- EJF Phase 6B: Supabase database, Auth profile sync, and RLS.
-- Run this migration in the new EJF Supabase project's SQL editor.

create extension if not exists pgcrypto;

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text not null default '',
  phone text not null default '',
  organization text not null default '',
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  date text not null default '',
  date_iso date not null,
  location text not null default '',
  time text not null default '',
  category text not null default 'Community',
  emoji text not null default '',
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  category text not null default 'Community',
  icon text not null default '',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.publications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text not null default '',
  description text not null default '',
  tags text not null default '',
  pdf_url text not null default '',
  cover_image text not null default '',
  published_at timestamptz,
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null default '(no subject)',
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  donor_name text not null default '',
  donor_email text not null default '',
  amount_kes numeric(12, 2) not null default 0,
  payment_method text not null default '',
  reference text not null default '',
  message text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.pre_approved_admins (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Initial administrator carried forward from the existing EJF workspace allowlist.
-- Remove this row if this address should not receive initial admin access.
insert into public.pre_approved_admins (email)
values ('anonymiketech@gmail.com')
on conflict (email) do nothing;

create unique index if not exists users_email_lower_idx
  on public.users (lower(email));
create index if not exists events_published_idx on public.events (published);
create index if not exists events_created_at_idx on public.events (created_at desc);
create index if not exists events_date_iso_idx on public.events (date_iso);
create index if not exists programs_published_idx on public.programs (published);
create index if not exists programs_created_at_idx on public.programs (created_at desc);
create index if not exists publications_published_idx on public.publications (published);
create index if not exists publications_created_at_idx on public.publications (created_at desc);
create index if not exists contact_submissions_created_at_idx on public.contact_submissions (created_at desc);
create index if not exists contact_submissions_email_idx on public.contact_submissions (lower(email));
create index if not exists newsletter_subscriptions_created_at_idx on public.newsletter_subscriptions (created_at desc);
create index if not exists newsletter_subscriptions_email_idx on public.newsletter_subscriptions (lower(email));
create index if not exists donations_created_at_idx on public.donations (created_at desc);
create index if not exists donations_email_idx on public.donations (lower(donor_email));
create index if not exists pre_approved_admins_created_at_idx on public.pre_approved_admins (created_at desc);
create index if not exists pre_approved_admins_email_idx on public.pre_approved_admins (lower(email));

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists users_set_updated_at on public.users;
create trigger users_set_updated_at
before update on public.users
for each row execute function public.set_updated_at();

drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at
before update on public.events
for each row execute function public.set_updated_at();

drop trigger if exists programs_set_updated_at on public.programs;
create trigger programs_set_updated_at
before update on public.programs
for each row execute function public.set_updated_at();

drop trigger if exists publications_set_updated_at on public.publications;
create trigger publications_set_updated_at
before update on public.publications
for each row execute function public.set_updated_at();

drop trigger if exists newsletter_set_updated_at on public.newsletter_subscriptions;
create trigger newsletter_set_updated_at
before update on public.newsletter_subscriptions
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (
    select 1
    from public.users u
    where u.id = auth.uid()
      and u.is_admin = true
  )
  or exists (
    select 1
    from public.pre_approved_admins p
    join auth.users au on lower(au.email) = lower(p.email)
    where au.id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, full_name, phone, organization, is_admin)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    coalesce(new.raw_user_meta_data ->> 'organization', ''),
    exists (
      select 1
      from public.pre_approved_admins
      where lower(email) = lower(coalesce(new.email, ''))
    )
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = case
          when excluded.full_name <> '' then excluded.full_name
          else public.users.full_name
        end,
        phone = case
          when excluded.phone <> '' then excluded.phone
          else public.users.phone
        end,
        organization = case
          when excluded.organization <> '' then excluded.organization
          else public.users.organization
        end,
        is_admin = public.users.is_admin or excluded.is_admin,
        updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
after update of email, raw_user_meta_data on auth.users
for each row execute function public.handle_new_user();

insert into public.users (id, email, full_name, phone, organization, is_admin)
select
  au.id,
  coalesce(au.email, ''),
  coalesce(au.raw_user_meta_data ->> 'full_name', ''),
  coalesce(au.raw_user_meta_data ->> 'phone', ''),
  coalesce(au.raw_user_meta_data ->> 'organization', ''),
  exists (
    select 1
    from public.pre_approved_admins pa
    where lower(pa.email) = lower(coalesce(au.email, ''))
  )
from auth.users au
where au.email is not null
on conflict (id) do update
  set email = excluded.email,
      full_name = case
        when excluded.full_name <> '' then excluded.full_name
        else public.users.full_name
      end,
      phone = case
        when excluded.phone <> '' then excluded.phone
        else public.users.phone
      end,
      organization = case
        when excluded.organization <> '' then excluded.organization
        else public.users.organization
      end,
      is_admin = public.users.is_admin or excluded.is_admin,
      updated_at = now();

create or replace function public.prevent_member_admin_escalation()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if auth.uid() is not null
     and not public.is_admin()
     and old.is_admin is distinct from new.is_admin then
    raise exception 'Only administrators can change admin status';
  end if;
  return new;
end;
$$;

drop trigger if exists prevent_member_admin_escalation on public.users;
create trigger prevent_member_admin_escalation
before update on public.users
for each row execute function public.prevent_member_admin_escalation();

alter table public.users enable row level security;
alter table public.events enable row level security;
alter table public.programs enable row level security;
alter table public.publications enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.newsletter_subscriptions enable row level security;
alter table public.donations enable row level security;
alter table public.pre_approved_admins enable row level security;

drop policy if exists users_select_self_or_admin on public.users;
create policy users_select_self_or_admin
on public.users for select
to authenticated
using (id = auth.uid() or public.is_admin());

drop policy if exists users_update_self_or_admin on public.users;
create policy users_update_self_or_admin
on public.users for update
to authenticated
using (id = auth.uid() or public.is_admin())
with check (id = auth.uid() or public.is_admin());

drop policy if exists users_admin_insert on public.users;
create policy users_admin_insert
on public.users for insert
to authenticated
with check (public.is_admin());

drop policy if exists users_admin_delete on public.users;
create policy users_admin_delete
on public.users for delete
to authenticated
using (public.is_admin());

drop policy if exists events_public_read_published on public.events;
create policy events_public_read_published
on public.events for select
to anon, authenticated
using (published = true or public.is_admin());

drop policy if exists events_admin_write on public.events;
create policy events_admin_write
on public.events for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists programs_public_read_published on public.programs;
create policy programs_public_read_published
on public.programs for select
to anon, authenticated
using (published = true or public.is_admin());

drop policy if exists programs_admin_write on public.programs;
create policy programs_admin_write
on public.programs for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists publications_public_read_published on public.publications;
create policy publications_public_read_published
on public.publications for select
to anon, authenticated
using (published = true or public.is_admin());

drop policy if exists publications_admin_write on public.publications;
create policy publications_admin_write
on public.publications for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists contact_public_insert on public.contact_submissions;
create policy contact_public_insert
on public.contact_submissions for insert
to anon, authenticated
with check (true);

drop policy if exists contact_admin_read on public.contact_submissions;
create policy contact_admin_read
on public.contact_submissions for select
to authenticated
using (public.is_admin());

drop policy if exists contact_admin_delete on public.contact_submissions;
create policy contact_admin_delete
on public.contact_submissions for delete
to authenticated
using (public.is_admin());

drop policy if exists newsletter_admin_all on public.newsletter_subscriptions;
create policy newsletter_admin_all
on public.newsletter_subscriptions for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists donations_admin_all on public.donations;
create policy donations_admin_all
on public.donations for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists pre_approved_admins_admin_all on public.pre_approved_admins;
create policy pre_approved_admins_admin_all
on public.pre_approved_admins for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

grant select on public.events, public.programs, public.publications to anon, authenticated;
grant insert on public.contact_submissions to anon, authenticated;
grant select, delete on public.contact_submissions to authenticated;
grant select, insert, update, delete on
  public.users,
  public.events,
  public.programs,
  public.publications,
  public.newsletter_subscriptions,
  public.donations,
  public.pre_approved_admins
to authenticated;