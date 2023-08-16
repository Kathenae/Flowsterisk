import { Handle, NodeProps, Position } from 'reactflow'
import { useInspector } from '../../pages/Flow/InspectorStore'
import modules from '../../modules'

export default function BaseModule({type, data, id} : NodeProps){

   const module = modules[type]
   const Detail = module.Detail
   const { openInspector } = useInspector(<Detail key={id} />)

   const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()
      openInspector()
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