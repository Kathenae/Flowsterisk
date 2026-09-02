import Button from '../Button'
import DarkModeToggle from '../DarkModeToggle';
import { useInspectorStore } from './InspectorStore';
import { useModulePickerState } from './modulePickerStore';

export default function TopMenu() {

  const toggleModuleSettings = useInspectorStore((state) => state.toggle);
  const toggleModulePicker = useModulePickerState((state) => state.toggle);

  return (
    <div className='absolute top-0 py-2 z-10 w-full !dark:text-gray-100'>
      <div className='relative'>
        <div className='flex relative items-center px-4'>
          <div className='flex overflow-x-hidden space-x-2 scrollable px-2 rounded-md'>
            <Button className='flex !items-center h-10 mr-12' onClick={toggleModulePicker}>
              <i className='i-carbon-open-panel-filled-left text-lg mr-2' /> Module Picker
            </Button>
          </div>

          <div className='ml-auto flex items-center px-4'>
            <button className='px-4 py-1 bg-transparent hover:font-medium'>File</button>
            <button className='px-4 py-1 bg-transparent hover:font-medium'>Edit</button>
            <button className='px-4 py-1 bg-transparent hover:font-medium'>Select</button>
            <button className='px-4 py-1 bg-transparent hover:font-medium'>View</button>
            <button className='px-4 py-1 bg-transparent hover:font-medium'>Help</button>
          </div>

          <div className='ml-auto'>
            <DarkModeToggle />
            <Button  className='ml-2 w-10 h-10'>
              <i className='i-carbon-user' />
            </Button>
            <Button className='ml-2 w-10 h-10' onClick={toggleModuleSettings}>
              <i className='i-carbon-open-panel-filled-right' />
            </Button>
          </div>
        </div>
      </div>
    </div >
  )
}