import DAOImportacao from "../daos/daoimportacao";
import Controller from "../base/controllers/controller";
import Api from "../base/services/api";
import {
    storageGetWSHost,
    storageGetWSTimeout
} from "../utils/storage";
import { IModelImportacaoLicitacao } from "../models/modelImportacaoLicitacao";

export default class ControllerImportacao
    extends Controller<DAOImportacao> {

    constructor() {

        super(DAOImportacao);

        if (!Api.getInstance().conn()) {

            Api.getInstance().create(
                storageGetWSHost(),
                storageGetWSTimeout()
            );

        }

    }

    Importar = (dados: IModelImportacaoLicitacao[]) =>
        this.DAO.Importar(dados);

}