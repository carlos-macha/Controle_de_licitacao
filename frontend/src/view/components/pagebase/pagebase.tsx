import React from 'react';
import TemplatePageBase, { TemplatePageBaseProps } from '../../../base/template/pagebase/pagebase';

interface PageBaseProps extends Omit<TemplatePageBaseProps, 'errorCode'> {
   permission?: any,
   checkPermission?: (permission?: number | string) => Promise<boolean>
}

const PageBase: React.FC<PageBaseProps> = (props) => {
   const { children, ...attributes } = props;

   return (
      <TemplatePageBase


         {...attributes}
      >
         {children}
      </TemplatePageBase>
   );
}

export default PageBase;