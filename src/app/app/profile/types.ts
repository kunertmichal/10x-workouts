import { z } from "zod";

export const profileSchema = z.object({
  birthday: z.string().nullable(),
  weight: z.number().nullable(),
  equipment: z.array(z.string()).nullable(),
  training_goals: z.string().nullable(),
});

export type ProfileValues = z.infer<typeof profileSchema>;
