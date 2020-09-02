<style lang="less">
@import "../../../styles/tree&table-common.less";
@import "./productList.less";
</style>
<template>
  <div class="search">
    <Card>
      <Row type="flex" justify="space-between">
        <Col v-if="expand" span="3">
          <!-- <Alert show-icon>
            当前选择：
            <span class="select-title">{{editTitle}}</span>
            <a class="select-clear" v-if="editTitle" @click="cancelEdit">取消选择</a>
          </Alert>
          <Input
            v-model="searchKey"
            suffix="ios-search"
            @on-change="search"
            placeholder="输入节点名搜索"
            clearable
          />-->
          <h3>
            <Icon type="ios-list-box-outline" />商品分类
          </h3>
          <div class="tree-bar" :style="{maxHeight: maxHeight}">
            <Tree ref="tree" :data="treeData" :load-data="loadData" @on-select-change="selectTree"></Tree>
            <Spin size="large" fix v-if="treeLoading"></Spin>
          </div>
        </Col>
        <div class="expand">
          <Icon :type="expandIcon" size="16" class="icon" @click="changeExpand" />
        </div>
        <Col :span="span">
          <Row>
            <Form ref="searchForm" :model="searchForm" inline :label-width="100">
              <Form-item label="日期范围：">
                <DatePicker
                  v-model="selectDate"
                  type="daterange"
                  format="yyyy-MM-dd"
                  clearable
                  @on-change="selectDateRange"
                  placeholder="选择起始时间"
                  style="width: 200px"
                ></DatePicker>
              </Form-item>
              <Form-item class="hideLabel">
                <Input
                  type="text"
                  v-model="searchForm.searchKey"
                  placeholder="商品名称、商品描述、价格"
                  clearable
                  style="width: 200px;"
                />
              </Form-item>
              <!-- <Form-item label="状态" prop="status">
                <Select
                  v-model="searchForm.status"
                  placeholder="请选择"
                  clearable
                  style="width: 200px"
                >
                  <Option value="0">正常</Option>
                  <Option value="-1">禁用</Option>
                </Select>
              </Form-item>-->
              <Form-item style="margin-left:-35px;" class="br">
                <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
                <Button @click="handleReset">重置</Button>
              </Form-item>
            </Form>
          </Row>
          <Row class="operation">
            <Button @click="add" type="primary" icon="md-add">添加</Button>
            <Button @click="delAll" icon="md-trash">批量删除</Button>
            <Button @click="getDataList" icon="md-refresh">刷新</Button>
          </Row>
          <Row>
            <Table
              :loading="loading"
              border
              :columns="columns"
              :data="data"
              sortable="custom"
              @on-sort-change="changeSort"
              @on-selection-change="showSelect"
              ref="table"
            ></Table>
          </Row>
          <Row type="flex" justify="end" class="page">
            <Page
              :current="searchForm.pageNumber"
              :total="total"
              :page-size="searchForm.pageSize"
              @on-change="changePage"
              @on-page-size-change="changePageSize"
              :page-size-opts="[10,20,50]"
              size="small"
              show-total
              show-elevator
              show-sizer
            ></Page>
          </Row>
        </Col>
      </Row>
    </Card>

    <Modal :title="modalTitle" v-model="modalVisible" :mask-closable="false" :width="1000">
      <Form ref="form" :model="form" :label-width="140" :rules="formValidate">
        <FormItem label="产品标题：" prop="title">
          <Input v-model="form.title" />
        </FormItem>
        <FormItem label="简介描述：" prop="describe">
          <Input v-model="form.describe" />
        </FormItem>
        <FormItem label="商品分类：" prop="classify">
          <div style="display:flex;">
            <Input
              v-model="form.classify"
              placeholder="请点击选择按钮选择商品分类"
              readonly
              style="margin-right:10px;"
            />
            <Poptip transfer trigger="click" placement="right-start" title="选择商品分类" width="250">
              <Button icon="md-list">选择商品分类</Button>
              <div slot="content" style="position:relative;min-height:5vh">
                <Tree :data="dataEdit" :load-data="loadData" @on-select-change="selectTreeEdit"></Tree>
                <Spin size="large" fix v-if="loadingEdit"></Spin>
              </div>
            </Poptip>
          </div>
        </FormItem>
        <FormItem label="产品展示价格：" prop="price" >
          <Input v-model="form.price" placeholder="请输入正确金额"/>
        </FormItem>
        <FormItem label="库存数量：" prop="amount">
          <Input v-model="form.amount" placeholder="0~99999"/>
        </FormItem>
        <FormItem label="购买限制数量：" prop="limit">
          <Input v-model="form.limit" placeholder="0~9999"/>
        </FormItem>
        <FormItem label="示缩略图片上传：" prop="imgIdList">
          <Upload
            multiple
            :before-upload="handleBeforeUpload"
            type="drag"
            :action="uploadFileUrl"
            :headers="accessToken"
            :on-success="handleSuccess"
            :on-error="handleError"
            :format="['jpg','jpeg','png']"
            :on-format-error="handleFormatError"
            :show-upload-list="false"
            :on-remove="handleRmove"
          >
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>或将照片拖到这里，最多可选5张</p>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="商品详情：">
          <quill id="quill" v-model="form.quillData"></quill>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="Default" @click="modalVisible=false">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handelSubmit">保存并发布</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { uploadFile } from "@/api/index";
