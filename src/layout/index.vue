<template>
  <a-layout class="layout-demo">
    <!-- 侧栏及Logo -->
    <AsideView v-show="appSettingStore.settingsMenu" />
    <a-layout>
      <!-- 头部 -->
      <div class="layout-header">
        <HeaderView/>
        <TagNavView v-show="appSettingStore.settingsTag" />
      </div>
      <!-- 主题 -->
      <a-layout class="layout-main" id="basic-demo">
        <MainView/>
      </a-layout>
      <!-- 返回顶部 -->
      <a-back-top target-container="#basic-demo" :style="{position:'absolute'}" />
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import HeaderView from './header/index.vue';
import MainView from './main/index.vue';
import AsideView from './menu/index.vue';
import TagNavView from './tagnav/index.vue';
import { useSettingsStore } from '../store';

const appSettingStore = useSettingsStore()

// 色弱模式 变量控制style
const ColorBlindness = computed(() => {
  if (appSettingStore.settingsBlindness) {
    return 'invert(80%)'
  } else {
    return ''
  }
})
</script>

<style lang="scss" scoped>
.layout-demo {
  height: 100vh;
  background: var(--color-neutral-3);
  border: 1px solid var(--color-border);
  filter: v-bind(ColorBlindness);
  .layout-header {
    width: 100%;
    top: 0;
  }
  .layout-main {
    padding: 16px 20px;
    position: relative;
    overflow-y: auto
  }
}
.layout-demo :deep(.arco-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}
.layout-demo :deep(.arco-layout-sider-light) .logo{
  background: var(--color-fill-2);
}
.layout-demo :deep(.arco-layout-header)  {
  height: 64px;
  line-height: 64px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg-3);
}
.layout-demo :deep(.arco-layout-footer) {
  height: 48px;
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}
.layout-demo :deep(.arco-layout-content) {
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
}
.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content)  {
  font-size: 16px;
}

</style>
