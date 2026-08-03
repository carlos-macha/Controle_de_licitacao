import { Router } from "express";
import { container } from "../containers";

import { LicitacaoProdutoController } from "../controllers/licitacaoProduto.controller";

import {
    createLicitacaoProdutoSchema,
    updateLicitacaoProdutoSchema
} from "../schemas/licitacaoProduto.schema";

import { createCrudRoutes } from "../utils/createCrudRoutes";


const licitacaoProdutoRouter = Router();


const controller =
    container.get(LicitacaoProdutoController);



createCrudRoutes(
    licitacaoProdutoRouter,
    "licitacao-produtos",
    controller,
    {
        create: createLicitacaoProdutoSchema,
        update: updateLicitacaoProdutoSchema
    }
);



export default licitacaoProdutoRouter;