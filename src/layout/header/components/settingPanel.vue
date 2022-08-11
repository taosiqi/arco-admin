<template>
  <div class="fixed">
    <a-drawer :visible="appStore.settingsPanel" @ok="handleOk" @cancel="handleOk" unmountOnClose>
      <template #title>设置面板</template>
      <div class="flex justify-between align-middle mb-2.5" v-show="false">
        <span class="settingContent-contne-title">标签页</span>
        <span class="settingContent-contne-parts">
            <a-switch v-model="appSettingStore.settingsTag" />
          </span>
      </div>
      <div class="flex justify-between align-middle mb-2.5">
        <span class="settingContent-contne-title">菜单栏</span>
        <span class="settingContent-contne-parts">
            <a-switch v-model="appSettingStore.settingsMenu" />
          </span>
      </div>
      <div class="flex justify-between align-middle mb-2.5">
        <span class="settingContent-contne-title">色弱模式</span>
        <span class="settingContent-contne-parts">
            <a-switch v-model="appSettingStore.settingsBlindness" />
          </span>
      </div>
    </a-drawer>
  </div>
</template>
<script lang='ts' setup>
import { useMenuStore, useSettingsStore } from '@/store/index';

const appStore = useMenuStore();
const appSettingStore = useSettingsStore();

// tag标签页开关
const handleOk = () => {
  appStore.settingsPanel = !appStore.settingsPanel;
}
</script>
