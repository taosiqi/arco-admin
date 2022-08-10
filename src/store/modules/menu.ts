import { defineStore } from 'pinia';
import router from '../../router';
import { sessionStorage } from '@/utils/storage';

interface MenuState {
  systemName: String;
  collapsed: Boolean;
  settingsPanel: Boolean;
  activeMenu: Array<string>;
  selectedMenu:Array<string>;
  tagList: Array<any>;
}

export const useMenuStore = defineStore('menu',{
  state: (): MenuState => {
    return {
      systemName: '榕树-Admin',
      collapsed: false,
      settingsPanel: false,
      activeMenu: ['/home'],
      selectedMenu: ['/home'],
      tagList: [{ name: "工作台", path: "/home" }]
    }
  },
  getters: {
    // selectedMenu: (state) => {
    //   return state.activeMenu
    // },
  },
  actions: {
    // 折叠器
    changeCollapsed(val: boolean) {
      this.collapsed = !this.collapsed;
    },
    // 设置面板
    changeSettingPanel(val: boolean) {
      this.settingsPanel = !this.settingsPanel;
    },
    // 设置选中的菜单
    changeSelectedMenu(val:string) {
      this.selectedMenu = [val];
    },

    // 新增一个标签
    addTagItem(val: any) {
      if (val.name !== '工作台') {
        let result = this.tagList.findIndex(item => item.name === val.name);
        if (result >= 0) {
          return
        } else {
          this.tagList.push(val)
        }
      }
    },
    // 移除一个标签
    removeTagItem(val: any) {
      // 限制了不能删除默认的工作台
      for (let i = 0; i < this.tagList.length; i++) {
        if(this.tagList[i].path == val) {
          this.tagList.splice(i, 1)
          router.push({ path: this.tagList[this.tagList.length - 1]['path'] })
        }
      }
    }
  },
  persist: {
    enabled: true // 只有修改了的才会做持久化缓存
  }
})

