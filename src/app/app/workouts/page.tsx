import { getWorkouts } from "./actions";
import { PageWithStickyFooter } from "@/components/layouts/PageWithStickyFooter";
import { WorkoutsList } from "@/components/workouts/workouts-list";

export default async function WorkoutsPage() {
  const workouts = await getWorkouts();

  if (workouts.error) {
    return <div>{workouts.error}</div>;
  }

  return (
    <PageWithStickyFooter
      renderHeader={() => (
        <div>
          <h1 className="text-2xl font-bold">Workouts</h1>
          <p className="text-sm text-muted-foreground">
            View, edit, and delete your workouts.
          </p>
        </div>
      )}
    >
      <WorkoutsList workouts={workouts.data} />
    </PageWithStickyFooter>
  );
}
