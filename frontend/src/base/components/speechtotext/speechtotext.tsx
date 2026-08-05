import React from 'react';
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition';
import { useSweetAlertContext } from '../../hooks/useSweetAlertContext';
import Button from '../form/form';
import AudioBars from './audiobars';

interface SpeechToTextProps {
  onText: (text: string) => void;
}

const SpeechToText: React.FC<SpeechToTextProps> = ({ onText }) => {
  const { showSweetAlertMessage } = useSweetAlertContext();
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <Button
          caption={'Transcrever aúdio'}
          type='button'
          className='btn btn-primary'
          classIcon={`mdi mdi-microphone mr-1 p-0`}
          title={`Clique aqui para parar a transcrição de aúdio`}
          onClick={() => {
            showSweetAlertMessage(
              'warning',
              'Este navegador não suporta transcrição de áudio',
              `
              <strong className='fs-3'>Navegadores recomendados:</strong>
              <span className="mdi mdi-google-chrome fs-3"/> Google Chrome 
              <span className="mdi mdi-microsoft-edge fs-3"/> Microsoft Edge
              `);
          }}
          overlayProps={{
            placement: "top"
          }}
        />
      </div>
    );
  }

  const startListening = async () => {
    resetTranscript();

    await SpeechRecognition.startListening({
      language: 'pt-BR',
      continuous: true,
      interimResults: false
    });
  };

  const stopListening = async () => {

    await SpeechRecognition.stopListening();

    setTimeout(() => {
      const texto = transcript?.trim();
      if (texto) { onText(texto); }
      resetTranscript();
    }, 300);
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        marginBottom: 10
      }}
    >
      <Button
        caption={`${listening ? 'Parar' : 'Transcrever aúdio'}`}
        type='button'
        onClick={listening ? stopListening : startListening}
        className='btn btn-primary'
        classIcon={`mdi mdi-microphone${listening ? '-off' : ''} mr-1 p-0`}
        title={`${listening ? 'Clique aqui para parar a transcrição de aúdio' : 'Clique aqui para transcrever seu aúdio'}`}
        overlayProps={{
          placement: "top"
        }}
      >
      </Button>
      {listening && <AudioBars />}
    </div>
  );
};

export default SpeechToText;