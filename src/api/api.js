/**
 * @api {get} /osc/project_summary/block_keywords_list 汇总列表/获取汇总列表
 * @apiName block_keywords_list
 * @apiGroup 项目汇总
 *
 * @apiParam {Number} page 当前页码数
 * @apiParam {Number} size 当前页条数
 *
 * @apiSuccess {Number}  blocksId 栏目id
 * @apiSuccess {Number}  keyword 栏目关键词
 * @apiSuccess {Number}  name 栏目名称
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":{
 *           "total": 1,
 *           "list":[
 *            {
 *                "blocksId": 600024,
 *                "keyword": ""铁路且中标公示" 或 "铁路且中标公告"",
 *                "name": "铁路频道中国铁建彩色展示",
 *            }
 *          ]
 *        }
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

/**
* @api {get} /osc/project_summary/download 汇总列表/下载汇总数据
* @apiName download
* @apiGroup 项目汇总
*
* @apiParam {Number} blocksId 栏目Id
*
* @apiSuccessExample Success-Response:
*     excel数据流
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
* @api {get} /osc/project_summary/product_keywords_list 产品词/获取产品词列表
* @apiName product_keywords_list
* @apiGroup 项目汇总
*
* @apiParam {Number} page 当前页码数
* @apiParam {Number} size 当前页条数
*
* @apiSuccess {Number}  categoryId 行业id
* @apiSuccess {String}  createBy 创建人
* @apiSuccess {String}  createTime 创建日期
* @apiSuccess {Number}  id 产品词id
* @apiSuccess {Number}  delFlag 是否删除
* @apiSuccess {String}  pkeywords 产品词
* @apiSuccess {String}  updateBy 修改人
* @apiSuccess {String}  updateTime 修改时间
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "success",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result":{
*           "total": 1,
*           "list":[
*            {
*              "categoryId": 1,
*              "createBy": "张三",						
*              "createTime": "2020-11-22 13:14:15",
*              "delFlag": 0,					
*              "id": 2,									
*              "pkeywords": "产品词1",					
*              "updateBy": "李四",			
*              "updateTime": "2020-11-25 13:14:15"	
*            }
*          ]
*        }
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
* @api {get} /osc/productKeywords/getByCondition 产品词/产品词查询
* @apiName getByCondition
* @apiGroup 项目汇总
*
* @apiParam {Number} pageNumber 当前页码数
* @apiParam {Number} pageSize 当前页条数
* @apiParam {String} pKeywords 关键词
*
* @apiSuccess {Number}  categoryId 行业id
* @apiSuccess {String}  createBy 创建人
* @apiSuccess {String}  createTime 创建日期
* @apiSuccess {Number}  id 产品词id
* @apiSuccess {Number}  delFlag 是否删除
* @apiSuccess {String}  pkeywords 产品词
* @apiSuccess {String}  updateBy 修改人
* @apiSuccess {String}  updateTime 修改时间
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "success",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result":{
*          "totalElements": 7,
*          "totalPages": 1,
*          "content":[
*           {
*             "categoryId": 1,
*             "createBy": "张三",						
*             "createTime": "2020-11-22 13:14:15",
*             "delFlag": 0,					
*             "id": 2,									
*             "pkeywords": "产品词1",					
*             "updateBy": "李四",			
*             "updateTime": "2020-11-25 13:14:15"	
*           }
*          ]
*        }
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
* @api {post} /osc/project_summary/add_product_keywords 产品词/添加产品词
* @apiName add_product_keywords
* @apiGroup 项目汇总
*
* @apiParam {Array} pkwords 产品词
* @apiParam {Number} categoryId 行业id
*
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "success",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result": null
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
* @api {post} /osc/project_summary/delete 产品词/删除产品词
* @apiName delete
* @apiGroup 项目汇总
*
* @apiParam {Array} ids 产品词id
*
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "success",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result": null
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
* @api {get} /osc/block/channel/list 频道管理/频道列表查询
* @apiName list
* @apiGroup 专题管理
* @apiParam {Number} page 当前页码数
* @apiParam {Number} size 当前页条数
* @apiParam {String} search 查询关键词
*
* @apiSuccess {Number}  id 频道id
* @apiSuccess {String}  channelName 频道名称
* @apiSuccess {String}  description 创建时间
* @apiSuccess {String}  inTime 产品词id
* @apiSuccess {Number}  isDeleted 频道状态 0-启用，1-禁用，2-测试，3-汇总
* @apiSuccess {Number}  sortNo 排序
* @apiSuccess {Number}  tempalteId 模板id
* @apiSuccess {Number}  themeId 主题色id
* @apiSuccess {String}  themeName 主题色名称
* @apiSuccess {Number}  areaIds 地区id
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "success",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result":{
*           "count": 1,
*           "list":[
*            {
*              "id": 1,									
*              "channelName": "电力频道",		
*              "description": "这是一个电力频道",		
*              "inTime": "2020-11-25T11:01:20.000+0800"
*              "isDeleted": 0,		
*              "sortNo": null,			
*              "tempalteId": 1,				
*              "themeId": 4,						
*              "themeName": "国网绿",				
*              "areaIds": null			
*            }
*          ]
*        }
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
* @api {post} /osc/block/channel/add 频道管理/添加频道
* @apiName add_product_keywords
* @apiGroup 专题管理
*
* @apiParam {String} channelName 频道名称
* @apiParam {String} description 频道描述
*
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "新增频道成功",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result": null
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
* @api {post} /osc/block/channel/channel_status/id 频道管理/状态切换
* @apiName channel_status
* @apiGroup 专题管理
*
* @apiParam {Number} isDeleted 频道状态
*
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "修改状态成功",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result": null
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
* @api {get} /osc/block/channel/delete_channel/id 频道管理/删除频道
* @apiName delete_channel
* @apiGroup 专题管理
*
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "删除成功",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result": null
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
* @api {post} /osc/block/channel/update/id 频道管理/编辑频道
* @apiName update
* @apiGroup 专题管理
*
* @apiParam {String} channelName 频道名称
* @apiParam {String} description 频道描述
*
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "编辑频道成功",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result": null
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
* @api {get} /osc/block/theme/list 主题管理/主题列表查询
* @apiName list
* @apiGroup 专题管理
* @apiParam {Number} page 当前页码数
* @apiParam {Number} size 当前页条数
* @apiParam {String} search 查询关键词
*
* @apiSuccess {Number}  id 主题id
* @apiSuccess {String}  busroomImg 商务室图标路径
* @apiSuccess {String}  distributeHoverImg 分类hover状态图标路径
* @apiSuccess {String}  distributeImg 分类图标路径
* @apiSuccess {String}  enclosureHoverImg 下载hover状态图标路径
* @apiSuccess {String}  enclosureImg 下载图标路径
* @apiSuccess {Number}  isDeleted 主题状态 0-启用，1-禁用
* @apiSuccess {String}  keyColor 关键词背景色
* @apiSuccess {String}  loginImg 登录图标路径
* @apiSuccess {String}  mallImg 采砖商城图标路径
* @apiSuccess {String}  name 主题名称
* @apiSuccess {String}  publishImg 发公告图标路径
* @apiSuccess {String}  registerImg 注册图标路径
* @apiSuccess {String}  themeColor 主题色
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "success",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result":{
*           "count": 1,
*           "list":[
*            {
*              "id": 1,						
*              "busroomImg": "../img/channel/health/shangwushi.png",	
*              "distributeHoverImg": "../img/channel/health/ylzt_cont_icon1.png",
*              "distributeImg": "../img/channel/white_arrow02.png"	
*              "enclosureHoverImg":"../img/channel/health/ylzt_cont_icon_xzhover.png",	
*              "enclosureImg": "../img/channel/zt_cont_icon_xz.png",	
*              "isDeleted": 1,				
*              "keyColor":"#e3fdff",	
*              "loginImg": "../img/channel/health/ylsy_cont_icon4.png",
*              "mallImg": "../img/channel/health/shangcheng.png",		
*              "name": "浅青色",			
*              "publishImg": "../img/channel/health/ylsy_cont_icon5.png",
*              "registerImg": "../img/channel/health/ylsy_cont_icon3.png",
*              "themeColor": "#0ec0cb",		
*            }
*          ]
*        }
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/


/**
* @api {post} /osc/block/theme/add 主题管理/添加主题
* @apiName add
* @apiGroup 专题管理
*
* @apiParam {String}  busroomImg 商务室图标路径
* @apiParam {String}  distributeHoverImg 分类hover状态图标路径
* @apiParam {String}  distributeImg 分类图标路径
* @apiParam {String}  enclosureHoverImg 下载hover状态图标路径
* @apiParam {String}  enclosureImg 下载图标路径
* @apiParam {Number}  isDeleted 主题状态 0-启用，1-禁用
* @apiParam {String}  keyColor 关键词背景色
* @apiParam {String}  loginImg 登录图标路径
* @apiParam {String}  mallImg 采砖商城图标路径
* @apiParam {String}  name 主题名称
* @apiParam {String}  publishImg 发公告图标路径
* @apiParam {String}  registerImg 注册图标路径
* @apiParam {String}  themeColor 主题色
*
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "添加主题成功",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result": null
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
 * @api {put} /osc/block/theme/update/id 主题管理/编辑主题
 * @apiName update
 * @apiGroup 专题管理
 *
 * @apiParam {String}  busroomImg 商务室图标路径
 * @apiParam {String}  distributeHoverImg 分类hover状态图标路径
 * @apiParam {String}  distributeImg 分类图标路径
 * @apiParam {String}  enclosureHoverImg 下载hover状态图标路径
 * @apiParam {String}  enclosureImg 下载图标路径
 * @apiParam {Number}  isDeleted 主题状态 0-启用，1-禁用
 * @apiParam {String}  keyColor 关键词背景色
 * @apiParam {String}  loginImg 登录图标路径
 * @apiParam {String}  mallImg 采砖商城图标路径
 * @apiParam {String}  name 主题名称
 * @apiParam {String}  publishImg 发公告图标路径
 * @apiParam {String}  registerImg 注册图标路径
 * @apiParam {String}  themeColor 主题色
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "编辑主题成功",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result": null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

/**
 * @api {delete} /osc/block/theme/del/id 主题管理/删除频主题
 * @apiName del
 * @apiGroup 专题管理
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "删除主题成功",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result": null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

/**
* @api {get} /osc/block/channel/themelist 模块管理/获取所有主题
* @apiName themelist
* @apiGroup 专题管理
*
* @apiSuccess {Number}  id 主题id
* @apiSuccess {String}  isDeleted 状态
* @apiSuccess {String}  name 主题名称
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "success",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result":{
*           "list":[
*            {
*              "id": 1,				
*              "isDeleted": 0,	
*              "name": "浅青色"	
*            }
*          ]
*        }
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
* @api {get} /osc/block/channel/select_theme 模块管理/选择（编辑）主题
* @apiName select_theme
* @apiGroup 专题管理
*
* @apiParam {Number}  themeId 主题id
* @apiParam {Number}  channelId 频道id
* @apiParam {Number}  blockId 模块id [非必填]
* 
* @apiSuccess {Number}  theme_block_id 模块id
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "success",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result":{
*              "theme_block_id": 600123	
*            }
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
* @api {post} /osc/block/channel/add_navi 模块管理/添加（编辑）导航栏
* @apiName add_navi
* @apiGroup 专题管理
*
* @apiParam {String}  name 导航栏名称
* @apiParam {Number}  channelId 频道id
* @apiParam {String}  contentList 导航栏内容
* @apiParam {Number}  blockId 模块id [非必填]
* 
* @apiSuccess {Number}  navi_block_id 导航栏模块id
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "success",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result":{
*              "navi_block_id": 600123	
*            }
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
* @api {post} /osc/block/channel/add_menu 模块管理/添加（编辑）菜单栏
* @apiName add_menu
* @apiGroup 专题管理
*
* @apiParam {Object}  file 导航栏名称
* @apiParam {Number}  channelId 频道id
* @apiParam {Number}  blockId 模块id [非必填]
* 
* @apiSuccess {Number}  menu_block_id 菜单栏模块id
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "success",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result":{
*              "menu_block_id": 600123	
*            }
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
* @api {post} /osc/block/channel/add_banner 模块管理/添加（编辑）轮播图
* @apiName add_banner
* @apiGroup 专题管理
*
* @apiParam {Number}  channelId 频道id
* @apiParam {Number}  blockId 模块id [非必填]
* @apiParam {Array}  list 轮播图列表 [列表中参数如下]
* @apiParam {String} name 图片跳转链接
* @apiParam {String} color 图片背景色
* @apiParam {String} url 图片路径
* 
* @apiSuccess {Number}  banner_block_id 轮播图模块id
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "success",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result":{
*              "banner_block_id": 600123	
*            }
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
* @api {post} /osc/block/channel/add_data 模块管理/添加（编辑）数据展示模块
* @apiName add_data
* @apiGroup 专题管理
*
* @apiParam {Number}  name 模块标题
* @apiParam {Number}  blockId 模块id [非必填]
* @apiParam {Array}  channelId 频道id
* @apiParam {String} defaultKey 默认关键词 
* @apiParam {String} showType 展示方式 1:关键词，2:进展，3:了解更多，4:立即下载，5:立即咨询
* @apiParam {String} queryType 查询方式 0:不匹配，1:标题，2:内容，3:附件，4:VIP
* @apiParam {String} sphinxQuery 查询关键词 [非必填]
* @apiParam {String} categoryIds 一级行业 [非必填]
* @apiParam {String} caegoryIds2 搜索范围 [非必填]
* @apiParam {String} componentId 模块位置id
* @apiParam {String} sortNo 排序值
* 
* @apiSuccess {Number}  xxxx_block_id 模块id
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "success",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result":{
*              "xxxx_block_id": 600123	
*        }
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
 * @api {post} /osc/block/channel/generate_key 模块管理/生成关键词
 * @apiName generate_key
 * @apiGroup 专题管理
 *
 * @apiParam {String}  andKey 与值
 * @apiParam {String}  orKey 或值
 * @apiParam {Number}  type 生成方式
 * 
 * @apiSuccess {String}  result 响应数据
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result": "电力&医疗&发电"
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

/**
* @api {get} /osc/block/channel/delete_showdata 模块管理/删除数据展示模块
* @apiName delete_showdata
* @apiGroup 专题管理
*
* @apiParam {Number}  blockId 模块id
* 
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "删除成功",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result": "showdata_block_id = 600125"
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
* @api {get} /osc/block/channel/showdata/detail/id 模块管理/获取数据展示模块详情
* @apiName detail
* @apiGroup 专题管理
*
* @apiSuccess {String}  caegory_ids2 搜索范围
* @apiSuccess {String}  category_ids 一级行业
* @apiSuccess {String}  default_key 默认关键词
* @apiSuccess {String}  name 模块标题
* @apiSuccess {Number}  query_type 查询方式
* @apiSuccess {String}  show_type 展示方式
* @apiSuccess {Number}  sort_no 排序值
* @apiSuccess {String}  sphinx_query 关键词
* 
* @apiSuccessExample Success-Response:
*     {
*        caegory_ids2: ""
*        category_ids: ""
*        default_key: "一次"
*        name: "一次"
*        query_type: 2
*        show_type: "1"
*        sort_no: 1
*        sphinx_query: "6kV变压器"
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
* @api {get} /osc/block/channel/colorblock/detail/id 模块管理/获取色数据模块详情
* @apiName detail
* @apiGroup 专题管理
*
* @apiSuccess {String}  color 模块字体色
* @apiSuccess {String}  img_url 模块背景图片路径
* @apiSuccess {String}  data 模块展示数据列表
* 
* @apiSuccessExample Success-Response:
*     {
*        "color": "#537190",
*        "img_url": "./img/bg.png",
*        "data":  [
*          {
*            "name": "电力",
*            "search":"发电机 水电",
*            "type": 1
*          }
*        ],
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
* @api {post} /osc/block/channel/save_color_block 模块管理/编辑彩色数据模块
* @apiName save_color_block
* @apiGroup 专题管理
*
* @apiParam {String}  color 模块字体色
* @apiParam {String}  imgurl 模块背景图片路径
* @apiParam {Number}  blockId 模块id [非必填]
* @apiParam {Array}  list 模块展示数据列表 [列表中参数如下]
* @apiParam {String}  name 数据标题
* @apiParam {String}  search 数据关键词
* @apiParam {Number}  type 查询方式 1：内容，2：标题
* 
* @apiSuccess {Number}  color_block_id 彩色模块id
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "success",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result":{
*            {
*              "color_block_id": 600123	
*            }
*        }
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
* @api {post} /osc/block/channel/delete_content_block 模块管理/删除中间数据模块
* @apiName delete_content_block
* @apiGroup 专题管理
*
* @apiParam {Number}  color_blockId 彩色数据模块id
* @apiParam {Number}  content_blockId 中间数据模块id
* 
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "删除成功",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result":null
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
 * @api {post} /osc/block/channel/add_right 模块管理/添加(编辑)彩色数据模块
 * @apiName add_right
 * @apiGroup 专题管理
 *
 * @apiParam {Number}  channelId 频道id
 * @apiParam {Number}  blockId 模块id [非必填]
 * @apiParam {String}  contentList 右边展示数据 [非必填]
 * @apiParam {String}  name 右边展示模块标题
 * 
 * @apiSuccess {Number}  right_block_id 右边数据模块id
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":{
 *            {
 *              "right_block_id": 600123	
 *            }
 *        }
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

/**
 * @api {get} /osc/block/channel/view_menu/id 模块管理/获取上传文件详情
 * @apiName view_menu
 * @apiGroup 专题管理
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":[
 *          {
 *            "title": [
 *              "adImg": [
 *                {
 *                  "txt1": "./img/ad.png",			
 *                  "txt_a": "javascript:void(0);"		
 *                }
 *              ],
 *              "content": [
 *                {
 *                  "hotkey": [],
 *                  "hotlist": [
 *                    {
 *                      "txt1": "环保工程",		
 *                      "txt_a": "/search/Searchgj/zbcg?keywords=环保工程专业承包&b_date=week" 	
 *                    },
 *                  ],
 *                  "hottxt": [
 *                    {
 *                      "txt1": "环境综合治理",	
 *                      "txt_a": "/search/Searchgj/zbcg?keywords=环境综合治理&b_date=week" 	
 *                    }
 *                  ]
 *                }
 *              ],
 *              "title": [
 *                {
 *                  "txt1": "治理、修复工程",	
 *                  "txt_a": ""
 *                }
 *              ]
 *            ]
 *          }
 *        ]
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

/**
* @api {get} /osc/block/channel/detail/id 模块管理/获取模块详情
* @apiName view_menu
* @apiGroup 专题管理
*
* @apiSuccessExample Success-Response:
*   [
*     {
*       "new_data_block": {				
*         "show_type": "3",			
*         "new_data_block_id": 600081,		
*         "name": "气候应对",			
*         "default_key": "环保",		
*         "sphinx_query": "温室气体|碳排放|应对气候变化",
*         "query_type": 2			
*       },
*       "content_block": [			
*         {
*           "content_block_id": 600083,		
*           "sort_no": 1,			
*           "color_block_id": 600085,
*           "name": "固体废物",		
*           "status": 1			
*         }
*       ],
*       "AchannelName": "环保频道",	
*       "theme_block": {			
*         "theme_block_id": 600088,	
*         "theme_color": "#239951",	
*         "theme_id": 2,				
*         "name": "翡翠绿"				
*       },
*       "show_data_block": [			
*         {
*           "sort_no": 1,					
*           "name": "蓝天保卫战",	
*           "blocks_id": 600077		
*         }
*       ],
*       "banner_block": [				// 轮播图模块
*         {
*           "banner_block_id": 600090,			
*           "color": "#d2e2c7",					    
*           "name": "javascript:void(0);",	
*           "url": "../img/channel/education/huanbao.png"
*         }
*       ],
*       "right_block": [						// 右边展示模块
*         {
*           "right_block_id": 600087,		
*           "name": "北京市生态环境局",	
*           "title": "地方生态环境部门",
*           "url": "http://sthjj.beijing.gov.cn/"
*         }
*       ],
*       "navi_block": [					
*         {
*           "navi_block_id": 600089,	
*           "name": "蓝天保卫战",			
*           "title": "环保频道分类"		
*         }
*       ],
*       "menu_block": {						
*         "menu_block_id": 600076	
*       },
*       "download_block": {					
*         "show_type": "4",					
*         "download_block_id": 600082,			
*         "name": "附件",					
*         "default_key": "环保",	
*         "sphinx_query": "生态环境&附件下载|生态环境&pdf|生态环境&doc|生态环境&xls",	
*         "query_type": 2	
*       }
*     }
*   ]
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
* @api {get} /osc/block/channel/keywords/id 关键词列表/获取关键词列表
* @apiName keywords
* @apiGroup 专题管理
*
* @apiParam {Number} page 当前页码数
* @apiParam {Number} size 当前页条数
*
* @apiSuccess {String}  id 主题id
* @apiSuccess {Number}  isDeleted 状态
* @apiSuccess {String}  keywords 关键词
* @apiSuccess {Number}  times 次数
* @apiSuccess {Number}  total 总数
* @apiSuccess {Number}  blocksId 模块id
* @apiSuccess {String}  upTime 更新时间
* @apiSuccess {Number}  yesterdayCount 昨日统计次数
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "success",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result":{
*           "total": 1,
*           "list":[
*            {
*               "id": "1330369444005826560",	
*               "isDeleted": 0,						
*               "keywords": "风电&联轴器",		
*               "times": 1,					
*               "total": 12,					
*               "blocksId": 600210,			
*               "upTime": "2020-12-02 15:47:11",
*               "yesterdayCount": 0,		
*            }
*          ]
*        }
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
* @api {post} /osc/block/channel/keywords/add 关键词列表/添加关键词
* @apiName add
* @apiGroup 专题管理
*
* @apiParam {Number} blocksId 模块id
* @apiParam {String} keywords 关键词
* @apiParam {Number} times 次数 [非必填]
* @apiParam {Number} total 总数 [非必填]
* @apiParam {Number} yesterdayCount 昨日统计次数 [非必填]
*
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "新增成功",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result":null
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
* @api {post} /osc/block/channel/keywords/update 关键词列表/编辑关键词
* @apiName update
* @apiGroup 专题管理
*
* @apiParam {Number} blocksId 模块id
* @apiParam {Number} id 关键词id
* @apiParam {String} keywords 关键词
* @apiParam {Number} times 次数 [非必填]
* @apiParam {Number} total 总数 [非必填]
* @apiParam {Number} yesterdayCount 昨日统计次数 [非必填]
*
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "修改成功",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result":null
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/**
* @api {post} /osc/block/channel/keywords/delete 关键词列表/删除关键词
* @apiName delete
* @apiGroup 专题管理
*
* @apiParam {Array} ids 关键词id
*
* @apiSuccessExample Success-Response:
*     {
*        "success": true,
*        "message": "删除成功",
*        "code": 200,
*        "timestamp": 1606957730894,
*        "result":null
*     }
*
* @apiErrorExample Error-Response:
* HTTP/1.1 code401 Unauthorized
* @apiErrorExample Error-Response:
* HTTP/1.1 code403 Forbidden
* @apiErrorExample Error-Response:
* HTTP/1.1 code404 Not Found
*/

