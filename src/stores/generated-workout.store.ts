import { create } from "zustand";

type GeneratedWorkoutStore = {
  status: "idle" | "loading" | "success" | "error";
  workout?: Workout;
  setWorkout: (workout: Workout) => void;
  setStatus: (status: "idle" | "loading" | "success" | "error") => void;
};

export const useGeneratedWorkoutStore = create<GeneratedWorkoutStore>(
  (set) => ({
    status: "loading",
    workout: undefined,
    setWorkout: (workout: Workout) => set({ workout }),
    setStatus: (status: "idle" | "loading" | "success" | "error") =>
      set({ status }),
  })
);
