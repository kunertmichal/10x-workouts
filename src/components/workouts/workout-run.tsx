import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  workout: Workout;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
};

export function WorkoutRun({ workout, isRunning, setIsRunning }: Props) {
  return (
    <Dialog open={isRunning} onOpenChange={setIsRunning}>
      <DialogContent className="h-[calc(100%-2rem)] sm:max-w-[calc(100%-2rem)]">
        <DialogHeader>
          <DialogTitle>{workout.name}</DialogTitle>
        </DialogHeader>
        <div>content</div>
      </DialogContent>
    </Dialog>
  );
}
