"use client";

import { Plus, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Combobox } from "../ui/combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { exercises } from "@/lib/exercises";
import { zodResolver } from "@hookform/resolvers/zod";

const workoutSchema = z.object({
  name: z.string().min(1),
  exercises: z.array(
    z.object({
      id: z.string().nonempty("Exercise is required"),
      reps: z.number().min(1),
      breakBetweenSets: z.number().min(1),
      type: z.enum(["time", "reps"]),
      sets: z.number().min(1),
    })
  ),
});

type WorkoutFormValues = z.infer<typeof workoutSchema>;

const exerciseOptions = exercises.map((exercise) => ({
  value: exercise.id,
  label: exercise.name,
}));

export function CreatorForm() {
  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      name: "",
      exercises: [],
    },
  });
  const { fields, append, remove, insert } = useFieldArray({
    control: form.control,
    name: "exercises",
  });

  return (
    <Form {...form}>
      <form className="space-y-4">
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
                      breakBetweenSets: 1,
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
                      value={field.value}
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
                      {form.watch(`exercises.${index}.type`) === "time"
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
