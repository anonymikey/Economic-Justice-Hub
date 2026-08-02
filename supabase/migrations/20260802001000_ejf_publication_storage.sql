-- EJF publication assets: public PDFs and cover images, writable only by admins.
insert into storage.buckets (id, name, public)
values ('publications', 'publications', true)
on conflict (id) do update set public = excluded.public;

create policy "Public can read publication assets"
on storage.objects for select
to public
using (bucket_id = 'publications');

create policy "Admins can upload publication assets"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'publications'
  and public.is_admin()
);

create policy "Admins can update publication assets"
on storage.objects for update
to authenticated
using (bucket_id = 'publications' and public.is_admin())
with check (bucket_id = 'publications' and public.is_admin());

create policy "Admins can delete publication assets"
on storage.objects for delete
to authenticated
using (bucket_id = 'publications' and public.is_admin());