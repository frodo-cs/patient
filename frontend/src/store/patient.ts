import type { Note } from "@/types/note"
import { create } from "zustand"

type PatientState = {
    id: number | null
    setId: (id: number) => void
    notes: Note[];
    setNotes: (notes: Note[]) => void
    clear: () => void
}

export const usePatientStore = create<PatientState>((set) => ({
    id: null,
    setId: (id) => set({ id }),
    notes: [],
    setNotes: (notes) => set({ notes }),
    clear: () => set({ id: null, notes: [] }),
}))