/*
 * @Descripttion: 防抖,单位时间内触发最后一次
 * @param [function] func --执行事件
 * @param [?number|300] wait = 300 -- 时间间隔
 * @param [?string|"click"] event -- 事件类型
 * @param [?boolean|true] boolean -- 事件冒泡-false , 事件捕获--true
 * @param [Array] binding.value - [func,type,wait,true]
 * <a-button v-debounce="[test,'click',1000,true]">防抖测试</a-button>
 */

export default {
  beforeMount(el: any, binding: any) {
    let [func, type = 'click', wait = 300, immediate = true] = binding.value;
    let timer: any;
    el.$type = type;
    el.$handle = () => {
      timer && clearTimeout(timer);
      timer = setTimeout(() => func(), wait);
    };
    el.addEventListener(el.$type, el.$handle, immediate);
  },
  unmounted(el: any) {
    el.removeEventListener(el.$type, el.$handle);
  },
};
