import React, { Fragment } from 'react';
import MenuProvider from '../../../base/menu/context/menucontext';
import Footer from '../footer/footer';
import Sidebar from '../sidebar/sidebar';
import Wrapper from '../wrapper/wrapper';
import ContainerModals from '../containermodals/containermodals';
import Navbar from '../navbar/navbar';
import TabPage from '../tabPage/tabpage';
import { MenuItemResultadosLicitacao } from '../menu/menu';

interface PageProps { }

const Page: React.FC<PageProps> = (props) => {

   const { children } = props;

   return (
      <Fragment>
         <MenuProvider
         itemMenu={{
               type: 'open',
               name: 'resultadoslicitacao',
               title: MenuItemResultadosLicitacao.label
            }}>
            <Wrapper>
               <Sidebar />
               <Navbar />
               <TabPage>
                  {children}
               </TabPage>
            </Wrapper>
            <Footer />
            <ContainerModals />
         </MenuProvider>
      </Fragment>
   );
}

export default Page;