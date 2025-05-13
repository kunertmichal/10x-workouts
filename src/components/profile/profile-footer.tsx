"use client";

import { Button } from "@/components/ui/button";
import { useFormStore } from "@/stores/form.store";

export function ProfileFooter() {
  const isSubmitting = useFormStore((state) =>
    state.isFormSubmitting("profile-form")
  );

  return (
    <div className="flex justify-end gap-4">
      <Button
        variant="outline"
        type="reset"
        form="profile-form"
        disabled={isSubmitting}
      >
        Reset
      </Button>
      <Button type="submit" form="profile-form" disabled={isSubmitting}>
        Save
      </Button>
    </div>
  );
}
