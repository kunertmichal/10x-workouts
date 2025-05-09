import { createClient } from "@/utils/supabase/server";

export async function getWorkouts(): Promise<{
  error: string | null;
  data: Workout[];
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "User not found", data: [] };
  }

  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("owner", user.id);

  if (error) {
    return { error: error.message, data: [] };
  }

  return { error: null, data };
}
