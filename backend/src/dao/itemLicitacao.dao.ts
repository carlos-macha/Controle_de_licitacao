import { inject, injectable } from "inversify";

import { BaseDAO } from "./base.dao";
import { FirebirdDatabase } from "../database/firebird";
import { ItemLicitacao } from "../models/ItemLicitacao";

@injectable()
export class ItemLicitacaoDAO extends BaseDAO<ItemLicitacao> {

    constructor(
        @inject(FirebirdDatabase)
        db: FirebirdDatabase
    ) {
        super(
            db,
            "ITEM_LICITACAO",
            new Set([
                "ID",
                "LICITACAO_ID",
                "ITEM",
                "DESCRICAO",
                "MARCA",
                "MODELO",
                "QUANTIDADE",
                "UNIDADE",
                "OBSERVACAO"
            ]),
            new Set([
                "DESCRICAO",
                "MARCA",
                "MODELO",
                "UNIDADE",
                "OBSERVACAO"
            ])
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
                `I.${field} = ?`
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
                SELECT COUNT(I.ID) AS TOTAL
                FROM ITEM_LICITACAO I
                INNER JOIN LICITACAO L
                    ON L.ID = I.LICITACAO_ID
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
                I.*,
                L.ID || ' - ' || L.PREGAO AS LICITACAO
            FROM ITEM_LICITACAO I
            INNER JOIN LICITACAO L
                ON L.ID = I.LICITACAO_ID
            ${whereSQL}
        `;

        if (options?.orderBy) {

            this["validateColumns"]([
                options.orderBy
            ]);

            sql += `
                ORDER BY I.${options.orderBy}
                ${options.order === "DESC" ? "DESC" : "ASC"}
            `;
        }

        sql += `
            ROWS ${first} TO ${last}
        `;

        const data =
            await this.db.query<
                ItemLicitacao
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
