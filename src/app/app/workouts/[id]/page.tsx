import { WorkoutView } from "@/components/workouts/workout-view";
import { getWorkout } from "./actions";

type Props = {
  params: {
    id: string;
  };
};

export default async function WorkoutDetailsPage({ params }: Props) {
  const { id } = await params;
  const { data, error } = await getWorkout(id);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Workout not found</div>;
  }

  return <WorkoutView workout={data} />;
}
