import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";

const columns: ColumnDef<Exercise>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
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

export function ExercisesList({ exercises }: { exercises: Exercise[] }) {
  if (exercises.length === 0) {
    return <div>Empty state</div>;
  }

  return <DataTable data={exercises} columns={columns} />;
}
