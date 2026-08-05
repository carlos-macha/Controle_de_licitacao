import React from 'react';
import PageBase from '../components/pagebase/pagebase';
import MeuPerfilContainer from './meuperfilcontainer';
import CrudProvider from '../../base/components/crud/context/crudcontext';

interface MeuPerfilProps { }

const MeuPerfil: React.FC<MeuPerfilProps> = () => {
   return (
      <PageBase>
         <CrudProvider>
            <MeuPerfilContainer
               typeRender='maintenance'
            />
         </CrudProvider>
      </PageBase>
   );
}

export default MeuPerfil;