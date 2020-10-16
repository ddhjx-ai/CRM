import axios from 'axios';
import { getStore, setStore } from '../libs/storage';
let accessToken = getStore('accessToken');
/* 
    商务室后台请求
*/
// 获取tree数据
export const getCateList = (params) => {
  return axios({
    method: 'get',
    url: `/xmallend/item/cat/list`,
    params: params,
    headers: {
      'accessToken': accessToken
    }
  })
}

// 编辑
export const cateUpdate = (params) => {
  return axios({
    method: 'post',
    url: '/xmallend/item/cat/update',
    data: params,
    headers: {
      'accessToken': accessToken
    }
  })
}

// 删除
export const cateRemove = (id) => {
  return axios({
    method: 'delete',
    url: '/xmallend/item/cat/del/' + id,
    headers: {
      'accessToken': accessToken
    }
  })
}

// 添加
export const cateAdd = (params) => {
  return axios({
    method: 'post',
    url: '/xmallend/item/cat/add',
    data: params,
    headers: {
      'accessToken': accessToken
    }
  })
}

/* 
  商品分类
*/
// 获取列表
export const getProductList = (params) => {
  return axios({
    method: 'get',
    url: '/xmallend/item/list',
    params: params,
    headers: {
      'accessToken': accessToken
    }
  })
}

// 获取总数居
export const getCount = () => {
  return axios({
    method: 'get',
    url: '/xmallend/item/count',
    headers: {
      'accessToken': accessToken
    }
  })
}

// 发布/下架
export const changeStatus = (params) => {
  return axios({
    method: 'put',
    url: '/xmallend/item/changestatus',
    data: params,
    headers: {
      'accessToken': accessToken
    }
  })
}

// 获取详情
export const getItemById = (id) => {
  return axios({
    method: 'get',
    url: '/xmallend/item/' + id,
    headers: {
      'accessToken': accessToken
    }
  })
}

// 上传图片接口
export const uploadImgUrl = '/xmallend/item/uploadfile';

// 编辑
export const updateProduct = (id, data) => {
  return axios({
    method: 'post',
    url: '/xmallend/item/update/' + id,
    data: data,
    headers: {
      'accessToken': accessToken
    }
  })
}

// 添加
export const addProduct = (data) => {
  return axios({
    method: 'post',
    url: '/xmallend/item/add',
    data: data,
    headers: {
      'accessToken': accessToken
    }
  })
}

// 删除
export const removeProduct = (ids) => {
  return axios({
    method: 'delete',
    url: '/xmallend/item/del/' + ids,
    headers: {
      'accessToken': accessToken
    }
  })
}

// 搜索
export const searchProduct = (data) => {
  return axios({
    method: 'get',
    url: '/xmallend/item/search',
    params: data,
    headers: {
      'accessToken': accessToken
    }
  })
}

/* 
  订单管理接口
*/
// 获取列表数据
export const getOrderList = (data) => {
  return axios({
    method: 'get',
    url: '/xmallend/order-manager/list',
    params: data,
    headers: {
      'accessToken': accessToken
    }
  })
}

// 获取总条数
export const getOrderCount = () => {
  return axios({
    method: 'get',
    url: '/xmallend/order-manager/count',
    headers: {
      'accessToken': accessToken
    }
  })
}

// 删除
export const removeOrder = (ids) => {
  return axios({
    method: 'delete',
    url: '/xmallend/order-manager/del/' + ids,
    headers: {
      'accessToken': accessToken
    }
  })
}

// 编辑
export const updateOrder = (id, data) => {
  return axios({
    method: 'put',
    url: '/xmallend/order-manager/update/' + id,
    data: data,
    headers: {
      'accessToken': accessToken
    }
  })
}