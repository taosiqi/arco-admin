<template>
  <div>
    <a-row class="grid-demo" :gutter="24">
      <a-col :span="4">
        <a-menu
          :default-open-keys="['0']"
          :default-selected-keys="['0_0']"
          :style="{ width: '200px', borderRadius: '4px' }"
          @menuItemClick="onClickMenuItem">
          <a-sub-menu key="0">
            <a-menu-item key="0_0">个人信息</a-menu-item>
            <a-menu-item key="0_1">账号密码</a-menu-item>
            <a-menu-item key="0_2">消息通知</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-col>
      <a-col :span="18">
        <div class="content-item" v-show="datas.tabsActive == '0_0'">
          <a-form :model="loginUser">
            <a-form-item field="username" label="姓名" :rules="[{required:true,message:'这是必填的'}]" :validate-trigger="['change','input']">
              <a-input v-model="loginUser.username" placeholder="请输入账号 / 手机号 / 邮箱..." />
            </a-form-item>
            <a-form-item field="password" label="邮箱" :rules="[{required:true,message:'这是必填的'}]" :validate-trigger="['change','input']">
              <a-input v-model="loginUser.password" placeholder="请输入密码..." allow-clear/>
            </a-form-item>
            <div class="content-btn">
              <a-space>
                <a-button type="primary" html-type="submit">登录修改</a-button>
              </a-space>
            </div>
          </a-form>
        </div>
        <div v-show="datas.tabsActive == '0_1'">2</div>
        <div v-show="datas.tabsActive == '0_2'">3</div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang='ts' setup>
import { reactive } from 'vue';

interface datasType {
  tabsActive: string,
  tabs: string[]
}

const datas:datasType = reactive({
  tabsActive: '0_0',
  tabs: [
    '个人资料',
    '账号密码',
    '隐私设置',
  ]
})

const loginUser = reactive({
  username: 'BOSS Jin',
  password: ''
})

const onClickMenuItem = (index: string) => {
  datas.tabsActive = index
}
</script>
<style lang='scss' scoped>
.content {
  width: 100%;
  .content-item {
    width: 400px;
    padding: 30px;
    .content-btn {
      text-align: center;
    }
  }
  :deep(.arco-menu-inner){
    padding: 4px 0px !important;
  }
}
</style>
