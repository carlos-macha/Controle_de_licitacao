import { injectable } from "inversify";
import * as Firebird from "node-firebird";

export interface FirebirdTransaction {
    query: <T = unknown>(
        sql: string,
        params?: unknown[]
    ) => Promise<T[]>;

    queryOne: <T = unknown>(
        sql: string,
        params?: unknown[]
    ) => Promise<T>;
}

@injectable()
export class FirebirdDatabase {

    private db: any;

    async connect(): Promise<void> {

        const options = {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            lowercase_keys: false,
            pageSize: 4096,
        };

        this.db = await new Promise((resolve, reject) => {

            Firebird.attach(
                options,
                (
                    err: Error | null,
                    db: any
                ) => {

                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(db);
                }
            );

        });

    }

    async query<T = unknown>(
        sql: string,
        params: unknown[] = []
    ): Promise<T[]> {

        return new Promise<T[]>((resolve, reject) => {

            this.db.query(
                sql,
                params,
                (err: Error | null, result: T[]) => {

                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(result);
                }
            );

        });

    }

    async queryOne<T = unknown>(
        sql: string,
        params: unknown[] = []
    ): Promise<T> {

        return new Promise<T>((resolve, reject) => {

            this.db.query(
                sql,
                params,
                (err: Error | null, result: T) => {

                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(result);
                }
            );

        });

    }

    async transaction<T>(
        callback: (
            transaction: FirebirdTransaction
        ) => Promise<T>
    ): Promise<T> {

        return new Promise<T>((resolve, reject) => {

            this.db.transaction(
                Firebird.ISOLATION_READ_COMMITTED,
                async (
                    err: Error | null,
                    transaction: any
                ) => {

                    if (err) {
                        reject(err);
                        return;
                    }

                    const query = <R = unknown>(
                        sql: string,
                        params: unknown[] = []
                    ): Promise<R[]> => {

                        return new Promise<R[]>((resolveQuery, rejectQuery) => {

                            transaction.query(
                                sql,
                                params,
                                (
                                    errQuery: Error | null,
                                    result: R[]
                                ) => {

                                    if (errQuery) {
                                        rejectQuery(errQuery);
                                        return;
                                    }

                                    resolveQuery(result);
                                }
                            );

                        });

                    };

                    const queryOne = <R = unknown>(
                        sql: string,
                        params: unknown[] = []
                    ): Promise<R> => {

                        return new Promise<R>((resolveQuery, rejectQuery) => {

                            transaction.query(
                                sql,
                                params,
                                (
                                    errQuery: Error | null,
                                    result: R
                                ) => {

                                    if (errQuery) {
                                        rejectQuery(errQuery);
                                        return;
                                    }

                                    resolveQuery(result);
                                }
                            );

                        });

                    };

                    const firebirdTransaction: FirebirdTransaction = {
                        query,
                        queryOne
                    };

                    try {

                        const result =
                            await callback(firebirdTransaction);

                        transaction.commit(
                            (commitError: Error | null) => {

                                if (commitError) {
                                    reject(commitError);
                                    return;
                                }

                                resolve(result);
                            }
                        );

                    } catch (error) {

                        transaction.rollback(
                            (rollbackError: Error | null) => {

                                if (rollbackError) {
                                    reject(rollbackError);
                                    return;
                                }

                                reject(error);
                            }
                        );

                    }

                }
            );

        });

    }

}