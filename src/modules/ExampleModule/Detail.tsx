// Component that will be used to show and edit the module details in the inspector, either when selected on the flow view or module picker

import { useState } from "react";
import Button from "../../components/Button";
import Tabs from "../../components/Tabs";

export default function Detail(){
   const [basic, setBasic] = useState(0)
   const [advanced, setAdvanced] = useState(0)
   const [extra, setExtra] = useState(0)

   return (
   <Tabs>
      <Tabs.Panel name='Basic'>
         <h1>Basic Settings</h1>
         <Button className='mt-2' primary onClick={() => setBasic(basic + 1)}>Increment {basic}</Button>
      </Tabs.Panel>
      <Tabs.Panel name="Advanced">
         <h1>Advanced Settings</h1>
         <Button className='mt-2' primary onClick={() => setAdvanced(advanced + 1)}>Increment {advanced}</Button>
      </Tabs.Panel>
      <Tabs.Panel name="Extra">
         <h1>Extra Settings</h1>
         <Button className='mt-2' primary onClick={() => setExtra(extra + 1)}>Increment {extra}</Button>
      </Tabs.Panel>
   </Tabs>
   )
}
