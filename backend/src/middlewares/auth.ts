import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { HttpError } from "../utils/httpError";

export interface JwtPayload {
    id: number;
    login: string;
    nome: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(
            new HttpError(
                401,
                "Token não informado."
            )
        );
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
        return next(
            new HttpError(
                401,
                "Token inválido."
            )
        );
    }

    try {

        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as JwtPayload;

        req.user = payload;

        next();

    } catch {

        next(
            new HttpError(
                401,
                "Token inválido ou expirado."
            )
        );

    }

}