import { z } from "zod";
import { exercises } from "@/lib/exercises";

const validExerciseIds = exercises.map((exercise) => exercise.id);

export const workoutSchema = z.object({
  name: z.string().min(1),
  exercises: z.array(
    z.object({
      id: z.string().nonempty("Exercise is required"),
      type: z.enum(["time", "reps"]),
      reps: z.number().min(1),
      breakBetweenSets: z.number().min(0).optional(),
      sets: z.number().min(1).optional(),
    })
  ),
});

export const aiGeneratedWorkoutSchema = z.object({
  workoutName: z.string().min(1, "Workout name is required"),
  exercises: z
    .array(
      z.object({
        id: z.string().refine(
          (id) => validExerciseIds.includes(id),
          (id) => ({
            message: `Exercise with id "${id}" does not exist in the exercises list`,
          })
        ),
        type: z.enum(["time", "reps"]).refine(
          (type) => type === "time" || type === "reps",
          (type) => ({
            message: `Invalid exercise type: ${type}`,
          })
        ),
        reps: z.number().min(1, "Reps must be at least 1"),
        sets: z.number().min(1, "Sets must be at least 1"),
        breakBetweenSets: z
          .number()
          .min(0, "Break between sets must be non-negative"),
      })
    )
    .min(1, "Workout must have at least one exercise"),
});

export type WorkoutFormValues = z.infer<typeof workoutSchema>;
export type AIGeneratedWorkout = z.infer<typeof aiGeneratedWorkoutSchema>;
