"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { workoutSchema } from "./types";

export async function saveWorkout(formData: FormData) {
  const supabase = await createClient();

  // check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
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
  // todo
}
