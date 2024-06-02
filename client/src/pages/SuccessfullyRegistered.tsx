import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SuccessfullyRegistered = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("Login");
    }, 3000);
  });
  return (
    <div>
      You were successfully registered, you will be directed to loginpage in a
      few seconds.
    </div>
  );
};
