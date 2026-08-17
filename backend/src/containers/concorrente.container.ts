import container from "./container";

import { ConcorrenteDAO } from "../dao/concorrente.dao";
import { ConcorrenteService } from "../services/concorrente.service";
import { ConcorrenteController } from "../controllers/concorrente.controller";

container
    .bind(ConcorrenteDAO)
    .toSelf();

container
    .bind(ConcorrenteService)
    .toSelf();

container
    .bind(ConcorrenteController)
    .toSelf();