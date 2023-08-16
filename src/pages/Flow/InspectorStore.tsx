import React from 'react'
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