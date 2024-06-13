
import { useEffect, useState } from 'react';
import PaymentRetry from './PaymentRetry';
import { useUser } from '../context/UserContext';
import { EndSubscription } from './EndSubscription';

const SubscriptionDetails = () => {
  const { user } = useUser();
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<number | null>(null);

  useEffect(() => {
    // Här hämtar du prenumerationsinformationen för användaren
    async function fetchSubscription() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/subscriptions/subscriptionId?userEmail=${user}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
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
      <h2>Subscription Details</h2>
      {subscriptionId && (
        <div>
          {subscriptionStatus === 0 && (
            <>
              <h3>Your payment did not go through. Do you want to try again?</h3>
              <PaymentRetry subscriptionId={subscriptionId} />
            </>
          )}
          {subscriptionStatus === 1 && (
            <>
              <h3>Your subscription is active.</h3>
              <EndSubscription subscriptionId={subscriptionId} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SubscriptionDetails;
