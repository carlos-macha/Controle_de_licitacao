import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalLargeType } from "../modal/modal";
import Card, { CardBody } from "../card/card";
import Button, { EnumCharcasetypes, TextArea } from "../form/form";

interface TextAreaModalProps {
   title?: string,
   largeType?: ModalLargeType,
   captionBtnSave?: string,
   onText?: (text?: string, base64?: string) => Promise<void>
}

const TextAreaModal: React.FC<TextAreaModalProps> = (props) => {
   const { title, largeType, captionBtnSave, onText } = props;
   const [text, setText] = useState<string>();
   const [base64, setBase64] = useState<string>();

   return (
      <Modal id="text-area-modal" className="fade" largeType={largeType}>
         <ModalHeader showCloseTools title={title} />
         <ModalBody className="p-0">
            <Card className="m-0">
               <CardBody>
                  <TextArea
                     isBase64
                     charCase={EnumCharcasetypes.UPPERCASE}
                     value={base64}
                     onChange={(e: any) => {
                        setText(e.target.value);
                     }}
                     onBase64={value => {
                        setBase64(value);
                     }}
                     rows={7}
                  />
               </CardBody>
            </Card>
         </ModalBody>
         <ModalFooter
            showCloseBtn={true}
            onCloseBtn={() => {
               setText(undefined);
               setBase64(undefined);
            }}
         >
            <Button
               onClick={() => {
                  if (onText) {
                     onText(text, base64).then(() => {
                        $(`#text-area-modal .close`).click();
                        setText(undefined);
                        setBase64(undefined);
                     });

                     return;
                  }

                  $(`#text-area-modal .close`).click();
                  setText(undefined);
                  setBase64(undefined);
               }}
               className="btn btn-primary"
               classIcon="mdi mdi-arrow-down-left-bold"
               caption={captionBtnSave}
            />
         </ModalFooter>
      </Modal>
   );
}

TextAreaModal.defaultProps = {
   largeType: 'large',
   captionBtnSave: 'Salvar'
}

export default TextAreaModal;