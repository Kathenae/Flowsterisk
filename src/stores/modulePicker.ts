import { create } from 'zustand'
import {devtools, persist} from 'zustand/middleware'

interface ModulePickerState {
  isOpen: boolean
  toggle: () => void
}

export const useModulePickerState = create<ModulePickerState>()(
  devtools(
    persist(
      (set) => ({
        isOpen: false,
        toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      }),
      {
        name: 'bear-storage',
      }
    )
  )
)