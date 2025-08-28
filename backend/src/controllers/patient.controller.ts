import { FastifyReply, FastifyRequest } from "fastify";
import { getAllPatients, getPatientById } from "../models/patient.model.ts";

export const getPatients = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const patients = await getAllPatients();
        return reply.send(patients);
    } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: "Failed to fetch patients" });
    }
};

export const getPatient = async (
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) => {
    const { id } = request.params;
    try {
        const patient = await getPatientById(Number(id));
        if (!patient) {
            return reply.status(404).send({ error: "Patient not found" });
        }
        return reply.send(patient);
    } catch (error) {
        request.log.error(error);
        return reply.status(500).send({ error: "Failed to fetch patient" });
    }
};