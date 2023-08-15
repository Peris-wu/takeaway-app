import axios from '@/api'

// 获取当前定位城市
export const getCity = (type) => {
  return axios({
    url: '/v1/cities',
    method: 'GET',
    params: {
      type
    }
  })
}

// 搜索地址

export const searchPosByCityId = (cityId, keyword) => {
  return axios({
    url: '/v1/pois',
    method: 'GET',
    params: {
      city_id: cityId,
      keyword
    }
  })
}
