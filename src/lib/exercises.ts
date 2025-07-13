export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroups?: string[];
  equipment?: string[];
}

export const exercises: Exercise[] = [
  {
    id: "break",
    name: "Break",
    description: "Break between sets or exercises",
  },
  {
    id: "jump-rope",
    name: "Jump rope",
    description: "Jump rope",
  },
  {
    id: "glute-bridge",
    name: "Glute bridge",
    description: "Glute bridge",
  },
  {
    id: "single-leg-glute-bridge",
    name: "Single-leg glute bridge",
    description: "Single-leg glute bridge",
  },
  {
    id: "body-row",
    name: "Body row",
    description: "Body row",
  },
  {
    id: "bulgarian-split-squat",
    name: "Bulgarian split squat",
    description: "Single-leg squat with rear foot elevated",
  },
  {
    id: "reverse-lunge",
    name: "Reverse lunge",
    description: "Reverse lunge",
  },
  {
    id: "copenhagen-adductor",
    name: "Copenhagen adductor",
    description: "Copenhagen adductor",
  },
  {
    id: "calf-raise",
    name: "Calf raise",
    description: "Calf raise",
  },
  {
    id: "single-leg-calf-raise",
    name: "Single-leg calf raise",
    description: "Single-leg calf raise",
  },
  {
    id: "seated-calf-raise",
    name: "Seated calf raise",
    description: "Seated calf raise",
  },
  {
    id: "nordic-hamstring-curl",
    name: "Nordic hamstring curl",
    description: "Nordic hamstring curl",
  },
  {
    id: "single-leg-deadlift",
    name: "Single-leg deadlift",
    description: "Single-leg deadlift",
  },
  {
    id: "toe-raise",
    name: "Toe raise",
    description: "Toe raise",
  },
  {
    id: "push-up",
    name: "Push up",
    description: "Push up",
  },
  {
    id: "pike-push-up",
    name: "Pike push up",
    description: "Pike push up",
  },
  {
    id: "push-up-to-plank",
    name: "Push up to plank",
    description: "Push up to plank",
  },
  {
    id: "bodyweight-row",
    name: "Bodyweight row",
    description: "Bodyweight row",
  },
  {
    id: "superman",
    name: "Superman",
    description: "Superman",
  },
  {
    id: "plank",
    name: "Plank",
    description: "Plank",
    muscleGroups: ["core"],
    equipment: [],
  },
  {
    id: "side-plank",
    name: "Side plank",
    description: "Side plank",
  },
  {
    id: "scissor-jump",
    name: "Scissor jump",
    description: "Scissor jump",
    muscleGroups: ["calves", "glutes", "quadriceps"],
    equipment: ["kettlebell", "dumbbell"],
  },
  {
    id: "squat",
    name: "Squat",
    description: "Squat",
    muscleGroups: ["quadriceps", "hamstrings"],
    equipment: ["kettlebell", "dumbbell"],
  },
  {
    id: "jump-squat",
    name: "Jump squat",
    description: "Jump squat",
    muscleGroups: ["quadriceps", "hamstrings"],
    equipment: ["kettlebell", "dumbbell"],
  },
  {
    id: "kneeling-sissy-squat",
    name: "Kneeling sissy squat",
    description: "Kneeling sissy squat",
    muscleGroups: ["quadriceps"],
    equipment: ["kettlebell", "dumbbell"],
  },
  // Chest
];

export function getExerciseById(id: string) {
  return exercises.find((exercise) => exercise.id === id);
}

export function getExerciseName(id: string) {
  const exercise = getExerciseById(id);
  return exercise ? exercise.name : id;
}
