import React, { Fragment } from 'react';
import MemoryFotos from '../../services/memoryfotos';
import './pagination.css';

interface PaginationProps {
   className?: string,
   arrayPagination: Array<any>,
   arrayPaged(array: Array<any>, pageSelected: number): void,
   qtdRegisterPages: number,
   pageSelected?: number,
   numberPagesPagination: number
}

interface PaginationState {
   pageSelected: number
}

class Pagination extends React.Component<PaginationProps, PaginationState> {
   static defaultProps = {
      qtdRegisterPages: 10,
      arrayPagination: [],
      pageSelected: 1,
      numberPagesPagination: 10,
      className: ''
   }

   constructor(props: PaginationProps) {
      super(props);

      this.state = {
         pageSelected: (this.props.pageSelected ? this.props.pageSelected : 1)
      }
   }

   componentDidUpdate(prevProps: PaginationProps, prevState: PaginationState) {
      const { pageSelected } = this.state;

      const { arrayPaged, arrayPagination, qtdRegisterPages } = this.props;

      if (prevProps.arrayPagination !== arrayPagination) {
         this.setState({
            pageSelected: 1
         });

         if (arrayPaged !== undefined) {
            arrayPaged(
               arrayPagination.slice(0, qtdRegisterPages),
               1
            );
         }
      }

      if ((prevState.pageSelected !== pageSelected)) {
         const pageItems = arrayPagination.slice(
            (pageSelected - 1) * qtdRegisterPages,
            pageSelected * qtdRegisterPages
         );

         const ids = pageItems.map((p: any) => p.PRO_ID).filter(Boolean);
         MemoryFotos.instance().getFotos(ids)

         if (arrayPaged !== undefined) {
            arrayPaged(pageItems, pageSelected);
         }
      }

      if (prevProps.pageSelected !== this.props.pageSelected) {
         this.setState({
            pageSelected: (this.props.pageSelected ? this.props.pageSelected : 1)
         })
      }
   }

   render() {

      const { arrayPagination, qtdRegisterPages, numberPagesPagination, className } = this.props;
      const { pageSelected } = this.state;

      let pageElements: Array<JSX.Element> = [];

      let numberPages: number = Math.ceil(arrayPagination.length / qtdRegisterPages);
      let numberPagesFor = numberPages;
      if (numberPages > numberPagesPagination) {
         numberPagesFor = numberPagesPagination;
         if (pageSelected > numberPagesPagination) {
            numberPagesFor = pageSelected;
         }
      }

      let indexFor = 0;
      if (numberPages > numberPagesPagination) {
         if (pageSelected >= numberPagesPagination) {
            indexFor = pageSelected - numberPagesPagination
         }
      }

      for (let index = indexFor; index < numberPagesFor; index++) {
         pageElements.push(
            <li
               key={index}
               className={`page-item ${pageSelected === index + 1 ? 'active' : ''}`}
            >
               <span
                  className="page-link"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                     this.setState({
                        pageSelected: index + 1
                     });
                  }}
               >
                  {index + 1}
               </span>
            </li>
         )
      }

      if (arrayPagination.length === 0) {
         return (
            <Fragment />
         );
      }

      return (
         <Fragment>
            <nav aria-label="Page navigation" className={className}>
               <ul className="pagination justify-content-center">
                  <li className={`page-item ${pageSelected === 1 ? 'disabled' : ''}`}>
                     <span
                        className="page-link"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                           this.setState({
                              pageSelected: pageSelected - 1
                           })
                        }}
                     >
                        Anterior
                     </span>
                  </li>
                  {pageSelected > 10 ?
                     <li className="page-item disabled">
                        <a className="page-link">...</a>
                     </li> : null
                  }
                  {pageElements}
                  {numberPages > 10 ?
                     <li className="page-item disabled">
                        <a className="page-link">...</a>
                     </li> : null
                  }
                  <li className={`page-item ${pageSelected === numberPages ? 'disabled' : ''}`}>
                     <span
                        className="page-link"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                           this.setState({
                              pageSelected: pageSelected + 1
                           })
                        }}
                     >
                        Próximo
                     </span>
                  </li>
               </ul>
            </nav>
         </Fragment>
      );
   }
}

export default Pagination;