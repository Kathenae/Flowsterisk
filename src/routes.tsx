import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Flow from "./pages/Flow/Flow";
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
            path: "/view",
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