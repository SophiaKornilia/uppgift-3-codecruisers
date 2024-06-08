interface CheckoutButtonProps {
  subscriptionLevel: number;
}
const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  subscriptionLevel,
}) => {
  const handleClick = async () => {
    const response = await fetch(
      "http://localhost:3000/api/payments/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscriptionLevel }),
        credentials: "include",
      }
    );

    const data = await response.json();
    localStorage.setItem("sessionId", JSON.stringify(data.sessionId));
    window.location = data.url;
    console.log("datasessionid",data.sessionId);
  };

  return (
    <button onClick={handleClick}>Subscribe to {subscriptionLevel}</button>
  );
};

export default CheckoutButton;
