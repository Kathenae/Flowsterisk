import { useCallback, useState } from 'react'
import ReactFlow, { Background, Connection, Edge, EdgeChange, Node, NodeChange, NodeProps, ReactFlowInstance, addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow'
import 'reactflow/dist/style.css'
import TopMenu from '../components/flow/TopMenu'
import Inspector from '../components/flow/Inspector'
import ModulePicker from '../components/flow/ModulePicker'
import { Module, ModuleInstance } from '../modules/types'
import modules from '../modules'
import Controls from '../components/flow/Controls'

const nodeTypes = {} as {
  [key: string] : (props: NodeProps) => React.JSX.Element
}

Object.values(modules).forEach((module) => {
  if(module.type && module.Node){
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
    let module = JSON.parse(event.dataTransfer.getData("module")) as Module<ModuleInstance>
    
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
  const onConnect = useCallback((connection: Connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]);

  return (
    <div className='w-screen h-screen overflow-hidden dark:bg-dark-400'>
      <ReactFlow
        onInit={onInit}
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodeChange}
        onEdgesChange={onEdgeChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        proOptions={{hideAttribution: true}}
      >
        <Background />
        <Controls />
      </ReactFlow>
      <TopMenu />
      <ModulePicker />
      <Inspector />
    </div>
  )
}