import {useEffect, useState} from 'react'
import { Handle, Position } from 'reactflow'
import { InspectorTabs, useInspectorStore } from '../../pages/Flow/InspectorStore'

export type BaseModuleProps = {
   label: string,
   content?: React.JSX.Element,
   tabs?: InspectorTabs,
}

export default function BaseModule({content, tabs, label} : BaseModuleProps){

   const [active, setActive] = useState(false)
   const setInspectorContent = useInspectorStore((state) => state.setContent)
   const setInspectorActiveTab = useInspectorStore((state) => state.setActiveTabIndex)
   const setInspectorTabs = useInspectorStore((state) => state.setTabs)
   const clearInspectorTabs = useInspectorStore((state) => state.clearTabs)

   // Detect when content change and re-render
   useEffect(() => {
      if(content && active){
         setInspectorContent(content)
      }
   }, [content, setInspectorContent, active])

   useEffect(() => {
      if(tabs && active){
         setInspectorTabs(tabs)
      }
   }, [tabs, setInspectorTabs, active])
   
   const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()

      if(content){
         setInspectorContent(content)
         setActive(true)
      }
      else{
         setInspectorContent(<></>)
      }

      if(tabs){
         setInspectorActiveTab(Object.keys(tabs)[0])
         setInspectorTabs(tabs)
         setActive(true)
      }
      else{
         clearInspectorTabs()
      }
   }

   const className = `bg-white border-1 cursor-pointer hover:border-green-400 focus:border-green-400 focus:text-green-400 hover:text-green-400 
   rounded border-black p-2 w-48 text-center h-16 overflow-hidden flex items-center justify-center`

   return (
      <button 
         className={className}
         onClick={handleOnClick}
      >
         <h1>{label}</h1>
         <Handle id='1' type='source' position={Position.Right} />
         <Handle id='2' type='target' position={Position.Left} />
      </button>
   )
}