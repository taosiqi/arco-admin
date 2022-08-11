import {checkPermission} from '../utils/permission'
import {DirectiveBinding} from 'vue'
/**
 * @example
 * v-permission="['add','bbb']"
 * v-permission="'add'"
 */
export default {
  name: 'permission',
  mounted (el:HTMLElement, binding:DirectiveBinding) {
    const { value } = binding;
    const hasPermission = checkPermission(value);
    if (!hasPermission) {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      } else {
        el.innerHTML = '';
      }
    } else {
      el && el.setAttribute('code', value);
    }
  }
}


