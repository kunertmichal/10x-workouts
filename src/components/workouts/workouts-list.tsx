import { Dumbbell } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Button } from "../ui/button";

type Props = {
  workouts: Workout[];
};

export function WorkoutsList({ workouts }: Props) {
  if (workouts.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-12">
        <div className="border rounded-md inline-flex items-center justify-center bg-gray-50 p-2 mb-4">
          <Dumbbell />
        </div>
        <p className="font-semibold text-xl ">No wrokouts yet</p>
        <p className="text-sm text-muted-foreground mb-4">
          Click below and create one!
        </p>
        <Button asChild>
          <Link href="/app/workouts/creator">Create workout</Link>
        </Button>
      </div>
    );
  }

  return <DataTable data={workouts} columns={columns} />;
}
