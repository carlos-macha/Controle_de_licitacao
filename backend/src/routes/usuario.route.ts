import { Router } from "express";
import { container } from "../containers";

import { UsuarioController } from "../controllers/usuario.controller";
import { validate } from "../middlewares/validade";

import {
    createUsuarioSchema,
    updateUsuarioSchema
} from "../schemas/usuario.schema";

import { loginSchema } from "../schemas/login.schema";
import { idParamSchema } from "../schemas/id.schema";
import { authenticate } from "../middlewares/auth";

const usuarioRouter = Router();

const controller = container.get(UsuarioController);

usuarioRouter.get(
    "/usuarios",
    authenticate,
    controller.find.bind(controller)
);

usuarioRouter.get(
    "/usuarios/:id",
    authenticate,
    validate({
        params: idParamSchema
    }),
    controller.findById.bind(controller)
);

usuarioRouter.post(
    "/usuarios",
    validate({
        body: createUsuarioSchema
    }),
    controller.insert.bind(controller)
);

usuarioRouter.put(
    "/usuarios/:id",
    authenticate,
    validate({
        params: idParamSchema,
        body: updateUsuarioSchema
    }),
    controller.update.bind(controller)
);

usuarioRouter.delete(
    "/usuarios/:id",
    authenticate,
    validate({
        params: idParamSchema
    }),
    controller.delete.bind(controller)
);

usuarioRouter.post(
    "/login",
    validate({
        body: loginSchema
    }),
    controller.login.bind(controller)
);

export default usuarioRouter;