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
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { WorkoutRun } from "./workout-run";
import { CreatorForm } from "@/components/creator/creator-form";

type Props = {
  workout: Workout;
};

export function WorkoutView({ workout }: Props) {
  const workoutId = workout.id;
  const [tab, setTab] = useState<"view" | "edit">("view");
  const [isRunning, setIsRunning] = useState(false);
  const { confirm, ConfirmDialog } = useConfirmDialog();
  const exercises = workout.structure as Array<Exercise>;
  const hasAnyExercises = exercises.length > 0;

  const onDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const confirmed = await confirm({
      title: "Delete Workout",
      description:
        "Are you sure you want to delete this workout? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (!confirmed) return;
    const result = await deleteWorkout(workoutId);
    if (result.error) {
      toast.error(result.error);
    }
  };

  const onRun = () => {
    setIsRunning(true);
  };

  return (
    <DefaultLayout
      header={
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{workout.name}</h1>
          <div className="flex gap-2">
            <Tabs
              value={tab}
              onValueChange={(value) => setTab(value as "view" | "edit")}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="view">View</TabsTrigger>
                <TabsTrigger value="edit">Edit</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button onClick={onRun} disabled={!hasAnyExercises}>
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
      footer={
        tab === "edit" ? (
          <div className="flex justify-end gap-4">
            <Button variant="outline" type="reset" form="creator-form">
              Reset
            </Button>
            <Button type="submit" form="creator-form">
              Save
            </Button>
          </div>
        ) : null
      }
    >
      <Toaster />
      {ConfirmDialog}
      {isRunning && (
        <WorkoutRun
          workout={workout}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
        />
      )}
      {tab === "view" ? (
        <ExercisesList
          exercises={exercises}
          onEmptyStateButtonClick={() => setTab("edit")}
        />
      ) : (
        <CreatorForm workout={workout} type="edit" />
      )}
    </DefaultLayout>
  );
}
