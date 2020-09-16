<template>
  <div class="search">
    <Card>
      <Row>
        <Form ref="searchForm" :model="searchForm" inline :label-width="120" label-position="right">
          <Form-item label="规则名" prop="name">
            <Input type="text" v-model="searchForm.name" style="width: 200px;" />
          </Form-item>
          <Form-item label="关键词" prop="keyword">
            <Input type="text" v-model="searchForm.name" style="width: 200px;" />
          </Form-item>
          <Form-item label="一级行业" prop="emailStr">
            <Select
              v-model="searchForm.status"
              @on-change="firstChange"
              style="width:200px"
              placeholder="全部"
            >
              <Option v-for="item in firstOptions" :key="item.id" :value="0">{{item.name}}</Option>
            </Select>
          </Form-item>
          <Form-item label="二级分类" prop="emailStr">
            <Select v-model="searchForm.status" style="width:200px" placeholder="全部">
              <Option v-for="item in secOptions" :key="item.id" :value="0">{{item.name}}</Option>
            </Select>
          </Form-item>
          <Form-item label="搜索方式" prop="searchType">
            <Select v-model="searchForm.searchType" style="width:200px" placeholder="全部">
              <Option value="0">标题搜索</Option>
              <Option value="1">内容搜索</Option>
              <Option value="2">行业搜索</Option>
            </Select>
          </Form-item>
          <Form-item label="最后一次数据量" prop="lastPushNum">
            <Input type="text" v-model="searchForm.lastPushNum" style="width: 200px;" />
          </Form-item>
          <Form-item class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
            <Button @click="handleReset">重置</Button>
          </Form-item>
        </Form>
      </Row>
      <Row class="operation" style="margin-bottom:10px">
        <Button @click="handleAdd" type="primary">添加规则</Button>
        <Button @click="getDataList" icon="md-refresh">刷新</Button>
      </Row>
      <Row>
        <Table
          class="mygrid"
          :loading="loading"
          border
          :columns="columns"
          :data="data"
          ref="table"
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

    <Modal :title="modalTitle" v-model="modalVisible" :mask-closable="false" :width="1000">
      <h3 class="basicDetail">基本信息</h3>
      <Form ref="form" :model="form" :label-width="100" :rules="formValidate">
        <FormItem label="规则名" prop="name">
          <Input v-model="form.name" style="width: 300px;" />
        </FormItem>
        <FormItem label="关键词" prop="keyword">
          <Input v-model="form.keyword" style="width: 300px;" placeholder="最多输入10个字符" />
        </FormItem>
        <FormItem label="项目搜索方式" prop="searchType">
          <RadioGroup v-model="form.searchType">
            <Radio :label="0">标题搜索</Radio>
            <Radio :label="1">内容搜索</Radio>
            <Radio :label="2">行业搜索</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <h3 class="basicDetail">行业</h3>
      <Row>
        <Table
          class="mygrid"
          :loading="loading"
          border
          :columns="subColums"
          :data="subData"
          ref="subTable"
          :span-method="handleSpan"
          @on-selection-change="changeSelect"
        ></Table>
      </Row>
    </Modal>
  </div>
</template>

