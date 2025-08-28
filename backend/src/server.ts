import Fastify from "fastify";
import patientRoutes from "./routes/patient.routes.ts";
import multipart from "@fastify/multipart";
import cors from "@fastify/cors";
import noteRoutes from "./routes/notes.routes.ts";
import formRoutes from "./routes/forms.routes.ts";
import config from "./config/config.ts";

const fastify = Fastify({ logger: true });

await fastify.register(cors, {
  origin: config.origin,
});
await fastify.register(multipart);
await fastify.register(patientRoutes);
await fastify.register(noteRoutes);
await fastify.register(formRoutes);

const PORT = Number(process.env.PORT) || 3000;

const HOST = config.nodeEnv === "docker" ? "0.0.0.0" : "localhost";

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: HOST });
    fastify.log.info(`Server listening on http://${HOST}:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
