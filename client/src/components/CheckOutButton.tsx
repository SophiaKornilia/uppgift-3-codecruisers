import { useUser } from "../context/UserContext";


interface CheckoutButtonProps {
  subscriptionLevel: number;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  subscriptionLevel,
}) => {
  const { user } = useUser();


  const handleClick = async () => {
    if (!user) {
      console.error("User is not defined");
      return;
    }

    const response = await fetch(
      "http://localhost:3000/api/payments/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscriptionLevel, user }),
        credentials: "include",
      }
    );

    const data = await response.json();
    console.log(data);
    localStorage.setItem("sessionId", JSON.stringify(data.id))

    if (data.url) {
      window.location.href = data.url; // Redirect to Stripe checkout page
    } else {
      console.error("No URL found in the response");
    }
    //console.log("datasessionid",data.sessionId);
  };

  return (
    <button onClick={handleClick}>Subscribe to {subscriptionLevel}</button>
  );
};

export default CheckoutButton;