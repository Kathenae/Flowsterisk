import { useState } from 'react'
import { Panel, useReactFlow } from "reactflow";
import Button from "../../components/Button";

export default function Controls(){
   const { zoomIn, zoomOut, fitView, getZoom } = useReactFlow();
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

  return (
     <Panel position='bottom-left' className='flex'>
        <Button className='h-8 !py-0 dark:border-dark-100 mr-2' onClick={handleFit}><i className='i-carbon-center-square' /></Button>
        <Button className='h-8 !py-0 dark:border-dark-100 border-r-none rounded-r-none' onClick={handleZoomOut}><i className='i-carbon-subtract' /></Button>
        <Button className='h-8 !py-0 dark:border-dark-100 w-16 rounded-none' onClick={handleFit}>{Math.round(zoomPercent * 100) + "%"}</Button>
        <Button className='h-8 !py-0 dark:border-dark-100 border-l-none rounded-l-none' onClick={handleZoomIn}><i className='i-carbon-add' /></Button>

        <div className='ml-2'>
           <Button className='h-8 !py-0 dark:border-dark-100 border-r-none rounded-r-none' onClick={() => zoomOut({ duration: 100 })}><i className='i-carbon-undo' /></Button>
           <Button className='h-8 !py-0 dark:border-dark-100 rounded-l-none' onClick={() => zoomOut({ duration: 100 })}><i className='i-carbon-redo' /></Button>
        </div>
     </Panel>
  )

}