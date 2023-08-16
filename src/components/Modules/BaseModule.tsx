import { Handle, NodeProps, Position } from 'reactflow'
import { useInspector } from '../../pages/Flow/InspectorStore'
import { Module, ModuleInstance } from '../../modules/types'

export default function BaseModule({ data, id} : NodeProps){

   const module  = data as Module<ModuleInstance>
   const { openInspector } = useInspector(<module.Detail key={id} module={module}/>)

   const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()
      openInspector()
   }

   const className = `bg-white border-1 cursor-pointer hover:border-green-400 focus:border-green-400 focus:text-green-400 hover:text-green-400 
   rounded border-black w-38 h-42 text-center overflow-hidden flex flex-col items-center group`

   return (
      <button 
         className={className}
         onClick={handleOnClick}
      >
         <div className='w-full p-2 flex items-center justify-center border-b border-black group-hover:border-green-400'>
            <h1 className='whitespace-nowrap font-medium'>{module.label}</h1>
         </div>
         <div className='mt-4'>
            <p>{module.instance?.label ?? "New " + module.label}</p>
         </div>
         <i className={`${module.iconClass} mr-2 text-3xl text-gray-200 absolute bottom-3 group-hover:text-green-200`}/>
         <Handle id='1' type='source' position={Position.Right} />
         <Handle id='2' type='target' position={Position.Left} />
      </button>
   )
}