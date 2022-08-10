<template>
  <a-layout-sider
      hide-trigger
      collapsible
      :collapsed="appStore.collapsed">
    <HeaderLine/>
    <a-menu
        :auto-open-selected="true"
        v-model:default-selected-keys="appStore.activeMenu"
        v-model:selected-keys="appStore.selectedMenu"
        :style="{ width: '100%' }"
        :level-indent='30'
        @menuItemClick="onClickMenuItem">
      <!-- 加载中 -->
      <div class="text-center" v-if="loading">
        <a-spin tip="加载中"></a-spin>
      </div>
      <template v-for="item in response">
        <a-sub-menu :key="item.path" v-if="item.children && item.children.length">
          <template #title>
            <component :is="item.icon"/>
            {{ item.name }}
          </template>
          <template v-if="item.children && item.children.length">
            <a-menu-item  v-for="ite in item.children" :key="ite.path" @click="handleClickItem(ite)">
              <component :is="ite.icon"/>
              {{ ite.name }}
            </a-menu-item>
          </template>
        </a-sub-menu>
        <template v-else>
          <a-menu-item :key="item.path" @click="handleClickItem(item)">
            <component :is="item.icon"/>
            {{ item.name }}
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts" setup>
import {computed, onMounted, watch} from 'vue';
import {useRouter,onBeforeRouteUpdate} from 'vue-router';
import {useMenuStore} from '@/store';
import HeaderLine from './components/HeaderLine.vue';
import {getMenu, Menu} from '@/api/test';
import {useRequest} from '@/hooks/index';
const menuStore = useMenuStore();
const router = useRouter()
const appStore = useMenuStore()
//匹配选中的菜单
onBeforeRouteUpdate(async (to, from) => {
  // console.log(to)
  // if (to.path) {
  //   // router.push({path: item.path})
  //   appStore.addTagItem({name:to.meta.title,path:to.path})
  // }
  const deep = (menu:Menu[]) => {
    menu.forEach(({path,children})=>{
      if(path===to.path){
        menuStore.changeSelectedMenu(to.path)
      }
      if(children?.length){
        deep(children)
      }
    })
  }
  deep(defaultValue)
})




const defaultValue:Menu[]=[
  {
    "icon": "icon-settings",
    "name": "仪表盘",
    "children": [
      {
        "name": "工作台",
        "path": "/home"
      }
    ]
  },
  {
    "icon": "icon-settings",
    "name": "用户中心",
    "children": [
      {
        "name": "个人中心",
        "path": "/user/list"
      },
      {
        "name": "异常页面",
        "path": "/error-page/404"
      }
    ]
  }]
const {response, loading} = useRequest<Menu[]>(getMenu,defaultValue)

const onClickMenuItem = (key: any) => {
}
// 点击菜单
const handleClickItem = (item: any) => {
  console.log(item)
  if (item.path) {
    router.push({path: item.path})
    appStore.addTagItem(item)
  }
}
</script>
