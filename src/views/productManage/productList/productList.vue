<style lang="less">
@import "../../../styles/tree&table-common.less";
@import "./productList.less";
</style>
<template>
  <div class="search">
    <Card>
      <Row type="flex" justify="space-between">
        <Col v-if="expand" span="3">
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
            <Form
              ref="searchForm"
              :model="searchForm"
              inline
              :label-width="90"
              label-position="left"
            >
              <Form-item label="日期范围：" prop="start">
                <DatePicker
                  type="date"
                  placeholder="起始时间"
                  format="yyyy-MM-dd"
                  @on-change="startChange"
                  v-model="searchForm.start"
                  style="width: 200px"
                ></DatePicker>
              </Form-item>
              <Form-item class="formSpan">
                <span>-</span>
              </Form-item>
              <Form-item class="hideLabel" prop="showEnd">
                <DatePicker
                  type="date"
                  placeholder="结束时间"
                  format="yyyy-MM-dd"
                  @on-change="endChange"
                  v-model="searchForm.showEnd"
                  style="width: 200px"
                ></DatePicker>
              </Form-item>
              <Form-item class="searchLabel" prop="search">
                <Input
                  type="text"
                  v-model="searchForm.search"
                  placeholder="商品名称、商品描述、价格"
                  clearable
                  style="width: 200px;"
                />
              </Form-item>
              <Form-item style="margin-left:-35px;" class="br">
                <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
                <Button @click="handleReset">重置</Button>
              </Form-item>
            </Form>
          </Row>
          <Row class="operation" type="flex" justify="space-between">
            <Col>
              <Button @click="add" type="primary" icon="md-add">添加</Button>
              <Button @click="delAll" icon="md-trash">批量删除</Button>
              <Button @click="getDataList" icon="md-refresh">刷新</Button>
            </Col>
            <Col>
              <div>
                共有数据：
                <span style="font-weight:bold;">{{totalCount}}</span> 条
              </div>
            </Col>
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
              :current="pageForm.page"
              :total="total"
              :page-size="pageForm.size"
              @on-change="changePage"
              @on-page-size-change="changesize"
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

    <Modal
      :title="modalTitle"
      v-model="modalVisible"
      :mask-closable="false"
      :width="1000"
      @on-cancel="cancelSub"
      @on-visible-change="modalOpen"
    >
      <Form ref="form" :model="form" :label-width="150" :rules="formValidate">
        <FormItem label="产品标题：" prop="title">
          <Input v-model="form.title" />
        </FormItem>
        <FormItem label="简介描述：" prop="sellPoint">
          <Input v-model="form.sellPoint" />
        </FormItem>
        <FormItem label="商品分类：" prop="cname">
          <div style="display:flex;">
            <Input
              v-model="form.cname"
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
        <FormItem label="产品展示价格：" prop="price">
          <Input v-model="form.price" placeholder="请输入正确金额" />
        </FormItem>
        <FormItem label="有效期：" prop="validity">
          <Input v-model="form.validity" placeholder="请输入数量，单位为月" />
        </FormItem>
        <FormItem label="库存数量：" prop="num">
          <Input v-model="form.num" placeholder="请输入数量，单位为件" />
        </FormItem>
        <FormItem label="购买限制数量：" prop="limitNum">
          <Input v-model="form.limitNum" placeholder="请输入数量，单位为件" />
        </FormItem>
        <FormItem label="缩略图片上传：" prop="image">
          <div class="demo-upload-list" v-for="item in uploadList" :key="item">
            <template v-if="item.status === 'finished'">
              <img :src="item.url" />
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
            </template>
            <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
          </div>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            type="drag"
            :data="uploadData"
            :action="uploadFileUrl"
            :headers="accessToken"
            :on-error="handleError"
            style="display: inline-block;width:58px;"
          >
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="商品详情：" prop="detail">
          <quill id="quill" v-model="form.detail" ref="quill" :uploadData="uploadData"></quill>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="Default" @click="modalVisible=false">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handelSubmit">保存并发布</Button>
      </div>
    </Modal>

    <Modal title="图片预览" v-model="visible">
      <img :src="imgName" v-if="visible" style="width: 100%" />
    </Modal>
  </div>
</template>

