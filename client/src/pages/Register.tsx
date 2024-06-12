import React, { useState } from "react";
import "../style/Login.css";

export const Register = () => {
  const url = "http://localhost:3000/api/users/register";
  const successUrl = "http://localhost:5173/SuccessfullyRegistered";

  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();

  //should address be an interface? Object?
  const [address, setAddress] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !address || !password) {
      console.log("You must fill in all the inputs");
      alert("Please fill in all required fields before registering");
      return;
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          address: address,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.isRegistered) {
        console.log("User is registered");
        document.location.href = successUrl;
      }
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  console.log(firstName);

  return (
    <div className="register-container">
      <div className="container">
        <div className="form-container">
          <h2>Register</h2>
          <div>
            <label htmlFor="firstName">Name</label>
            <input
              type="firstName"
              name="firstName"
              id="firstName"
              onChange={handleFirstName}
              value={firstName}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Lastname</label>
            <input
              type="lastName"
              name="lastName"
              id="lastName"
              onChange={handleLastName}
              value={lastName}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleEmail}
              value={email}
              required
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="address"
              name="address"
              id="address"
              onChange={handleAddress}
              value={address}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handlePassword}
              value={password}
              required
            />
          </div>
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  );
};
