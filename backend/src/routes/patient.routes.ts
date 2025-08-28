import { FastifyInstance } from "fastify";
import { getPatients, getPatient } from "../controllers/patient.controller.ts";

export default async function patientRoutes(fastify: FastifyInstance) {
  fastify.get("/patients", getPatients);
  fastify.get("/patients/:id", getPatient);
  fastify.get("/health", async (request, reply) => {
    return {
      status: "ok",
      uptime: process.uptime(),
      timestamp: Date.now(),
    };
  });
}
