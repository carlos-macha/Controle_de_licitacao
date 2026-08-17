import { Router } from "express";
import { container } from "../containers";

import { ItemLicitacaoController } from "../controllers/itemLicitacao.controller";
import {
    createItemLicitacaoSchema,
    updateItemLicitacaoSchema,
} from "../schemas/itemLicitacao.schema";

import { createCrudRoutes } from "../utils/createCrudRoutes";

const itemLicitacaoRouter = Router();

const controller =
    container.get(ItemLicitacaoController);

createCrudRoutes(
    itemLicitacaoRouter,
    "itens-licitacao",
    controller,
    {
        create: createItemLicitacaoSchema,
        update: updateItemLicitacaoSchema,
    }
);

export default itemLicitacaoRouter;