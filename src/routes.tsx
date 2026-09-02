import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Flow from "./pages/Flow";
import ErrorPage from "./error-page";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
   {
      path: '/',
      children: [
         {
            path: "/login",
            element: <Login />
         },
         {
            path: "/",
            element: (
               <ProtectedRoute>
                  <Home />
               </ProtectedRoute>
            )
         },
         {
            path: "/flow",
            element: (
               <ProtectedRoute>
                  <Flow />
               </ProtectedRoute>
            )
         },
      ],
      errorElement: <ErrorPage />
   }
])

export default router;