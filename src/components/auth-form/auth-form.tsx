"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { login, signup } from "@/app/login/actions";
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
import { AuthDTO } from "@/types";
import { Toaster } from "../ui/sonner";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function AuthForm() {
  const form = useForm<AuthDTO>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const isSubmitting = form.formState.isSubmitting;

  const onLogin = async (data: AuthDTO) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    const result = await login(formData);
    if (result.error) {
      toast.error(result.error);
    }
  };

  const onSignup = async (data: AuthDTO) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    const result = await signup(formData);
    if (result.error) {
      toast.error(result.error);
    }
  };

  return (
    <main className="container max-w-md mx-auto mt-16 px-4">
      <Toaster />
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground">
          Sign in or create an account to continue
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
              onClick={form.handleSubmit(onLogin)}
            >
              Login
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              disabled={isSubmitting}
              onClick={form.handleSubmit(onSignup)}
            >
              Sign up
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
