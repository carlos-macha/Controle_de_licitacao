import { inject, injectable } from "inversify";

import { BaseService } from "./base.service";
import { ResultadoLicitacaoDAO } from "../dao/resultadoLicitacao.dao";
import { ResultadoLicitacao } from "../models/ResultadoLicitacao";
import { HttpError } from "../utils/httpError";
import { ItemLicitacaoDAO } from "../dao/itemLicitacao.dao";
import { ConcorrenteDAO } from "../dao/concorrente.dao";

@injectable()
export class ResultadoLicitacaoService extends BaseService<ResultadoLicitacao> {
    constructor(
        @inject(ResultadoLicitacaoDAO)
        resultadoLicitacaoDAO: ResultadoLicitacaoDAO,

        @inject(ItemLicitacaoDAO)
        private itemLicitacaoDAO: ItemLicitacaoDAO,

        @inject(ConcorrenteDAO)
        private concorrenteDAO: ConcorrenteDAO
    ) {
        super(
            resultadoLicitacaoDAO,
            "Resultado da licitação"
        );
    }

    async insert(
        resultado: Omit<ResultadoLicitacao, "ID">
    ) {
        const item =
            await this.itemLicitacaoDAO.findById(
                resultado.ITEM_LICITACAO_ID
            );

        if (!item) {
            throw new HttpError(
                404,
                "Item da licitação não encontrado."
            );
        }

        const concorrente =
            await this.concorrenteDAO.findById(
                resultado.CONCORRENTE_ID
            );

        if (!concorrente) {
            throw new HttpError(
                404,
                "Concorrente não encontrado."
            );
        }

        return super.insert(resultado);
    }

    async update(
        id: number,
        resultado: Partial<ResultadoLicitacao>
    ) {
        if (resultado.ITEM_LICITACAO_ID) {
            const item =
                await this.itemLicitacaoDAO.findById(
                    resultado.ITEM_LICITACAO_ID
                );

            if (!item) {
                throw new HttpError(
                    404,
                    "Item da licitação não encontrado."
                );
            }
        }

        if (resultado.CONCORRENTE_ID) {
            const concorrente =
                await this.concorrenteDAO.findById(
                    resultado.CONCORRENTE_ID
                );

            if (!concorrente) {
                throw new HttpError(
                    404,
                    "Concorrente não encontrado."
                );
            }
        }

        return super.update(
            id,
            resultado
        );
    }
}