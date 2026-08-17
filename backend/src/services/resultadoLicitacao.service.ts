import { inject, injectable } from "inversify";

import { BaseService } from "./base.service";
import { ResultadoLicitacaoDAO } from "../dao/resultadoLicitacao.dao";
import { ResultadoLicitacao } from "../schemas/resultadoLicitacao.schema";
import { LicitacaoDAO } from "../dao/licitacao.dao";
import { ConcorrenteDAO } from "../dao/concorrente.dao";
import { ProdutoDAO } from "../dao/produto.dao";
import { HttpError } from "../utils/httpError";

@injectable()
export class ResultadoLicitacaoService extends BaseService<ResultadoLicitacao> {
    constructor(
        @inject(ResultadoLicitacaoDAO)
        resultadoLicitacaoDAO: ResultadoLicitacaoDAO,

        @inject(LicitacaoDAO)
        private licitacaoDAO: LicitacaoDAO,

        @inject(ConcorrenteDAO)
        private concorrenteDAO: ConcorrenteDAO,

        @inject(ProdutoDAO)
        private produtoDAO: ProdutoDAO
    ) {
        super(resultadoLicitacaoDAO, "Resultado de licitação");
    }

    async insert(resultado: Omit<ResultadoLicitacao, "ID">) {
        const existente = await this.dao.find({
            where: {
                CODIGO_LICITACAO: resultado.CODIGO_LICITACAO,

                CODIGO_PRODUTO: resultado.CODIGO_PRODUTO,
            },

            limit: 1,
        });

        const licitacao = await this.licitacaoDAO.findById(
            resultado.CODIGO_LICITACAO
        );

        if (!licitacao) {
            throw new HttpError(404, "Licitação não encontrada.");
        }

        const concorrente = await this.concorrenteDAO.findById(
            resultado.CODIGO_CONCORRENTE
        );

        if (!concorrente) {
            throw new HttpError(404, "Concorrente não encontrado.");
        }

        const produto = await this.produtoDAO.findById(
            resultado.CODIGO_PRODUTO
        );

        if (!produto) {
            throw new HttpError(404, "Produto não encontrado.");
        }

        if (existente.data.length > 0) {
            throw new HttpError(
                409,
                "Já existe resultado cadastrado para esse produto nesta licitação."
            );
        }

        if (resultado.PRECO_GANHO <= 0) {
            throw new HttpError(400, "Preço ganho inválido.");
        }

        return super.insert(resultado);
    }

    async update(id: number, resultado: Partial<ResultadoLicitacao>) {
        if (resultado.PRECO_GANHO !== undefined) {
            if (resultado.PRECO_GANHO <= 0) {
                throw new HttpError(400, "Preço ganho inválido.");
            }
        }

        if (resultado.CODIGO_LICITACAO) {
            const licitacao = await this.licitacaoDAO.findById(
                resultado.CODIGO_LICITACAO
            );

            if (!licitacao) {
                throw new HttpError(404, "Licitação não encontrada.");
            }
        }

        if (resultado.CODIGO_CONCORRENTE) {
            const concorrente = await this.concorrenteDAO.findById(
                resultado.CODIGO_CONCORRENTE
            );

            if (!concorrente) {
                throw new HttpError(404, "Concorrente não encontrado.");
            }
        }

        if (resultado.CODIGO_PRODUTO) {
            const produto = await this.produtoDAO.findById(
                resultado.CODIGO_PRODUTO
            );

            if (!produto) {
                throw new HttpError(404, "Produto não encontrado.");
            }
        }

        return await super.update(id, resultado);
    }
}
