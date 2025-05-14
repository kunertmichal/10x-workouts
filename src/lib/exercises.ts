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
  // Calves
  {
    id: "calf-raise",
    name: "Calf raise",
    description: "Calf raise",
    muscleGroups: ["calves"],
    equipment: ["kettlebell", "dumbbell"],
  },
  {
    id: "seated-calf-raise",
    name: "Seated calf raise",
    description: "Seated calf raise",
    muscleGroups: ["calves"],
    equipment: ["kettlebell", "band", "dumbbell"],
  },
  {
    id: "jump-rope",
    name: "Jump rope",
    description: "Jump rope",
    muscleGroups: ["calves", "glutes", "quadriceps"],
    equipment: [],
  },
  // Quadriceps
  {
    id: "bulgarian-split-squat",
    name: "Bulgarian Split Squat",
    description: "Single-leg squat with rear foot elevated",
    muscleGroups: ["quadriceps", "glutes", "hamstrings"],
    equipment: ["dumbbell", "kettlebell"],
  },
  {
    id: "scissor-jump",
    name: "Scissor jump",
    description: "Scissor jump",
    muscleGroups: ["calves", "glutes", "quadriceps"],
    equipment: ["kettlebell", "dumbbell"],
  },
  {
    id: "lunge",
    name: "Lunge",
    description: "Lunge",
    muscleGroups: ["quadriceps", "hamstrings"],
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
  // Glutes
  {
    id: "single-leg-deadlift",
    name: "Single-leg deadlift",
    description: "Single-leg deadlift",
    muscleGroups: ["hamstrings", "glutes"],
    equipment: ["kettlebell", "dumbbell"],
  },
  {
    id: "glute-bridge",
    name: "Glute bridge",
    description: "Glute bridge",
    muscleGroups: ["glutes"],
    equipment: ["kettlebell", "dumbbell"],
  },
  {
    id: "single-leg-glute-bridge",
    name: "Single-leg glute bridge",
    description: "Single-leg glute bridge",
    muscleGroups: ["glutes"],
    equipment: ["kettlebell", "dumbbell"],
  },
  {
    id: "hip-thrust",
    name: "Hip thrust",
    description: "Hip thrust",
    muscleGroups: ["glutes"],
    equipment: ["kettlebell", "dumbbell"],
  },
  {
    id: "side-plank-glute-raise",
    name: "Side plank glute raise",
    description: "Side plank glute raise",
    muscleGroups: ["glutes", "abductors"],
    equipment: ["band"],
  },
  // Core
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
    muscleGroups: ["core"],
    equipment: [],
  },
  {
    id: "russian-twist",
    name: "Russian twist",
    description: "Russian twist",
    muscleGroups: ["core"],
    equipment: ["dumbbell", "kettlebell"],
  },
  {
    id: "mountain-climbers",
    name: "Mountain climbers",
    description: "Mountain climbers",
    muscleGroups: ["core"],
    equipment: [],
  },
];

export function getExerciseById(id: string) {
  return exercises.find((exercise) => exercise.id === id);
}

export function getExerciseName(id: string) {
  const exercise = getExerciseById(id);
  return exercise ? exercise.name : id;
}
