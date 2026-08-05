import React from 'react';

export declare type ModalLargeType = "default" | "small" | "large" | "extra-large" | "fullscreen";

interface ModalComuns {
   className?: string
}

interface ModalProps extends ModalComuns {
   id: string,
   largeType?: ModalLargeType,
   scrollable?: boolean
}

export class Modal extends React.Component<ModalProps, {}> {
   static defaultProps = {
      className: "",
      id: "",
      largeType: "default"
   }

   render() {

      const { className, id, children, largeType, scrollable } = this.props;

      let _classNameLargeType: string = "";
      let _classNameScrollable: string = "";
      if (scrollable) {
         _classNameScrollable = 'modal-dialog-scrollable';
      }

      switch (largeType) {
         case "small": _classNameLargeType = "modal-sm";
            break;

         case "large": _classNameLargeType = "modal-lg";
            break;

         case "extra-large": _classNameLargeType = "modal-xl";
            break;

         case "fullscreen": _classNameLargeType = "modal-fullscreen";
            break;

         default:
            break;
      }

      return (
         <div className={`modal fade ${className}`} id={id} data-backdrop="static" data-keyboard="false" tabIndex={-1}>
            <div className={`modal-dialog modal-dialog-centered ${_classNameScrollable} ${_classNameLargeType}`}>
               <div className="modal-content">
                  {children}
               </div>
            </div>
         </div>
      );
   }
}

interface ModalHeaderProps extends ModalComuns {
   title?: string,
   showCloseTools?: boolean,
   openBeforeClose?: string
}

export class ModalHeader extends React.Component<ModalHeaderProps, {}> {
   static defaultProps = {
      className: "",
      title: "",
      showCloseTools: false
   }

   render() {

      const { className, children, title, showCloseTools, openBeforeClose } = this.props;

      return (
         <div className={`modal-header ${className}`}>
            {title !== '' ? <h4 className="modal-title">{title}</h4> : null}
            {children}
            {
               showCloseTools ?
                  <button
                     type="button"
                     className="close"
                     data-dismiss="modal"
                     aria-label="Close"
                     data-target={openBeforeClose}
                     data-toggle={openBeforeClose !== undefined ? "modal" : ""}
                  >
                     <span aria-hidden="true">&times;</span>
                  </button> :
                  null
            }

         </div>
      );
   }
}

interface ModalBodyProps extends ModalComuns {
}

export class ModalBody extends React.Component<ModalBodyProps, {}> {
   static defaultProps = {
      className: ""
   }

   render() {

      const { className, children } = this.props;

      return (
         <div className={`modal-body ${className}`}>
            {children}
         </div>
      );
   }
}

interface ModalFooterProps extends ModalComuns {
   showCloseBtn?: boolean,
   onCloseBtn?: () => any | undefined,
   captionCloseBtn?: string,
   openBeforeClose?: string,
   idBtnClose?: string
}

export class ModalFooter extends React.Component<ModalFooterProps, {}> {
   static defaultProps = {
      className: "",
      showCloseBtn: false,
      onCloseBtn: null,
      captionCloseBtn: "Fechar",
      openBeforeClose: ""
   }

   render() {

      const { className, children, showCloseBtn, captionCloseBtn, onCloseBtn, openBeforeClose, idBtnClose } = this.props;

      let _className: string = "";

      if (showCloseBtn) {
         _className = 'justify-content-between';
      }

      return (
         <div className={`modal-footer ${_className} ${className}`}>
            {
               showCloseBtn &&
               <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  data-target={openBeforeClose}
                  data-toggle={openBeforeClose !== undefined ? "modal" : ""}
                  onClick={() => {
                     if (onCloseBtn !== null && onCloseBtn !== undefined) {
                        onCloseBtn();
                     }
                  }}
                  id={idBtnClose}
               >
                  <i className='mdi mdi-window-close' />
                  {captionCloseBtn}
               </button>
            }
            {children}
         </div>
      );
   }
}