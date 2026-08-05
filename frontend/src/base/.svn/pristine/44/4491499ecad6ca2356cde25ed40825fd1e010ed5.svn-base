import React from 'react';
import { utilities } from '../../../base/utils/utilities';

interface ContainerPageAuthProps {
   imgBanner?: string
}

const TemplateContainerPageAuth: React.FC<ContainerPageAuthProps> = (props) => {
   const { imgBanner, children } = props;
   return (
      <section className="sign-in-page bg-white">
         <div className="container-fluid p-0">
            <div className="row no-gutters">
               <div className={`col-sm-${imgBanner ? '6' : '12'} align-self-center`}>
                  {children}
               </div>
               {imgBanner &&
                  <div className="col-sm-6 px-0">
                     <img src={`${utilities.baseURL()}images/${imgBanner}`} alt="Login Banner" className="w-100 vh-100 login-banner" />
                  </div>
               }
            </div>
         </div>
      </section>
   );
}

export default TemplateContainerPageAuth;