/* 近一年使用报告 */
/**
 * @api {post} /osc/up/report/year/apply_list 近一年报告申请/报告申请列表查询
 * @apiName apply_list
 * @apiGroup 近一年使用报告
 *
 * @apiParam {Number} page 当前页码数
 * @apiParam {Number} size 当前页条数
 * @apiParam {String} sortOrder 排序方式 asc：升序，desc：降序
 * @apiParam {String} sortName 排序项 
 * @apiParam {String} searchType 查询方式 [非必填] member_id：用户id，kefu：客服
 * @apiParam {String} search 查询关键词 [非必填]
 *
 * @apiSuccess {Number}  id 栏目id
 * @apiSuccess {String}  componyName 公司名称
 * @apiSuccess {String}  createTime 创建时间
 * @apiSuccess {Object}  jsonData 数据
 * @apiSuccess {String}  kefuName 客服姓名
 * @apiSuccess {String}  memberEndTime 用户截止时间
 * @apiSuccess {Number}  memberId 用户id
 * @apiSuccess {Number}  status 收集状态
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":{
 *           "total": 1,
 *           "list":[
 *            {
 *              "id": "200126806",							  
 *              "componyName": "象山正方机械有限公司",		  
 *              "createTime": "2020-12-03 11:52:57",			  
 *              "jsonData":	null,				
 *              "kefuName": "朱建新",		
 *              "memberEndTime": null,	
 *              "memberId": 1,					
 *              "status": 1,						
 *            }
 *          ]
 *        }
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

 /**
 * @api {post} /osc/up/report/year/add_apply 近一年报告申请/添加报告申请
 * @apiName add_apply
 * @apiGroup 近一年使用报告
 *
 * @apiParam {Number} memberId 用户id
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

  /**
 * @api {delete} /osc/up/report/year/delete 近一年报告申请/删除报告申请
 * @apiName delete
 * @apiGroup 近一年使用报告
 *
 * @apiParam {Array} ids 用户id
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "删除成功",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

 /**
 * @api {post} /osc/up/report/year/aimuser_list 近一年目标客户/目标客户列表查询
 * @apiName aimuser_list
 * @apiGroup 近一年使用报告
 *
 * @apiParam {Number} page 当前页码数
 * @apiParam {Number} size 当前页条数
 * @apiParam {String} sortOrder 排序方式 asc：升序，desc：降序
 * @apiParam {String} sortName 排序项 
 * @apiParam {Number} memberId 用户id [非必填]
 *
 * @apiSuccess {Number}  id 目标客户id
 * @apiSuccess {Number}  isShow 是否显示 1：显示，0：不显示
 * @apiSuccess {String}  keyword 关键词
 * @apiSuccess {Number}  memberId 用户id
 * @apiSuccess {Number}  noReadNum 
 * @apiSuccess {Number}  readNum 
 * @apiSuccess {Number}  seachCount 搜索次数
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":{
 *           "total": 1,
 *           "list":[
 *            {
 *              "id": 1054721,					
 *              "isShow": 1,						
 *              "keyword": "合肥庐源电力工程有限公司",		
 *              "memberId": 200338202,					
 *              "noReadNum": 3.93857,						
 *              "readNum": -2.09342,						
 *              "seachCount": 254,							
 *            }
 *          ]
 *        }
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

 /**
 * @api {put} /osc/up/report/year/aimuser_update/id 近一年目标客户/切换目标客户状态
 * @apiName aimuser_update
 * @apiGroup 近一年使用报告
 *
 * @apiParam {Number} isShow 显示状态 0：不显示，1：显示
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "修改成功",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */


 /**
 * @api {put} /osc/up/report/year/aimuser_update/id 近一年目标客户/编辑关键词
 * @apiName aimuser_update
 * @apiGroup 近一年使用报告
 *
 * @apiParam {String} Keyword 关键词
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "修改成功",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

  /**
 * @api {post} /osc/up/report/year/part_list 近一年参与项目/参与项目列表查询
 * @apiName part_list
 * @apiGroup 近一年使用报告
 *
 * @apiParam {Number} page 当前页码数
 * @apiParam {Number} size 当前页条数
 * @apiParam {String} sortOrder 排序方式 asc：升序，desc：降序
 * @apiParam {String} sortName 排序项 
 * @apiParam {Number} memberId 用户id [非必填]
 *
 * @apiSuccess {Number}  id 数据id
 * @apiSuccess {Number}  infoId 信息id
 * @apiSuccess {Number}  isFirst 是否为第一候选人 0：否，1：是
 * @apiSuccess {Number}  isShow 是否显示
 * @apiSuccess {Number}  memberId 用户id
 * @apiSuccess {String}  publishDate 发布时间
 * @apiSuccess {String}  title 信息标题
 * @apiSuccess {String}  zbwUrl 信息标题链接
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":{
 *           "total": 1,
 *           "list":[
 *            {
 *              "id": 1054721,					
 *              "infoId": 2070121357,		
 *              "isFirst": 1,						
 *              "isShow": 1,						
 *              "memberId": 11687493,		
 *              "publishDate": "2019-10-31 00:00:00",
 *              "title": "贵州大唐物资有限公司制粉系统配件...",	
 *              "zbwUrl":"/zbgs/nnmKZP.html",					
 *            }
 *          ]
 *        }
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

   /**
 * @api {put} /osc/up/report/year/first/id 近一年参与项目/切换候选人状态
 * @apiName first
 * @apiGroup 近一年使用报告
 *
 * @apiParam {Number} isFirst 是否为第一候选人 0：是，1：否
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "修改成功",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

/* 广告管理 */
/**
 * @api {get} /osc/ad/ggw/list 广告位列表/广告位列表查询
 * @apiName list
 * @apiGroup 广告管理
 *
 * @apiParam {Number} page 当前页码数
 * @apiParam {Number} size 当前页条数
 * @apiParam {String} search 关键词 [非必填]
 *
 * @apiSuccess {Number}  alias 别名
 * @apiSuccess {Number}  amount 个数
 * @apiSuccess {String}  beizhuId 备注
 * @apiSuccess {String}  createDate 创建时间
 * @apiSuccess {String}  createOpr 创建人
 * @apiSuccess {Number}  delFlag 是否删除 1：是，0：否
 * @apiSuccess {Number}  fileType 文件类型值
 * @apiSuccess {String}  fileTypeMag 文件类型
 * @apiSuccess {String}  height 文件高度
 * @apiSuccess {Number}  id 广告位id
 * @apiSuccess {String}  lastModify 最后修改时间
 * @apiSuccess {String}  name 名称
 * @apiSuccess {String}  pageAlias 页面别名
 * @apiSuccess {Number}  pageId 页面id
 * @apiSuccess {String}  pageName 页面名称
 * @apiSuccess {Number}  position 
 * @apiSuccess {Number}  price 价格
 * @apiSuccess {Number}  type 
 * @apiSuccess {Number}  updateOpr 
 * @apiSuccess {Number}  width 文件宽度
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":{
 *           "total": 1,
 *           "list":[
 *            {
 *              "alias": "高级搜索页-A3",
 *              "amount": 0,						
 *              "beizhuId": null,			   
 *              "createDate": "2020-04-18T08:54:08.000+0800",
 *              "createOpr": "测试人员",
 *              "delFlag": 1,						
 *              "fileType": 0,					
 *              "fileTypeMag": "静态图片及flash",
 *              "height": 197,		
 *              "id":9628672,			
 *              "lastModify": "2020-07-31T09:28:47.000+0800",	
 *              "name": "searchgj-right-A3",
 *              "pageAlias": "高级搜索",		
 *              "pageId": 607,						
 *              "pageName": "search.Searchgj.zbcgad",
 *              "position": 0,		
 *              "price": 0,				
 *              "type": null,			
 *              "updateOpr": null,
 *              "width": 197,			
 *            }
 *          ]
 *        }
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

 /**
 * @api {post} /osc/ad/ggw/add 广告位列表/添加广告位
 * @apiName add
 * @apiGroup 广告管理
 *
 * @apiParam {String}  name 广告位名称
 * @apiParam {String}  alias 别名
 * @apiParam {Number}  price 价格
 * @apiParam {Number}  fileType 文件类型值
 * @apiParam {Number}  amount 个数
 * @apiParam {Number}  height 文件高度
 * @apiParam {Number}  delFlag 是否可用 1：是，0：否
 * @apiParam {Number}  pageId 页面id
 * 
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

  /**
 * @api {post} /osc/ad/ggw/update/id 广告位列表/编辑广告位
 * @apiName update
 * @apiGroup 广告管理
 *
 * @apiParam {String}  name 广告位名称
 * @apiParam {String}  alias 别名
 * @apiParam {Number}  price 价格
 * @apiParam {Number}  fileType 文件类型值
 * @apiParam {Number}  amount 个数
 * @apiParam {Number}  height 文件高度
 * @apiParam {Number}  delFlag 是否可用 1：是，0：否
 * @apiParam {Number}  pageId 页面id
 * 
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

   /**
 * @api {delete} /osc/ad/ggw/delete/id 广告位列表/删除广告位
 * @apiName delete
 * @apiGroup 广告管理
 * 
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

/**
 * @api {post} /osc/ad/ggw/fbjh 广告位列表/发布计划
 * @apiName fbjh
 * @apiGroup 广告管理
 * 
 * @apiParam {String}  name 登录名
 * @apiParam {String}  keywords 关键字
 * @apiParam {String}  startDate 开始时间
 * @apiParam {Number}  sortId 排序id
 * @apiParam {String}  endDate 结束时间
 * @apiParam {Number}  state 状态 [非必填]
 * @apiParam {Number}  amount 金额 [非必填]
 * @apiParam {Number}  guanggaoId 广告id  [非必填]
 * @apiParam {Number}  guanggaoweiId 广告位id
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

 /**
 * @api {post} /osc/ad/fbjh/gg_list 广告位列表/广告下拉列表
 * @apiName gg_list
 * @apiGroup 广告管理
 * 
 * @apiSuccess {Number}  id 广告id
 * @apiSuccess {String}  name 广告名称
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":[
 *          {
 *            id: 1,
 *            name: "北京城市景观研究院国内知名设计院"
 *          }
 *        ]
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

 /**
 * @api {get} /osc/ad/gg/list 广告列表/广告列表查询
 * @apiName list
 * @apiGroup 广告管理
 *
 * @apiParam {Number} page 当前页码数
 * @apiParam {Number} size 当前页条数
 * @apiParam {String} search 关键词 [非必填]
 *
 * @apiSuccess {String}  alias 别名
 * @apiSuccess {String}  beizhuId 备注
 * @apiSuccess {String}  createDate 创建时间
 * @apiSuccess {String}  createOpr 创建人
 * @apiSuccess {Number}  delFlag 是否删除 1：是，0：否
 * @apiSuccess {String}  description 描述
 * @apiSuccess {String}  dir 
 * @apiSuccess {Number}  fileType 文件类型值
 * @apiSuccess {String}  fileTypeMsg 文件类型
 * @apiSuccess {Number}  height 文件高度
 * @apiSuccess {Number}  id 广告位id
 * @apiSuccess {Number}  keywords 关键词
 * @apiSuccess {String}  lastModify 最后修改时间
 * @apiSuccess {String}  name 物料文件名
 * @apiSuccess {String}  picName 物料文件名
 * @apiSuccess {String}  title 
 * @apiSuccess {String}  updateOpr 修改人
 * @apiSuccess {Number}  width 文件宽度
 * @apiSuccess {Number}  yezhuId 业主id
 * @apiSuccess {String}  yezhuName 业主名
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":{
 *           "total": 1,
 *           "list":[
 *            {
 *              "alias": "高级搜索页-A3",		
 *              "beizhuId": null,			   	
 *              "createDate": "2020-04-18T08:54:08.000+0800",	
 *              "createOpr": "金晶",		
 *              "delFlag": 1,					
 *              "description":"",			
 *              "dir": "http://gys-public.com/y/191/gg/",	
 *              "fileType": 6,				
 *              "fileTypeMsg": "png",	
 *              "height": 100,				
 *              "id": 9975948,				
 *              "keywords": null,			
 *              "lastModify":"2020-12-08T16:12:57.000+0800",
 *              "linkAddress": "http://www.szssslc.cn/",	
 *              "name": "石塑管业",						
 *              "picName": "1607415178894.png",		
 *              "title": "",					
 *              "type": null,					
 *              "updateOpr": "金晶",	
 *              "width": 197,					
 *              "yezhuId": 191,				
 *              "yezhuName": "方芳",	
 *            }
 *          ]
 *        }
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

/**
 * @api {get} /osc/ad/gg/yezhu_list 广告列表/获取业主列表
 * @apiName yezhu_list
 * @apiGroup 广告管理
 *
 * @apiSuccess {Number}  id 业主id
 * @apiSuccess {String}  name 业主名
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":{
 *           "list":[
 *            {
 *                id: 213,
 *                name: "foxfocus.cn"
 *            }
 *          ]
 *        }
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

/**
 * @api {post} /osc/ad/gg/add 广告列表/添加广告
 * @apiName add
 * @apiGroup 广告管理
 *
 * @apiParam {String}  name 登录名
 * @apiParam {String}  alias 别名 [非必填]
 * @apiParam {String}  title 标题 [非必填]
 * @apiParam {Number}  yezhuId 业主id 
 * @apiParam {String}  linkAddress 链接地址 [非必填]
 * @apiParam {Number}  width 宽度 [非必填]
 * @apiParam {Number}  heigth 高度  [非必填]
 * @apiParam {String}  description 描述 [非必填]
 * @apiParam {Number}  fileType 文件类型  [非必填]
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

/**
 * @api {post} /osc/ad/gg/update/id 广告列表/编辑广告
 * @apiName update
 * @apiGroup 广告管理
 *
 * @apiParam {String}  name 登录名
 * @apiParam {String}  alias 别名 [非必填]
 * @apiParam {String}  title 标题 [非必填]
 * @apiParam {Number}  yezhuId 业主id 
 * @apiParam {String}  linkAddress 链接地址 [非必填]
 * @apiParam {Number}  width 宽度 [非必填]
 * @apiParam {Number}  heigth 高度  [非必填]
 * @apiParam {String}  description 描述 [非必填]
 * @apiParam {Number}  fileType 文件类型  [非必填]
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

 /**
 * @api {delete} /osc/ad/gg/delete/id 广告列表/删除广告
 * @apiName delete
 * @apiGroup 广告管理
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

  /**
 * @api {delete} /osc/ad/gg/delete/id 广告列表/上传物料
 * @apiName delete
 * @apiGroup 广告管理
 * @apiParam {File}  file 上传文件
 * @apiParam {Number}  id 物料id
 * @apiParam {Number}  yezhuId 业主id
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

   /**
 * @api {post} /osc/ad/gg/fbjh 广告列表/发布计划
 * @apiName fbjh
 * @apiGroup 广告管理
 * 
 * @apiParam {String}  name 登录名
 * @apiParam {String}  keywords 关键字
 * @apiParam {String}  startDate 开始时间
 * @apiParam {Number}  sortId 排序id
 * @apiParam {String}  endDate 结束时间
 * @apiParam {Number}  state 状态 [非必填]
 * @apiParam {Number}  amount 金额 [非必填]
 * @apiParam {Number}  guanggaoId 广告id  [非必填]
 * @apiParam {Number}  guanggaoweiId 广告位id
 * 
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

 /**
 * @api {get} /osc/ad/gg/list 业主列表/业主列表查询
 * @apiName list
 * @apiGroup 广告管理
 *
 * @apiParam {Number} page 当前页码数
 * @apiParam {Number} size 当前页条数
 * @apiParam {String} search 关键词 [非必填]
 *
 * @apiSuccess {String}  beizhuId 备注
 * @apiSuccess {String}  createDate 创建时间
 * @apiSuccess {String}  createOpr 创建人
 * @apiSuccess {Number}  id 业主id
 * @apiSuccess {String}  lastModify 描述
 * @apiSuccess {String}  name 名称
 * @apiSuccess {String}  salesman 
 * @apiSuccess {String}  updateOpr 修改人
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":{
 *           "total": 1,
 *           "list":[
 *            {
 *              beizhuId: null
 *              createDate: "2019-03-01T10:56:41.000+0800"
 *              createOpr: "测试人员"
 *              id: 221
 *              lastModify: "2019-03-01T10:56:41.000+0800"
 *              name: "张倩"
 *              salesman: "测试人员"
 *              updateOpr: null	
 *            }
 *          ]
 *        }
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

/**
 * @api {post} /osc/ad/yz/add 业主列表/添加
 * @apiName add
 * @apiGroup 广告管理
 *
 * @apiParam {String} name 登录名
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

/**
 * @api {post} /osc/ad/yz/update/id 业主列表/编辑
 * @apiName update
 * @apiGroup 广告管理
 *
 * @apiParam {String} name 登录名
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

/**
 * @api {delete} /osc/ad/yz/delete/id 业主列表/删除
 * @apiName delete
 * @apiGroup 广告管理
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

 /**
 * @api {post} /osc/ad/yz/add_gg 业主列表/添加广告
 * @apiName add_gg
 * @apiGroup 广告管理
 *
 * @apiParam {String} name 登录名
 * @apiParam {String} alias 别名
 * @apiParam {String} title 
 * @apiParam {Number} yezhuId 业主id
 * @apiParam {String} linkAddress 链接地址  [非必填]
 * @apiParam {Number} width 文件宽度
 * @apiParam {Number} height 文件高度
 * @apiParam {Number} delFlag 是否可用 0-否，1-是
 * @apiParam {String} description 活动描述 [非必填]
 * @apiParam {Number} fileType 文件类型
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

  /**
 * @api {get} /osc/ad/yz/id 业主广告列表/业主广告列表查询
 * @apiName yz
 * @apiGroup 广告管理
 *
 * @apiParam {Number} page 当前页码数
 * @apiParam {Number} size 当前页条数
 * @apiParam {String} search 关键词 [非必填]
 *
 * @apiSuccess {Number} amount 金额
 * @apiSuccess {Number} createDate 创建时间
 * @apiSuccess {Number} createOpr 创建人
 * @apiSuccess {Number} id 广告id
 * @apiSuccess {Number} name 广告名称
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":{
 *          amount: 1
 *          createDate: "2020-02-14 13:35:40"
 *          createOpr: "测试人员"
 *          id: 533632
 *          name: "test-疫情"
 *        },
 *        total: 1
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */


  /**
 * @api {get} /osc/ad/fbjh/list 发布计划列表/列表查询
 * @apiName list
 * @apiGroup 广告管理
 *
 * @apiParam {Number} page 当前页码数
 * @apiParam {Number} size 当前页条数
 * @apiParam {String} search 关键词 [非必填]
 *
 * @apiSuccess {Number} amount 广告金额
 * @apiSuccess {Number} channelId 频道id
 * @apiSuccess {String} createDate 创建时间
 * @apiSuccess {String} createOpr 创建人
 * @apiSuccess {String} endDate 结束时间
 * @apiSuccess {Number} guanggaoId 广告id
 * @apiSuccess {String} guanggaoName 广告
 * @apiSuccess {Number} guanggaoweiId 广告位id
 * @apiSuccess {String} guanggaoweiName 广告位
 * @apiSuccess {Number} id 计划id
 * @apiSuccess {String} keywords 关键词
 * @apiSuccess {String} lastModify 最后修改时间
 * @apiSuccess {String} name 名称
 * @apiSuccess {String} pageAlias 广告位页面
 * @apiSuccess {Number} pageId 页面id
 * @apiSuccess {Number} payable 广告小计
 * @apiSuccess {Number} pos 
 * @apiSuccess {Number} sortId 排序字段
 * @apiSuccess {String} startDate 开始时间
 * @apiSuccess {Number} state 状态
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":{
 *          amount: 5
 *          channelId: 87
 *          createDate: "2020-12-08T16:14:10.000+0800"
 *          createOpr: "金晶"
 *          endDate: "2021-01-08T00:00:00.000+0800"
 *          guanggaoId: 9975948
 *          guanggaoName: "石塑管业"
 *          guanggaoweiId: 2301
 *          guanggaoweiName: "cgxxIndexAd-b1"
 *          id: 9974927
 *          keywords: ""
 *          lastModify: "2020-12-08T16:14:09.000+0800"
 *          name: "石塑管业"
 *          pageAlias: "采购信息页广告"
 *          pageId: 592
 *          payable: 31
 *          pos: 0
 *          sortId: 0
 *          startDate: "2020-12-08T00:00:00.000+0800"
 *          state: 1
 *        },
 *        total: 1
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

/**
 * @api {post} /osc/ad/fbjh/add 发布计划列表/添加
 * @apiName add
 * @apiGroup 广告管理
 *
 * @apiParam {Number} name 当前页码数
 * @apiParam {Number} keywords 当前页条数
 * @apiParam {String} sortId 排序字段
 * @apiParam {String} startDate 开始时间
 * @apiParam {String} endDate 结束时间
 * @apiParam {String} state 状态
 * @apiParam {String} amount 广告金额
 * @apiParam {String} guanggaoId 广告id
 * @apiParam {String} guanggaoweiId 广告位id
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

/**
 * @api {post} /osc/ad/fbjh/update/id 发布计划列表/编辑
 * @apiName update
 * @apiGroup 广告管理
 *
 * @apiParam {Number} name 当前页码数
 * @apiParam {Number} keywords 当前页条数
 * @apiParam {String} sortId 排序字段
 * @apiParam {String} startDate 开始时间
 * @apiParam {String} endDate 结束时间
 * @apiParam {String} state 状态
 * @apiParam {String} amount 广告金额
 * @apiParam {String} guanggaoId 广告id
 * @apiParam {String} guanggaoweiId 广告位id
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

 /**
 * @api {delete} /osc/ad/fbjh/delete/id 发布计划列表/删除
 * @apiName delete
 * @apiGroup 广告管理
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

  /**
 * @api {get} /osc/ad/fbjh/over/id 发布计划列表/结束
 * @apiName over
 * @apiGroup 广告管理
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

/* 信息体验报告 */
/**
 * @api {get} /osc/presale/list 列表查询
 * @apiName list
 * @apiGroup 信息体验报告
 *
 * @apiParam {Number} page 当前页码数
 * @apiParam {Number} size 当前页条数
 * @apiParam {String} search 手机号 [非必填]
 *
 * @apiSuccess {String} department 所在部门
 * @apiSuccess {String} department 员工姓名
 * @apiSuccess {String} id 报告ID
 * @apiSuccess {Number} status 状态 1-已生成，0-未生成
 * @apiSuccess {String} submitTime 提交时间
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":{
 *          department: "网络营销部"
 *          employName: "马庚铎（8033）"
 *          id: "13552822691"
 *          status: 1
 *          submitTime: "2020-11-17 16:02:20"
 *        },
 *        total: 1
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

/**
 * @api {post} /osc/presale/info 编辑
 * @apiName info
 * @apiGroup 信息体验报告
 *
 * @apiParam {String} area1 地区1 [非必填]
 * @apiParam {String} area2 地区2 [非必填]
 * @apiParam {String} area3 地区3 [非必填]
 * @apiParam {String} companyName 企业名称
 * @apiParam {Number} id 关键词id
 * @apiParam {String} keyword1 关键词1  [非必填]
 * @apiParam {String} keyword2 关键词2  [非必填]
 * @apiParam {String} keyword3 关键词3  [非必填]
 * @apiParam {String} phone 手机号
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

 /**
 * @api {get} /osc/presale/update/id 查看关键词
 * @apiName update
 * @apiGroup 信息体验报告
 *
 * @apiSuccess {String} area1 地区1
 * @apiSuccess {String} area2 地区2
 * @apiSuccess {String} area3 地区3
 * @apiSuccess {String} companyName 企业名称
 * @apiSuccess {Number} id 关键词id
 * @apiSuccess {String} contact 联系电话
 * @apiSuccess {String} createTime 创建时间
 * @apiSuccess {String} updateTime 编辑时间
 * @apiSuccess {Number} status 状态
 * @apiSuccess {String} keyword1 关键词1 
 * @apiSuccess {String} keyword2 关键词2 
 * @apiSuccess {String} keyword3 关键词3 
 * @apiSuccess {String} phone 手机号
 * @apiSuccessExample Success-Response:
 *    {
 *      "success": true,
 *      "message": "success",
 *      "code": 200,
 *      "timestamp": 1606957730894,
 *      "result":{
 *        area1: "内蒙古，天津，山西"
 *        area2: "内蒙古，山西，天津"
 *        area3: null
 *        companyName: "国质（北京）建设工程检测鉴定中心"
 *        contact: "18201604861"
 *        createTime: "2020-11-17 15:59:23"
 *        id: 27
 *        keyword1: "房屋检测"
 *        keyword2: "房屋安全性鉴定"
 *        keyword3: null
 *        phone: "13552822691"
 *        status: 1
 *        updateTime: "2021-01-25 16:34:22"
 *      }
 *    }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

  /**
 * @api {get} /osc/presale/detail/id 报告详情
 * @apiName detail
 * @apiGroup 信息体验报告
 *
 * @apiSuccess {Array} area 地区
 * @apiSuccess {String} keyword 关键词 
 * @apiSuccess {String} companyName 企业名称
 * @apiSuccess {String} contact 联系电话
 * @apiSuccess {String} phone 手机号
 * @apiSuccess {Array} data 项目列表
 * @apiSuccessExample Success-Response:
 *    {
 *      "success": true,
 *      "message": "success",
 *      "code": 200,
 *      "timestamp": 1611564384360,
 *      "result": {
 *        "contact": "18201604861",
 *        "list": [
 *          {
 *            "keyword": "房屋检测",
 *            "areas": [
 *              "内蒙古",
 *              "天津",
 *              "山西"
 *            ],
 *            "companyName": null,
 *            "data": [
 *              {
 *                "title": "特种设备安全检测检验询价公告",
 *                "infoType": 1010,
 *                "areaId": 6,
 *                "publishDate": 1605196800000
 *              }
 *            ]
 *          },
 *          {
 *            "keyword": "房屋安全性鉴定",
 *            "areas": [
 *              "内蒙古",
 *              "山西",
 *              "天津"
 *            ],
 *            "companyName": null,
 *            "data": [
 *              {
 *                "title": "内蒙古经贸学校2020年食堂、学生宿舍楼房屋结构检测、结构安全性及抗震性能鉴定服务机构选聘项目变更公告",
 *                "infoType": 1010,
 *                "areaId": 7,
 *                "publishDate": 1591804800000
 *              }
 *            ]
 *          },
 *          {
 *            "keyword": null,
 *            "areas": null,
 *            "companyName": "国质（北京）建设工程检测鉴定中心",
 *            "data": [
 *              {
 *                "title": "煅烧车间、原料转运站、新建化验室、新建厕所安全性检测、鉴定技术服务项目中标公示",
 *                "infoType": 1020,
 *                "areaId": 16,
 *                "publishDate": 1600012800000
 *              }
 *            ]
 *          }
 *        ]
 *      }
 *    }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

 /* 信息推荐 */
