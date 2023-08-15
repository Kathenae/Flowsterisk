import { useState } from 'react'
import BaseModule from "./BaseModule";
import Button from '../Button';
import Tabs from '../Tabs';

export default function InboundRoute() {

   const [value, setValue] = useState(0)

   return (
      <BaseModule
         label="Inbound Route"
         tabs={
            <Tabs>
               <Tabs.Panel name='Basic'>
                  <h1>Basic Settings</h1>
                  <Button className='mt-2' primary onClick={() => setValue(value + 1)}>Increment {value}</Button>
               </Tabs.Panel>
               <Tabs.Panel name="Advanced">
                  <h1>Advanced Settings</h1>
                  <Button className='mt-2' primary onClick={() => setValue(value + 1)}>Increment {value}</Button>
               </Tabs.Panel>
               <Tabs.Panel name="Extra">
                  <h1>Extra Settings</h1>
                  <Button className='mt-2' primary onClick={() => setValue(value + 1)}>Increment {value}</Button>
               </Tabs.Panel>
            </Tabs>
         }
      />
   )
}