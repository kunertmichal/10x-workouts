export const openrouterJsonSchema = {
  name: "workout",
  strict: true,
  schema: {
    type: "object",
    properties: {
      workoutName: {
        type: "string",
        description: "The name of the workout",
      },
      exercises: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The id of the exercise.",
            },
            type: {
              type: "string",
              description:
                "The type of set, can be either 'time' (measured in seconds) or 'reps' (number of repetitions)",
            },
            reps: {
              type: "number",
              description:
                "The number of reps for the exercise. It depends on the 'type' field. If 'type' is 'time', it is the number of seconds for the set. If 'type' is 'reps', it is the number of reps for the set.",
            },
            sets: {
              type: "number",
              description: "The number of sets for the exercise.",
            },
            breakBetweenSets: {
              type: "number",
              description: "The number of seconds to rest between the sets.",
            },
          },
          required: ["id", "reps", "type", "sets", "breakBetweenSets"],
          additionalProperties: false,
        },
      },
    },
    required: ["workoutName", "exercises"],
    additionalProperties: false,
  },
};
