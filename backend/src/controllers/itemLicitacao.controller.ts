import { inject, injectable } from "inversify";

import { BaseController } from "./base.controller";
import { ItemLicitacao } from "../schemas/itemLicitacao.schema";
import { ItemLicitacaoService } from "../services/itemLicitacao.service";

@injectable()
export class ItemLicitacaoController extends BaseController<ItemLicitacao> {
    constructor(
        @inject(ItemLicitacaoService)
        itemLicitacaoService: ItemLicitacaoService
    ) {
        super(itemLicitacaoService);
    }
}