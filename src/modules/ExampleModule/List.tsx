// Component that will be used to show the list of specific modules instances on the module picker
import { useState, useEffect } from 'react'
import API from './API'
import { ModuleItem, ModuleList } from '../../pages/Flow/ModulePicker'
import modules from '..'
import { useInspectorStore } from '../../pages/Flow/InspectorStore'

export default function List(){

   const [items, setItems] = useState<{label : string, id : number}[]>([])
   const [filteredItems, setFilteredItems] = useState<{label : string, id : number}[]>([])
   const module = modules["ExampleModule"]
   const openInspector = useInspectorStore((state) => state.open)

   useEffect(() => {
      async function fetch(){
         const foundItems = (await API.list()) as {label : string, id: number}[]
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
               onClick={() => openInspector(<module.Detail key={item.id} />)}
               label={item.label} 
               module={module} 
            />
         ))}
      </ModuleList>
     </>
   )
}
