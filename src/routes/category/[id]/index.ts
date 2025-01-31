import { main_db } from '@/lib/db';
import { printTimestamp } from '@/middlewares/printTimestamp';
import { CustomRequest } from '@/types';
import { Response } from 'express';

export const get = [
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

      const category = await main_db.mst_todo_category.findFirst({
        where: {
          id,
          deleted_at: null,
        },
        include: {
          todos: true,
        },
      });

      if (!category) {
        return res.status(404).json({
          status: false,
          message: "Kategori tidak ditemukan",
        });
      }

      res.status(200).json({
        status: true,
        data: category,
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

export const put = [
    printTimestamp,
  async (req: CustomRequest, res: Response) => {
    try {
      const { category } = req.body;
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({
          status: false,
          message: "ID tidak valid",
        });
      }

      const isExist = await main_db.mst_todo_category.findFirst({
        where: {
          id,
          deleted_at: null,
        },
      });

      if (!isExist) {
        return res.status(404).json({
          status: false,
          message: "Kategori tidak ditemukan",
        });
      }

      const updatedCategory = await main_db.mst_todo_category.update({
        where: { id },
        data: {
          category,
          updated_at: new Date(),
        },
      });

      return res.status(200).json({
        status: true,
        message: "Kategori berhasil diperbarui",
        data: updatedCategory,
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

      const isExist = await main_db.mst_todo_category.findFirst({
        where: {
          id,
          deleted_at: null,
        },
      });

      if (!isExist) {
        return res.status(404).json({
          status: false,
          message: "Kategori tidak ditemukan",
        });
      }

      const deletedCategory = await main_db.mst_todo_category.update({
        where: { id },
        data: { deleted_at: new Date() },
      });

      return res.status(200).json({
        status: true,
        message: "Kategori berhasil dihapus",
        data: deletedCategory,
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