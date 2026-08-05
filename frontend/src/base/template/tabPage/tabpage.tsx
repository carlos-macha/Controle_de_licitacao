import React, { useEffect, useState, Ref, forwardRef, useImperativeHandle } from 'react';
import './tabpage.css';
import $ from 'jquery';
import { nanoid } from 'nanoid';
import Tabs, { TabContent, TabItem, TabPanel } from '../../../base/components/tab/tab';
import { useMenuContext } from '../../menu/hooks/useMenuContext';
import { ContentTabs, Tab } from '../../types/types';

interface TemplateTabPageProps {
   renderPage: (name: any, data?: any) => JSX.Element,
   checkPage?: (name: any, title: string, data?: any, origem?: string) => boolean,
   hideTabs?: boolean,
   initTabs?: ContentTabs
};

export type TemplateTabPageRef = {
   findTab: (name: string) => Tab | undefined,
   delAba: (index: number) => void,
   updateTab: (index: number, selected?: boolean, title?: string, recordId?: string) => void,
   newTab: (title: string, content: JSX.Element, recordId?: string, origem?: string, config?: Tab) => void,
   createTab: (title: string, content: JSX.Element, recordId?: string, origem?: string, abas?: ContentTabs, config?: Tab) => void,
   tabs: ContentTabs,
   setTabs: React.Dispatch<React.SetStateAction<ContentTabs>>
};

// const TemplateTabPage: React.FC<TemplateTabPageProps> = (props) => {

