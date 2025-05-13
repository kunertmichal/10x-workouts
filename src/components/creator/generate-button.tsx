"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { generateWorkout } from "@/app/app/creator/actions";
import { Button } from "@/components/ui/button";

export function GenerateButton() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("loading");
    await handleRequest();
  };

  const handleRequest = async () => {
    try {
      setState("loading");
      const result = await generateWorkout();
      console.log(result);
      setState("success");
    } catch (error) {
      console.error(error);
      setState("error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button variant="ai" type="submit" disabled={state === "loading"}>
        <Zap />
        Generate
      </Button>
    </form>
  );
}
