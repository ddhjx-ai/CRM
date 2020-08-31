<style lang="less">
</style>
<template>
  <div class="search">
    <Card>
      <Row class="operation">
        <Button @click="add" type="primary" icon="md-add">添加</Button>
        <Button @click="endPlan" type="primary" icon="ios-book-outline">结束所有发布计划</Button>
        <Button @click="releasePlan" type="primary" icon="md-book">所有发布计划出账</Button>
        <Button @click="addAd" type="primary" icon="md-add-circle">添加广告</Button>
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
        <FormItem label="登录名">
          <Input v-model="form.loginName" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handleCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handleSubmit">提交</Button>
      </div>
    </Modal>

    <!-- 添加广告弹出框 -->
    <Modal title="添加广告" v-model="adVisible" :mask-closable="false" :width="500">
      <Form ref="adForm" :model="adForm" :label-width="80" :rules="formValidate">
        <FormItem label="登录名">
          <Input v-model="adForm.loginName" />
        </FormItem>
        <FormItem label="链接地址">
          <Input v-model="adForm.linkUrl" />
        </FormItem>
        <FormItem label="是否可用">
          <RadioGroup v-model="adForm.isUse">
            <Radio :label="0">no</Radio>
            <Radio :label="1">yes</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="文件类型">
          <i-select v-model="adForm.fileType" style="width:200px">
            <i-option value="word">word</i-option>
            <i-option value="swf">swf</i-option>
            <i-option value="flv">flv</i-option>
            <i-option value="bmp">bmp</i-option>
            <i-option value="gif">gif</i-option>
            <i-option value="jpg">jpg</i-option>
            <i-option value="png">png</i-option>
            <i-option value="other">other</i-option>
          </i-select>
        </FormItem>
        <FormItem label="宽度">
          <Input v-model="adForm.width" style="width:200px" />
        </FormItem>
        <FormItem label="高度">
          <Input v-model="adForm.height" style="width:200px" />
        </FormItem>
        <FormItem label="活动描述">
          <Input v-model="adForm.describe" placeholder="请输入..." type="textarea" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="adCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="adSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { postCrmRequest, removeCrm } from "@/libs/axios";
