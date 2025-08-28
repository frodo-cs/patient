import { FastifyReply, FastifyRequest } from "fastify";
import { createForm, getFormByNoteId } from "../models/form.model.ts";
import { Form } from "../models/form.model.ts";

export const createNewForm = async (
    request: FastifyRequest<{ Body: Form }>,
    reply: FastifyReply
) => {
    try {
        const form = await createForm(request.body);
        return reply.status(201).send(form);
    } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: "Failed to create form" });
    }
};

export const getFormForNote = async (
    request: FastifyRequest<{ Params: { note_id: string } }>,
    reply: FastifyReply
) => {
    const { note_id } = request.params;
    try {
        const forms = await getFormByNoteId(Number(note_id));
        return reply.send(forms);
    } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: "Failed to fetch forms for note" });
    }
};
