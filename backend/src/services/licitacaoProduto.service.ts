import { inject, injectable } from "inversify";

import { BaseService } from "./base.service";
import { LicitacaoProdutoDAO } from "../dao/licitacaoProduto.dao";
import { LicitacaoProduto } from "../schemas/licitacaoProduto.schema";
import { LicitacaoDAO } from "../dao/licitacao.dao";
import { ProdutoDAO } from "../dao/produto.dao";
import { HttpError } from "../utils/httpError";


@injectable()
export class LicitacaoProdutoService extends BaseService<LicitacaoProduto> {


    constructor(

        @inject(LicitacaoProdutoDAO)
        licitacaoProdutoDAO: LicitacaoProdutoDAO,


        @inject(LicitacaoDAO)
        private licitacaoDAO: LicitacaoDAO,


        @inject(ProdutoDAO)
        private produtoDAO: ProdutoDAO

    ) {

        super(
            licitacaoProdutoDAO,
            "Produto da licitação"
        );

    }



    async insert(
    licitacaoProduto: Omit<LicitacaoProduto, "ID">
) {
    const existente = await this.dao.find({
        where: {
            CODIGO_LICITACAO: licitacaoProduto.CODIGO_LICITACAO,
            CODIGO_PRODUTO: licitacaoProduto.CODIGO_PRODUTO
        },
        limit: 1
    });

    const licitacao = await this.licitacaoDAO.findById(
        licitacaoProduto.CODIGO_LICITACAO
    );

    if (!licitacao) {
        throw new HttpError(
            404,
            "Licitação não encontrada."
        );
    }

    const produto = await this.produtoDAO.findById(
        licitacaoProduto.CODIGO_PRODUTO
    );

    if (!produto) {
        throw new HttpError(
            404,
            "Produto não encontrado."
        );
    }

    if (existente.data.length > 0) {
        throw new HttpError(
            409,
            "Esse produto já está vinculado a essa licitação."
        );
    }

    if (licitacaoProduto.QUANTIDADE <= 0) {
        throw new HttpError(
            400,
            "Quantidade inválida."
        );
    }

    if (licitacaoProduto.VALOR_UNITARIO_REFERENCIA <= 0) {
        throw new HttpError(
            400,
            "Valor unitário de referência inválido."
        );
    }

    const valorTotal =
        licitacaoProduto.QUANTIDADE *
        licitacaoProduto.VALOR_UNITARIO_REFERENCIA;

    if (valorTotal <= 0) {
        throw new HttpError(
            400,
            "Valor total de referência inválido."
        );
    }

    const dados = {
        ...licitacaoProduto,
        VALOR_TOTAL_REFERENCIA: valorTotal
    };

    return super.insert(dados);
}



    async update(
        id: number,
        licitacaoProduto: Partial<LicitacaoProduto>
    ) {


        if (
            licitacaoProduto.QUANTIDADE !== undefined &&
            licitacaoProduto.QUANTIDADE <= 0
        ) {

            throw new HttpError(
                400,
                "Quantidade inválida."
            );

        }



        if (licitacaoProduto.CODIGO_LICITACAO) {

            const licitacao =
                await this.licitacaoDAO.findById(
                    licitacaoProduto.CODIGO_LICITACAO
                );


            if (!licitacao) {

                throw new HttpError(
                    400,
                    "Licitação não encontrada."
                );

            }

        }



        if (licitacaoProduto.CODIGO_PRODUTO) {

            const produto =
                await this.produtoDAO.findById(
                    licitacaoProduto.CODIGO_PRODUTO
                );


            if (!produto) {

                throw new HttpError(
                    400,
                    "Produto não encontrado."
                );

            }

        }



        if (
            licitacaoProduto.VALOR_UNITARIO_REFERENCIA !== undefined &&
            licitacaoProduto.VALOR_UNITARIO_REFERENCIA <= 0
        ) {

            throw new HttpError(
                400,
                "Valor unitário de referência inválido."
            );

        }



        if (
            licitacaoProduto.VALOR_TOTAL_REFERENCIA !== undefined &&
            licitacaoProduto.VALOR_TOTAL_REFERENCIA <= 0
        ) {

            throw new HttpError(
                400,
                "Valor total de referência inválido."
            );

        }



        return await super.update(
            id,
            licitacaoProduto
        );

    }

}