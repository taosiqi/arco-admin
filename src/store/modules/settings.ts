import { defineStore } from 'pinia';

interface TypeSettings {
  settingColor: string,
  settingsTag: boolean;
  settingsMenu: boolean;
  settingsBlindness: boolean;
}

export const useSettingsStore = defineStore({
  id: 'setting',
  state: (): TypeSettings => {
    return {
      settingColor: '#318DDD',
      settingsTag: true,
      settingsMenu: true,
      settingsBlindness: false
    }
  },
  getters: {},
  actions: {
    changeColoe(val: string) {
      this.settingColor = val
    }
  }
})

