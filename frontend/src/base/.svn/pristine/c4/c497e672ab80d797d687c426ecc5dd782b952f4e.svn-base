import clone from 'clone';
import { nanoid } from 'nanoid';
import React, { Fragment, useState, useEffect } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useDropzone } from 'react-dropzone';
import { CustomJsonFile, SweetAlertMessage } from '../../types/types';
import { utilities } from '../../utils/utilities';
import Button from '../form/form';
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalLargeType } from '../modal/modal';
import './anexos.css';

interface AnexosProps {
   id?: string,
   largeType?: ModalLargeType,
   onSelect?: (anexos: Array<CustomJsonFile>) => void
}

const Anexos: React.FC<AnexosProps> = (props) => {

   let id: string | undefined = props.id;
   if (!id)
      id = `form-view-anexos-${nanoid()}`;

   const { largeType, onSelect } = props;
   const [sweetAlert, setSweetAlert] = useState<SweetAlertMessage | undefined>();
   const [elFiles, setElFiles] = useState<Array<JSX.Element>>([]);
   const [files, setFiles] = useState<Array<CustomJsonFile>>([]);
   const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
   const [arquivoSelecionadoExclusao, setArquivoSelecionadoExclusao] = useState<string | undefined>();
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

   const onRemoverArquivo = (reponse?: any): any => {

      const filtered = files.filter((value, index, arr) => {
         return value.fileName !== arquivoSelecionadoExclusao;
      });

      setFiles(filtered);
      updateFileList(filtered);

      setShowConfirmDelete(false);
      setArquivoSelecionadoExclusao(undefined);
   }

   const updateFileList = (files: Array<CustomJsonFile>) => {
      const elFiles = files.map(file => (
         <li key={file.fileName} className="list-group-item d-flex justify-content-between align-items-start">
            <div className="me-auto">
               <div className="fw-bold">
                  <Button
                     onClick={() => {
                        setArquivoSelecionadoExclusao(file.fileName)
                        setShowConfirmDelete(true);
                     }}
                     className="btn btn-link"
                     classIcon="fas fa-trash-alt text-danger"
                  />
                  &nbsp;&nbsp;{file.fileName}
               </div>
            </div>
            <span className="mt-2 badge bg-primary rounded-pill">{utilities.calcSize(Number(file.fileSize))}</span>
         </li>
      ));
      setElFiles(elFiles);
   }

   useEffect(() => {
      let _files = clone(files, true);
      setLoading(acceptedFiles.length > 0);
      acceptedFiles.forEach((file) => {
         utilities.fileToBase64(file).then((customJsonFile) => {
            _files.push(customJsonFile);
            setFiles(_files);
         }).finally(() => {
            updateFileList(_files);
            setLoading(false);
         })
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [acceptedFiles]);

   return (
      <Fragment>
         <Modal id={id} className="fade" largeType={largeType}>
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
                        if (onSelect) {
                           onSelect(files);
                        }

                        setFiles([]);
                        updateFileList([]);

                        $(`#${id} .close`).click();
                     } else {
                        setSweetAlert({
                           type: 'error',
                           title: 'Atenção',
                           msg: 'Você deve incluir ao menos um arquivo!',
                           onConfirm: () => {
                              setSweetAlert(undefined)
                           }
                        })
                     }
                  }}
                  className="btn btn-primary"
                  classIcon="fas fa-arrow-down"
                  caption="Incluir Anexos"
               />
            </ModalFooter>
         </Modal>
         {sweetAlert &&
            <SweetAlert
               type={sweetAlert.type}
               title={sweetAlert.title}
               onConfirm={() => {
                  if (sweetAlert.onConfirm)
                     sweetAlert.onConfirm();
               }}
               show={Boolean(sweetAlert.msg)}>
               {sweetAlert.msg}
            </SweetAlert>
         }
         <SweetAlert
            warning
            showCancel
            confirmBtnText="Sim, confirmo!"
            cancelBtnText="Cancelar!"
            confirmBtnBsStyle="danger"
            title="Confirma exclusão desse arquivo?"
            onConfirm={onRemoverArquivo}
            onCancel={() => {
               setShowConfirmDelete(false)
            }}
            focusCancelBtn
            show={showConfirmDelete} >
            'Se necessário, você poderá anexar o arquivo novamente!
         </SweetAlert>
      </Fragment>
   );
}

Anexos.defaultProps = {
   largeType: "default"
}

export default Anexos;