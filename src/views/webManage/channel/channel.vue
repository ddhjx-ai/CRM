<style lang="less">
</style>
<template>
  <div class="search">
    <Card>
      <Row class="operation">
        <Button @click="add" type="primary" icon="md-add">添加</Button>
        <Button @click="getDataList" icon="md-refresh">刷新</Button>
      </Row>
      <Row>
        <Table
          :loading="loading"
          border
          :columns="dynamicColums"
          :data="data"
          ref="table"
          sortable="custom"
          @on-sort-change="changeSort"
          @on-selection-change="changeSelect"
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
    </Card>

    <Modal :title="modalTitle" v-model="modalVisible" :mask-closable="false" :width="500">
      <Form ref="form" :model="form" :label-width="80" :rules="formValidate">
        <FormItem label="登录名" prop="loginName">
          <Input v-model="form.loginName" />
        </FormItem>
        <FormItem label="别名" prop="alias">
          <Input v-model="form.alias" />
        </FormItem>
        <FormItem label="site" prop="site">
          <i-select v-model="form.site" style="width:200px">
            <i-option v-for="item in optionList" :key="item" :value="item.value">{{ item.label }}</i-option>
          </i-select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handleCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handleSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { postCrmRequest, removeCrm } from "@/libs/axios";
import axios from "axios";
import qs from "qs";
export default {
  name: "channel",
  data() {
    return {
      optionList: [
        {
          value: "",
          label: "none",
        },
        {
          value: "1",
          label: "chinabidding_en",
        },
        {
          value: "2",
          label: "cblseo",
        },
        {
          value: "3",
          label: "sbiao_wap",
        },
        {
          value: "4",
          label: "sbiao_seo",
        },
        {
          value: "5",
          label: "sbiao_cn",
        },
        {
          value: "6",
          label: "cblcn",
        },
        {
          value: "7",
          label: "touch",
        },
        {
          value: "8",
          label: "cblcomcn",
        },
        {
          value: "9",
          label: "gys",
        },
      ],
      loading: true, // 表单加载状态
      searchForm: {
        // 搜索框对应data对象
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        sort: "createTime", // 默认排序字段
        order: "desc", // 默认排序方式
      },
      modalType: 0, // 添加或编辑标识
      modalVisible: false, // 添加或编辑显示
      modalTitle: "", // 添加或编辑标题
      form: {
        // 添加或编辑表单对象初始化数据
        loginName: "",
        alias: "",
        site: "",
      },
      // 表单验证规则
      formValidate: {
        loginName: [{ required: true, message: "不能为空", trigger: "blur" }],
        alias: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
      submitLoading: false, // 添加或编辑提交状态
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      // 表格动态列 默认勾选显示的列的key
      columnSettings: ["name", "sex", "createTime", "updateTime"],
      // 不能配置的列（不显示）
      whiteColumns: ["action"],
      columns: [
        // 表头
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "ID",
          key: "id",
          width: 80,
        },
        {
          title: "名称",
          key: "1",
        },
        {
          title: "别名",
          key: "2",
        },
        {
          title: "站点",
          key: "3",
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    icon: "ios-create-outline",
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
                    icon: "md-trash",
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
      columnChange: false,
      data: [], // 表单数据
      total: 0, // 表单数据总数
      dataList: {
        page: 1,
        total: 81,
        rows: [
          {
            id: 2,
            cell: [
              "<a href='javascript:edit_channel(2)'>2</a>",
              "cblen.Infos ",
              "Infos ",
              "采招英文网 ",
            ],
          },
          {
            id: 3,
            cell: [
              "<a href='javascript:edit_channel(3)'>3</a>",
              "cblen.News ",
              "新闻 ",
              "采招英文网 ",
            ],
          },
          {
            id: 4,
            cell: [
              "<a href='javascript:edit_channel(4)'>4</a>",
              "cblen.Law ",
              "法律 ",
              "采招英文网 ",
            ],
          },
          {
            id: 5,
            cell: [
              "<a href='javascript:edit_channel(5)'>5</a>",
              "cblen.Service ",
              "服务 ",
              "采招英文网 ",
            ],
          },
          {
            id: 6,
            cell: [
              "<a href='javascript:edit_channel(6)'>6</a>",
              "cblseo.Home ",
              "首页 ",
              "采招SEO ",
            ],
          },
          {
            id: 7,
            cell: [
              "<a href='javascript:edit_channel(7)'>7</a>",
              "cblen.TenderNotice ",
              "TenderNotice ",
              "采招英文网 ",
            ],
          },
          {
            id: 8,
            cell: [
              "<a href='javascript:edit_channel(8)'>8</a>",
              "cblen.ProjectInfo ",
              "ProjectInfo ",
              "采招英文网 ",
            ],
          },
          {
            id: 9,
            cell: [
              "<a href='javascript:edit_channel(9)'>9</a>",
              "cblen.BiddingResuits ",
              "BiddingResuits ",
              "采招英文网 ",
            ],
          },
          {
            id: 10,
            cell: [
              "<a href='javascript:edit_channel(10)'>10</a>",
              "cblen.WorldBiz ",
              "WorldBiz ",
              "采招英文网 ",
            ],
          },
          {
            id: 11,
            cell: [
              "<a href='javascript:edit_channel(11)'>11</a>",
              "cblen.PublishTenders ",
              "PublishTenders ",
              "采招英文网 ",
            ],
          },
        ],
      },
    };
  },
  // 表格动态列 计算属性
  computed: {
    dynamicColums: function () {
      this.columnChange;
      return this.columns.filter((item) => item.hide != true);
    },
  },
  methods: {
    requestData(url, data) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.send(data);
      xhr.onreadystatechange = function (res) {
        if (xhr.readyState == 4 && xhr.status == 200) {
          console.log(res);
        }
      };
    },
    getListData() {
      var params = qs.stringify({
        page: 1,
        rp: 10,
        sortname: "id",
        sortorder: "desc",
        query: "",
        qtype: "",
        area: "",
        year: "",
        date_select: "",
        assigned_select: "",
        categoryid: "",
        book_type: "",
        agency_type: "",
        agency_kind: "",
      });
      postCrmRequest("/website.Channels/getList", params);
      // this.requestData('https://crm.chinabidding.cn/admin/website.Channels/getList', params)
    },
    init() {
      this.getDataList();
    },
    changeColumns(v) {
      this.columns.map((item) => {
        let hide = true;
        for (let i = 0; i < v.length; i++) {
          if (!item.key) {
            hide = false;
            break;
          }
          if (item.key == v[i] || item.key.indexOf(this.whiteColumns) > -1) {
            hide = false;
            break;
          }
        }
        item.hide = hide;
        return item;
      });
      // 触发计算方法
      this.columnChange = !this.columnChange;
    },
    changePage(v) {
      this.searchForm.pageNumber = v;
      this.getDataList();
      this.clearSelectAll();
    },
    changePageSize(v) {
      this.searchForm.pageSize = v;
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
    getDataList() {
      this.loading = true;
      // 请求后端获取表单数据 请自行修改接口
      // this.getRequest("请求路径", this.searchForm).then(res => {
      //   this.loading = false;
      //   if (res.success) {
      //     this.data = res.result.content;
      //     this.total = res.result.totalElements;
      //   }
      // });
      // 以下为模拟数据
      let list = this.dataList.rows;
      this.data = list.map((item) => {
        item = { ...item.cell, id: item.id };
        return item;
      });
      this.total = this.data.length;
      this.loading = false;
    },
    handleCancel() {
      this.modalVisible = false;
    },
    handleSubmit() {
      console.log(this.form);
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          if (this.modalType == 0) {
            // 添加 避免编辑后传入id等数据 记得删除
            delete this.form.id;
            // this.postRequest("请求地址", this.form).then(res => {
            //   this.submitLoading = false;
            //   if (res.success) {
            //     this.$Message.success("操作成功");
            //     this.getDataList();
            //     this.modalVisible = false;
            //   }
            // });
            // 模拟请求成功
            this.submitLoading = false;
            this.$Message.success("操作成功");
            this.getDataList();
            this.modalVisible = false;
          } else {
            // 编辑
            // this.postRequest("请求地址", this.form).then(res => {
            //   this.submitLoading = false;
            //   if (res.success) {
            //     this.$Message.success("操作成功");
            //     this.getDataList();
            //     this.modalVisible = false;
            //   }
            // });
            // 模拟请求成功
            this.submitLoading = false;
            this.$Message.success("操作成功");
            this.getDataList();
            this.modalVisible = false;
          }
        }
      });
    },
    add() {
      this.modalType = 0;
      this.modalTitle = "添加";
      this.$refs.form.resetFields();
      delete this.form.id;
      this.modalVisible = true;
    },
    edit(v) {
      this.modalType = 1;
      this.modalTitle = "编辑";
      this.$refs.form.resetFields();
      var currentData = this.data.find((item) => {
        return item.id == v.id;
      });
      this.form.loginName = currentData["1"];
      this.form.alias = currentData["2"];
      // 转换null为""
      /* for (let attr in v) {
        if (v[attr] == null) {
          v[attr] = "";
        }
      }
      let str = JSON.stringify(v);
      let data = JSON.parse(str);
      this.form = data; */
      this.modalVisible = true;
    },
    remove(v) {
      console.log(v);
      this.$Modal.confirm({
        title: "确认删除",
        // 记得确认修改此处
        content: "您确认要删除 " + v["1"] + " ?",
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
          // this.$Message.success("操作成功");
          // this.$Modal.remove();
          // this.getDataList();
          var params = qs.stringify({ id: v.id });
          removeCrm("/website.Sites/remove", params).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              this.getDataList();
            }
          });
        },
      });
    },
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    changeSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
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
          this.clearSelectAll();
          this.getDataList();
        },
      });
    },
  },
  mounted() {
    this.init();
    this.getListData();
  },
};
</script>