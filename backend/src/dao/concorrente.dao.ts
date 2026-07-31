import { inject, injectable } from "inversify";

import { BaseDAO } from "./base.dao";
import { FirebirdDatabase } from "../database/firebird";
import { Concorrente } from "../models/Concorrente";

@injectable()
export class ConcorrenteDAO extends BaseDAO<Concorrente> {

    constructor(
        @inject(FirebirdDatabase)
        db: FirebirdDatabase
    ) {
        super(
            db,
            "CONCORRENTE",
            new Set([
                "ID",
                "NOME",
                "CNPJ",
                "EMAIL",
                "TELEFONE",
                "CELULAR",
                "LOGRADOURO",
                "NUMERO",
                "BAIRRO",
                "CIDADE",
                "ESTADO",
                "CEP",
                "COMPLEMENTO"
            ])
        );
    }

}