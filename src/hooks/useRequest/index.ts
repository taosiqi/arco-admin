// 请求hook

import { toRefs, reactive } from 'vue'

type lady = { icon: string, name: string, path: string, children: any }

interface Type{
  data: lady[],
  error: boolean,
  loading: boolean,
}

export default (options: { url: any }) => {
  const { url } = options
  const state: Type = reactive({
    data: [],
    error: false,
    loading: false,
  })

  const request = async () => {
    state.error = false
    state.loading = true
    try {
      const result = await url
      if (result.status === 200) {
        state.data = result.data
        state.loading = false
      }
    } catch(e) {
      state.error = false
    }
  }

  return {
    request,
    ...toRefs(state)
  }
}
