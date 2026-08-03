import { inject, injectable } from "inversify";

import { BaseDAO } from "./base.dao";
import { FirebirdDatabase } from "../database/firebird";
import { LicitacaoProduto } from "../schemas/licitacaoProduto.schema";

@injectable()
export class LicitacaoProdutoDAO extends BaseDAO<LicitacaoProduto> {

    constructor(
        @inject(FirebirdDatabase)
        db: FirebirdDatabase
    ) {
        super(
            db,
            "LICITACAO_PRODUTO",
            new Set([
                "ID",
                "CODIGO_LICITACAO",
                "CODIGO_PRODUTO",
                "QUANTIDADE",
                "VALOR_UNITARIO_REFERENCIA",
                "VALOR_TOTAL_REFERENCIA"
            ])
        );
    }

}