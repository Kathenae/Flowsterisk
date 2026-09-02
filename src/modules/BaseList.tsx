// Component that will be used to show the list of specific modules instances on the module picker
import { useState, useEffect } from 'react'
import { Module, ModuleInstance } from './types'
import { useInspectorStore } from '../components/flow/InspectorStore'
import { ModuleItem, ModuleList } from '../components/flow/ModulePicker'

type BaseListProps<T extends ModuleInstance> = {
   module : Module<T>
}

export default function BaseList<T extends ModuleInstance>({module} : BaseListProps<T>){

   const [items, setItems] = useState<T[]>([])
   const [filteredItems, setFilteredItems] = useState<T[]>([])
   const openInspector = useInspectorStore((state) => state.open)

   useEffect(() => {
      async function fetch(){
         const foundItems = await module.API.list()
         setItems(foundItems)
         setFilteredItems(foundItems)
      }

      fetch()
   }, [module.API])

   const handleOnFilter = (filter : string) => {
      setFilteredItems(items.filter(item => !!item.label.toLowerCase().match(filter)))
   }

   return (
     <>
      <ModuleList onFilter={handleOnFilter}>
         {filteredItems.map(item => (
            <ModuleItem 
               key={item.id}
               onClick={() => openInspector(<module.Detail key={item.id} module={{...module, instance: item}} />)}
               label={item.label} 
               module={{...module, instance: item}} 
            />
         ))}
      </ModuleList>
     </>
   )
}
