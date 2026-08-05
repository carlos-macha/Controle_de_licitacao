import React, { Fragment, useRef } from 'react';
import { useModalContext } from '../../hooks/useModalContext';
import FileUploadFotos, { FileUploadFotosRef } from '../fileuploadfotos/fileuploadfotos';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../modal/modal';
import Tabs, { TabContent, TabItem, TabPanel } from '../tab/tab';
import { CustomJsonFile } from '../../types/types';
import Button from '../form/form';

interface AnexosFotosProps {
   title?: string
}

const AnexosFotosModal: React.FC<AnexosFotosProps> = (props) => {
   const { title } = props;
   const { modalState } = useModalContext();
   const imagensFrontalRef = useRef<FileUploadFotosRef>(null);
   const imagensLateralDireitaRef = useRef<FileUploadFotosRef>(null);
   const imagensLateralEsquerdaRef = useRef<FileUploadFotosRef>(null);
   const imagensPosteriorRef = useRef<FileUploadFotosRef>(null);
   const imagensDetalhadaRef = useRef<FileUploadFotosRef>(null);

   return (
      <Fragment>
         <Modal id='form-anexos-fotos' className="fade" largeType='extra-large'>
            <ModalHeader showCloseTools={true} title={title ? title : 'Anexar Fotos'} />
            <ModalBody>
               <Tabs className="nav nav-pills">
                  <TabItem className='nav-item' classNameLink='nav-link' tabPanelRef={`imagem-frontal`} selected={true}> Imagem Frontal </TabItem>
                  <TabItem className='nav-item' classNameLink='nav-link' tabPanelRef={`imagem-lateral-esquerda`}> Imagem Lateral Esquerda </TabItem>
                  <TabItem className='nav-item' classNameLink='nav-link' tabPanelRef={`imagem-lateral-direita`}> Imagem Lateral Direita </TabItem>
                  <TabItem className='nav-item' classNameLink='nav-link' tabPanelRef={`imagem-posterior`}> Imagem Posterior </TabItem>
                  <TabItem className='nav-item' classNameLink='nav-link' tabPanelRef={`imagem-detalhada`}> Imagem Detalhada do Problema/Falha </TabItem>
               </Tabs>
               <TabContent className="tab-content">
                  <TabPanel className="tab-pane fade" show={true} id={`imagem-frontal`}>
                     <FileUploadFotos ref={imagensFrontalRef} prefixFotoName='imagem-frontal' />
                  </TabPanel>
                  <TabPanel className="tab-pane fade" id={`imagem-lateral-esquerda`}>
                     <FileUploadFotos ref={imagensLateralEsquerdaRef} prefixFotoName='imagem-lateral-esquerda' />
                  </TabPanel>
                  <TabPanel className="tab-pane fade" id={`imagem-lateral-direita`}>
                     <FileUploadFotos ref={imagensLateralDireitaRef} prefixFotoName='imagem-lateral-direita' />
                  </TabPanel>
                  <TabPanel className="tab-pane fade" id={`imagem-posterior`}>
                     <FileUploadFotos ref={imagensPosteriorRef} prefixFotoName='imagem-posterior' />
                  </TabPanel>
                  <TabPanel className="tab-pane fade" id={`imagem-detalhada`}>
                     <FileUploadFotos ref={imagensDetalhadaRef} prefixFotoName='imagem-detalhada' />
                  </TabPanel>
               </TabContent>
            </ModalBody>
            <ModalFooter
               showCloseBtn={true}
            >
               <Button
                  onClick={() => {
                     let anexos: Array<CustomJsonFile> = [];
                     anexos = anexos.concat(imagensFrontalRef.current?.jsonFiles()!);
                     anexos = anexos.concat(imagensLateralDireitaRef.current?.jsonFiles()!);
                     anexos = anexos.concat(imagensLateralEsquerdaRef.current?.jsonFiles()!);
                     anexos = anexos.concat(imagensPosteriorRef.current?.jsonFiles()!);
                     anexos = anexos.concat(imagensDetalhadaRef.current?.jsonFiles()!);

                     // onSelect(anexos);

                     if (modalState.onBtnSelecionar) {
                        modalState.onBtnSelecionar(anexos).then(() => {

                           $(`#form-anexos-fotos .close`).click();

                           imagensFrontalRef.current?.clearFiles();
                           imagensLateralDireitaRef.current?.clearFiles();
                           imagensLateralEsquerdaRef.current?.clearFiles();
                           imagensPosteriorRef.current?.clearFiles();
                           imagensFrontalRef.current?.clearFiles();
                        });
                     }

                  }}
                  className="btn btn-primary"
                  classIcon="mdi mdi-arrow-down-left-bold"
                  caption="Anexar"
               />
            </ModalFooter>
         </Modal>
      </Fragment>
   );
}

AnexosFotosModal.defaultProps = {

}

export default AnexosFotosModal;