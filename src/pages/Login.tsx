import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuthStore } from "../lib/auth";

export default function Login() {
   const navigate = useNavigate();
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const { isLoading, error, login } = useAuthStore((state) => ({
      isLoading: state.isLoading,
      error: state.error,
      login: state.login,
   }));

   const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();

      const success = await login({ username, password });

      if (success) {
         // Login successful
         navigate("/");
      } else {
         // Login failed - error is already in store
         setPassword("");
      }
   };

   return (
      <div className="w-screen h-screen dark:text-gray-100 dark:bg-dark-400 overflow-hidden flex items-center justify-center">
         <div className="p-6 shadow-lg rounded-lg border-1 dark:border-dark-100 w-lg">
            <div className="pb-4 mb-4 border-b-4 border-brand-400 text-center">
               <h1 className="font-bold text-4xl mb-4 text-gray-600">
                  PBX<span className="text-brand-400">Flow</span>
               </h1>
               <p className="text-gray-400 text-sm">
                  Welcome to PBXFlow, please login using your VitalPBX Credentials
               </p>
            </div>

            <form onSubmit={handleLogin}>
               <div>
                  <label className="block mb-2 font-medium" htmlFor="username">
                     Username
                  </label>
                  <Input
                     type="text"
                     name="username"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     disabled={isLoading}
                     placeholder="Enter your username"
                  />
               </div>

               <div className="mt-4">
                  <label className="block mb-2 font-medium" htmlFor="password">
                     Password
                  </label>
                  <Input
                     type="password"
                     name="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     disabled={isLoading}
                     placeholder="Enter your password"
                  />
               </div>

               <div className="mt-4">
                  <input
                     className="mr-2"
                     type="checkbox"
                     name="remember_me"
                     disabled={isLoading}
                  />
                  <label htmlFor="remember_me">Remember me</label>
               </div>

               {error && (
                  <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 rounded-md text-sm">
                     {error}
                  </div>
               )}

               <div className="mt-12 border-t dark:border-dark-100 pt-4">
                  <Button
                     primary
                     full
                     type="submit"
                     disabled={isLoading}
                  >
                     {isLoading ? "Logging in..." : "Login"}
                  </Button>
               </div>
            </form>
         </div>
      </div>
   );
}