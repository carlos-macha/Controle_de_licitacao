import { Router } from "express";
import { container } from "../containers";

import { LicitacaoController } from "../controllers/licitacao.controller";
import {
    createLicitacaoSchema,
    updateLicitacaoSchema,
} from "../schemas/licitacao.schema";

import { createCrudRoutes } from "../utils/createCrudRoutes";

const licitacaoRouter = Router();

const controller = container.get(LicitacaoController);

createCrudRoutes(licitacaoRouter, "licitacoes", controller, {
    create: createLicitacaoSchema,
    update: updateLicitacaoSchema,
});

export default licitacaoRouter;
