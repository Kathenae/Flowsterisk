import { useCallback, useState } from 'react';
import ReactFlow, { Background, Controls, Edge, EdgeChange, Node, NodeChange, ReactFlowInstance, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import TopMenu from './TopMenu';
import Inspector from './Inspector';
import ModulePicker from './ModulePicker';
import TerminateCall from '../../components/Modules/TerminateCall';
import InboundRoute from '../../components/Modules/InboundRoute';
import Announcement from '../../components/Modules/Announcement';
import interactiveVoiceResponse from '../../components/Modules/InteractiveVoiceResponse';
import Extension from '../../components/Modules/Extension';
import Holiday from '../../components/Modules/Holiday';
import DynamicDestination from '../../components/Modules/DynamicDestination';
import CustomContext from '../../components/Modules/CustomContext';
import CustomApplication from '../../components/Modules/CustomApplication';
import Trunk from '../../components/Modules/Trunk';

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

const nodeTypes = {
  [ModuleType.InboundRoute]: InboundRoute,
  [ModuleType.Extension]: Extension,
  [ModuleType.TerminateCall]: TerminateCall,
  [ModuleType.Trunks]: Trunk,
  [ModuleType.Announcements]: Announcement,
  [ModuleType.InteractiveVoiceResponse]: interactiveVoiceResponse,
  [ModuleType.DynamicDestination]: DynamicDestination,
  [ModuleType.CustomContext]: CustomContext,
  [ModuleType.CustomApplication]: CustomApplication,
  [ModuleType.Holidays]:Holiday,
}

const initialNodes : Node[] = [
  { id: '1', type: ModuleType.InboundRoute,  position: { x: 0, y: 0 }, data: { label: 'Inbound Route' } },
  { id: '2', type: ModuleType.Extension,  position: { x: 300, y: 0 }, data: { label: 'Extension' } },
  { id: '3', type: ModuleType.TerminateCall,  position: { x: 600, y: 0 }, data: { label: 'Terminate Call' } },
];
const initialEdges : Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '2', target: '3' },
];

export default function Flow() {

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [flowInstanse, setFlowInstance] = useState<ReactFlowInstance>();

  const onInit = (instance: ReactFlowInstance<unknown, unknown>) => {
    setFlowInstance(instance);
  }

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const moduleType = event.dataTransfer.getData("moduleType") as ModuleType;
    if (flowInstanse && moduleType) {

      const position = flowInstanse.project({
        x: event.clientX,
        y: event.clientY,
      });

      position.x -= 50;
      position.y -= 15;

      const newNodes = [...nodes];
      newNodes.push({ id: String(Math.random()), type: moduleType, position, data: { label: moduleType } });
      setNodes(newNodes);
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
  );
}