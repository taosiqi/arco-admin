import { createPinia } from 'pinia'

import { useMenuStore } from './modules/menu'
import { useSettingsStore } from './modules/settings'
import { userStore } from './modules/user'

const pinia = createPinia()

export { useMenuStore, useSettingsStore, userStore }
export default pinia
