import { ReactElement } from "react";
import { faker } from "@faker-js/faker";
import { expect } from "vitest";
import { render, RenderOptions } from "@testing-library/react";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { ...options });

// Test data factories using faker
export const createMockUser = () => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  avatar: faker.image.avatar(),
  created_at: faker.date.past().toISOString(),
  updated_at: faker.date.recent().toISOString(),
});

// Common test utilities
export const waitFor = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const mockLocalStorage = () => {
  const store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach((key) => delete store[key]);
    },
  };
};

export const mockSessionStorage = () => {
  const store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach((key) => delete store[key]);
    },
  };
};

// Common assertion helpers
export const expectToHaveClasses = (
  element: HTMLElement,
  classes: string[]
) => {
  classes.forEach((className) => {
    expect(element).toHaveClass(className);
  });
};

export const expectToNotHaveClasses = (
  element: HTMLElement,
  classes: string[]
) => {
  classes.forEach((className) => {
    expect(element).not.toHaveClass(className);
  });
};

// Re-export everything from testing-library
export * from "@testing-library/react";
export { customRender as render };
