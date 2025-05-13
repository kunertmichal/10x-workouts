import { getWorkouts } from "./actions";
import { DefaultLayout } from "@/components/layouts/default-layout";
import { WorkoutsList } from "@/components/workouts/workouts-list";

export default async function WorkoutsPage() {
  const workouts = await getWorkouts();

  if (workouts.error) {
    return <div>{workouts.error}</div>;
  }

  return (
    <DefaultLayout
      header={
        workouts.data.length > 0 ? (
          <div>
            <h1 className="text-2xl font-bold">Workouts</h1>
            <p className="text-sm text-muted-foreground">
              View, edit, and delete your workouts.
            </p>
          </div>
        ) : undefined
      }
    >
      <WorkoutsList workouts={workouts.data} />
    </DefaultLayout>
  );
}
