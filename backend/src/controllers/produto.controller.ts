import { injectable } from "inversify";

import { BaseController } from "./base.controller";
import { Produto } from "../models/Produto";
import { ProdutoService } from "../services/produto.service";


@injectable()
export class ProdutoController 
    extends BaseController<Produto> {


    constructor(
        produtoService: ProdutoService
    ) {

        super(produtoService);

    }

}