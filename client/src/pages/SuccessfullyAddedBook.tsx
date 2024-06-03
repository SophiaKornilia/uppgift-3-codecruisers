import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SuccessfullyRegistered = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("admin");
    }, 3000);
  });
  return (
    <div>
      You successfully added a book in the db, you will be directed to adminpage in a
      few seconds.
    </div>
  );
};
