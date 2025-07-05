import { useEffect, useState, useRef, useCallback } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
} from "lucide-react";
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
import { cn } from "@/lib/utils";
import { getExerciseName } from "@/lib/exercises";
import { CircularProgress } from "../ui/circular-progress";

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
  setNumber: number;
  totalSets: number;
};

type ExerciseStructure = Break | Exercise;

const isBreak = (exercise: ExerciseStructure): exercise is Break => {
  return exercise.id === "break";
};

const isTimeExercise = (exercise: ExerciseStructure): exercise is Exercise => {
  if (isBreak(exercise)) return true;
  return exercise.type === "time";
};

function transformExercises(exercises: ExerciseStructure[]): Exercise[] {
  const result: Exercise[] = [];

  exercises.forEach((exercise) => {
    if (isBreak(exercise)) {
      result.push({
        id: "break",
        type: "time",
        reps: exercise.reps,
        sets: 1,
        breakBetweenSets: 0,
        setNumber: 1,
        totalSets: 1,
      });
      return;
    }

    for (let i = 0; i < exercise.sets; i++) {
      result.push({
        ...exercise,
        setNumber: i + 1,
        totalSets: exercise.sets,
      });

      if (i < exercise.sets - 1) {
        result.push({
          id: "break",
          type: "time",
          reps: exercise.breakBetweenSets,
          sets: 1,
          breakBetweenSets: 0,
          setNumber: 1,
          totalSets: 1,
        });
      }
    }
  });

  return result;
}

const createInitialState = (exercise: ExerciseStructure) => {
  return {
    isAudioMuted: false,
    exerciseIndex: 0,
    isTimerRunning: false,
    timeLeft: isTimeExercise(exercise) ? exercise.reps : 0,
  };
};

const createAudio = (soundFile: string) => {
  const audio = new Audio();
  audio.src = `/${soundFile}`;
  audio.load();
  return audio;
};

