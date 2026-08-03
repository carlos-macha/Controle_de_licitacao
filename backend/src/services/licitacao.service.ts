import { inject, injectable } from "inversify";

import { BaseService } from "./base.service";
import { LicitacaoDAO } from "../dao/licitacao.dao";
import { Licitacao } from "../models/Licitacao";
import { HttpError } from "../utils/httpError";
import { LicitacaoProdutoDAO } from "../dao/licitacaoProduto.dao";
import { ResultadoLicitacaoDAO } from "../dao/resultadoLicitacao.dao";


@injectable()
export class LicitacaoService extends BaseService<Licitacao> {


    constructor(

        @inject(LicitacaoDAO)
        licitacaoDAO: LicitacaoDAO,


        @inject(LicitacaoProdutoDAO)
        private licitacaoProdutoDAO: LicitacaoProdutoDAO,


        @inject(ResultadoLicitacaoDAO)
        private resultadoLicitacaoDAO: ResultadoLicitacaoDAO

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
                    CODIGO_LICITACAO:
                        licitacao.CODIGO_LICITACAO
                },

                limit: 1

            });


        if (existente.data.length > 0) {

            throw new HttpError(
                409,
                "Já existe uma licitação com esse código."
            );

        }


        return super.insert(
            licitacao
        );

    }



    async update(
        id: number,
        licitacao: Partial<Licitacao>
    ) {


        if (licitacao.CODIGO_LICITACAO) {


            const existente =
                await this.dao.find({

                    where: {
                        CODIGO_LICITACAO:
                            licitacao.CODIGO_LICITACAO
                    },

                    limit: 1

                });



            if (
                existente.data.length > 0 &&
                existente.data[0].ID !== id
            ) {

                throw new HttpError(
                    409,
                    "Já existe uma licitação com esse código."
                );

            }

        }



        return super.update(
            id,
            licitacao
        );

    }



    async delete(
        id: number
    ) {


        const possuiProdutos =
            await this.licitacaoProdutoDAO.find({

                where: {
                    CODIGO_LICITACAO: id
                }

            });



        if (possuiProdutos.data.length > 0) {

            throw new HttpError(
                409,
                "A licitação possui produtos vinculados."
            );

        }



        const possuiResultados =
            await this.resultadoLicitacaoDAO.find({

                where: {
                    CODIGO_LICITACAO: id
                }

            });



        if (possuiResultados.data.length > 0) {

            throw new HttpError(
                409,
                "A licitação possui resultados vinculados."
            );

        }



        return super.delete(
            id
        );

    }

}