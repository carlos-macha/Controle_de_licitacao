import { Router } from "express";
import { container } from "../containers";

import { ProdutoController } from "../controllers/produto.controller";
import {
    createProdutoSchema,
    updateProdutoSchema
} from "../schemas/produto.schema";

import { createCrudRoutes } from "../utils/createCrudRoutes";


const produtoRouter = Router();

const controller =
    container.get(ProdutoController);


createCrudRoutes(
    produtoRouter,
    "produtos",
    controller,
    {
        create: createProdutoSchema,
        update: updateProdutoSchema
    }
);


export default produtoRouter;