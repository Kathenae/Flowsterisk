import React from 'react'
import { create } from 'zustand'
import { TabbedPaneElement } from '../../components/Tabs'

export interface InspectorTabs {
  [key : string] : React.JSX.Element
}

interface InspectorStore {
  isOpen: boolean
  toggle: () => void,
  setContent: (content: React.JSX.Element) => void,
  content?: React.JSX.Element,
  tabs?: TabbedPaneElement,
  setTabs: (tabs: TabbedPaneElement) => void,
  clearTabs: () => void,
  activeTabIndex?: string,
  setActiveTabIndex: (index : string) => void,
}

export const useInspectorStore = create<InspectorStore>()((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({isOpen: !state.isOpen})),
  setContent: (content: React.JSX.Element) => set(() => ({content, isOpen: true})),
  setTabs: (tabs: TabbedPaneElement) => set(() => ({tabs, isOpen: true})),
  clearTabs: () => set(() => ({tabs: undefined})),
  setActiveTabIndex: (index : string) => set(() => ({activeTabIndex: index}))
}))