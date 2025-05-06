/*
 * DTO and Command Models for the application
 *
 * ProfileDTO: Represents user profile details based on the profiles table.
 * UpdateProfileCommand: Fields for updating a profile (partial update, excluding immutable fields).
 *
 * WorkoutDTO: Represents a workout entity based on the workouts table.
 * CreateWorkoutCommand: Fields required to create a new workout.
 * UpdateWorkoutCommand: Partial fields for updating an existing workout.
 *
 * GenerationDTO: Represents a generation record based on the generations table.
 * CreateGenerationCommand: Fields required to create a new generation record.
 * UpdateGenerationCommand: Partial fields for updating an existing generation record.
 *
 * ExerciseDTO: Represents an exercise entity based on the exercises definition.
 */

import type { Json } from "@/app/db/database.types";

export interface WorkoutStructure {
  workoutName: string;
  exercises: {
    id: string;
    reps: number;
    sets: number;
    breakBetweenSets: number;
    type: "time" | "reps";
  }[];
}

export interface ProfileDTO {
  user_id: string;
  birthday: string | null;
  created_at: string;
  equipment: string[] | null;
  training_goals: string | null;
  updated_at: string;
  weight: number | null;
}

// For profile updates, we omit immutable fields such as userId and createdAt
export interface UpdateProfileCommand {
  birthday?: string | undefined;
  weight?: number | undefined;
  training_goals?: string | undefined;
  equipment?: string[] | undefined;
}

export interface WorkoutDTO {
  id: string;
  name: string;
  owner: string;
  source: "manual" | "ai" | "ai-edited";
  structure: Json; // Represents the JSON structure of the workout
  created_at: string;
  updated_at: string;
}

export interface CreateWorkoutCommand {
  owner: string;
  name: string;
  structure: Json;
  source: "manual" | "ai" | "ai-edited";
}

// For updating workouts, all fields are optional
export type UpdateWorkoutCommand = Partial<CreateWorkoutCommand>;

export interface GenerationDTO {
  id: string;
  prompt: string;
  answer: string;
  is_valid: boolean;
  is_accepted: boolean;
  owner: string;
  created_at: string;
  updated_at: string;
}

export interface CreateGenerationCommand {
  prompt: string;
  answer: string;
  is_valid: boolean;
  is_accepted: boolean;
}

// For updating generations, all fields are optional
export type UpdateGenerationCommand = Partial<CreateGenerationCommand>;
