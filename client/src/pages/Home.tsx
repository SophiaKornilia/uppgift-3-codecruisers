import { useState } from "react";
import CheckoutButton from "../components/CheckOutButton";
import "../style/Home.css";

export const Home = () => {
  const [selectedSubscription, setSelectedSubscription] = useState<number | null>(null);

  const handleSubscriptionSelect = (subscriptionLevel: number | null) => {
    setSelectedSubscription(subscriptionLevel);
  };

  return (
    <div className="home-Container">
      <h2>Choose your subscription level</h2>
      <div className="box" onClick={() => handleSubscriptionSelect(1)}>Muggle Magic Section</div>
      <div className="box" onClick={() => handleSubscriptionSelect(2)}>Wizarding Wonders Wing</div>
      <div className="box" onClick={() => handleSubscriptionSelect(3)}>The Forbidden Archives</div>
      {selectedSubscription !== null && <CheckoutButton subscriptionLevel={selectedSubscription} />}
    </div>
  );
};
