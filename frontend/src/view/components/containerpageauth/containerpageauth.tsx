import React, { Fragment } from 'react';
import CopyRightFooter from '../copyrightfooter/copyrightfooter';
import TemplateContainerPageAuth from '../../../base/template/containerpageauth/containerpageauth';

interface ContainerPageAuthProps { }

const ContainerPageAuth: React.FC<ContainerPageAuthProps> = (props) => {
   const { children } = props;
   return (
      <TemplateContainerPageAuth
         imgBanner='portal/Imagem-cpPortal-Login.webp'
      >
         <Fragment>
            {children}
            <CopyRightFooter />
         </Fragment>
      </TemplateContainerPageAuth>
   );
}

export default ContainerPageAuth;




// import React from 'react';
// import CopyRightFooter from '../copyrightfooter/copyrightfooter';
// import { utilities } from '../../../base/utils/utilities';

// interface ContainerPageAuthProps { }

// const ContainerPageAuth: React.FC<ContainerPageAuthProps> = (props) => {
//    const { children } = props;
//    return (
//       <section className="sign-in-page bg-white">
//          <div className="container-fluid p-0">
//             <div className="row no-gutters">
//                <div className="col-sm-6 align-self-center">
//                   {children}
//                   <CopyRightFooter />
//                </div>
//                <div className="col-sm-6 px-0">
//                   <img src={`${utilities.baseURL()}images/Banner-ControlDoc.webp`} alt="Login Banner" className="w-100 vh-100 login-banner" />
//                </div>
//             </div>
//          </div>
//       </section>
//    );
// }

// export default ContainerPageAuth;