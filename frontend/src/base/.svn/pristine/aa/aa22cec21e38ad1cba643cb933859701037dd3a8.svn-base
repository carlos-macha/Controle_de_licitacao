import React, { useEffect, useState } from 'react';
import Scrollbar from 'smooth-scrollbar';
import { utilities } from '../../../base/utils/utilities';
import { useMenuContext } from '../../../base/menu/hooks/useMenuContext';
import { Menu } from '../../menu/menu';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import './sidebar.css';
import Tippy from '@tippyjs/react';

interface TemplateSidebarProps {
   menu?: Menu<any>,
   imgLogo?: string,
   imgNameApp?: string,
   imgLogoBotton?: string,
   imgNameAppBotton?: string,
   isDark?: boolean,
   nameApp?: string | JSX.Element,
   nameAppBotton?: string,
   displayTextStyle?: 'truncate' | 'wrap'
}

const TemplateSidebar: React.FC<TemplateSidebarProps> = (props) => {
   const { menu, isDark, imgLogo, imgNameApp, imgLogoBotton, imgNameAppBotton, nameApp, nameAppBotton, displayTextStyle } = props;

   const [elMenu, setElMenu] = useState<Array<JSX.Element>>([]);
   const { itemMenu, dispatch } = useMenuContext();

   useEffect(() => {
      Scrollbar.init(document.querySelector('#sidebar-scrollbar')!);
   }, [])

   useEffect(() => {
      mountMenu();
   }, [itemMenu, menu])

   const mountMenu = () => {
      if (!menu)
         return;

      let displayStyle: string = '';
      switch (displayTextStyle) {
         case 'truncate': displayStyle = 'text-truncate'
            break;

         case 'wrap': displayStyle = 'text-wrap'
            break;

         default:
            break;
      }



      let elMenu: Array<JSX.Element> = [];
      let groups = menu.groups();
      groups.forEach((group, idx) => {
         let menuItem = menu.itens(group.name);

         if (!group.hidden && menuItem.length > 0)
            elMenu.push(
               <li key={`menu-group-${idx}`} className="iq-menu-title"><i className="ri-separator"></i><span>{group.name}</span></li>
            );

         let menuActive: string = '';

         let subMenu: Array<JSX.Element> = [];

         menuItem.forEach((item, idx) => {
            subMenu = [];
            if (!item.subMenu)
               menuActive = itemMenu.name === item.name ? 'active' : '';

            item.subMenu?.forEach(submenu => {
               if (itemMenu.name === submenu.name)
                  menuActive = 'active';

               subMenu.push(
                  <li key={`sub-menu-item-${submenu.name}-${idx}`} className={itemMenu.name === submenu.name ? 'active' : ''}>
                     <Tippy
                        content={submenu.tooltip}
                        allowHTML={true}
                        arrow={true}
                        placement='top'
                        animation='shift-away-subtle'
                        delay={[250, 250]}
                        touch={false}
                        disabled={!submenu.tooltip ? true : false}
                     >
                        <div>
                           <a
                              href='javascript:void();'
                              className="iq-waves-effect"
                              data-toggle={item.subMenu ? 'collapse' : ''}
                              aria-expanded={item.subMenu !== undefined}
                              onClick={() => {
                                 // console.log(window.innerWidth)
                                 if (!submenu.subMenu) {
                                    if (window.innerWidth <= 1299)
                                       document.getElementById('btn-menu-navbar')?.click();
                                    dispatch({
                                       type: 'open',
                                       name: submenu.name,
                                       title: submenu.label,
                                       data: submenu.data,
                                       origem: 'menu'
                                    })
                                 }
                              }}
                           >
                              <i className={submenu.classIcon} /><div className={displayStyle} style={{ width: 180 }} >{submenu.label}</div>
                           </a>
                        </div>
                     </Tippy>
                  </li>
               )

            })

            elMenu.push(
               <li key={`menu-item-${item.name}-${idx}`} className={menuActive}>
                  <Tippy
                     content={item.tooltip}
                     allowHTML={true}
                     arrow={true}
                     placement='top'
                     animation='shift-away-subtle'
                     delay={[250, 250]}
                     touch={false}
                     disabled={!item.tooltip ? true : false}
                  >
                     <div>
                        <a
                           href={item.subMenu ? `#sub-menu-item-${item.name}-${idx}` : 'javascript:void();'}
                           className="iq-waves-effect"
                           data-toggle={item.subMenu ? 'collapse' : ''}
                           aria-expanded={item.subMenu !== undefined}
                           onClick={() => {
                              if (!item.subMenu) {
                                 if (window.innerWidth <= 1299)
                                    document.getElementById('btn-menu-navbar')?.click();

                                 dispatch({
                                    type: 'open',
                                    name: item.name,
                                    title: item.label,
                                    data: item.data,
                                    origem: 'menu'
                                 })
                              }
                           }}
                        >
                           <i className={item.classIcon} />
                           <div className={displayStyle} style={{ width: 180 }} >{item.label}</div>
                           {subMenu.length > 0 && <i className="ri-arrow-right-s-line iq-arrow-right"></i>}
                        </a>
                        {subMenu.length > 0 &&
                           <ul id={`sub-menu-item-${item.name}-${idx}`} className="iq-submenu collapse show" data-parent="#iq-sidebar-toggle">
                              {subMenu}
                           </ul>
                        }
                     </div>
                  </Tippy>
               </li>
            )

         })
      });
      setElMenu(elMenu);
   }

   // useEffect(() => {
   //    mountMenu();
   // }, []);

   return (
      <div className="iq-sidebar">
         <div className="iq-sidebar-logo d-flex justify-content-between">
            <a href="javascript:void();">
               {imgLogo && <img src={`${utilities.baseURL()}images/${imgLogo}`} alt={`Logo ${nameApp}`} className="img-fluid" />}
               {imgNameApp ?
                  <img src={`${utilities.baseURL()}images/${imgNameApp}`} alt={`Logo ${nameApp}`} className="img-fluid ml-3" />
                  :
                  <span style={{ fontSize: 23 }}><div className='text-truncate' style={{ width: '170px' }}>{nameApp}</div></span>
               }
            </a>
            <div className="iq-menu-bt align-self-center">
               <div className="wrapper-menu">
                  <div className="line-menu half start"></div>
                  <div className="line-menu"></div>
                  <div className="line-menu half end"></div>
               </div>
            </div>
         </div>
         <div id="sidebar-scrollbar" className={imgLogoBotton && 'scrollbar-logo-bottom'}>
            <nav className="iq-sidebar-menu">
               <ul id="iq-sidebar-toggle" className="iq-menu">
                  {elMenu}
               </ul>
            </nav>
            <div className="p-3"></div>
         </div>
         <div className="iq-sidebar-logo d-flex justify-content-between custom-footer-sidebar p-2">
            <a href="javascript:void();">
               {imgLogoBotton && <img src={`${utilities.baseURL()}images/${imgLogoBotton}`} alt={`Logo ${nameAppBotton}`} style={{ height: 40 }} className='ml-1' />}
               {imgNameAppBotton ?
                  <img src={`${utilities.baseURL()}images/${imgNameAppBotton}`} alt={`Logo ${nameAppBotton}`} className="ml-2 mt-1 logo-bottom" style={{ height: 35 }} />
                  :
                  <span style={{ fontSize: 23 }}>{nameAppBotton}</span>
               }
            </a>
         </div>
      </div>
   );
}

export default TemplateSidebar;