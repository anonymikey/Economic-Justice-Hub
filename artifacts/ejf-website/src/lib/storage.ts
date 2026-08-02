import { supabase } from "./supabase";

const PUBLICATION_BUCKET = "publications";

export async function uploadPublicationAsset(file: File, kind: "pdf" | "cover") {
  const extension = file.name.split(".").pop()?.toLowerCase() || (kind === "pdf" ? "pdf" : "jpg");
  const path = `${kind}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage
    .from(PUBLICATION_BUCKET)
    .upload(path, file, { upsert: false, contentType: file.type || undefined });

  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(PUBLICATION_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}