import container from "./container";

import { LicitacaoDAO } from "../dao/licitacao.dao";
import { LicitacaoService } from "../services/licitacao.service";
import { LicitacaoController } from "../controllers/licitacao.controller";

container.bind(LicitacaoDAO).toSelf();

container.bind(LicitacaoService).toSelf();

container.bind(LicitacaoController).toSelf();