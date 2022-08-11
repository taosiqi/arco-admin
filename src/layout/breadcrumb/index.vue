<template>
  <div>
    <a-breadcrumb>
      <a-breadcrumb-item  v-for="item in breadcrumbList" :style="{color:item.path?'var(--color-text-1)':''}" @click="handleBack(item.path)" :class="{'cursor-pointer font-medium':item.path}">{{item.title}}</a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import {RouteLocationRaw, RouteRecordRaw, useRoute, useRouter} from 'vue-router';
const route = useRoute()
const router = useRouter()

let breadcrumbList = computed(() => {
  let matched=router.currentRoute.value.matched
  let result = [];
  for (let i = 1; i < route.matched.length; i++) {
    const moduleName = route.matched[i].meta.moduleName
    const title = route.matched[i].meta.title || ''
    if (!moduleName) {
      result.push({title,path:''});
    } else {
      //匹配页面标题
      // 通过title:matched[matched.length-2].children找到他的父级路由
      // find((item)=>item.path===moduleName)?.meta?.title，再从父级中找他当前的模块
      result.push({title:matched[matched.length-2].children.find((item)=>item.path===moduleName)?.meta?.title,path:moduleName},{title});
    }
  }
  return result;
})
const handleBack = (path: RouteLocationRaw) => {
  router.push(path)
}
</script>
