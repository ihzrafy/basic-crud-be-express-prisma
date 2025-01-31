import { main_db } from '@/lib/db';
import { CustomRequest } from '@/types';
import { Response } from 'express';
import { printTimestamp } from '@/middlewares/printTimestamp';

export const get = async (req: CustomRequest, res: Response) => {
    const categories = await main_db.mst_todo_category.findMany({
      where: {
        deleted_at: {
          equals: null,
        },
      },
      include: {
        todos: true,
      },
    });
  
    res.status(200).json({
      message: "Categories berhasil diambil",
      data: categories,
    });
  };
  
export const post = [
    printTimestamp,
    async (req: CustomRequest, res: Response) => {
        try {
            const { category } = req.body;
            const newCategory = await main_db.mst_todo_category.create({
                data: {
                    category: category,
                }
            });
            res.status(201).json({
                status: true,
                data: newCategory,
            });
        } catch (error) {
            res.status(500).json({ message: "Failed to add category", error });
        }
    },
];
