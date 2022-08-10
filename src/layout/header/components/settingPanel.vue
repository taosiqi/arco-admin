<template>
  <div class="fixed">
    <a-drawer :visible="appStore.settingsPanel" @ok="handleOk" @cancel="appStore.settingsPanel = false" unmountOnClose>
      <template #title>设置面板</template>
      <!-- 主题颜色 -->
      <div class="settingColor">
        <a-divider orientation="center">系统主题</a-divider>
        <ColorPicker
          theme="dark"
          :color="colors.color"
          :sucker-canvas="colors.suckerCanvas"
          :sucker-area="colors.suckerArea"
          @changeColor="changeColor"
        />
      </div>

      <!-- 内容区域 -->
      <div class="settingContent">
        <a-divider orientation="center">内容区域</a-divider>
        <div class="flex justify-between align-middle mb-2.5">
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
      </div>
    </a-drawer>
  </div>
</template>
<script lang='ts' setup>
import { reactive } from 'vue';
import { ColorPicker } from 'vue-color-kit';
import 'vue-color-kit/dist/vue-color-kit.css';
import { useMenuStore, useSettingsStore } from '@/store/index';

const appStore = useMenuStore();
const appSettingStore = useSettingsStore();

const colors = reactive({
  color: '#59c7f9',
  suckerCanvas: null,
  suckerArea: [],
  isSucking: false,
})

// 修改颜色
const changeColor = (color: any) => {
  const { r, g, b, a } = color.rgba;
  colors.color = `rgba(${r}, ${g}, ${b}, ${a})`;
  appSettingStore.changeColoe(colors.color)
}

// tag标签页开关
const handleOk = () => {
  appStore.settingsPanel = !appStore.settingsPanel;
}
</script>
