import { inject, injectable } from "inversify";

import { BaseController } from "./base.controller";
import { Concorrente } from "../models/Concorrente";
import { ConcorrenteService } from "../services/concorrente.service";

@injectable()
export class ConcorrenteController extends BaseController<Concorrente> {

    constructor(
        @inject(ConcorrenteService)
        concorrenteService: ConcorrenteService
    ) {

        super(concorrenteService);

    }

}