"use client";

import { useEffect } from "react";
import { Zap } from "lucide-react";
import { toast } from "sonner";
import { generateWorkout } from "@/app/app/creator/actions";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { useGeneratedWorkoutStore } from "@/stores/generated-workout.store";

function hasError(
  result: Workout | { error: string }
): result is { error: string } {
  return "error" in result;
}

export function GenerateButton() {
  const status = useGeneratedWorkoutStore((state) => state.status);
  const setWorkout = useGeneratedWorkoutStore((state) => state.setWorkout);
  const setStatus = useGeneratedWorkoutStore((state) => state.setStatus);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    void handleRequest();
  };

  const handleRequest = async () => {
    setStatus("loading");
    const result = await generateWorkout();
    if (hasError(result)) {
      setStatus("error");
    } else {
      setWorkout(result);
      setStatus("success");
    }
  };

  useEffect(() => {
    if (status === "success") {
      toast.success("Workout generated successfully");
    } else if (status === "error") {
      toast.error("Failed to generate workout");
    }
  }, [status]);

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <Button variant="ai" type="submit" disabled={status === "loading"}>
          <Zap />
          Generate
        </Button>
      </form>
    </div>
  );
}
