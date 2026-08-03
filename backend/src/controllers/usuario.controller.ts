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
    ) {}



    async find(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const result =
                await this.usuarioService.findSafe({

                    page: Number(req.query.page),

                    limit: Number(req.query.limit)

                });


            return res.json(result);


        } catch(error) {

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


        } catch(error) {

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
                await this.usuarioService.insert(
                    req.body
                );


            return res
                .status(201)
                .json(result);


        } catch(error) {

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
                await this.usuarioService.update(
                    Number(req.params.id),
                    req.body
                );


            return res.json(result);


        } catch(error) {

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


        } catch(error) {

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


            return res.json(result);


        } catch(error) {

            next(error);

        }

    }

}