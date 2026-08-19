import { inject, injectable } from "inversify";
import {
    FirebirdDatabase,
    FirebirdTransaction
} from "../database/firebird";

@injectable()
export class ImportacaoLicitacaoDAO {

    constructor(
        @inject(FirebirdDatabase)
        private db: FirebirdDatabase
    ) { }

    async transaction<T>(
        callback: (
            transaction: FirebirdTransaction
        ) => Promise<T>
    ) {

        return this.db.transaction(callback);

    }

    async findLicitacao(
        pregao: string,
        processoLicitatorio: string,
        municipio: string,
        transaction?: FirebirdTransaction
    ) {

        const database: FirebirdDatabase | FirebirdTransaction =
            transaction ?? this.db;

        return database.query<{ ID: number }>(
            `
            SELECT ID
            FROM LICITACAO
            WHERE PREGAO = ?
            AND PROCESSO_LICITATORIO = ?
            AND MUNICIPIO = ?
            `,
            [
                pregao,
                processoLicitatorio,
                municipio
            ]
        );

    }

    async insertLicitacao(
        pregao: string,
        processoLicitatorio: string,
        municipio: string,
        transaction?: FirebirdTransaction
    ) {

        const database: FirebirdDatabase | FirebirdTransaction =
            transaction ?? this.db;

        return database.queryOne<{ ID: number }>(
            `
            INSERT INTO LICITACAO (
                PREGAO,
                PROCESSO_LICITATORIO,
                MUNICIPIO
            )
            VALUES (?, ?, ?)
            RETURNING ID
            `,
            [
                pregao,
                processoLicitatorio,
                municipio
            ]
        );

    }

    async findConcorrente(
        cnpj: string,
        transaction?: FirebirdTransaction
    ) {

        const database: FirebirdDatabase | FirebirdTransaction =
            transaction ?? this.db;

        return database.query<{ ID: number }>(
            `
            SELECT ID
            FROM CONCORRENTE
            WHERE CNPJ = ?
            `,
            [cnpj]
        );

    }

    async insertConcorrente(
        nome: string,
        cnpj: string,
        transaction?: FirebirdTransaction
    ) {

        const database: FirebirdDatabase | FirebirdTransaction =
            transaction ?? this.db;

        return database.queryOne<{ ID: number }>(
            `
            INSERT INTO CONCORRENTE (
                NOME,
                CNPJ
            )
            VALUES (?, ?)
            RETURNING ID
            `,
            [
                nome,
                cnpj
            ]
        );

    }

    async findItemLicitacao(
        licitacaoId: number,
        item: number,
        transaction?: FirebirdTransaction
    ) {

        const database: FirebirdDatabase | FirebirdTransaction =
            transaction ?? this.db;

        return database.query<{ ID: number }>(
            `
            SELECT ID
            FROM ITEM_LICITACAO
            WHERE LICITACAO_ID = ?
            AND ITEM = ?
            `,
            [
                licitacaoId,
                item
            ]
        );

    }

    async insertItemLicitacao(
        licitacaoId: number,
        item: number,
        descricao: string,
        marca: string,
        modelo: string,
        quantidade: number,
        unidade: string,
        transaction?: FirebirdTransaction
    ) {

        const database: FirebirdDatabase | FirebirdTransaction =
            transaction ?? this.db;

        return database.queryOne<{ ID: number }>(
            `
            INSERT INTO ITEM_LICITACAO (
                LICITACAO_ID,
                ITEM,
                DESCRICAO,
                MARCA,
                MODELO,
                QUANTIDADE,
                UNIDADE
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
            RETURNING ID
            `,
            [
                licitacaoId,
                item,
                descricao,
                marca,
                modelo,
                quantidade,
                unidade
            ]
        );

    }

    async findResultadoLicitacao(
        itemLicitacaoId: number,
        concorrenteId: number,
        transaction?: FirebirdTransaction
    ) {
        const database: FirebirdDatabase | FirebirdTransaction =
            transaction ?? this.db;

        return database.query<{ ID: number }>(
            `
        SELECT ID
        FROM RESULTADO_LICITACAO
        WHERE ITEM_LICITACAO_ID = ?
        AND CONCORRENTE_ID = ?
        `,
            [
                itemLicitacaoId,
                concorrenteId
            ]
        );
    }

    async insertResultadoLicitacao(
        itemLicitacaoId: number,
        concorrenteId: number,
        precoGanho: number,
        valorTotalLance: number,
        valorOrcado: number,
        valorTotalOrcado: number,
        economiaPercentual: number,
        economiaReais: number,
        dataRelatorio: string,
        horaRelatorio: string,
        transaction?: FirebirdTransaction
    ) {

        const database: FirebirdDatabase | FirebirdTransaction =
            transaction ?? this.db;

        return database.query(
            `
            INSERT INTO RESULTADO_LICITACAO (
                ITEM_LICITACAO_ID,
                CONCORRENTE_ID,
                PRECO_GANHO,
                VALOR_TOTAL_LANCE,
                VALOR_ORCADO,
                VALOR_TOTAL_ORCADO,
                ECONOMIA_PERCENTUAL,
                ECONOMIA_REAIS,
                DATA_RELATORIO,
                HORA_RELATORIO
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
                itemLicitacaoId,
                concorrenteId,
                precoGanho,
                valorTotalLance,
                valorOrcado,
                valorTotalOrcado,
                economiaPercentual,
                economiaReais,
                dataRelatorio,
                horaRelatorio
            ]
        );

    }

}