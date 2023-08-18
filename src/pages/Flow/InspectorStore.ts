import React, { useEffect, useState } from 'react'
import { create } from 'zustand'

interface InspectorStore {
  isOpen: boolean
  content?: React.ReactElement,
  toggle: () => void,
  open: (content : React.ReactElement) => void,
  set: (content: React.ReactElement) => void,
  clear: () => void,
}

export const useInspectorStore = create<InspectorStore>()((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({isOpen: !state.isOpen})),
  clear: () => set(() => ({content: undefined})),
  open: (tabs: React.ReactElement) => set(() => ({content: tabs, isOpen: true})),
  set: (tabs: React.ReactElement) => set(() => ({content: tabs}))
}))

export const useInspector = (content : React.ReactElement) => {
  const [active, setActive] = useState(false) // Whether this specific inspector instance is active
  const toggle = useInspectorStore((state) => state.toggle)
  const open = useInspectorStore((state) => state.open)
  const refreshInspector = useInspectorStore((state) => state.set)
  
  useEffect(() => {
     if(content && active) {
        refreshInspector(content)
     }
  }, [content, active, refreshInspector])

  function openInspector(){
    if(content){
      open(content)
      setActive(true)
    }
  }

  function toggleInspector(){
    toggle()
  }

  return {openInspector, toggleInspector}
}