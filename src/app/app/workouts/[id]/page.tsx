type Props = {
  params: {
    id: string;
  };
};

export default function WorkoutDetailsPage({ params }: Props) {
  return <div>WorkoutDetailsPage - {params.id}</div>;
}
