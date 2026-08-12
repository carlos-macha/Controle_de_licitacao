import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { container } from "../containers";
import { UsuarioDAO } from "../dao/usuario.dao";
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

export async function authenticate(
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

        const usuarioDAO = container.get(UsuarioDAO);

        const usuario = await usuarioDAO.findById(payload.id);

        if (!usuario) {
            res.clearCookie("token");

            return next(
                new HttpError(
                    401,
                    "Usuário não encontrado."
                )
            );
        }

        if (usuario.ATIVO !== "A") {
            res.clearCookie("token");

            return next(
                new HttpError(
                    403,
                    "Usuário inativo."
                )
            );
        }

        req.user = payload;

        next();

    } catch (error) {

        if (error instanceof HttpError) {
            return next(error);
        }

        res.clearCookie("token");

        next(
            new HttpError(
                401,
                "Token inválido ou expirado."
            )
        );
    }
}