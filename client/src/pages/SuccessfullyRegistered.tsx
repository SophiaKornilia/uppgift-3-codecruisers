import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SuccessfullyRegistered = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("Login");
    }, 3000);
  });
  // const [levelId, setLevelId] = useState<string>();
  // const url = "http://localhost:3000/subscription";
  // const successUrl = "http://localhost:5173/MyPage";

  // const handleLevelId = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setLevelId(e.target.value);
  // };

  // console.log(levelId);

  // const handleClick = async () => {
  //     if (!levelId) {
  //       console.log("You must choose a subscriptionlevel");
  //       alert("Please choose a subscriptionlevel");
  //       return;
  //     }
  //     try {
  //       const response = await fetch(url, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           firstName: firstName,
  //           lastName: lastName,
  //         }),
  //       });
  //       const data = await response.json();
  //       if (data.isRegistered) {
  //         console.log("User is registered");
  //         document.location.href = successUrl;
  //       }
  //     } catch (error) {
  //       console.error("Something went wrong", error);
  //     }
  //   };

  return (
    <div>
      You were successfully registered, you will be directed to loginpage in a
      few seconds.
      {/* <div className="level-Container">
        <h2>Choose your subsciptionlevel</h2>
        <div className="box">
          <input
            type="radio"
            name="levelId"
            id="levelId1"
            onChange={handleLevelId}
            value={1}
          />
          <label htmlFor="levelId1">Muggle Magic Section</label>
        </div>
        <div className="box">
          <input
            type="radio"
            name="levelId"
            id="levelId2"
            onChange={handleLevelId}
            value={2}
          />
          <label htmlFor="levelId1">Wizarding Wonders Wing</label>
        </div>
        <div className="box">
          <input
            type="radio"
            name="levelId"
            id="levelId3"
            onChange={handleLevelId}
            value={3}
          />
          <label htmlFor="levelId1">The Forbidden Archives</label>
        </div>
      </div>
      <button onClick={handleClick}>Pay for my subscription</button> */}
    </div>
  );
};
