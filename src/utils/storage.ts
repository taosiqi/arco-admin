
const localStorage = {
  // 读取localStorage
  get: (key: string) => {
    try {
      return JSON.parse(window.localStorage.getItem(key) || '')
    } catch (err) {
      return window.localStorage.getItem(key)
    }
  },
  // 创建localStorage
  set: (key: string, value: any) => {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  // 移除指定localStorage
  remove: (key: string) => {
    window.localStorage.removeItem(key)
  },
  // 清空所有localStorage
  clear: () => {
    window.localStorage.clear()
  }
}

const sessionStorage = {
  // 读取sessionStorage
  get: (key: string) => {
    try {
      return JSON.parse(window.sessionStorage.getItem(key) || '')
    } catch (err) {
      return window.sessionStorage.getItem(key)
    }
  },
  // 创建sessionStorage
  set: (key: string, value: any) => {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  },
  // 移除指定sessionStorage
  remove: (key: string) => {
    window.sessionStorage.removeItem(key)
  },
  // 清空所有sessionStorage
  clear: () => {
    window.sessionStorage.clear()
  }
}

export { localStorage, sessionStorage }