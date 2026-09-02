import Button from "../Button";
import { useInspectorStore } from "./InspectorStore";

export default function Inspector() {
  const isOpen = useInspectorStore((state) => state.isOpen)
  const toggle = useInspectorStore((state) => state.toggle)
  const content = useInspectorStore((state) => state.content)

  return (
    <>
      <div className={`absolute top-0 select-none border dark:border-dark-100 h-full py-4 overflow-hidden z-10 bg-white dark:bg-dark-400 !dark:text-gray-100 shadow-lg transition-all duration-300 ${isOpen ? 'right-0 w-94' : '-right-24 w-0'}`}>
        <div className='relative'>
          <Button className='absolute -top-1 right-2 !p-1 border-none dark:bg-dark-400 dark:hover:bg-dark-100' onClick={() => toggle()}>
            <i className='i-carbon-close text-2xl' />
          </Button>
          <h1 className='font-semibold flex items-center text-lg pb-2 border-b-2 dark:border-dark-100 px-4'>
            <i className='i-carbon-data-1 mr-2' /> Module Settings
          </h1>
        </div>     
        {content}
      </div>
    </>
  )
}