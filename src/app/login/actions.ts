"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { AuthInvalidCredentialsError } from "@supabase/supabase-js";

export async function login(formData: FormData) {
  const supabase = await createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error instanceof AuthInvalidCredentialsError) {
    return { error: "Invalid credentials" };
  } else if (error) {
    return { error: "Something went wrong" };
  }

  revalidatePath("/", "layout");
  redirect("/app/workouts");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signUp(data);
  if (error) {
    return { error: "Cannot sign up" };
  }
  revalidatePath("/", "layout");
  redirect("/app/workouts");
}
