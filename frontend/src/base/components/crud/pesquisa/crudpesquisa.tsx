import { nanoid } from 'nanoid';
import React, { Fragment, useState, useRef, useEffect, useImperativeHandle, Ref, forwardRef } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import Card, { CardBody, CardHeader } from '../../card/card';
import { SearchEvent } from '../../datasearch/datasearch';
import DataTable, { DataTableColumns } from '../../datatable/datatable';
import Tabs, { TabContent, TabItem, TabPanel } from '../../tab/tab';
import ViewCrudPesquisa from './viewcrudpesquisa';
import { CrudPesquisaEvents, CrudUrl } from '../types';
import { crudUtils } from '../utils';
import { utilities } from '../../../utils/utilities';
import HTMLReactParser from 'html-react-parser';
import { ContentTabs, CustomSweetAlertProps, IComponentBaseProps, SweetAlertMessage } from '../../../types/types';
import { useCrudContext } from '../hook/useCrudContext';
import Api from '../../../services/api';
import { CrudContainer } from '../container/crudcontainer';
import { ColumnComponent, Sorter } from 'tabulator-tables';

export interface PesquisaProps extends IComponentBaseProps {
   crudContainer?: CrudContainer,
   events?: CrudPesquisaEvents,
   onDataChange?: (data: any) => void,
   searchOnly?: boolean,
   dataValue?: any
}

export interface CrudPesquisaDefaultProps extends IComponentBaseProps {
   autoLoad?: boolean,
   columns?: DataTableColumns,
   className?: string,
   consultationOnly?: boolean,
   heightGrid?: string | number | false | undefined,
   showAllButtons?: boolean,
   showNewButton?: boolean,
   showChangeButton?: boolean,
   showDeleteButton?: boolean,
   showViewButton?: boolean,
   showOnDemandButton?: boolean,
   containerButtons?: JSX.Element,
   containerMoreOptions?: JSX.Element,
   numberOfRecordsPerDemand?: number,
   fieldNameDetail?: string,
   displayTextDetail?: string,
   typePagination?: "page" | "limit-offset",
   useRowId?: boolean,
   prefixCss?: string,
   initialSort?: Array<Sorter>,
   headerSortElement?: string | ((column: ColumnComponent, dir: "desc" | "asc" | "none") => any),
   idHelp?: string,
   cardHeader?: JSX.Element,
   idGrid?: string,
   classNameGrid?: string,
   containerBottom?: (data: any | undefined) => JSX.Element,
   containerData?: (data: any | undefined, columns: DataTableColumns) => JSX.Element,
   onHelp?: () => void,
   titleOnHelp?: string
}

interface CrudPesquisaProps extends CrudPesquisaDefaultProps {
   ref?: React.Ref<CrudPesquisaRef>,
   columnsDetail?: DataTableColumns,
   events?: CrudPesquisaEvents,
   dataValueSearch?: any,
   ignoreDataSearch?: boolean,
   refreshOnDelete?: boolean,
   initializeData?: any,
   onSearch?: (id: number | string, where: string, page: number, limit: number, offset: number, data?: any) => Promise<Array<any>>,
   urlGetMount?: (url: string, id: number | string, where: string, page: number, limit: number, offset: number, data?: any) => string,
   urlDeleteMount?: (url: string, id: number | string, data?: any) => string,
   onDataChange?: (data: any) => void,
   onData?: (data: Array<any>) => void,
   onWhere?: (where: string, page?: number, limit?: number, offset?: number) => void,
   checkPermission?: (operation: 0 | 1 | 2 | 3) => Promise<void | boolean>,
   onClickNewButton?: () => void,
   onClickChangeButton?: (data: any) => void,
   onClickDeleteButton?: (data: any) => void,
   onClickViewButton?: (data: any) => void,
   onBeforeNew?: (data: any) => Promise<void | boolean>,
   onBeforeChange?: (data: any) => Promise<void | boolean>,
   onBeforeDelete?: (data: any) => Promise<void | boolean>,
   onBeforeView?: (data: any) => Promise<void | boolean>,
}

interface DataSearch {
   id: number | string | undefined;
   where: string;
   page: number,
   limit: number | undefined;
   offset: number;
   data?: any;
   isDemand: boolean
}

export type CrudPesquisaRef = {
   refresh: () => void,
   clearData: () => void,
   showSweetAlert: (sweetAlertProps: CustomSweetAlertProps | undefined) => void,
   withOutPermission: (operation: 0 | 1 | 2 | 3) => Promise<boolean>,
   insertData: (data: any) => void,
   updateData: (data: any) => void,
   deleteData: (data: any) => void
};

