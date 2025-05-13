import { create } from "zustand";

type FormState = {
  submittingForms: Set<string>;
  setFormSubmitting: (formId: string, isSubmitting: boolean) => void;
  isFormSubmitting: (formId: string) => boolean;
};

export const useFormStore = create<FormState>((set, get) => ({
  submittingForms: new Set(),
  setFormSubmitting: (formId: string, isSubmitting: boolean) =>
    set((state) => {
      const newSet = new Set(state.submittingForms);
      if (isSubmitting) {
        newSet.add(formId);
      } else {
        newSet.delete(formId);
      }
      return { submittingForms: newSet };
    }),
  isFormSubmitting: (formId: string) => get().submittingForms.has(formId),
}));
