import { PropsWithChildren, useState } from 'react'
import Button from '../../components/Button'
import { useModulePickerState } from './modulePickerStore'
import { Module, ModuleInstance } from '../../modules/types'
import modules from '../../modules';

export function ModuleList({children, onFilter} : PropsWithChildren<{onFilter: (filter : string) => void}>) {

  const [filter, setFilter] = useState('')
  
  const handleOnChange = (value : string) => {
    setFilter(value)
    onFilter(value.toLowerCase())
  }

  return (
    <>
      <div className='px-4 mt-4'>
        <div className='relative'>
          <input value={filter} onChange={(event) => handleOnChange(event.target.value)} placeholder='Filter Modules' className='w-full px-2 py-1 border-2 border-gray-200 rounded-md focus:outline-none' type="text" />
          <i className='i-carbon-search text-gray-400 absolute top-2.5 right-2' />
        </div>
      </div>

      <div className='grid grid-cols-1 gap-2 px-4 mt-4 max-h-[77%] overflow-y-auto scrollable mx-1'>
        {children}
      </div>
    </>
  )
}

type ModuleItemProps<T extends ModuleInstance> = { 
  className?: string, 
  onClick : () => void, 
  label?: string, 
  module: Module<T> 
}

export function ModuleItem<T extends ModuleInstance>({ className, onClick, label, module }: PropsWithChildren<ModuleItemProps<T>>) {

  const onDragStart = (event : React.DragEvent<HTMLButtonElement>) => {
    event.dataTransfer.setData("module", JSON.stringify(module));
  }
  
  return (
    <Button onClick={onClick} onDragStart={onDragStart} draggable className={`min-w-fit text-sm flex flex-row items-center justify-start h-18 ${className}`}>
      <i className={`${module.iconClass} text-2xl`} />
      <p className='whitespace-normal max-w-54 ml-2 text-left mt-2 overflow-ellipsis overflow-hidden'>
        {label ?? module.label}
      </p>
    </Button>
  )
}


export default function ModulePicker() {
  const toggle = useModulePickerState((state) => state.toggle)
  const isOpen = useModulePickerState((state) => state.isOpen)
  const [activeModule, setActiveModule] = useState<Module<ModuleInstance> | null>()
  const [filteredModules, setFilteredModules] = useState(Object.values(modules)) 

  const handleOnFilter = (filter : string) => {
    const filtered = Object.values(modules).filter(m => m.label.toLowerCase().includes(filter))
    setFilteredModules(filtered)
  }

  return (
    <div className={`absolute top-0 h-full flex z-10 items-center pointer-events-none transition-all duration-300 ${isOpen? 'left-4' : '-left-100'}`}>
      <div className={`bg-white rounded-2xl border-gray-300 border shadow-lg h-150 w-80 pointer-events-auto`}>

        <div className='relative text-left pl-10'>
          {activeModule ?
            <Button className='min-w-fit absolute -top-1 left-4 !p-1 border-none' onClick={() => setActiveModule(null)}>
              <i className='i-carbon-arrow-left text-2xl border-none' />
            </Button> 
            :
            <i className='i-carbon-application text-2xl absolute top-0 left-4 !p-1 border-none' /> 
          }
          <h1 className='px-4 mt-4 text-lg font-semibold'>{activeModule?.label ?? 'Modules'}</h1>
          <Button className='min-w-fit absolute -top-1 right-4 !p-1 border-none' onClick={toggle}>
            <i className='i-carbon-close text-2xl' />
          </Button>
        </div>

        <hr className='mt-2' />

        {!activeModule &&
          <>
            <ModuleList onFilter={handleOnFilter}>
                {filteredModules.map((module) => {
                  return (
                    <ModuleItem onClick={() => setActiveModule(module)} key={module.type} module={module} />
                  )
                })}
            </ModuleList>
          </>
        }

          {activeModule?.List &&
            <activeModule.List module={activeModule} />
          }
      </div>
    </div>
  )
}