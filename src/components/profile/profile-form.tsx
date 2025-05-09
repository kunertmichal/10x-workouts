"use client";

import { useForm } from "react-hook-form";
import { Dumbbell, Zap, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Combobox } from "@/components/ui/combobox";
import { equipment } from "@/lib/equipment";
import { Badge } from "@/components/ui/badge";
import { profileSchema, ProfileValues } from "@/app/app/profile/types";
import { updateProfile } from "@/app/app/profile/actions";
import { Toaster } from "../ui/sonner";

type Props = {
  profile: Profile;
};

export function ProfileForm({ profile }: Props) {
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: profile,
  });

  const onSubmit = async (data: ProfileValues) => {
    const formData = new FormData();
    formData.append("weight", data.weight?.toString() ?? "");
    formData.append("birthday", data.birthday ?? "");
    formData.append("equipment", data.equipment?.join(",") ?? "");
    formData.append("training_goals", data.training_goals ?? "");
    const result = await updateProfile(formData);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Profile updated successfully");
    }
  };

  return (
    <Form {...form}>
      <Toaster />
      <form id="profile-form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value ? Number(field.value) : 0}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birthday</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center my-6 gap-2">
          <span className="text-sm text-muted-foreground">Training goals</span>
          <Separator className="flex-1" />
        </div>

        <FormField
          control={form.control}
          name="training_goals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Zap className="w-4 h-4 text-yellow-500" />
                How do you want to train? (AI feature)
              </FormLabel>
              <FormControl>
                <Textarea
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center my-6 gap-2">
          <span className="text-sm text-muted-foreground">Equipment</span>
          <Separator className="flex-1" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="equipment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Dumbbell className="w-4 h-4 text-blue-500" />
                  What equipment do you have?
                </FormLabel>
                <FormControl>
                  <Combobox
                    options={equipment}
                    onValueChange={(value) => {
                      const currentEquipment = field.value || [];
                      if (!currentEquipment.includes(value)) {
                        field.onChange([...currentEquipment, value]);
                      }
                    }}
                    placeholder="Select equipment"
                    width="100%"
                  />
                </FormControl>
                {field.value && field.value.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {field.value.map((item) => {
                      const equipmentItem = equipment.find(
                        (e) => e.value === item
                      );
                      return (
                        <Badge key={item} className="flex items-center gap-1">
                          {equipmentItem?.label}
                          <button
                            type="button"
                            onClick={() => {
                              field.onChange(
                                field.value?.filter((val) => val !== item) || []
                              );
                            }}
                            className="ml-1 hover:text-destructive cursor-pointer"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      );
                    })}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
