import React, { Fragment, Ref, forwardRef, useImperativeHandle, useState } from 'react';

import './modal.css';
import { ModalLargeType } from './modal';

export type CustomModalRef = {
   open: () => void,
   close: () => void
};

interface CustomModalProps {
   children: React.ReactNode,
   className?: string,
   largeType?: ModalLargeType,
   showOverlay?: boolean
}

const CustomModal: React.ForwardRefRenderFunction<CustomModalRef, CustomModalProps> = (props, ref: Ref<CustomModalRef>) => {
   const { children, className = '', largeType = 'default', showOverlay = true } = props;
   const [display, setDisplay] = useState<'none' | 'block'>('none');

   const open = () => {
      setDisplay('block');
   }

   const close = () => {
      setDisplay('none');
   }

   useImperativeHandle(ref, () => ({
      open, close
   }));

   var modalSize: string = 'none';
   switch (largeType) {

      case 'small': modalSize = 'sm';
         break;
      case 'large': modalSize = 'lg';
         break;
      case 'extra-large': modalSize = 'xl';
         break;
      case 'fullscreen': modalSize = 'fullscreen';
         break;
      default:
         break;
   }

   return (
      <Fragment>
         <div className={`custom-modal fade ${className} ${display === 'block' ? 'show' : ''}`}
            style={{
               backgroundColor: showOverlay === true ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0)'
            }}
         >
            <div className={`custom-modal-dialog custom-modal-dialog-centered custom-modal-${modalSize}`}>
               <div className='custom-modal-content'>
                  {children}
               </div>
            </div>
         </div>
      </Fragment >
   );
}

export default forwardRef(CustomModal);