import { validateNum } from "@/libs/validate";
import axios from "axios";
import qs from "qs";
export default {
  name: "userList",
  data() {
    return {
      openTip: false, // 显示提示
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
      adVisible: false, // 广告弹出框
      form: {
        // 添加或编辑表单对象初始化数据
        loginName: "",
      },
      adForm: {
        loginName: "",
        linkUrl: "",
        isUse: 0,
        fileType: "",
        width: "",
        height: "",
        describe: "",
      },
      // 表单验证规则
      formValidate: {
        price: [
          { required: true, message: "价格不能为空", trigger: "blur" },
          { validator: validateNum, trigger: "blur" },
        ],
        amount: [
          { required: true, message: "金额不能为空", trigger: "blur" },
          { validator: validateNum, trigger: "blur" },
        ],
        owner: [{ required: true, message: "请选择一个业主", trigger: "blur" }],
        startTime: [
          {
            required: true,
            type: "date",
            message: "请选择日期",
            trigger: "change",
          },
        ],
        endTime: [
          {
            required: true,
            type: "date",
            message: "请选择日期",
            trigger: "change",
          },
        ],
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
          width: 120,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "text",
                  size: "small",
                },
                style: {
                  color: "#2e68a7",
                },
                on: {
                  click: () => {
                    this.toAddList(params.row);
                  },
                },
              },
              `${params.row.id}`
            );
          },
        },
        {
          title: "名称",
          key: "1",
        },
        {
          title: "创建人",
          key: "2",
        },
        {
          title: "创建时间",
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
        total: 168,
        rows: [
          {
            id: 221,
            cell: [
              "<a href='/admin.ad.guanggaos/yzGglist?yzId=221' target='mainFrame'>221</a>",
              "<a href='javascript:edit_yz(221)'>张倩</a> ",
              "测试人员 ",
              "2019-03-01 10:56:41.0 ",
            ],
          },
          {
            id: 220,
            cell: [
              "<a href='/admin.ad.guanggaos/yzGglist?yzId=220' target='mainFrame'>220</a>",
              "<a href='javascript:edit_yz(220)'>史爱红</a> ",
              "测试人员 ",
              "2018-07-02 11:30:55.0 ",
            ],
          },
          {
            id: 219,
            cell: [
              "<a href='/admin.ad.guanggaos/yzGglist?yzId=219' target='mainFrame'>219</a>",
              "<a href='javascript:edit_yz(219)'>季城</a> ",
              "测试人员 ",
              "2018-03-16 11:48:15.0 ",
            ],
          },
          {
            id: 216,
            cell: [
              "<a href='/admin.ad.guanggaos/yzGglist?yzId=216' target='mainFrame'>216</a>",
              "<a href='javascript:edit_yz(216)'>卞丽君</a> ",
              "测试人员 ",
              "2018-02-11 11:00:17.0 ",
            ],
          },
          {
            id: 215,
            cell: [
              "<a href='/admin.ad.guanggaos/yzGglist?yzId=215' target='mainFrame'>215</a>",
              "<a href='javascript:edit_yz(215)'>张铭名</a> ",
              "测试人员 ",
              "2018-01-31 14:37:47.0 ",
            ],
          },
          {
            id: 214,
            cell: [
              "<a href='/admin.ad.guanggaos/yzGglist?yzId=214' target='mainFrame'>214</a>",
              "<a href='javascript:edit_yz(214)'>天职咨询</a> ",
              "测试人员 ",
              "2018-01-09 10:34:36.0 ",
            ],
          },
          {
            id: 213,
            cell: [
              "<a href='/admin.ad.guanggaos/yzGglist?yzId=213' target='mainFrame'>213</a>",
              "<a href='javascript:edit_yz(213)'>foxfocus.cn</a> ",
              "测试人员 ",
              "2017-12-14 08:51:41.0 ",
            ],
          },
          {
            id: 212,
            cell: [
              "<a href='/admin.ad.guanggaos/yzGglist?yzId=212' target='mainFrame'>212</a>",
              "<a href='javascript:edit_yz(212)'>zhangguangyun</a> ",
              "zhangguangyun ",
              "2017-11-09 14:26:51.0 ",
            ],
          },
          {
            id: 211,
            cell: [
              "<a href='/admin.ad.guanggaos/yzGglist?yzId=211' target='mainFrame'>211</a>",
              "<a href='javascript:edit_yz(211)'>王海玲</a> ",
              " ",
              "2011-07-04 11:35:25.0 ",
            ],
          },
          {
            id: 210,
            cell: [
              "<a href='/admin.ad.guanggaos/yzGglist?yzId=210' target='mainFrame'>210</a>",
              "<a href='javascript:edit_yz(210)'>于海辉</a> ",
              " ",
              "2011-07-04 11:34:56.0 ",
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
      // 以下为模拟数据 "<a href='javascript:edit_ggw(2377)'>cgxxIndexAd-b5-lb</a> "
      let list = this.dataList.rows;
      this.data = list.map((item) => {
        item.cell[1] = item.cell[1].replace(
          /<a[\s\S]*>([\s\S]*)<\/[\s\S]*>/g,
          "$1"
        );
        console.log(item.cell[2]);
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
          removeCrm("/ad.GuangGaos/delete", params).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              this.getDataList();
            }
          });
        },
      });
    },
    // 发布计划出账
    releasePlan() {
      if (this.selectCount <= 0) {
        this.$Message.warning("请选择一条数据");
        return;
      } else if (this.selectCount != 1) {
        this.$Message.warning("只能选择一条信息进行操作！");
        return;
      }
      var id = this.selectList[0].id;
      postCrmRequest(
        "/ad.FaBuJiHuas/chuzhang",
        qs.stringify({ yzId: id })
      ).then(() => {
        this.$Message.success("操作成功");
        this.getDataList();
      });
    },
    // 结束所有发布计划
    endPlan() {
      if (this.selectCount <= 0) {
        this.$Message.warning("请选择一条数据");
        return;
      } else if (this.selectCount != 1) {
        this.$Message.warning("只能选择一条信息进行操作！");
        return;
      }
      var id = this.selectList[0].id;
      postCrmRequest(
        "/ad.FaBuJiHuas/toOverAll",
        qs.stringify({ yzId: id })
      ).then(() => {
        this.$Message.success("操作成功");
        this.getDataList();
      });
    },
    // 添加广告
    addAd() {
      if (this.selectCount <= 0) {
        this.$Message.warning("请选择一条数据");
        return;
      } else if (this.selectCount != 1) {
        this.$Message.warning("只能选择一条信息进行操作！");
        return;
      }
      this.adVisible = true;
    },
    adSubmit() {
      this.adVisible = false;
    },
    adCancel() {
      this.adVisible = false;
    },
    // 跳转到业主广告列表页
    toAddList(row) {
      var id = row.id;
      this.$router.push({
        name: "adAllList-index",
        query: {
          id,
        },
      });
      console.log(id);
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