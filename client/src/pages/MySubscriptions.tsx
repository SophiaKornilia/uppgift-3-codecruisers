import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useLocation } from "react-router-dom";

export const MySubscriptions = () => {
  const { user } = useUser();
  const [loggedinUser, setLoggedinUser] = useState<string | null>(null);
  // const [userId, setUserId] = useState<string | null>(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const levelId = queryParams.get("levelId");
  const [fromLink, setFromLink] = useState(false);

  useEffect(() => {
    if (location.state && location.state.fromLink) {
      setFromLink(true);
    }
  }, [location]);

  useEffect(() => {
    setLoggedinUser(user);
  }, [user]);

  console.log("MySubscriptions", user, loggedinUser);
  // const url = "http://localhost:3000/api/users/getUser";

  // const getInformation = async () => {
  //   try {
  //     const result = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         user: loggedinUser,
  //       }),
  //     });
  //     const resultData = await result.json();
  //     if (resultData.isASubscriber) {
  //       setUserId(resultData.userId);
  //     }
  //   } catch (error) {
  //     alert("Something went wrong!");
  //   }
  // };
  // console.log("userid", userId);

  return (
    <div>
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
        <button className="box">Muggle Magic Section</button>
        <button className="box">Wizarding Wonders Wing</button>
        <button className="box">The Forbidden Archives</button>
      </div>
    </div>
  );
};
