import React from 'react';

interface TemplateWrapperProps {
   className?: string
}

const TemplateWrapper: React.FC<TemplateWrapperProps> = (props) => {
   const { children, className } = props;
   return <div className={`wrapper ${className}`}>
      {children}
   </div>;
}

TemplateWrapper.defaultProps = {
   className: ''
}

export default TemplateWrapper;