import { useState } from 'react';
import Button from '../form/form';

interface Props {
  onGranted?: () => void;
  onDenied?: () => void;
  children?: (requestPermission: () => void) => React.ReactNode;
}

const RequestNotification = ({ onGranted, onDenied, children }: Props) => {
  const [permission, setPermission] = useState(Notification.permission);
  const [closed, setClosed] = useState(false);

  if (permission !== 'default' || closed) return null;

  const requestPermission = () => {
    Notification.requestPermission().then((result) => {
      setPermission(result);

      if (result === 'granted') onGranted?.();
      if (result === 'denied') onDenied?.();
    });
  };

  if (children) {
    return <>{children(requestPermission)}</>;
  }

  return (
    <div className="alert alert-success d-flex align-items-center p-2 justify-content-between">
      <div>
        <i className="mdi mdi-bell mr-2" />
        <span className="mr-3">Deseja receber lembretes?</span>
        <Button
          className="btn btn-success btn-sm"
          onClick={requestPermission}
        >
          Permitir
        </Button>
      </div>

      <Button
        className="btn p-0 ml-2"
        onClick={() => setClosed(true)}
      >
        <i className="mdi mdi-close" />
      </Button>
    </div>
  );
};

export default RequestNotification;