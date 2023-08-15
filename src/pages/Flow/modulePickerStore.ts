import { create } from 'zustand'

interface ModulePickerStore {
  isOpen: boolean
  toggle: () => void
}

export const useModulePickerState = create<ModulePickerStore>()(
  (set) => ({
    isOpen: false,
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  })
)