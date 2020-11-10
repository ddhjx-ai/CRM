<style lang="less">
</style>
<template>
  <div class="search">
    <Card>
      <Row>
        <Form
          ref="searchForm"
          :model="searchForm"
          inline
          :label-width="80"
          label-position="right"
        >
          <Form-item label="快速查找" prop="memberId">
            <Input
              type="text"
              v-model="searchForm.memberId"
              placeholder="根据完整的手机号查找"
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
import { getCrmRequest, removeCrm, postCrmRequest, putCrmRequest } from "@/api/crm";
import qs from "qs";
export default {
  name: "preSaleList",
  data() {
    return {
      loading: false, // 表单加载状态
      searchForm: {
        // 搜索框对应data对象
        page: 1, // 当前页数
        size: 10, // 页面大小
        search: "",
      },
      columns: [
        // 表头
        {
          type: "index",
          width: 100,
          align: "center",
          title: '序号'
        },
        {
          title: "报告ID",
          key: "id",
          minWidth: 120,
          align: "center",
          render: (h, params) => {
            return h(
              'a',
              {
                style: {
                  color: "#2d8cf0",
                  "text-decoration": "none",
                },
                attrs: {},
                on: {
                  click: () => {
                    this.titleToHerf(params.row);
                  },
                },
              },
              params.row.id
            )
          }
        },
        {
          title: "提交时间",
          key: "submitTime",
          align: "center",
          minWidth: 120,
        },
        {
          title: "员工姓名",
          key: "employName",
          align: "center",
          minWidth: 120,
        },
        {
          title: "所在部门",
          key: "department",
          align: "center",
          minWidth: 120,
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          minWidth: 120,
          render: (h,parmas) => {
            return h('span', {
              style: {
                color: parmas.row.status === 1 ? '#19be6b' : '#ed4014'
              }
            } ,
            parmas.row.status === 1 ? '已生成' : '未生成'
            )
          }
        },
      ],
      data: [
        {
          id: '001',
          submitTime: '2020-02-02 22:22:22',
          employName: 'wc',
          department: '测试',
          status: 1
        }
      ], // 表单数据
      total: 0, // 表单数据总数
    };
  },
  // 表格动态列 计算属性
  methods: {
    init() {
      // this.getDataList();
    },
    changePage(v) {
      this.searchForm.page = v;
      this.getDataList();
    },
    changesize(v) {
      this.searchForm.size = v;
      this.getDataList();
    },
    getDataList() {
      this.loading = true;
      // 请求后端获取表单数据 请自行修改接口
      postCrmRequest(
        "/up/report/aimuser_list",
        qs.stringify(this.searchForm)
      ).then((res) => {
        this.loading = false;
        if (res.success) {
          if (!res.result) return;
          this.data = res.result.list;
          this.total = res.result.total;
        }
      });
    },
    titleToHerf(v) {
      this.$router.push({
        name: 'preSaleDetail',
        query: {
          id: v.id
        }
      })
    },
    // 查询
    handleSearch() {
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      this.getDataList();
    },
    // 重置
    handleReset() {
      this.$refs.searchForm.resetFields();
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      this.getDataList();
    },
  },
  mounted() {
    this.init();
  },
};
</script>