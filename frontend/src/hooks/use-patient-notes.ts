import { formService } from "@/services/form-service";
import { noteService } from "@/services/note-service";
import { usePatientStore } from "@/store/patient";
import type { Form } from "@/types/form";
import type { Note } from "@/types/note";
import { useCallback, useEffect, useState } from "react";

export const usePatientNotes = () => {
    const { id, notes, setNotes } = usePatientStore();
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [selectedForm, setSelectedForm] = useState<Form | null>(null);
    const [loading, setLoading] = useState(false)

    const handleSelectNote = (note: Note) => {
        setSelectedNote(note);
    };

    const fetchNotes = useCallback(async (patientId: number) => {
        setLoading(true)
        try {
            const response = await noteService.getNotesForPatient(patientId)
            setNotes(response)
        } catch (err) {
            console.error(`Error fetching notes for patient ${patientId}:`, err)
        } finally {
            setLoading(false)
        }
    }, [])

    const fetchForm = useCallback(async (noteId: number) => {
        try {
            const response = await formService.getFormForNote(noteId)
            setSelectedForm(response)
        } catch (err) {
            console.error(`Error fetching form for note ${noteId}:`, err)
        }
    }, [])

    useEffect(() => {
        if (id) {
            fetchNotes(id)
        } else {
            setNotes([])
        }
    }, [id])

    useEffect(() => {
        if (selectedNote) {
            fetchForm(selectedNote.id)
        } else {
            setSelectedForm(null)
        }
    }, [selectedNote])

    return {
        notes,
        loading,
        handleSelectNote,
        selectedNote,
        selectedForm
    }
}