import clone from 'clone';
import { nanoid } from 'nanoid';
import React, { useEffect, useRef, useState } from 'react';
import { ColumnDefinition } from 'react-tabulator';
import { Tabulator } from 'react-tabulator/lib/types/TabulatorTypes';
import { CellComponent, EmptyCallback, Options, TabulatorFull, TooltipModule } from "tabulator-tables"; //import Tabulator library
// import "tabulator-tables/dist/css/tabulator_bootstrap4.min.css"; //import Tabulator stylesheet
import "tabulator-tables/dist/css/tabulator_simple.min.css"; //import Tabulator stylesheet
import { momentUtils } from '../../utils/momentutils';
import { utilities } from '../../utils/utilities';
import Card, { CardBody, CardFooter, CardHeader, CardTools } from '../card/card';
import { DataSearchType } from '../datasearch/datasearch';
import Button from '../form/form';

import './datatable.css';
import moment from 'moment';

export const rowId = 'rowId';

export type FormatterTypes = Tabulator.Formatter;

export interface FormatterMoney {
   decimal?: string,
   thousand?: string,
   symbol?: string,
   symbolAfter?: boolean;
   precision?: number,
   useNegativeColor?: boolean
}

export type ColumnTypes = 'integer' | 'string' | 'date' | 'time' | 'datetime' | 'float' | 'blob' | 'bool';

export interface DataTableColumnDefinition extends ColumnDefinition {
   type?: ColumnTypes,
   isKey?: boolean,
   search?: DataSearchType
}

export class Formatters {
   static money(symbol?: string, symbolAfter?: boolean, precision: number = 2, useNegativeColor: boolean = false): FormatterMoney {
      return {
         decimal: ",",
         thousand: ".",
         symbol,
         symbolAfter,
         precision,
         useNegativeColor
      }
   }

   static formatterNumber: FormatterTypes = function (cell, formatterParams: FormatterMoney) {
      let strValue = cell.getValue();

      strValue = Number(strValue).toLocaleString('pt-BR', {
         minimumFractionDigits: formatterParams.precision,
         maximumFractionDigits: formatterParams.precision
      });

      if (formatterParams.symbol !== undefined) {
         if (!formatterParams.symbolAfter)
            strValue = formatterParams.symbol + ' ' + strValue
         else
            strValue = strValue + ' ' + formatterParams.symbol;
      }

      if (formatterParams.useNegativeColor)
         strValue = cell.getValue() >= 0 ? `<span title="${strValue}" >${strValue}</span>` : `<span title="${strValue}" style="color: red" >${strValue}</span>`

      return strValue;
   }

   static base64(cell: any, formatterParams: {}, onRendered: EmptyCallback) {
      let strValue = (cell as CellComponent).getValue();
      strValue = utilities.base64Decode(strValue);
      return strValue ? `<span title="${strValue}" >${strValue}</span>` : '';
   }

   static date = (cell: any, formatterParams: {}, onRendered: EmptyCallback) => {
      let strValue = (cell as CellComponent).getValue();

      if (strValue && strValue !== null)
         strValue = momentUtils.fromOADate(strValue).format('DD/MM/YYYY');

      if (strValue === 0)
         strValue = '';

      return strValue ? `<span title="${strValue}" >${strValue}</span>` : '';
   }

   static time = (cell: any, formatterParams: {}, onRendered: EmptyCallback) => {
      let strValue = (cell as CellComponent).getValue();

      if (strValue && strValue !== null)
         strValue = momentUtils.fromOADate(strValue).format('HH:mm:ss');

      if (strValue === 0)
         strValue = '';

      return strValue ? `<span title="${strValue}" >${strValue}</span>` : '';
   }

   static datetime = (cell: any, formatterParams: {}, onRendered: EmptyCallback) => {
      let strValue = (cell as CellComponent).getValue();

      if (strValue && strValue !== null)
         strValue = momentUtils.fromOADate(strValue).format('DD/MM/YYYY HH:mm:ss');

      if (strValue === 0)
         strValue = '';

      return strValue ? `<span title="${strValue}" >${strValue}</span>` : '';
   }

   static dateISO = (cell: any, formatterParams: {}, onRendered: EmptyCallback) => {
      let strValue = (cell as CellComponent).getValue();

      if (strValue && strValue !== null)
         strValue = moment(strValue).format('DD/MM/YYYY');

      return strValue ? `<span title="${strValue}" >${strValue}</span>` : '';
   }

