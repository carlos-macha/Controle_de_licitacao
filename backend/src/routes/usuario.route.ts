import { Router } from "express";
import { container } from "../containers";

import { UsuarioController } from "../controllers/usuario.controller";
import { validate } from "../middlewares/validade";

import {
    atualizarNomeSchema,
    atualizarSenhaSchema,
    createUsuarioSchema,
    updateUsuarioSchema,
} from "../schemas/usuario.schema";

import { loginSchema } from "../schemas/login.schema";
import { authenticate } from "../middlewares/auth";
import { unlockSchema } from "../schemas/unlock.schema";
import { admin } from "../middlewares/admin";
import { loginRateLimit } from "../middlewares/loginRateLimit";
import { createCrudRoutes } from "../utils/createCrudRoutes";

const usuarioRouter = Router();

const controller = container.get(UsuarioController);

createCrudRoutes(
    usuarioRouter,
    "usuarios",
    controller,
    {
        create: createUsuarioSchema,
        update: updateUsuarioSchema,
    },
    [admin]
);

usuarioRouter.post(
    "/login",
    loginRateLimit,
    validate({
        body: loginSchema,
    }),
    controller.login.bind(controller)
);

usuarioRouter.post("/logout", authenticate, controller.logout.bind(controller));

usuarioRouter.post(
    "/unlock",
    authenticate,
    validate({
        body: unlockSchema,
    }),
    controller.unlock.bind(controller)
);

usuarioRouter.get("/perfil", authenticate, controller.perfil.bind(controller));

usuarioRouter.put(
    "/atualizar-nome",
    authenticate,
    validate({
        body: atualizarNomeSchema,
    }),
    controller.atualizarNome.bind(controller)
);

usuarioRouter.put(
    "/atualizar-senha",
    authenticate,
    validate({
        body: atualizarSenhaSchema,
    }),
    controller.atualizarSenha.bind(controller)
);

export default usuarioRouter;