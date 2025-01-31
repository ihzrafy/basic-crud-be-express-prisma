import { printTimestamp } from '@/middlewares/printTimestamp';
import { Request, Response} from 'express';


export const get = (req: Request, res: Response) => {
    const users = [
        { id: 1, name: 'Name1' },
        { id: 2, name: 'Name2' },
  ];
  res.json(users);
};

export const post = [
  printTimestamp,
  (req: Request, res: Response) => {
    const newUser = {
      id: Date.now(),
      name: req.body.name,
    };
    // Normally, you would save this user to a database
    res.status(201).json(newUser);
  },
];

export const put = [
  printTimestamp,
  (req: Request, res: Response) => {
    const updatedUser = {
      id: req.params.id,
      name: req.body.name,
    };
    // Normally, you would update this user in a database
    res.status(200).json(updatedUser);
  },
];

export const del = [
  printTimestamp,
  (req: Request, res: Response) => {
    const userId = req.params.id;
    // Normally, you would delete this user from a database
    res.status(204).send();
  },
];