/**
 * @api {post} /osc/infotj/gx/show_infos 列表查询
 * @apiName show_infos
 * @apiGroup 信息推荐
 *
 * @apiParam {Number} page 当前页码数
 * @apiParam {Number} size 当前页条数
 * @apiParam {Number} blocksId blocksId 
 * @apiParam {Number} ztid ztid 
 * @apiParam {String} qtype 查询方式 [非必填] 信息ID：info_id， 标题：title
 * @apiParam {String} query 查询内容 [非必填]
 *
 * @apiSuccess {String} id 信息id
 * @apiSuccess {String} title 信息标题
 * @apiSuccess {String} publish_date 发布时间
 * @apiSuccess {String} url 信息跳转链接
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":{
 *          id: "2086132428"
 *          infoType: null
 *          ok_status: "Y"
 *          publish_date: "2021-01-25 00:00:00"
 *          status: null
 *          table_name: "ZBXX"
 *          table_name2: "ZBGG"
 *          title: "遂川县垃圾焚烧发电项目设备日常检修维护保养及设备保洁（二次）招标公告"
 *          url: "https://www.chinabidding.cn/zbgg/n3s9mD.html"
 *        },
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

 /**
 * @api {post} /osc/infotj/gx/up 上移
 * @apiName up
 * @apiGroup 信息推荐
 *
 * @apiParam {Number} blocksId blocksId 
 * @apiParam {Number} ztid ztid 
 * @apiParam {String} infosId 信息id
 * 
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

  /**
 * @api {post} /osc/infotj/gx/down 下移
 * @apiName down
 * @apiGroup 信息推荐
 *
 * @apiParam {Number} blocksId blocksId 
 * @apiParam {Number} ztid ztid 
 * @apiParam {String} infosId 信息id
 * 
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

/**
 * @api {post} /osc/infotj/gx/delete 删除
 * @apiName delete
 * @apiGroup 信息推荐
 *
 * @apiParam {Number} blocksId blocksId 
 * @apiParam {Number} ztid ztid 
 * @apiParam {Array} ids 信息id
 * 
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */


