create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  business_name text not null default 'Ink and Print',
  hero_eyebrow text not null default 'Custom printing, branding, and product design',
  hero_headline text not null default 'Print products, apparel, and branded materials made for your ideas.',
  hero_description text not null default 'Ink and Print helps customers create branded apparel, printed products, promotional pieces, and custom designs with clean finishing and practical support.',
  hero_cta_text text not null default 'Order Now',
  about_title text not null default 'Custom printing and branding support for businesses, events, teams, and personal projects.',
  about_description_1 text not null default 'Ink and Print supports customers with apparel printing, branded products, promotional materials, business items, and selected custom orders.',
  about_description_2 text not null default 'The goal is simple: offer clear product choices, clean branding, and reliable finishing so every order looks ready to use, wear, or present.',
  phone text not null default '0704444845',
  email text not null default 'jamiebanku10@gmail.com',
  location text not null default 'Swift Plaza, SD 148',
  whatsapp_number text not null default '256704444845',
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id)
values (1)
on conflict (id) do nothing;

update public.site_settings
set
  business_name = 'Ink and Print',
  hero_eyebrow = 'Custom printing, branding, and product design',
  hero_headline = 'Print products, apparel, and branded materials made for your ideas.',
  hero_description = 'Ink and Print helps customers create branded apparel, printed products, promotional pieces, and custom designs with clean finishing and practical support.',
  about_title = 'Custom printing and branding support for businesses, events, teams, and personal projects.',
  about_description_1 = 'Ink and Print supports customers with apparel printing, branded products, promotional materials, business items, and selected custom orders.',
  about_description_2 = 'The goal is simple: offer clear product choices, clean branding, and reliable finishing so every order looks ready to use, wear, or present.',
  updated_at = now()
where id = 1
  and business_name = 'Ink & Apparels';

alter table public.site_settings enable row level security;

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
on public.site_settings
for select
using (true);

drop policy if exists "Authenticated users can manage site settings" on public.site_settings;
drop policy if exists "Admins can manage site settings" on public.site_settings;
create policy "Admins can manage site settings"
on public.site_settings
for all
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role = 'admin'
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role = 'admin'
  )
);
