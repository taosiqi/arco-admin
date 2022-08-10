<template>
  <div class="tag-content">
    <a-tabs type="rounded"  :editable="true" @tab-click="handleAdd" @delete="handleDelete" auto-switch :active-key="routeActive">
      <a-tab-pane  v-for="(item, index) of menuStore.tagList" :key="item.path" :title="item.name" :closable="index!==0"/>
    </a-tabs>
  </div>
</template>
<script lang='ts' setup>
import { ref } from 'vue';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';
import { useMenuStore } from '@/store';
const router = useRouter();
const menuStore = useMenuStore();

const routeActive = ref(menuStore.selectedMenu[0] || '/home')

onBeforeRouteUpdate(to => {
  routeActive.value = to.path;
});

// 点击Tag
const handleAdd = (val: string) => {
  // menuStore.changeSelectedMenu(val)
  router.push({ path: val })
}

// 移除Tag
const handleDelete = (val: any) => {
  menuStore.removeTagItem(val)
}
</script>

<style lang="scss" scoped>
.tag-content {
  height: 38px;
  background: var(--color-bg-4);
  display: flex;
  align-items: center;
  position: relative;
  z-index: 20;
  box-shadow: 10px 5px 10px #0000001a;
}

// vue3最新样式穿透
:deep(.arco-tabs-content){
  display: none !important;
}
:deep(.arco-tabs-nav-type-rounded .arco-tabs-tab){
  border-radius: 0;
}
:deep(.arco-tabs-tab){
  background-color: var(--color-fill-2);
}
</style>
