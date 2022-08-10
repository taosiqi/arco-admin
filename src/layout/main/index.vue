<template>
  <a-layout-content style="padding: 10px">
    <router-view v-slot="{ Component }">
      <transition :name="transitionName" mode="out-in">
         <keep-alive v-if="route.meta?.keepAlive">
          <component :is="Component" />
         </keep-alive>
        <component :is="Component" v-else/>
      </transition>
    </router-view>
  </a-layout-content>
</template>


<script lang="ts" setup>
import { ref } from 'vue'
import {useRoute} from "vue-router";
const route=useRoute()
const transitionName = ref('slide-left')
</script>

<style lang="scss" scoped>
.slide-left-enter-from {
	transform: translateX(20px);
	opacity: 0;
}

.slide-left-enter-to {
	transform: translateX(0px);
}

.slide-left-leave-from {
	transform: translateX(0);
}

.slide-left-leave-to {
	transform: translateX(20px);
	opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
	transition: all 0.3s;
}
</style>
