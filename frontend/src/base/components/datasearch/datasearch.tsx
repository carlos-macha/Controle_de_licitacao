import React, { Fragment, useState, useEffect, useRef } from 'react';
import { utilities } from '../../utils/utilities';
import { DataTableColumns } from '../datatable/datatable';
import Button, { EnumCharcasetypes, Input, InputCheckbox, InputDateTime, InputFloat, InputInteger, InputMultCheckBox, InputSelect, OnValidateForms, OptionInputSelect, OptionsInputCheckBox, OptionsInputSelect, ValidateFields } from '../form/form';
import './datasearch.css';
import { IComponentBaseProps, InputDataValue } from '../../types/types';
import Custommodal, { CustomModalRef } from '../modal/custommodal';
import Card, { CardBody, CardFooter, CardHeader } from '../card/card';
import { ButtonGroup, Dropdown } from 'react-bootstrap';

export interface SearchEvent {
   readonly id?: string | number,
   readonly where: string,
   readonly whereBase64: string,
   readonly data: any;
}

export enum OperatorSearchTypes {
   EQUAL = '=',
   NOT_EQUAL = '<>',
   GREATER_THAN = '>',
   LESS_THAN = '<',
   GREATER_OR_EQUAL = '>=',
   LESS_OR_EQUAL = '<=',
   LIKE = 'LIKE',
   LIKE_BEGIN = 'LIKE BEGIN',
   LIKE_END = 'LIKE END',
   STARTING_WITH = 'STARTING WITH',
   CONTAINING = 'CONTAINING',
   IS_NULL = 'IS NULL',
   IS_NOT_NULL = 'IS NOT NULL',
   IN = 'IN',
   NOT_IN = 'NOT IN'
}

export type ComponentSearchTypes = 'DEFAULT' | 'BETWEEN' | 'COMBOBOX' | 'HIDDEN' | 'CHECKBOX';

export interface DataSearchType {
   operator?: OperatorSearchTypes,
   width?: number | string,
   type?: ComponentSearchTypes,
   options?: OptionsInputSelect,
   optionsCheckBox?: OptionsInputCheckBox,
   charCase?: EnumCharcasetypes,
   required?: boolean,
   onValidate?: OnValidateForms,
   field?: string,
   defaultValue?: any,
   defaultValue_GE?: any,
   defaultValue_LE?: any,
   doNotGenerateWhere?: boolean,
   placeholder?: string,
   tooltip?: string,
   readOnly?: boolean,
   isMulti?: boolean,
   onChange?: (e: OptionInputSelect | string | number) => void,
   isClearable?: boolean
}

interface DataSearchProps extends IComponentBaseProps {
   autoLoad?: boolean,
   loading?: boolean,
   columns: DataTableColumns,
   onSearch: (e: SearchEvent) => void
}

const prefixField: string = 'SEARCH_';

export const DataSearchValue = (data: object, fieldName: string): any | undefined => {

   let key = Object.keys(data).find(key => {
      return key === prefixField + fieldName;
   });

   if (key) {
      return (data as any)[prefixField + fieldName];
   }

   return undefined;
}

