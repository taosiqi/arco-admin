import { createApp } from 'vue';
import App from './App.vue';
import 'default-passive-events';
import '@/api/request';
// 导入arco组件库和自定义的主题样式
import ArcoVue from '@arco-design/web-vue';
import '@arco-themes/vue-colors/index.less';
import 'uno.css'

// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
//需要覆盖的样式
import './styles/index.scss'

// 引入路由和pinia
import Router from './router/index';
import store from './store'

const app = createApp(App);

// 导入自定义指令
import command from '@/directives';
Object.keys(command).forEach(name => app.directive(name, command[name]));

app.use(ArcoVue).use(Router).use(ArcoVueIcon).use(store).mount('#app')
