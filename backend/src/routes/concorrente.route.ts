import { Router } from "express";
import { container } from "../containers";

import { ConcorrenteController } from "../controllers/concorrente.controller";
import { authenticate } from "../middlewares/auth";
import { validate } from "../middlewares/validade";
import { idParamSchema } from "../schemas/id.schema";
import {
    createConcorrenteSchema,
    updateConcorrenteSchema
} from "../schemas/concorrente.schema";

const concorrenteRouter = Router();

const controller = container.get(ConcorrenteController);

concorrenteRouter.get(
    "/concorrentes",
    authenticate,
    controller.find.bind(controller)
);

concorrenteRouter.post(
    "/concorrentes",
    authenticate,
    validate({
        body: createConcorrenteSchema
    }),
    controller.insert.bind(controller)
);

concorrenteRouter.put(
    "/concorrentes/:id",
    authenticate,
    validate({
        params: idParamSchema,
        body: updateConcorrenteSchema
    }),
    controller.update.bind(controller)
);

concorrenteRouter.get(
    "/concorrentes/:id",
    authenticate,
    validate({
        params: idParamSchema
    }),
    controller.findById.bind(controller)
);

concorrenteRouter.delete(
    "/concorrentes/:id",
    authenticate,
    validate({
        params: idParamSchema
    }),
    controller.delete.bind(controller)
);

export default concorrenteRouter;