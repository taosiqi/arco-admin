// 个人登录信息

import { defineStore } from 'pinia';

export interface TypeUsers {
  token: string,
  permissions:{
    [propName: string]: {
      [propName: string]: string
    }
  }
}


export const userStore = defineStore('user',{
  state: (): TypeUsers => {
    return {
      token: 'token',
      permissions:{
        '/user':{
          '新增':'add',
          // '修改':'edit'
        }
      }
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
