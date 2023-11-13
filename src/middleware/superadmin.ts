import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";

const superadmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization!.split(" ")[1];
        const decode: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        if(decode.role !== "superadmin") throw new Error;
        next();
    } catch (error) {
        return res.status(401).json("Access Denied");
    }
}

export default superadmin;