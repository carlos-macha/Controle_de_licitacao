import React from 'react';
import './copyrightfooter.css';

interface CopyRightFooterProps {
   className?: string,
   projectName: string
}

const TemplateCopyRightFooter: React.FC<CopyRightFooterProps> = (props) => {
   const { className, projectName } = props;
   return (
      <div className={className}>
         <p className="mb-0 text-copyrightfooter">&copy; {new Date().getFullYear()} {projectName}. Criado com <i className="mdi mdi-heart text-danger"></i> pela <a target='_blank' href='http://www.commandperfect.com.br'>Command Perfect</a> </p>
      </div>
   );
}

TemplateCopyRightFooter.defaultProps = {
   className: 'text-center text-muted p-4'
}

export default TemplateCopyRightFooter;