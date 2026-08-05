import React from 'react';
import { menu } from '../menu/menu';
import { useAuthContext } from '../../../hooks/useAuthContext';
import TemplateSidebar from '../../../base/template/sidebar/sidebar';

interface SidebarProps { }

const Sidebar: React.FC<SidebarProps> = (props) => {
   const { authState } = useAuthContext();
   return (
      <TemplateSidebar
         isDark={authState.isDark}
         // imgLogo=''
         // imgNameApp=''      
         menu={menu}
         nameApp='cpLicitação'
      />
   );
}

export default Sidebar;