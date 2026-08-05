import { ReactNode, useState } from "react";
import AsyncSelect from "react-select/async";
import RetryMessage from "../retrymessage/retrymessage";

export interface OptionInputSelect {
  label: string;
  value: string;
}

interface InputSelectAsyncProps {
  placeholder?: string;
  promiseOptions: (inputValue: string) => Promise<OptionInputSelect[]>;
  onChange: (value: OptionInputSelect | null) => void;
  defaultValue?: OptionInputSelect | null;
  isClearable?: boolean;
  buttonModal?: ReactNode;
  onMenuOpen?: () => void;
  enableAutoLoad?: boolean;
}

const InputSelectAsync: React.FC<InputSelectAsyncProps> = ({ placeholder = "Selecione...", promiseOptions, onChange, defaultValue, isClearable = true, buttonModal, onMenuOpen, enableAutoLoad = true, }) => {
  const [loadError, setLoadError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const loadOptions = (inputValue: string, callback: (options: OptionInputSelect[]) => void) => {
    setIsFetching(true);

    promiseOptions(inputValue)
      .then((result) => {
        setLoadError(false);
        callback(result);
      })
      .catch((error) => {
        console.error("Erro capturado no select async:", error);
        setLoadError(true);
        callback([]);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const handleRetryClick = () => {
    setLoadError(false);
    setReloadKey((k) => k + 1);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <AsyncSelect
            key={reloadKey}
            cacheOptions
            defaultOptions={enableAutoLoad}
            loadOptions={loadOptions}
            classNamePrefix="select"
            placeholder={(isFetching && !loadError) ? 'Carregando...' : placeholder}
            isClearable={isClearable}
            defaultValue={defaultValue ?? null}
            noOptionsMessage={() => "Sem opções"}
            loadingMessage={() => "Carregando..."}
            onChange={(value) => onChange(value as OptionInputSelect | null)}
            onMenuOpen={onMenuOpen}
          />
        </div>
        {buttonModal && (
          <div style={{ marginLeft: "4px" }}>
            {buttonModal}
          </div>
        )}
      </div>

      {loadError && (
        <RetryMessage
          loading={isFetching}
          onRetry={handleRetryClick}
        />
      )}
    </div>
  );
};

export default InputSelectAsync;