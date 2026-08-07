import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { HttpError } from "../utils/httpError";

export interface JwtPayload {
    id: number;
    login: string;
    nome: string;
    perfil: "ADMIN" | "USER";
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

    const token = req.cookies?.token;

    if (!token) {
        return next(
            new HttpError(
                401,
                "Token não informado."
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