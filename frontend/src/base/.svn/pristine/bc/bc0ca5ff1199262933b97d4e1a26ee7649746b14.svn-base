import { InputDataValue } from "../../types/types"
import { DataTableColumns } from "../datatable/datatable"
import { EnumCrudStateRecordType } from "./enums"

export interface CrudUrl {
   GET?: string,
   PUT?: string,
   POST?: string,
   DELETE?: string
}

interface CrudEvents {
   url?: CrudUrl,
   columns?: DataTableColumns
}

export interface CrudPesquisaEvents extends CrudEvents {
   onNewButton: (data?: any) => void,
   onChangeButton: (data: any) => void,
   onDeleteButton: (data: any) => void,
   onViewButton: (data: any) => void
}

export interface CrudManutencaoEvents extends CrudEvents {
   onSaveButton: (data: any) => void,
   onCancelButton: () => void,
   data?: any,
   dataModel?: InputDataValue<any>,
   state: EnumCrudStateRecordType
}

export type typeRender = 'crud' | 'search' | 'maintenance';