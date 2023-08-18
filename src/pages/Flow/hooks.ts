import { create } from 'zustand'
import { Edge, Node, OnSelectionChangeFunc, useOnSelectionChange, useReactFlow } from "reactflow"

type SelectionStore = {
   selectedNodes: Node[],
   selectedEdges: Edge[],
   setNodes: (selectedNodes : Node[]) => void,
   setEdges: (selectedEdges : Edge[]) => void,
}

const useSelectionStore = create<SelectionStore>((set) => ({
   selectedNodes: [] as Node[],
   selectedEdges: [] as Edge[],
   setNodes: (selectedNodes : Node[]) => set(() => ({selectedNodes})),
   setEdges: (selectedEdges : Edge[]) => set(() => ({selectedEdges})),
 }))

export function useFlowSelection(){

   // NOTE: By using a zustand store, we're able to handle multiple components using the useFlowSelection hook simultaneously and ensure that the most up-to-date selection information is accessible globally.
   const {selectedNodes, selectedEdges, setEdges, setNodes} = useSelectionStore()
   const {getNodes, getEdges} = useReactFlow()
   
   const handleSelectionChange : OnSelectionChangeFunc = ({nodes, edges}) => {
      setNodes(nodes)
      setEdges(edges)
   }
  
    useOnSelectionChange({ onChange: handleSelectionChange})

    const getSelection = () => {
      return {selectedNodes: getNodes().filter(n => n.selected), selectedEdges: getEdges().filter(e => e.selected)}
    }

    return {
      getSelection, 
      hasSelectedNodes: selectedNodes && selectedNodes?.length > 0, 
      hasSelectedEdges: selectedEdges && selectedEdges.length > 0,
   }
}