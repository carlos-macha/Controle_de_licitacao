import React, { Fragment, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { CustomJsonFile } from '../../types/types';
import { utilities } from '../../utils/utilities';
import Button from '../form/form';
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalLargeType } from '../modal/modal';
import './anexos.css';
import { useSweetAlertContext } from '../../hooks/useSweetAlertContext';
import { useModalContext } from '../../hooks/useModalContext';


interface AnexosModalProps {
   largeType?: ModalLargeType
}

const AnexosModal: React.FC<AnexosModalProps> = (props) => {
   const { largeType } = props;
   const { sweetAlertdispatch } = useSweetAlertContext();
   const { modalState } = useModalContext();
   const [files, setFiles] = useState<Array<CustomJsonFile>>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const { getRootProps, getInputProps, open, acceptedFiles, fileRejections } = useDropzone({
      // noClick: true,
      // noKeyboard: true,
      // multiple: false,
      // maxFiles: 1,
      // maxSize: 5248880,
      // accept: {
      //    'image/png': ['.jpeg', '.jpg', '.png', '.bmp', '.webp'],
      //    'application/pdf': ['.pdf'],
      //    'application/msword': ['.doc'],
      //    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
      // }
   });

   const onRemoverArquivo = (index: number): any => {

      const _files = files.filter((value, idx, arr) => {
         return index !== idx
      });

      setFiles(_files);
   }

   const fileList = (): Array<JSX.Element> => {
      const elFiles: Array<JSX.Element> = [];
      files.forEach((file, index) => (
         elFiles.push(
            <li key={file.fileName} className="list-group-item d-flex justify-content-between align-items-start">
               <div className="me-auto">
                  <div className="fw-bold">
                     <Button
                        onClick={() => {
                           onRemoverArquivo(index)
                        }}
                        className="btn btn-link"
                        classIcon="mdi mdi-trash-can-outline text-danger m-0 p-0"
                     />
                     &nbsp;&nbsp;{file.fileName}
                  </div>
               </div>
               <span className="mt-2 badge bg-primary text-white rounded-pill">{utilities.calcSize(Number(file.fileSize))}</span>
            </li>
         )
      ));
      return elFiles;
   }

   useEffect(() => {
      if (acceptedFiles.length > 0) {
         setLoading(true);

         let _files = [...files]; //clone(files, true);
         let count = 0;
         const converteFile = () => new Promise<void>((resolve, reject) => {
            acceptedFiles.forEach(file => {
               utilities.fileToBase64(file).then((customJsonFile) => {
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [acceptedFiles]);

   const elFiles = fileList();

   return (
      <Fragment>
         <Modal id="form-anexo" className="fade" largeType={largeType}>
            <ModalHeader showCloseTools={true} title="Anexos" />
            <ModalBody>
               <section>
                  {/* <div>Quantidade de Arquivos selecionados: {elFiles.length}</div> */}
                  <div className="d-flex align-items-center">
                     <strong>Quantidade de Arquivos selecionados: {elFiles.length}</strong>
                     {loading && <div className="spinner-border spinner-border-sm ms-auto" role="status" aria-hidden="true" />}
                  </div>
                  {
                     elFiles.length > 0
                     &&
                     <aside>
                        <ul className="list-group" style={{ height: '200px', overflow: 'auto' }}>
                           {elFiles}
                        </ul>
                     </aside>
                  }
                  <div {...getRootProps({ className: 'dropzone' })}>
                     <input {...getInputProps()} />
                     <div>Arraste e solte alguns arquivos aqui ou clique para selecionar os arquivos</div>
                  </div>
               </section>
            </ModalBody>
            <ModalFooter
               showCloseBtn={true}
            >
               <Button
                  onClick={() => {
                     if (files.length > 0) {
                        if (modalState.onBtnSelecionar) {
                           modalState.onBtnSelecionar(files).then(() => {
                              setFiles([]);
                              // updateFileList([]);

                              $(`#form-anexo .close`).click();
                           });
                        }
                     } else {
                        sweetAlertdispatch({
                           type: "show",
                           props: {
                              title: 'Atenção',
                              type: 'error',
                              onConfirm(response) {
                                 sweetAlertdispatch({ type: 'close' })
                              },
                           },
                           msg: 'Você deve incluir ao menos um arquivo!'
                        })
                     }
                  }}
                  className="btn btn-primary"
                  classIcon="mdi mdi-arrow-down-left-bold"
                  caption="Incluir Anexos"
               />
            </ModalFooter>
         </Modal>
      </Fragment>
   );
}

AnexosModal.defaultProps = {
   largeType: "default"
}

export default AnexosModal;