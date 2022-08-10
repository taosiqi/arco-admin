<template>
  <div class="container">
    <UserInfo />
    <div class="content">
      <UserSetting/>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import UserInfo from './components/userInfo.vue';
  import UserSetting from './components/userSetting.vue';
</script>

<style scoped lang="scss">
  .container {
    padding: 0 20px 20px 20px;
  }
</style>

<style lang="scss" scoped>
  .mobile {
    .content {
      display: block;
      &-left {
        margin-right: 0;
        margin-bottom: 16px;
      }
      &-right {
        width: 100%;
      }
    }
  }
</style>
