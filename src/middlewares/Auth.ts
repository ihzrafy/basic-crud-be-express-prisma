import { CustomRequestStudent } from "@/types";
import { Response, NextFunction } from "express";

export const printTimestampForStudents = (req: CustomRequestStudent, res: Response, next: NextFunction) => {
    console.log(`Accessing ${req.originalUrl}: ${new Date().toString()}`);

    if (req.query.stop === 'true') {
        return res.status(403).json({
            message: 'STOP !!!!',
        });
    }

    req.user = {
        name: "Ihzra Fahrullizian",
        nim: "J0303211043",
        major: "Teknologi Rekayasa Perangkat Lunak"
    };

    next();
};
