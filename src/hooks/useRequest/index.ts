// 请求hook
import {ref, UnwrapRef} from 'vue'
import {AxiosResponse} from 'axios'
import {HttpResponse} from '@/api/request'
import {useLoading} from '../index'

export default function useRequest<T>(
    api: () => Promise<AxiosResponse<HttpResponse>>,
    defaultValue = [] as unknown as T,
    isLoading = true
) {
    const {loading, setLoading} = useLoading(isLoading);
    const response = ref<T>(defaultValue);
    api()
        .then((res) => {
            response.value = res.data as unknown as UnwrapRef<T>;
        }).catch((err)=>{
        console.log(err)
    })
        .finally(() => {
            setLoading(false);
        });
    return {loading, response};
}
