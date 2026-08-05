import React, { Fragment } from 'react';

interface FotoPerfilProps {
   base64?: string,
   styleNoFoto?: React.CSSProperties,
   width?: number,
   height?: number
}

const FotoPerfil: React.FC<FotoPerfilProps> = (props) => {
   const { base64, styleNoFoto, width, height } = props;
   return (
      <Fragment>
         {base64 ?
            <img
               className="profile-pic"
               src={`data:image/png;base64,${base64}`}
               alt="profile-pic"
               width={width}
               height={height}
               style={{
                  objectFit: 'cover',
                  objectPosition: 'center'
               }}
            />
            :
            <i className="mdi mdi-account-circle"
               style={styleNoFoto}
            />
         }
      </Fragment>
   );
}

FotoPerfil.defaultProps = {
   styleNoFoto: {
      fontSize: '1175%',
      lineHeight: 0,
      top: 75,
      position: 'relative',
      marginBottom: 200
   },
   width: 150,
   height: 150
}

export default FotoPerfil;