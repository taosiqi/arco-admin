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
      <template v-for="item in data">
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
import {onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {useMenuStore} from '@/store';
import HeaderLine from './components/HeaderLine.vue';
import {getMenu} from '@/api/test';
import {useRequest} from '@/hooks/index';

const router = useRouter()
const appStore = useMenuStore()

const {data, loading, error, request} = useRequest({
  url: getMenu()
})

onMounted(() => {
  request()
})
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
