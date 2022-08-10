// 个人登录信息

import { defineStore } from 'pinia';

interface TypeUsers {
  token: string
}

export const userStore = defineStore({
  id: 'user',
  state: (): TypeUsers => {
    return {
      token: '123'
    }
  },
  getters: {},
  actions: {
    // 登录
    LoginUser(data: string) {
      return new Promise<void>((res) => {
        res()
      })
    },
    // 退出
    logoutUser() {
      return new Promise<void>((resolve) => {
        resolve()
      })
    }
  }
})
