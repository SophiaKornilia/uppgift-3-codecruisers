import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import "../style/app.css";

export const Layout = () => {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>&copy; 2024 My React App</footer>
    </div>
  );
};
