<template>
  <a-layout-header class="py-0 pl-3 pr-10 flex justify-between">
    <a-space class="system-head" size="medium">
      <a-tooltip content="收缩栏" position="bottom">
        <icon-menu-unfold style="font-size: 22px; cursor: pointer" @click="onCollapse" v-if="appStore.collapsed"/>
        <icon-menu-fold style="font-size: 22px; cursor: pointer" @click="onCollapse" v-else/>
      </a-tooltip>
      <BreadcrumbView/>
    </a-space>

    <a-space class="system-head" size="medium">
      <!-- 全屏 -->
      <a-tooltip :content="isFullscreen? '关闭全屏':'全屏'" position="bottom">
        <a-button @click="changeScreen" class="nav-btn" type="outline"  shape="circle">
          <IconFullscreen/>
        </a-button>
      </a-tooltip>

      <!-- 主题切换 -->
      <a-tooltip content="主题切换" position="bottom">
        <a-button  class="nav-btn" type="outline" shape="circle" @click="changeTheme">
          <IconSunFill v-if="Themeflag"/>
          <IconMoonFill v-else/>
        </a-button>
      </a-tooltip>

      <!-- 设置面板 -->
      <a-tooltip content="设置" position="bottom">
        <a-button  class="nav-btn" type="outline" shape="circle" @click="changeSettings">
          <icon-settings/>
        </a-button>
      </a-tooltip>

      <!-- 退出登录 -->
      <a-dropdown trigger="hover">
<!--        <a-button>卢本伟-->
<!--          <icon-down/>-->
<!--        </a-button>-->
        <a-avatar :size="32">
          <img alt="avatar" src="//lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png"/>
        </a-avatar>
        <template #content>
          <a-doption @click="userCenter()">
            <icon-user />
            <span class="ml-2">个人中心</span>
          </a-doption>
          <a-doption @click="loginOut()">
            <icon-export/>
            <span class="ml-2">退出登录</span>
          </a-doption>
        </template>

      </a-dropdown>
    </a-space>

    <SettingPanel v-show="settingsFlag"/>
  </a-layout-header>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {IconCaretRight, IconCaretLeft, IconSunFill, IconMoonFill, IconFullscreen, IconNotification} from '@arco-design/web-vue/es/icon';
import BreadcrumbView from '../breadcrumb/index.vue';
import SettingPanel from './components/settingPanel.vue';
import {useMenuStore, userStore} from '@/store';
import {useRouter} from 'vue-router';
import {Modal} from '@arco-design/web-vue';

// 全屏
import {useFullScreen} from '@/hooks/index';

const {isFullscreen, changeScreen} = useFullScreen();

const appStore = useMenuStore();
const appUser = userStore();

const router = useRouter();

const Themeflag = ref(true);
const settingsFlag = ref(true);

// 收缩栏
const onCollapse = () => {
  appStore.changeCollapsed(!appStore.collapsed);
};

// 打开面板
const changeSettings = () => {
  appStore.changeSettingPanel(settingsFlag.value);
};

// 切换主题
const changeTheme = () => {
  Themeflag.value = !Themeflag.value;
  if (!Themeflag.value) {
    document.body.setAttribute('arco-theme', 'dark');
  } else {
    document.body.removeAttribute('arco-theme');
  }
}

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
.nav-btn,.arco-btn-outline:hover {
  border-color: rgb(var(--gray-2));
  color: rgb(var(--gray-8));
  font-size: 16px;
}
</style>
