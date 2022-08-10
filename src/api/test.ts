import request from "./request"

/**
 * @description: 测速数据
 * @return {Promise}
 */

export const getMenu = () => {
    // return request({
    //   url: '/MenuList ',
    //   method: 'get',
    // })
    return new Promise((resolve, reject) => {
        resolve({
            status: 200,
            data: [
                {
                    "icon": "icon-tiktok-color",
                    "name": "工作台",
                    "path": "/home"
                },
                {
                    "icon": "icon-settings",
                    "name": "异常页",
                    "path": "/error-page/403"
                },
                {
                    "icon": "icon-settings",
                    "name": "用户中心",
                    "children": [
                        {
                            "icon": "icon-nav",
                            "name": "用户设置",
                            "path": "/user"
                        }
                    ]
                }]
        })
    })
}
