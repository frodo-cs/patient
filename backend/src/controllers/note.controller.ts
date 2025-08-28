import { FastifyReply, FastifyRequest } from "fastify";
import { createNote, getNotesByPatientId, getNoteById } from "../models/note.model.ts";
import { uploadFile } from "../services/s3.ts";
import { extractFormCodes, summarizeText } from "../services/openai.ts";
import { transcribeAudio } from "../services/transcribe.ts";
import { CreateForm, createForm } from "../models/form.model.ts";

export const uploadNote = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { patient_id: patientIdParam } = request.params as { patient_id: string };
        const patient_id = Number(patientIdParam);

        if (!patient_id) return reply.status(400).send({ error: "Invalid patient_id" });

        const mp3File = await request.file();
        if (!mp3File) {
            return reply.status(400).send({ error: "No file uploaded" });
        }

        const buffer = await mp3File.toBuffer();

        const key = `notes/${Date.now()}_${mp3File.filename}`;

        const transcription = await transcribeAudio(buffer);
        const summary = await summarizeText(transcription);
        const codes = await extractFormCodes(transcription);

        await uploadFile(key, buffer, "audio/mpeg");

        const newNote = await createNote({
            patient_id,
            transcription,
            summary,
            s3_key: key,
        });

        const newForm = await createForm({
            note_id: newNote.id,
            data: codes as CreateForm["data"],
        })

        return reply.status(201).send({
            note: newNote,
            form: newForm,
        });
    } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: "Failed to upload note" });
    }
};

export const getNotesForPatient = async (
    request: FastifyRequest<{ Params: { patient_id: string } }>,
    reply: FastifyReply
) => {
    const { patient_id } = request.params;
    try {
        const notes = await getNotesByPatientId(Number(patient_id));
        return reply.send(notes);
    } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: "Failed to fetch notes for patient" });
    }
};

export const getNoteDetails = async (
    request: FastifyRequest<{ Params: { note_id: string } }>,
    reply: FastifyReply
) => {
    const { note_id } = request.params;
    try {
        const note = await getNoteById(Number(note_id));
        if (!note) {
            return reply.status(404).send({ error: "Note not found" });
        }
        return reply.send(note);
    } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: "Failed to fetch note details" });
    }
};

