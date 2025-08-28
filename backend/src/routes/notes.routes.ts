import { FastifyInstance } from "fastify";
import { uploadNote, getNotesForPatient, getNoteDetails } from "../controllers/note.controller.ts";

export default async function noteRoutes(fastify: FastifyInstance) {
    fastify.post("/patients/:patient_id/notes/upload", uploadNote);
    fastify.get("/patients/:patient_id/notes", getNotesForPatient);
    fastify.get("/notes/:note_id", getNoteDetails);
}