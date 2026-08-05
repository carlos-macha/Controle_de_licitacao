import React, { Fragment, useEffect, useState } from 'react';
import './App.css'
import BrowserRoutes from './routes/routes'
import { AuthProvider } from './context/authcontext';
import ModalProvider from './context/modalcontext';
import { useSweetAlertContext } from './base/hooks/useSweetAlertContext';
import SweetAlert from 'react-bootstrap-sweetalert';
import HTMLReactParser from 'html-react-parser';
import Api from './base/services/api';
import { storageGetWSHost, storageGetWSTimeout } from './utils/storage';
import TemplateLoading from './base/template/loading/loading';


const App: React.FC = () => {

   const { sweetAlertState } = useSweetAlertContext();
   const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
      setLoading(true);
      if (!Api.getInstance().conn()) {
         Api.getInstance().create(
            storageGetWSHost(),
            storageGetWSTimeout()
         );
      }
      Api.getInstance().authp(storageGetWSHost(), storageGetWSHost()).finally(() => {
         setLoading(false);
      });
   }, []);

   if (loading)
      return <TemplateLoading />

   return (
      <Fragment>
         <AuthProvider>
            <ModalProvider>
               <BrowserRoutes />
            </ModalProvider>
         </AuthProvider>
         {sweetAlertState.props &&
            <SweetAlert
               {...sweetAlertState.props}
            >
               <span>
                  {
                     typeof sweetAlertState.msg === 'string' ?
                        HTMLReactParser(sweetAlertState.msg.replace(/(\r\n|\n|\r)/gm, "<br>")) :
                        sweetAlertState.msg
                  }
               </span>
            </SweetAlert>
         }
      </Fragment>
   )
}

export default App;


// function App() {
//    return (
//       <BrowserRoutes />
//    )
// }

// export default App
