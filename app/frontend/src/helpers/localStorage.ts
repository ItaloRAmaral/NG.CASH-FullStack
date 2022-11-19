const setLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

function getLocalStorage<T>(key: string): T | null {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : null
}

export { setLocalStorage, getLocalStorage };