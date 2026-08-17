import { inject, injectable } from "inversify";

import { BaseDAO } from "./base.dao";
import { FirebirdDatabase } from "../database/firebird";
import { ResultadoLicitacao } from "../models/ResultadoLicitacao";

@injectable()
export class ResultadoLicitacaoDAO
    extends BaseDAO<ResultadoLicitacao> {

    constructor(
        @inject(FirebirdDatabase)
        db: FirebirdDatabase
    ) {
        super(
            db,
            "RESULTADO_LICITACAO",
            new Set([
                "ID",
                "ITEM_LICITACAO_ID",
                "CONCORRENTE_ID",
                "PRECO_GANHO",
                "VALOR_TOTAL_LANCE",
                "VALOR_ORCADO",
                "VALOR_TOTAL_ORCADO",
                "ECONOMIA_PERCENTUAL",
                "ECONOMIA_REAIS",
                "DATA_RELATORIO",
                "HORA_RELATORIO",
            ]),
            new Set([])
        );
    }
}