<template>
  <div>
    <div>123</div>
    <div class="container"  v-permission="['edit']">
      123
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {usePowerList} from "@/hooks";
const tss=ref(666)

</script>

