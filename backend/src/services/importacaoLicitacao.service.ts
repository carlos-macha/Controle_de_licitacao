import { ImportacaoLicitacao } from "../models/ImportacaoLicitacao";
import { ImportacaoLicitacaoDAO } from "../dao/importacaoLicitacao.dao";
import { HttpError } from "../utils/httpError";
import { inject, injectable } from "inversify";

@injectable()
export class ImportacaoLicitacaoService {

    constructor(
        @inject(ImportacaoLicitacaoDAO)
        private dao: ImportacaoLicitacaoDAO
    ) { }

    async importar(
        dados: ImportacaoLicitacao[]
    ) {

        if (dados.length === 0) {

            throw new HttpError(
                400,
                "Nenhum dado para importar."
            );

        }

        const dadosLimpos = dados.map(dado => ({
            ...dado,

            cnpj_fornecedor: dado.cnpj_fornecedor
                .replace(/\D/g, "")
                .slice(0, 14),

            municipio: dado.municipio.trim().toUpperCase(),

            pregao: dado.pregao.trim().toUpperCase(),

            processo_licitatorio:
                dado.processo_licitatorio.trim().toUpperCase(),

            fornecedor: dado.fornecedor.trim().toUpperCase(),

            descricao: dado.descricao.trim().toUpperCase(),

            marca: dado.marca?.trim().toUpperCase(),

            modelo: dado.modelo?.trim().toUpperCase(),

            unidade: dado.unidade.trim().toUpperCase()
        }));

        const licitacoes =
            new Map<string, number>();

        const concorrentes =
            new Map<string, number>();

        return this.dao.transaction(
            async transaction => {

                for (const dado of dadosLimpos) {

                    try {

                        const chaveLicitacao =
                            `${dado.pregao}|${dado.processo_licitatorio}|${dado.municipio}`;

                        let licitacaoId =
                            licitacoes.get(
                                chaveLicitacao
                            );

                        if (!licitacaoId) {

                            const licitacao =
                                await this.dao.findLicitacao(
                                    dado.pregao,
                                    dado.processo_licitatorio,
                                    dado.municipio,
                                    transaction
                                );

                            if (licitacao[0]) {

                                licitacaoId =
                                    licitacao[0].ID;

                            } else {

                                const novaLicitacao =
                                    await this.dao.insertLicitacao(
                                        dado.pregao,
                                        dado.processo_licitatorio,
                                        dado.municipio,
                                        transaction
                                    );

                                licitacaoId =
                                    novaLicitacao.ID;
                            }

                            licitacoes.set(
                                chaveLicitacao,
                                licitacaoId
                            );
                        }

                        let concorrenteId =
                            concorrentes.get(
                                dado.cnpj_fornecedor
                            );

                        if (!concorrenteId) {

                            const concorrente =
                                await this.dao.findConcorrente(
                                    dado.cnpj_fornecedor,
                                    transaction
                                );

                            if (concorrente[0]) {

                                concorrenteId =
                                    concorrente[0].ID;

                            } else {

                                const novoConcorrente =
                                    await this.dao.insertConcorrente(
                                        dado.fornecedor,
                                        dado.cnpj_fornecedor,
                                        transaction
                                    );

                                concorrenteId =
                                    novoConcorrente.ID;
                            }

                            concorrentes.set(
                                dado.cnpj_fornecedor,
                                concorrenteId
                            );
                        }

                        const itemExistente =
                            await this.dao.findItemLicitacao(
                                licitacaoId,
                                dado.item,
                                transaction
                            );

                        let itemId: number;

                        if (itemExistente[0]) {

                            itemId =
                                itemExistente[0].ID;

                        } else {

                            const item =
                                await this.dao.insertItemLicitacao(
                                    licitacaoId,
                                    dado.item,
                                    dado.descricao,
                                    dado.marca,
                                    dado.modelo,
                                    dado.quantidade,
                                    dado.unidade,
                                    transaction
                                );

                            itemId =
                                item.ID;
                        }

                        await this.dao.insertResultadoLicitacao(
                            itemId,
                            concorrenteId,
                            dado.valor_lance,
                            dado.total_lance,
                            dado.valor_orcado,
                            dado.total_orcado,
                            dado.economia_percentual,
                            dado.economia_reais,
                            dado.data_relatorio,
                            dado.hora_relatorio,
                            transaction
                        );

                    } catch (error) {

                        const mensagem =
                            error instanceof Error
                                ? error.message
                                : "Erro desconhecido.";

                        throw new HttpError(
                            400,
                            `Erro ao importar o item ${dado.item}: ${mensagem}`
                        );

                    }

                }

                return {
                    totalLinhas: dados.length,
                    totalLicitacoes: licitacoes.size,
                    totalConcorrentes: concorrentes.size
                };

            }
        );
    }

}