/**
 * @api {post} /osc/infotj/gx/search_list 推荐列表
 * @apiName delete
 * @apiGroup 信息推荐
 *
 * @apiParam {Number} page 当前页码数
 * @apiParam {Number} size 当前页条数
 * @apiParam {Number} id id [非必填] 
 * 
 * @apiSuccess {String} id 信息id
 * @apiSuccess {String} title 标题
 * @apiSuccess {String} url 跳转链接
 * @apiSuccess {String} infoType 信息类型
 * @apiSuccess {String} status 信息状态
 * @apiSuccess {String} publish_date 发布时间
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":{
 *          id: "2086132428"
 *          infoType: "招标预告"
 *          ok_status: "Y"
 *          publish_date: "2021-01-25 00:00:00"
 *          status: "已发布"
 *          table_name: "ZBXX"
 *          table_name2: "ZBGG"
 *          title: "遂川县垃圾焚烧发电项目设备日常检修维护保养及设备保洁（二次）招标公告"
 *          url: "https://www.chinabidding.cn/zbgg/n3s9mD.html"
 *        },
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

 /**
 * @api {post} /osc/infotj/gx/recommand 推荐
 * @apiName recommand
 * @apiGroup 信息推荐
 *
 * @apiParam {Number} blocksId blocksId 
 * @apiParam {Number} ztid ztid 
 * @apiParam {Array} ids 信息id
 * 
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

  /**
 * @api {get} /osc/infotj/gx/more 获取总条数
 * @apiName more
 * @apiGroup 信息推荐
 *
 * @apiParam {Number} blocksId blocksId 
 * @apiParam {Number} ztid ztid 
 * 
 * @apiSuccess {Number} result 总条数
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":100
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

/* 网站管理 */
/**
 * @api {get} /osc/website/sites/list 站点/列表
 * @apiName list
 * @apiGroup 网站管理
 *
 * @apiParam {Number} page 当前页码数
 * @apiParam {Number} size 当前页条数
 *
 * @apiSuccess {String} alias 别名
 * @apiSuccess {Number} id 站点id
 * @apiSuccess {String} name 名称
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "count":1
 *        "result":{
 *          alias: "采招英文网"
 *          id: 1
 *          name: "chinabidding_en"
 *        },
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

 /**
 * @api {post} /osc/website/sites/add 站点/添加
 * @apiName add
 * @apiGroup 网站管理
 *
 * @apiParam {String} name 登录名
 * @apiParam {String} alias 别名
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

  /**
 * @api {post} /osc/website/sites/update/id 站点/编辑
 * @apiName update
 * @apiGroup 网站管理
 *
 * @apiParam {String} name 登录名
 * @apiParam {String} alias 别名
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

  /**
 * @api {delete} /osc/website/sites/del/id 站点/删除
 * @apiName del
 * @apiGroup 网站管理
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

 /**
 * @api {post} /osc/website/channels/list 频道/列表
 * @apiName list
 * @apiGroup 网站管理
 *
 * @apiParam {Number} page 当前页码数
 * @apiParam {Number} size 当前页条数
 *
 * @apiSuccess {String} alias 别名
 * @apiSuccess {Number} id 频道id
 * @apiSuccess {String} name 频道名称
 * @apiSuccess {String} siteId 站点id
 * @apiSuccess {String} siteName 站点名称
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "count":1
 *        "result":{
 *          alias: "新闻"
 *          id: 3
 *          name: "cblen.News"
 *          siteId: 1
 *          siteName: "采招英文网"
 *        },
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

 /**
 * @api {post} /osc/website/channels/add 频道/添加
 * @apiName add
 * @apiGroup 网站管理
 *
 * @apiParam {String} name 登录名
 * @apiParam {String} alias 别名
 * @apiParam {Number} siteId 站点id
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

  /**
 * @api {post} /osc/website/channels/update/id 频道/编辑
 * @apiName update
 * @apiGroup 网站管理
 *
 * @apiParam {String} name 登录名
 * @apiParam {String} alias 别名
 * @apiParam {Number} siteId 站点id
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

  /**
 * @api {delete} /osc/website/channels/del/id 频道/删除
 * @apiName del
 * @apiGroup 网站管理
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

  /**
 * @api {post} /osc/website/pages/list 页面/列表
 * @apiName list
 * @apiGroup 网站管理
 *
 * @apiParam {Number} page 当前页码数
 * @apiParam {Number} size 当前页条数
 *
 * @apiSuccess {String} alias 别名
 * @apiSuccess {String} channelName 频道名
 * @apiSuccess {Number} id 频道id
 * @apiSuccess {String} name 页面名称
 * @apiSuccess {String} channelId 频道id
 * @apiSuccess {String} title 标题
 * @apiSuccess {String} keywords 关键词
 * @apiSuccess {String} description 描述
 * @apiSuccess {String} css css
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "count":1
 *        "result":{
 *          alias: "首页",
 *          channelId: 2,
 *          channelName: "Infos",
 *          css: null,
 *          description: null,
 *          id: 2,
 *          keywords: null,
 *          name: "cblen.Infos.index",
 *          title: null,
 *        },
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

 /**
 * @api {post} /osc/website/pages/add 页面/添加
 * @apiName add
 * @apiGroup 网站管理
 *
 * @apiParam {String} name 登录名
 * @apiParam {String} alias 别名
 * @apiParam {Number} channelId 站点id
 * @apiParam {String} title 标题
 * @apiParam {String} keywords 关键词
 * @apiParam {String} describe 描述
 * @apiParam {String} css css
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

  /**
 * @api {post} /osc/website/pages/update/id 页面/编辑
 * @apiName update
 * @apiGroup 网站管理
 *
 * @apiParam {String} name 登录名
 * @apiParam {String} alias 别名
 * @apiParam {Number} channelId 站点id
 * @apiParam {String} title 标题
 * @apiParam {String} keywords 关键词
 * @apiParam {String} describe 描述
 * @apiParam {String} css css
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

/**
 * @api {delete} /osc/website/pages/remove/[id] 页面/删除
 * @apiName remove
 * @apiGroup 网站管理
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */


  /**
 * @api {post} /osc/website/blocks/list 数据/列表
 * @apiName list
 * @apiGroup 网站管理
 *
 * @apiParam {Number} page 当前页码数
 * @apiParam {Number} size 当前页条数
 *
 * @apiSuccess {String} alias 别名
 * @apiSuccess {String} query sql语句
 * @apiSuccess {Number} id 数据id
 * @apiSuccess {String} name 数据名称
 * @apiSuccess {String} sphinx_query sphinx_sql语句
 * @apiSuccess {String} url 地址
 * @apiSuccess {Number} rp 显示条数
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "count":1
 *        "result":{
 *          alias: "mainFlash",
 *          id: 1,
 *          isShowDescription: 0,
 *          isShowTotal: 0,
 *          name: "mainFlash",
 *          query: "",
 *          rp: 10,
 *          sphinx_area: null,
 *          sphinx_cate: null,
 *          sphinx_classaid: null,
 *          sphinx_query: null,
 *          sphinx_table_name: null,
 *          sphinx_table_name2: null,
 *          url: "/public/cblen/flash/flash.swf",
 *        },
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

 /**
 * @api {post} /osc/website/blocks/add 数据/添加
 * @apiName add
 * @apiGroup 网站管理
 *
 * @apiParam {String} name 登录名
 * @apiParam {String} alias 别名
 * @apiParam {String} query sql语句
 * @apiParam {String} sphinx_query sphinx_sql语句
 * @apiParam {String} url 任务地址
 * @apiParam {Number} rp 显示条数
 * @apiParam {Boolean} isShowDescription isShowDescription
 * @apiParam {Boolean} isShowTotal isShowTotal
 * @apiParam {Array} pages 页面id
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

  /**
 * @api {post} /osc/website/blocks/update/id 数据/编辑
 * @apiName update
 * @apiGroup 网站管理
 *
 * @apiParam {String} name 登录名
 * @apiParam {String} alias 别名
 * @apiParam {String} query sql语句
 * @apiParam {String} sphinx_query sphinx_sql语句
 * @apiParam {String} url 任务地址
 * @apiParam {Number} rp 显示条数
 * @apiParam {Boolean} isShowDescription isShowDescription
 * @apiParam {Boolean} isShowTotal isShowTotal
 * @apiParam {Array} pages 页面id
 * @apiParam {String} sphinx_table_name sphinx_table_name
 * @apiParam {String} sphinx_table_name2 sphinx_table_name2
 * @apiParam {String} sphinx_area sphinx_area
 * @apiParam {String} sphinx_cate sphinx_cate
 * @apiParam {String} sphinx_classaid sphinx_classaid
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */

/**
 * @api {delete} /osc/website/blocks/del/[id] 数据/删除
 * @apiName del
 * @apiGroup 网站管理
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "success": true,
 *        "message": "success",
 *        "code": 200,
 *        "timestamp": 1606957730894,
 *        "result":null
 *     }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code401 Unauthorized
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code403 Forbidden
 * @apiErrorExample Error-Response:
 * HTTP/1.1 code404 Not Found
 */