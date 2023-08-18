import { Handle, NodeProps, Position } from 'reactflow'
import { useInspector } from '../pages/Flow/InspectorStore'
import { Module, ModuleInstance } from './types'
import {useEffect} from 'react'
import { useFlowSelection } from '../pages/Flow/hooks'

export default function BaseNode({ data, id, selected} : NodeProps){

   const module  = data as Module<ModuleInstance>
   const { openInspector, toggleInspector } = useInspector(<module.Detail key={id} module={module}/>)
   const { hasSelectedNodes } = useFlowSelection()

   const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()
      openInspector()
   }

   useEffect(() => {
      if(!selected && !hasSelectedNodes){
         toggleInspector()
      }
   }, [selected, hasSelectedNodes, toggleInspector])

   const className = `bg-white dark:bg-dark-400 dark:text-gray-100 border-1 dark:border-dark-100 cursor-pointer hover:border-brand-700 hover:text-brand-700 
   rounded border-black shadow-lg w-38 h-42 text-center overflow-hidden flex flex-col items-center group ${selected && '!border-brand-500 !text-brand-500'}`

   return (
      <button 
         className={className}
         onClick={handleOnClick}
      >
         <div className={`w-full p-2 flex items-center justify-center border-b border-black dark:border-dark-100 ${selected && '!border-brand-500'}  group-hover:border-brand-700`}>
            <h1 className='whitespace-nowrap font-medium'>{module.label}</h1>
         </div>
         <div className='mt-4'>
            <p>{module.instance?.label ?? "New " + module.label}</p>
         </div>
         <i className={`${module.iconClass} mr-2 text-3xl text-gray-200 absolute bottom-3 ${selected && '!text-brand-200'}  group-hover:text-brand-100`}/>
         <Handle id='1' type='source' position={Position.Right} />
         <Handle id='2' type='target' position={Position.Left} />
      </button>
   )
}