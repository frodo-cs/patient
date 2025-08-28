import type { Form } from "@/types/form";
import instance from "../config/config";
import type { Note } from "../types/note";

const uploadNote = async (patientId: number, formData: FormData) => {
    const response: { note: Note, form: Form } = await instance.post(`/patients/${patientId}/notes/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response;
};

const getNotesForPatient = async (patientId: number) => {
    const response: Note[] = await instance.get(`/patients/${patientId}/notes`);
    return response;
};

const getNoteDetails = async (noteId: string) => {
    const response: Note = await instance.get(`/notes/${noteId}`);
    return response;
};

export const noteService = {
    uploadNote,
    getNotesForPatient,
    getNoteDetails,
};