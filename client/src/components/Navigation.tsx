import { NavLink } from "react-router-dom";
import "../style/Navigation.css";
import { Logout } from "./Logout";
import { useUser } from "../context/UserContext";

export const Navigation = () => {
  const { user } = useUser();

  return (
    <nav>
      {user ?  (
        <>
      <ul>
        <li className="loggedInUser">
        {user}
        </li>
        </ul>
      <ul>
        <li>
          <NavLink
            to="/MyPage"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <button>My Book Shelf</button>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/MySubscriptions"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <button>My Account</button>
          </NavLink>
        </li>
        <li><Logout /></li>
        </ul>
        </>
      ) : (
        <>
        <ul></ul>
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
        </ul>
        </>
      )}
    </nav>
  );
};
