<template>
  <div class="container" @click="()=>tss.value=888">
    123
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const tss=ref(666)

</script>

