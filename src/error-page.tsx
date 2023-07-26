import { useRouteError } from "react-router-dom";

type Error = {
   status?: number,
   statusText?: string,
   message?: string,
}

export default function ErrorPage() {
   const error = useRouteError() as Error;
   console.error(error);

   return (
      <div className='w-screen h-screen overflow-hidden flex items-center justify-center'>
         <div className="text-center">
            <h1 className="text-3xl mb-12 font-bold">Oops!</h1>
            <p className="font-medium">Sorry, an unexpected error has occurred.</p>
            <p className="text-gray-400 mt-12">
               <i> {error.status? error.status + " - " : ""} {error.statusText || error.message}</i>
            </p>
         </div>
      </div>
   );
}