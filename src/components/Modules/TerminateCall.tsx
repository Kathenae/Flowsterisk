import BaseModule from "./BaseModule";


export default function TerminateCall() {
   return (
      <BaseModule 
         label="Terminate Call"
         tabs= {{
            Basic: (
               <>Basic Tab</>
            )
         }}
      />
   )
}