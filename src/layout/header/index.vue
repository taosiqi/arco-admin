<template>
  <a-layout-header class="py-0 pl-3 pr-10 flex justify-between">
    <a-space class="system-head" size="medium">
      <a-tooltip content="收缩栏" position="bottom">
        <icon-menu-unfold class="icon" @click="onCollapse" v-if="appStore.collapsed"/>
        <icon-menu-fold class="icon" @click="onCollapse" v-else/>
      </a-tooltip>
      <BreadcrumbView/>
    </a-space>

    <a-space class="system-head" size="medium">
      <!-- 全屏 -->
      <a-tooltip :content="isFullscreen? '关闭全屏':'全屏'" position="bottom">
        <a-button @click="changeScreen" class="nav-btn" type="outline" shape="circle">
          <IconFullscreen/>
        </a-button>
      </a-tooltip>

      <!-- 主题切换 -->
      <a-tooltip :content="isLight ?'点击切换为暗黑模式':'点击切换为亮色模式'" position="bottom">
        <a-button class="nav-btn" type="outline" shape="circle" @click="settingsStore.changeTheme">
          <IconSunFill v-if="isLight"/>
          <IconMoonFill v-else/>
        </a-button>
      </a-tooltip>

      <!-- 设置面板 -->
      <a-tooltip content="设置" position="bottom" v-if="isDev">
        <a-button class="nav-btn" type="outline" shape="circle" @click="changeSettings">
          <icon-settings/>
        </a-button>
      </a-tooltip>

      <!-- 退出登录 -->
      <a-dropdown trigger="hover">
        <!--<a-button>卢本伟-->
        <!--   <icon-down/>-->
        <!--</a-button>-->
        <a-avatar :size="32">
          <img alt="avatar" class="block cursor-pointer" src="//lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png"/>
        </a-avatar>
        <template #content>
          <a-doption @click="userCenter()">
            <icon-user/>
            <span class="ml-2">个人中心</span>
          </a-doption>
          <a-doption @click="loginOut()">
            <icon-export/>
            <span class="ml-2">退出登录</span>
          </a-doption>
        </template>

      </a-dropdown>
    </a-space>

    <SettingPanel v-show="appStore.settingsPanel"/>
  </a-layout-header>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from 'vue';
import {IconSunFill, IconMoonFill, IconFullscreen} from '@arco-design/web-vue/es/icon';
import BreadcrumbView from '../breadcrumb/index.vue';
import SettingPanel from './components/settingPanel.vue';
import {useMenuStore, userStore, useSettingsStore} from '@/store';
import {useRouter} from 'vue-router';
import {Modal} from '@arco-design/web-vue';

// 全屏
import {useFullScreen} from '@/hooks/index';

const {isFullscreen, changeScreen} = useFullScreen();
const isDev = import.meta.env.DEV
const appStore = useMenuStore();
const appUser = userStore();
const settingsStore = useSettingsStore();
const router = useRouter();

// 收缩栏
const onCollapse = () => {
  appStore.changeCollapsed(!appStore.collapsed);
};

// 打开面板
const changeSettings = () => {
  appStore.changeSettingPanel(!appStore.settingsPanel);
};
const isLight = computed(()=>{
  return settingsStore.settingTheme==='light'
})
// 切换主题
watch(()=>settingsStore.settingTheme,()=>{
  if (isLight.value) {
    document.body.removeAttribute('arco-theme');
  } else {
    document.body.setAttribute('arco-theme', 'dark');
  }
},{
  immediate:true
})

// 个人中心
const userCenter = () => {
  router.push('/user');
}

// 退出登录
const loginOut = () => {
  Modal.warning({
    title: '提示',
    content: '确认退出登录？',
    hideCancel: false,
    onOk: () => {
      appUser.logoutUser().then(() => {
        router.replace('/login')
      })
    }
  })
}
</script>

<style scoped lang="scss">
.nav-btn, .arco-btn-outline:hover {
  border-color: rgb(var(--gray-2));
  color: rgb(var(--gray-8));
  font-size: 16px;
}

.icon {
  font-size: 22px;
  cursor: pointer;
  color: var(--color-text-1);
}
</style>
