import { inject, injectable } from "inversify";

import { ProdutoDAO } from "../dao/produto.dao";
import { Produto } from "../models/Produto";
import { HttpError } from "../utils/httpError";

@injectable()
export class ProdutoService {

    constructor(
        @inject(ProdutoDAO)
        private produtoDAO: ProdutoDAO
    ) { }

    async find(options?: {
        page?: number;
        limit?: number;
        where?: Record<string, unknown>;
        orderBy?: string;
        order?: "ASC" | "DESC";
    }): Promise<Produto[]> {

        return await this.produtoDAO.find(options);

    }

    async findById(id: number): Promise<Produto | null> {
        const produto = await this.produtoDAO.findById(id);

        if (!produto) {
            throw new HttpError(404, "Produto não encontrado.");
        }

        return produto;
    }

    async insert(produto: Omit<Produto, "ID">) {

        const existente = await this.produtoDAO.find({
            where: {
                CODIGO_PRODUTO: produto.CODIGO_PRODUTO
            }
        });

        if (existente.length > 0) {
            throw new HttpError(409, "Já existe um produto com esse código.");
        }

        if (produto.PRECO_BASE <= 0) {
            throw new HttpError(400, "Preço inválido.");
        }

        const id = await this.produtoDAO.insert(produto);

        return { ID: id };
    }

    async update(id: number, produto: Partial<Produto>) {

        if (produto.PRECO_BASE) {
            if (produto.PRECO_BASE <= 0) {
                throw new HttpError(
                    400,
                    "Preço inválido."
                );
            }
        }

        return await this.produtoDAO.update(id, produto);
    }

    async delete(id: number) {
        /*
        const utilizado = await this.licitacaoProdutoDAO.find({
            where: {
                CODIGO_PRODUTO: id
            }
        });

        if (utilizado.length > 0) {
            throw new HttpError(
                409,
                "Produto está vinculado a uma licitação."
            );
        }*/

        return await this.produtoDAO.delete(id);
    }
}