import Tabs from "../Tabs";
import BaseModule from "./BaseModule";


export default function TerminateCall() {
   return (
      <BaseModule 
         label="Terminate Call"
         tabs=
         {
            <Tabs>
               <Tabs.Panel name="Terminate Call">
                  Terminate Call
               </Tabs.Panel>
            </Tabs>
         }
      />
   )
}