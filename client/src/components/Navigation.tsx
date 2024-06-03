import { NavLink } from "react-router-dom";
import "../style/Navigation.css";
import { Logout } from "./Logout";
export const Navigation = () => {
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
        <li>
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
        </li>
        <li>
          <NavLink
            to="/Login"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <button>Login</button>
            <Logout />
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
        <li>
          <NavLink
            to="/SuccessfullyRegistered"
            className={({ isActive }) => (isActive ? "active" : "")}
          ></NavLink>
        </li>
      </ul>
    </nav>
  );
};
