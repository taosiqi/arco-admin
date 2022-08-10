import { defineStore } from 'pinia';
import router from '../../router';
import { sessionStorage } from '@/utils/storage';

interface MenuState {
  systemName: String;
  collapsed: Boolean;
  settingsPanel: Boolean;
  activeMenu: Array<string>;
  tagList: Array<any>;
}

export const useMenuStore = defineStore('menu',{
  state: (): MenuState => {
    return {
      systemName: '榕树-Admin',
      collapsed: false,
      settingsPanel: false,
      activeMenu: sessionStorage.get('activeMenu') || ['/home'],
      tagList: [{ name: "工作台", path: "/home" }]
    }
  },
  getters: {},
  actions: {
    // 折叠器
    changeCollapsed(val: boolean) {
      this.collapsed = !this.collapsed;
    },
    // 高亮选中菜单
    changeActiveMenu(val: string) {
      sessionStorage.set('activeMenu', [val])
    },
    // 设置面板
    changeSettingPanel(val: boolean) {
      this.settingsPanel = !this.settingsPanel;
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
  }
})

