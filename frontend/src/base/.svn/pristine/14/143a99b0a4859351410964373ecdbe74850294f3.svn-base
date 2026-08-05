interface RetryMessageProps {
  loading?: boolean;
  message?: string;
  onRetry: () => void;
}

const RetryMessage: React.FC<RetryMessageProps> = ({ loading, message, onRetry }) => {
  return (
    <div style={{ marginTop: 4 }}>
      <span
        style={{
          color: '#dc3545',
          fontSize: '0.875rem',
          marginRight: 8
        }}
      >
        {message ?? 'Não foi possível carregar os dados.'}
      </span>

      <button
        type="button"
        className="btn btn-sm btn-link p-0"
        disabled={loading}
        onClick={onRetry}
      >
        {loading ? 'Tentando...' : 'Tentar novamente'}
      </button>
    </div>
  );
};

export default RetryMessage;