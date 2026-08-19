import React, { useEffect, useState } from 'react';
import Card, { CardBody, CardFooter, CardHeader } from '../../card/card';
import DataSearch, { SearchEvent } from '../../datasearch/datasearch';
import DataTable, { DataTableColumns } from '../../datatable/datatable';
import Button from '../../form/form';
import { CrudPesquisaDefaultProps } from './crudpesquisa';
import { InputDataValue } from '../../../types/types';
import Scrollbar from 'smooth-scrollbar';
import './viewcrudpesquisa.css';
import { DropdownButton, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Tippy from '@tippyjs/react';

interface ViewCrudPesquisaProps extends CrudPesquisaDefaultProps {
   columns: DataTableColumns,
   data: Array<any>,
   loading?: boolean,
   containerDetail: JSX.Element,
   rowSelected?: InputDataValue<any>,
   addData?: any,
   uptData?: any,
   delData?: any,
   onNewButtonClick?: () => void,
   onChangeButtonClick?: () => void,
   onDeleteButtonClick?: () => void,
   onViewButtonClick?: () => void,
   onSearch: (e: SearchEvent) => void,
   onDemand: () => void
}

const ViewCrudPesquisa: React.FC<ViewCrudPesquisaProps> = (props) => {

   const { className, consultationOnly, showAllButtons, showNewButton, showChangeButton, showDeleteButton, showViewButton, showOnDemandButton,
      containerDetail, containerButtons, containerMoreOptions, columns, data, autoLoad, loading, cardHeader, idGrid, classNameGrid,
      numberOfRecordsPerDemand, heightGrid, initialSort, headerSortElement, rowSelected, addData, delData, uptData, useRowId, prefixCss, prefixId, idHelp } = props;
   const { onChangeButtonClick, onDeleteButtonClick, onNewButtonClick, onViewButtonClick, onSearch, onDemand, containerBottom, containerData,
      onHelp, titleOnHelp } = props;
   const [showSearch, setShowSearch] = useState(false);

   useEffect(() => {
      let el: HTMLElement | null = document.querySelector('.buttons-scrollbar');
      if (el !== null)
         Scrollbar.init(el);
   }, [])

   let _prefixCSS: string = `view-crud-pesquisa`;
   if (prefixCss)
      _prefixCSS = `${_prefixCSS}-${prefixCss}`;

   return (
      <div className={`${className} ${_prefixCSS}`}>
         <Card className="card-default portal-crud-card iq-card mb-0">
            <CardHeader className="pt-0 border-bottom-0">
               {cardHeader}
            </CardHeader>
            <CardBody className='iq-card-body'>
               <div className="row mb-3">
                  <div className={onHelp !== undefined ? 'col-11' : 'col-12'}>
                     {containerMoreOptions &&
                        <div className="float-left">
                           <Tippy
                              content='Mais opções'
                              allowHTML={true}
                              arrow={true}
                              placement='top-start'
                              animation='shift-away-subtle'
                              delay={[250, 250]}
                              touch={false}
                           >
                              <DropdownButton
                                 title={<i className='mdi mdi-dots-vertical' />}
                                 className='btn nav-btn btn-options-dropdown'
                                 variant=''
                              >
                                 {containerMoreOptions}
                              </DropdownButton>
                           </Tippy>
                        </div>
                     }
                     <div className="search-container">
                        <div className="d-flex justify-content-end mb-2">
                           <Button
                              classIcon={showSearch ? "mdi mdi-chevron-up" : "mdi mdi-chevron-down"}
                              caption={showSearch ? "Ocultar pesquisa" : "Mostrar pesquisa"}
                              onClick={() => setShowSearch(!showSearch)}
                           />
                        </div>

                        <div className={`search-content ${showSearch ? 'show' : ''}`}>
                           <DataSearch
                              prefixId={prefixId}
                              autoLoad={autoLoad}
                              loading={loading}
                              columns={columns}
                              onSearch={onSearch}
                           />
                        </div>
                     </div>
                  </div>
                  {onHelp &&
                     <div className='col-1'>
                        <div className='float-right'>
                           <Button
                              id={prefixId && `btn-data-help-${prefixId}`}
                              style={{ height: 45 }}
                              className='btn btn-primary btn-icon mr-0'
                              classIcon="mdi mdi-help"
                              onClick={onHelp}
                              data-toggle="modal"
                              data-target={`#${idHelp}`}
                              title={titleOnHelp || 'Ajuda'}
                              overlayProps={{
                                 placement: "top"
                              }}
                           />
                        </div>
                     </div>
                  }
               </div>
               {!consultationOnly && (showAllButtons || showNewButton || showChangeButton || showDeleteButton || showViewButton || containerButtons) &&
                  <div className="row mb-3">
                     <div className="col-12 buttons-scrollbar d-flex justify-content-end">
                        <div className="btn-group">
                           {(showNewButton || showAllButtons) &&
                              <Button
                                 style={{ width: 100 }}
                                 caption="Novo"
                                 classIcon="mdi mdi-plus"
                                 onClick={onNewButtonClick} />}
                           {(showChangeButton || showAllButtons) &&
                              <Button
                                 style={{ width: 100 }}
                                 caption="Alterar"
                                 classIcon="mdi mdi-file-edit-outline"
                                 onClick={onChangeButtonClick} />}
                           {(showDeleteButton || showAllButtons) &&
                              <Button
                                 style={{ width: 100 }}
                                 caption="Excluir"
                                 classIcon="mdi mdi-trash-can-outline"
                                 onClick={onDeleteButtonClick} />}
                           {(showViewButton || showAllButtons) &&
                              <Button
                                 style={{ width: 130 }}
                                 caption="Visualizar"
                                 classIcon="mdi mdi-eye-outline"
                                 onClick={onViewButtonClick} />}
                           {containerButtons}
                        </div>
                     </div>
                  </div>
               }
               <div className="row">
                  <div className="col-12">
                     {containerData ? containerData(data, columns) :
                        <DataTable
                           id={idGrid}
                           className={classNameGrid}
                           columns={columns}
                           data={data}
                           options={{
                              layout: 'fitDataFill',
                              height: heightGrid ? heightGrid : 300,
                              selectable: 1,
                              persistence: prefixId ? {
                                 sort: true,
                                 filter: true,
                                 columns: true,
                              } : undefined,
                              persistenceID: prefixId ? `DataTablePersistence-${prefixId}` : undefined,
                              columnHeaderSortMulti: true,
                              initialSort,
                              headerSortElement: headerSortElement ? headerSortElement : (column, dir) => {
                                 switch (dir) {
                                    case "asc":
                                       return "<div class='tabulator-arrow'></div>";
                                    case "desc":
                                       return "<div class='tabulator-arrow'></div>";
                                    default:
                                       return "<div class='tabulator-arrow'></div>";
                                 }
                              }
                           }}
                           captions={{
                              btnOnDemand: `+ ${numberOfRecordsPerDemand}`
                           }}
                           showOnDemandButton={showOnDemandButton}
                           onDemand={numberOfRecordsPerDemand && numberOfRecordsPerDemand > 0 ? onDemand : undefined}
                           onRowClick={row => { rowSelected?.setData(row) }}
                           addData={addData}
                           uptData={uptData}
                           delData={delData}
                           useRowId={useRowId}
                        />
                     }
                  </div>
               </div>
               <div className="row">
                  <div className="col-12">
                     {containerDetail}
                  </div>
               </div>
               <div className="row">
                  <div className="col-12">
                     {containerBottom && containerBottom(rowSelected?.data)}
                  </div>
               </div>
            </CardBody>
         </Card>
      </div>
   );
}

ViewCrudPesquisa.defaultProps = {
   numberOfRecordsPerDemand: 15,
   showOnDemandButton: true,
   autoLoad: false,
   typePagination: "limit-offset"
}

export default ViewCrudPesquisa;