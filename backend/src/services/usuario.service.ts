import { inject, injectable } from "inversify";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { BaseService } from "./base.service";
import { UsuarioDAO } from "../dao/usuario.dao";
import { Usuario } from "../models/Usuario";
import { HttpError } from "../utils/httpError";
import { UsuarioResponse } from "../schemas/usuario.schema";


interface UsuarioUpdate {
    NOME?: string;
    REDEFINIR_SENHA?: "S" | "N";
    ATIVO?: boolean;
    PERFIL?: "ADMIN" | "USER";
}

interface UsuarioInsert {
    LOGIN: string;
    NOME: string;
    SENHA?: string;
    ATIVO?: "A" | "I";
    PERFIL?: "ADMIN" | "USER";
}

@injectable()
export class UsuarioService extends BaseService<Usuario> {


    constructor(
        @inject(UsuarioDAO)
        private usuarioDAO: UsuarioDAO
    ) {

        super(
            usuarioDAO,
            "Usuário"
        );

    }



    async findSafe(options?: any) {

        const result =
            await this.dao.find(options);


        return {

            ...result,

            data: result.data.map(usuario => {

                const {
                    SENHA_HASH,
                    ...rest
                } = usuario;


                return rest;

            })

        };

    }




    async findSafeById(id: number) {

        const usuario =
            await this.findById(id);


        const {
            SENHA_HASH,
            ...rest
        } = usuario;


        return rest;

    }




    async create(usuario: Omit<Usuario, "ID"> & UsuarioInsert): Promise<UsuarioResponse | null> {

        const existe = await this.usuarioDAO.findByLogin(usuario.LOGIN);

        if (existe) {
            throw new HttpError(
                409,
                "Login já cadastrado."
            );
        }

        const senhaHash = await bcrypt.hash("123456", 10);

        const usuarioCriado = await super.insert({
            LOGIN: usuario.LOGIN,
            NOME: usuario.NOME,
            SENHA_HASH: senhaHash,
            ATIVO: usuario.ATIVO,
            PERFIL: usuario.PERFIL ?? "USER"
        });

        if (!usuarioCriado) {
            return null;
        }

        const {
            SENHA_HASH,
            ...usuarioSemSenha
        } = usuarioCriado;

        return usuarioSemSenha;
    }

    async updateSafe(id: number, usuario: UsuarioUpdate) {



        await this.findById(id);

        const updateData: Record<string, unknown> = {};


        if (usuario.NOME !== undefined) {
            updateData.NOME = usuario.NOME;
        }

        if (usuario.ATIVO !== undefined) {
            updateData.ATIVO = usuario.ATIVO;
        }

        if (usuario.PERFIL !== undefined) {
            updateData.PERFIL = usuario.PERFIL;
        }

        if (usuario.REDEFINIR_SENHA) {
            updateData.SENHA_HASH = await bcrypt.hash("123456", 10);
        }

        const usuarioAtualizado = await super.update(
            id,
            updateData
        );

        if (!usuarioAtualizado) {
            return null;
        }

        const {
            SENHA_HASH,
            ...usuarioSemSenha
        } = usuarioAtualizado;

        return usuarioSemSenha;
    }




    async login(
        login: string,
        senha: string
    ) {


        const usuario =
            await this.usuarioDAO.findByLogin(
                login
            );

        if (usuario?.ATIVO !== "A") {

            throw new HttpError(
                403,
                "Usuário inativo."
            );
        }


        if (!usuario) {

            throw new HttpError(
                401,
                "Login ou senha inválidos."
            );

        }


        const senhaValida =
            await bcrypt.compare(
                senha,
                usuario.SENHA_HASH
            );


        if (!senhaValida) {

            throw new HttpError(
                401,
                "Login ou senha inválidos."
            );

        }


        const token =
            jwt.sign(

                {
                    id: usuario.ID,
                    login: usuario.LOGIN,
                    nome: usuario.NOME,
                    perfil: usuario.PERFIL,
                },

                process.env.JWT_SECRET!,

                {
                    expiresIn: "7d"
                }

            );


        return {

            token,

            usuario: {

                ID: usuario.ID,

                LOGIN: usuario.LOGIN,

                NOME: usuario.NOME,

                PERFIL: usuario.PERFIL

            }

        };

    }

    async unlock(id: number, senha: string) {

        const usuario =
            await this.usuarioDAO.findById(
                id
            );

        if (!usuario) {
            throw new HttpError(
                401,
                "Usuário inválido."
            );
        }

        const senhaValida =
            await bcrypt.compare(
                senha,
                usuario.SENHA_HASH
            );


        if (!senhaValida) {
            throw new HttpError(
                401,
                "Senha inválida."
            );
        }

        return {
            UNLOCKED: true
        };
    }

    async perfil(id: number) {
        const usuario =
            await this.usuarioDAO.findById(
                id
            );

        if (!usuario) {
            throw new HttpError(
                401,
                "Usuário inválido."
            );
        }

        const {
            SENHA_HASH,
            ...rest
        } = usuario;

        return rest;
    }

    async atualizarNome(id: number, nome: string) {
        const usuario =
            await this.usuarioDAO.findById(
                id
            );

        if (!usuario) {
            throw new HttpError(
                401,
                "Usuário inválido."
            );
        }

        const usuarioAtualizado = await super.update(id, {
            NOME: nome
        });

        if (!usuarioAtualizado) {
            return null;
        }

        const {
            SENHA_HASH,
            ...usuarioSemSenha
        } = usuarioAtualizado;

        return usuarioSemSenha;
    }

    async atualizarSenha(
        id: number,
        senhaAtual: string,
        novaSenha: string
    ) {
        const usuario =
            await this.usuarioDAO.findById(
                id
            );

        if (!usuario) {
            throw new HttpError(
                401,
                "Usuário inválido."
            );
        }

        const senhaValida =
            await bcrypt.compare(
                senhaAtual,
                usuario.SENHA_HASH
            );


        if (!senhaValida) {
            throw new HttpError(
                401,
                "Senha inválida."
            );
        }

        const usuarioAtualizado = await super.update(id, {
            SENHA_HASH: await bcrypt.hash(
                novaSenha,
                10
            )
        });

        if (!usuarioAtualizado) {
            return null;
        }

        const {
            SENHA_HASH,
            ...usuarioSemSenha
        } = usuarioAtualizado;

        return usuarioSemSenha;
    }

}