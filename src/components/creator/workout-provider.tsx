"use client";

import { useGeneratedWorkoutStore } from "@/stores/generated-workout.store";
import { CreatorForm } from "./creator-form";
import { Skeleton } from "../ui/skeleton";

export function WorkoutProvider() {
  const workout = useGeneratedWorkoutStore((state) => state.workout);
  const status = useGeneratedWorkoutStore((state) => state.status);

  if (status === "loading") {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-22 w-full" />
        <Skeleton className="h-22 w-full" />
        <Skeleton className="h-22 w-full" />
        <Skeleton className="h-22 w-full" />
        <Skeleton className="h-9 w-30" />
      </div>
    );
  }

  return <CreatorForm workout={workout} type="create" />;
}
