<template>
  <div>
    <Card>
      <Row>
        <Form
          ref="searchForm"
          :model="searchForm"
          inline
          :label-width="80"
          label-position="right"
        >
          <Form-item label="快速查找" prop="search">
            <Input
              type="text"
              v-model="searchForm.search"
              placeholder="按创建人、名称查找"
              style="width: 200px"
            />
          </Form-item>
          <Form-item class="operation">
            <Button @click="handleSearch" type="primary" icon="ios-search"
              >查询</Button
            >
            <Button @click="handleReset">重置</Button>
          </Form-item>
        </Form>
      </Row>
      <Row>
        <Table
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
          :current="searchForm.page"
          :total="total"
          :page-size="searchForm.size"
          @on-change="changePage"
          @on-page-size-change="changesize"
          :page-size-opts="[10, 20, 50]"
          size="small"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </Row>
    </Card>
  </div>
</template>

<script>
import { getCrmRequest, removeCrm } from "@/api/crm";
import qs from "qs";
export default {
  name: "adAllList",
  data() {
    return {
      yezhuId: "",
      loading: false,
      data: [],
      searchForm: {
        // 搜索框对应data对象
        page: 1, // 当前页数
        size: 10, // 页面大小
        search: "",
      },
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
        },
        {
          title: "名称",
          key: "name",
          align: "center",
        },
        {
          title: "创建人",
          key: "createOpr",
          align: "center",
        },
        {
          title: "总金额",
          key: "amount",
          align: "center",
        },
        {
          title: "创建时间",
          key: "createDate",
          align: "center",
          minWidth: 120,
         /*  render: (h, params) => {
            return h("div", {}, this.formdate(params.row.createDate));
          }, */
        },
        /* {
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
        }, */
      ],
    };
  },
  // 表格动态列 计算属性
  computed: {},
  created() {
    this.yezhuId = this.$route.query.id;
  },
  methods: {
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
    getDataList() {
      this.loading = true;
      // 请求后端获取表单数据 请自行修改接口
      getCrmRequest("/ad/yz/" + this.yezhuId, this.searchForm).then((res) => {
        if (res.success) {
          this.loading = false;
          this.data = res.result.list;
          this.total = res.result.total;
        }
      });
    },
    init() {
      this.getDataList();
    },
    changeSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    changePage(v) {
      this.searchForm.page = v;
      this.getDataList();
      this.clearSelectAll();
    },
    changesize(v) {
      this.searchForm.size = v;
      this.getDataList();
    },
    // 查询
    handleSearch() {
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      this.getDataList();
    },
    // 重置
    handleReset() {
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      this.$refs.searchForm.resetFields();
      this.getDataList();
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>