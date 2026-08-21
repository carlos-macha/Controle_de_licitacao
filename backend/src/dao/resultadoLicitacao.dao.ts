import { inject, injectable } from "inversify";

import { BaseDAO } from "./base.dao";
import { FirebirdDatabase } from "../database/firebird";
import { ResultadoLicitacao } from "../models/ResultadoLicitacao";

@injectable()
export class ResultadoLicitacaoDAO
    extends BaseDAO<ResultadoLicitacao> {

    constructor(
        @inject(FirebirdDatabase)
        db: FirebirdDatabase
    ) {
        super(
            db,
            "RESULTADO_LICITACAO",
            new Set([
                "ID",
                "ITEM_LICITACAO_ID",
                "CONCORRENTE_ID",
                "PRECO_GANHO",
                "VALOR_TOTAL_LANCE",
                "VALOR_ORCADO",
                "VALOR_TOTAL_ORCADO",
                "ECONOMIA_PERCENTUAL",
                "ECONOMIA_REAIS",
                "DATA_RELATORIO",
                "HORA_RELATORIO",
            ]),
            new Set([])
        );
    }

    async find(options?: {
        page?: number;
        limit?: number;
        where?: Record<string, unknown>;
        orderBy?: string;
        order?: "ASC" | "DESC";
    }) {

        const page =
            options?.page && options.page > 0
                ? options.page
                : 1;

        const limit =
            options?.limit && options.limit > 0
                ? options.limit
                : 50;

        const where = {
            ...options?.where
        };

        const conditions: string[] = [];
        const params: unknown[] = [];

        Object.entries(where).forEach(([field, value]) => {

            if (
                value === undefined ||
                value === null ||
                value === ""
            ) {
                return;
            }

            if (field === "ITEM") {
                conditions.push(
                    "I.ITEM = ?"
                );

                params.push(value);

                return;
            }

            if (field === "ITEM_LICITACAO") {
                conditions.push(
                    "I.DESCRICAO LIKE ?"
                );

                params.push(`%${value}%`);

                return;
            }

            if (field === "CONCORRENTE") {
                conditions.push(
                    "C.NOME LIKE ?"
                );

                params.push(`%${value}%`);

                return;
            }

            if (field === "MUNICIPIO") {
                conditions.push(
                    "L.MUNICIPIO LIKE ?"
                );

                params.push(`%${value}%`);

                return;
            }

            if (field === "LICITACAO") {
                conditions.push(
                    "(L.PREGAO LIKE ? OR L.PROCESSO_LICITATORIO LIKE ? OR L.MUNICIPIO LIKE ?)"
                );

                params.push(
                    `%${value}%`,
                    `%${value}%`,
                    `%${value}%`
                );

                return;
            }

            this["validateColumns"]([field]);

            conditions.push(
                `R.${field} = ?`
            );

            params.push(value);
        });

        const whereSQL =
            conditions.length > 0
                ? `WHERE ${conditions.join(" AND ")}`
                : "";

        const totalResult =
            await this.db.query<{ TOTAL: number }>(
                `
                SELECT COUNT(R.ID) AS TOTAL
                FROM RESULTADO_LICITACAO R
                INNER JOIN ITEM_LICITACAO I
                    ON I.ID = R.ITEM_LICITACAO_ID
                INNER JOIN LICITACAO L
                    ON L.ID = I.LICITACAO_ID
                INNER JOIN CONCORRENTE C
                    ON C.ID = R.CONCORRENTE_ID
                ${whereSQL}
                `,
                params
            );

        const total =
            Number(totalResult[0]?.TOTAL ?? 0);

        const first =
            ((page - 1) * limit) + 1;

        const last =
            page * limit;

        let sql = `
            SELECT
                R.*,
                I.ITEM AS ITEM,
                I.ID || ' - ' || I.DESCRICAO AS ITEM_LICITACAO,
                C.ID || ' - ' || C.NOME AS CONCORRENTE,
                L.PREGAO AS LICITACAO,
                L.MUNICIPIO AS MUNICIPIO
            FROM RESULTADO_LICITACAO R
            INNER JOIN ITEM_LICITACAO I
                ON I.ID = R.ITEM_LICITACAO_ID
            INNER JOIN LICITACAO L
                ON L.ID = I.LICITACAO_ID
            INNER JOIN CONCORRENTE C
                ON C.ID = R.CONCORRENTE_ID
            ${whereSQL}
        `;

        if (options?.orderBy) {
            this["validateColumns"]([
                options.orderBy
            ]);

            sql += `
                ORDER BY R.${options.orderBy}
                ${options.order === "DESC" ? "DESC" : "ASC"}
            `;
        }

        sql += `
            ROWS ${first} TO ${last}
        `;

        const data =
            await this.db.query<
                ResultadoLicitacao & {
                    ITEM: number;
                    LICITACAO: string;
                    ITEM_LICITACAO: string;
                    CONCORRENTE: string;
                    MUNICIPIO: string;
                }
            >(
                sql,
                params
            );

        return {
            data,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        };
    }
}