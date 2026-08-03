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
                "NUMERO_EDITAL",
                "NOME",
                "DESCRICAO",
                "CODIGO_LICITACAO",
                "ORGAO_COMPETENTE",
                "DATA_CERTAME",
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