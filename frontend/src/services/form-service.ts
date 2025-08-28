import instance from "../config/config";
import type { Form } from "../types/form";


const getFormForNote = async (noteId: number) => {
    const response: Form = await instance.get(`/notes/${noteId}/form`);
    return response;
};

export const formService = {
    getFormForNote,
};


