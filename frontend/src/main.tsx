import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import SweetAlertProvider from './base/context/sweetalertcontext';
import { NetworkStatusProvider } from './base/context/networkstatuscontext';

ReactDOM.render(
   <React.StrictMode>
      <SweetAlertProvider>
         <NetworkStatusProvider>
            <App />
         </NetworkStatusProvider>
      </SweetAlertProvider>
   </React.StrictMode>,
   document.getElementById('root')
);
