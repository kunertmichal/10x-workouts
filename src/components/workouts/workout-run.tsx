import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Play, Pause } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

type Props = {
  workout: Workout;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
};

type Break = {
  id: "break";
  reps: number;
};

type Exercise = {
  id: string;
  type: "time" | "reps";
  breakBetweenSets: number;
  sets: number;
  reps: number;
};

type ExerciseStructure = Break | Exercise;

const isBreak = (exercise: ExerciseStructure): exercise is Break => {
  return exercise.id === "break";
};

export function WorkoutRun({ workout, isRunning, setIsRunning }: Props) {
  const [state, setState] = useState({
    currentExerciseIndex: 0,
    currentSet: 1,
    timeLeft: 0,
    isTimerRunning: false,
  });

  const exercises = workout.structure as ExerciseStructure[];
  const currentExercise = exercises[state.currentExerciseIndex];
  const isCurrentExerciseBreak = isBreak(currentExercise);
  const currentSet = isCurrentExerciseBreak ? 1 : state.currentSet;
  const totalSets = isCurrentExerciseBreak ? 1 : currentExercise.sets;
  const type = isCurrentExerciseBreak ? "time" : currentExercise.type;

  useEffect(() => {
    if (isCurrentExerciseBreak) {
      setState((prev) => ({
        ...prev,
        timeLeft: currentExercise.reps,
        isTimerRunning: true,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        isTimerRunning: false,
      }));
    }
  }, [state.currentExerciseIndex]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.isTimerRunning && state.timeLeft > 0) {
      interval = setInterval(() => {
        setState((prev) => {
          if (prev.timeLeft <= 1) {
            handleNext();
            return {
              ...prev,
              timeLeft: 0,
              isTimerRunning: false,
            };
          }
          return {
            ...prev,
            timeLeft: prev.timeLeft - 1,
          };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [state.isTimerRunning, state.timeLeft]);

  const handleNext = () => {
    if (isCurrentExerciseBreak) {
      setState((prev) => ({
        ...prev,
        currentExerciseIndex: Math.min(
          prev.currentExerciseIndex + 1,
          exercises.length - 1
        ),
        currentSet: 1,
      }));
    } else {
      const isLastExercise =
        state.currentExerciseIndex === exercises.length - 1;
      const isLastSet = currentSet === currentExercise.sets;

      if (isLastExercise && isLastSet) {
        return;
      }

      if (currentSet < currentExercise.sets) {
        setState((prev) => ({
          ...prev,
          currentSet: prev.currentSet + 1,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          currentExerciseIndex: prev.currentExerciseIndex + 1,
          currentSet: 1,
        }));
      }
    }
  };

  const handlePrevious = () => {
    if (currentSet > 1) {
      setState((prev) => ({
        ...prev,
        currentSet: prev.currentSet - 1,
      }));
    } else {
      const previousExercise =
        exercises[Math.max(0, state.currentExerciseIndex - 1)];
      setState((prev) => ({
        ...prev,
        currentExerciseIndex: Math.max(0, prev.currentExerciseIndex - 1),
        currentSet: !isBreak(previousExercise) ? previousExercise.sets : 1,
      }));
    }
  };

  const calculateProgress = () => {
    let totalSteps = 0;
    let completedSteps = 0;

    exercises.forEach((exercise) => {
      if (isBreak(exercise)) {
        totalSteps += 1;
      } else {
        totalSteps += exercise.sets;
      }
    });

    for (let i = 0; i < state.currentExerciseIndex; i++) {
      const exercise = exercises[i];
      if (isBreak(exercise)) {
        completedSteps += 1;
      } else {
        completedSteps += exercise.sets;
      }
    }

    if (isCurrentExerciseBreak) {
    } else {
      completedSteps += Math.max(0, state.currentSet - 1);
    }

    return (completedSteps / totalSteps) * 100;
  };

  const toggleTimer = () => {
    setState((prev) => ({
      ...prev,
      isTimerRunning: !prev.isTimerRunning,
    }));
  };

  return (
    <Dialog open={isRunning} onOpenChange={setIsRunning}>
      <DialogContent className="h-[calc(100%-2rem)] sm:max-w-[calc(100%-2rem)] flex flex-col">
        <DialogHeader>
          <DialogTitle>{workout.name}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground font-semibold">
            {Math.round(calculateProgress())}%
          </span>
          <Progress className="my-4" value={calculateProgress()} />
        </div>
        <Card className="flex-1 flex flex-col">
          <CardHeader className="text-center">
            <CardTitle>{currentExercise.id}</CardTitle>
            <CardDescription>
              Set {currentSet} of {totalSets}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="size-[400px] bg-red-100 mx-auto">grafika</div>
            {type === "time" ? (
              <div className="text-center text-4xl font-bold mt-4">
                {state.timeLeft}s
              </div>
            ) : (
              <div>{currentExercise.reps} reps</div>
            )}
          </CardContent>
          <CardFooter className="mt-auto flex gap-2 items-center justify-center">
            <Button size="icon" variant="outline" onClick={handlePrevious}>
              <ArrowLeft />
            </Button>
            <Button size="icon" variant="outline" onClick={toggleTimer}>
              {state.isTimerRunning ? <Pause /> : <Play />}
            </Button>
            <Button size="icon" variant="outline" onClick={handleNext}>
              <ArrowRight />
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
