/*
 * 高亮修改样式
 */

import {DirectiveBinding} from "vue";

export default {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    el.style.background = binding.value
  }
}
