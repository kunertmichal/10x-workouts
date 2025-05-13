"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

  console.log(data);

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

  revalidatePath("/app/workouts");
  redirect("/app/workouts");
}

export async function updateWorkout(workoutId: string, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Unauthorized" };
  }

  const name = formData.get("name") as string;
  const exercises = JSON.parse(formData.get("exercises") as string);

  const { error } = await supabase
    .from("workouts")
    .update({
      name,
      structure: exercises,
    })
    .eq("id", workoutId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/app/workouts/${workoutId}`);
  return { error: null };
}
