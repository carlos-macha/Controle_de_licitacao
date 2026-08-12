import React, { HTMLAttributes } from 'react';

import './card.css';
import Button from '../form/form';

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
   showSelectButton?: boolean,
   showCancelButton?: boolean,
   onSelectButtonClick?: () => void,
   onCancelButtonClick?: () => void
}

export const CardHeader: React.FC<CardHeaderProps> = (props) => {
   const {
      title,
      className,
      classNameTitle,
      children,
      showSelectButton,
      showCancelButton,
      onSelectButtonClick,
      onCancelButtonClick,
      ...attributes
   } = props;

   return (
      <div {...attributes} className={`card-header pb-0 ${className}`}>
         <div className="d-flex align-items-center justify-content-between w-100">
            {title && <h4 className={`card-title mb-0 ${classNameTitle}`}>{title}</h4>}

            <div>
               {children}

               {showSelectButton && (
                  <Button
                     className="btn btn-primary mb-3"
                     onClick={onSelectButtonClick}
                  >
                     Selecionar
                  </Button>
               )}

               {showCancelButton && (
                  <Button
                     className="btn btn-secondary ml-2 mb-3"
                     onClick={onCancelButtonClick}
                  >
                     Cancelar
                  </Button>
               )}
            </div>
         </div>
      </div>
   );
};

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
