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

// const nodeTypes = {
//   [ModuleType.InboundRoute]: InboundRoute,
//   [ModuleType.Extension]: Extension,
//   [ModuleType.TerminateCall]: TerminateCall,
//   [ModuleType.Trunks]: Trunk,
//   [ModuleType.Announcements]: Announcement,
//   [ModuleType.InteractiveVoiceResponse]: interactiveVoiceResponse,
//   [ModuleType.DynamicDestination]: DynamicDestination,
//   [ModuleType.CustomContext]: CustomContext,
//   [ModuleType.CustomApplication]: CustomApplication,
//   [ModuleType.Holidays]:Holiday,
// }

const nodeTypes = {} as {
  [key: string] : () => React.JSX.Element
}

Object.values(modules).forEach((module) => {
  nodeTypes[module.type] = module.Node
})

const initialNodes : Node[] = [
  { id: '1', type: "ExampleModule",  position: { x: 0, y: 0 }, data: { label: 'Inbound Route' } },
  { id: '2', type: "ExampleModule",  position: { x: 300, y: 0 }, data: { label: 'Extension' } },
  { id: '3', type: "ExampleModule",  position: { x: 600, y: 0 }, data: { label: 'Terminate Call' } },
]
const initialEdges : Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '2', target: '3' },
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
    const module = JSON.parse(event.dataTransfer.getData("module")) as Module
    if (flowInstanse && module) {

      const position = flowInstanse.project({
        x: event.clientX,
        y: event.clientY,
      })

      position.x -= 50
      position.y -= 15

      const newNodes = [...nodes]
      newNodes.push({ id: String(Math.random()), type: module.type, position, data: { label: module.label } })
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