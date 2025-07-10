import { describe, it, expect } from "vitest";
import { exercises, getExerciseById } from "./exercises";

describe("getExerciseById", () => {
  it("should return the exercise with the given id", () => {
    const exercise = getExerciseById("push-up");
    expect(exercise).toBeDefined();
  });

  it("should have exercises with unique ids", () => {
    const exerciseIds = exercises.map((exercise) => exercise.id);
    const uniqueExerciseIds = [...new Set(exerciseIds)];
    expect(exerciseIds.length).toBe(uniqueExerciseIds.length);
  });
});
