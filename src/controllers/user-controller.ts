import type { Request, Response } from 'express';
import { userModel, type User } from '../models/users-model';

type CreateBody = {
  id: string;
  name: string;
};

export function getUser(req: Request<{ id: string }>, res: Response) {
  const user = userModel.get(req.params.id);

  if (!user) {
    return res.status(404).json({
      error: 'Not found',
    });
  }

  res.json(user);
}

export async function createUser(req: Request<{}, {}, CreateBody>, res: Response) {
  const data: User = {
    id: req.body.id,
    name: req.body.name,
    createdAt: new Date(),
  };

  await userModel.create(data);

  return res.status(201).send();
}

export async function updateUser(
  req: Request<{ id: string }, {}, CreateBody>,
  res: Response,
) {
  const updated = await userModel.update(req.params.id, req.body);

  if (!updated) {
    return res.status(404).json({
      error: 'User not found',
    });
  }

  return res.sendStatus(200);
}

export async function deleteUser(req: Request<{ id: string }>, res: Response) {
  const deleted = await userModel.delete(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      error: 'User not found',
    });
  }

  return res.sendStatus(204);
}
