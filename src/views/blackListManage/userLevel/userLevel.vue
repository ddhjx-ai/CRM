<template>
  <div class="app_container">
    <Card>
      <Row class="operation" style="margin-bottom: 10px">
        <Form
          ref="searchForm"
          :model="searchForm"
          inline
          :label-width="80"
          label-position="right"
        >
          <Form-item label="IP" prop="ipRaw">
            <Input
              type="text"
              v-model="searchForm.ipRaw"
              style="width: 200px"
            />
          </Form-item>
          <Form-item label="用户名" prop="loginId">
            <Input
              type="text"
              v-model="searchForm.loginId"
              style="width: 200px"
            />
          </Form-item>
          <Form-item label="状态" prop="status">
            <Select
              v-model="searchForm.status"
              placeholder="全部"
              style="width: 200px"
            >
              <Option :value="-1">全部</Option>
              <Option :value="0">未删除</Option>
              <Option :value="1">已删除</Option>
            </Select>
          </Form-item>
          <Form-item style="margin-left: -35px" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search"
              >查询</Button
            >
            <Button type="" @click="handleReset">重置</Button>
          </Form-item>
        </Form>
      </Row>
      <Row class="operation" style="margin-bottom:10px">
        <Button @click="handleDelete" type="error" icon="md-trash">删除</Button>
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
          :current="searchForm.offset"
          :total="total"
          :page-size="searchForm.limit"
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
import { getCrmRequest, deleteReport, postCrmRequest } from "@/api/crm";
export default {
  name: "userLevel",
  data() {
    return {
      searchForm: {
        offset: 1,
        limit: 10,
        loginId: "",
        status: -1,
        ipRaw: "",
      },
      data: [],
      total: 0,
      columns: [
        {
          type: "selection",
          width: 70,
          align: "center",
        },
        {
          title: "IP",
          key: "ipRaw",
          minWidth: 150,
          align: "center",
        },
        {
          title: "用户名",
          key: "loginId",
          minWidth: 150,
          align: "center",
        },
        {
          title: "等级",
          key: "level",
          width: 100,
          align: "center",
        },
        {
          title: "状态",
          key: "status",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: params.row.status ? "error" : "success",
                  size: "small",
                },
                /* on: {
                  click: () => {
                    this.changeStatus(params.row);
                  },
                }, */
              },
              params.row.status ? "已删除" : "未删除"
            );
          },
        },
        {
          title: "创建时间",
          key: "createModify",
          align: "center",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            return h("div", {}, this.format(new Date(params.row.createModify),"yyyy-MM-dd HH:mm:ss"));
          },
        },
        {
          title: "最后修改时间",
          key: "upModify",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            return h("div", {}, this.format(new Date(params.row.upModify),"yyyy-MM-dd HH:mm:ss"));
          },
        },
      ],
      loading: false,
      selectList: [],
      selectCount: 0,
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    changeSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    changePage(v) {
      this.searchForm.offset = v;
      this.getDataList();
    },
    changesize(v) {
      this.searchForm.limit = v;
      this.getDataList();
    },
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    // 获取列表数据
    getDataList() {
      this.loading = true;
      getCrmRequest(
        "/manageinfo/ipmemberlevel/findLevelList",
        this.searchForm
      ).then((res) => {
        this.loading = false;
        if (res.success) {
          this.total = res.result.count;
          this.data = res.result.list;
          this.clearSelectAll();
        }
      });
    },
    // 重置
    handleReset() {
      this.$refs.searchForm.resetFields();
      this.searchForm.offset = 1;
      this.searchForm.limit = 10;
      // 重新加载数据
      this.getDataList();
    },
    // 查询
    handleSearch() {
      this.searchForm.offset = 1;
      this.searchForm.limit = 10;
      this.getDataList();
    },
    // 删除
    handleDelete() {
      if (this.selectCount <= 0) {
        this.$Message.warning("请选择要删除的数据");
        return;
      }
      let ids = this.selectList.map((item) => {
        return item.id;
      });
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除所选的 " + this.selectCount + " 条数据?",
        loading: true,
        onOk: () => {
          // 批量删除
          deleteReport("/manageinfo/ipmemberlevel/delete", { ids }).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("删除成功");
              this.getDataList();
            }
          });
        },
      });
    },
  },
};
</script>