export function WorkoutRun({ workout, isRunning, setIsRunning }: Props) {
  const exercises = transformExercises(
    workout.structure as Array<ExerciseStructure>
  );
  const firstExercise = exercises[0];
  const [state, setState] = useState(createInitialState(firstExercise));
  const beepInitialRef = useRef<HTMLAudioElement | null>(null);
  const beepLastRef = useRef<HTMLAudioElement | null>(null);
  const currentExercise = exercises[state.exerciseIndex];
  const hasNextExercise = state.exerciseIndex < exercises.length - 1;
  const hasPreviousExercise = state.exerciseIndex > 0;
  const nextExercise = exercises[state.exerciseIndex + 1];
  const previousExercise = exercises[state.exerciseIndex - 1];
  const canReset =
    state.timeLeft !== (isTimeExercise(firstExercise) ? firstExercise.reps : 0);

  useEffect(() => {
    // Initialize audio elements
    beepInitialRef.current = createAudio("beep-initial.mp3");
    beepLastRef.current = createAudio("beep-last.mp3");

    return () => {
      // Cleanup audio elements
      if (beepInitialRef.current) {
        beepInitialRef.current.pause();
        beepInitialRef.current = null;
      }
      if (beepLastRef.current) {
        beepLastRef.current.pause();
        beepLastRef.current = null;
      }
    };
  }, []);

  const playSound = useCallback(
    (isLastBeep: boolean) => {
      if (state.isAudioMuted) return;

      const audio = isLastBeep ? beepLastRef.current : beepInitialRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch((error) => {
          console.error("Error playing sound:", error);
        });
      }
    },
    [state.isAudioMuted]
  );

  const handleNext = () => {
    if (!hasNextExercise) return;
    setState({
      ...state,
      timeLeft: isTimeExercise(nextExercise) ? nextExercise.reps : 0,
      exerciseIndex: state.exerciseIndex + 1,
      isTimerRunning: false,
    });
  };

  const handlePrevious = () => {
    if (!hasPreviousExercise) return;
    setState({
      ...state,
      timeLeft: isTimeExercise(previousExercise) ? previousExercise.reps : 0,
      exerciseIndex: state.exerciseIndex - 1,
      isTimerRunning: false,
    });
  };

  const toggleTimer = () => {
    setState({
      ...state,
      isTimerRunning: !state.isTimerRunning,
    });
  };

  const handleClose = () => {
    setState(createInitialState(firstExercise));
    setIsRunning(false);
  };

  const handleRepeat = () => {
    setState(createInitialState(firstExercise));
  };

  const handleAudioMute = () => {
    if (!state.isAudioMuted) {
      // Stop any playing sounds when muting
      if (beepInitialRef.current) {
        beepInitialRef.current.pause();
        beepInitialRef.current.currentTime = 0;
      }
      if (beepLastRef.current) {
        beepLastRef.current.pause();
        beepLastRef.current.currentTime = 0;
      }
    }
    setState((prev) => ({
      ...prev,
      isAudioMuted: !prev.isAudioMuted,
    }));
  };

  const calculateProgress = () => {
    const totalExercises = exercises.length;
    return (state.exerciseIndex / totalExercises) * 100;
  };

  const calculateCircularProgress = () => {
    const totalTime = currentExercise.reps;
    const remainingTime = state.timeLeft;
    const completedTime = totalTime - remainingTime;

    // Calculate percentage of completed time (0-100)
    return Math.max(0, Math.min(100, (completedTime / totalTime) * 100));
  };

  useEffect(() => {
    if (state.isTimerRunning && state.timeLeft > 0) {
      const interval = setInterval(() => {
        setState((prev) => {
          const newTimeLeft = prev.timeLeft - 1;

          if (!prev.isAudioMuted) {
            if (newTimeLeft === 0) {
              playSound(true); // Play last beep
            } else if (newTimeLeft <= 5) {
              playSound(false); // Play initial beep only in last 5 seconds
            }
          }

          return {
            ...prev,
            timeLeft: newTimeLeft,
          };
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [playSound, state.isTimerRunning, state.timeLeft]);

  if (!currentExercise) {
    return <div>No current exercise</div>;
  }

  return (
    <Dialog open={isRunning} onOpenChange={handleClose}>
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
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button size="icon" onClick={handleAudioMute}>
                  {state.isAudioMuted ? <VolumeX /> : <Volume2 />}
                </Button>
                <Button size="icon" onClick={handleRepeat} disabled={!canReset}>
                  <RotateCcw />
                </Button>
              </div>
              <CardTitle className="text-4xl">
                {getExerciseName(currentExercise.id)}
              </CardTitle>
              <div className="w-20" />
            </div>
            <CardDescription>
              <SetIndicator
                id={currentExercise.id}
                setNumber={currentExercise.setNumber}
                totalSets={currentExercise.totalSets}
              />
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentExercise.type === "time" ? (
              <div className="text-4xl font-bold mt-4 text-center">
                {state.timeLeft}s
              </div>
            ) : (
              <div className="text-center text-4xl font-bold mt-4">
                {currentExercise.reps} reps
              </div>
            )}
            {isTimeExercise(currentExercise) && (
              <div className="flex justify-center">
                <CircularProgress
                  value={calculateCircularProgress()}
                  size={200}
                  className="w-full h-full"
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="mt-auto flex gap-2 items-center justify-center">
            <Button
              size="icon"
              onClick={handlePrevious}
              disabled={!hasPreviousExercise}
            >
              <ArrowLeft />
            </Button>
            <Button
              size="icon"
              onClick={toggleTimer}
              disabled={!isTimeExercise(currentExercise)}
            >
              {state.isTimerRunning ? <Pause /> : <Play />}
            </Button>
            <Button
              size="icon"
              onClick={handleNext}
              disabled={!hasNextExercise}
            >
              <ArrowRight />
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

function SetIndicator({
  id,
  setNumber,
  totalSets,
}: {
  id: string;
  setNumber: number;
  totalSets: number;
}) {
  return (
    <div
      className={cn(
        "text-lg font-semibold",
        id === "break" ? "text-white" : "text-muted-foreground"
      )}
    >
      Set {setNumber} of {totalSets}
    </div>
  );
}
