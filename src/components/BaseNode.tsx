import { Handle, NodeProps, Position } from 'reactflow'
import { useInspector } from '../pages/Flow/InspectorStore'
import { Module, ModuleInstance } from '../modules/types'

export default function BaseNode({ data, id} : NodeProps){

   const module  = data as Module<ModuleInstance>
   const { openInspector } = useInspector(<module.Detail key={id} module={module}/>)

   const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()
      openInspector()
   }

   const className = `bg-white border-1 cursor-pointer hover:border-green-700 focus:border-green-500 focus:text-green-500 hover:text-green-700 
   rounded border-black shadow-lg w-38 h-42 text-center overflow-hidden flex flex-col items-center group`

   return (
      <button 
         className={className}
         onClick={handleOnClick}
      >
         <div className='w-full p-2 flex items-center justify-center border-b border-black group-focus:border-green-500 group-hover:border-green-700'>
            <h1 className='whitespace-nowrap font-medium'>{module.label}</h1>
         </div>
         <div className='mt-4'>
            <p>{module.instance?.label ?? "New " + module.label}</p>
         </div>
         <i className={`${module.iconClass} mr-2 text-3xl text-gray-200 absolute bottom-3 group-focus:text-green-200 group-hover:text-green-100`}/>
         <Handle id='1' type='source' position={Position.Right} />
         <Handle id='2' type='target' position={Position.Left} />
      </button>
   )
}