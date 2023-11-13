import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization!.split(" ")[1];
        if (!token) {
            return res.status(401).json('Authentication required.');;
        }

        jwt.verify(token, process.env.JWT_SECRET || 'secret', (error, decoded) => {
            if (error) { 
                return res.status(403).json('Invalid token');;
            }
            req.body.user = decoded;
            next();
        });

    } catch (error) {
        return res.status(401).json("Access Denied");
    }
}

export default auth;