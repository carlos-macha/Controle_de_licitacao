import React, { createContext, useContext } from 'react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

interface NetworkStatusContextType {
  online: boolean;
  latencia: number | null;
  conexaoLenta: boolean;
}

const NetworkStatusContext = createContext<NetworkStatusContextType>({
  online: true,
  latencia: null,
  conexaoLenta: false,
});

export function NetworkStatusProvider({ children }: { children: React.ReactNode }) {
  const status = useNetworkStatus();

  return (
    <NetworkStatusContext.Provider value={status}>
      {children}
    </NetworkStatusContext.Provider>
  );
}

export const useNetworkStatusContext = () => useContext(NetworkStatusContext);