import {
    Request,
    Response,
    NextFunction
} from "express";

import { BaseService } from "../services/base.service";


export class BaseController<
    T
> {


    constructor(
        protected service: BaseService<T>
    ) { }



    async find(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const {
                page,
                limit,
                orderBy,
                order,
                ...where
            } = req.query;


            const pageValue = Number(page);

            const pageNumber =
                Number.isFinite(pageValue) && pageValue > 0
                    ? Math.floor(pageValue)
                    : 1;


            const limitValue = Number(limit);


            const whereObject = Object.fromEntries(

                Object.entries(where)
                    .filter(
                        ([, value]) =>
                            typeof value === "string" ||
                            typeof value === "number"
                    )
                    .map(([key, value]) => {

                        if (key.startsWith("SEARCH_")) {
                            return [
                                key.replace("SEARCH_", ""),
                                value
                            ];
                        }

                        return [key, value];

                    })

            );


            const result =
                await this.service.find({

                    page: pageNumber,

                    limit: limitValue,

                    orderBy:
                        typeof orderBy === "string"
                            ? orderBy
                            : undefined,

                    order:
                        order === "DESC"
                            ? "DESC"
                            : "ASC",

                    where:
                        Object.keys(whereObject).length
                            ? whereObject
                            : undefined

                });


            return res.json(result.data);


        } catch (error) {

            next(error);

        }

    }



    async findById(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const id =
                Number(req.params.id);


            const result =
                await this.service.findById(id);


            return res.json(result);


        } catch (error) {

            next(error);

        }

    }



    async insert(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const result =
                await this.service.insert(req.body);


            return res
                .status(201)
                .json(result);


        } catch (error) {

            next(error);

        }

    }



    async update(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const id =
                Number(req.params.id);


            const result =
                await this.service.update(
                    id,
                    req.body
                );

            return res.json(result);


        } catch (error) {

            next(error);

        }

    }



    async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const id =
                Number(req.params.id);


            const deleted = await this.service.delete(id);

            return res.json({
                "Quantidade deletados": deleted
            });


        } catch (error) {

            next(error);

        }

    }

}