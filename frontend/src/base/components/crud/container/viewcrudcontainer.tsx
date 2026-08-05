import React, { Fragment } from 'react';
import Card, { CardBody, CardHeader } from '../../card/card';
import Tabs, { TabContent } from '../../tab/tab';

interface ViewCrudContainerProps {
   renderTabs: Array<JSX.Element>,
   renderPanels: Array<JSX.Element>,
}

const ViewCrudContainer: React.FC<ViewCrudContainerProps> = (props) => {
   const { renderTabs, renderPanels } = props;
   return (
      <Fragment>
         <Card className="card-primary card-outline card-outline-tabs">
            <CardHeader className="p-0 border-bottom-0">
               <Tabs className="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
                  {renderTabs}
               </Tabs>
            </CardHeader>
            <CardBody className="portal-crud-card-body">
               <TabContent className="tab-content" id="custom-tabs-four-tabContent">
                  {renderPanels}
               </TabContent>
            </CardBody>
         </Card>
      </Fragment>
   );
}

export default ViewCrudContainer;