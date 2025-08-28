import type { FastifyError, FastifyRequest, FastifyReply } from 'fastify';

export interface AppError extends FastifyError {
  statusCode?: number;
}

export const errorHandler = (
  error: AppError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  console.error(error);
  reply.status(error.statusCode || 500).send({
    message: error.message || 'Internal Server Error',
  });
};