// Component that will be used to show the list of specific modules instances on the module picker
import { useState, useEffect } from 'react'
import { Module, ModuleInstance } from './types'
import { useInspectorStore } from '../pages/Flow/InspectorStore'
import { ModuleItem, ModuleList } from '../pages/Flow/ModulePicker'

type BaseListProps = {
   module : Module<ModuleInstance>
}

export default function BaseList({module} : BaseListProps){

   const [items, setItems] = useState<ModuleInstance[]>([])
   const [filteredItems, setFilteredItems] = useState<ModuleInstance[]>([])
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
