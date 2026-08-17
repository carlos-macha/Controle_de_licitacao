import container from "./container";

import { ImportacaoLicitacaoDAO } from "../dao/importacaoLicitacao.dao";
import { ImportacaoLicitacaoService } from "../services/importacaoLicitacao.service";
import { ImportacaoLicitacaoController } from "../controllers/importacaoLicitacao.controller";

container
    .bind(ImportacaoLicitacaoDAO)
    .toSelf();

container
    .bind(ImportacaoLicitacaoService)
    .toSelf();

container
    .bind(ImportacaoLicitacaoController)
    .toSelf();