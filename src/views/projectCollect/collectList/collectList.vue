
<template>
  <div class="search">
    <Card>
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
import {
  getCrmRequest,
  removeCrm,
  postCrmRequest,
  putCrmRequest,
  exportExcel,
} from "@/api/crm";
import qs from "qs";
export default {
  name: "collectList",
  data() {
    return {
      loading: false, // 表单加载状态
      searchForm: {
        // 搜索框对应data对象
        page: 1, // 当前页数
        size: 10, // 页面大小
      },
      columns: [
        // 表头
        {
          type: "index",
          width: 100,
          align: "center",
          title: "序号",
        },
        {
          title: "栏目名称",
          key: "name",
          align: "center",
          minWidth: 120,
        },
        {
          title: "栏目关键词",
          key: "keyword",
          align: "center",
          minWidth: 120,
        },
        {
          title: "操作",
          align: "center",
          width: 120,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    // icon: "md-trash",
                  },
                  style: {
                    // marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.handleDown(params.row);
                    },
                  },
                },
                "下载"
              ),
            ]);
          },
        },
      ],
      data: [], // 表单数据
      total: 0, // 表单数据总数
    };
  },
  // 表格动态列 计算属性
  methods: {
    init() {
      this.getDataList();
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
      console.log(new Blob());
      // 请求后端获取表单数据 请自行修改接口
      getCrmRequest(
        "/project_summary/block_keywords_list",
        this.searchForm
      ).then((res) => {
        this.loading = false;
        if (res.success) {
          if (!res.result) return;
          this.data = res.result.list;
          this.total = res.result.total;
        }
      });
    },
    // 查询
    handleSearch() {
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      this.getDataList();
    },
    // 下载
    handleDown(v) {
      exportExcel("/osc/project_summary/download", {
        blocksId: v.blocksId,
      }).then((res) => {
        const link = document.createElement("a");
        // let blob = new Blob([res],  {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'})
        let blob = new Blob([res], { type: "application/vnd.ms-excel" });
        link.style.display = "none";
        link.href = URL.createObjectURL(blob);

        // link.download = res.headers['content-disposition'] //下载后文件名
        link.download = "项目汇总.xlsx"; //下载的文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" escoped>
</style>