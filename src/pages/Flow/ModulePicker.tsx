import { PropsWithChildren } from 'react'
import Button from '../../components/Button';
import { useModulePickerState } from './modulePickerStore';
import { ModuleType } from './Flow';

function ModuleItem({ className, text, icon, moduleType }: PropsWithChildren<{ className?: string, text: string, icon: string, moduleType: ModuleType}>) {
  
  const onDragStart = (event : React.DragEvent<HTMLButtonElement>) => {
    event.dataTransfer.setData("moduleType", moduleType);
  }
  
  return (
    <Button onDragStart={onDragStart} draggable className={`min-w-fit text-sm text-center ${className}`}>
      <i className={`${icon} text-2xl`} />
      <p>
        {text}
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
          <ModuleItem moduleType={ModuleType.InboundRoute} className='mb-4 mx-1 h-24' text="Inbound Route" icon="i-carbon-model-builder" />
          <ModuleItem moduleType={ModuleType.TerminateCall} className='mb-4 mx-1 h-24' text="Terminate Call" icon="i-carbon-phone-off" />
          <ModuleItem moduleType={ModuleType.Announcements} className='mb-4 mx-1 h-24' text="Announcements" icon="i-carbon-user-speaker" />
          <ModuleItem moduleType={ModuleType.InteractiveVoiceResponse} className='mb-4 mx-1 h-24' text="Interactive Voice Response" icon="i-carbon-model-builder" />
          <ModuleItem moduleType={ModuleType.Holidays} className='mb-4 mx-1 h-24' text="Holidays" icon="i-carbon-calendar" />
          <ModuleItem moduleType={ModuleType.Extension} className='mb-4 mx-1 h-24' text="Extension" icon="i-carbon-user" />
          <ModuleItem moduleType={ModuleType.DynamicDestination} className='mb-4 mx-1 h-24' text="Dynamic Destination" icon="i-carbon-flow-data" />
          <ModuleItem moduleType={ModuleType.CustomContext} className='mb-4 mx-1 h-24' text="Custom Context" icon="i-carbon-script" />
          <ModuleItem moduleType={ModuleType.CustomApplication} className='mb-4 mx-1 h-24' text="Custom Application" icon="i-carbon-phone-application" />
          <ModuleItem moduleType={ModuleType.Trunks} className='mb-4 mx-1 h-24' text="Trunks" icon="i-carbon-phone-ip" />
        </div>

      </div>
    </div>
  )
}