import { useState } from 'react'
import BaseModule from "./BaseModule";
import Button from '../Button';

export default function InboundRoute() {

   const [value, setValue] = useState(0)

   const tabs = {
      Basic: (
         <>
            <h1>Basic Settings</h1>
            <Button className='mt-2' primary onClick={() => setValue(value + 1)}>Increment {value}</Button>
         </>
      ),
      Advanced: (
         <>
            <h1>Advanced Settings</h1>
            <Button className='mt-2' primary onClick={() => setValue(value + 1)}>Increment {value}</Button>
         </>
      ),
      Extra: (
         <>
            <h1>Extra Settings</h1>
            <Button className='mt-2' primary onClick={() => setValue(value + 1)}>Increment {value}</Button>
         </>
      )
   }

   return (
      <BaseModule
         label="Inbound Route"
         tabs={tabs}
      />
   )
}