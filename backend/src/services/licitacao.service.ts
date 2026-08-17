import { inject, injectable } from "inversify";

import { BaseService } from "./base.service";
import { LicitacaoDAO } from "../dao/licitacao.dao";
import { Licitacao } from "../models/Licitacao";
import { HttpError } from "../utils/httpError";
import { ItemLicitacaoDAO } from "../dao/itemLicitacao.dao";

@injectable()
export class LicitacaoService extends BaseService<Licitacao> {

    constructor(
        @inject(LicitacaoDAO)
        licitacaoDAO: LicitacaoDAO,

        @inject(ItemLicitacaoDAO)
        private itemLicitacaoDAO: ItemLicitacaoDAO
    ) {
        super(
            licitacaoDAO,
            "Licitação"
        );
    }

    async insert(
        licitacao: Omit<Licitacao, "ID">
    ) {
        const existente =
            await this.dao.find({
                where: {
                    PREGAO: licitacao.PREGAO,
                    PROCESSO_LICITATORIO:
                        licitacao.PROCESSO_LICITATORIO,
                    MUNICIPIO: licitacao.MUNICIPIO
                },

                limit: 1
            });

        if (existente.data.length > 0) {
            throw new HttpError(
                409,
                "Já existe uma licitação com esses dados."
            );
        }

        return super.insert(licitacao);
    }

    async update(
        id: number,
        licitacao: Partial<Licitacao>
    ) {
        if (
            licitacao.PREGAO ||
            licitacao.PROCESSO_LICITATORIO ||
            licitacao.MUNICIPIO
        ) {
            const atual =
                await this.dao.findById(id);

            if (!atual) {
                throw new HttpError(
                    404,
                    "Licitação não encontrada."
                );
            }

            const existente =
                await this.dao.find({
                    where: {
                        PREGAO:
                            licitacao.PREGAO ??
                            atual.PREGAO,

                        PROCESSO_LICITATORIO:
                            licitacao.PROCESSO_LICITATORIO ??
                            atual.PROCESSO_LICITATORIO,

                        MUNICIPIO:
                            licitacao.MUNICIPIO ??
                            atual.MUNICIPIO
                    },

                    limit: 1
                });

            if (
                existente.data.length > 0 &&
                existente.data[0].ID !== id
            ) {
                throw new HttpError(
                    409,
                    "Já existe uma licitação com esses dados."
                );
            }
        }

        return super.update(
            id,
            licitacao
        );
    }

    async delete(id: number) {
        const possuiItens =
            await this.itemLicitacaoDAO.find({
                where: {
                    LICITACAO_ID: id
                }
            });

        if (possuiItens.data.length > 0) {
            throw new HttpError(
                409,
                "A licitação possui itens vinculados."
            );
        }

        return super.delete(id);
    }
}
