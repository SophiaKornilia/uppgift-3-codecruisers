import { useState } from "react";

interface CancelProps {
    subscriptionId: string;
  }

export const EndSubscription: React.FC<CancelProps>  = ({ subscriptionId }) => {
   const [error, setError] = useState('');
   
  console.log(subscriptionId);

    const handleClick = async() => { 
      const successUrl = "http://localhost:5173/SuccessfullyCancelled";  

    try {
      const response = await fetch('http://localhost:3000/api/payments/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subscriptionId })
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Cancelled");
        document.location.href = successUrl;
      } else {
        setError('Failed to cancel subscription: ' + data.error);
      }
    } catch (error) {
      setError('Error: ' + error);
    } 
    }
    
    return (
        <div>
            <button onClick={handleClick}>Cancel subscription</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}

        </div>
    )

}