const DataSearch: React.FC<DataSearchProps> = (props) => {
   const { autoLoad, columns, loading, onSearch, prefixId } = props;
   const [validateFields] = useState<ValidateFields>(new ValidateFields());
   const [internalAutoLoad, setInternalAutoLoad] = useState<boolean | undefined>();
   const [filter, setFilter] = useState<any>({});
   const [searchKey, setSearchKey] = useState(0);
   const dataModel: InputDataValue<any> = { data: filter, setData: setFilter };
   const clearSearch = () => {
      const data: any = {};

      columns?.forEach(col => {
         if (!col.search)
            return;

         data[prefixField + col.field!] = undefined;

         if (col.search.type === 'BETWEEN') {
            data[`${prefixField + col.field}_GE`] = undefined;
            data[`${prefixField + col.field}_LE`] = undefined;
         }
      });

      validateFields.cleanMessage();
      setFilter(data);
      setSearchKey(prev => prev + 1);

      onSearch({
         data,
         where: '',
         whereBase64: ''
      });
   };
   // console.log(dataModel.data)
   const renderFieldsSearch = (): Array<JSX.Element> => {
      const fieldsSearch: Array<JSX.Element> = [];

      if (columns) {
         columns.forEach(col => {

            if (!col.search)
               return;

            let width = (col.search.width ? col.search.width : col.width);
            let charCase = (col.search.charCase ? col.search.charCase : EnumCharcasetypes.NORMAL);

            switch (col.search.type) {
               case 'HIDDEN':
                  fieldsSearch.push(
                     <Input
                        id={prefixId + prefixField + col.field}
                        name={prefixField + col.field}
                        key={columns.indexOf(col)}
                        dataModel={dataModel}
                        type="hidden"
                     />
                  );
                  break;

               case 'COMBOBOX':
                  fieldsSearch.push(
                     <div style={{ width: width }} key={columns.indexOf(col)}>
                        <InputSelect
                           isClearable={col.search.isClearable}
                           id={prefixId + prefixField + col.field}
                           name={prefixField + col.field}
                           placeholder={col.search.placeholder ? col.search.placeholder : col.title}
                           options={col.search.options ? col.search.options : []}
                           dataModel={dataModel}
                           validator={validateFields}
                           validations={{
                              required: col.search.required,
                              message: 'Obrigatório',
                              onValidate: col.search.onValidate
                           }}
                           title={col.search.tooltip ? col.search.tooltip : col.title}
                           overlayProps={{
                              placement: "top"
                           }}
                           isDisabled={col.search.readOnly}
                           onChange={col.search.onChange}
                        />
                     </div>
                  );
                  break;

               case 'CHECKBOX':
                  fieldsSearch.push(
                     <InputMultCheckBox
                        caption={col.search.placeholder ? col.search.placeholder : col.title}
                        id={prefixId + prefixField + col.field}
                        name={prefixField + col.field}
                        options={col.search.optionsCheckBox ? col.search.optionsCheckBox : []}
                        dataModel={dataModel}
                        title={col.search?.tooltip || col.title}
                        disabled={col.search?.readOnly || false}
                        overlayProps={{
                           placement: "top"
                        }}
                     />
                  )
                  break;

               default:

                  switch (col.type) {
                     case "integer":
                        fieldsSearch.push(
                           <InputInteger
                              id={prefixId + prefixField + col.field}
                              name={prefixField + col.field}
                              key={columns.indexOf(col)}
                              dataModel={dataModel}
                              placeholder={col.search.placeholder ? col.search.placeholder : col.title}
                              style={{ width: width }}
                              validator={validateFields}
                              validations={{
                                 required: col.search.required,
                                 message: 'Obrigatório',
                                 onValidate: col.search.onValidate
                              }}
                              title={col.search.tooltip ? col.search.tooltip : col.title}
                              overlayProps={{
                                 placement: "top"
                              }}
                              readOnly={col.search.readOnly}
                           />
                        );
                        break;

                     case 'float':
                        fieldsSearch.push(
                           <InputFloat
                              id={prefixId + prefixField + col.field}
                              name={prefixField + col.field}
                              key={columns.indexOf(col)}
                              dataModel={dataModel}
                              placeholder={col.search.placeholder ? col.search.placeholder : col.title}
                              style={{ width: width }}
                              validator={validateFields}
                              validations={{
                                 required: col.search.required,
                                 message: 'Obrigatório',
                                 onValidate: col.search.onValidate
                              }}
                              title={col.search.tooltip ? col.search.tooltip : col.title}
                              overlayProps={{
                                 placement: "top"
                              }}
                              readOnly={col.search.readOnly}
                           />
                        );
                        break;

                     case 'date':
                        if (col.search.type === "BETWEEN") {
                           fieldsSearch.push(
                              <InputDateTime
                                 type='date'
                                 id={`${prefixId + prefixField + col.field}_GE`}
                                 name={`${prefixField + col.field}_GE`}
                                 key={`${columns.indexOf(col)}_GE`}
                                 dataModel={dataModel}
                                 placeholder={col.search.placeholder ? col.search.placeholder : `${col.title} Inicial`}
                                 style={{ width: width }}
                                 validator={validateFields}
                                 validations={{
                                    required: col.search.required,
                                    message: 'Obrigatório',
                                    onValidate: col.search.onValidate
                                 }}
                                 title={col.search.tooltip ? col.search.tooltip : `${col.title} Inicial`}
                                 overlayProps={{
                                    placement: "top"
                                 }}
                                 readOnly={col.search.readOnly}
                              />
                           );
                           fieldsSearch.push(
                              <InputDateTime
                                 type='date'
                                 id={`${prefixId + prefixField + col.field}_LE`}
                                 name={`${prefixField + col.field}_LE`}
                                 key={`${columns.indexOf(col)}_LE`}
                                 dataModel={dataModel}
                                 placeholder={col.search.placeholder ? col.search.placeholder : `${col.title} Final`}
                                 style={{ width: width }}
                                 validator={validateFields}
                                 validations={{
                                    required: col.search.required,
                                    message: 'Obrigatório',
                                    onValidate: col.search.onValidate
                                 }}
                                 title={col.search.tooltip ? col.search.tooltip : `${col.title} Final`}
                                 overlayProps={{
                                    placement: "top"
                                 }}
                                 readOnly={col.search.readOnly}
                              />
                           );
                        } else {
                           fieldsSearch.push(
                              <InputDateTime
                                 type='date'
                                 id={prefixId + prefixField + col.field}
                                 name={prefixField + col.field}
                                 dataModel={dataModel}
                                 key={columns.indexOf(col)}
                                 placeholder={col.search.placeholder ? col.search.placeholder : col.title}
                                 style={{ width: width }}
                                 validator={validateFields}
                                 validations={{
                                    required: col.search.required,
                                    message: 'Obrigatório',
                                    onValidate: col.search.onValidate
                                 }}
                                 title={col.search.tooltip ? col.search.tooltip : col.title}
                                 overlayProps={{
                                    placement: "top"
                                 }}
                                 readOnly={col.search.readOnly}
                              />
                           );
                        }
                        break;

                     case 'time':
                        fieldsSearch.push(
                           <InputDateTime
                              type='time'
                              id={prefixId + prefixField + col.field}
                              name={prefixField + col.field}
                              key={columns.indexOf(col)}
                              dataModel={dataModel}
                              placeholder={col.search.placeholder ? col.search.placeholder : col.title}
                              style={{ width: width }}
                              validator={validateFields}
                              validations={{
                                 required: col.search.required,
                                 message: 'Obrigatório',
                                 onValidate: col.search.onValidate
                              }}
                              title={col.search.tooltip ? col.search.tooltip : col.title}
                              overlayProps={{
                                 placement: "top"
                              }}
                              readOnly={col.search.readOnly}
                           />
                        );
                        break;

                     case 'datetime':
                        fieldsSearch.push(
                           <InputDateTime
                              type='datetime-local'
                              id={prefixId + prefixField + col.field}
                              name={prefixField + col.field}
                              key={columns.indexOf(col)}
                              dataModel={dataModel}
                              placeholder={col.search.placeholder ? col.search.placeholder : col.title}
                              style={{ width: width }}
                              validator={validateFields}
                              validations={{
                                 required: col.search.required,
                                 message: 'Obrigatório',
                                 onValidate: col.search.onValidate
                              }}
                              title={col.search.tooltip ? col.search.tooltip : col.title}
                              overlayProps={{
                                 placement: "top"
                              }}
                              readOnly={col.search.readOnly}
                           />
                        );
                        break;

                     default:
                        fieldsSearch.push(
                           <Input
                              id={prefixId + prefixField + col.field}
                              name={prefixField + col.field}
                              key={columns.indexOf(col)}
                              dataModel={dataModel}
                              placeholder={col.search.placeholder ? col.search.placeholder : col.title}
                              style={{ width: width }}
                              charCase={charCase}
                              validator={validateFields}
                              validations={{
                                 required: col.search.required,
                                 message: 'Obrigatório',
                                 onValidate: col.search.onValidate
                              }}
                              title={col.search.tooltip ? col.search.tooltip : col.title}
                              overlayProps={{
                                 placement: "top"
                              }}
                              readOnly={col.search.readOnly}
                           />
                        );
                        break;
                  }
                  break;
            }
         })
      }

      return fieldsSearch;
   }

   const preparaWhere = (): SearchEvent => {
      let where: string = '';

      let id: string | number | undefined;

      if (columns !== null) {
         columns.forEach(col => {

            let operator: string | OperatorSearchTypes | undefined;

            let type: ComponentSearchTypes = "DEFAULT";
            // console.log(col.search);

            if (col.search) {
               if (col.search.type)
                  type = col.search.type;

               if (col.search.doNotGenerateWhere)
                  return;
            }

            let valueFilter: string | undefined;

            Object.keys(filter).forEach(function (item) {
               if (filter[item] !== '' && filter[item] !== null && filter[item] !== undefined) {

                  // console.log(columns);

                  let _item = item;

                  switch (type) {
                     case "CHECKBOX":
                        operator = OperatorSearchTypes.IN;
                        break;

                     case "BETWEEN":
                        _item = item.replace('_GE', '').replace('_LE', '');

                        if (item.indexOf('_GE') >= 0) {
                           operator = OperatorSearchTypes.GREATER_OR_EQUAL;
                        }

                        if (item.indexOf('_LE') >= 0) {
                           operator = OperatorSearchTypes.LESS_OR_EQUAL;
                        }
                        break;

                     case "HIDDEN":
                        operator = OperatorSearchTypes.EQUAL;
                        break;

                     case "COMBOBOX":
                        if (col.search) {
                           if (col.search.operator)
                              operator = col.search.operator;

                           if (col.search.isMulti)
                              operator = OperatorSearchTypes.IN;
                        }

                        break;

                     default:
                        if (col.search && col.search.operator) {
                           operator = col.search.operator;
                        }
                        break;
                  }

                  _item = _item.replace(prefixField, '');

                  if (col.field === _item && (operator || (!operator && type === "COMBOBOX"))) {

                     if (col.isKey) {
                        id = filter[item];
                        return col;
                     }

                     if (col.search && col.search.field) {
                        _item = col.search.field;
                     }

                     valueFilter = undefined;

                     switch (col.type) {
                        case 'float':
                           valueFilter = utilities.formatFloatJson(filter[item]);
                           break;
                        case 'time':
                           valueFilter = utilities.formatFloatJson(filter[item]);
                           break;
                        case 'datetime':
                           valueFilter = utilities.formatFloatJson(filter[item]);
                           break;
                        default:
                           valueFilter = filter[item];
                     }

                     if (type === "COMBOBOX" && !operator) {
                        operator = valueFilter;
                        valueFilter = '';
                     }

                     if (!valueFilter) {
                        valueFilter = '';
                     }

                     if (col.type !== 'string' && col.type !== 'blob' && String(valueFilter).trim() === '')
                        return;

                     if (operator !== '') {
                        where = where + (where === '' ? '' : '|') + _item + ";" + operator + ";" + valueFilter;
                     }
                  }

               }
            });
         });
      }
      console.log(where)
      return {
         id,
         data: filter,
         where: where.toUpperCase(),
         whereBase64: utilities.base64(where)
      }
   }

   const elRenderSearch = renderFieldsSearch();

   const search = () => {
      if (validateFields.validateAll()) {
         if (onSearch) {
            let events: SearchEvent = preparaWhere();
            onSearch(events);
         }
      }
   }

   const initDataValue = () => {
      let data: any = { ...filter };
      // console.log(data);

      const setUndefined = (fieldName: string) => {
         let key = Object.keys(data).find(key => {
            return key === fieldName;
         });

         if (!key) {
            data[fieldName] = undefined;
         }
      }

      columns && columns.forEach(col => {
         if (col.search) {
            setUndefined(prefixField + col.field!);
            if (col.search.type === 'BETWEEN') {
               setUndefined(`${prefixField + col.field}_GE`);
               setUndefined(`${prefixField + col.field}_LE`);
            }

            if (col.search.defaultValue && !data[prefixField + col.field!])
               data[prefixField + col.field!] = col.search.defaultValue;

            if (col.search.defaultValue_GE && !data[`${prefixField + col.field}_GE`])
               data[`${prefixField + col.field}_GE`] = col.search.defaultValue_GE;

            if (col.search.defaultValue_LE && !data[`${prefixField + col.field}_LE`])
               data[`${prefixField + col.field}_LE`] = col.search.defaultValue_LE;
         }
      });

      // console.log(data);

      setFilter(data);
      setTimeout(() => {
         setInternalAutoLoad(true);
      }, 100);

   };

   useEffect(() => {
      if (internalAutoLoad)
         search();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [internalAutoLoad])


   useEffect(() => {
      initDataValue();
   }, [columns]);

   return (
      <Fragment>
         <div className="row">
            <div className="col-12">
               <div className="datasearch-containner" key={searchKey}>
                  {elRenderSearch}
                  {elRenderSearch && elRenderSearch.length > 0 &&
                     <div className="d-flex">
                        <Button
                           id={prefixId && `btn-data-search-${prefixId}`}
                           style={{ height: 45 }}
                           loading={loading}
                           classIcon="mdi mdi-magnify btn-icon mr-0"
                           onClick={search}
                           title="Pesquisar"
                           overlayProps={{
                              placement: "top"
                           }}
                        />

                        <Button
                           style={{ height: 45 }}
                           classIcon="mdi mdi-close btn-icon mr-0"
                           onClick={clearSearch}
                           title="Limpar"
                           overlayProps={{
                              placement: "top"
                           }}
                        />
                     </div>
                  }
               </div>
            </div>
         </div>
      </Fragment>
   );
}

DataSearch.defaultProps = {
   prefixId: ''
}

export default DataSearch;