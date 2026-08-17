import { inject, injectable } from "inversify";

import { BaseDAO } from "./base.dao";
import { FirebirdDatabase } from "../database/firebird";
import { ResultadoLicitacao } from "../schemas/resultadoLicitacao.schema";

@injectable()
export class ResultadoLicitacaoDAO extends BaseDAO<ResultadoLicitacao> {
    constructor(
        @inject(FirebirdDatabase)
        db: FirebirdDatabase
    ) {
        super(
            db,
            "RESULTADO_LICITACAO",
            new Set([
                "ID",
                "CODIGO_LICITACAO",
                "CODIGO_CONCORRENTE",
                "CODIGO_PRODUTO",
                "PRECO_GANHO",
                "DATA_RESULTADO",
            ])
        );
    }
}
