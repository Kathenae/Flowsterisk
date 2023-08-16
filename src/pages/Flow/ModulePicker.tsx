import { PropsWithChildren } from 'react'
import Button from '../../components/Button';
import { useModulePickerState } from './modulePickerStore';
import { Module } from '../../modules/types';
import modules from '../../modules';

function ModuleItem({ className, module }: PropsWithChildren<{ className?: string, module: Module}>) {
  
  const onDragStart = (event : React.DragEvent<HTMLButtonElement>) => {
    event.dataTransfer.setData("module", JSON.stringify(module));
  }
  
  return (
    <Button onDragStart={onDragStart} draggable className={`min-w-fit text-sm text-center ${className}`}>
      <i className={`${module.iconClass} text-2xl`} />
      <p>
        {module.label}
      </p>
    </Button>
  )
}

export default function ModulePicker() {
  const toggle = useModulePickerState((state) => state.toggle);
  const isOpen = useModulePickerState((state) => state.isOpen);

  return (
    <div className={`absolute top-0 h-full flex z-10 items-center pointer-events-none transition-all duration-300 ${isOpen? 'left-4' : '-left-100'}`}>
      <div className={`bg-white rounded-2xl border-gray-300 border shadow-lg h-150 w-80 pointer-events-auto`}>

        <div className='relative text-left pl-10'>
          <i className='i-carbon-application text-2xl absolute top-0 left-4 !p-1 border-none' />
          <h1 className='px-4 mt-4 text-lg font-semibold'>Modules</h1>
          <Button className='min-w-fit absolute -top-1 right-4 !p-1 border-none' onClick={toggle}>
            <i className='i-carbon-close text-2xl' />
          </Button>
        </div>

        <hr className='mt-2' />

        <div className='px-4 mt-4'>
          <div className='relative'>
            <input placeholder='Filter Modules' className='w-full px-2 py-1 border-2 border-gray-200 rounded-md focus:outline-none' type="text" />
            <i className='i-carbon-search text-gray-400 absolute top-2.5 right-2' />
          </div>
        </div>

        <div className='grid grid-cols-2 space px-4 mt-4 max-h-[77%] overflow-y-auto scrollable mx-1'>
          {Object.keys(modules).map((moduleType) => {
            const module = modules[moduleType]
            return (
              <ModuleItem key={moduleType} module={module} className='mb-4 mx-1 h-24' />
            )
          })}
        </div>

      </div>
    </div>
  )
}