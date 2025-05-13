import { DefaultLayout } from "@/components/layouts/default-layout";
import { WorkoutProvider } from "@/components/creator/workout-provider";
import { GenerateButton } from "@/components/creator/generate-button";
import { CreatorFooter } from "@/components/creator/creator-footer";

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
      footer={<CreatorFooter />}
    >
      <section>
        <WorkoutProvider />
      </section>
    </DefaultLayout>
  );
}
