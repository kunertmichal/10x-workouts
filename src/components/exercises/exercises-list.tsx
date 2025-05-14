import { Dumbbell } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { getExerciseName } from "@/lib/exercises";

const columns: ColumnDef<Exercise>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
    cell: ({ row }) => getExerciseName(row.original.id),
  },
  {
    id: "type",
    accessorKey: "type",
    header: () => <div className="text-right">Type</div>,
    cell: ({ row }) => {
      return <div className="text-right">{row.original.type}</div>;
    },
  },
  {
    id: "breakBetweenSets",
    accessorKey: "breakBetweenSets",
    header: () => <div className="text-right">Break</div>,
    cell: ({ row }) => {
      return <div className="text-right">{row.original.breakBetweenSets}</div>;
    },
  },
  {
    id: "sets",
    header: () => <div className="text-right">Sets</div>,
    accessorKey: "sets",
    cell: ({ row }) => {
      return <div className="text-right">{row.original.sets}</div>;
    },
  },
  {
    id: "reps",
    header: () => <div className="text-right">Reps / seconds</div>,
    accessorKey: "reps",
    cell: ({ row }) => {
      return <div className="text-right">{row.original.reps}</div>;
    },
  },
];

type Props = {
  exercises: Exercise[];
  onEmptyStateButtonClick: () => void;
};

export function ExercisesList({ exercises, onEmptyStateButtonClick }: Props) {
  if (exercises.length === 0) {
    return (
      <EmptyState
        icon={<Dumbbell />}
        title="No exercises yet"
        description="Go to Edit mode to add exercises to your workout"
        buttonText="Add exercise"
        onButtonClick={onEmptyStateButtonClick}
      />
    );
  }

  return <DataTable data={exercises} columns={columns} />;
}
