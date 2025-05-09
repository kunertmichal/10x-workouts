import { createClient } from "@/utils/supabase/server";

export async function getProfile() {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData) {
    return {
      error: authError?.message ?? "Not authenticated",
      data: null,
    };
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", authData.user.id)
    .single();
  if (error) {
    return {
      error: error.message,
      data: null,
    };
  }

  return { data, error: null };
}

export async function updateProfile(profile: Profile) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData) {
    return { error: authError?.message ?? "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("profiles")
    .update(profile)
    .eq("user_id", profile.user_id);

  if (error) {
    return { error: error.message };
  }

  return { data, error };
}
