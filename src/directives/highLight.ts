/*
 * 高亮修改样式
 */

export default {
  beforeMount(el: any, binding: any) {
    el.style.background = binding.value
  }
}