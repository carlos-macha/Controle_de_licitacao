import { inject, injectable } from "inversify";

import { BaseController } from "./base.controller";
import { Licitacao } from "../models/Licitacao";
import { LicitacaoService } from "../services/licitacao.service";

@injectable()
export class LicitacaoController extends BaseController<Licitacao> {
    constructor(
        @inject(LicitacaoService)
        licitacaoService: LicitacaoService
    ) {
        super(licitacaoService);
    }
}
