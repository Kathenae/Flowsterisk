import { useCallback, useState } from 'react'
import ReactFlow, { Background, Controls, Edge, EdgeChange, Node, NodeChange, ReactFlowInstance, applyEdgeChanges, applyNodeChanges } from 'reactflow'
import 'reactflow/dist/style.css'
import TopMenu from './TopMenu'
import Inspector from './Inspector'
import ModulePicker from './ModulePicker'
import { Module } from '../../modules/types'
import modules from '../../modules'

export enum ModuleType {
  InboundRoute = "Inbound Route",
  TerminateCall = "Terminate Call",
  Announcements = "Announcements",
  InteractiveVoiceResponse = "Interactive Voice Response",
  Extension = "Extension",
  Holidays = "Holidays",
  DynamicDestination = "Dynamic Destination",
  CustomContext = "Custom Context",
  CustomApplication = "Custom Application",
  Trunks = "Trunks"
}

const nodeTypes = {} as {
  [key: string] : () => React.JSX.Element
}

Object.values(modules).forEach((module) => {
  if(module.type){
    nodeTypes[module.type] = module.Node
  }
})

const initialNodes : Node[] = [
]
const initialEdges : Edge[] = [
]

export default function Flow() {

  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)
  const [flowInstanse, setFlowInstance] = useState<ReactFlowInstance>()

  const onInit = (instance: ReactFlowInstance<unknown, unknown>) => {
    setFlowInstance(instance)
  }

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "copy"
  }

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    let module = JSON.parse(event.dataTransfer.getData("module")) as Module<unknown>
    
    if (flowInstanse && module && module.type) {

      // Component references (Detail, List, etc) will be lost after being parsed and must be added back from the module definitions
      module = {
        ...modules[module.type],
        ...module
      }

      const position = flowInstanse.project({
        x: event.clientX,
        y: event.clientY,
      })

      position.x -= 50
      position.y -= 15

      const newNodes = [...nodes]
      newNodes.push({ id: String(Math.random()), type: module.type, position, data: module })
      setNodes(newNodes)
    }
  }

  const onNodeChange = useCallback((changes : NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), [])
  const onEdgeChange = useCallback((changes : EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), [])

  return (
    <div className='w-screen h-screen overflow-hidden'>
      <ReactFlow
        onInit={onInit}
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodeChange}
        onEdgesChange={onEdgeChange}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Background />
        <Controls position='bottom-right' />
      </ReactFlow>
      <TopMenu />
      <ModulePicker />
      <Inspector />
    </div>
  )
}