import { inject, injectable } from "inversify";

import { BaseService } from "./base.service";
import { ProdutoDAO } from "../dao/produto.dao";
import { Produto } from "../models/Produto";
import { HttpError } from "../utils/httpError";
import { LicitacaoProdutoDAO } from "../dao/licitacaoProduto.dao";


@injectable()
export class ProdutoService extends BaseService<Produto> {


    constructor(

        @inject(ProdutoDAO)
        produtoDAO: ProdutoDAO,


        @inject(LicitacaoProdutoDAO)
        private licitacaoProdutoDAO: LicitacaoProdutoDAO

    ) {

        super(
            produtoDAO,
            "Produto"
        );

    }



    async insert(
        produto: Omit<Produto, "ID">
    ) {


        const existente =
            await this.dao.find({

                where: {

                    CODIGO_PRODUTO:
                        produto.CODIGO_PRODUTO

                },

                limit: 1

            });



        if (existente.data.length > 0) {

            throw new HttpError(
                409,
                "Já existe um produto com esse código."
            );

        }



        if (produto.PRECO_BASE <= 0) {

            throw new HttpError(
                400,
                "Preço inválido."
            );

        }



        return super.insert(
            produto
        );

    }



    async update(
        id: number,
        produto: Partial<Produto>
    ) {


        if (
            produto.PRECO_BASE !== undefined &&
            produto.PRECO_BASE <= 0
        ) {

            throw new HttpError(
                400,
                "Preço inválido."
            );

        }



        return super.update(
            id,
            produto
        );

    }



    async delete(
        id: number
    ) {


        const utilizado =
            await this.licitacaoProdutoDAO.find({

                where: {

                    CODIGO_PRODUTO: id

                },

                limit: 1

            });



        if (utilizado.data.length > 0) {

            throw new HttpError(
                409,
                "Produto está vinculado a uma licitação."
            );

        }



        return super.delete(
            id
        );

    }

}