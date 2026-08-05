import React from 'react';
import './alert.css';

export type AlertTypes = 'danger' | 'info' | 'warning' | 'success';

interface AlertProps {
   type: AlertTypes,
   title?: string,
   message: string,
   onClickClose?: (e?: any) => void
}

interface AlertState {
   icon: string,
   css: string
}

class Alert extends React.Component<AlertProps, AlertState> {
   constructor(props: AlertProps) {
      super(props);

      this.state = {
         icon: "",
         css: ""
      }
   }

   componentDidMount() {

      const { type } = this.props;

      switch (type) {
         case 'danger':
            this.setState(
               {
                  icon: "mdi mdi-close-octagon",
                  css: "alert alert-danger alert-dismissible mt-3"
               }
            );
            break;
         case 'info':
            this.setState(
               {
                  icon: "mdi mdi-information",
                  css: "alert alert-info alert-dismissible mt-3"
               }
            );
            break;
         case 'warning':
            this.setState(
               {
                  icon: "mdi mdi-exclamation",
                  css: "alert alert-warning alert-dismissible mt-3"
               }
            );
            break;
         case 'success':
            this.setState(
               {
                  icon: "mdi mdi-check-circle",
                  css: "alert alert-success alert-dismissible mt-3"
               }
            );
            break;
         default: console.log(`Sorry, we are out of ${type}.`);
      }
   }

   render() {

      const { css, icon } = this.state;
      const { onClickClose, title, message } = this.props;

      return (
         <div className={css} role="alert">
            <button onClick={onClickClose} type="button" className="close text-muted" aria-hidden="true">×</button>
            <div className="iq-alert-icon">
               <i className={icon}></i>
            </div>
            <div className="iq-alert-text">
               {title && <h4 className="text-muted">{title}</h4>}
               {message}
            </div>
         </div>
      );
   }
}

export default Alert;