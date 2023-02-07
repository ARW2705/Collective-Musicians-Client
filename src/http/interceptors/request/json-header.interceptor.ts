import { AxiosStatic } from 'axios'

function appendContentTypeHeader(axiosRef: AxiosStatic): void {
  axiosRef.interceptors.request.use(
    config => {
      config.headers['Content-Type'] = 'application/json'
      return config
    },
    error => {
      console.error(error)
      return Promise.reject(error)
    }
  )
}

export default appendContentTypeHeader
