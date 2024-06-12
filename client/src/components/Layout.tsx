import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";

export const Layout = () => {
  return (
    <div className="margin">
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>&copy; 2024 CodeCruisers</footer>
    </div>
  );
};
