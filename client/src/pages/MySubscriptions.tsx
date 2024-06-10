import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useLocation } from "react-router-dom";
import CheckoutButton from "../components/CheckOutButton";
import { EndSubscription } from "../components/EndSubscription";

export const MySubscriptions = () => {
  const { user } = useUser();
  const [loggedinUser, setLoggedinUser] = useState<string | null>(null);
  // const [userId, setUserId] = useState<string | null>(null);
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
  

  return (
    <div>
      <div><EndSubscription /> </div>
      <div>Logged in as: {user}</div>
      {/* <button onClick={getInformation}>Get information</button> */}
      <div className="home-Container">
        <h2>Choose your subsciptionlevel</h2>
        {fromLink && (
          <p>
            You arrived here via a link! To read that book you clicked on,
            upgrade to level: {levelId}
          </p>
        )}
        <div className="box" onClick={() => handleSubscriptionSelect(1)}>
          Muggle Magic Section
        </div>
        <div className="box" onClick={() => handleSubscriptionSelect(2)}>
          Wizarding Wonders Wing
        </div>
        <div className="box" onClick={() => handleSubscriptionSelect(3)}>
          The Forbidden Archives
        </div>
        {selectedSubscription !== null && (
          <CheckoutButton subscriptionLevel={selectedSubscription} />
        )}
      </div>
    </div>
  );
};
