import { AxiosStatic } from 'axios'

function setAPIRoute(axiosRef: AxiosStatic): void {
  axiosRef.interceptors.request.use(
    config => ({
      ...config,
      url: `collective_musicians_0.0.1/${config.url}`
    }),
    error => {
      console.error(error)
      return Promise.reject(error)
    }
  )
}

export default setAPIRoute
