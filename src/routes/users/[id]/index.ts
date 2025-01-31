import { Request, Response } from "express";

export const get = (req: Request, res: Response) => {
  const users = [
    { id: 1, name: "Name1" },
    { id: 2, name: "Name2" },
  ];
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
};


export const put = (req: Request, res: Response) => {
    const users = [
        { id: 1, name: "Name1" },
        { id: 2, name: "Name2" },
      ];
      const user = users.find((u) => u.id === parseInt(req.params.id));
      if (user) {
        user.name = req.body.name;
        res.json(user);
      } else {
        res.status(404).send("User not found");
      }
};


export const del = (req: Request, res: Response) => {
    const users = [
        { id: 1, name: "Name1" },
        { id: 2, name: "Name2" },
      ];
      const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
      if (userIndex !== -1) {
        // User dengan indeks ke berapa dan hapus sebanyak sekali
        users.splice(userIndex, 1); // Remove the user from the array
        res.send("User deleted");
      } else {
        res.status(404).send("User not found");
      }
};