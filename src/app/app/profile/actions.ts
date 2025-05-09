"use server";

import { createClient } from "@/utils/supabase/server";
import { profileSchema, ProfileValues } from "./types";

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

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData) {
    return { error: authError?.message ?? "Not authenticated" };
  }

  const rawData = {
    weight: Number(formData.get("weight")),
    birthday: formData.get("birthday") as string,
    equipment: (formData.get("equipment") as string).split(",") ?? [],
    training_goals: formData.get("training_goals") as string,
  };

  const validatedFields = profileSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return { error: "Invalid form data" };
  }

  const { data, error } = await supabase
    .from("profiles")
    .update(rawData)
    .eq("user_id", authData.user.id);

  if (error) {
    return { error: error.message };
  }

  return { data, error };
}
