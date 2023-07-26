import Button from "./Button";
import { useInspectorStore } from "./InspectorStore";

export default function Inspector() {
  const isOpen = useInspectorStore((state) => state.isOpen)
  const toggle = useInspectorStore((state) => state.toggle)
  const tabs = useInspectorStore((state) => state.tabs)
  const activeTabIndex = useInspectorStore((state) => state.activeTabIndex)
  const setActiveTabIndex = useInspectorStore((state) => state.setActiveTabIndex)
  const children = useInspectorStore((state) => state.content)

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
        
        {tabs && 
          <>
            <div className='flex border-b-1 border-gray-300 text-sm max-w-full scrollable overflow-x-auto'>
              {Object.keys(tabs).map((tabKey) => (
                <button
                  key={tabKey}
                  onClick={() => setActiveTabIndex(tabKey)}
                  className={`py-2 px-4 bg-transparent font-semibold ${tabKey === activeTabIndex && 'border-b-6 border-green-500'}`}
                >
                  {tabKey}
                </button>
              ))}
            </div>
          </>
        }
        <div className={`mt-2 max-h-[calc(100vh_-_110px)] overflow-auto scrollable px-2`}>
          {(tabs && activeTabIndex !== undefined) && tabs[activeTabIndex]}
          {!tabs && children}
        </div>
      </div>
    </>
  )
}