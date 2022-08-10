import { createPinia } from 'pinia'

import { useMenuStore } from './modules/menu'
import { useSettingsStore } from './modules/settings'
import { userStore } from './modules/user'
import pinaPluginPersist from 'pinia-plugin-persist' // 持久化store

const pinia = createPinia()
pinia.use(pinaPluginPersist)

export { useMenuStore, useSettingsStore, userStore }
export default pinia
