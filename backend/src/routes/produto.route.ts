import { Router } from "express";
import { container } from "../containers";

import { ProdutoController } from "../controllers/produto.controller";
import { validate } from "../middlewares/validade";
import { idParamSchema } from "../schemas/id.schema";
import { createProdutoSchema, updateProdutoSchema } from "../schemas/produto.schema";
import { authenticate } from "../middlewares/auth";

const produtoRouter = Router();

const controller = container.get(ProdutoController);

produtoRouter.get("/produtos", authenticate, controller.find.bind(controller));
produtoRouter.post(
    "/produtos",
    authenticate,
    validate({
        body: createProdutoSchema
    }),
    controller.insert.bind(controller)
);

produtoRouter.put(
    "/produtos/:id",
    authenticate,
    validate({
        params: idParamSchema,
        body: updateProdutoSchema
    }),
    controller.update.bind(controller)
);

produtoRouter.get(
    "/produtos/:id",
    authenticate,
    validate({
        params: idParamSchema
    }),
    controller.findById.bind(controller)
);

produtoRouter.delete(
    "/produtos/:id",
    authenticate,
    validate({
        params: idParamSchema
    }),
    controller.delete.bind(controller)
);

export default produtoRouter;