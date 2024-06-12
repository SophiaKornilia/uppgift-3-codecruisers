import { useState } from "react";
import CheckoutButton from "../components/CheckOutButton";
import "../style/Home.css";

export const Home = () => {
  const [selectedSubscription, setSelectedSubscription] = useState<number | null>(null);

  const handleSubscriptionSelect = (subscriptionLevel: number | null) => {
    setSelectedSubscription(subscriptionLevel);
  };

  return (
   <div className="home-background"> <h1>Welcome to the Magical Bookstore</h1>
        <p>Explore our exclusive subscription plans and dive into the world of magical books!</p>
      
    
    <div className="home-Container">
      <h2>Choose your subscription level</h2>
      <div className="box" onClick={() => handleSubscriptionSelect(1)}>
        <h3>Muggle Magic Section</h3>
        <h4>100 kr per week</h4>
        
        </div>
      <div className="box" onClick={() => handleSubscriptionSelect(2)}>
      <h3>Wizarding Wonders Wing</h3>
      <h4>200 kr per week</h4>
      </div>
      <div className="box" onClick={() => handleSubscriptionSelect(3)}>
      <h3>The Forbidden Archives</h3>
      <h4>300 kr per week</h4>
      </div>
      {selectedSubscription !== null && <CheckoutButton subscriptionLevel={selectedSubscription} />}
    </div></div>
  );
};
