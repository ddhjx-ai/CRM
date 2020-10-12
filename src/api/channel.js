import axios from 'axios';

/* 
  主题接口
*/
// 获取主题列表
export const getThemeList = (params) => {
  return axios({
    method: 'get',
    url: `/osc/block/theme/list`,
    params: params
  })
}

// 添加主题
export const themeAdd = (params) => {
  return axios({
    method: 'post',
    url: `/osc/block/theme/add`,
    data: params
  })
}

// 编辑主题
export const themeUpdate = (id, params) => {
  return axios({
    method: 'put',
    url: `/osc/block/theme/update/` + id,
    data: params
  })
}

// 删除主题
export const themeDel = (id) => {
  return axios({
    method: 'delete',
    url: `/osc/block/theme/del/` + id,
  })
}

/* 
  频道接口
*/
// 获取频道列表
export const getChanelList = (params) => {
  return axios({
    method: 'get',
    url: `/osc/block/channel/list`,
    params: params
  })
}

// 添加频道
export const channelNameAdd = (params) => {
  return axios({
    method: 'post',
    url: `/osc/block/channel/add`,
    data: params
  })
}

// 编辑频道
export const channelUpdate = (id, data) => {
  return axios({
    method: 'post',
    url: `/osc/block/channel/update/` + id,
    data: data
  })
}

/* 
  模块接口
*/
// 获取主题列表
export const getAllThemeList = () => {
  return axios({
    method: 'get',
    url: `/osc/block/channel/themelist`,
  })
}

// 添获取主题模块id
export const themeBlockId = (data) => {
  return axios({
    method: 'post',
    url: `/osc/block/channel/add_block`,
    data: data
  })
}

// 添加主题
export const themeAddModal = (params) => {
  return axios({
    method: 'get',
    url: `/osc/block/channel/select_theme`,
    params: params
  })
}

// 添加模块
export const addModal = (data) => {
  return axios({
    method: 'post',
    url: `/osc/block/channel/save_block`,
    data: data
  })
}

// 添加导航栏数据
export const addManualData = (data) => {
  return axios({
    method: 'post',
    url: `/osc/block/channel/add_manual_data`,
    data: data
  })
}

// 导入excel数据
export const importExcel = (data) => {
  return axios({
    method: 'post',
    url: `/osc/block/channel/excel_upload`,
    data: data
  })
}

// 生成关键词
export const saveshowdataBlock = (data) => {
  return axios({
    method: 'post',
    url: `/osc/block/channel/save_showdata_block`,
    data: data
  })
}

// 删除数据展示模块
export const removeLabelBlock = (data) => {
  return axios({
    method: 'get',
    url: `/osc/block/channel/delete_showdata`,
    params: data
  })
}

// 添加新模块
export const saveNewData = (data) => {
  return axios({
    method: 'post',
    url: `/osc/block/channel/save_newdata_block`,
    data: data
  })
}

// 附件下载
export const saveDownloadData = (data) => {
  return axios({
    method: 'post',
    url: `/osc/block/channel/save_download_block`,
    data: data
  })
}

// 添加中间数据模块
export const saveContentData = (data) => {
  return axios({
    method: 'post',
    url: `/osc/block/channel/save_content_block`,
    data: data
  })
}

// 删除中间数据模块
export const delContentData = (data) => {
  return axios({
    method: 'post',
    url: `/osc/block/channel/delete_content_block`,
    data: data
  })
}

// 添加彩色数据模块
export const saveColorData = (data) => {
  return axios({
    method: 'post',
    url: `/osc/block/channel/save_color_block`,
    data: data
  })
}

// 添加右边模块数据
export const saveRightData = (data) => {
  return axios({
    method: 'post',
    url: `/osc/block/channel/save_right_block`,
    data: data
  })
}

/* 新接口 */
// 添加导航栏
export const addNav = (data) => {
  return axios({
    method: 'post',
    url: `/osc/block/channel/add_navi`,
    data: data
  })
}

// 上传文件
export const addMenu = (data) => {
  return axios({
    method: 'post',
    url: `/osc/block/channel/add_menu`,
    data: data
  })
}

// 添加banner图
export const addBanner = (data) => {
  return axios({
    method: 'post',
    url: `/osc/block/channel/add_banner`,
    data: data
  })
}

// 添加右边模块数据
export const addRight = (data) => {
  return axios({
    method: 'post',
    url: `/osc/block/channel/add_right`,
    data: data
  })
}

// 添加数据展示模块/新模块/附件下载
export const addData = (data) => {
  return axios({
    method: 'post',
    url: `/osc/block/channel/add_data`,
    data: data
  })
}

// 模块内容回显接口
export const channelDetail = (id) => {
  return axios({
    method: 'get',
    url: `/osc/block/channel/detail/` + id,
  })
}

// 编辑回显数据展示模块
export const labelDetail = (id) => {
  return axios({
    method: 'get',
    url: `/osc/block/channel/showdata/detail/` + id,
  })
}

// 编辑回显彩色模块数据
export const colorfulDetail = (id) => {
  return axios({
    method: 'get',
    url: `/osc/block/channel/colorblock/detail/` + id,
  })
}

// 删除频道接口
export const delChannel = (id) => {
  return axios({
    method: 'get',
    url: `/osc/block/channel/delete_channel/` + id,
  })
}

// 生成关键词
export const getKeywords = (data) => {
  return axios({
    method: 'post',
    url: `/osc/block/channel/generate_key`,
    data: data
  })
}