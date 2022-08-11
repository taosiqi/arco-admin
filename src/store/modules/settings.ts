import { defineStore } from 'pinia';

interface TypeSettings {
  settingsTag: boolean;
  settingsMenu: boolean;
  settingsBlindness: boolean;
  settingTheme:'light' | 'dark'
}

export const useSettingsStore = defineStore('setting',{
  state: (): TypeSettings => {
    return {
      settingsTag: false,
      settingsMenu: true,
      settingsBlindness: false,
      settingTheme:'light',
    }
  },
  getters: {},
  actions: {
    changeTheme() {
      this.settingTheme = this.settingTheme==='dark'?'light':'dark'
    }
  },
  persist: {
    enabled: true // 只有修改了的才会做持久化缓存
  }
})

