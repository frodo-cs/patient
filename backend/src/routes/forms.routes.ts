import { FastifyInstance } from "fastify";
import { getFormForNote } from "../controllers/form.controller.ts";

export default async function formRoutes(fastify: FastifyInstance) {
    fastify.get("/notes/:note_id/form", getFormForNote);
}