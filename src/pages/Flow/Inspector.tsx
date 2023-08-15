import Button from "../../components/Button";
import { useInspectorStore } from "./InspectorStore";

export default function Inspector() {
  const isOpen = useInspectorStore((state) => state.isOpen)
  const toggle = useInspectorStore((state) => state.toggle)
  const tabs = useInspectorStore((state) => state.tabs)

  return (
    <>
      <div className={`absolute top-0 select-none border h-full py-4 overflow-hidden z-10 bg-white shadow-lg transition-all duration-300 ${isOpen ? 'right-0 w-94' : '-right-24 w-0'}`}>
        <div className='relative'>
          <Button className='absolute -top-1 right-0 !p-1 border-none' onClick={() => toggle()}>
            <i className='i-carbon-close text-2xl' />
          </Button>
          <h1 className='font-semibold flex items-center text-lg pb-2 border-b-2 px-4'>
            <i className='i-carbon-data-1 mr-2' /> Module Settings
          </h1>
        </div>     
        {tabs}
      </div>
    </>
  )
}