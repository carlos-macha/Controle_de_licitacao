import container from "./container";

import { UsuarioDAO } from "../dao/usuario.dao";
import { UsuarioService } from "../services/usuario.service";
import { UsuarioController } from "../controllers/usuario.controller";

container.bind(UsuarioDAO).toSelf();

container.bind(UsuarioService).toSelf();

container.bind(UsuarioController).toSelf();
