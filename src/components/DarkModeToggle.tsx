import { useState } from 'react'
import Button from "./Button"

export default function DarkModeToggle(){

   const body = document.querySelector('body') as HTMLBodyElement
   const [isDark, setIsDark] = useState(body.classList.contains('dark'))

   const handleClick = () => {
      body.classList.toggle('dark')
      setIsDark(body.classList.contains('dark'))
   }

   return (
      <Button onClick={handleClick} className='w-10 h-10'>
         <i className={`${isDark? 'i-carbon-sun' : 'i-carbon-moon'}`} />
      </Button>
   )
}