import Button from "../components/Button";
import Input from "../components/Input";

export default function Login() {
   return (
      <div className='w-screen h-screen dark:text-gray-100 dark:bg-dark-400 overflow-hidden flex items-center justify-center'>
         <div className="p-6 shadow-lg rounded-lg border-1 dark:border-dark-100 w-lg">
            <div className="pb-4 mb-4 border-b-4 border-brand-400 text-center ">
               <h1 className="font-bold text-4xl mb-4 text-gray-600">PBX<span className="text-brand-400">Flow</span></h1>
               <p className="text-gray-400 text-sm">Welcome to PBXFlow, please login using your VitalPBX Credentials</p>
            </div>

            <div>
               <label className="block mb-2 font-medium" htmlFor="username">Username</label>
               <Input type="text" name="username" />
            </div>

            <div className="mt-4">
               <label className="block mb-2 font-medium" htmlFor="password">Password</label>
               <Input type="password" name="password" />
            </div>
           
            <div className="mt-4">
               <input className="mr-2" type="checkbox" name="remember_me" />
               <label htmlFor="remember_me">Remember me</label>
            </div>

            <div className="mt-12 border-t dark:border-dark-100 pt-4">
               <Button primary full>Login</Button>
            </div>
         </div>
      </div>
   );
}