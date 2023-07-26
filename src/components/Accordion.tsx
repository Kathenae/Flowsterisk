import { useEffect, useRef, useState } from 'react'

interface AccordionProps {
   label: string
   className?: string
}

export default function Accordion({ label, className, children }: React.PropsWithChildren<AccordionProps>) {
   const [isCollapsed, setCollapsed] = useState(true)
   const contentRef = useRef<HTMLDivElement>(null)
   const containerRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      if(contentRef.current && containerRef.current){
         contentRef.current.style.height = isCollapsed? "0px" : (containerRef.current.offsetHeight + 25) + "px"
      }

   }, [isCollapsed])

   const toggle = () => {
      setCollapsed(!isCollapsed);
   }

   return (
      <>
         <button className={`w-full py-2 text-left bg-white font-semibold hover:bg-light-200 flex border-t-1 ${className}`} onClick={toggle}>
            <i className={`text-2xl mr-1 i-carbon-caret-right transition-transform duration-300 ${!isCollapsed && "rotate-90"}`} />
            {label}
         </button>
         <div ref={contentRef} className={`w-full overflow-hidden duration-300 border-b-1 ${isCollapsed? "p-0" : "p-4"}`}>
            <div ref={containerRef} className='w-full'>
               {children}
            </div>
         </div>
      </>
   )
}