import { useState } from 'react'
import { Panel, useReactFlow } from "reactflow";
import Button from "../Button";
import { useFlowSelection } from './hooks';

export default function Controls(){
   const { zoomIn, zoomOut, fitView, getZoom, deleteElements, addNodes } = useReactFlow();
  const {getSelection, hasSelectedNodes} = useFlowSelection()
  const [zoomPercent, setZoomPercent] = useState(getZoom())

  const handleZoomIn = () => {
    zoomIn({duration: 300})
    setZoomPercent(getZoom())
  }

  const handleZoomOut = () => {
    zoomOut({duration: 300})
    setZoomPercent(getZoom())
  }

  const handleFit = () => {
    const duration = 1000
    const refreshRate = 100

    fitView({duration})
    const zoomRefresh = setInterval(() => {
      setZoomPercent(getZoom())
    }, refreshRate)

    setTimeout(() => clearInterval(zoomRefresh), duration + refreshRate)
  }

  const handleDelete = () => {
    const { selectedNodes, selectedEdges } = getSelection()
    deleteElements({nodes: selectedNodes, edges: selectedEdges})
  }

  const handleCopy = () => {
    const { selectedNodes } = getSelection()

    if(selectedNodes && selectedNodes.length > 0){
      const node = selectedNodes[0]
      const clone = { ...node }
      clone.position = { ...node.position }
      clone.position.x += 25
      clone.position.y += 25
      clone.selected = false
      clone.data = { ...node.data }
      clone.id = Math.random().toString() + "_clone"
      addNodes(clone)
      console.warn('TODO: Must make a deep copy of the node otherwise might corrupt original node data')
    }
  }

  return (
    <>
      <Panel position='bottom-left' className='flex'>
        <Button className='h-8 !py-0 mr-2' onClick={handleFit}><i className='i-carbon-center-square' /></Button>
        <Button className='h-8 !py-0 border-r-none rounded-r-none' onClick={handleZoomOut}><i className='i-carbon-subtract' /></Button>
        <Button className='h-8 !py-0 w-16 rounded-none' onClick={handleFit}>{Math.round(zoomPercent * 100) + "%"}</Button>
        <Button className='h-8 !py-0 border-l-none rounded-l-none' onClick={handleZoomIn}><i className='i-carbon-add' /></Button>

        <div className='ml-2 flex'>
          <Button className='h-8 !py-0 border-r-none rounded-r-none' onClick={() => zoomOut({ duration: 100 })}><i className='i-carbon-undo' /></Button>
          <Button className='h-8 !py-0 rounded-l-none' onClick={() => zoomOut({ duration: 100 })}><i className='i-carbon-redo' /></Button>
        </div>
      </Panel>
      <Panel position='bottom-center' className={`transition-all flex ${!hasSelectedNodes && '!-bottom-12'}`}>
        <Button className='h-8 !py-0 mr-2' onClick={handleCopy}><i className='i-carbon-copy' /></Button>
        <Button className='h-8 !py-0 mr-2'><i className='i-carbon-cut' /></Button>
        <Button danger className='h-8 !py-0 mr-2' onClick={handleDelete}><i className='i-carbon-delete' /></Button>
      </Panel>
    </>
  )

}