const TemplateTabPage: React.ForwardRefRenderFunction<TemplateTabPageRef, TemplateTabPageProps> = (props, ref: Ref<TemplateTabPageRef>) => {

   const { renderPage, hideTabs, checkPage, initTabs } = props;
   const [tabs, setTabs] = useState<ContentTabs>(initTabs || []);
   const [indexTabActive, setIndexTabActive] = useState<number>(-1);
   const { itemMenu, dispatch } = useMenuContext();
   const [renderTabs, setRenderTabs] = useState<Array<JSX.Element>>([]);
   const [renderPanels, setRenderPanels] = useState<Array<JSX.Element>>([]);

   var scrollBehaviorSwap: boolean = false;
   var mousedown: boolean = false;
   var mousedownInterval: NodeJS.Timeout | null = null;
   var iconMaximize: string = 'fa-expand';
   var iconMinimize: string = 'fa-compress';
   var TABPAGE_SELECTOR_DATA_TOGGLE$1 = '[data-widget="tabpage"]';
   var TABPAGE_SELECTOR_TAB_NAVBAR_NAV = TABPAGE_SELECTOR_DATA_TOGGLE$1 + ".content-tabpage .navbar-nav";
   var TABPAGE_SELECTOR_DATA_TOGGLE_SCROLL_LEFT = '[data-widget="tabpage-scrollleft"]';
   var TABPAGE_SELECTOR_DATA_TOGGLE_SCROLL_RIGHT = '[data-widget="tabpage-scrollright"]';
   var CLASS_NAME_FULLSCREEN_MODE = 'iframe-mode-fullscreen';
   var SELECTOR_DATA_TOGGLE_FULLSCREEN = '[data-widget="iframe-fullscreen"]';

   var toggleFullscreen = () => {
      if ($('body').hasClass(CLASS_NAME_FULLSCREEN_MODE)) {
         $(SELECTOR_DATA_TOGGLE_FULLSCREEN + " i").removeClass(iconMinimize).addClass(iconMaximize);
         $('body').removeClass(CLASS_NAME_FULLSCREEN_MODE);
         // $('body').addClass(CLASS_NAME_LAYOUT_NAVBAR_FIXED);
         //   $(SELECTOR_TAB_EMPTY + ", " + SELECTOR_TAB_LOADING).height('auto');

         // $(PORTAL_SELECTOR_CONTENT_WRAPPER).height('auto');
         // $(PORTAL_SELECTOR_CONTENT_IFRAME).height('auto');

      } else {
         $(SELECTOR_DATA_TOGGLE_FULLSCREEN + " i").removeClass(iconMaximize).addClass(iconMinimize);
         $('body').addClass(CLASS_NAME_FULLSCREEN_MODE);
         // $('body').removeClass(CLASS_NAME_LAYOUT_NAVBAR_FIXED);
      }

      $(window).trigger('resize');
   };

   var navScroll = (offset: any) => {
      var leftPos = $(TABPAGE_SELECTOR_TAB_NAVBAR_NAV).scrollLeft();
      $(TABPAGE_SELECTOR_TAB_NAVBAR_NAV).animate({
         scrollLeft: leftPos + offset
      }, 250, 'linear');
   };

   const createTab = (title: string, content: JSX.Element, recordId?: string, origem?: string, abas?: ContentTabs, config?: Tab) => {
      const _tabs = abas?.map(tab => {
         return { ...tab, selected: false, idx: abas.indexOf(tab) }
      });

      let idx = _tabs!.length;

      const newTabs = [..._tabs!, config || {
         id: `tab-${nanoid()}`,
         idx: idx,
         title: title,
         selected: true,
         content: content,
         recordId: recordId!,
         showClose: true,
         origem: origem
      }];

      setTabs(newTabs);
      setIndexTabActive(idx);
   }

   const newTab = (title: string, content: JSX.Element, recordId?: string, origem?: string, config?: Tab) => {
      // console.log(title, context, recordId, origem)

      if (hideTabs)
         return;

      let idx = null;

      if (recordId) {
         tabs.forEach(tab => {
            if (tab.recordId === recordId) {
               idx = tab.idx;
            }
         });
      }

      if (idx !== null) {
         setTab(idx);
      } else {
         createTab(title, content, recordId, origem, tabs, config);
         // const _tabs = tabs.map(tab => {
         //    return { ...tab, selected: false, idx: tabs.indexOf(tab) }
         // });

         // idx = tabs.length;

         // const newTabs = [..._tabs, {
         //    id: `tab-${nanoid()}`,
         //    idx: idx,
         //    title: title,
         //    selected: true,
         //    content: content,
         //    recordId: recordId!,
         //    showClose: true,
         //    origem: origem
         // }];

         // setTabs(newTabs);
         // setIndexTabActive(idx);
      }
   }

   const setTab = (index = -1, recordId: string = '') => {
      if (hideTabs)
         return;

      const idx = (index > -1 ? index : indexTabActive);
      const updateTabs = tabs.map(tab => {
         if (tab.idx === idx || (recordId !== null && tab.recordId === recordId)) {
            return { ...tab, selected: true }
         }

         return { ...tab, selected: false }
      });

      setTabs(updateTabs);
      setIndexTabActive(idx);
   }

   const updateTab = (index: number, selected?: boolean, title?: string, recordId?: string) => {
      if (hideTabs)
         return;

      const updateTabs = tabs.map(tab => {
         let updateTab = { ...tab };

         if (tab.idx === index) {

            if (selected)
               updateTab.selected = selected;

            if (title)
               updateTab.title = title;

            if (recordId)
               updateTab.recordId = recordId;

         } else {

            if (selected)
               updateTab.selected = false;

         }

         return updateTab
      });

      setTabs(updateTabs);
      setIndexTabActive(index);
   }

   const delAba = (index: number = -1, allOthers: boolean = false) => {
      if (hideTabs)
         return;

      const idx = (index > -1 ? index : indexTabActive);

      // console.log(idx)

      var _tabs = tabs.filter((value, index, arr) => {
         if (allOthers) {
            return value.idx === idx;
         } else {
            return value.idx !== idx;
         }
      });

      const _tabsIdx = _tabs.map((aba, index) => {
         const updateIdx = { ...aba, idx: index };

         return updateIdx;
      });

      let _indexTabActive: number = 0;

      if (_tabsIdx.length > 1 && idx > 0) {
         _indexTabActive = idx - 1
      };

      if (_tabsIdx.length > 0) {
         _tabsIdx[_indexTabActive].selected = true;

         dispatch({
            type: 'open',
            name: _tabsIdx[_indexTabActive].recordId!,
            title: _tabsIdx[_indexTabActive].title
         });
      }

      setTabs(_tabsIdx);
      setIndexTabActive(_indexTabActive);
   }

   const findTab = (name: string): Tab | undefined => {
      return tabs.find(tab => {
         return tab.recordId === name;
      })
   }

   const closeAll = () => {
      let tabsFixed = tabs.filter(tab => {
         return tab.fixed === true;
      }) || []


      setTabs(tabsFixed);
      setIndexTabActive(0);

      // setIndexTabActive(tabsFixed.length > 0 ? 0 : -1);
   }

   const closeAllOthers = () => {
      delAba(-1, true);
   }

   useImperativeHandle(ref, () => ({
      findTab, delAba, newTab, updateTab, tabs, setTabs, createTab
   }));

   useEffect(function () {
      if (hideTabs)
         return;

      $(document).on('mousedown', TABPAGE_SELECTOR_DATA_TOGGLE_SCROLL_LEFT, function (e) {
         e.preventDefault();
         clearInterval(mousedownInterval!);
         var scrollOffset = 40;

         if (!scrollBehaviorSwap) {
            scrollOffset = -scrollOffset;
         }

         mousedown = true;

         navScroll(scrollOffset);

         mousedownInterval = setInterval(function () {
            navScroll(scrollOffset);
         }, 250);
      });

      $(document).on('mousedown', TABPAGE_SELECTOR_DATA_TOGGLE_SCROLL_RIGHT, function (e) {
         e.preventDefault();
         // if (this.mousedownInterval !== undefined) {
         clearInterval(mousedownInterval!);
         // }
         var scrollOffset = 40;

         if (scrollBehaviorSwap) {
            scrollOffset = -scrollOffset;
         }

         mousedown = true;

         navScroll(scrollOffset);

         mousedownInterval = setInterval(function () {
            navScroll(scrollOffset);
         }, 250);
      });

      $(document).on('mouseup', function () {
         if (mousedown) {
            mousedown = false;
            clearInterval(mousedownInterval!);
            mousedownInterval = null;
         }
      });
   }, []);

   useEffect(() => {
      // console.log(itemMenu)

      switch (itemMenu.type) {
         case 'open':
            if (itemMenu.name) {
               if (!checkPage || checkPage(itemMenu.name, itemMenu.title!, itemMenu.data, itemMenu.origem))
                  newTab(itemMenu.title!, renderPage(itemMenu.name, itemMenu.data), itemMenu.name, itemMenu.origem);
            }
            break;

         case 'close':
            tabs.forEach(tab => {
               if (tab.recordId === itemMenu.name) {
                  delAba(tabs.indexOf(tab))
                  return;
               }
            })
            break

         default:
            closeAll();
            break;
      }

      if (itemMenu.type === 'open') {
         if (itemMenu.name) {
            if (!checkPage || checkPage(itemMenu.name, itemMenu.title!, itemMenu.data, itemMenu.origem))
               newTab(itemMenu.title!, renderPage(itemMenu.name, itemMenu.data), itemMenu.name, itemMenu.origem);
         }
      } else {
         tabs.forEach(tab => {
            if (tab.recordId === itemMenu.name) {
               delAba(tabs.indexOf(tab))
               return;
            }
         })
      }
   }, [itemMenu]);

   useEffect(() => {
      if (hideTabs)
         return;

      let _renderTabs: Array<JSX.Element> = [];
      let _renderPanels: Array<JSX.Element> = [];

      tabs.forEach(tab => {
         _renderTabs.push(
            <TabItem
               className={`nav-item ${tab.recordId}`}
               classNameLink='nav-link'
               key={tab.id}
               tabPanelRef={tab.id!}
               selected={tab.selected}
               onClick={() => {
                  setTab(tab.idx);
                  dispatch({
                     type: 'open',
                     name: tab.recordId!,
                     title: tab.title,
                     origem: tab.origem
                  })
               }}
               onClose={() => {
                  delAba(tab.idx);
               }}
               showClose={tab.showClose}>
               {tab.title}
            </TabItem>
         );
         _renderPanels.push(
            <TabPanel key={tab.id} className="tab-pane fade" id={tab.id} show={tab.selected}>
               <div id="content-page" className={`frame-content-page container-fluid ${tab.classNameContent ? tab.classNameContent : ''}`}>
                  {tab.content}
               </div>
            </TabPanel >
         );
      });
      setRenderTabs(_renderTabs);
      setRenderPanels(_renderPanels);
   }, [tabs]);

   if (hideTabs) {
      return (
         <div className="content-page content-tabpage iframe-mode" data-widget="tabpage">
            <div id="content-page" className="frame-content-page container-fluid">
               {renderPage(itemMenu.name, itemMenu.data)}
            </div>
         </div>
      )
   }

   return (
      <div className="content-page content-tabpage iframe-mode" data-widget="tabpage">
         <div className={`nav navbar navbar-expand border-top content-tabpage-navbar`}>
            <div className="nav-item dropdown">
               <button
                  className="nav-link btn-primary dropdown-toggle content-tabpage-btn-fechar"
                  style={{ border: 0 }}
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  Fechar
               </button>
               <div className="dropdown-menu mt-0">
                  <button className="dropdown-item" onClick={closeAll} >Fechar Todas</button>
                  <button className="dropdown-item" onClick={closeAllOthers}>Fechar Todas as Outras</button>
               </div>
            </div>
            <button className={`nav-link bg-white content-tabpage-btn-scrollright`} data-widget="tabpage-scrollleft">
               <i className="fa fa-angle-double-left"></i>
            </button>
            <Tabs className="navbar-nav overflow-hidden content-tabpage-tab nav-pills" id="custom-tabs-four-tab" role="tablist">
               {renderTabs}
            </Tabs>
            <button className={`nav-link bg-white content-tabpage-btn-scrollright`} data-widget="tabpage-scrollright">
               <i className="fa fa-angle-double-right"></i>
            </button>
            <button
               className='nav-link bg-white content-tabpage-iframe-fullscreen'
               style={{ border: 0 }}
               data-widget="iframe-fullscreen"
               onClick={() => {
                  toggleFullscreen();
               }}
            >
               <i className="fa fa-expand"></i>
            </button>
         </div>
         <TabContent className="tab-content">
            {renderPanels}
         </TabContent>
      </div>
   );

}
export default forwardRef(TemplateTabPage);
// export default TemplateTabPage;