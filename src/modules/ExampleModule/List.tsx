// Component that will be used to show the list of specific modules instances on the module picker
import { useState, useEffect } from 'react'
import API, { ExampleInstance } from './API'
import { ModuleItem, ModuleList } from '../../components/flow/ModulePicker'
import modules from '..'
import { useInspectorStore } from '../../components/flow/InspectorStore'
import { Module } from '../types'

export default function List(){

   const [items, setItems] = useState<ExampleInstance[]>([])
   const [filteredItems, setFilteredItems] = useState<ExampleInstance[]>([])
   const module = modules["ExampleModule"] as Module<ExampleInstance>
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
               onClick={() => openInspector(<module.Detail key={item.id} module={{...module, instance: item}}/>)}
               label={item.label} 
               module={{...module, instance: item}}
            />
         ))}
      </ModuleList>
     </>
   )
}
