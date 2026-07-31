import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";

import { UsuarioService } from "../services/usuario.service";

@injectable()
export class UsuarioController {

    constructor(
        @inject(UsuarioService)
        private usuarioService: UsuarioService
    ) {}

    async find(req: Request, res: Response, next: NextFunction) {
        try {

            const usuarios = await this.usuarioService.find();

            return res.json(usuarios);

        } catch (error) {
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {

            const id = Number(req.params.id);

            const usuario = await this.usuarioService.findById(id);

            return res.json(usuario);

        } catch (error) {
            next(error);
        }
    }

    async insert(req: Request, res: Response, next: NextFunction) {
        try {

            const usuario = await this.usuarioService.insert(req.body);

            return res.status(201).json(usuario);

        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {

            const id = Number(req.params.id);

            await this.usuarioService.update(id, req.body);

            return res.sendStatus(204);

        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {

            const id = Number(req.params.id);

            await this.usuarioService.delete(id);

            return res.sendStatus(204);

        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {

            const { LOGIN, SENHA } = req.body;

            const result = await this.usuarioService.login(
                LOGIN,
                SENHA
            );

            return res.json(result);

        } catch (error) {
            next(error);
        }
    }

}