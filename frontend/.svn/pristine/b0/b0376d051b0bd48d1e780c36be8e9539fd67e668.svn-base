import MeuPerfilManutencao from "./meuperfilmamanutencao";
import { CrudContainer } from "../../base/components/crud/container/crudcontainer";
import { CrudManutencaoEvents, CrudUrl } from "../../base/components/crud/types";
import { DataTableColumns } from "../../base/components/datatable/datatable";

class MeuPerfilContainer extends CrudContainer {
   crudUrl = (): CrudUrl | undefined => {
      return {
         POST: '/usuarios'
      }
   }

   columns = (): DataTableColumns | undefined => {

      const columns: DataTableColumns = [
         {
            title: "ID", field: "USU_USUARIO", width: 90, type: "string", isKey: true, visible: false
         }
      ]

      return columns;
   }

   manutencao = (events: CrudManutencaoEvents): JSX.Element => {
      return (
         <MeuPerfilManutencao
            events={events}
         />
      )
   }
}

export default MeuPerfilContainer;