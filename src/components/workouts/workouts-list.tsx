import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

type Props = {
  workouts: Workout[];
};

export function WorkoutsList({ workouts }: Props) {
  if (workouts.length === 0) {
    return <div>TODO: Empty state</div>;
  }

  return <DataTable data={workouts} columns={columns} />;
}