import quill from "@/views/my-components/xboot/quill";
import { validatePrice, validateAmount, validateLimit } from "@/libs/validate";
export default {
  name: "productList",
  components: {
    quill,
  },
  computed: {
    
  },
  data() {
    return {
      accessToken: {},
      uploadFileUrl: uploadFile,
      uploadList: [], // 图片列表
      treeLoading: false, // 树加载状态
      maxHeight: "500px",
      loading: false, // 表加载状态
      editTitle: "", // 编辑节点名称
      // searchKey: "", // 搜索树
      expand: true,
      span: 20,
      expandIcon: "ios-arrow-back",
      selectNode: {},
      treeData: [], // 树数据
      selectCount: 0, // 多选计数
      selectList: [], // 多选数据
      searchForm: {
        // 搜索框对应data对象
        searchKey: "",
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        sort: "createTime", // 默认排序字段
        order: "desc", // 默认排序方式
        startDate: "", // 起始时间
        endDate: "", // 终止时间
      },
      modalType: 0, // 添加或编辑标识
      modalVisible: false, // 添加或编辑显示
      modalTitle: "", // 添加或编辑标题
      form: {
        // 添加或编辑表单对象初始化数据
        title: "",
        quillData: '',
        describe:'',
        classify: '',
        price: '',
        amount: '',
        limit: '',
        imgIdList: [],
        sex: 1,
        type: 0,
      },
      formValidate: {
        // 表单验证规则
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        describe: [{ required: true, message: "描述不能为空", trigger: "blur" }],
        classify: [{ required: true, message: "分类不能为空", trigger: "change" }],
        price: [
          { required: true, message: "价格不能为空", trigger: "blur" },
          { validator: validatePrice, trigger: "blur" },
        ],
        amount: [
          { required: true, message: "数量不能为空", trigger: "blur" },
          { validator: validateAmount, trigger: "blur" },
        ],
        limit: [
          { required: true, message: "数量不能为空", trigger: "blur" },
          { validator: validateLimit, trigger: "blur" },
        ],
        imgIdList: [
          { required: true, message: "请上传图片", trigger: "blur" }
        ]
      },
      columns: [
        // 表头
        {
          type: "selection",
          width: 60,
          align: "center",
          fixed: "left",
        },
        {
          title: "ID",
          key: "id",
          align: "center",
          fixed: "left",
          width:120
        },
        {
          title: "缩略图",
          key: "image",
          align: "center",
          minWidth: 150,
          // sortable: true,
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.image,
                alt: "加载图片失败",
              },
              style: {
                width: "70px",
                height: "70px",
                "object-fit": "contain",
              },
              /* on: {
                click: () => {
                  this.showPic(params.row);
                }
              } */
            });
          },
        },
        {
          title: "商品名称",
          key: "title",
          align: "center",
          minWidth: 150
        },
        {
          title: "描述",
          key: "sellPoint",
          align: "center",
          minWidth: 200
        },
        {
          title: "单价",
          key: "price",
          align: "center",
          width: 120
        },
        {
          title: "创建日期",
          key: "created",
          align: "center",
          width: 120
        },
        {
          title: "更新日期",
          key: "updated",
          align: "center",
          width: 120
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          width: 150,
          render: (h, params) => {
            if (params.row.status == 1) {
              return h("div", [
                h(
                  "Tag",
                  {
                    props: {
                      color: "success",
                    },
                  },
                  "已发布"
                ),
              ]);
            } else if (params.row.status == 0) {
              return h("div", [
                h(
                  "Tag",
                  {
                    props: {
                      color: "error",
                    },
                  },
                  "已下架"
                ),
              ]);
            }
          },
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.publish(params.row);
                    },
                  },
                },
                params.row.status ? "下架" : "发布"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.edit(params.row);
                    },
                  },
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.remove(params.row);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      submitLoading: false, // 添加或编辑提交状态
      data: [], //表单数据
      total: 0, // 表单数据总数
    };
  },
  methods: {
    init() {
      // 初始化一级节点
      this.getParentList();
      // 获取表单数据
      this.getDataList();

      this.accessToken = {
        accessToken: this.getStore("accessToken")
      };
    },
    getParentList() {
      // this.treeLoading = true;
      // this.getRequest("一级数据请求路径，如/tree/getByParentId/0").then(res => {
      //   this.treeLoading = false;
      //   if (res.success) {
      //     res.result.forEach(function(e) {
      //       if (e.isParent) {
      //         e.loading = false;
      //         e.children = [];
      //       }
      //     });
      //     this.treeData = res.result;
      //   }
      // });
      // 模拟请求成功
      this.treeData = [
        {
          title: "一级1",
          id: "1",
          parentId: "0",
          parentTitle: "一级节点",
          status: 0,
          loading: false,
          children: [
            {
              title: "二级1",
              id: "2",
              parentId: "1",
              status: 0,
              parentTitle: "一级1",
            },
          ],
        },
        {
          title: "一级2",
          id: "3",
          parentId: "0",
          parentTitle: "一级节点",
          status: 0,
        },
      ];
    },
    loadData(item, callback) {
      // 异步加载树子节点数据
      // this.getRequest("请求路径，如/tree/getByParentId/" + item.id).then(res => {
      //   if (res.success) {
      //     res.result.forEach(function(e) {
      //       if (e.isParent) {
      //         e.loading = false;
      //         e.children = [];
      //       }
      //     });
      //     callback(res.result);
      //   }
      // });
    },
    /* search() {
      // 搜索树
      if (this.searchKey) {
        // 模拟请求
        // this.treeLoading = true;
        // this.getRequest("搜索请求路径", { title: this.searchKey }).then(res => {
        //   this.treeLoading = false;
        //   if (res.success) {
        //     this.treeData = res.result;
        //   }
        // });
        // 模拟请求成功
        this.treeData = [
          {
            title: "这里需要请求后端接口",
            id: "1",
            parentId: "0",
            parentTitle: "一级节点",
            status: 0
          },
          {
            title: "所以这里是假数据",
            id: "4",
            parentId: "0",
            parentTitle: "一级节点",
            status: 0
          },
          {
            title: "我是被禁用的节点",
            id: "5",
            parentId: "0",
            parentTitle: "一级节点",
            status: -1
          }
        ];
      } else {
        // 为空重新加载
        this.getParentList();
      }
    }, */
    selectTree(v) {
      if (v.length > 0) {
        // 转换null为""
        for (let attr in v[0]) {
          if (v[0][attr] == null) {
            v[0][attr] = "";
          }
        }
        let str = JSON.stringify(v[0]);
        let data = JSON.parse(str);
        this.selectNode = data;
        this.editTitle = data.title;
        // 重新加载表
        this.getDataList();
      } else {
        this.cancelEdit();
      }
    },
    cancelEdit() {
      let data = this.$refs.tree.getSelectedNodes()[0];
      if (data) {
        data.selected = false;
      }
      // 取消选择后获取全部数据
      this.selectNode = {};
      this.editTitle = "";
      this.getDataList();
    },
    changeSelect(v) {
      this.selectCount = v.length;
      this.selectList = v;
    },
    changeExpand() {
      this.expand = !this.expand;
      if (this.expand) {
        this.expandIcon = "ios-arrow-back";
        this.span = 18;
      } else {
        this.expandIcon = "ios-arrow-forward";
        this.span = 23;
      }
    },
    changePage(v) {
      this.searchForm.pageNumber = v;
      this.getDataList();
      // this.clearSelectAll();
    },
    changePageSize(v) {
      this.searchForm.pageSize = v;
      this.getDataList();
    },
    getDataList() {
      this.loading = true;
      // 根据用户选择树加载表数据
      this.searchForm.selectId = this.selectNode.id;
      // 带多条件搜索参数获取表单数据 请自行修改接口
      // this.getRequest("请求路径", this.searchForm).then(res => {
      //   this.loading = false;
      //   if (res.success) {
      //     this.data = res.result.content;
      //     this.total = res.result.totalElements;
      //   }
      // });
      // 模拟表格变化 模拟数据
      if (!this.selectNode.id) {
        // id为null获取全部数据
        this.data = [
          {
            cid: 1184,
            created: 1598514543000,
            id: 159851454285740,
            image:
              "http://qfliorh85.hb-bkt.clouddn.com/FhNNr6peAGOFNsRPES78ftbPqsUx",
            images: [
              "http://qfliorh85.hb-bkt.clouddn.com/FhNNr6peAGOFNsRPES78ftbPqsUx",
            ],
            limitNum: 999,
            num: 999,
            price: 199,
            sellPoint: "新建医院、医院改扩建、医疗设备、医疗物资",
            status: 1,
            title: "铁路频道",
            updated: 1598514620000,
          },
          {
            cid: 1184,
            created: 1598316458000,
            id: 159831645819316,
            image:
              "http://qfliorh85.hb-bkt.clouddn.com/FhNNr6peAGOFNsRPES78ftbPqsUx",
            images: [
              "http://qfliorh85.hb-bkt.clouddn.com/FhNNr6peAGOFNsRPES78ftbPqsUx",
            ],
            limitNum: 999,
            num: 999,
            price: 1000,
            sellPoint: "新建医院、医院改扩建、医疗设备、医疗物资",
            status: 1,
            title: "医疗频道",
            updated: 1598335328000,
          },
          {
            cid: 560,
            created: 1527939792000,
            id: 150642571432852,
            image:
              "https://resource.smartisan.com/resource/367d93db1d58f9f3505bc0ec18efaa44.jpg,https://resource.smartisan.com/resource/8ecc94c0f0c4ebc861f06c86789a66e6.jpg,https://resource.smartisan.com/resource/58a2cdb44f722202b05dd09d6fd959de.jpg,https://resource.smartisan.com/resource/2b811a93a2915310f72291e46bd944ad.jpg,https://resource.smartisan.com/resource/8cd011adef99f9734ed974ea9732e6e7.jpg",
            images: [
              "https://resource.smartisan.com/resource/367d93db1d58f9f3505bc0ec18efaa44.jpg",
            ],
            limitNum: 100,
            num: 999,
            price: 499,
            sellPoint: "全天佩戴 抬手就听 HEAC稳连技术",
            status: 0,
            title: "FIIL Driifter 脖挂蓝牙耳机",
            updated: 1597882738000,
          },
        ];
      } else if (this.selectNode.id == "1") {
        this.data = [
          {
            id: "1",
            name: "XBoot",
            description: "我是一级1的数据",
            status: 0,
            createTime: "2018-08-08 00:08:00",
          },
        ];
      } else if (this.selectNode.id == "2") {
        this.data = [
          {
            id: "2",
            name: "Exrick",
            description: "我是二级1的数据",
            status: 0,
            createTime: "2018-08-08 00:08:00",
          },
        ];
      } else if (this.selectNode.id == "3") {
        this.data = [
          {
            id: "3",
            name: "Present By Exrick",
            description: "我是一级2的数据",
            status: -1,
            createTime: "2018-08-08 00:08:00",
          },
        ];
      }
      this.total = this.data.length;
      this.loading = false;
    },
    handleSearch() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.getDataList();
    },
    handleReset() {
      this.$refs.searchForm.resetFields();
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      // 重新加载数据
      this.getDataList();
    },
    changeSort(e) {
      this.searchForm.sort = e.key;
      this.searchForm.order = e.order;
      if (e.order == "normal") {
        this.searchForm.order = "";
      }
      this.getDataList();
    },
    showSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    /* clearSelectAll() {
      this.$refs.table.selectAll(false);
    }, */
    add() {
      this.modalType = 0;
      this.modalTitle = "添加";
      this.$refs.form.resetFields();
      this.modalVisible = true;
    },
    edit(v) {
      this.modalType = 1;
      this.modalTitle = "编辑";
      this.$refs.form.resetFields();
      // 转换null为""
      for (let attr in v) {
        if (v[attr] == null) {
          v[attr] = "";
        }
      }
      let str = JSON.stringify(v);
      let data = JSON.parse(str);
      this.form = data;
      this.modalVisible = true;
    },
    handelSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          if (this.modalType == 0) {
            // 添加 避免编辑后传入id等数据 记得删除
            delete this.form.id;
            delete this.form.status;
            // this.postRequest("请求路径", this.form).then(res => {
            //   this.submitLoading = false;
            //   if (res.success) {
            //     this.$Message.success("操作成功");
            //     this.getDataList();
            //     this.modalVisible = false;
            //   }
            // });
            // 模拟成功
            this.submitLoading = false;
            this.$Message.success("操作成功");
            this.modalVisible = false;
          } else if (this.modalType == 1) {
            // 编辑
            // this.postRequest("请求路径", this.form).then(res => {
            //   this.submitLoading = false;
            //   if (res.success) {
            //     this.$Message.success("操作成功");
            //     this.getDataList();
            //     this.modalVisible = false;
            //   }
            // });
            // 模拟成功
            this.submitLoading = false;
            this.$Message.success("操作成功");
            this.modalVisible = false;
          }
        }
      });
    },
    remove(v) {
      this.$Modal.confirm({
        title: "确认删除",
        // 记得确认修改此处
        content: "您确认要删除 " + v.title + " ?",
        loading: true,
        onOk: () => {
          // 删除
          // this.deleteRequest("请求地址，如/deleteByIds/" + v.id).then(res => {
          //   this.$Modal.remove();
          //   if (res.success) {
          //     this.$Message.success("操作成功");
          //     this.getDataList();
          //   }
          // });
          // 模拟请求成功
          this.$Message.success("操作成功");
          this.$Modal.remove();
          this.getDataList();
        },
      });
    },
    // ##wu
    // 发布
    publish(v) {
      let title = v.status ? "下架" : "发布";
      this.$Modal.confirm({
        title: title,
        // 记得确认修改此处
        content: "您确认要" + title + " " + v.title + " 的商品吗?",
        loading: true,
        onOk: () => {
          // 删除
          // this.deleteRequest("请求地址，如/deleteByIds/" + v.id).then(res => {
          //   this.$Modal.remove();
          //   if (res.success) {
          //     this.$Message.success("操作成功");
          //     this.getDataList();
          //   }
          // });
          // 模拟请求成功
          this.$Message.success("操作成功");
          this.$Modal.remove();
          this.getDataList();
        },
      });
    },
    // ##wu
    selectDateRange(v) {
      if (v) {
        this.searchForm.startDate = v[0];
        this.searchForm.endDate = v[1];
      }
    },
    // ##wu 文件上传
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "最多只能上传5张图片",
        });
      }
      return check;
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "不支持的文件格式",
        desc:
          "所选文件‘ " +
          file.name +
          " ’格式不正确, 请选择 'jpg','jpeg','png' 格式文件"
      });
    },
    handleSuccess(res, file) {
      if (res.success) {
        this.uploadList.push(res.result)
      } else {
        this.$Message.error(res.message);
      }
    },
    handleError(error, file, fileList) {
      this.loading = false;
      this.$Message.error(error.toString());
    },
    handleRmove(file, fileList) {

    },
    delAll() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未选择要删除的数据");
        return;
      }
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除所选的 " + this.selectCount + " 条数据?",
        loading: true,
        onOk: () => {
          let ids = "";
          this.selectList.forEach(function (e) {
            ids += e.id + ",";
          });
          ids = ids.substring(0, ids.length - 1);
          // 批量删除
          // this.deleteRequest("请求地址，如/deleteByIds/" + ids).then(res => {
          //   this.$Modal.remove();
          //   if (res.success) {
          //     this.$Message.success("操作成功");
          //     this.clearSelectAll();
          //     this.getDataList();
          //   }
          // });
          // 模拟请求成功
          this.$Message.success("操作成功");
          this.$Modal.remove();
          // this.clearSelectAll();
          this.getDataList();
        },
      });
    },
  },
  mounted() {
    // 计算高度
    let height = document.documentElement.clientHeight;
    this.maxHeight = Number(height - 287) + "px";
    this.init();
  },
};
</script>