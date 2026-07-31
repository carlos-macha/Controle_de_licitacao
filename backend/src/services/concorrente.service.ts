import { inject, injectable } from "inversify";

import { ConcorrenteDAO } from "../dao/concorrente.dao";
import { Concorrente } from "../models/Concorrente";
import { HttpError } from "../utils/httpError";

@injectable()
export class ConcorrenteService {

    constructor(
        @inject(ConcorrenteDAO)
        private concorrenteDAO: ConcorrenteDAO
    ) { }

    async find(options?: {
        page?: number;
        limit?: number;
        where?: Record<string, unknown>;
        orderBy?: string;
        order?: "ASC" | "DESC";
    }): Promise<Concorrente[]> {

        return await this.concorrenteDAO.find(options);

    }

    async findById(id: number): Promise<Concorrente | null> {

        const concorrente = await this.concorrenteDAO.findById(id);

        if (!concorrente) {
            throw new HttpError(404, "Concorrente não encontrado.");
        }

        return concorrente;

    }

    async insert(concorrente: Omit<Concorrente, "ID">) {

        const existente = await this.concorrenteDAO.find({
            where: {
                CNPJ: concorrente.CNPJ
            }
        });

        if (existente.length > 0) {
            throw new HttpError(409, "Já existe um concorrente com esse CNPJ.");
        }

        const id = await this.concorrenteDAO.insert(concorrente);

        return { ID: id };

    }

    async update(id: number, concorrente: Partial<Concorrente>) {

        if (concorrente.CNPJ) {

            const existente = await this.concorrenteDAO.find({
                where: {
                    CNPJ: concorrente.CNPJ
                }
            });

            if (existente.length > 0 && existente[0].ID !== id) {
                throw new HttpError(409, "Já existe um concorrente com esse CNPJ.");
            }

        }

        return await this.concorrenteDAO.update(id, concorrente);

    }

    async delete(id: number) {

        /*
        const utilizado = await this.resultadoLicitacaoDAO.find({
            where: {
                CODIGO_CONCORRENTE: id
            }
        });

        if (utilizado.length > 0) {
            throw new HttpError(
                409,
                "Concorrente está vinculado a um resultado de licitação."
            );
        }
        */

        return await this.concorrenteDAO.delete(id);

    }

}