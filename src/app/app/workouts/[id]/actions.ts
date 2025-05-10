"use server";

import { createClient } from "@/utils/supabase/server";

export async function getWorkout(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: authError?.message ?? "Unauthorized" };
  }

  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return { error: error.message };
  }

  return { data, error: null };
}

export async function deleteWorkout(workoutId: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("workouts")
    .delete()
    .eq("id", workoutId);

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}
