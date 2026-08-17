import container from "./container";

import { ResultadoLicitacaoDAO } from "../dao/resultadoLicitacao.dao";
import { ResultadoLicitacaoService } from "../services/resultadoLicitacao.service";
import { ResultadoLicitacaoController } from "../controllers/resultadoLicitacao.controller";

container.bind(ResultadoLicitacaoDAO).toSelf();

container.bind(ResultadoLicitacaoService).toSelf();

container.bind(ResultadoLicitacaoController).toSelf();
