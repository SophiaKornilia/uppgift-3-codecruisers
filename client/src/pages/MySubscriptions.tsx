import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useLocation } from "react-router-dom";
import CheckoutButton from "../components/CheckOutButton";
import SubscriptionDetails from "../components/SubscriptionDetails";
import "../style/Home.css"

export const MySubscriptions = () => {
  const { user } = useUser();
  const [loggedinUser, setLoggedinUser] = useState<string | null>(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const levelId = queryParams.get("levelId");
  const [fromLink, setFromLink] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<
    number | null
  >(null);

  const handleSubscriptionSelect = (subscriptionLevel: number | null) => {
    setSelectedSubscription(subscriptionLevel);
  };

  useEffect(() => {
    if (location.state && location.state.fromLink) {
      setFromLink(true);
    }
  }, [location]);

  useEffect(() => {
    setLoggedinUser(user);
  }, [user]);

  console.log("MySubscriptions", user, loggedinUser, selectedSubscription);
  //My subscription
  // No subscription : You are subscribing on level "LKdäaa"

  //Payment
  //lägg retry knappen

  //Account
  //Cancel my account btn

  return (
    <div>
      <SubscriptionDetails />
     
      <div className="home-Container">
        <h2>Choose your subsciptionlevel</h2>
        {fromLink && (
          <p>
            You arrived here via a link! To read that book you clicked on,
            upgrade to level: {levelId}
          </p>
        )}
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
        {selectedSubscription !== null && (
          <CheckoutButton subscriptionLevel={selectedSubscription} />
        )}
      </div>
    </div>
  );
};
