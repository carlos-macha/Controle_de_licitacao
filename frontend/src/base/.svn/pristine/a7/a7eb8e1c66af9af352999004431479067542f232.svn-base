import React, { Fragment } from 'react';
import './tab.css';

interface TabsProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement> { }
const Tabs: React.FC<TabsProps> = (props) => {
   const { children, ...Tabs } = props;
   return (
      <ul {...Tabs}>
         {children}
      </ul>
   );
}
export default Tabs;

interface TabItemProps extends React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
   classNameLink?: string,
   tabPanelRef: string,
   selected?: boolean,
   showClose?: boolean,
   onClick?: () => void,
   onClose?: () => void,
   onClickTab?: () => void
}
export const TabItem: React.FC<TabItemProps> = (props) => {
   const { children, selected, showClose, classNameLink, tabPanelRef, onClick, onClose, onClickTab, ...TabItem } = props;

   return (
      <li {...TabItem}>
         <a className={`${classNameLink} ${selected ? "active" : ""}`} onClick={onClickTab}
            id={tabPanelRef + "-tab"}
            data-toggle="pill"
            href={"#" + tabPanelRef}
            role="tab"
            aria-controls={tabPanelRef}
            aria-selected={selected ? "true" : "false"}>
            <span onClick={onClick} style={{
               paddingTop: '15px',
               paddingBottom: '15px'
            }}>{children}</span>
            {showClose &&
               <i style={{ color: '#dc3545' }}
                  onClick={onClose}
                  className="ml-1 ri-close-line btn-tab-close"
               />
            }
         </a>
      </li>
   );
}

interface TabContentProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }
export const TabContent: React.FC<TabContentProps> = (props) => {
   const { children, ...TabContent } = props;

   return (
      <div {...TabContent}>
         {children}
      </div>
   );
}

interface TabPanelProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
   show?: boolean
}

export const TabPanel: React.FC<TabPanelProps> = (props) => {
   const { children, className, show, id, ...TabPanel } = props;

   return (
      <div id={id} {...TabPanel} className={`${className} ${show ? 'active show' : ''}`} role="tabpanel" aria-labelledby={id + "-tab"}>
         {children}
      </div>
   );
}