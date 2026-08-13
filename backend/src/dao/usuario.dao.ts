import { inject, injectable } from "inversify";

import { BaseDAO } from "./base.dao";
import { FirebirdDatabase } from "../database/firebird";
import { Usuario } from "../models/Usuario";

@injectable()
export class UsuarioDAO extends BaseDAO<Usuario> {

    constructor(
        @inject(FirebirdDatabase)
        db: FirebirdDatabase
    ) {
        super(
            db,
            "USUARIO",
            new Set([
                "ID",
                "LOGIN",
                "NOME",
                "SENHA_HASH",
                "ATIVO",
                "PERFIL",
                "DATA_CADASTRO",
                "DATA_ALTERACAO"
            ]),
            new Set([
                "LOGIN",
                "NOME"
            ])
        );
    }



    async findByLogin(
        login: string
    ): Promise<Usuario | null> {


        const result =
            await this.find({

                where: {
                    LOGIN: login
                },

                limit: 1

            });



        return result.data[0] ?? null;

    }

}