   static cnpj = (cell: any, formatterParams: {}, onRendered: EmptyCallback) => {
      let strValue = String(cell.getValue() ?? '').replace(/\D/g, '');

      if (strValue.length === 14) {
         strValue = strValue.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
            '$1.$2.$3/$4-$5'
         );
      }

      return strValue ? `<span title="${strValue}">${strValue}</span>` : '';
   }

   static timeISO = (cell: any, formatterParams: {}, onRendered: EmptyCallback) => {
      let strValue = cell.getValue();

      if (strValue && strValue !== null) {
         strValue = moment(strValue).format('HH:mm:ss');
      }

      return strValue ? `<span title="${strValue}">${strValue}</span>` : '';
   }

   static formatterPercent: FormatterTypes = function (cell, formatterParams: FormatterMoney) {
      let strValue = Number(cell.getValue()).toLocaleString('pt-BR', {
         minimumFractionDigits: formatterParams.precision ?? 2,
         maximumFractionDigits: formatterParams.precision ?? 2
      });

      return `${strValue}%`;
   }

}

export type DataTableColumns = Array<DataTableColumnDefinition>;

interface DataTableCaptions {
   btnOnDemand?: string
}

interface DataTableProps {
   id?: string,
   className?: string,
   useRowId?: boolean,
   columns: DataTableColumns,
   options: Options,
   data: any,
   title?: string,
   captions?: DataTableCaptions,
   showOnDemandButton?: boolean,
   onDemand?: () => void,
   onRowClick?: (row: any) => void,
   onUpdateDataTable?: (data: any) => void,
   addData?: any,
   uptData?: any,
   delData?: any,
   containerFooter?: JSX.Element
}

