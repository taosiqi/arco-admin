import {HttpResponse} from "./request"
import axios from 'axios';

/**
 * @description: 测速数据
 * @return {Promise}
 */

export interface Menu {
    icon?: string,
    name: string,
    path?: string,
    isMenu?:boolean,
    children?: Array<Menu>
}
export function getMenu() {
    return axios.post('/api/menu');
}
