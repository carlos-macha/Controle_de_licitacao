import { injectable } from "inversify";
import * as Firebird from "node-firebird";


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

}