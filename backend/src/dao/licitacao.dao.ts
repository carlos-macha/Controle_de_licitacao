import { inject, injectable } from "inversify";

import { BaseDAO } from "./base.dao";
import { FirebirdDatabase } from "../database/firebird";
import { Licitacao } from "../models/Licitacao";

@injectable()
export class LicitacaoDAO extends BaseDAO<Licitacao> {

    constructor(
        @inject(FirebirdDatabase)
        db: FirebirdDatabase
    ) {
        super(
            db,
            "LICITACAO",
            new Set([
                "ID",
                "PREGAO",
                "PROCESSO_LICITATORIO",
                "MUNICIPIO",
                "ESTADO",
                "DATA_CERTAME",
                "LOGRADOURO",
                "NUMERO",
                "BAIRRO",
                "CIDADE",
                "CEP",
                "COMPLEMENTO"
            ]),
            new Set([
                "PREGAO",
                "PROCESSO_LICITATORIO",
                "MUNICIPIO",
                "ESTADO"
            ])
        );
    }
}