import { inject, injectable } from "inversify";

import { BaseController } from "./base.controller";
import { LicitacaoProduto } from "../schemas/licitacaoProduto.schema";
import { LicitacaoProdutoService } from "../services/licitacaoProduto.service";

@injectable()
export class LicitacaoProdutoController extends BaseController<LicitacaoProduto> {
    constructor(
        @inject(LicitacaoProdutoService)
        licitacaoProdutoService: LicitacaoProdutoService
    ) {
        super(licitacaoProdutoService);
    }
}
