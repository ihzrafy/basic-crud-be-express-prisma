import { PrismaClient as PrismaClientMainDb } from "@/generated/main_db";
import { PrismaClient as PrismaClientDigitalAuthDb } from "@/generated/auth_db";

export const main_db = new PrismaClientMainDb();
export const auth_db = new PrismaClientDigitalAuthDb();