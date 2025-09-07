import { Router, Request, Response } from 'express';

// Este router se dedicará exclusivamente a las rutas que no interactúan
// con la base de datos, como los health checks.
const pingRouter = Router();

/**
 * @route GET /ping
 * @description Respond with a 'pong' message and a status of 200.
 * @access Public
* This route does not perform any operations itself
* asynchronously, does not query the database, and does not consume significant resources.
* Its sole purpose is to confirm that the server is up and respond
* as quickly as possible, keeping the service available since it is free.
 */
pingRouter.get('/ping', (_req: Request, res: Response) => {
  // A response is sent in JSON format.
  res.status(200).json({ message: 'pong' });
});

export default pingRouter;
