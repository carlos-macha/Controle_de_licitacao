import container from "./container";

import { ProdutoDAO } from "../dao/produto.dao";
import { ProdutoService } from "../services/produto.service";
import { ProdutoController } from "../controllers/produto.controller";

container.bind(ProdutoDAO).toSelf();

container.bind(ProdutoService).toSelf();

container.bind(ProdutoController).toSelf();
