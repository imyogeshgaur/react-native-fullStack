import { verify } from "jsonwebtoken";
import { resolve } from "path"
import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
config({ path: resolve("./server/src/.env") })

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const verifyUser = verify(req.headers.authorization as string, process.env.JWT_SECRET as string);
        if (verifyUser) {
            next();
        } else {
            return res.status(400).send({ message: "Not Authorized !!!" })
        }
    } catch (error) {
        console.log("Error in Authentication : " + error);
    }
}

export default authenticate;