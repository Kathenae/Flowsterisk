// Component that will be used to show the list of specific modules instances on the module picker
import { useState, useEffect } from 'react'
import API from './API'
import { ModuleItem, ModuleList } from '../../pages/Flow/ModulePicker'
import modules from '..'
import { useInspectorStore } from '../../pages/Flow/InspectorStore'
import { Module, ModuleInstance } from '../types'

export default function List(){

   const [items, setItems] = useState<ModuleInstance[]>([])
   const [filteredItems, setFilteredItems] = useState<ModuleInstance[]>([])
   const module = modules["Extensions"] as Module<ModuleInstance>
   const openInspector = useInspectorStore((state) => state.open)

   useEffect(() => {
      async function fetch(){
         const foundItems = await API.list()
         setItems(foundItems)
         setFilteredItems(foundItems)
      }

      fetch()
   }, [])

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
