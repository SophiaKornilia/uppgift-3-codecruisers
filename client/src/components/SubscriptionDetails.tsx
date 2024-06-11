import { useEffect, useState } from 'react';
import PaymentRetry from './PaymentRetry';
import { useUser } from '../context/UserContext';
import { EndSubscription } from './EndSubscription';
// import { EndSubscription } from './EndSubscription';


const SubscriptionDetails = () => {
    const { user } = useUser();

  const [subscriptionId, setSubscriptionId] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState();

  useEffect(() => {
    // Här hämtar du prenumerationsinformationen för användaren
    async function fetchSubscription() {
      try {
        const response = await fetch(`http://localhost:3000/api/subscriptions/subscriptionId?userEmail=${user}&isActive=0`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
          }
    });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setSubscriptionId(data.subscriptionId);
          setSubscriptionStatus(data.isActive);
        } else {
          console.error('Failed to fetch subscription:', data.error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchSubscription();
  }, [user]);

  return (
    <div>
      <h1>Subscription Details</h1>
      {subscriptionId && (
        <div>
          <p>Subscription ID: {subscriptionId}</p>
           <p>Status: {subscriptionStatus}</p> 
           {subscriptionStatus === 0 && (
            <><PaymentRetry subscriptionId={subscriptionId} />
            </>
          )} 
          
                      <EndSubscription subscriptionId={subscriptionId} />

          
        </div>
      )}
    </div>
  );
};

export default SubscriptionDetails;
