import React, { HTMLAttributes } from 'react';

import './card.css';

interface CardProps extends HTMLAttributes<HTMLElement> {
   className?: string,
   children: React.ReactNode;
}

const Card: React.FC<CardProps> = (props) => {
   const { className, children, ...attributes } = props;
   return (
      <div {...attributes} className={`card ${className}`}>
         {children}
      </div>
   );
}

Card.defaultProps = {
   className: ''
}

export default Card;

/*
================================================
*/

interface CardHeaderProps {
   title?: string,
   className?: string,
   classNameTitle?: string,
   children?: React.ReactNode
}

export const CardHeader: React.FC<CardHeaderProps> = (props) => {
   const { title, className, classNameTitle, children, ...attributes } = props;
   return (
      <div {...attributes} className={`card-header pb-0 ${className}`}>
         {title &&
            <h4 className={`card-title ${classNameTitle}`}>{title}</h4>
         }
         {children}
      </div>
   );
}

CardHeader.defaultProps = {
   className: '',
   classNameTitle: ''
}

/*
================================================
*/

interface CardToolsProps extends CardProps { }

export const CardTools: React.FC<CardToolsProps> = (props) => {
   const { className, children, ...attributes } = props;

   return (
      <div {...attributes} className={`card-tools ${className}`}>
         {children}
      </div>
   );
}

/*
================================================
*/

interface CardBodyProps extends CardProps { }

export const CardBody: React.FC<CardBodyProps> = (props) => {
   const { className, children, ...attributes } = props;

   return (
      <div {...attributes} className={`card-body ${className}`}>
         {children}
      </div>
   );
}

/*
================================================
*/

interface CardFooterProps extends CardProps { }

export const CardFooter: React.FC<CardFooterProps> = (props) => {
   const { className, children, ...attributes } = props;

   return (
      <div {...attributes} className={`card-footer ${className}`}>
         {children}
      </div>
   );
}
