import { useState } from 'react';

interface PaymentRetryProps {
    subscriptionId: string;
  }
  
  const PaymentRetry: React.FC<PaymentRetryProps> = ({ subscriptionId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  console.log(subscriptionId);
  async function handleRetryPayment() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:3000/api/payments/retry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subscriptionId })
      });

      const data = await response.json();
      if (response.ok) {
        window.location.href = data;
      } else {
        setError('Failed to get payment link: ' + data.error);
      }
    } catch (error) {
      setError('Error: ' + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={handleRetryPayment}>Retry Payment</button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PaymentRetry;