<script>
import quill from "@/views/my-components/xboot/quill";
import {
  validatePrice,
  validateAmount,
  validateLimit,
  validateNum,
} from "@/libs/validate";
import {
  getCateList,
  getProductList,
  getCount,
  changeStatus,
  getItemById,
  uploadImgUrl,
  updateProduct,
  addProduct,
  removeProduct,
  searchProduct,
} from "@/api/businessRoom";
import qs from "qs";
export default {
  name: "productList",
  components: {
    quill,
  },
  computed: {},
  data() {
    return {
      imgName: "",
      visible: false,
      defaultList: [],
      accessToken: {
        "Content-Type": "multipart/form-data",
      },
      uploadData: {
        id: "",
      },
      uploadFileUrl: uploadImgUrl,
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
        search: "",
        start: "", // 起始时间
        end: "", // 终止时间
        showEnd: ''
      },
      pageForm: {
        page: 1, // 当前页数
        size: 10, // 页面大小
        cid: -1,
      },
      modalType: 0, // 添加或编辑标识
      modalVisible: false, // 添加或编辑显示
      modalTitle: "", // 添加或编辑标题
      form: {
        // 添加或编辑表单对象初始化数据
        title: "",
        detail: "",
        sellPoint: "",
        cname: "",
        price: "",
        num: "",
        limitNum: "",
        image: "",
        validity: "",
        cid: "",
        id: "",
      },
      formValidate: {
        // 表单验证规则
        title: [
          { required: true, message: "标题不能为空", trigger: "blur" },
          {
            type: "string",
            max: 15,
            message: "标题长度不能超过15个字符",
            trigger: "blur",
          },
        ],
        sellPoint: [
          { required: true, message: "描述不能为空", trigger: "blur" },
          {
            type: "string",
            max: 50,
            message: "描述内容不能超过50个字符",
            trigger: "blur",
          },
        ],
        cname: [{ required: true, message: "分类不能为空", trigger: "change" }],
        price: [
          {
            required: true,
            message: "价格不能为空",
            trigger: "blur",
          },
          { validator: validatePrice, trigger: "blur" },
        ],
        image: [{ required: true, message: "请上传图片", trigger: "blur" }],
        validity: [
          {
            required: true,
            message: "有效期不能为空",
            trigger: "blur",
          },
          { validator: validateNum, trigger: "blur" },
        ],
        num: [{ validator: validateNum, trigger: "blur" }],
        limitNum: [{ validator: validateNum, trigger: "blur" }],
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
          width: 120,
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
                marginTop: "5px",
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
          minWidth: 150,
        },
        {
          title: "描述",
          key: "sellPoint",
          align: "center",
          minWidth: 200,
        },
        {
          title: "单价",
          key: "price",
          align: "center",
          width: 120,
        },
        {
          title: "创建日期",
          key: "created",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            return h("div", {}, this.formdate(params.row.created));
          },
        },
        {
          title: "更新日期",
          key: "updated",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            return h("div", {}, this.formdate(params.row.updated));
          },
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
      totalCount: 0, // 总数据
      dataEdit: [], // 编辑时的分类数据
      updateId: "", // 当前编辑的id
    };
  },
  methods: {
    init() {
      // 初始化一级节点
      this.getParentList();
      // 获取表单数据
      this.getDataList();
      // 获取总数居
      this.getAllCount();
      this.accessToken = {
        accessToken: this.getStore("accessToken"),
      };
    },
    // 时间处理函数
    formdate(date) {
      if(!date) {
        return '-'
      }
      let time = new Date(date);
      let year = time.getFullYear();
      let month = (time.getMonth() + 1).toString().padStart(2, "0");
      let day = time.getDate().toString().padStart(2, "0");
      let hour = time.getHours().toString().padStart(2, "0");
      let minute = time.getMinutes().toString().padStart(2, "0");
      let second = time.getSeconds().toString().padStart(2, "0");
      return `${year}-${month}-${day} ${hour}:${minute}`;
    },
    // 获取总数据
    getAllCount() {
      getCount().then((res) => {
        if (res.success) {
          this.totalCount = res.result;
        }
      });
    },
    // 获取树形结构的数据
    getParentList() {
      this.treeLoading = true;
      getCateList({ id: 0 }).then((res) => {
        this.treeLoading = false;
        res.forEach((e) => {
          e.title = e.name;
          if (e.isParent) {
            e.loading = false;
            e.children = [];
          }
        });
        this.treeData = res;
      });
    },
    // 树形结构打开分支时获取数据
    loadData(item, callback) {
      getCateList({ id: item.id }).then((res) => {
        if (res.length > 0) {
          res.forEach((e) => {
            e.title = e.name;
            if (e.isParent) {
              e.loading = false;
              e.children = [];
            }
          });
          callback(res);
        } else {
          callback([]);
          this.$Message.warning("该分类暂未添加子级分类");
        }
      });
    },
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
        if (data.isParent) {
          this.$Message.warning("请点击子级分类获取对应分类数据");
          return;
        }
        this.pageForm.cid = data.id;
        this.pageForm.size = 10;
        this.pageForm.page = 1;
        // 重新加载表
        this.getDataList();
      } else {
        // this.cancelEdit();
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
      this.pageForm.page = v;
      this.getDataList();
      // this.clearSelectAll();
    },
    changesize(v) {
      this.pageForm.size = v;
      this.getDataList();
    },
    // 获取列表数据
    getDataList() {
      this.loading = true;
      // 根据用户选择树加载表数据
      // this.searchForm.selectId = this.selectNode.id;
      // 带多条件搜索参数获取表单数据 请自行修改接口
      getProductList(this.pageForm).then((res) => {
        this.loading = false;
        if (res.success) {
          /* this.data = res.result.itemList;
          this.total = res.result.count; */
          /* if (res.result.itemList.length !== 0) {
            this.data = res.result.itemList;
            this.total = res.result.count;
          } else if ( res.result.itemList.length === 0 &&this.pageForm.page !== 1) {
            this.pageForm.page -= 1;
            this.getDataList();
          } else if (res.result.itemList.length === 0 &&this.pageForm.page === 1 ) {
            this.data = res.result.itemList;
            this.total = res.result.count;
          } */
          if (res.result.itemList.length !== 0) {
            this.data = res.result.itemList;
            this.total = res.result.count;
          } else {
            if (this.pageForm.page !== 1) {
              this.pageForm.page -= 1;
              this.getDataList();
            } else {
              this.data = res.result.itemList;
              this.total = res.result.count;
            }
          }
        }
      });
    },
    handleSearch() {
      if(this.searchForm.start && !this.searchForm.end){
        this.$Message.warning("请选择截止时间");
        return
      }
      if(!this.searchForm.start && this.searchForm.end){
        this.$Message.warning("请选择起始时间");
        return
      }
      let data = {
        page: 1,
        size: 10,
        ...this.searchForm,
      };
      this.loading = true;
      searchProduct(data).then((res) => {
        this.loading = false;
        if (res.success) {
          this.data = res.result.itemList;
          this.total = res.result.count;
        }
      });
    },
    startChange(v) {
      if (new Date(v) > new Date(this.searchForm.showEnd)) {
        this.$Message.warning("起始时间不能大于截止时间");
        this.searchForm.start = "";
        return;
      }
      this.searchForm.start = v;
    },
    endChange(v) {
      if (new Date(v) < new Date(this.searchForm.start)) {
        this.$Message.warning("截止时间不能小于起始时间");
        this.searchForm.showEnd = "";
        return;
      }
      this.searchForm.showEnd = v
      let d = this.formateDate(new Date(v).getTime() + 86400000)
      this.searchForm.end = d;
    },
    formateDate(date) {
      date = new Date(date)
      let year = date.getFullYear()
      let month = (date.getMonth() + 1).toString().padStart(2, '0')
      let day = date.getDate().toString().padStart(2, '0')

      return `${year}-${month}-${day}`
    },
    handleReset() {
      this.$refs.searchForm.resetFields();
      /* this.searchForm.start = '';
      this.searchForm.end = ''; */
      this.pageForm.page = 1;
      this.pageForm.size = 10;
      this.pageForm.cid = -1;
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
    // 添加
    add() {
      this.modalType = 0;
      this.modalTitle = "添加";
      this.form.detail = " ";
      this.$refs.quill.clearFromFa();
      this.$refs.form.resetFields();
      this.getParentListEdit();
      this.modalVisible = true;
      let id = new Date().getTime();
      this.form.id = id;
      this.uploadData.id = id;
    },
    // 获取商品详情
    edit(v) {
      this.modalType = 1;
      this.modalTitle = "编辑";
      this.$refs.form.resetFields();
      this.getParentListEdit();
      this.uploadData.id = v.id;
      this.updateId = v.id;
      // 转换null为""
      getItemById(v.id).then((res) => {
        if (res.success) {
          for (let attr in res.result) {
            if (res.result[attr] == null) {
              res.result[attr] = "";
            }
            if (typeof res.result[attr] == "number") {
              res.result[attr] = "" + res.result[attr];
            }
          }
          let str = JSON.stringify(res.result);
          let data = JSON.parse(str);
          this.defaultList.splice(0, 0, {
            name: data.image,
            url: data.image,
          });
          // this.$refs.upload.fileList = this.defaultList;
          setTimeout(() => {
            this.uploadList = this.$refs.upload.fileList;
          });
          this.form = data;
          this.modalVisible = true;
        }
      });
    },
    // 编辑时选择类别
    selectTreeEdit(v) {
      if (v.length > 0) {
        // 转换null为""
        for (let attr in v[0]) {
          if (v[0][attr] == null) {
            v[0][attr] = "";
          }
        }
        let str = JSON.stringify(v[0]);
        let data = JSON.parse(str);
        this.form.cname = data.name;
        this.form.cid = data.id;
      }
    },
    // 分类列表
    getParentListEdit() {
      this.loadingEdit = true;
      getCateList({ id: 0 }).then((res) => {
        this.loadingEdit = false;
        res.forEach((e) => {
          e.title = e.name;
          if (e.isParent) {
            e.loading = false;
            e.children = [];
          }
        });
        this.dataEdit = res;
      });
    },
    handelSubmit() {
      let data = {
        title: this.form.title,
        sellPoint: this.form.sellPoint,
        cid: this.form.cid,
        cname: this.form.cname,
        num: this.form.num,
        price: this.form.price,
        limitNum: this.form.limitNum,
        image: this.form.image,
        detail: this.form.detail,
        validity: this.form.validity,
      };
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          if (this.modalType == 0) {
            data.id = this.form.id;
            addProduct(qs.stringify(data)).then((res) => {
              // 添加 避免编辑后传入id等数据 记得删除
              delete this.form.id;
              this.submitLoading = false;
              if (res.success) {
                this.$Message.success("操作成功");
                this.getDataList();
                this.getAllCount();
                this.modalVisible = false;
              }
            });
          } else if (this.modalType == 1) {
            // 编辑
            updateProduct(this.updateId, qs.stringify(data)).then((res) => {
              this.submitLoading = false;
              if (res.success) {
                this.$Message.success("操作成功");
                this.getDataList();
                this.modalVisible = false;
              }
            });
          }
        }
      });
    },
    // 删除单个
    remove(v) {
      this.$Modal.confirm({
        title: "确认删除",
        // 记得确认修改此处
        content: "您确认要删除 " + v.title + " ?",
        loading: true,
        onOk: () => {
          // 删除
          removeProduct([v.id]).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              this.getDataList();
              this.getAllCount();
            }
          });
        },
      });
    },
    // ##wu
    // 发布
    publish(v) {
      let title = v.status ? "下架" : "发布";
      let data = {
        id: v.id,
        status: v.status ? 0 : 1,
      };
      this.$Modal.confirm({
        title: title,
        // 记得确认修改此处
        content: "您确认要" + title + " " + v.title + " 的商品吗?",
        loading: true,
        onOk: () => {
          changeStatus(qs.stringify(data)).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              this.getDataList();
            }
          });
        },
      });
    },
    // ##wu 文件上传
    handleBeforeUpload(file) {
      /* console.log("beforeUploadfile", file);
      console.log("beforeUploaduploadList", this.uploadList); */
      /* const check = this.uploadList.length < 22;
      if (!check) {
        this.$Notice.warning({
          title: "只能上传1张图片",
        });
      }
      return check; */
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "不支持的文件格式",
        desc:
          "所选文件‘ " +
          file.name +
          " ’格式不正确, 请选择 'jpg','jpeg','png' 格式文件",
      });
    },
    // 上传文件大小判断
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件过大",
        desc: "上传文件大小不能大于2M",
      });
    },
    handleSuccess(res, file) {
      if (res.success) {
        file.url = res.result;
        file.name = res.result;
        /* console.log('-------------------',this.uploadList)
        console.log('+++++++++++++++++++',this.$refs.upload.fileList)
        if(this.uploadList.length > 1) {
          this.uploadList.splice(0,1)
          this.$refs.upload.fileList.splice(0,1)
        }else if(this.uploadList.length === 0){
          this.uploadList = this.$refs.upload.fileList
        } */
        this.$refs.upload.fileList = [file];
        this.uploadList = this.$refs.upload.fileList;
        this.form.image = res.result;
      } else {
        this.$Message.error(res.message);
      }
    },
    handleError(error, file, fileList) {
      this.loading = false;
      this.$Message.error(error.toString());
    },
    // 批量删除
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
          let ids = [];
          ids = this.selectList.map((item) => {
            return item.id;
          });
          // 批量删除
          removeProduct(ids).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              // this.clearSelectAll();
              this.getDataList();
              this.getAllCount();
            }
          });
        },
      });
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(0, 1);
      this.form.image = "";
    },
    modalOpen(v) {
      if (!v) {
        this.form.detail = " ";
        this.$refs.quill.clearFromFa();
        this.$refs.form.resetFields();
        this.defaultList = [];
        this.$refs.upload.fileList = [];
        this.uploadList = [];
      }
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