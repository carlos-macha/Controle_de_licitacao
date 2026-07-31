import { inject, injectable } from "inversify";

import { BaseDAO } from "./base.dao";
import { FirebirdDatabase } from "../database/firebird";
import { Produto } from "../models/Produto";

@injectable()
export class ProdutoDAO extends BaseDAO<Produto> {

    constructor(
        @inject(FirebirdDatabase)
        db: FirebirdDatabase
    ) {
        super(
            db,
            "PRODUTO",
            new Set([
                "ID",
                "CODIGO_PRODUTO",
                "DESCRICAO",
                "MARCA",
                "MODELO",
                "PRECO_BASE",
                "OBSERVACAO"
            ])
        );
    }

}