import { Router } from "express";
import { container } from "../containers";

import { ImportacaoLicitacaoController } from "../controllers/importacaoLicitacao.controller";
import { validate } from "../middlewares/validade";
import { authenticate } from "../middlewares/auth";

import { importacaoLicitacaoArraySchema } from "../schemas/importacaoLicitacao.schema";

const importacaoLicitacaoRouter = Router();

const controller =
    container.get(ImportacaoLicitacaoController);

importacaoLicitacaoRouter.post(
    "/importacao-licitacoes",
    authenticate,
    validate({
        body: importacaoLicitacaoArraySchema,
    }),
    controller.importar.bind(controller)
);

export default importacaoLicitacaoRouter;