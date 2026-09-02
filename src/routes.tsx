import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Flow from "./pages/Flow";
import ErrorPage from "./error-page";
import ProtectedLayout from "./components/ProtectedRoute";

const router = createBrowserRouter([
   {
      path: '/',
      errorElement: <ErrorPage />,
      children: [
         {
            path: "/login",
            element: <Login />
         },
         {
            element: <ProtectedLayout />,
            children: [
               {
                  path: "/",
                  element: <Home />
               },
               {
                  path: "/flow",
                  element: <Flow />
               },
            ]
         },
      ]
   }
])

export default router;