import { NavLink } from "react-router-dom";
import "../style/Login.css";
import { useState } from "react";

export const Login = () => {
  const url = "http://localhost:3000/Login"; //KATODO: change to live backend
  const successUrl = "MyPage";

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClick = async () => {
    try {
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const resultData = await result.json();

      if (resultData.isLoggedIn) {
        document.location.href = successUrl;
        console.log("Signed in");
      } else {
        alert("Unable to log in!");
        console.log("couldn´t sign in");
      }
    } catch (error) {
      alert("Something went wrong!");
    }
    
  };

  return (
    <div className="container">
      <div className="form-container">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleInputEmail}
            value={email}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleInputPassword}
            value={password}
            required
          />
        </div>
        <button onClick={handleClick}>Login</button>
      </div>
      <div>
        <h4>
          Not yet a member?{" "}
          <NavLink to="/register" className="register-link">
            Register
          </NavLink>
        </h4>
      </div>
    </div>
  );
};
