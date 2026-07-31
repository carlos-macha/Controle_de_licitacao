import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

import { ConcorrenteService } from "../services/concorrente.service";

@injectable()
export class ConcorrenteController {

    constructor(
        @inject(ConcorrenteService)
        private concorrenteService: ConcorrenteService
    ) { }

    async find(req: Request, res: Response, next: NextFunction) {
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
                Object.entries(where).filter(
                    ([, value]) =>
                        typeof value === "string" ||
                        typeof value === "number"
                )
            );

            const concorrentes = await this.concorrenteService.find({
                page: pageNumber,
                limit: limitValue,
                orderBy: typeof orderBy === "string"
                    ? orderBy
                    : undefined,
                order: order === "DESC"
                    ? "DESC"
                    : "ASC",
                where: Object.keys(whereObject).length
                    ? whereObject
                    : undefined
            });

            return res.json(concorrentes);

        } catch (error) {
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {

            const id = Number(req.params.id);

            const concorrente = await this.concorrenteService.findById(id);

            return res.json(concorrente);

        } catch (error) {
            next(error);
        }
    }

    async insert(req: Request, res: Response, next: NextFunction) {
        try {

            const concorrente = await this.concorrenteService.insert(req.body);

            return res.status(201).json(concorrente);

        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {

            const id = Number(req.params.id);

            const concorrente = await this.concorrenteService.update(id, req.body);

            return res.json(concorrente);

        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {

            const id = Number(req.params.id);

            await this.concorrenteService.delete(id);

            return res.sendStatus(204);

        } catch (error) {
            next(error);
        }
    }

}