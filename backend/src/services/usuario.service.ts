import { inject, injectable } from "inversify";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UsuarioDAO } from "../dao/usuario.dao";
import { HttpError } from "../utils/httpError";
import { Usuario } from "../models/Usuario";

@injectable()
export class UsuarioService {

    constructor(
        @inject(UsuarioDAO)
        private usuarioDAO: UsuarioDAO
    ) {}

    async find() {
        return this.usuarioDAO.find();
    }

    async findById(id: number) {

        const usuario = await this.usuarioDAO.findById(id);

        if (!usuario) {
            throw new HttpError(404, "Usuário não encontrado.");
        }

        return usuario;
    }

    async insert(data: {
        LOGIN: string;
        NOME: string;
        SENHA: string;
    }) {

        const existe = await this.usuarioDAO.findByLogin(data.LOGIN);

        if (existe) {
            throw new HttpError(
                409,
                "Login já cadastrado."
            );
        }

        const senhaHash = await bcrypt.hash(
            data.SENHA,
            10
        );

        const id = await this.usuarioDAO.insert({
            LOGIN: data.LOGIN,
            NOME: data.NOME,
            SENHA_HASH: senhaHash,
            ATIVO: "S"
        });

        return {
            id
        };
    }

    async update(
        id: number,
        data: {
            LOGIN?: string;
            NOME?: string;
            SENHA?: string;
            ATIVO?: "S" | "N";
        }
    ) {

        const updateData: Record<string, unknown> = {};

        if (data.LOGIN !== undefined)
            updateData.LOGIN = data.LOGIN;

        if (data.NOME !== undefined)
            updateData.NOME = data.NOME;

        if (data.ATIVO !== undefined)
            updateData.ATIVO = data.ATIVO;

        if (data.SENHA) {
            updateData.SENHA_HASH = await bcrypt.hash(
                data.SENHA,
                10
            );
        }

        await this.usuarioDAO.update(
            id,
            updateData
        );
    }

    async delete(id: number) {
        await this.usuarioDAO.delete(id);
    }

    async login(
        login: string,
        senha: string
    ) {

        const usuario = await this.usuarioDAO.findByLogin(login);

        if (!usuario) {
            throw new HttpError(
                401,
                "Login ou senha inválidos."
            );
        }

        if (usuario.ATIVO === "N") {
            throw new HttpError(
                403,
                "Usuário desativado."
            );
        }

        const senhaValida = await bcrypt.compare(
            senha,
            usuario.SENHA_HASH
        );

        if (!senhaValida) {
            throw new HttpError(
                401,
                "Login ou senha inválidos."
            );
        }

        const token = jwt.sign(
            {
                id: usuario.ID,
                login: usuario.LOGIN,
                nome: usuario.NOME
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "8h"
            }
        );

        return {
            token,
            usuario: {
                id: usuario.ID,
                login: usuario.LOGIN,
                nome: usuario.NOME
            }
        };
    }

}