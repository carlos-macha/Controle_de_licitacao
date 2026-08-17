import {
    Request,
    Response,
    NextFunction
} from "express";

import { inject, injectable } from "inversify";

import { ImportacaoLicitacaoService } from "../services/importacaoLicitacao.service";

@injectable()
export class ImportacaoLicitacaoController {

    constructor(
        @inject(ImportacaoLicitacaoService)
        private importacaoLicitacaoService:
            ImportacaoLicitacaoService
    ) { }

    async importar(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const result =
                await this.importacaoLicitacaoService.importar(
                    req.body
                );

            return res
                .status(201)
                .json(result);

        } catch (error) {

            next(error);

        }

    }

}