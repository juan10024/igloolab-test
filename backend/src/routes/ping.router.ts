/**
 * @fileoverview Express router for health check endpoints.
 * @module routes/ping
 * @requires express
 */

import { Router, Request, Response } from 'express';

// Create a Router instance to define the "ping" routes.
const pingRouter = Router();

/**
 * @route   GET /ping
 * @desc    Health check endpoint to keep the server alive.
 * @access  Public
 * @returns {object} A JSON object with a 'pong' message.
 *
 * @description
 * This route is designed to be extremely lightweight and fast. Its sole purpose
 * is to respond to requests to confirm that the server is online and running.
 * It is ideal for:
 * 1. "Keep-alive" services, as implemented in the frontend.
 * 2. Health checks from load balancers or monitoring services.
 */
pingRouter.get('/ping', (_req: Request, res: Response) => {
  // Send a response with a 200 (OK) status and a simple JSON body.

  res.status(200).json({ message: 'pong' });
});

export default pingRouter;