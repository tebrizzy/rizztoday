export function safeGetFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key)
    if (!stored) return defaultValue
    return JSON.parse(stored)
  } catch (error) {
    console.error(`Failed to parse localStorage key "${key}":`, error)
    localStorage.removeItem(key)
    return defaultValue
  }
}

export function safeSetToLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Failed to save to localStorage key "${key}":`, error)
  }
}
