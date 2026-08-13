import { Router } from "express";
import { container } from "../containers";

import { UsuarioController } from "../controllers/usuario.controller";
import { validate } from "../middlewares/validade";

import {
    atualizarNomeSchema,
    atualizarSenhaSchema,
    createUsuarioSchema,
    updateUsuarioSchema
} from "../schemas/usuario.schema";

import { loginSchema } from "../schemas/login.schema";
import { idParamSchema } from "../schemas/id.schema";
import { authenticate } from "../middlewares/auth";
import { unlockSchema } from "../schemas/unlock.schema";
import { admin } from "../middlewares/admin";
import { loginRateLimit } from "../middlewares/loginRateLimit";

const usuarioRouter = Router();

const controller = container.get(UsuarioController);

usuarioRouter.get(
    "/usuarios",
    authenticate,
    admin,
    controller.find.bind(controller)
);

usuarioRouter.get(
    "/usuarios/:id",
    authenticate,
    admin,
    validate({
        params: idParamSchema
    }),
    controller.findById.bind(controller)
);

usuarioRouter.post(
    "/usuarios",
    authenticate,
    admin,
    validate({
        body: createUsuarioSchema
    }),
    controller.insert.bind(controller)
);

usuarioRouter.put(
    "/usuarios/:id",
    authenticate,
    admin,
    validate({
        params: idParamSchema,
        body: updateUsuarioSchema
    }),
    controller.update.bind(controller)
);

usuarioRouter.delete(
    "/usuarios/:id",
    authenticate,
    admin,
    validate({
        params: idParamSchema
    }),
    controller.delete.bind(controller)
);

usuarioRouter.post(
    "/login",
    loginRateLimit,
    validate({
        body: loginSchema
    }),
    controller.login.bind(controller)
);

usuarioRouter.post(
    "/logout", 
    authenticate, 
    controller.logout.bind(controller)
);

usuarioRouter.post(
    "/unlock",
    authenticate,
    validate({
        body: unlockSchema
    }),
    controller.unlock.bind(controller)
);

usuarioRouter.get(
    "/perfil",
    authenticate,
    controller.perfil.bind(controller)
);

usuarioRouter.put(
    "/atualizar-nome",
    authenticate,
    validate({
        body: atualizarNomeSchema
    }),
    controller.atualizarNome.bind(controller)
);

usuarioRouter.put(
    "/atualizar-senha",
    authenticate,
    validate({
        body: atualizarSenhaSchema
    }),
    controller.atualizarSenha.bind(controller)
);


export default usuarioRouter;