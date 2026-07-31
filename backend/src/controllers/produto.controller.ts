import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

import { ProdutoService } from "../services/produto.service";

@injectable()
export class ProdutoController {

    constructor(
        @inject(ProdutoService)
        private produtoService: ProdutoService
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

            const produtos = await this.produtoService.find({
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

            return res.json(produtos);

        } catch (error) {
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {

            const id = Number(req.params.id);

            const produto = await this.produtoService.findById(id);

            return res.json(produto);

        } catch (error) {
            next(error);
        }
    }

    async insert(req: Request, res: Response, next: NextFunction) {
        try {

            const produto = await this.produtoService.insert(req.body);

            return res.status(201).json(produto);

        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {

            const id = Number(req.params.id);

            const produto = await this.produtoService.update(id, req.body);

            return res.json(produto);

        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {

            const id = Number(req.params.id);

            await this.produtoService.delete(id);

            return res.sendStatus(204);

        } catch (error) {
            next(error);
        }
    }

}