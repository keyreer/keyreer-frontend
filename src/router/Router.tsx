import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Keyword from "../pages/Keyword";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/keyword", element: <Keyword /> },
]);

export default router;
