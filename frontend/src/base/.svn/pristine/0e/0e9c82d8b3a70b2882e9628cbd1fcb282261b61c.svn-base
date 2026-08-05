import React, { Fragment } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalLargeType } from '../../components/modal/modal';

interface TemplateHelpModalProps {
   id?: string,
   largeType?: ModalLargeType,
   body?: JSX.Element,
   title?: string
}

const TemplateHelpModal: React.FC<TemplateHelpModalProps> = (props) => {
   const { body, largeType, title, id } = props;
   return (
      <Fragment>
         <Modal id={id} largeType={largeType}>
            <ModalHeader
               showCloseTools={true}
               title={title}
            />
            <ModalBody className="p-0">
               {body}
            </ModalBody>
            <ModalFooter showCloseBtn={true} />
         </Modal>
      </Fragment>
   );
}

TemplateHelpModal.defaultProps = {
   largeType: 'large'
}

export default TemplateHelpModal;