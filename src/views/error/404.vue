<template>
  <div class="text-center ">
    <div v-if="route.params.id" >
      <img class="w-80 h-auto mt-5" :src="pageMap[route.params.id]" >
    </div>
    <div v-else>
      <img class="w-80 h-auto mt-5" src="../../assets/image/404.svg" >
    </div>
    <div class="text-size-[30px] font-semibold leading-relaxed">{{route.params.id}}</div>
    <div class="text-size-[20px] mt-3 mb-3">抱歉，您访问的页面不存在</div>
    <a-button class="error-back" type="primary" @click="backHome">返回首页{{countDownTime}}</a-button>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive, onMounted, onUnmounted }  from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Page403 from '../../assets/image/403.svg'
import Page404 from '../../assets/image/404.svg'
import Page500 from '../../assets/image/500.svg'

const route: any = useRoute()
const router = useRouter()

onMounted(() => {
  onCountDownTime()
})

// 销毁定时器
onUnmounted(() => {
  clearInterval(timerFlag)
})

let countDownTime = ref<number>(5)
let timer = ref<number>(0)
let timerFlag = ref<any>('')

// 导入的Icon
const pageMap: any = reactive({
  403: Page403,
  404: Page404,
  500: Page500
})

// 倒计时返回
const onCountDownTime = () => {
  timerFlag = setInterval(():void => {
    if (countDownTime.value) {
      countDownTime.value--
    } else {
      backHome()
      clearInterval(timer.value)
    }
  }, 1000)
}

const backHome = () => {
  router.push('/home')
}

</script>