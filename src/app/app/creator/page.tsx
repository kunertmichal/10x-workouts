import { Button } from "@/components/ui/button";
import { DefaultLayout } from "@/components/layouts/default-layout";
import { CreatorForm } from "@/components/creator/creator-form";
import { GenerateButton } from "@/components/creator/generate-button";

export default function CreatorPage() {
  return (
    <DefaultLayout
      header={
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">New workout</h1>
            <p className="text-sm text-muted-foreground">
              Build it yourself, or let the AI do it for you.
            </p>
          </div>
          <GenerateButton />
        </div>
      }
      footer={
        <div className="flex justify-end gap-4">
          <Button variant="outline" type="reset" form="creator-form">
            Reset
          </Button>
          <Button type="submit" form="creator-form">
            Save
          </Button>
        </div>
      }
    >
      <section>
        <CreatorForm />
      </section>
    </DefaultLayout>
  );
}
