import { inject, injectable } from "inversify";

import { BaseService } from "./base.service";
import { ConcorrenteDAO } from "../dao/concorrente.dao";
import { Concorrente } from "../models/Concorrente";
import { HttpError } from "../utils/httpError";
import { ResultadoLicitacaoDAO } from "../dao/resultadoLicitacao.dao";

@injectable()
export class ConcorrenteService extends BaseService<Concorrente> {
    constructor(
        @inject(ConcorrenteDAO)
        concorrenteDAO: ConcorrenteDAO,

        @inject(ResultadoLicitacaoDAO)
        private resultadoLicitacaoDAO: ResultadoLicitacaoDAO
    ) {
        super(
            concorrenteDAO,
            "Concorrente"
        );
    }

    async insert(
        concorrente: Omit<Concorrente, "ID">
    ) {
        const existente =
            await this.dao.find({
                where: {
                    CNPJ: concorrente.CNPJ,
                },

                limit: 1,
            });

        if (existente.data.length > 0) {
            throw new HttpError(
                409,
                "Já existe um concorrente com esse CNPJ."
            );
        }

        return super.insert(concorrente);
    }

    async update(
        id: number,
        concorrente: Partial<Concorrente>
    ) {
        if (concorrente.CNPJ) {
            const existente =
                await this.dao.find({
                    where: {
                        CNPJ: concorrente.CNPJ,
                    },

                    limit: 1,
                });

            if (
                existente.data.length > 0 &&
                existente.data[0].ID !== id
            ) {
                throw new HttpError(
                    409,
                    "Já existe um concorrente com esse CNPJ."
                );
            }
        }

        return super.update(
            id,
            concorrente
        );
    }

    async delete(id: number) {
        const possuiResultados =
            await this.resultadoLicitacaoDAO.find({
                where: {
                    CONCORRENTE_ID: id,
                },
            });

        if (possuiResultados.data.length > 0) {
            throw new HttpError(
                409,
                "O concorrente possui resultados vinculados."
            );
        }

        return super.delete(id);
    }
}