import { Button } from "@/components/ui/button";
import { PageWithStickyFooter } from "@/components/layouts/PageWithStickyFooter";
import { CreatorForm } from "@/components/creator/creator-form";

export default function CreatorPage() {
  return (
    <PageWithStickyFooter
      renderHeader={() => (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">New workout</h1>
            <p className="text-sm text-muted-foreground">
              Build it yourself, or let the AI do it for you.
            </p>
          </div>
          <Button variant="outline" size="sm">
            Preview
          </Button>
        </div>
      )}
      footer={
        <div className="flex justify-end gap-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </div>
      }
    >
      <section>
        <CreatorForm />
      </section>
    </PageWithStickyFooter>
  );
}
