import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/httpError";

export function admin(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
        return next(new HttpError(401, "Usuário não autenticado."));
    }

    if (req.user.perfil !== "ADMIN") {
        return next(
            new HttpError(403, "Acesso permitido somente para administradores.")
        );
    }

    next();
}
