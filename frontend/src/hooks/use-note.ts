import { noteService } from "@/services/note-service";
import { usePatientStore } from "@/store/patient";
import { useState, useEffect } from "react";

export const useNote = (onClose: () => void) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const { id, setNotes, notes } = usePatientStore();

    useEffect(() => {
        setFile(null);
    }, [id]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            return;
        }
        if (!id) {
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setUploading(true);
            const response = await noteService.uploadNote(id, formData);
            setNotes([...notes, response.note])
            setFile(null);
            onClose();
        } catch (error: any) {
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    return { uploading, handleFileChange, handleUpload, file };
};
