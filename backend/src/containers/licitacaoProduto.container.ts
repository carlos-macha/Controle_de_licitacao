import container from "./container";

import { LicitacaoProdutoDAO } from "../dao/licitacaoProduto.dao";
import { LicitacaoProdutoService } from "../services/licitacaoProduto.service";
import { LicitacaoProdutoController } from "../controllers/licitacaoProduto.controller";

container.bind(LicitacaoProdutoDAO).toSelf();

container.bind(LicitacaoProdutoService).toSelf();

container.bind(LicitacaoProdutoController).toSelf();
