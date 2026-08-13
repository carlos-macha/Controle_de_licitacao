import { BaseDAO } from "../dao/base.dao";
import { HttpError } from "../utils/httpError";

export class BaseService<T> {


    constructor(
        protected dao: BaseDAO<T>,
        protected entityName: string
    ) { }



    async insert(
        data: Omit<T, "ID">
    ) {

        const id =
            await this.dao.insert(
                data as Record<string, unknown>
            );

        const item =
            await this.dao.findById(id);

        return item;

    }



async find(options?: {
        page?: number;
        limit?: number;
        where?: Record<
            string,
            unknown | { operator: "=" | "LIKE"; value: unknown }
        >;
        orderBy?: string;
        order?: "ASC" | "DESC";
    }) {
 
        return this.dao.find(options);
 
    }



    async findById(id: number): Promise<T> {

        const item =
            await this.dao.findById(id);


        if (!item) {

            throw new HttpError(
                404,
                `${this.entityName} não encontrado.`
            );

        }


        return item;

    }



    async update(
        id: number,
        data: Partial<T>
    ) {

        await this.findById(id);

        await this.dao.update(
            id,
            data as Partial<T>
        );

        return this.dao.findById(id);

    }



    async delete(id: number) {

        await this.findById(id);

        return this.dao.delete(id);

    }

}