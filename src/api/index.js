import axios from 'axios'

let url = process.env.VUE_APP_DEV_BASE_URL
if (process.env.VUE_APP_PRO_BASE_URL) {
  url = process.env.VUE_APP_PRO_BASE_URL
}
const request = axios.create({
  baseURL: url,
  timeout: 5000
})

request.interceptors.request.use((config) => {
  return config
})
request.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default request
