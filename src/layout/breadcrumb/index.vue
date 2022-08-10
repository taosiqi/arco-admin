<template>
  <div>
    <a-breadcrumb>
      <a-breadcrumb-item  v-for="item in current">{{item}}</a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route=useRoute()
let current =computed(()=>{
  let result=[];
  for (let i = 1; i < route.matched.length; i++) {
    result.push(route.matched[i].meta.title);
  }
  return result;
})
</script>
