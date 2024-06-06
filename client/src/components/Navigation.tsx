import { NavLink } from "react-router-dom";
import "../style/Navigation.css";
import { Logout } from "./Logout";
import { useUser } from "../context/UserContext";

export const Navigation = () => {
  const { user } = useUser();

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <button>Home</button>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Admin"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <button>Admin</button>
          </NavLink>
        </li>
        {user ?  (
        <><li>
          <NavLink
            to="/MyPage"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <button>My Page</button>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/MySubscriptions"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <button>My Subscriptions</button>
          </NavLink>
        </li><li><Logout /></li></>
        ) : (
        <>
           <li>
          <NavLink
            to="/Login"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <button>Login</button>
            
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Register"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <button>Register</button>
          </NavLink>
        </li>
        </>
        ) }
        
       
       {/* Dessa tre länkar nedan räcker att de ligger i Router.tsx 
        <li>
          <NavLink
            to="/SuccessfullyRegistered"
            className={({ isActive }) => (isActive ? "active" : "")}
          ></NavLink>
        </li>
        <li>
          <NavLink
            to="/SuccessfullyAddedBook"
            className={({ isActive }) => (isActive ? "active" : "")}
          ></NavLink>
        </li>
        <li>
          <NavLink
            to="/Confirmation"
            className={({ isActive }) => (isActive ? "active" : "")}
          ></NavLink>
        </li>*/}
      </ul>
    </nav>
  );
};
