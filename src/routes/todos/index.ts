import { main_db } from '@/lib/db';
import { printTimestamp } from '@/middlewares/printTimestamp';
import { CustomRequest, CustomRequestStudent } from '@/types';
import { Response } from 'express';

export const get = async (req: CustomRequest, res: Response) => {
    const todos = await main_db.tr_todo.findMany({
      where: {
        deleted_at: {
          equals: null,
        },
      },
    });
  
    res.status(200).json({
      message: "Todos berhasil diambil",
      data: todos,
    });
  };
  
export const post = [
  printTimestamp,
    async (req: CustomRequest, res: Response) => {
        try {
            const { title, category_id, description, progress = 0 } = req.body;
            const created_by = req.user.username;
            const todo = await main_db.tr_todo.create({
                data: {
                    title: title,
                    created_by: created_by,
                    category_id : category_id,
                    description: description,
                    progress: progress
                }
            });
            res.status(201).json({
                status: true,
                data: todo,
            });
        } catch (error) {
            res.status(500).json({ message: "Failed to add todo", error });
        }
    },
];
