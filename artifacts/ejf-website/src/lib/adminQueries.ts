import { supabase } from "./supabase";

export interface DBEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  date_iso: string;
  location: string;
  time: string;
  category: string;
  image_url: string;
  featured: boolean;
  published: boolean;
  created_at: string;
}

export interface DBProgram {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  status: string;
  created_at: string;
}

export interface DBPublication {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  category: string;
  description: string;
  image_url: string;
  file_url: string;
  featured: boolean;
  published: boolean;
  created_at: string;
}

export interface DBContact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submitted_at: string;
}

export interface DBDonation {
  id: string;
  donor_name: string;
  donor_email: string;
  amount_kes: number;
  payment_method: string;
  reference: string;
  message: string;
  donated_at: string;
}

export interface DBNewsletter {
  id: string;
  email: string;
  name: string;
  subscribed_at: string;
  active: boolean;
}

export interface DBUser {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  organization: string;
  is_admin: boolean;
  created_at: string;
}

export const adminQueries = {
  events: {
    list: () => supabase.from("events").select("*").order("date_iso", { ascending: false }),
    listPublished: () => supabase.from("events").select("*").eq("published", true).order("date_iso", { ascending: true }),
    insert: (data: Omit<DBEvent, "id" | "created_at">) => supabase.from("events").insert(data).select().single(),
    update: (id: string, data: Partial<DBEvent>) => supabase.from("events").update(data).eq("id", id).select().single(),
    delete: (id: string) => supabase.from("events").delete().eq("id", id),
  },
  programs: {
    list: () => supabase.from("programs").select("*").order("created_at", { ascending: false }),
    listActive: () => supabase.from("programs").select("*").eq("status", "active").order("created_at", { ascending: false }),
    insert: (data: Omit<DBProgram, "id" | "created_at">) => supabase.from("programs").insert(data).select().single(),
    update: (id: string, data: Partial<DBProgram>) => supabase.from("programs").update(data).eq("id", id).select().single(),
    delete: (id: string) => supabase.from("programs").delete().eq("id", id),
  },
  publications: {
    list: () => supabase.from("publications").select("*").order("created_at", { ascending: false }),
    listPublished: () => supabase.from("publications").select("*").eq("published", true).order("created_at", { ascending: false }),
    insert: (data: Omit<DBPublication, "id" | "created_at">) => supabase.from("publications").insert(data).select().single(),
    update: (id: string, data: Partial<DBPublication>) => supabase.from("publications").update(data).eq("id", id).select().single(),
    delete: (id: string) => supabase.from("publications").delete().eq("id", id),
  },
  contacts: {
    list: () => supabase.from("contact_submissions").select("*").order("submitted_at", { ascending: false }),
    delete: (id: string) => supabase.from("contact_submissions").delete().eq("id", id),
  },
  donations: {
    list: () => supabase.from("donations").select("*").order("donated_at", { ascending: false }),
  },
  newsletter: {
    list: () => supabase.from("newsletter_subscriptions").select("*").order("subscribed_at", { ascending: false }),
    toggleActive: (id: string, active: boolean) => supabase.from("newsletter_subscriptions").update({ active }).eq("id", id),
    delete: (id: string) => supabase.from("newsletter_subscriptions").delete().eq("id", id),
  },
  users: {
    list: () => supabase.from("users").select("id, email, full_name, phone, organization, is_admin, created_at").order("created_at", { ascending: false }),
    toggleAdmin: (id: string, is_admin: boolean) => supabase.from("users").update({ is_admin }).eq("id", id),
    getByEmail: (email: string) => supabase.from("users").select("is_admin").eq("email", email).single(),
  },
};
