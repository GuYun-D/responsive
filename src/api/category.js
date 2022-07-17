import request from '@/utils/request'

export const getCategory = () => {
  return request({
    url: '/category',
    method: 'get',
    data: null
  })
}