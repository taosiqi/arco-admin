import {userStore} from "@/store";
import router from "@/router";
import {useRouter} from "vue-router";

/**
 * 检查权限点工具函数
 * @param {*} permissionCode 元素权限点
 * @param {*} permissions 所有权限点
 */
export function checkPermission(permissionCode:String | Number | Array<any>) {
  let {permissions}=userStore()
  let currentRoute=router.currentRoute.value
  let routerName=(currentRoute.meta.moduleName || currentRoute.path) as string //获取路由的name
  let permissionsData = permissions[routerName] || {} //匹配到权限
  let hasPermission = true;
  //权限对象拆除数组
  let data=Object.entries(permissionsData).map((item)=>{
    return item[1]
  })
  if (permissionCode) {
    if (permissionCode instanceof Array) {
      hasPermission = data.some(permissions =>{
       return  permissionCode.includes(permissions)
      });
    } else {
      hasPermission = data.some(item => item === permissionCode);
    }
  }
  return hasPermission;
}

export default checkPermission
