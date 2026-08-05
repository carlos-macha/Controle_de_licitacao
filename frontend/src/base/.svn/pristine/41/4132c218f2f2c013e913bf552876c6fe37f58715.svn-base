
import './crudcontainer.css';
import React, { Fragment } from 'react';
import { CrudManutencaoEvents, CrudPesquisaEvents, CrudUrl, typeRender } from '../types';
import { EnumCrudStateRecordType } from '../enums';
import { nanoid } from 'nanoid';
import Tabs, { TabContent, TabItem, TabPanel } from '../../tab/tab';
import Card, { CardBody, CardHeader } from '../../card/card';
import SweetAlert from 'react-bootstrap-sweetalert';
import { DataTableColumns } from '../../datatable/datatable';
import { crudUtils } from '../utils';
import { ContentTabs, CustomSweetAlertProps, IComponentBaseProps, RecordIdType, SweetAlertMessage } from '../../../types/types';
import HTMLReactParser from 'html-react-parser';
import TemplateLoading from '../../../template/loading/loading';
import Spinners from '../../spinners/spinners';

interface CrudContainerProps extends IComponentBaseProps {
   className?: string,
   searchOnly?: boolean
   onDataChange?: (data: any) => void,
   typeRender?: typeRender,
   dataValue?: any,
   params?: any
}

interface CrudContainerState {
   tabs: ContentTabs,
   indexTabActive: number,
   sweetAlert?: SweetAlertMessage,
   sweetAlertProps?: CustomSweetAlertProps,
   dataValue?: any,
   dataMaintenance?: any,
   loading?: boolean
}

export class CrudContainer extends React.Component<CrudContainerProps, CrudContainerState> {
   private crudPesquisaEvents: CrudPesquisaEvents;
   private crudManutencaoEvents: CrudManutencaoEvents;
   static defaultProps = {
      searchOnly: false,
      typeRender: 'crud',
      dataValue: undefined
   }

   constructor(props: CrudContainerProps) {
      super(props);

      this.crudPesquisaEvents = {
         onNewButton: this.onNewButton,
         onChangeButton: this.onChangeButton,
         onDeleteButton: this.onDeleteButton,
         onViewButton: this.onViewButton,
         url: this.crudUrl(),
         columns: this.columns()
      }

      this.crudManutencaoEvents = {
         onSaveButton: this.onSaveButton,
         onCancelButton: this.onCancelButton,
         columns: this.columns(),
         url: this.crudUrl(),
         state: EnumCrudStateRecordType.VISUALIZAR
      }

      this.state = {
         tabs: [],
         indexTabActive: -1,
         sweetAlert: undefined
      }
   }

   onNewButton = (data?: any): void => {
      this.crudManutencaoEvents.data = data ? data : {};
      this.crudManutencaoEvents.state = EnumCrudStateRecordType.INCLUIR;
      this.crudManutencaoEvents.url = this.crudUrl();
      this.crudManutencaoEvents.columns = this.columns();
      // console.log(this.crudManutencaoEvents)
      this.addTab('Novo', this.manutencao(this.crudManutencaoEvents));
   }

   onChangeButton = (data: any): void => {
      this.crudManutencaoEvents.data = data;
      this.crudManutencaoEvents.state = EnumCrudStateRecordType.ALTERAR;
      this.crudManutencaoEvents.url = this.crudUrl();
      this.crudManutencaoEvents.columns = this.columns();
      this.addTab('Alterar', this.manutencao(this.crudManutencaoEvents), crudUtils.findId(data, this.columns()!));
   }

   onDeleteButton = (data: any): void => {
      this.crudManutencaoEvents.state = EnumCrudStateRecordType.EXCLUIR;
      // console.log(data);
      // this.addTab('Alterar', this.manutencao());
   }

   onViewButton = (data: any): void => {
      this.crudManutencaoEvents.data = data;
      this.crudManutencaoEvents.state = EnumCrudStateRecordType.VISUALIZAR;
      this.addTab('Visualização', this.manutencao(this.crudManutencaoEvents), crudUtils.findId(data, this.columns()!));
   }

   onSaveButton = (data: any): void => {
      this.crudManutencaoEvents.data = data;
      this.crudManutencaoEvents.state = EnumCrudStateRecordType.PESQUISAR;
      this.delTab();
   }

   onCancelButton = (): void => {
      this.crudManutencaoEvents.state = EnumCrudStateRecordType.PESQUISAR;
      this.delTab();
   }

   columns = (): DataTableColumns | undefined => {
      return undefined;
   }

   crudUrl = (): CrudUrl | undefined => {
      return undefined;
   }

   onMount = async () => new Promise<void>((resolve, reject) => {
      resolve();
   });

   componentDidMount(): void {
      const { typeRender } = this.props;

      this.onMount().then(() => {
         this.crudPesquisaEvents.url = this.crudUrl();
         this.crudPesquisaEvents.columns = this.columns();

         if (typeRender === 'crud')
            this.addTab('Pesquisa', this.pesquisa(this.crudPesquisaEvents));
      })
   }

