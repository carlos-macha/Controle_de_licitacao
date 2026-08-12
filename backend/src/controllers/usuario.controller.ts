import {
    Request,
    Response,
    NextFunction
} from "express";

import { inject, injectable } from "inversify";

import { UsuarioService } from "../services/usuario.service";


@injectable()
export class UsuarioController {


    constructor(
        @inject(UsuarioService)
        private usuarioService: UsuarioService
    ) { }




    async find(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const {
                page,
                limit,
                orderBy,
                order,
                ...where
            } = req.query;

            const pageValue = Number(page);
            const pageNumber =
                Number.isFinite(pageValue) && pageValue > 0
                    ? Math.floor(pageValue)
                    : 1;

            const limitValue = Number(limit);

            const whereObject = Object.fromEntries(
                Object.entries(where)
                    .filter(
                        ([, value]) =>
                            typeof value === "string" ||
                            typeof value === "number"
                    )
                    .map(([key, value]) => {
                        if (key.startsWith("SEARCH_")) {
                            return [
                                key.replace("SEARCH_", ""),
                                value
                            ];
                        }

                        return [key, value];
                    })
            );

            const result =
                await this.usuarioService.findSafe({
                    page: pageNumber,
                    limit: limitValue,
                    orderBy:
                        typeof orderBy === "string"
                            ? orderBy
                            : undefined,
                    order:
                        order === "DESC"
                            ? "DESC"
                            : "ASC",
                    where:
                        Object.keys(whereObject).length
                            ? whereObject
                            : undefined
                });

            return res.json(result);
        } catch (error) {
            next(error);
        }
    }





    async findById(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const result =
                await this.usuarioService.findSafeById(
                    Number(req.params.id)
                );


            return res.json(result);


        } catch (error) {

            next(error);

        }

    }



    async insert(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const result =
                await this.usuarioService.create(
                    req.body
                );


            return res
                .status(201)
                .json(result);


        } catch (error) {

            next(error);

        }

    }



    async update(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const result =
                await this.usuarioService.updateSafe(
                    Number(req.params.id),
                    req.body
                );


            return res.json(result);


        } catch (error) {

            next(error);

        }

    }



    async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const result =
                await this.usuarioService.delete(
                    Number(req.params.id)
                );


            return res.json({

                "Quantidade deletados": result

            });


        } catch (error) {

            next(error);

        }

    }



    async login(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const result =
                await this.usuarioService.login(

                    req.body.LOGIN,

                    req.body.SENHA

                );

            res.cookie("token", result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.json({
                usuario: result.usuario
            });


        } catch (error) {

            next(error);

        }

    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie("token");
            return res.json({ LOGGED_OUT: true });
        } catch (error) {
            next(error);
        }
    }

    async unlock(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {

            const result =
                await this.usuarioService.unlock(
                    req.user!.id,
                    req.body.SENHA
                );

            return res.json(result);

        } catch (error) {
            next(error);
        }
    }

    async perfil(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {

            const result =
                await this.usuarioService.perfil(
                    req.user!.id,
                );

            return res.json(result);

        } catch (error) {
            next(error);
        }
    }

    async atualizarNome(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {

            const result =
                await this.usuarioService.atualizarNome(
                    req.user!.id,
                    req.body.NOME
                );

            return res.json(result);

        } catch (error) {
            next(error);
        }
    }

    async atualizarSenha(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {

            const result =
                await this.usuarioService.atualizarSenha(
                    req.user!.id,
                    req.body.SENHA_ATUAL,
                    req.body.NOVA_SENHA
                );

            return res.json(result);

        } catch (error) {
            next(error);
        }
    }
}