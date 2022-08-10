import { ref } from 'vue';
import screenfull from 'screenfull';
import { Message } from '@arco-design/web-vue';

export default function() {
  const isFullscreen = ref(false);

  // 全屏事件
  const changeScreen = () => {
    isFullscreen.value = !isFullscreen.value;
    if (screenfull.isEnabled) {
      screenfull.toggle();
    } else {
      Message.info('抱歉，当前浏览器不支持该全屏功能，可尝试使用F11触发全屏')
    }
  }

  return {
    isFullscreen,
    changeScreen
  }
}