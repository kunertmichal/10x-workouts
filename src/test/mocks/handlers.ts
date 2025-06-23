import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

// Mock data generators
const generateUser = () => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  created_at: faker.date.past().toISOString(),
  updated_at: faker.date.recent().toISOString(),
});

const generateWorkout = () => ({
  id: faker.string.uuid(),
  name: faker.lorem.words(3),
  description: faker.lorem.paragraph(),
  duration: faker.number.int({ min: 15, max: 120 }),
  difficulty: faker.helpers.arrayElement([
    "beginner",
    "intermediate",
    "advanced",
  ]),
  equipment: faker.helpers.arrayElements(
    ["dumbbells", "barbell", "bodyweight", "resistance_bands"],
    { min: 1, max: 3 }
  ),
  exercises: Array.from(
    { length: faker.number.int({ min: 3, max: 8 }) },
    () => ({
      id: faker.string.uuid(),
      name: faker.lorem.words(2),
      sets: faker.number.int({ min: 1, max: 5 }),
      reps: faker.number.int({ min: 5, max: 20 }),
      rest_time: faker.number.int({ min: 30, max: 120 }),
    })
  ),
  created_at: faker.date.past().toISOString(),
  updated_at: faker.date.recent().toISOString(),
});

// API handlers
export const handlers = [
  // Supabase Auth endpoints
  http.post("*/auth/v1/token", () => {
    return HttpResponse.json({
      access_token: faker.string.alphanumeric(40),
      token_type: "bearer",
      expires_in: 3600,
      refresh_token: faker.string.alphanumeric(40),
      user: generateUser(),
    });
  }),

  http.post("*/auth/v1/signup", () => {
    return HttpResponse.json({
      user: generateUser(),
      session: {
        access_token: faker.string.alphanumeric(40),
        refresh_token: faker.string.alphanumeric(40),
        expires_in: 3600,
      },
    });
  }),

  http.post("*/auth/v1/logout", () => {
    return HttpResponse.json({}, { status: 204 });
  }),

  // Supabase REST API endpoints
  http.get("*/rest/v1/profiles", () => {
    return HttpResponse.json([generateUser()]);
  }),

  http.patch("*/rest/v1/profiles", () => {
    return HttpResponse.json(generateUser());
  }),

  http.get("*/rest/v1/workouts", () => {
    const workouts = Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      generateWorkout
    );
    return HttpResponse.json(workouts);
  }),

  http.post("*/rest/v1/workouts", () => {
    return HttpResponse.json(generateWorkout(), { status: 201 });
  }),

  http.get("*/rest/v1/workouts/:id", ({ params }) => {
    const workout = { ...generateWorkout(), id: params.id as string };
    return HttpResponse.json(workout);
  }),

  http.patch("*/rest/v1/workouts/:id", ({ params }) => {
    const workout = { ...generateWorkout(), id: params.id as string };
    return HttpResponse.json(workout);
  }),

  http.delete("*/rest/v1/workouts/:id", () => {
    return HttpResponse.json({}, { status: 204 });
  }),

  // OpenRouter AI API endpoints
  http.post("https://openrouter.ai/api/v1/chat/completions", () => {
    return HttpResponse.json({
      id: faker.string.alphanumeric(10),
      object: "chat.completion",
      created: Date.now(),
      model: "gpt-3.5-turbo",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: JSON.stringify(generateWorkout()),
          },
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: faker.number.int({ min: 10, max: 100 }),
        completion_tokens: faker.number.int({ min: 50, max: 500 }),
        total_tokens: faker.number.int({ min: 60, max: 600 }),
      },
    });
  }),

  // Error simulation handlers
  http.get("*/rest/v1/error-test", () => {
    return HttpResponse.json(
      { error: "Simulated error", message: "This is a test error" },
      { status: 500 }
    );
  }),

  // Fallback handler for unhandled requests
  http.all("*", ({ request }) => {
    console.warn(`Unhandled ${request.method} request to ${request.url}`);
    return HttpResponse.json(
      {
        error: "Endpoint not mocked",
        method: request.method,
        url: request.url,
      },
      { status: 404 }
    );
  }),
];
