"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { workoutSchema } from "./types";

export async function saveWorkout(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return { error: "Unauthorized" };
  }

  const rawData = {
    name: formData.get("name") as string,
    exercises: JSON.parse(formData.get("exercises") as string),
  };

  const validatedFields = workoutSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error: `Invalid form data: ${JSON.stringify(
        validatedFields.error.errors
      )}`,
    };
  }

  const { error } = await supabase.from("workouts").insert({
    name: validatedFields.data.name,
    owner: user.id,
    source: "manual",
    structure: validatedFields.data.exercises,
  });

  if (error) {
    return { error: "Failed to save workout" };
  }

  revalidatePath("/", "layout");
  redirect("/app/workouts");
}

export async function generateWorkout() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return { error: "Unauthorized" };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (profileError) {
    return { error: "Failed to fetch profile" };
  }

  const birthday = profile.birthday;
  const weight = profile.weight;
  const training_goals = profile.training_goals;
  const equipment = profile.equipment;

  return { birthday, weight, training_goals, equipment };
}
