"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { workoutSchema, aiGeneratedWorkoutSchema } from "./types";
import { openrouter } from "@/utils/supabase/axios";
import { exercises } from "@/lib/exercises";
import { openrouterJsonSchema } from "@/lib/openrouter-json-schema";

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
        validatedFields.error.flatten().fieldErrors
      )}`,
    };
  }

  const { data, error } = await supabase
    .from("workouts")
    .insert({
      name: validatedFields.data.name,
      owner: user.id,
      source: "manual",
      structure: validatedFields.data.exercises,
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    return { error: "Failed to save workout" };
  }

  revalidatePath("/", "layout");
  redirect(`/app/workouts/${data.id}`);
}

export async function generateWorkout(): Promise<Workout | { error: string }> {
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

  const prompt = getPrompt({
    birthday,
    weight,
    training_goals,
    equipment,
  });

  try {
    const response = await openrouter.post("/chat/completions", {
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: {
        type: "json_schema",
        json_schema: openrouterJsonSchema,
      },
    });
    const workoutParsed = JSON.parse(response.data.choices[0].message.content);

    const validatedWorkout = aiGeneratedWorkoutSchema.safeParse(workoutParsed);

    if (!validatedWorkout.success) {
      console.error("AI generated invalid workout:", validatedWorkout.error);
      return { error: "AI generated an invalid workout structure" };
    }

    return {
      id: "ai-generated",
      owner: user.id,
      name: validatedWorkout.data.workoutName,
      source: "ai",
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      structure: validatedWorkout.data.exercises,
    };
  } catch (e) {
    console.error(e);
    return { error: "Failed to generate workout" };
  }
}

function getPrompt({
  birthday,
  weight,
  training_goals,
  equipment,
}: {
  birthday: string | null;
  weight: number | null;
  training_goals: string | null;
  equipment: string[] | null;
}) {
  // TODO: generate prompt based on the user's profile
  void birthday;
  void weight;
  void training_goals;
  void equipment;

  const userAge = () => {
    if (!birthday) return "Not provided";
    const today = new Date();
    const birthDate = new Date(birthday);
    return today.getFullYear() - birthDate.getFullYear();
  };

  const userWeight = () => {
    if (!weight) return "Not provided";
    return weight;
  };

  const userTrainingGoals = () => {
    if (!training_goals) return "Not provided";
    return training_goals;
  };

  const filteredExercisesByEquipment = exercises.filter((exercise) => {
    if (exercise.id === "break") return true;
    if (exercise.equipment?.length === 0) return true;
    return exercise.equipment?.some((e) => equipment?.includes(e)) ?? false;
  });
  const exerciseIds = filteredExercisesByEquipment.map(
    (exercise) => exercise.id
  );
  const prompt = `
    You are a fitness trainer tasked with creating personalized workout routines. Your goal is to generate a workout based on a list of available exercises.

    Here is the list of available exercises:

    <user_age>
    ${userAge()}
    </user_age>

    <user_weight>
    ${userWeight()}
    </user_weight>

    <user_training_goals>
    ${userTrainingGoals()}
    </user_training_goals>

    <available_exercises>
    ${JSON.stringify(exerciseIds.join(", "))}
    </available_exercises>

    Please create a workout routine using the following guidelines:

    1. Select exercises from the available list above.
    2. Exercise types can be either 'time' (measured in seconds) or 'reps' (number of repetitions).
    3. To create a break between exercises, use the id "break".
    4. Ensure a good mix of exercises and breaks in the workout.
    5. Choose a suitable name for the workout based on the exercises you plan to include.
    6. Determine appropriate durations for time-based exercises and repetitions for rep-based exercises.
    8. Plan where to insert breaks and their durations.
    `;
  return prompt;
}
