import { create } from "zustand";

export type Form = {
    id: number;
    label: string;
    inputType: string;
}

type FormInitialState = {
    forms: Form[];
    createForm: (form: Form) => void;
    resetForm: () => void;
    removeForm: (id: number) => void;
}

export const useStore = create<FormInitialState>((set) => ({
    forms: [],
    createForm(form){
        return set((state) => (
            {
                ...state,
                forms: [...state.forms, form]
            }
        ))
    },
    resetForm(){
        return set((state) => (
            {
                ...state,
                forms: [],
            }
        ))
    },
    removeForm(id){
        return set((state) => {
            const updatedForm = state.forms.filter((form) => form.id !== id);
            return {
                ...state,
                forms: updatedForm,
            }
        })
    }
}))