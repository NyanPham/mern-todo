export function getStorageValue<T>(key: string, defaultValue: any) {
    const jsonValue = localStorage.getItem(key)

    if (jsonValue != null) return JSON.parse(jsonValue) as T

    setStorageValue(key, defaultValue)
    return defaultValue
}

export function setStorageValue(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function removeStorageValue(key: string) {
    localStorage.removeItem(key)
}
