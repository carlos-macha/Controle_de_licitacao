import React, { Fragment, Ref, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { CustomJsonFile } from '../../types/types';
import { useDropzone } from 'react-dropzone';
import SweetAlert from 'react-bootstrap-sweetalert';
import Button from '../form/form';
import { utilities } from '../../utils/utilities';
import Spinners from '../spinners/spinners';
import './fileuploadfotos.css';

const focusedStyle = {
   borderColor: '#2196f3'
};

const acceptStyle = {
   borderColor: '#00e676'
};

const rejectStyle = {
   borderColor: '#ff1744'
};

interface IStyleZone {
   borderColor: string;
   flexDirection: "row" | "row-reverse" | "column" | "column-reverse";
   padding: string;
   borderWidth: number;
   borderRadius: number;
   borderStyle: string;
   backgroundColor: string;
   color: string;
   outline: string;
   transition: string;
};

interface FileUploadFotosProps {
   prefixFotoName?: string,
   // onUpload: (files: Array<object>) => any | undefined
}

export interface FileUploadFotosRef {
   clearFiles: () => void,
   jsonFiles: () => Array<CustomJsonFile>
};

const FileUploadFotos: React.ForwardRefRenderFunction<FileUploadFotosRef, FileUploadFotosProps> = (props, ref: Ref<FileUploadFotosRef>) => {
   const { prefixFotoName } = props;
   const [files, setFiles] = useState<Array<CustomJsonFile>>([]);
   const [style, setStyle] = useState<any | undefined>();
   const [loading, setLoading] = useState<boolean>(false);
   const [sweetAlert, setSweetAlert] = useState<any | undefined>({
      type: 'error',
      title: '',
      msg: ''
   })


   const {
      getRootProps,
      getInputProps,
      acceptedFiles,
      fileRejections,
      open,
      isFocused,
      isDragAccept,
      isDragReject
   } = useDropzone({
      noClick: true,
      noKeyboard: true,
      // multiple: false,
      maxSize: 10497760,
      accept: {
         'image/jpg': ['.jpg', '.jpeg', '.png']
      }
      // accept: {
      //    'application/pdf': ['.pdf'],
      //    'application/text': ['.txt'],
      //    'application/octet-stream': ['.zip', '.rar', '.7zip'],
      //    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.doc', '.docx']
      // }
   });

   const clearFiles = () => {
      setFiles([]);
   }

   const jsonFiles = (): Array<CustomJsonFile> => {
      return files;
   }

   const removerFoto = (index: number) => {
      // console.log(files)
      let _files = files.filter((file, idx) => {
         return index !== idx
      });
      // console.log(_files)
      setFiles(_files);
      // filesList = _files;
   }

   const updateFotosList = (files: Array<CustomJsonFile>) => {
      let elFiles: Array<JSX.Element> = [];

      files.forEach((file, index) => (
         elFiles.push(
            <div className='col-6 col-lg-3 col-xl-2 text-center mb-4'>
               <img
                  key={file.fileName}
                  src={`data:image/png;base64,${file.base64StringFile}`}
                  alt=""
                  className="rounded border"
                  style={{
                     height: '100px',
                     width: '150px',
                     objectFit: "cover"
                  }}
               />
               {/* </button> */}
               <div className="foto-opcoes">
                  <Button
                     onClick={() => {
                        removerFoto(index)
                     }}
                     className="btn btn-danger btn-sm"
                     classIcon="fas fa-trash"
                  />
               </div>
            </div>
         )
      ));
   }

   const fotosList = (): Array<JSX.Element> => {
      let elFiles: Array<JSX.Element> = [];
      files.forEach((file, index) => (
         elFiles.push(
            <div className='col-6 col-lg-3 col-xl-2 text-center mb-4'>
               <img
                  key={file.fileName}
                  src={`data:image/png;base64,${file.base64StringFile}`}
                  alt=""
                  className="rounded border"
                  style={{
                     height: '100px',
                     width: '150px',
                     objectFit: "cover"
                  }}
               />
               <div className="foto-opcoes">
                  <Button
                     onClick={() => {
                        removerFoto(index)
                     }}
                     className="btn btn-light btn-sm"
                     classIcon="mdi mdi-trash-can-outline mr-0 text-danger"
                  />
               </div>
            </div>
         )
      ));
      return elFiles;
   }

   const elFotosList = fotosList();

   var baseStyle: IStyleZone | undefined = {
      flexDirection: 'column',
      padding: '20px',
      borderWidth: 2,
      borderRadius: 2,
      borderColor: '#eeeeee',
      borderStyle: 'dashed',
      backgroundColor: '#fafafa',
      color: '#bdbdbd',
      outline: 'none',
      transition: 'border .24s ease-in-out'
   };

   useEffect(() => {
      if (acceptedFiles.length > 0) {
         setLoading(true);

         let _files = [...files]; //clone(files, true);
         let count = 0;
         const converteFile = () => new Promise<void>((resolve, reject) => {
            acceptedFiles.forEach(file => {
               utilities.fileToBase64(file).then((customJsonFile) => {
                  if (prefixFotoName)
                     customJsonFile.fileName = `${prefixFotoName}_${customJsonFile.fileName}`;
                  _files.push(customJsonFile);
               }).finally(() => {
                  count++;

                  if (count === acceptedFiles.length)
                     resolve();
               })
            })
         });

         converteFile().then(() => {
            setFiles(_files);
         }).finally(() => {
            setLoading(false);
         });
      }
      // if (acceptedFiles.length > 0) {
      //    let _files = clone(files, true);
      //    setLoading(true);
      //    acceptedFiles.forEach(file => {
      //       utilities.fileToBase64(file).then((customJsonFile: CustomJsonFile) => {

      //          if (prefixFotoName)
      //             customJsonFile.fileName = `${prefixFotoName}_${customJsonFile.fileName}`;

      //          _files.push(customJsonFile);
      //          setFiles(_files);
      //          updateFotosList(_files);
      //       }).finally(() => {
      //          setLoading(false);
      //       })
      //    });
      // }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [acceptedFiles]);

   useEffect(() => {
      if (fileRejections.length > 0) {
         setSweetAlert({
            type: 'error',
            title: 'Arquivo inválido',
            msg: 'O tipo de arquivo deve ser um dos .jpg, .jpeg, .png e deve possuir no máximo 10 Mb. '
         });
      }
   }, [fileRejections]);

   useEffect(() => {
      setStyle({
         ...baseStyle,
         ...(isFocused ? focusedStyle : {}),
         ...(isDragAccept ? acceptStyle : {}),
         ...(isDragReject ? rejectStyle : {})
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [
      isFocused,
      isDragAccept,
      isDragReject
   ])

   useImperativeHandle(ref, () => ({
      clearFiles, jsonFiles
   }));

   return (
      <Fragment>
         <div {...getRootProps({ style })} className='mt-2'>
            <input {...getInputProps({ className: "d-none" })} />
            {
               files.length === 0 &&
               <div className='text-center'>Arraste suas fotos aqui</div>
            }
            <div className='row'>
               {elFotosList}
            </div>
            {/* {loading &&
               <div
                  className='loader-spinners'
                  style={{
                     height: '100px',
                     width: '143px'
                  }}
               > */}
            {loading && <Spinners loading size={40} />}
            {/* </div>
            } */}
         </div>
         <button type='button' className='btn btn-link mb-0 pb-0' onClick={open}>Adicionar Fotos</button>
         <button type='button' className='btn btn-link mb-0 pb-0' onClick={() => {
            setFiles([]);
            updateFotosList([]);
         }}>Limpar</button>
         {sweetAlert &&
            <SweetAlert
               type={sweetAlert.type}
               title={sweetAlert.title}
               onConfirm={() => {
                  setSweetAlert(undefined)
               }}
               show={sweetAlert.msg !== ''}>
               {sweetAlert.msg}
            </SweetAlert>
         }
      </Fragment>
   );
}

export default forwardRef(FileUploadFotos);