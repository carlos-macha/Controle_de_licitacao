import { SweetAlertProps, SweetAlertType } from "react-bootstrap-sweetalert/dist/types";

export type SweetAlertMessage = {
   type?: SweetAlertType,
   title?: string,
   msg?: string | JSX.Element,
   onConfirm?: () => void
}

export interface CustomSweetAlertProps {
   props: SweetAlertProps,
   msg?: string | JSX.Element
}

export type InputDataValue<T> = {
   data: T,
   setData(data: T): void
}

export type CustomJsonFile = {
   bytes?: Array<number>,
   base64StringFile?: string,
   fileName?: string,
   fileType?: string,
   fileSize?: number
}

export type RecordIdType = number | string;

export interface Tab {
   id?: string,
   idx: number,
   title: string,
   selected: boolean,
   content: JSX.Element,
   recordId: RecordIdType,
   showClose: boolean,
   origem?: string,
   fixed?: boolean,
   classNameContent?: string
}

export type ContentTabs = Array<Tab>;

export type DataRoutesTypes = {
   path: string,
   name: string,
   classIcon?: string
}

export interface IComponentBaseProps {
   prefixId?: string
}
