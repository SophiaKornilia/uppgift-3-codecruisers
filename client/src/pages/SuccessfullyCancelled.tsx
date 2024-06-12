import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SuccessfullyCancelled = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("myPage");
    }, 3000);
  });
  return (
    <div>
      You successfully cancelled your subscription, you will have access to your account until due date. You will be directed to myPage in a
      few seconds.
    </div>
  );
};