<script>
import { getCrmRequest, removeCrm } from "@/api/crm";
import { validateNum, validateIP } from "@/libs/validate";
import qs from "qs";
export default {
  name: "ruleList",
  data() {
    return {
      firstOptions: [
        { id: 2, name: "交通运输" },
        { id: 3, name: "能源化工--电力" },
        { id: 4, name: "能源化工--化工" },
        { id: 5, name: "冶金矿产" },
      ],
      secOptions: [],
      modalVisible: false,
      form: {
        name: "",
        keyword: "",
        searchType: "",
      },
      emailForm: {},
      formValidate: {
        daily: { validator: validateNum, trigger: "blur" },
        weekly: { validator: validateNum, trigger: "blur" },
        monthly: { validator: validateNum, trigger: "blur" },
        delayTime: { validator: validateNum, trigger: "blur" },
        ipNotAllow: { validator: validateIP, trigger: "blur" },
        ipAllow: { validator: validateIP, trigger: "blur" },
      },
      loading: true, // 表单加载状态
      searchForm: {
        // 搜索框对应data对象
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
      },
      modalType: 0, // 添加或编辑标识
      modalVisible: false, // 添加或编辑显示
      modalTitle: "",
      submitLoading: false,
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      columns: [
        {
          type: "index",
          width: 70,
          title: "序号",
          align: "center",
          fixed: "left",
        },
        {
          title: "规则名",
          key: "name",
          minWidth: 120,
          align: "center",
          fixed: "left",
        },
        {
          title: "行业",
          key: "industryStr",
          minWidth: 120,
          align: "center",
        },
        {
          title: "关键词",
          key: "keyword",
          minWidth: 160,
          align: "center",
        },
        {
          title: "搜索方式",
          key: "searchType",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.searchType == 0) {
              return h("div", {}, "标题搜索");
            } else if (params.row.searchType == 1) {
              return h("div", {}, "内容搜索");
            } else {
              return h("div", {}, "行业搜索");
            }
          },
        },
        {
          title: "最后一次推送数据量",
          key: "lastPushNum",
          align: "center",
          minWidth: 120,
        },
        {
          title: "创建时间",
          key: "createDate",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            return h("div", {}, this.formdate(params.row.createDate));
          },
        },
        {
          title: "最后修改时间",
          key: "updateDate",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            return h("div", {}, this.formdate(params.row.updateDate));
          },
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 150,
          fixed: "right",
          render: (h, params) => {
            return h("div", [
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
                      this.handleEdit(params.row);
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
                      this.handleRemove(params.row);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      subColums: [
        {
          type: "selection",
          width: 70,
          align: "center",
        },
        {
          title: "一级行业",
          key: "supType",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            return h(
              "Checkbox",
              {
                props: {
                  // 使用value绑定数据而不是'v-model'
                  value: true,
                },
                on: {
                  "on-change": (val) => {
                    this.checkboxValue = val;
                    console.log(val, 11);
                  },
                },
              },
              params.row.supType
            );
          },
        },
        {
          title: "二级行业",
          key: "subType",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            return h(
              "checkbox-group",
              {
                props: {
                  value: this.checkboxValue,
                },
                on: {
                  "on-change": (val) => {
                    this.checkboxValue = val;
                    console.log(val, 11);
                  },
                },
              },
              [
                params.row.subType.map((item) => {
                  return h(
                    "Checkbox",
                    {
                      /* props: {
                        // 使用value绑定数据而不是'v-model'
                        value: true,
                      }, */
                    },
                    item
                  );
                }),
              ]
            );
          },
        },
      ],
      data: [], // 表单数据
      subData: [
        {
          supType: "交通运输",
          subType: ["高速公路、道路", "桥梁、立交桥", "铁路、轨道交通"],
        },
        {
          supType: "能源化工--电力",
          subType: ["天然气、输气管道", "石油、石化", "太阳能、光伏发电"],
        },
      ], // 邮箱表单数据
      total: 0, // 表单数据总数
      dataList: {
        total: 40,
        rows: [
          {
            createDate: 1553133819000,
            id: 28,
            industryStr: "电网建设,",
            keyword: "",
            lastPushNum: 7,
            name: "电网",
            searchType: 2,
            status: 0,
            updateDate: 1600070340000,
          },
          {
            createDate: 1553133835000,
            id: 29,
            industryStr: "风电,",
            keyword: "",
            lastPushNum: 1,
            name: "风电",
            searchType: 2,
            status: 0,
            updateDate: 1600070340000,
          },
          {
            createDate: 1553133852000,
            id: 30,
            industryStr: "港口、码头、泊位、渔港,",
            keyword: "",
            lastPushNum: 3,
            name: "港口、码头",
            searchType: 2,
            status: 0,
            updateDate: 1600070340000,
          },
          {
            createDate: 1553135900000,
            id: 31,
            industryStr: "高速公路、道路,",
            keyword: "",
            lastPushNum: 80,
            name: "高速公路、道路",
            searchType: 2,
            status: 0,
            updateDate: 1600070340000,
          },
          {
            createDate: 1553135958000,
            id: 32,
            industryStr: "能源化工--化工,",
            keyword: "",
            lastPushNum: 31,
            name: "化工",
            searchType: 2,
            status: 0,
            updateDate: 1600070340000,
          },
          {
            createDate: 1553135980000,
            id: 33,
            industryStr: "环保,",
            keyword: "",
            lastPushNum: 71,
            name: "环保",
            searchType: 2,
            status: 0,
            updateDate: 1600070340000,
          },
          {
            createDate: 1553135989000,
            id: 34,
            industryStr: "火电,",
            keyword: "",
            lastPushNum: 15,
            name: "火电",
            searchType: 2,
            status: 0,
            updateDate: 1600070340000,
          },
          {
            createDate: 1553135997000,
            id: 35,
            industryStr: "机场,",
            keyword: "",
            lastPushNum: 3,
            name: "机场",
            searchType: 2,
            status: 0,
            updateDate: 1600070340000,
          },
          {
            createDate: 1553136023000,
            id: 36,
            industryStr: "机械电子,",
            keyword: "",
            lastPushNum: 123,
            name: "机械电子电器",
            searchType: 2,
            status: 0,
            updateDate: 1600070340000,
          },
          {
            createDate: 1553136050000,
            id: 37,
            industryStr: "垃圾,",
            keyword: "",
            lastPushNum: 14,
            name: "垃圾",
            searchType: 2,
            status: 0,
            updateDate: 1600070340000,
          },
        ],
      },
    };
  },
  // 表格动态列 计算属性
  computed: {},
  methods: {
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
      getCrmRequest("/chinabidding.BlackLists/getList", params);
    },
    // 时间处理函数
    formdate(date) {
      if (!date) {
        return "-";
      }
      let time = new Date(date);
      let year = time.getFullYear();
      let month = (time.getMonth() + 1).toString().padStart(2, "0");
      let day = time.getDate().toString().padStart(2, "0");
      let hour = time.getHours().toString().padStart(2, "0");
      let minute = time.getMinutes().toString().padStart(2, "0");
      let second = time.getSeconds().toString().padStart(2, "0");
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },
    init() {
      this.getDataList();
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
    // 获取列表书
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
      this.data = this.dataList.rows;
      this.total = this.data.length;
      this.loading = false;
    },
    changeSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    // 编辑
    handleEdit(v) {
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
    // 添加
    handleAdd() {
      this.modalType = 0;
      this.modalTitle = "添加";
      this.$refs.form.resetFields();
      delete this.form.id;
      this.modalVisible = true;
    },
    // 提交编辑/添加
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
    // 删除
    handleDel() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未选择要删除的数据");
        return;
      }
      if (this.selectCount > 1) {
        this.$Message.warning("请选择一条数据");
        return;
      }
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除所选的 " + this.selectCount + " 条数据?",
        loading: true,
        onOk: () => {
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
    // 选取
    handleSelect() {
      this.modalVisible = true;
      this.modalSelectCount = 0;
      this.modalSelectList = [];
      this.$refs.form.resetFields();
      this.getModalData();
    },
    handleId() {},
    // 同步所有信息
    handleSync() {},
    // 删除
    handleRemove(v) {
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除所选当前数据?",
        loading: true,
        onOk: () => {
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
    // 查看详情
    handleDetail(v) {},
    // 启用/停用
    handleStop(v) {},
    // 一级行业change
    firstChange(v) {},
    // 合并table
    handleSpan({ row, column, rowIndex, columnIndex }) {
      /* if (rowIndex === 0 && columnIndex === 0) {
        return [1, 2];
      } else if (rowIndex === 0 && columnIndex === 1) {
        return [0, 0];
      } */
      if (rowIndex === 0 && columnIndex === 0) {
        return {
          rowspan: 100,
          colspan: 1,
        };
      } else if (columnIndex === 0) {
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less">
@import "../../../styles/table-common.less";
@import "./ruleList.less";
</style>