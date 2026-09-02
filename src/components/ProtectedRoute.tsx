import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../lib/auth";

export default function ProtectedLayout() {
   const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

   if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
   }

   return <Outlet />;
}
