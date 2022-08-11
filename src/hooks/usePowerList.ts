import { ref } from 'vue';
import { useRoute } from 'vue-router';
import {userStore} from "@/store";
//TODO 没测试
export default function usePowerList(initValue = false) {
    const powerList = ref([]);
    let route=useRoute()
    let moduleName= (route.meta.moduleName || route.path) as string;
    let {permissions}=userStore()
    powerList.value=permissions[moduleName]
    return {
        powerList,
    };
}
