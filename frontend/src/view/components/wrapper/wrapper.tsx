import React from 'react';
import TemplateWrapper from '../../../base/template/wrapper/wrapper';

interface WrapperProps { }

const Wrapper: React.FC<WrapperProps> = (props) => {
   const { children } = props;
   return <TemplateWrapper>{children}</TemplateWrapper>;
}

export default Wrapper;