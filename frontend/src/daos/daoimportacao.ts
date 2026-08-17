import DAO from "../base/daos/dao";

export default class DAOImportacao extends DAO {

    Importar = (dados: unknown[]) =>
        this.Post(
            `/importacao-licitacoes`,
            dados
        );

}