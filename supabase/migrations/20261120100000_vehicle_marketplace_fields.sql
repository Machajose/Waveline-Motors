alter table public.vehicles
  add column if not exists manufacture_year integer,
  add column if not exists engine_capacity_cc integer,
  add column if not exists interior_color text,
  add column if not exists exterior_color text,
  add column if not exists chassis_number text,
  add column if not exists vehicle_origin text,
  add column if not exists is_sold boolean not null default false;

insert into public.manufacturers (name, slug, country, founded_year, logo_url)
select
  'Land Rover',
  'land-rover',
  'United Kingdom',
  1948,
  'https://upload.wikimedia.org/wikipedia/commons/9/91/Land_Rover_logo_2020.svg'
where not exists (
  select 1 from public.manufacturers where slug = 'land-rover'
);
