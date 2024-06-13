import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { UserProvider } from "./context/UserContext";


ReactDOM.createRoot(document.getElementById("root")!).render(
 
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  
);
