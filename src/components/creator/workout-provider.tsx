"use client";

import { useGeneratedWorkoutStore } from "@/stores/generated-workout.store";
import { CreatorForm } from "./creator-form";

export function WorkoutProvider() {
  const workout = useGeneratedWorkoutStore((state) => state.workout);
  const status = useGeneratedWorkoutStore((state) => state.status);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <CreatorForm workout={workout} />;
}
