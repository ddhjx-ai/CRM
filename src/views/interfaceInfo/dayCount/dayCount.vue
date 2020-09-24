<template>
  <div class="app_container">
    <Card>
      <Row class="operation" style="margin-bottom:10px">
        <Form ref="searchForm" :model="searchForm" inline :label-width="100" label-position="right">
          <Form-item class="searchLabel" label="公司名称" prop="search">
            <Input type="text" v-model="searchForm.search" clearable style="width: 200px;" />
          </Form-item>
          <Form-item class="searchLabel" label="用户名" prop="search">
            <Input type="text" v-model="searchForm.search" clearable style="width: 200px;" />
          </Form-item>
          <Form-item class="searchLabel" label="发布信息数量" prop="search">
            <Input type="text" v-model="searchForm.search" clearable style="width: 200px;" />
          </Form-item>
          <FormItem label="日期">
            <Select v-model="searchForm.select" style="width: 200px;">
              <Option
                :value="item.value"
                v-for="item in optinsList"
                :key="item.value"
              >{{item.label}}</Option>
            </Select>
          </FormItem>
          <Form-item style="margin-left:-35px;" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search">查询</Button>
            <Button @click="handleReset">重置</Button>
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
import { getDate } from "@/libs/myUtil";
export default {
  name: "dayCount",
  data() {
    let date = getDate();
    return {
      searchForm: {
        page: 1,
        size: 10,
        select: "todayNum",
      },
      data: [
        {
          companyName: "中煤招标有限责任公司",
          fifthNum: 0,
          firstNum: 0,
          fourthNum: 0,
          id: 1,
          memberId: 100487,
          secondNum: 0,
          seventhNum: 0,
          sixthNum: 0,
          thirdNum: 0,
          todayNum: 0,
          userName: "cctc",
        },
        {
          companyName: "中国移动通信集团",
          fifthNum: 0,
          firstNum: 0,
          fourthNum: 0,
          id: 2,
          memberId: 7329182,
          secondNum: 0,
          seventhNum: 0,
          sixthNum: 0,
          thirdNum: 0,
          todayNum: 0,
          userName: "CMCC",
        },
        {
          companyName: "山西伟拓电子招投标服务有限公司",
          fifthNum: 0,
          firstNum: 0,
          fourthNum: 0,
          id: 3,
          memberId: 200271462,
          secondNum: 0,
          seventhNum: 0,
          sixthNum: 0,
          thirdNum: 0,
          todayNum: 0,
          userName: "18635181760",
        },
      ],
      columns: [
        {
          type: "index",
          title: "序号",
          width: 70,
          align: "center",
        },
        {
          title: "公司名",
          key: "companyName",
          minWidth: 150,
          align: "center",
        },
        {
          title: "用户名",
          key: "userName",
          minWidth: 120,
          align: "center",
        },
        {
          title: date[0],
          key: "todayNum",
          align: "center",
          render: (h,params) => {
            return h('div', {style: {color: 'red'}}, params.row.todayNum)
          }
        },
        {
          title: date[1],
          key: "firstNum",
          align: "center",
        },
        {
          title: date[2],
          key: "secondNum",
          align: "center",
        },
        {
          title: date[3],
          key: "thirdNum",
          align: "center",
        },
        {
          title: date[4],
          key: "fourthNum",
          align: "center",
        },
        {
          title: date[5],
          key: "fifthNum",
          align: "center",
        },
        {
          title: date[6],
          key: "sixthNum",
          align: "center",
        },
        {
          title: date[7],
          key: "seventhNum",
          align: "center",
        },
      ],
      loading: false,
      total: 0,
      optinsList: [
        {
          value: "todayNum",
          label: "当日",
        },
        {
          value: "firstNum",
          label: "前1天",
        },
        {
          value: "secondNum",
          label: "前2天",
        },
        {
          value: "thirdNum",
          label: "前3天",
        },
        {
          value: "fourthNum",
          label: "前4天",
        },
        {
          value: "fifthNum",
          label: "前5天",
        },
        {
          value: "sixthNum",
          label: "前6天",
        },
        {
          value: "seventhNum",
          label: "前7天",
        },
      ],
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
    // 获取列表数据
    getDataList() {},
    // 重置
    handleReset() {
      this.$refs.searchForm.resetFields();
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      // 重新加载数据
      this.getDataList();
    },
    // 查询
    handleSearch() {},
  },
};
</script>

<style scoped lang="less">
.mygrid .ivu-table th {
  text-align: center;
}
</style>