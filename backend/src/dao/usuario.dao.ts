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
                "ATIVO"
            ])
        );
    }

    async findByLogin(login: string): Promise<Usuario | null> {

        const result = await this.find({
            where: {
                LOGIN: login
            }
        });

        return result[0] ?? null;
    }
}