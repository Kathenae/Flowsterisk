import { useState } from 'react'
import { Edge, Node, OnSelectionChangeFunc, useOnSelectionChange, useReactFlow } from "reactflow"

export function useFlowSelection(){

   const [selectedNodes, setSelectedNodes] = useState<Node[]>()
   const [selectedEdges, setSelectedEdges] = useState<Edge[]>()
   const {getNodes, getEdges} = useReactFlow()
   
   const handleSelectionChange : OnSelectionChangeFunc = ({nodes, edges}) => {
      setSelectedNodes(nodes)
      setSelectedEdges(edges)
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