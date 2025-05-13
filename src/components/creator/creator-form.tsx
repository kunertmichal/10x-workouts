"use client";

import { Plus, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { exercises } from "@/lib/exercises";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkoutFormValues, workoutSchema } from "@/app/app/creator/types";
import { saveWorkout } from "@/app/app/creator/actions";
import { updateWorkout } from "@/app/app/workouts/[id]/actions";
import { useEffect } from "react";
import { useFormStore } from "@/stores/form.store";

const exerciseOptions = exercises.map((exercise) => ({
  value: exercise.id,
  label: exercise.name,
}));

type CreatorFormProps = {
  workout?: Workout;
};

export function CreatorForm({ workout }: CreatorFormProps) {
  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      name: workout?.name ?? "",
      exercises: workout?.structure as Array<Exercise>,
    },
  });
  const { fields, append, remove, insert } = useFieldArray({
    control: form.control,
    name: "exercises",
  });
  const setFormSubmitting = useFormStore((state) => state.setFormSubmitting);

  useEffect(() => {
    if (workout) {
      form.reset({
        name: workout.name,
        exercises: workout.structure as Array<Exercise>,
      });
    }
  }, [workout, form]);

  const onSubmit = async (data: WorkoutFormValues) => {
    setFormSubmitting("creator-form", true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("exercises", JSON.stringify(data.exercises));

      const result = workout
        ? await updateWorkout(workout.id, formData)
        : await saveWorkout(formData);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(workout ? "Workout updated" : "Workout created");
      }
    } finally {
      setFormSubmitting("creator-form", false);
    }
  };

  return (
    <Form {...form}>
      <Toaster />
      <form
        id="creator-form"
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={() => form.reset()}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter workout name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-end gap-4 bg-muted/30 p-4 rounded-lg"
            >
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    insert(index, {
                      id: "",
                      type: "reps",
                      reps: 1,
                      sets: 1,
                      breakBetweenSets: 0,
                    })
                  }
                >
                  <Plus />
                </Button>
              </div>

              <FormField
                control={form.control}
                name={`exercises.${index}.id`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Exercise</FormLabel>
                    <FormControl>
                      <Combobox
                        options={exerciseOptions}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select exercise"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`exercises.${index}.type`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Type</FormLabel>
                    <Select
                      value={
                        form.watch(`exercises.${index}.id`) === "break"
                          ? "time"
                          : field.value
                      }
                      onValueChange={field.onChange}
                      disabled={form.watch(`exercises.${index}.id`) === "break"}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="reps">Reps</SelectItem>
                        <SelectItem value="time">Time</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch(`exercises.${index}.id`) !== "break" && (
                <>
                  <FormField
                    control={form.control}
                    name={`exercises.${index}.breakBetweenSets`}
                    render={({ field }) => (
                      <FormItem className="w-32">
                        <FormLabel>Break</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`exercises.${index}.sets`}
                    render={({ field }) => (
                      <FormItem className="w-32">
                        <FormLabel>Sets</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <FormField
                control={form.control}
                name={`exercises.${index}.reps`}
                render={({ field }) => (
                  <FormItem className="w-32">
                    <FormLabel>
                      {form.watch(`exercises.${index}.type`) === "time" ||
                      form.watch(`exercises.${index}.id`) === "break"
                        ? "Seconds"
                        : "Reps"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => remove(index)}
              >
                <Trash />
              </Button>
            </div>
          ))}
        </div>

        {fields.length > 0 ? (
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                id: "",
                type: "reps",
                reps: 1,
                sets: 1,
                breakBetweenSets: 1,
              })
            }
          >
            Add more
          </Button>
        ) : (
          <div className="border border-dashed border-muted-foreground/50 rounded-lg p-8 flex flex-col gap-2 items-center justify-center">
            <p className="text-muted-foreground">No exercises added yet</p>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  id: "",
                  type: "reps",
                  reps: 1,
                  sets: 1,
                  breakBetweenSets: 1,
                })
              }
            >
              Add first Exercise
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