   componentDidUpdate(prevProps: Readonly<CrudContainerProps>, prevState: Readonly<CrudContainerState>, snapshot?: any): void {
      if (prevProps.dataValue !== this.props.dataValue) {
         this.setState({
            dataValue: this.props.dataValue
         })
      }     
   }


   pesquisa = (events: CrudPesquisaEvents): JSX.Element => {
      return <Fragment />
   }

   manutencao = (events: CrudManutencaoEvents): JSX.Element => {
      return <Fragment />
   }

   public events: any;
   public refreshSearch?: () => void;

   public addTab = (title: string, component: JSX.Element, recordId?: RecordIdType) => {
      const { tabs } = this.state;

      let idx = null;

      if (recordId) {
         tabs.forEach(tab => {
            if (tab.recordId === recordId) {
               idx = tab.idx;
            }
         });
      }

      if (idx !== null) {
         this.setTab(idx);
      } else {
         let _tabs = tabs.map(tab => {
            return { ...tab, selected: false, idx: tabs.indexOf(tab) }
         });

         idx = tabs.length;

         _tabs.push({
            id: `tab-${nanoid()}`,
            idx: idx,
            title: title,
            selected: true,
            content: component,
            recordId: recordId!,
            showClose: title !== 'Pesquisa'
         });

         this.setState({
            indexTabActive: idx,
            tabs: _tabs
         });

      }
   }

   private setTab = (index: number = -1, recordId?: RecordIdType) => {
      const { indexTabActive, tabs } = this.state;

      const idx = (index > -1 ? index : indexTabActive);
      const updateTabs = tabs.map(tab => {
         if (tab.idx === idx || (recordId && tab.recordId === recordId)) {
            return { ...tab, selected: true }
         }

         return { ...tab, selected: false }
      });

      this.setState({
         indexTabActive: idx,
         tabs: updateTabs
      });
   }

   private delTab = (index: number = -1, allOthers?: boolean) => {
      const { indexTabActive, tabs } = this.state;

      const idx = (index > -1 ? index : indexTabActive);

      var _tabs = tabs.filter((value, index, arr) => {
         if (allOthers) {
            return value.idx === idx;
         } else {
            return value.idx !== idx;
         }
      });

      let _tabsIdx = _tabs.map((aba, index) => {
         return { ...aba, idx: index, selected: index === 0 };
      });

      let _indexTabActive: number = 0;

      if (_tabsIdx.length > 1 && idx > 0) {
         _indexTabActive = idx - 1
      };

      this.setState({
         indexTabActive: _indexTabActive,
         tabs: _tabsIdx
      });
   }

   render() {
      const { tabs, sweetAlert, sweetAlertProps, loading } = this.state;
      const { typeRender } = this.props;

      const renderTabs: Array<JSX.Element> = [];
      const renderPanels: Array<JSX.Element> = [];

      tabs.forEach(tab => {

         renderTabs.push(
            <TabItem
               classNameLink='nav-link'
               key={tab.id}
               tabPanelRef={tab.id!}
               selected={tab.selected}
               onClick={() => this.setTab(tab.idx)}
               onClose={() => {
                  this.delTab(tab.idx);
               }}
               showClose={tab.showClose}>
               {tab.title}
            </TabItem>
         );

         renderPanels.push(
            <TabPanel key={tab.id} className="tab-pane fade" id={tab.id} show={tab.selected}>
               {tab.content}
            </TabPanel >
         );

      });

      if (typeRender === 'search' || typeRender === 'crud') {
         this.crudPesquisaEvents.url = this.crudUrl();
         this.crudPesquisaEvents.columns = this.columns();
      }

      if (typeRender === 'maintenance') {
         this.crudManutencaoEvents.url = this.crudUrl();
         this.crudManutencaoEvents.columns = this.columns();
         if (this.state.dataMaintenance)
            this.crudManutencaoEvents.data = this.state.dataMaintenance;
      }

      if (loading) {
         return (
            <div className='crudcontainer-loader d-flex align-items-center justify-content-center'>
               <Spinners loading size={70} />
            </div>
         )
      }

      return (
         <Fragment>
            {typeRender === 'crud' &&
               <Card className="card-primary card-outline card-outline-tabs">
                  <CardHeader className="p-0 border-bottom-0">
                     <Tabs className="nav nav-tabs mb-0" role="tablist">
                        {renderTabs}
                     </Tabs>
                  </CardHeader>
                  <CardBody className="p-0">
                     <TabContent className="tab-content">
                        {renderPanels}
                     </TabContent>
                  </CardBody>
               </Card>
            }

            {typeRender === 'search' &&
               this.pesquisa(this.crudPesquisaEvents)
            }

            {typeRender === 'maintenance' &&
               this.manutencao(this.crudManutencaoEvents)
            }

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
   }
}