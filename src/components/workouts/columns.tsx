"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";

export const columns: ColumnDef<Workout>[] = [
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
  },
  {
    id: "created_at",
    header: () => <div className="text-right">Created at</div>,
    accessorKey: "created_at",
    cell: ({ row }) => {
      return <div className="text-right">{row.original.created_at}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    accessorKey: "actions",
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <Button variant="ghost" size="icon">
            <Pencil />
          </Button>
        </div>
      );
    },
  },
];
