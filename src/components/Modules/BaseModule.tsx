import {useEffect, useState} from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import { useInspectorStore } from '../../pages/Flow/InspectorStore'
import modules from '../../modules'

export default function BaseModule({type, data} : NodeProps){

   const [active, setActive] = useState(false)
   const openInspector = useInspectorStore((state) => state.open)
   const refreshInspector = useInspectorStore((state) => state.set)
   const clearInspector = useInspectorStore((state) => state.clear)
   const module = modules[type]
   const details = module.Detail()

   // Detect when content change and re-render
   useEffect(() => {
      if(details && active){
         refreshInspector(details)
      }
   }, [details, refreshInspector, active])
   
   const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()

      if(module.Detail){
         openInspector(module.Detail())
         setActive(true)
      }
      else{
         clearInspector()
      }
   }

   const className = `bg-white border-1 cursor-pointer hover:border-green-400 focus:border-green-400 focus:text-green-400 hover:text-green-400 
   rounded border-black p-2 w-48 text-center h-16 overflow-hidden flex items-center justify-center`

   return (
      <button 
         className={className}
         onClick={handleOnClick}
      >
         <h1>{data.label}</h1>
         <Handle id='1' type='source' position={Position.Right} />
         <Handle id='2' type='target' position={Position.Left} />
      </button>
   )
}