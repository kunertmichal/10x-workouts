import { Dumbbell } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";

type Props = {
  workouts: Workout[];
};

export function WorkoutsList({ workouts }: Props) {
  if (workouts.length === 0) {
    return (
      <EmptyState
        icon={<Dumbbell />}
        title="No workouts yet"
        description="Click below and create one!"
        buttonText="Create workout"
        buttonHref="/app/creator"
      />
    );
  }

  return <DataTable data={workouts} columns={columns} />;
}
