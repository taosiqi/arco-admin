<template>
  <a-layout-sider
      hide-trigger
      collapsible
      :collapsed="appStore.collapsed">
    <HeaderLine/>
    <a-menu
        :default-selected-keys="appStore.activeMenu"
        :style="{ width: '100%' }"
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
            <a-menu-item v-for="ite in item.children" :key="ite.path" @click="handleClickItem(ite)">
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
import {useRouter} from 'vue-router';
import {useMenuStore} from '@/store';
import HeaderLine from './components/HeaderLine.vue';
import {getMenu, Menu} from '@/api/test';
import {useRequest} from '@/hooks/index';

const router = useRouter()
const appStore = useMenuStore()
const defaultValue:Menu[]=[
  {
    "icon": "icon-settings",
    "name": "工作台",
    "path": "/home"
  },
  {
    "icon": "icon-settings",
    "name": "异常页",
    "path": "/error-page/403"
  },
  {
    "icon": "icon-settings",
    "name": "用户中心",
    "children": [
      {
        "name": "用户设置",
        "path": "/user"
      }
    ]
  }]
const {response, loading} = useRequest<Menu[]>(getMenu,defaultValue)

const onClickMenuItem = (key: any) => {
}
// 点击菜单
const handleClickItem = (item: any) => {
  if (item.path) {
    router.push({path: item.path})
    appStore.addTagItem(item)
  }
}
</script>
