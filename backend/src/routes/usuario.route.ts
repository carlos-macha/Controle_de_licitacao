import { Router } from "express";
import { container } from "../containers";

import { UsuarioController } from "../controllers/usuario.controller";
import { validate } from "../middlewares/validade";

import {
    createUsuarioSchema,
    updateUsuarioSchema
} from "../schemas/usuario.schema";

import { loginSchema } from "../schemas/login.schema";
import { createCrudRoutes } from "../utils/createCrudRoutes";
import { unlockSchema } from "../schemas/unlock.schema";
import { authenticate } from "../middlewares/auth";

const usuarioRouter = Router();

const controller =
    container.get(UsuarioController);

createCrudRoutes(
    usuarioRouter,
    "usuarios",
    controller,
    {
        create: createUsuarioSchema,
        update: updateUsuarioSchema
    }
);

usuarioRouter.post(
    "/registrar-usuario",
    validate({
        body: createUsuarioSchema
    }),
    controller.insert.bind(controller)
);

usuarioRouter.post(
    "/login",
    validate({
        body: loginSchema
    }),
    controller.login.bind(controller)
);

usuarioRouter.post(
    "/unlock",
    authenticate,
    validate({
        body: unlockSchema
    }),
    controller.unlock.bind(controller)
);


export default usuarioRouter;