import { Router } from "express";
import { container } from "../containers";

import { ConcorrenteController } from "../controllers/concorrente.controller";
import {
    createConcorrenteSchema,
    updateConcorrenteSchema,
} from "../schemas/concorrente.schema";

import { createCrudRoutes } from "../utils/createCrudRoutes";

const concorrenteRouter = Router();

const controller = container.get(ConcorrenteController);

createCrudRoutes(concorrenteRouter, "concorrentes", controller, {
    create: createConcorrenteSchema,
    update: updateConcorrenteSchema,
});

export default concorrenteRouter;