const CrudPesquisa: React.ForwardRefRenderFunction<CrudPesquisaRef, CrudPesquisaProps> = (props, ref: Ref<CrudPesquisaRef>) => {
   const { typePagination = 'limit-offset', numberOfRecordsPerDemand = 50, displayTextDetail, fieldNameDetail, columnsDetail, events,
      dataValueSearch, ignoreDataSearch, showOnDemandButton = true, autoLoad = false, refreshOnDelete, initializeData,
      onSearch, urlGetMount, urlDeleteMount, onDataChange, onData, onWhere, checkPermission,
      onClickNewButton, onClickChangeButton, onClickDeleteButton, onClickViewButton,
      onBeforeNew, onBeforeChange, onBeforeDelete, onBeforeView, ...CrudPesquisa } = props;
   const { crudState } = useCrudContext();
   const [loading, setLoading] = useState<boolean | undefined>();
   const [sweetAlert, setSweetAlert] = useState<SweetAlertMessage | undefined>();
   const [sweetAlertProps, setSweetAlertProps] = useState<CustomSweetAlertProps | undefined>();
   const [dataSearch, setDataSearch] = useState<DataSearch>({
      id: 0,
      where: ' ',
      page: 1,
      limit: numberOfRecordsPerDemand,
      offset: 0,
      data: undefined,
      isDemand: false
   });
   const [data, setData] = useState<Array<any>>([]);
   const [rowSelected, setRowSelected] = useState<any | undefined>();
   const crudUrl = useRef<CrudUrl>(events?.url!);
   const [addData, setAddData] = useState<any | undefined>();
   const [uptData, setUptData] = useState<any | undefined>();
   const [delData, setDelData] = useState<any | undefined>();

   const insertData = (data: any) => {
      setAddData(data);
   }
   const updateData = (data: any) => {
      setUptData(data);
   }
   const deleteData = (data: any) => {
      setDelData(data);
   }

   const withOutPermission = (operation: 0 | 1 | 2 | 3) => new Promise<boolean>((resolve) => {
      if (!checkPermission) {
         resolve(false);
         return;
      }

      checkPermission(operation).then(() => {
         resolve(false)
      }).catch(error => {
         resolve(true);
         setSweetAlertProps({
            props: {
               type: 'error',
               title: 'Atenção',
               onConfirm: () => {
                  setSweetAlertProps(undefined)
               }
            },
            msg: error,
         });
      })
   });

   const onNewButtonClick = async (): Promise<void> => {
      if (onClickNewButton) {
         onClickNewButton();
         return;
      }

      if (await withOutPermission(1))
         return;

      if (onBeforeNew && !await onBeforeNew(initializeData))
         return;

      if (events)
         events.onNewButton(initializeData);
   };

   const onChangeButtonClick = async (): Promise<void> => {
      if (!rowSelected) {
         setSweetAlert({
            type: 'error',
            title: 'Atenção',
            msg: 'Selecione um registro para edição!',
            onConfirm: onConfirm
         });
         return;
      }

      if (onClickChangeButton) {
         onClickChangeButton(rowSelected);
         return;
      }

      if (await withOutPermission(2))
         return;

      if (onBeforeChange && !await onBeforeChange(rowSelected))
         return;

      if (events)
         events.onChangeButton(rowSelected);
   };

   const onDeleteButtonClick = async (): Promise<void> => {
      if (!rowSelected) {
         setSweetAlert({
            type: 'error',
            title: 'Atenção',
            msg: 'Selecione um registro para exclusão!',
            onConfirm: onConfirm
         });
         return;
      }

      if (onClickDeleteButton) {
         onClickDeleteButton(rowSelected);
         return;
      }

      if (onBeforeDelete && !await onBeforeDelete(rowSelected))
         return;

      if (await withOutPermission(3))
         return;

      setSweetAlertProps({
         props: {
            warning: true,
            showCancel: true,
            confirmBtnText: "Sim, confirmo!",
            cancelBtnText: "Cancelar!",
            confirmBtnBsStyle: "danger",
            title: "Confirma exclusão desse registro?",
            onConfirm: () => { onConfirmCancelDelete(true) },
            onCancel: onConfirmCancelDelete,
            focusCancelBtn: true,
            show: true
         },
         msg: 'Não será possível recuperar esse registro após exclusão!'
      });
      // if (events)
      //    events.onDeleteButton(rowSelected);
   }

   const onViewButtonClick = async (): Promise<void> => {
      if (!rowSelected) {
         setSweetAlert({
            type: 'error',
            title: 'Atenção',
            msg: 'Selecione um registro para visualizar!',
            onConfirm: onConfirm
         });
         return;
      }

      if (onClickViewButton) {
         onClickViewButton(rowSelected);
         return;
      }

      if (onBeforeView && !await onBeforeView(rowSelected))
         return;

      if (events)
         events.onViewButton(rowSelected);
   }

   const onSearchView = (e: SearchEvent): void => {

      setDataSearch({
         id: e.id,
         where: ' ',
         page: 1,
         limit: numberOfRecordsPerDemand,
         offset: 0,
         data: e.data,
         isDemand: false
      });

   }

   const onDemand = () => {
      setDataSearch({
         id: dataSearch.id,
         where: dataSearch.where,
         page: dataSearch.page + 1,
         limit: numberOfRecordsPerDemand,
         offset: dataSearch.offset + (numberOfRecordsPerDemand ? numberOfRecordsPerDemand : 0),
         data: dataSearch.data,
         isDemand: true
      });
   }

   // const onRowSelect = (row: any) => {

   // }

   const internalUrlDeleteMount = (url: string, id: number | string, data: any): string => {

      if (urlDeleteMount)
         return urlDeleteMount(url, id, data);

      return `${url}/${id}`;
   }

   const internalUrlGetMount = (url: string, id: number | string = 0, where: string = ' ', page: number = 1, limit: number = 0, offset: number = 0, data: any = undefined): string => {
      if (urlGetMount)
         return urlGetMount(url, id, where, page, limit, offset, data);

      if (typePagination === "page" && String(id) === '0')
         return `${url}/${where}/${page}`;

      return `${url}/${id}/${where}/${limit}/${offset}`;
   }

   const onConfirm = () => {
      setSweetAlert(undefined);
   }

   const onConfirmCancelDelete = (del: boolean = false) => {
      try {

         if (del) {

            const id = crudUtils.findId(rowSelected, events?.columns!);
            let urlDelete = internalUrlDeleteMount(crudUrl.current.DELETE!, id!, rowSelected);

            if (!urlDelete)
               throw new Error("url delete is not defined");

            Api.getInstance().conn()?.delete(urlDelete).then(async response => {

               if (events)
                  events.onDeleteButton(rowSelected);

               setRowSelected(undefined);
               if (refreshOnDelete)
                  refresh();
               else
                  setDelData(rowSelected);
            }).catch(error => {
               console.log(error);
               let body = error.response.data;

               switch (error.response.status) {
                  case 403:
                     setSweetAlert({
                        type: 'warning',
                        title: 'Atenção',
                        msg: <span>{HTMLReactParser(body.error.replace(/(\r\n|\n|\r)/gm, "<br>"))}</span>,
                        onConfirm: onConfirm
                     });

                     break;
                  case 404:
                     setSweetAlert({
                        type: 'warning',
                        title: 'Atenção',
                        msg: `O ID ${id} não foi encontrado. É provável que o mesmo já foi excluído do sistema. Clique em Cancelar e refaça a consulta.`,
                        onConfirm: onConfirm
                     });

                     break;
                  case 405:
                     setSweetAlert({
                        type: 'error',
                        title: 'Atenção',
                        msg: `Ocorreu um erro e não foi possível gravar esse registro. M�todo ${urlDelete} inv�lido`,
                        onConfirm: onConfirm
                     });

                     break;
                  case 499:
                     let message = crudUtils.formarErrorListMessage(body.ResponseMessage.Error.Itens);

                     setSweetAlert({
                        type: 'error',
                        title: 'Atenção',
                        msg: `Ocorreram erros ao tentar gravar esse registro
                                   ${message}`,
                        onConfirm: onConfirm
                     });

                     break;
                  default:
                     setSweetAlert({
                        type: 'error',
                        title: 'Atenção',
                        msg: <span>Ocorreu um erro e não foi possível excluir esse registro<br />
                           Erro: {HTMLReactParser(body.error.replace(/(\r\n|\n|\r)/gm, "<br>"))!}</span>,
                        onConfirm: onConfirm
                     });
               }
            });
         }

         // setShowConfirmDelete(false);
         setSweetAlertProps(undefined)
      } catch (error: any) {
         setSweetAlert({
            type: 'error',
            title: 'Atenção',
            msg: error,
            onConfirm: onConfirm
         });
      }
   }

   const resolveResponseData = (responseData: any, isDemand: boolean) => {
      let newData: any[];

      if (Array.isArray(responseData)) {
         newData = responseData;
      } else if (Array.isArray(responseData?.data)) {
         newData = responseData.data;
      } else if (responseData && typeof responseData === "object") {
         newData = [responseData];
      } else {
         newData = [];
      }

      if (isDemand && data.length > 0) {
         newData = data.concat(newData);
      }

      setData(newData);
   }

   const resolveResponseError = (id: string | number, error: any) => {
      // console.log(error.message);
      if (!error?.response) {
         setSweetAlert({
            type: 'error',
            title: 'Erro de conexão',
            msg: 'Falha de conexão com o servidor. Verifique sua internet e tente novamente.',
            onConfirm: onConfirm
         });
         return;
      }

      let body = error.response.data;
      switch (error.response.status) {
         case 403:
            setSweetAlert({
               type: 'warning',
               title: 'Atenção',
               msg: <span>{HTMLReactParser(body.error.replace(/(\r\n|\n|\r)/gm, "<br>"))}</span>,
               onConfirm: onConfirm
            });

            break;
         case 404:
            setSweetAlert({
               type: 'warning',
               title: 'Atenção',
               msg: `O ID ${id} não foi encontrado. É provável que o mesmo já foi excluído do sistema. Entre em contato com nosso contato.`,
               onConfirm: onConfirm
            })

            break;

         case 405:
            setSweetAlert({
               type: 'error',
               title: 'Atenção',
               msg: `Ocorreu um erro e não foi possível gravar esse registro. Método inválido`,
               onConfirm: onConfirm
            });

            break;

         case 499:
            let message = utilities.formarErrorListMessage(body.ResponseMessage.Error.Itens);

            setSweetAlert({
               type: 'error',
               title: 'Atenção',
               msg: `Opps, ocorreram algum erros: ${message}`,
               onConfirm: onConfirm
            })

            break;
         default:
            setSweetAlert({
               type: 'error',
               title: 'Atenção',
               msg: `Opps, ocorreu um erro: ${body.error}`,
               onConfirm: onConfirm
            })
      }
   }

   const resolveFinally = () => {
      setLoading(false);
   }

   const search = (id: number | string = 0, where: string = ' ', page: number = 1, limit: number = 0, offset: number = 0, data: any = undefined, isDemand: boolean = false) => {
      setLoading(true);

      if (onSearch) {
         onSearch(id, where, page, limit, offset, data).then(response => {
            resolveResponseData(response, isDemand);
         }).catch(error => {
            resolveResponseError(id, error);
         }).finally(() => {
            resolveFinally();
         })
      } else {
         if (!crudUrl.current.GET)
            throw new Error("url get is not defined");
         let url: string = internalUrlGetMount(crudUrl.current.GET, id, where, page, limit, offset, data);

         // console.log(url)

         Api.getInstance().conn()?.get<any>(url).then(async response => {
            let body = await response.data;
            resolveResponseData(body, isDemand);
         }).catch(error => {
            resolveResponseError(id, error);
         }).finally(() => {
            resolveFinally();
         })
      }
   }

   const renderContainerDetail = (): JSX.Element => {
      let title = displayTextDetail !== '' ? displayTextDetail : 'Selecione um registro na listagem acima';

      let data: Array<any> = [];
      if (rowSelected && fieldNameDetail) {
         if (rowSelected[fieldNameDetail]) {
            data = rowSelected[fieldNameDetail];
         }
      }

      let tabs: ContentTabs = [];

      // this.addTabsContainerDetail(tabs);

      let renderTabs: Array<JSX.Element> = [];
      let renderTabPanels: Array<JSX.Element> = [];

      tabs.forEach(tab => {
         let id = tab.id ? tab.id : nanoid();

         renderTabs.push(
            <TabItem key={`tab-${id}`} tabPanelRef={`${id}`} selected={tab.selected}> {tab.title} </TabItem>
         );

         renderTabPanels.push(
            <TabPanel key={`tabpanel-${id}`} id={`${id}`} show={tab.selected}>
               {tab.content}
            </TabPanel>
         );
      });

      let idTabDetail: string = nanoid();
      return (
         <Fragment>
            {data.length > 0 &&
               <Card className='iq-card'>
                  <CardHeader className="iq-card-header p-2 border"  >
                     <Tabs className="nav nav-pills">
                        <TabItem className='nav-item' classNameLink='nav-link' tabPanelRef={idTabDetail} selected={true}> {title} </TabItem>
                        {renderTabs}
                     </Tabs>
                  </CardHeader>
                  <CardBody className='border iq-card-body'>
                     <TabContent className="tab-content">
                        <TabPanel className='tab-pane fade' show={true} id={idTabDetail}>
                           {columnsDetail ?
                              <DataTable
                                 columns={columnsDetail}
                                 data={data}
                                 options={{
                                    layout: 'fitDataFill',
                                    height: 200,
                                    selectable: false
                                 }}
                              /> :
                              'Property columnsDetail is not defined'
                           }
                        </TabPanel>
                        {renderTabPanels}
                     </TabContent>
                  </CardBody>
               </Card>
            }
         </Fragment>
      );
   }

   const refresh = () => {
      const _dataSearch = { ...dataSearch };
      setDataSearch(_dataSearch);
   }

   const showSweetAlert = (sweetAlertProps: CustomSweetAlertProps | undefined) => {
      let props: CustomSweetAlertProps | undefined = sweetAlertProps;
      if (sweetAlertProps && typeof sweetAlertProps.msg === 'string') {
         props = { ...sweetAlertProps, msg: <span>{HTMLReactParser(sweetAlertProps.msg?.replace(/(\r\n|\n|\r)/gm, "<br>"))}</span> }
      }
      setSweetAlertProps(props);
   }

   const clearData = () => {
      setData([]);
   }

   useImperativeHandle(ref, () => ({
      refresh, showSweetAlert, clearData, withOutPermission, insertData, updateData, deleteData
   }));

   useEffect(() => {
      setRowSelected(undefined);

      if (onWhere)
         onWhere(dataSearch.where, dataSearch.page, dataSearch.limit, dataSearch.offset);

      if (ignoreDataSearch) {
         search();
         return;
      }

      if (dataSearch.where !== ' ' || dataSearch.id || (dataSearch.data && Object.keys(dataSearch.data).length > 0)) {
         // if (dataSearch.data && Object.keys(dataSearch.data).length > 0)
         search(dataSearch.id, dataSearch.where, dataSearch.page, dataSearch.limit, dataSearch.offset, dataSearch.data, dataSearch.isDemand);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dataSearch])

   useEffect(() => {
      if (onDataChange)
         onDataChange(rowSelected);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [rowSelected])

   useEffect(() => {
      if (crudState.data) {
         switch (crudState.type) {

            case 'actInsert':
               setAddData(crudState.data);
               break;

            case 'actEdit':
               setUptData(crudState.data);
               refresh();
               break;

            default:
               break;
         }
      }
   }, [crudState.data])

   useEffect(() => {
      if (dataValueSearch) {
         setDataSearch({
            id: undefined,
            where: ' ',
            page: 1,
            limit: numberOfRecordsPerDemand,
            offset: 0,
            data: dataValueSearch,
            isDemand: false
         });
      }
   }, [dataValueSearch])

   useEffect(() => {
      if (onData)
         onData(data);
   }, [data])

   return (
      <Fragment>
         <ViewCrudPesquisa
            {...CrudPesquisa}
            typePagination={typePagination}
            autoLoad={autoLoad}
            showOnDemandButton={showOnDemandButton}
            columns={events?.columns ?? []}
            data={data}
            loading={loading}
            numberOfRecordsPerDemand={numberOfRecordsPerDemand}
            rowSelected={{ data: rowSelected, setData: setRowSelected }}
            containerDetail={renderContainerDetail()}
            onNewButtonClick={onNewButtonClick}
            onChangeButtonClick={onChangeButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
            onViewButtonClick={onViewButtonClick}
            onSearch={onSearchView}
            onDemand={onDemand}
            addData={addData}
            uptData={uptData}
            delData={delData}
         />
         {sweetAlert &&
            <SweetAlert
               type={sweetAlert.type}
               title={sweetAlert.title}
               onConfirm={() => {
                  if (sweetAlert.onConfirm)
                     sweetAlert.onConfirm();
               }}
               show={Boolean(sweetAlert.msg)}>
               {sweetAlert.msg}
            </SweetAlert>
         }
         {sweetAlertProps &&
            <SweetAlert
               {...sweetAlertProps.props}
            >
               <span>
                  {
                     typeof sweetAlertProps.msg === 'string' ?
                        HTMLReactParser(sweetAlertProps.msg.replace(/(\r\n|\n|\r)/gm, "<br>")) :
                        sweetAlertProps.msg
                  }
               </span>
            </SweetAlert>
         }
      </Fragment>
   );
};

export default forwardRef(CrudPesquisa);