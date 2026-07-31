import { Request, Response, NextFunction } from "express";

import { HttpError } from "../utils/httpError";

export function authorize(...logins: string[]) {

    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        if (!req.user) {
            return next(
                new HttpError(
                    401,
                    "Usuário não autenticado."
                )
            );
        }

        if (!logins.includes(req.user.login)) {
            return next(
                new HttpError(
                    403,
                    "Acesso negado."
                )
            );
        }

        next();

    };

}