import container from "./container";

import { ItemLicitacaoDAO } from "../dao/itemLicitacao.dao";
import { ItemLicitacaoService } from "../services/itemLicitacao.service";
import { ItemLicitacaoController } from "../controllers/itemLicitacao.controller";


container.bind(ItemLicitacaoDAO).toSelf();

container.bind(ItemLicitacaoService).toSelf();

container.bind(ItemLicitacaoController).toSelf();