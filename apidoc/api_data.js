define({ "api": [
  {
    "type": "post",
    "url": "/osc/block/theme/add",
    "title": "主题管理/添加主题",
    "name": "add",
    "group": "专题管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "busroomImg",
            "description": "<p>商务室图标路径</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "distributeHoverImg",
            "description": "<p>分类hover状态图标路径</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "distributeImg",
            "description": "<p>分类图标路径</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "enclosureHoverImg",
            "description": "<p>下载hover状态图标路径</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "enclosureImg",
            "description": "<p>下载图标路径</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "isDeleted",
            "description": "<p>主题状态 0-启用，1-禁用</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyColor",
            "description": "<p>关键词背景色</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "loginImg",
            "description": "<p>登录图标路径</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mallImg",
            "description": "<p>采砖商城图标路径</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>主题名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "publishImg",
            "description": "<p>发公告图标路径</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "registerImg",
            "description": "<p>注册图标路径</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "themeColor",
            "description": "<p>主题色</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"添加主题成功\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "post",
    "url": "/osc/block/channel/keywords/add",
    "title": "关键词列表/添加关键词",
    "name": "add",
    "group": "专题管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "blocksId",
            "description": "<p>模块id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keywords",
            "description": "<p>关键词</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "times",
            "description": "<p>次数 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>总数 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "yesterdayCount",
            "description": "<p>昨日统计次数 [非必填]</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"新增成功\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "post",
    "url": "/osc/block/channel/add_banner",
    "title": "模块管理/添加（编辑）轮播图",
    "name": "add_banner",
    "group": "专题管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "channelId",
            "description": "<p>频道id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "blockId",
            "description": "<p>模块id [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "list",
            "description": "<p>轮播图列表 [列表中参数如下]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>图片跳转链接</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>图片背景色</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>图片路径</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "banner_block_id",
            "description": "<p>轮播图模块id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n         \"banner_block_id\": 600123\t\n       }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "post",
    "url": "/osc/block/channel/add_data",
    "title": "模块管理/添加（编辑）数据展示模块",
    "name": "add_data",
    "group": "专题管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "name",
            "description": "<p>模块标题</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "blockId",
            "description": "<p>模块id [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "channelId",
            "description": "<p>频道id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "defaultKey",
            "description": "<p>默认关键词</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "showType",
            "description": "<p>展示方式 1:关键词，2:进展，3:了解更多，4:立即下载，5:立即咨询</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "queryType",
            "description": "<p>查询方式 0:不匹配，1:标题，2:内容，3:附件，4:VIP</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sphinxQuery",
            "description": "<p>查询关键词 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "categoryIds",
            "description": "<p>一级行业 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "caegoryIds2",
            "description": "<p>搜索范围 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "componentId",
            "description": "<p>模块位置id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortNo",
            "description": "<p>排序值</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "xxxx_block_id",
            "description": "<p>模块id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n         \"xxxx_block_id\": 600123\t\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "post",
    "url": "/osc/block/channel/add_menu",
    "title": "模块管理/添加（编辑）菜单栏",
    "name": "add_menu",
    "group": "专题管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "file",
            "description": "<p>导航栏名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "channelId",
            "description": "<p>频道id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "blockId",
            "description": "<p>模块id [非必填]</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "menu_block_id",
            "description": "<p>菜单栏模块id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n         \"menu_block_id\": 600123\t\n       }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "post",
    "url": "/osc/block/channel/add_navi",
    "title": "模块管理/添加（编辑）导航栏",
    "name": "add_navi",
    "group": "专题管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>导航栏名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "channelId",
            "description": "<p>频道id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contentList",
            "description": "<p>导航栏内容</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "blockId",
            "description": "<p>模块id [非必填]</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "navi_block_id",
            "description": "<p>导航栏模块id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n         \"navi_block_id\": 600123\t\n       }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "post",
    "url": "/osc/block/channel/add",
    "title": "频道管理/添加频道",
    "name": "add_product_keywords",
    "group": "专题管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "channelName",
            "description": "<p>频道名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>频道描述</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"新增频道成功\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "post",
    "url": "/osc/block/channel/add_right",
    "title": "模块管理/添加(编辑)彩色数据模块",
    "name": "add_right",
    "group": "专题管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "channelId",
            "description": "<p>频道id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "blockId",
            "description": "<p>模块id [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contentList",
            "description": "<p>右边展示数据 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>右边展示模块标题</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "right_block_id",
            "description": "<p>右边数据模块id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n       {\n         \"right_block_id\": 600123\t\n       }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "post",
    "url": "/osc/block/channel/channel_status/id",
    "title": "频道管理/状态切换",
    "name": "channel_status",
    "group": "专题管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "isDeleted",
            "description": "<p>频道状态</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"修改状态成功\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "delete",
    "url": "/osc/block/theme/del/id",
    "title": "主题管理/删除频主题",
    "name": "del",
    "group": "专题管理",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"删除主题成功\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "post",
    "url": "/osc/block/channel/keywords/delete",
    "title": "关键词列表/删除关键词",
    "name": "delete",
    "group": "专题管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "ids",
            "description": "<p>关键词id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"删除成功\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "get",
    "url": "/osc/block/channel/delete_channel/id",
    "title": "频道管理/删除频道",
    "name": "delete_channel",
    "group": "专题管理",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"删除成功\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "post",
    "url": "/osc/block/channel/delete_content_block",
    "title": "模块管理/删除中间数据模块",
    "name": "delete_content_block",
    "group": "专题管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "color_blockId",
            "description": "<p>彩色数据模块id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "content_blockId",
            "description": "<p>中间数据模块id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"删除成功\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "get",
    "url": "/osc/block/channel/delete_showdata",
    "title": "模块管理/删除数据展示模块",
    "name": "delete_showdata",
    "group": "专题管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "blockId",
            "description": "<p>模块id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"删除成功\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\": \"showdata_block_id = 600125\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "get",
    "url": "/osc/block/channel/showdata/detail/id",
    "title": "模块管理/获取数据展示模块详情",
    "name": "detail",
    "group": "专题管理",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "caegory_ids2",
            "description": "<p>搜索范围</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "category_ids",
            "description": "<p>一级行业</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "default_key",
            "description": "<p>默认关键词</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>模块标题</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "query_type",
            "description": "<p>查询方式</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "show_type",
            "description": "<p>展示方式</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "sort_no",
            "description": "<p>排序值</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sphinx_query",
            "description": "<p>关键词</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   caegory_ids2: \"\"\n   category_ids: \"\"\n   default_key: \"一次\"\n   name: \"一次\"\n   query_type: 2\n   show_type: \"1\"\n   sort_no: 1\n   sphinx_query: \"6kV变压器\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "get",
    "url": "/osc/block/channel/colorblock/detail/id",
    "title": "模块管理/获取色数据模块详情",
    "name": "detail",
    "group": "专题管理",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>模块字体色</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "img_url",
            "description": "<p>模块背景图片路径</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>模块展示数据列表</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"color\": \"#537190\",\n   \"img_url\": \"./img/bg.png\",\n   \"data\":  [\n     {\n       \"name\": \"电力\",\n       \"search\":\"发电机 水电\",\n       \"type\": 1\n     }\n   ],\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "post",
    "url": "/osc/block/channel/generate_key",
    "title": "模块管理/生成关键词",
    "name": "generate_key",
    "group": "专题管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "andKey",
            "description": "<p>与值</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "orKey",
            "description": "<p>或值</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": "<p>生成方式</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result",
            "description": "<p>响应数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\": \"电力&医疗&发电\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "get",
    "url": "/osc/block/channel/keywords/id",
    "title": "关键词列表/获取关键词列表",
    "name": "keywords",
    "group": "专题管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>当前页条数</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>主题id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "isDeleted",
            "description": "<p>状态</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "keywords",
            "description": "<p>关键词</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "times",
            "description": "<p>次数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>总数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "blocksId",
            "description": "<p>模块id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "upTime",
            "description": "<p>更新时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "yesterdayCount",
            "description": "<p>昨日统计次数</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n      \"total\": 1,\n      \"list\":[\n       {\n          \"id\": \"1330369444005826560\",\t\n          \"isDeleted\": 0,\t\t\t\t\t\t\n          \"keywords\": \"风电&联轴器\",\t\t\n          \"times\": 1,\t\t\t\t\t\n          \"total\": 12,\t\t\t\t\t\n          \"blocksId\": 600210,\t\t\t\n          \"upTime\": \"2020-12-02 15:47:11\",\n          \"yesterdayCount\": 0,\t\t\n       }\n     ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "get",
    "url": "/osc/block/channel/list",
    "title": "频道管理/频道列表查询",
    "name": "list",
    "group": "专题管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>当前页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": "<p>查询关键词</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>频道id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "channelName",
            "description": "<p>频道名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "inTime",
            "description": "<p>产品词id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "isDeleted",
            "description": "<p>频道状态 0-启用，1-禁用，2-测试，3-汇总</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "sortNo",
            "description": "<p>排序</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "tempalteId",
            "description": "<p>模板id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "themeId",
            "description": "<p>主题色id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "themeName",
            "description": "<p>主题色名称</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "areaIds",
            "description": "<p>地区id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n      \"count\": 1,\n      \"list\":[\n       {\n         \"id\": 1,\t\t\t\t\t\t\t\t\t\n         \"channelName\": \"电力频道\",\t\t\n         \"description\": \"这是一个电力频道\",\t\t\n         \"inTime\": \"2020-11-25T11:01:20.000+0800\"\n         \"isDeleted\": 0,\t\t\n         \"sortNo\": null,\t\t\t\n         \"tempalteId\": 1,\t\t\t\t\n         \"themeId\": 4,\t\t\t\t\t\t\n         \"themeName\": \"国网绿\",\t\t\t\t\n         \"areaIds\": null\t\t\t\n       }\n     ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "get",
    "url": "/osc/block/theme/list",
    "title": "主题管理/主题列表查询",
    "name": "list",
    "group": "专题管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>当前页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": "<p>查询关键词</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>主题id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "busroomImg",
            "description": "<p>商务室图标路径</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "distributeHoverImg",
            "description": "<p>分类hover状态图标路径</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "distributeImg",
            "description": "<p>分类图标路径</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "enclosureHoverImg",
            "description": "<p>下载hover状态图标路径</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "enclosureImg",
            "description": "<p>下载图标路径</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "isDeleted",
            "description": "<p>主题状态 0-启用，1-禁用</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "keyColor",
            "description": "<p>关键词背景色</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "loginImg",
            "description": "<p>登录图标路径</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mallImg",
            "description": "<p>采砖商城图标路径</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>主题名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "publishImg",
            "description": "<p>发公告图标路径</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "registerImg",
            "description": "<p>注册图标路径</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "themeColor",
            "description": "<p>主题色</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n      \"count\": 1,\n      \"list\":[\n       {\n         \"id\": 1,\t\t\t\t\t\t\n         \"busroomImg\": \"../img/channel/health/shangwushi.png\",\t\n         \"distributeHoverImg\": \"../img/channel/health/ylzt_cont_icon1.png\",\n         \"distributeImg\": \"../img/channel/white_arrow02.png\"\t\n         \"enclosureHoverImg\":\"../img/channel/health/ylzt_cont_icon_xzhover.png\",\t\n         \"enclosureImg\": \"../img/channel/zt_cont_icon_xz.png\",\t\n         \"isDeleted\": 1,\t\t\t\t\n         \"keyColor\":\"#e3fdff\",\t\n         \"loginImg\": \"../img/channel/health/ylsy_cont_icon4.png\",\n         \"mallImg\": \"../img/channel/health/shangcheng.png\",\t\t\n         \"name\": \"浅青色\",\t\t\t\n         \"publishImg\": \"../img/channel/health/ylsy_cont_icon5.png\",\n         \"registerImg\": \"../img/channel/health/ylsy_cont_icon3.png\",\n         \"themeColor\": \"#0ec0cb\",\t\t\n       }\n     ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "post",
    "url": "/osc/block/channel/save_color_block",
    "title": "模块管理/编辑彩色数据模块",
    "name": "save_color_block",
    "group": "专题管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "color",
            "description": "<p>模块字体色</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "imgurl",
            "description": "<p>模块背景图片路径</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "blockId",
            "description": "<p>模块id [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "list",
            "description": "<p>模块展示数据列表 [列表中参数如下]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>数据标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": "<p>数据关键词</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": "<p>查询方式 1：内容，2：标题</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "color_block_id",
            "description": "<p>彩色模块id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n       {\n         \"color_block_id\": 600123\t\n       }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "get",
    "url": "/osc/block/channel/select_theme",
    "title": "模块管理/选择（编辑）主题",
    "name": "select_theme",
    "group": "专题管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "themeId",
            "description": "<p>主题id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "channelId",
            "description": "<p>频道id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "blockId",
            "description": "<p>模块id [非必填]</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "theme_block_id",
            "description": "<p>模块id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n         \"theme_block_id\": 600123\t\n       }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "get",
    "url": "/osc/block/channel/themelist",
    "title": "模块管理/获取所有主题",
    "name": "themelist",
    "group": "专题管理",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>主题id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "isDeleted",
            "description": "<p>状态</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>主题名称</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n      \"list\":[\n       {\n         \"id\": 1,\t\t\t\t\n         \"isDeleted\": 0,\t\n         \"name\": \"浅青色\"\t\n       }\n     ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "post",
    "url": "/osc/block/channel/update/id",
    "title": "频道管理/编辑频道",
    "name": "update",
    "group": "专题管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "channelName",
            "description": "<p>频道名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>频道描述</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"编辑频道成功\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "put",
    "url": "/osc/block/theme/update/id",
    "title": "主题管理/编辑主题",
    "name": "update",
    "group": "专题管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "busroomImg",
            "description": "<p>商务室图标路径</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "distributeHoverImg",
            "description": "<p>分类hover状态图标路径</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "distributeImg",
            "description": "<p>分类图标路径</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "enclosureHoverImg",
            "description": "<p>下载hover状态图标路径</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "enclosureImg",
            "description": "<p>下载图标路径</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "isDeleted",
            "description": "<p>主题状态 0-启用，1-禁用</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyColor",
            "description": "<p>关键词背景色</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "loginImg",
            "description": "<p>登录图标路径</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mallImg",
            "description": "<p>采砖商城图标路径</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>主题名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "publishImg",
            "description": "<p>发公告图标路径</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "registerImg",
            "description": "<p>注册图标路径</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "themeColor",
            "description": "<p>主题色</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"编辑主题成功\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "post",
    "url": "/osc/block/channel/keywords/update",
    "title": "关键词列表/编辑关键词",
    "name": "update",
    "group": "专题管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "blocksId",
            "description": "<p>模块id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>关键词id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keywords",
            "description": "<p>关键词</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "times",
            "description": "<p>次数 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>总数 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "yesterdayCount",
            "description": "<p>昨日统计次数 [非必填]</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"修改成功\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "get",
    "url": "/osc/block/channel/view_menu/id",
    "title": "模块管理/获取上传文件详情",
    "name": "view_menu",
    "group": "专题管理",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":[\n     {\n       \"title\": [\n         \"adImg\": [\n           {\n             \"txt1\": \"./img/ad.png\",\t\t\t\n             \"txt_a\": \"javascript:void(0);\"\t\t\n           }\n         ],\n         \"content\": [\n           {\n             \"hotkey\": [],\n             \"hotlist\": [\n               {\n                 \"txt1\": \"环保工程\",\t\t\n                 \"txt_a\": \"/search/Searchgj/zbcg?keywords=环保工程专业承包&b_date=week\" \t\n               },\n             ],\n             \"hottxt\": [\n               {\n                 \"txt1\": \"环境综合治理\",\t\n                 \"txt_a\": \"/search/Searchgj/zbcg?keywords=环境综合治理&b_date=week\" \t\n               }\n             ]\n           }\n         ],\n         \"title\": [\n           {\n             \"txt1\": \"治理、修复工程\",\t\n             \"txt_a\": \"\"\n           }\n         ]\n       ]\n     }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "get",
    "url": "/osc/block/channel/detail/id",
    "title": "模块管理/获取模块详情",
    "name": "view_menu",
    "group": "专题管理",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n  {\n    \"new_data_block\": {\t\t\t\t\n      \"show_type\": \"3\",\t\t\t\n      \"new_data_block_id\": 600081,\t\t\n      \"name\": \"气候应对\",\t\t\t\n      \"default_key\": \"环保\",\t\t\n      \"sphinx_query\": \"温室气体|碳排放|应对气候变化\",\n      \"query_type\": 2\t\t\t\n    },\n    \"content_block\": [\t\t\t\n      {\n        \"content_block_id\": 600083,\t\t\n        \"sort_no\": 1,\t\t\t\n        \"color_block_id\": 600085,\n        \"name\": \"固体废物\",\t\t\n        \"status\": 1\t\t\t\n      }\n    ],\n    \"AchannelName\": \"环保频道\",\t\n    \"theme_block\": {\t\t\t\n      \"theme_block_id\": 600088,\t\n      \"theme_color\": \"#239951\",\t\n      \"theme_id\": 2,\t\t\t\t\n      \"name\": \"翡翠绿\"\t\t\t\t\n    },\n    \"show_data_block\": [\t\t\t\n      {\n        \"sort_no\": 1,\t\t\t\t\t\n        \"name\": \"蓝天保卫战\",\t\n        \"blocks_id\": 600077\t\t\n      }\n    ],\n    \"banner_block\": [\t\t\t\t// 轮播图模块\n      {\n        \"banner_block_id\": 600090,\t\t\t\n        \"color\": \"#d2e2c7\",\t\t\t\t\t    \n        \"name\": \"javascript:void(0);\",\t\n        \"url\": \"../img/channel/education/huanbao.png\"\n      }\n    ],\n    \"right_block\": [\t\t\t\t\t\t// 右边展示模块\n      {\n        \"right_block_id\": 600087,\t\t\n        \"name\": \"北京市生态环境局\",\t\n        \"title\": \"地方生态环境部门\",\n        \"url\": \"http://sthjj.beijing.gov.cn/\"\n      }\n    ],\n    \"navi_block\": [\t\t\t\t\t\n      {\n        \"navi_block_id\": 600089,\t\n        \"name\": \"蓝天保卫战\",\t\t\t\n        \"title\": \"环保频道分类\"\t\t\n      }\n    ],\n    \"menu_block\": {\t\t\t\t\t\t\n      \"menu_block_id\": 600076\t\n    },\n    \"download_block\": {\t\t\t\t\t\n      \"show_type\": \"4\",\t\t\t\t\t\n      \"download_block_id\": 600082,\t\t\t\n      \"name\": \"附件\",\t\t\t\t\t\n      \"default_key\": \"环保\",\t\n      \"sphinx_query\": \"生态环境&附件下载|生态环境&pdf|生态环境&doc|生态环境&xls\",\t\n      \"query_type\": 2\t\n    }\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "专题管理"
  },
  {
    "type": "get",
    "url": "/osc/presale/detail/id",
    "title": "报告详情",
    "name": "detail",
    "group": "信息体验报告",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "area",
            "description": "<p>地区</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>关键词</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "companyName",
            "description": "<p>企业名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contact",
            "description": "<p>联系电话</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>项目列表</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"success\": true,\n  \"message\": \"success\",\n  \"code\": 200,\n  \"timestamp\": 1611564384360,\n  \"result\": {\n    \"contact\": \"18201604861\",\n    \"list\": [\n      {\n        \"keyword\": \"房屋检测\",\n        \"areas\": [\n          \"内蒙古\",\n          \"天津\",\n          \"山西\"\n        ],\n        \"companyName\": null,\n        \"data\": [\n          {\n            \"title\": \"特种设备安全检测检验询价公告\",\n            \"infoType\": 1010,\n            \"areaId\": 6,\n            \"publishDate\": 1605196800000\n          }\n        ]\n      },\n      {\n        \"keyword\": \"房屋安全性鉴定\",\n        \"areas\": [\n          \"内蒙古\",\n          \"山西\",\n          \"天津\"\n        ],\n        \"companyName\": null,\n        \"data\": [\n          {\n            \"title\": \"内蒙古经贸学校2020年食堂、学生宿舍楼房屋结构检测、结构安全性及抗震性能鉴定服务机构选聘项目变更公告\",\n            \"infoType\": 1010,\n            \"areaId\": 7,\n            \"publishDate\": 1591804800000\n          }\n        ]\n      },\n      {\n        \"keyword\": null,\n        \"areas\": null,\n        \"companyName\": \"国质（北京）建设工程检测鉴定中心\",\n        \"data\": [\n          {\n            \"title\": \"煅烧车间、原料转运站、新建化验室、新建厕所安全性检测、鉴定技术服务项目中标公示\",\n            \"infoType\": 1020,\n            \"areaId\": 16,\n            \"publishDate\": 1600012800000\n          }\n        ]\n      }\n    ]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "信息体验报告"
  },
  {
    "type": "post",
    "url": "/osc/presale/info",
    "title": "编辑",
    "name": "info",
    "group": "信息体验报告",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "area1",
            "description": "<p>地区1 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "area2",
            "description": "<p>地区2 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "area3",
            "description": "<p>地区3 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyName",
            "description": "<p>企业名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>关键词id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword1",
            "description": "<p>关键词1  [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword2",
            "description": "<p>关键词2  [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword3",
            "description": "<p>关键词3  [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "信息体验报告"
  },
  {
    "type": "get",
    "url": "/osc/presale/list",
    "title": "列表查询",
    "name": "list",
    "group": "信息体验报告",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>当前页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": "<p>手机号 [非必填]</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "department",
            "description": "<p>所在部门</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>报告ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>状态 1-已生成，0-未生成</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "submitTime",
            "description": "<p>提交时间</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n     department: \"网络营销部\"\n     employName: \"马庚铎（8033）\"\n     id: \"13552822691\"\n     status: 1\n     submitTime: \"2020-11-17 16:02:20\"\n   },\n   total: 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "信息体验报告"
  },
  {
    "type": "get",
    "url": "/osc/presale/update/id",
    "title": "查看关键词",
    "name": "update",
    "group": "信息体验报告",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "area1",
            "description": "<p>地区1</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "area2",
            "description": "<p>地区2</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "area3",
            "description": "<p>地区3</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "companyName",
            "description": "<p>企业名称</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>关键词id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contact",
            "description": "<p>联系电话</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createTime",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updateTime",
            "description": "<p>编辑时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>状态</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "keyword1",
            "description": "<p>关键词1</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "keyword2",
            "description": "<p>关键词2</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "keyword3",
            "description": "<p>关键词3</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>手机号</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"success\": true,\n  \"message\": \"success\",\n  \"code\": 200,\n  \"timestamp\": 1606957730894,\n  \"result\":{\n    area1: \"内蒙古，天津，山西\"\n    area2: \"内蒙古，山西，天津\"\n    area3: null\n    companyName: \"国质（北京）建设工程检测鉴定中心\"\n    contact: \"18201604861\"\n    createTime: \"2020-11-17 15:59:23\"\n    id: 27\n    keyword1: \"房屋检测\"\n    keyword2: \"房屋安全性鉴定\"\n    keyword3: null\n    phone: \"13552822691\"\n    status: 1\n    updateTime: \"2021-01-25 16:34:22\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "信息体验报告"
  },
  {
    "type": "post",
    "url": "/osc/ad/ggw/add",
    "title": "广告位列表/添加广告位",
    "name": "add",
    "group": "广告管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>广告位名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "alias",
            "description": "<p>别名</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>价格</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "fileType",
            "description": "<p>文件类型值</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "amount",
            "description": "<p>个数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "height",
            "description": "<p>文件高度</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "delFlag",
            "description": "<p>是否可用 1：是，0：否</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageId",
            "description": "<p>页面id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "post",
    "url": "/osc/ad/gg/add",
    "title": "广告列表/添加广告",
    "name": "add",
    "group": "广告管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>登录名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "alias",
            "description": "<p>别名 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>标题 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "yezhuId",
            "description": "<p>业主id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "linkAddress",
            "description": "<p>链接地址 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "width",
            "description": "<p>宽度 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "heigth",
            "description": "<p>高度  [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>描述 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "fileType",
            "description": "<p>文件类型  [非必填]</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "post",
    "url": "/osc/ad/yz/add",
    "title": "业主列表/添加",
    "name": "add",
    "group": "广告管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>登录名</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "post",
    "url": "/osc/ad/fbjh/add",
    "title": "发布计划列表/添加",
    "name": "add",
    "group": "广告管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "name",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "keywords",
            "description": "<p>当前页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortId",
            "description": "<p>排序字段</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>开始时间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>结束时间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>状态</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "amount",
            "description": "<p>广告金额</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "guanggaoId",
            "description": "<p>广告id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "guanggaoweiId",
            "description": "<p>广告位id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "post",
    "url": "/osc/ad/yz/add_gg",
    "title": "业主列表/添加广告",
    "name": "add_gg",
    "group": "广告管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>登录名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "alias",
            "description": "<p>别名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "yezhuId",
            "description": "<p>业主id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "linkAddress",
            "description": "<p>链接地址  [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "width",
            "description": "<p>文件宽度</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "height",
            "description": "<p>文件高度</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "delFlag",
            "description": "<p>是否可用 0-否，1-是</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>活动描述 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "fileType",
            "description": "<p>文件类型</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "delete",
    "url": "/osc/ad/ggw/delete/id",
    "title": "广告位列表/删除广告位",
    "name": "delete",
    "group": "广告管理",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "delete",
    "url": "/osc/ad/gg/delete/id",
    "title": "广告列表/删除广告",
    "name": "delete",
    "group": "广告管理",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "delete",
    "url": "/osc/ad/gg/delete/id",
    "title": "广告列表/上传物料",
    "name": "delete",
    "group": "广告管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>上传文件</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>物料id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "yezhuId",
            "description": "<p>业主id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "delete",
    "url": "/osc/ad/yz/delete/id",
    "title": "业主列表/删除",
    "name": "delete",
    "group": "广告管理",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "delete",
    "url": "/osc/ad/fbjh/delete/id",
    "title": "发布计划列表/删除",
    "name": "delete",
    "group": "广告管理",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "post",
    "url": "/osc/ad/ggw/fbjh",
    "title": "广告位列表/发布计划",
    "name": "fbjh",
    "group": "广告管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>登录名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keywords",
            "description": "<p>关键字</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>开始时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sortId",
            "description": "<p>排序id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>结束时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>状态 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "amount",
            "description": "<p>金额 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "guanggaoId",
            "description": "<p>广告id  [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "guanggaoweiId",
            "description": "<p>广告位id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "post",
    "url": "/osc/ad/gg/fbjh",
    "title": "广告列表/发布计划",
    "name": "fbjh",
    "group": "广告管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>登录名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keywords",
            "description": "<p>关键字</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>开始时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "sortId",
            "description": "<p>排序id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>结束时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>状态 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "amount",
            "description": "<p>金额 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "guanggaoId",
            "description": "<p>广告id  [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "guanggaoweiId",
            "description": "<p>广告位id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "post",
    "url": "/osc/ad/fbjh/gg_list",
    "title": "广告位列表/广告下拉列表",
    "name": "gg_list",
    "group": "广告管理",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>广告id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>广告名称</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":[\n     {\n       id: 1,\n       name: \"北京城市景观研究院国内知名设计院\"\n     }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "get",
    "url": "/osc/ad/ggw/list",
    "title": "广告位列表/广告位列表查询",
    "name": "list",
    "group": "广告管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>当前页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": "<p>关键词 [非必填]</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "alias",
            "description": "<p>别名</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "amount",
            "description": "<p>个数</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "beizhuId",
            "description": "<p>备注</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createDate",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createOpr",
            "description": "<p>创建人</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "delFlag",
            "description": "<p>是否删除 1：是，0：否</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "fileType",
            "description": "<p>文件类型值</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fileTypeMag",
            "description": "<p>文件类型</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "height",
            "description": "<p>文件高度</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>广告位id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastModify",
            "description": "<p>最后修改时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pageAlias",
            "description": "<p>页面别名</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pageId",
            "description": "<p>页面id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pageName",
            "description": "<p>页面名称</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "position",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>价格</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "updateOpr",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "width",
            "description": "<p>文件宽度</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n      \"total\": 1,\n      \"list\":[\n       {\n         \"alias\": \"高级搜索页-A3\",\n         \"amount\": 0,\t\t\t\t\t\t\n         \"beizhuId\": null,\t\t\t   \n         \"createDate\": \"2020-04-18T08:54:08.000+0800\",\n         \"createOpr\": \"测试人员\",\n         \"delFlag\": 1,\t\t\t\t\t\t\n         \"fileType\": 0,\t\t\t\t\t\n         \"fileTypeMag\": \"静态图片及flash\",\n         \"height\": 197,\t\t\n         \"id\":9628672,\t\t\t\n         \"lastModify\": \"2020-07-31T09:28:47.000+0800\",\t\n         \"name\": \"searchgj-right-A3\",\n         \"pageAlias\": \"高级搜索\",\t\t\n         \"pageId\": 607,\t\t\t\t\t\t\n         \"pageName\": \"search.Searchgj.zbcgad\",\n         \"position\": 0,\t\t\n         \"price\": 0,\t\t\t\t\n         \"type\": null,\t\t\t\n         \"updateOpr\": null,\n         \"width\": 197,\t\t\t\n       }\n     ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "get",
    "url": "/osc/ad/gg/list",
    "title": "广告列表/广告列表查询",
    "name": "list",
    "group": "广告管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>当前页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": "<p>关键词 [非必填]</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "alias",
            "description": "<p>别名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "beizhuId",
            "description": "<p>备注</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createDate",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createOpr",
            "description": "<p>创建人</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "delFlag",
            "description": "<p>是否删除 1：是，0：否</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>描述</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dir",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "fileType",
            "description": "<p>文件类型值</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fileTypeMsg",
            "description": "<p>文件类型</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "height",
            "description": "<p>文件高度</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>广告位id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "keywords",
            "description": "<p>关键词</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastModify",
            "description": "<p>最后修改时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>物料文件名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "picName",
            "description": "<p>物料文件名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updateOpr",
            "description": "<p>修改人</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "width",
            "description": "<p>文件宽度</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "yezhuId",
            "description": "<p>业主id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "yezhuName",
            "description": "<p>业主名</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n      \"total\": 1,\n      \"list\":[\n       {\n         \"alias\": \"高级搜索页-A3\",\t\t\n         \"beizhuId\": null,\t\t\t   \t\n         \"createDate\": \"2020-04-18T08:54:08.000+0800\",\t\n         \"createOpr\": \"金晶\",\t\t\n         \"delFlag\": 1,\t\t\t\t\t\n         \"description\":\"\",\t\t\t\n         \"dir\": \"http://gys-public.com/y/191/gg/\",\t\n         \"fileType\": 6,\t\t\t\t\n         \"fileTypeMsg\": \"png\",\t\n         \"height\": 100,\t\t\t\t\n         \"id\": 9975948,\t\t\t\t\n         \"keywords\": null,\t\t\t\n         \"lastModify\":\"2020-12-08T16:12:57.000+0800\",\n         \"linkAddress\": \"http://www.szssslc.cn/\",\t\n         \"name\": \"石塑管业\",\t\t\t\t\t\t\n         \"picName\": \"1607415178894.png\",\t\t\n         \"title\": \"\",\t\t\t\t\t\n         \"type\": null,\t\t\t\t\t\n         \"updateOpr\": \"金晶\",\t\n         \"width\": 197,\t\t\t\t\t\n         \"yezhuId\": 191,\t\t\t\t\n         \"yezhuName\": \"方芳\",\t\n       }\n     ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "get",
    "url": "/osc/ad/gg/list",
    "title": "业主列表/业主列表查询",
    "name": "list",
    "group": "广告管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>当前页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": "<p>关键词 [非必填]</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "beizhuId",
            "description": "<p>备注</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createDate",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createOpr",
            "description": "<p>创建人</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>业主id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastModify",
            "description": "<p>描述</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "salesman",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updateOpr",
            "description": "<p>修改人</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n      \"total\": 1,\n      \"list\":[\n       {\n         beizhuId: null\n         createDate: \"2019-03-01T10:56:41.000+0800\"\n         createOpr: \"测试人员\"\n         id: 221\n         lastModify: \"2019-03-01T10:56:41.000+0800\"\n         name: \"张倩\"\n         salesman: \"测试人员\"\n         updateOpr: null\t\n       }\n     ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "get",
    "url": "/osc/ad/fbjh/list",
    "title": "发布计划列表/列表查询",
    "name": "list",
    "group": "广告管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>当前页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": "<p>关键词 [非必填]</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "amount",
            "description": "<p>广告金额</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "channelId",
            "description": "<p>频道id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createDate",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createOpr",
            "description": "<p>创建人</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "guanggaoId",
            "description": "<p>广告id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "guanggaoName",
            "description": "<p>广告</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "guanggaoweiId",
            "description": "<p>广告位id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "guanggaoweiName",
            "description": "<p>广告位</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>计划id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "keywords",
            "description": "<p>关键词</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastModify",
            "description": "<p>最后修改时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pageAlias",
            "description": "<p>广告位页面</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pageId",
            "description": "<p>页面id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "payable",
            "description": "<p>广告小计</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pos",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "sortId",
            "description": "<p>排序字段</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>开始时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>状态</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n     amount: 5\n     channelId: 87\n     createDate: \"2020-12-08T16:14:10.000+0800\"\n     createOpr: \"金晶\"\n     endDate: \"2021-01-08T00:00:00.000+0800\"\n     guanggaoId: 9975948\n     guanggaoName: \"石塑管业\"\n     guanggaoweiId: 2301\n     guanggaoweiName: \"cgxxIndexAd-b1\"\n     id: 9974927\n     keywords: \"\"\n     lastModify: \"2020-12-08T16:14:09.000+0800\"\n     name: \"石塑管业\"\n     pageAlias: \"采购信息页广告\"\n     pageId: 592\n     payable: 31\n     pos: 0\n     sortId: 0\n     startDate: \"2020-12-08T00:00:00.000+0800\"\n     state: 1\n   },\n   total: 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "get",
    "url": "/osc/ad/fbjh/over/id",
    "title": "发布计划列表/结束",
    "name": "over",
    "group": "广告管理",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "post",
    "url": "/osc/ad/ggw/update/id",
    "title": "广告位列表/编辑广告位",
    "name": "update",
    "group": "广告管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>广告位名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "alias",
            "description": "<p>别名</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>价格</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "fileType",
            "description": "<p>文件类型值</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "amount",
            "description": "<p>个数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "height",
            "description": "<p>文件高度</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "delFlag",
            "description": "<p>是否可用 1：是，0：否</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageId",
            "description": "<p>页面id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "post",
    "url": "/osc/ad/gg/update/id",
    "title": "广告列表/编辑广告",
    "name": "update",
    "group": "广告管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>登录名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "alias",
            "description": "<p>别名 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>标题 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "yezhuId",
            "description": "<p>业主id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "linkAddress",
            "description": "<p>链接地址 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "width",
            "description": "<p>宽度 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "heigth",
            "description": "<p>高度  [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>描述 [非必填]</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "fileType",
            "description": "<p>文件类型  [非必填]</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "post",
    "url": "/osc/ad/yz/update/id",
    "title": "业主列表/编辑",
    "name": "update",
    "group": "广告管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>登录名</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "post",
    "url": "/osc/ad/fbjh/update/id",
    "title": "发布计划列表/编辑",
    "name": "update",
    "group": "广告管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "name",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "keywords",
            "description": "<p>当前页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortId",
            "description": "<p>排序字段</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>开始时间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>结束时间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>状态</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "amount",
            "description": "<p>广告金额</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "guanggaoId",
            "description": "<p>广告id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "guanggaoweiId",
            "description": "<p>广告位id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "get",
    "url": "/osc/ad/gg/yezhu_list",
    "title": "广告列表/获取业主列表",
    "name": "yezhu_list",
    "group": "广告管理",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>业主id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>业主名</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n      \"list\":[\n       {\n           id: 213,\n           name: \"foxfocus.cn\"\n       }\n     ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "get",
    "url": "/osc/ad/yz/id",
    "title": "业主广告列表/业主广告列表查询",
    "name": "yz",
    "group": "广告管理",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>当前页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": "<p>关键词 [非必填]</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "amount",
            "description": "<p>金额</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createDate",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "createOpr",
            "description": "<p>创建人</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>广告id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "name",
            "description": "<p>广告名称</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n     amount: 1\n     createDate: \"2020-02-14 13:35:40\"\n     createOpr: \"测试人员\"\n     id: 533632\n     name: \"test-疫情\"\n   },\n   total: 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "广告管理"
  },
  {
    "type": "post",
    "url": "/osc/up/report/year/add_apply",
    "title": "近一年报告申请/添加报告申请",
    "name": "add_apply",
    "group": "近一年使用报告",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "memberId",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "近一年使用报告"
  },
  {
    "type": "post",
    "url": "/osc/up/report/year/aimuser_list",
    "title": "近一年目标客户/目标客户列表查询",
    "name": "aimuser_list",
    "group": "近一年使用报告",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>当前页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>排序方式 asc：升序，desc：降序</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortName",
            "description": "<p>排序项</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "memberId",
            "description": "<p>用户id [非必填]</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>目标客户id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "isShow",
            "description": "<p>是否显示 1：显示，0：不显示</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>关键词</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "memberId",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "noReadNum",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "readNum",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "seachCount",
            "description": "<p>搜索次数</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n      \"total\": 1,\n      \"list\":[\n       {\n         \"id\": 1054721,\t\t\t\t\t\n         \"isShow\": 1,\t\t\t\t\t\t\n         \"keyword\": \"合肥庐源电力工程有限公司\",\t\t\n         \"memberId\": 200338202,\t\t\t\t\t\n         \"noReadNum\": 3.93857,\t\t\t\t\t\t\n         \"readNum\": -2.09342,\t\t\t\t\t\t\n         \"seachCount\": 254,\t\t\t\t\t\t\t\n       }\n     ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "近一年使用报告"
  },
  {
    "type": "put",
    "url": "/osc/up/report/year/aimuser_update/id",
    "title": "近一年目标客户/切换目标客户状态",
    "name": "aimuser_update",
    "group": "近一年使用报告",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "isShow",
            "description": "<p>显示状态 0：不显示，1：显示</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"修改成功\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "近一年使用报告"
  },
  {
    "type": "put",
    "url": "/osc/up/report/year/aimuser_update/id",
    "title": "近一年目标客户/编辑关键词",
    "name": "aimuser_update",
    "group": "近一年使用报告",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Keyword",
            "description": "<p>关键词</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"修改成功\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "近一年使用报告"
  },
  {
    "type": "post",
    "url": "/osc/up/report/year/apply_list",
    "title": "近一年报告申请/报告申请列表查询",
    "name": "apply_list",
    "group": "近一年使用报告",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>当前页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>排序方式 asc：升序，desc：降序</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortName",
            "description": "<p>排序项</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "searchType",
            "description": "<p>查询方式 [非必填] member_id：用户id，kefu：客服</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": "<p>查询关键词 [非必填]</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>栏目id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "componyName",
            "description": "<p>公司名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createTime",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "jsonData",
            "description": "<p>数据</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "kefuName",
            "description": "<p>客服姓名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "memberEndTime",
            "description": "<p>用户截止时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "memberId",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>收集状态</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n      \"total\": 1,\n      \"list\":[\n       {\n         \"id\": \"200126806\",\t\t\t\t\t\t\t  \n         \"componyName\": \"象山正方机械有限公司\",\t\t  \n         \"createTime\": \"2020-12-03 11:52:57\",\t\t\t  \n         \"jsonData\":\tnull,\t\t\t\t\n         \"kefuName\": \"朱建新\",\t\t\n         \"memberEndTime\": null,\t\n         \"memberId\": 1,\t\t\t\t\t\n         \"status\": 1,\t\t\t\t\t\t\n       }\n     ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "近一年使用报告"
  },
  {
    "type": "delete",
    "url": "/osc/up/report/year/delete",
    "title": "近一年报告申请/删除报告申请",
    "name": "delete",
    "group": "近一年使用报告",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "ids",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"删除成功\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "近一年使用报告"
  },
  {
    "type": "put",
    "url": "/osc/up/report/year/first/id",
    "title": "近一年参与项目/切换候选人状态",
    "name": "first",
    "group": "近一年使用报告",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "isFirst",
            "description": "<p>是否为第一候选人 0：是，1：否</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"修改成功\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "近一年使用报告"
  },
  {
    "type": "post",
    "url": "/osc/up/report/year/part_list",
    "title": "近一年参与项目/参与项目列表查询",
    "name": "part_list",
    "group": "近一年使用报告",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>当前页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>排序方式 asc：升序，desc：降序</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortName",
            "description": "<p>排序项</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "memberId",
            "description": "<p>用户id [非必填]</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>数据id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "infoId",
            "description": "<p>信息id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "isFirst",
            "description": "<p>是否为第一候选人 0：否，1：是</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "isShow",
            "description": "<p>是否显示</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "memberId",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "publishDate",
            "description": "<p>发布时间</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>信息标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "zbwUrl",
            "description": "<p>信息标题链接</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n      \"total\": 1,\n      \"list\":[\n       {\n         \"id\": 1054721,\t\t\t\t\t\n         \"infoId\": 2070121357,\t\t\n         \"isFirst\": 1,\t\t\t\t\t\t\n         \"isShow\": 1,\t\t\t\t\t\t\n         \"memberId\": 11687493,\t\t\n         \"publishDate\": \"2019-10-31 00:00:00\",\n         \"title\": \"贵州大唐物资有限公司制粉系统配件...\",\t\n         \"zbwUrl\":\"/zbgs/nnmKZP.html\",\t\t\t\t\t\n       }\n     ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "近一年使用报告"
  },
  {
    "type": "post",
    "url": "/osc/project_summary/add_product_keywords",
    "title": "产品词/添加产品词",
    "name": "add_product_keywords",
    "group": "项目汇总",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "pkwords",
            "description": "<p>产品词</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>行业id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "项目汇总"
  },
  {
    "type": "get",
    "url": "/osc/project_summary/block_keywords_list",
    "title": "汇总列表/获取汇总列表",
    "name": "block_keywords_list",
    "group": "项目汇总",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>当前页条数</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "blocksId",
            "description": "<p>栏目id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "keyword",
            "description": "<p>栏目关键词</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "name",
            "description": "<p>栏目名称</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n      \"total\": 1,\n      \"list\":[\n       {\n           \"blocksId\": 600024,\n           \"keyword\": \"\"铁路且中标公示\" 或 \"铁路且中标公告\"\",\n           \"name\": \"铁路频道中国铁建彩色展示\",\n       }\n     ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "项目汇总"
  },
  {
    "type": "post",
    "url": "/osc/project_summary/delete",
    "title": "产品词/删除产品词",
    "name": "delete",
    "group": "项目汇总",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "ids",
            "description": "<p>产品词id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "项目汇总"
  },
  {
    "type": "get",
    "url": "/osc/project_summary/download",
    "title": "汇总列表/下载汇总数据",
    "name": "download",
    "group": "项目汇总",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "blocksId",
            "description": "<p>栏目Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "excel数据流",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "项目汇总"
  },
  {
    "type": "get",
    "url": "/osc/productKeywords/getByCondition",
    "title": "产品词/产品词查询",
    "name": "getByCondition",
    "group": "项目汇总",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageNumber",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageSize",
            "description": "<p>当前页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pKeywords",
            "description": "<p>关键词</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>行业id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createBy",
            "description": "<p>创建人</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createTime",
            "description": "<p>创建日期</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>产品词id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "delFlag",
            "description": "<p>是否删除</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pkeywords",
            "description": "<p>产品词</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updateBy",
            "description": "<p>修改人</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updateTime",
            "description": "<p>修改时间</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n     \"totalElements\": 7,\n     \"totalPages\": 1,\n     \"content\":[\n      {\n        \"categoryId\": 1,\n        \"createBy\": \"张三\",\t\t\t\t\t\t\n        \"createTime\": \"2020-11-22 13:14:15\",\n        \"delFlag\": 0,\t\t\t\t\t\n        \"id\": 2,\t\t\t\t\t\t\t\t\t\n        \"pkeywords\": \"产品词1\",\t\t\t\t\t\n        \"updateBy\": \"李四\",\t\t\t\n        \"updateTime\": \"2020-11-25 13:14:15\"\t\n      }\n     ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "项目汇总"
  },
  {
    "type": "get",
    "url": "/osc/project_summary/product_keywords_list",
    "title": "产品词/获取产品词列表",
    "name": "product_keywords_list",
    "group": "项目汇总",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>当前页码数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>当前页条数</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>行业id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createBy",
            "description": "<p>创建人</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createTime",
            "description": "<p>创建日期</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>产品词id</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "delFlag",
            "description": "<p>是否删除</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pkeywords",
            "description": "<p>产品词</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updateBy",
            "description": "<p>修改人</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updateTime",
            "description": "<p>修改时间</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"success\": true,\n   \"message\": \"success\",\n   \"code\": 200,\n   \"timestamp\": 1606957730894,\n   \"result\":{\n      \"total\": 1,\n      \"list\":[\n       {\n         \"categoryId\": 1,\n         \"createBy\": \"张三\",\t\t\t\t\t\t\n         \"createTime\": \"2020-11-22 13:14:15\",\n         \"delFlag\": 0,\t\t\t\t\t\n         \"id\": 2,\t\t\t\t\t\t\t\t\t\n         \"pkeywords\": \"产品词1\",\t\t\t\t\t\n         \"updateBy\": \"李四\",\t\t\t\n         \"updateTime\": \"2020-11-25 13:14:15\"\t\n       }\n     ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code403 Forbidden",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 code404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/api.js",
    "groupTitle": "项目汇总"
  }
] });
