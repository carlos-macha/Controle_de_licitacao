import { param } from 'jquery';
import React from 'react';
import Card, { CardBody, CardFooter, CardHeader } from '../../card/card';
import Button from '../../form/form';
import { CrudManutencaoDefaultProps } from './crudmanutencao';

interface ViewCrudManutencaoProps extends CrudManutencaoDefaultProps {
   className?: string,
   viewOnly?: boolean,
   spinnerSave?: boolean,
   onSaveButtonClick?: () => void,
   onCancelButtonClick?: () => void,
}

const ViewCrudManutencao: React.FC<ViewCrudManutencaoProps> = (props) => {
   const { className, children, viewOnly, spinnerSave, showSaveButton = true, showCancelButton, showAllButtons, layout } = props;
   const { onSaveButtonClick, onCancelButtonClick } = props;

   return (
      <div className={className}>

         {layout === 'customized' ?
            children :
            <Card className="portal-crud-card">
               <CardBody>
                  {children}
               </CardBody>
               <CardFooter className="portal-crud-footer">
                  <div className="row row-cols-2 row-cols-md-1">
                     <div className="col-6 col-md-3 col-lg-3 mb-1">
                        <div className="btn-group">
                           {(!viewOnly || showAllButtons || showSaveButton) &&
                              <Button
                                 style={{ width: 120 }}
                                 caption="Gravar"
                                 classIcon="mdi mdi-check-bold"
                                 onClick={onSaveButtonClick}
                                 loading={spinnerSave}
                                 disabled={viewOnly}
                              />
                           }
                           {(showAllButtons || showCancelButton) &&
                              <Button
                                 style={{ width: 120 }}
                                 caption="Cancelar"
                                 classIcon="mdi mdi-window-close"
                                 onClick={onCancelButtonClick} />
                           }
                        </div>
                     </div>
                     <div className="col-6 col-md-3 col-lg-9 mb-1 d-flex flex-md-row-reverse" />
                  </div>
               </CardFooter>
            </Card>
         }
      </div>
   );
}

ViewCrudManutencao.defaultProps = {
   layout: 'inherited'
}

export default ViewCrudManutencao;