const DataTable: React.FC<DataTableProps> = (props) => {

   const { columns, options, data, title, children, captions, showOnDemandButton, addData, delData, uptData, useRowId, containerFooter, className, id } = props;
   const { onDemand, onRowClick, onUpdateDataTable } = props;
   const [qtdRegistros, setQtdRegistros] = useState<number>(0);
   const [loading, setLoading] = useState<boolean>(false);
   const [internalData, setInternalData] = useState<any>([]);
   const [tabulator, setTabulator] = useState<TabulatorFull | undefined>();

   const [saveScroll, setSaveScroll] = useState<Array<number>>([0, 0]);

   const elTableRef = useRef<HTMLDivElement | null>(null);
   const tableId = useRef<string>(id ? id : nanoid());
   // let tabulator: TabulatorFull;
   let _columns: Array<any> = [];

   columns.forEach(col => {

      let colTabulator: DataTableColumnDefinition = clone(col, true);

      delete colTabulator.type;
      delete colTabulator.isKey;
      delete colTabulator.search;

      if (!colTabulator.formatter) {
         colTabulator.formatter =
            (col.type === 'blob') ? Formatters.base64 :
               (col.type === 'date') ? Formatters.date :
                  (col.type === 'time') ? Formatters.time :
                     (col.type === 'datetime') ? Formatters.datetime :
                        (cell, formatterParams, onRendered) => {
                           let strValue = cell.getValue();

                           return strValue ? `<span title="${strValue}" >${strValue}</span>` : '';
                        }
      }

      if (!colTabulator.titleFormatter) {
         colTabulator.titleFormatter = (cell, formatterParams, onRendered) => {
            let strValue = cell.getValue();

            return strValue ? `<span title="${strValue}" >${strValue}</span>` : '';
         }
      }

      _columns.push(colTabulator);
   })

   const createTable = () => {
      if (!elTableRef.current) {
         return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let tabulator = new TabulatorFull(elTableRef.current, {
         ...options,
         columns: _columns,
         data: data,
         // paginationSize: 20,
         locale: true,
         scrollToRowIfVisible: false,
         langs: {
            "pt-br": {
               "data": {
                  "loading": "Carregando", //data loader text
                  "error": "Erro", //data error text
               },
               "groups": { //copy for the auto generated item count in group header
                  "item": "item", //the singular  for item
                  "items": "itens", //the plural for items
               },
               "pagination": {
                  "page_size": "Tamanho da Página", //label for the page size select element
                  "page_title": "Listar Página",//tooltip text for the numeric page button, appears in front of the page number (eg. "Show Page" will result in a tool tip of "Show Page 1" on the page 1 button)
                  "first": "Primeira", //text for the first page button
                  "first_title": "Primeira Página", //tooltip text for the first page button
                  "last": "Última",
                  "last_title": "Última Página",
                  "prev": "Anterior",
                  "prev_title": "Página Anterior",
                  "next": "Próxima",
                  "next_title": "Próxima Página",
                  "all": "Todas",
               }
            }
         }
      });

      tabulator.on("rowClick", (e, row) => {
         if (onRowClick)
            onRowClick(row.getData());
      });

      var elementScroll = document.getElementsByClassName('tabulator-tableholder');

      if (elementScroll[0] !== undefined) {
         tabulator.on("dataProcessed", () => {
            if (loading) {
               elementScroll[0].scrollTo({
                  left: saveScroll[0],
                  top: saveScroll[1]
               });
            }
         })
      }

      setTabulator(tabulator);
   }

   const setRowId = (data: any) => {
      if (useRowId) {
         data[rowId] = nanoid();
      }

      return data;
   }

   const updateTabulator = (data?: any) => {
      if (data && tabulator) {
         tabulator.setData(data);
         setQtdRegistros(tabulator.getDataCount());
         setLoading(false);
         setInternalData(data);
         if (onUpdateDataTable)
            onUpdateDataTable(data);
      }
   }


   const findFieldId = (columns: DataTableColumns): string => {
      let fieldId: string | undefined = '';

      columns.map(col => {
         if (col.isKey) {
            fieldId = col.field;
         }
         return col;
      });

      return fieldId;
   }

   const fieldId = (): string => {
      if (useRowId) {
         return rowId;
      } else {
         return findFieldId(columns);
      }
   }

   useEffect(() => {
      createTable();
      setQtdRegistros((data as Array<any>).length);
      setLoading(false);
      setInternalData(data);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data]);

   useEffect(() => {
      if (addData) {
         let data = [...internalData];
         data.unshift(setRowId(addData));
         updateTabulator(data);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [addData]);

   useEffect(() => {
      if (uptData) {
         let _fieldId: string = fieldId();

         var indexOf = -1;

         let data = [...internalData];

         data.forEach(itemData => {
            let fieldSplit = _fieldId.split('.');

            if (fieldSplit.length === 1) {
               if (uptData[_fieldId] === itemData[_fieldId]) {
                  indexOf = data.indexOf(itemData);
               }
            } else {
               if (uptData[fieldSplit[0]][fieldSplit[1]] === itemData[fieldSplit[0]][fieldSplit[1]]) {
                  indexOf = data.indexOf(itemData);
               }
            }
         });

         data.splice(indexOf, 1, uptData);
         updateTabulator(data);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [uptData]);

   useEffect(() => {
      if (delData) {
         let _fieldId: string = fieldId();

         var indexOf = -1;

         let data = [...internalData];

         data.forEach(itemData => {
            let fieldSplit = _fieldId.split('.');

            if (fieldSplit.length === 1) {
               if (delData[_fieldId] === itemData[_fieldId]) {
                  indexOf = data.indexOf(itemData);
               }
            } else {
               if (delData[fieldSplit[0]][fieldSplit[1]] === itemData[fieldSplit[0]][fieldSplit[1]]) {
                  indexOf = data.indexOf(itemData);
               }
            }
         });

         data.splice(indexOf, 1);
         updateTabulator(data);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [delData]);

   return (
      <Card className='iq-card mb-0'>
         {((title && title !== '') || children) &&
            <CardHeader title={title} className="iq-card-header d-flex justify-content-between pb-0" classNameTitle='mb-0' >
               <CardTools className="iq-card-header-toolbar d-flex align-items-center p-2">
                  {children}
               </CardTools>
            </CardHeader>
         }
         <CardBody className='p-0'>
            <div ref={elTableRef} id={tableId.current} className={className ? `${className} tabulator` : ''} />
         </CardBody>
         {onDemand || containerFooter ?
            <CardFooter className='mb-3'>
               {containerFooter ?
                  containerFooter
                  :
                  <div className='mt-1 float-left'>Listando {qtdRegistros} registros.&nbsp;</div>
               }
               {showOnDemandButton &&
                  <div className='float-right'>
                     <Button
                        loading={loading}
                        classIcon="mdi mdi-text-box-plus-outline mt-1 mr-0"
                        caption={captions && captions.btnOnDemand ? captions.btnOnDemand : '+ 20'}
                        onClick={() => {
                           var elementScroll = document.getElementsByClassName('tabulator-tableholder');
                           setSaveScroll([elementScroll[0].scrollLeft, elementScroll[0].scrollTop]);
                           setLoading(true);
                           if (onDemand)
                              onDemand();
                        }}
                     />
                  </div>
               }
            </CardFooter> : null
         }
      </Card>
   );
}

DataTable.defaultProps = {
   className: ''
}

export default DataTable;
