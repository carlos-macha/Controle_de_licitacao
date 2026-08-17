import { inject, injectable } from "inversify";

import { BaseService } from "./base.service";
import { ItemLicitacaoDAO } from "../dao/itemLicitacao.dao";
import { ItemLicitacao } from "../models/ItemLicitacao";
import { HttpError } from "../utils/httpError";
import { LicitacaoDAO } from "../dao/licitacao.dao";
import { ResultadoLicitacaoDAO } from "../dao/resultadoLicitacao.dao";

@injectable()
export class ItemLicitacaoService extends BaseService<ItemLicitacao> {

    constructor(
        @inject(ItemLicitacaoDAO)
        itemLicitacaoDAO: ItemLicitacaoDAO,

        @inject(LicitacaoDAO)
        private licitacaoDAO: LicitacaoDAO,

        @inject(ResultadoLicitacaoDAO)
        private resultadoLicitacaoDAO: ResultadoLicitacaoDAO
    ) {
        super(
            itemLicitacaoDAO,
            "Item da licitação"
        );
    }

    async insert(
        item: Omit<ItemLicitacao, "ID">
    ) {
        const licitacao =
            await this.licitacaoDAO.findById(
                item.LICITACAO_ID
            );

        if (!licitacao) {
            throw new HttpError(
                404,
                "A licitação não foi encontrada."
            );
        }

        const existente =
            await this.dao.find({
                where: {
                    LICITACAO_ID: item.LICITACAO_ID,
                    ITEM: item.ITEM
                },

                limit: 1
            });

        if (existente.data.length > 0) {
            throw new HttpError(
                409,
                "Já existe esse item na licitação."
            );
        }

        return super.insert(item);
    }

    async update(
        id: number,
        item: Partial<ItemLicitacao>
    ) {
        if (item.LICITACAO_ID) {
            const licitacao =
                await this.licitacaoDAO.findById(
                    item.LICITACAO_ID
                );

            if (!licitacao) {
                throw new HttpError(
                    404,
                    "A licitação não foi encontrada."
                );
            }
        }

        if (
            item.LICITACAO_ID !== undefined ||
            item.ITEM !== undefined
        ) {
            const atual =
                await this.dao.findById(id);

            if (!atual) {
                throw new HttpError(
                    404,
                    "Item da licitação não encontrado."
                );
            }

            const licitacaoId =
                item.LICITACAO_ID ??
                atual.LICITACAO_ID;

            const numeroItem =
                item.ITEM ??
                atual.ITEM;

            const existente =
                await this.dao.find({
                    where: {
                        LICITACAO_ID: licitacaoId,
                        ITEM: numeroItem
                    },

                    limit: 1
                });

            if (
                existente.data.length > 0 &&
                existente.data[0].ID !== id
            ) {
                throw new HttpError(
                    409,
                    "Já existe esse item na licitação."
                );
            }
        }

        return super.update(
            id,
            item
        );
    }

    async delete(id: number) {
        const possuiResultados =
            await this.resultadoLicitacaoDAO.find({
                where: {
                    ITEM_LICITACAO_ID: id
                }
            });

        if (possuiResultados.data.length > 0) {
            throw new HttpError(
                409,
                "O item da licitação possui resultados vinculados."
            );
        }

        return super.delete(id);
    }
}