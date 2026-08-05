import React, { Fragment } from 'react';
import { LoaderSizeProps } from 'react-spinners/helpers/props';
import './spinners.css';
import { MoonLoader } from 'react-spinners';

interface SpinnersProps extends LoaderSizeProps { }

const Spinners: React.FC<SpinnersProps> = (props) => {
   const { color, loading, ...attributes } = props;

   if (!loading)
      return <Fragment />;

   return (
      <div className='loader-spinners'>
         <MoonLoader
            loading={loading}
            color='#0062cc'
            aria-label="Loading Spinner"
            data-testid="loader"
            {...attributes}
         />
      </div>
   );
}

export default Spinners;