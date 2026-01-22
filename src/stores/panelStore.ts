import { useSyncExternalStore } from 'react'

export type PanelType = 'about' | 'cards' | 'testimonials' | null

let activePanel: PanelType = null
const listeners: Set<() => void> = new Set()

function notifyListeners() {
  listeners.forEach(listener => listener())
}

export const panelStore = {
  getState: () => activePanel,
  subscribe: (listener: () => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  toggle: (panel: PanelType) => {
    activePanel = activePanel === panel ? null : panel
    notifyListeners()
  },
  close: () => {
    activePanel = null
    notifyListeners()
  }
}

export function usePanelStore() {
  return useSyncExternalStore(panelStore.subscribe, panelStore.getState)
}
