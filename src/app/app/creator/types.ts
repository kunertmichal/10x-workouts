import { z } from "zod";

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

export type WorkoutFormValues = z.infer<typeof workoutSchema>;
