<template>
  <div class="app_container">
    <Card>
      <Row class="operation" style="margin-bottom:10px">
        <Form
              ref="searchForm"
              :model="searchForm"
              inline
              :label-width="90"
              label-position="right"
            >
              <Form-item class="searchLabel" label="客户ID" prop="search">
                <Input
                  type="text"
                  v-model="searchForm.search"
                  clearable
                  style="width: 200px;"
                />
              </Form-item>
              <Form-item class="searchLabel" label="客户用户名" prop="search">
                <Input
                  type="text"
                  v-model="searchForm.search"
                  clearable
                  style="width: 200px;"
                />
              </Form-item>
              <Form-item style="margin-left:-35px;" class="br">
                <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
              </Form-item>
            </Form>
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
          :current="searchForm.page"
          :total="total"
          :page-size="searchForm.size"
          @on-change="changePage"
          @on-page-size-change="changesize"
          :page-size-opts="[10,20,50]"
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
export default {
  name: "mailLog",
  data() {
    return {
      searchForm: {
        page: 1,
        size: 10,
      },
      data: [],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "ID",
          key: "id",
          align: "center",
        },
        {
          title: "站点ID",
          key: "id",
          align: "center",
        },
        {
          title: "任务ID",
          key: "id",
          align: "center",
        },
        {
          title: "分配时间",
          key: "id",
          align: "center",
        },
        {
          title: "完成时间",
          key: "id",
          align: "center",
        },
        {
          title: "成功总数",
          key: "id",
          align: "center",
        },
        {
          title: "失败总数",
          key: "id",
          align: "center",
        },
      ],
      loading: false,
      total: 0,
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    changePage(v) {
      this.searchForm.page = v;
      this.getDataList();
      this.clearSelectAll();
    },
    changesize(v) {
      this.searchForm.size = v;
      this.getDataList();
    },
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    getDataList() {},
  },
};
</script>

<style scoped lang="less">
.mygrid .ivu-table th {
  text-align: center;
}
</style>