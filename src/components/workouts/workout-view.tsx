"use client";

import { useState } from "react";
import { DefaultLayout } from "@/components/layouts/default-layout";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

type Props = {
  workout: Workout;
};

export function WorkoutView({ workout }: Props) {
  const [tab, setTab] = useState<"view" | "edit">("view");
  const exercises = workout.structure as Array<Exercise>;
  const exerciseCount = exercises.length;

  return (
    <DefaultLayout
      header={
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{workout.name}</h1>
          <Tabs
            defaultValue={tab}
            onValueChange={(value) => setTab(value as "view" | "edit")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="view">View</TabsTrigger>
              <TabsTrigger value="edit">Edit</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      }
    >
      {tab === "view" ? (
        <ExercisesList exercises={exercises} />
      ) : (
        <EditWorkout />
      )}
    </DefaultLayout>
  );
}

function EditWorkout() {
  return <div>No exercises</div>;
}

function ExercisesList({ exercises }: { exercises: Exercise[] }) {
  if (exercises.length === 0) {
    return <div>Empty state</div>;
  }

  return (
    <div>
      {exercises.map((exercise) => (
        <div key={exercise.id}>{exercise.name}</div>
      ))}
    </div>
  );
}
