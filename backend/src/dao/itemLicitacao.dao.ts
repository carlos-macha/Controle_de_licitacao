import { inject, injectable } from "inversify";

import { BaseDAO } from "./base.dao";
import { FirebirdDatabase } from "../database/firebird";
import { ItemLicitacao } from "../models/ItemLicitacao";

@injectable()
export class ItemLicitacaoDAO extends BaseDAO<ItemLicitacao> {

    constructor(
        @inject(FirebirdDatabase)
        db: FirebirdDatabase
    ) {
        super(
            db,
            "ITEM_LICITACAO",
            new Set([
                "ID",
                "LICITACAO_ID",
                "ITEM",
                "DESCRICAO",
                "MARCA",
                "MODELO",
                "QUANTIDADE",
                "UNIDADE",
                "OBSERVACAO"
            ]),
            new Set([
                "DESCRICAO",
                "MARCA",
                "MODELO",
                "UNIDADE",
                "OBSERVACAO"
            ])
        );
    }
}
