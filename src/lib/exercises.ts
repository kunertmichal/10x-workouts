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
    id: "standing-calf-raise",
    name: "Standing calf raise",
    description: "Standing calf raise",
    muscleGroups: ["calves"],
    equipment: ["bodyweight", "kettlebell"],
  },
  {
    id: "seated-calf-raise",
    name: "Seated calf raise",
    description: "Seated calf raise",
    muscleGroups: ["calves"],
    equipment: ["kettlebell", "band", "dumbbell"],
  },
  {
    id: "jumping-rope",
    name: "Jumping rope",
    description: "Jumping rope",
    muscleGroups: ["calves", "glutes", "quadriceps"],
    equipment: ["bodyweight", "rope"],
  },
  // Quadriceps
  {
    id: "bulgarian-split-squat",
    name: "Bulgarian Split Squat",
    description: "Single-leg squat with rear foot elevated",
    muscleGroups: ["quadriceps", "glutes", "hamstrings"],
    equipment: ["bodyweight", "dumbbell", "kettlebell"],
  },
  {
    id: "scissor-jump",
    name: "Scissor jump",
    description: "Scissor jump",
    muscleGroups: ["calves", "glutes", "quadriceps"],
    equipment: ["bodyweight", "kettlebell", "dumbbell"],
  },
  {
    id: "lunge",
    name: "Lunge",
    description: "Lunge",
    muscleGroups: ["quadriceps", "hamstrings"],
    equipment: ["bodyweight", "kettlebell", "dumbbell"],
  },
  {
    id: "squat",
    name: "Squat",
    description: "Squat",
    muscleGroups: ["quadriceps", "hamstrings"],
    equipment: ["bodyweight", "kettlebell", "dumbbell"],
  },
  {
    id: "squat-jump",
    name: "Squat jump",
    description: "Squat jump",
    muscleGroups: ["quadriceps", "hamstrings"],
    equipment: ["bodyweight", "kettlebell", "dumbbell"],
  },
  {
    id: "sissy-squat",
    name: "Sissy squat",
    description: "Sissy squat",
    muscleGroups: ["quadriceps"],
    equipment: ["bodyweight", "kettlebell", "dumbbell"],
  },
  // Glutes
  {
    id: "single-leg-deadlift",
    name: "Single-leg deadlift",
    description: "Single-leg deadlift",
    muscleGroups: ["hamstrings", "glutes"],
    equipment: ["bodyweight", "kettlebell", "dumbbell"],
  },
  {
    id: "glute-bridge",
    name: "Glute bridge",
    description: "Glute bridge",
    muscleGroups: ["glutes"],
    equipment: ["bodyweight", "kettlebell", "dumbbell"],
  },
  {
    id: "single-leg-glute-bridge",
    name: "Single-leg glute bridge",
    description: "Single-leg glute bridge",
    muscleGroups: ["glutes"],
    equipment: ["bodyweight", "kettlebell", "dumbbell"],
  },
  // Core
  {
    id: "plank",
    name: "Plank",
    description: "Plank",
    muscleGroups: ["core"],
    equipment: ["bodyweight"],
  },
  {
    id: "side-plank",
    name: "Side plank",
    description: "Side plank",
    muscleGroups: ["core"],
    equipment: ["bodyweight"],
  },
  {
    id: "russian-twist",
    name: "Russian twist",
    description: "Russian twist",
    muscleGroups: ["core"],
    equipment: ["bodyweight"],
  },
  {
    id: "mountain-climbers",
    name: "Mountain climbers",
    description: "Mountain climbers",
    muscleGroups: ["core"],
    equipment: ["bodyweight"],
  },
];

export function getExerciseById(id: string) {
  return exercises.find((exercise) => exercise.id === id);
}
