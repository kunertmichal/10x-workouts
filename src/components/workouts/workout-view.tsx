"use client";

import { useState } from "react";
import { Play, Trash } from "lucide-react";
import { toast } from "sonner";
import { deleteWorkout } from "@/app/app/workouts/[id]/actions";
import { DefaultLayout } from "@/components/layouts/default-layout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExercisesList } from "@/components/exercises/exercises-list";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

type Props = {
  workout: Workout;
};

export function WorkoutView({ workout }: Props) {
  const workoutId = workout.id;
  const [tab, setTab] = useState<"view" | "edit">("view");
  const exercises = workout.structure as Array<Exercise>;

  const onDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("deleting");

    event.preventDefault();

    // display confirmation modal

    const result = await deleteWorkout(workoutId);
    if (result.error) {
      toast.error(result.error);
    }
  };

  return (
    <DefaultLayout
      header={
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{workout.name}</h1>
          <div className="flex gap-2">
            <Tabs
              defaultValue={tab}
              onValueChange={(value) => setTab(value as "view" | "edit")}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="view">View</TabsTrigger>
                <TabsTrigger value="edit">Edit</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button>
              <Play className="h-4 w-4" />
              Run
            </Button>
            <form onSubmit={onDelete}>
              <Button variant="destructive">
                <Trash className="h-4 w-4" />
                Delete
              </Button>
            </form>
          </div>
        </div>
      }
      footer={tab === "edit" ? <div>Footer</div> : null}
    >
      <Toaster />
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
