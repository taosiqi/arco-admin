<template>
  <div class="header">
    <div class="header-content">
      <i class="header-content-icon"><icon-bytedance-color /></i>
      <span class="header-content-title" :style="{ color: appSettingStore.settingColor }" v-if="!appStore.collapsed">{{appStore.systemName}}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useSettingsStore, useMenuStore } from '@/store';
const appStore = useMenuStore()
const appSettingStore = useSettingsStore()
</script>

<style lang="scss" scoped>
.header {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e5e7eb;
  .header-content {
    display: flex;
    align-items: center;
    .header-content-icon {
      width: 2em;
      height: 2em;
      svg {
        width: 100%;
        height: 100%;
      }
    }
    .header-content-title {
      font-weight: 700;
      font-size: 16px;
      padding-left: 10px
    }
  }

}
</style>
