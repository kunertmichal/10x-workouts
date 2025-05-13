"use client";

import { Button } from "@/components/ui/button";
import { useGeneratedWorkoutStore } from "@/stores/generated-workout.store";
import { useFormStore } from "@/stores/form.store";

export function CreatorFooter() {
  const status = useGeneratedWorkoutStore((state) => state.status);
  const isSubmitting = useFormStore((state) =>
    state.isFormSubmitting("creator-form")
  );

  return (
    <div className="flex justify-end gap-4">
      <Button
        variant="outline"
        type="reset"
        form="creator-form"
        disabled={status === "loading" || isSubmitting}
      >
        Reset
      </Button>
      <Button
        type="submit"
        form="creator-form"
        disabled={status === "loading" || isSubmitting}
      >
        Save
      </Button>
    </div>
  );
}
