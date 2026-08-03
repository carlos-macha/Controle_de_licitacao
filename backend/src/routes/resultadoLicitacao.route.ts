import { Router } from "express";
import { container } from "../containers";

import { ResultadoLicitacaoController } from "../controllers/resultadoLicitacao.controller";

import {
    createResultadoLicitacaoSchema,
    updateResultadoLicitacaoSchema
} from "../schemas/resultadoLicitacao.schema";

import { createCrudRoutes } from "../utils/createCrudRoutes";


const resultadoLicitacaoRouter = Router();


const controller =
    container.get(ResultadoLicitacaoController);



createCrudRoutes(
    resultadoLicitacaoRouter,
    "resultado-licitacoes",
    controller,
    {
        create: createResultadoLicitacaoSchema,
        update: updateResultadoLicitacaoSchema
    }
);



export default resultadoLicitacaoRouter;