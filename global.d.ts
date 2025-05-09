// types for the db
import { Database } from "@/db/database.types";

declare global {
  type Workout = Database["public"]["Tables"]["workouts"]["Row"];
  type Exercise = Database["public"]["Tables"]["exercises"]["Row"];
  type Set = Database["public"]["Tables"]["sets"]["Row"];
  type Break = Database["public"]["Tables"]["breaks"]["Row"];
  type Profile = Database["public"]["Tables"]["profiles"]["Row"];
}
