import { inject, injectable } from "inversify";

import { BaseService } from "./base.service";
import { ConcorrenteDAO } from "../dao/concorrente.dao";
import { Concorrente } from "../models/Concorrente";
import { ResultadoLicitacaoDAO } from "../dao/resultadoLicitacao.dao";
import { HttpError } from "../utils/httpError";


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
                    CNPJ: concorrente.CNPJ
                },

                limit: 1

            });


        if (existente.data.length > 0) {

            throw new HttpError(
                409,
                "Já existe um concorrente com esse CNPJ."
            );

        }


        return await super.insert(
            concorrente
        );

    }





    async update(
        id: number,
        concorrente: Partial<Concorrente>
    ) {


        if (concorrente.CNPJ) {


            const existente =
                await this.dao.find({

                    where: {
                        CNPJ: concorrente.CNPJ
                    },

                    limit: 1

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


        return await super.update(
            id,
            concorrente
        );

    }






    async delete(
        id: number
    ) {


        const utilizado =
            await this.resultadoLicitacaoDAO.find({

                where: {
                    CODIGO_CONCORRENTE: id
                }

            });



        if (utilizado.data.length > 0) {


            throw new HttpError(
                409,
                "Concorrente está vinculado a um resultado de licitação."
            );

        }



        return await super.delete(id);

    }

}