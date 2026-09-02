import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Flow from "./pages/Flow";
import ErrorPage from "./error-page";

const router = createBrowserRouter([
   {
      path: '/',
      children: [
         {
            path: "/",
            element: <Home />
         },
         {
            path: "/flow",
            element: <Flow />
         },
         {
            path: "/login",
            element: <Login />
         },
      ],
      errorElement: <ErrorPage />
   }
])

export default router;