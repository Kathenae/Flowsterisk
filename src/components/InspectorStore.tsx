import React from 'react'
import { create } from 'zustand'

export interface InspectorTabs {
  [key : string] : React.JSX.Element
}

interface InspectorStore {
  isOpen: boolean
  toggle: () => void,
  setContent: (content: React.JSX.Element) => void,
  content?: React.JSX.Element,
  tabs?: InspectorTabs,
  setTabs: (tabs: InspectorTabs) => void,
  clearTabs: () => void,
  activeTabIndex?: string,
  setActiveTabIndex: (index : string) => void,
}

export const useInspectorStore = create<InspectorStore>()((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({isOpen: !state.isOpen})),
  setContent: (content: React.JSX.Element) => set(() => ({content, isOpen: true})),
  setTabs: (tabs: InspectorTabs) => set(() => ({tabs, isOpen: true})),
  clearTabs: () => set(() => ({tabs: undefined})),
  setActiveTabIndex: (index : string) => set(() => ({activeTabIndex: index}))
}))