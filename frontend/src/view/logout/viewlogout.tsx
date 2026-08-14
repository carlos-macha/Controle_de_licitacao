import React from 'react';
import ContainerPageAuth from '../components/containerpageauth/containerpageauth';
import { Link } from 'react-router-dom';
import { DataRoutesLogin } from '../../routes/dataroutes';

const ViewLogout: React.FC = () => {
   return (
      <ContainerPageAuth>
         <div className="sign-in-from">
            <h1 className="mb-0">Você foi desconectado</h1>
            <p className="text-muted font-size-15">Obrigado por usar o <span className="fw-semibold text-dark">cpLicitação</span></p>
            <div className="mt-4">
               <Link className='btn btn-primary w-100 iq-waves-effect waves-light' to={DataRoutesLogin.path}>Entrar</Link>
            </div>
         </div>
      </ContainerPageAuth>
   );
}

export default ViewLogout;