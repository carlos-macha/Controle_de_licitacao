import { inject, injectable } from "inversify";

import { BaseController } from "./base.controller";
import { ResultadoLicitacao } from "../schemas/resultadoLicitacao.schema";
import { ResultadoLicitacaoService } from "../services/resultadoLicitacao.service";

@injectable()
export class ResultadoLicitacaoController extends BaseController<ResultadoLicitacao> {
    constructor(
        @inject(ResultadoLicitacaoService)
        resultadoLicitacaoService: ResultadoLicitacaoService
    ) {
        super(resultadoLicitacaoService);
    }
}