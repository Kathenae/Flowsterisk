// Component that will be used to show and edit the module details in the inspector, either when selected on the flow view or module picker

import Tabs from "../../components/Tabs";

export default function Detail(){
   return (
      <Tabs>
         <Tabs.Panel name="Basic">
            Basic
         </Tabs.Panel>
         <Tabs.Panel name="Advanced">
            Advanced
         </Tabs.Panel>
         <Tabs.Panel name="Extra">
            Extra
         </Tabs.Panel>
      </Tabs>
   )
}
