import { main_db } from '@/lib/db';
import { printTimestampForStudents } from '@/middlewares/Auth';
import { printTimestamp } from '@/middlewares/printTimestamp';
import { CustomRequest, CustomRequestStudent } from '@/types';
import { Response } from 'express';

export const get = 
  async (req: CustomRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({
          status: false,
          message: "ID tidak valid",
        });
      }

      const todo = await main_db.tr_todo.findFirst({
        where: {
          id,
          deleted_at: null,
        },
      });

      if (!todo) {
        return res.status(404).json({
          status: false,
          message: "Todo tidak ditemukan",
        });
      }

      res.status(200).json({
        status: true,
        data: todo,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };

export const put = [
    printTimestamp,
  async (req: CustomRequest, res: Response) => {
    try {
      const { title, category_id, description, progress = 0 } = req.body;
      const id = parseInt(req.params.id, 10);

      console.log('Ini dari PUT: ', req.user);

      if (isNaN(id)) {
        return res.status(400).json({
          status: false,
          message: "ID tidak valid",
        });
      }

      const isExist = await main_db.tr_todo.findFirst({
        where: {
          id,
          deleted_at: null,
        },
      });

      if (!isExist) {
        return res.status(404).json({
          status: false,
          message: "Todo tidak ditemukan",
        });
      }

      const updatedTodo = await main_db.tr_todo.update({
        where: { id },
        data: {
          title,
          category_id,
          description,
          progress,
          updated_at: new Date(),
        },
      });

      return res.status(200).json({
        status: true,
        message: "Todo berhasil diperbarui",
        data: updatedTodo,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
];

export const del = [
    printTimestamp,
  async (req: CustomRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({
          status: false,
          message: "ID tidak valid",
        });
      }

      const isExist = await main_db.tr_todo.findFirst({
        where: {
          id,
          deleted_at: null,
        },
      });

      if (!isExist) {
        return res.status(404).json({
          status: false,
          message: "Todo tidak ditemukan",
        });
      }

      const deletedTodo = await main_db.tr_todo.update({
        where: { id },
        data: { deleted_at: new Date(), isDeleted: true },
      });

      return res.status(200).json({
        status: true,
        message: "Todo berhasil dihapus",
        data: deletedTodo,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
];