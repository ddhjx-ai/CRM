<template>
  <div>
    <Card>
      <Row>
        <Table
          :loading="loading"
          border
          :columns="columns"
          :data="data"
          ref="table"
        >
        </Table>
      </Row>
      <Row type="flex" justify="end" class="page" style="margin-top: 10px">
        <Page
          :current="searchForm.pageNum"
          :total="total"
          :page-size="searchForm.pageSize"
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
import { getCrmRequest ,exportExcel} from "@/api/crm";
export default {
  name: "downloadData",
  data() {
    return {
      downLoading: [],
      loading: false, // 表单加载状态
      searchForm: {
        // 搜索框对应data对象
        pageNum: 1, // 当前页数
        pageSize: 20, // 页面大小
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
          title: "检索条件",
          key: "query",
          align: "center",
          minWidth: 300,
        },
        {
          title: "下载时间",
          key: "downloadTime",
          align: "center",
          minWidth: 180,
        },
        {
          title: "操作",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    loading: this.downLoading[params.index],
                    disabled: params.row.status === 0 ? true : false,
                  },
                  style: {},
                  on: {
                    click: () => {
                      this.handleDown(params);
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
  activated() {
    this.getDataList()
  },
  methods: {
    getDataList() {
      this.loading = true;
      getCrmRequest("/data_analysis/data_download", this.searchForm).then((res) => {
        this.loading = false;
        if (res.success) {
          this.data = res.result.content;
          this.total = res.result.totalElements;
          this.downLoading = res.result.content.map((item) => false);
        }
      });
    },
    changePage(v) {
      this.searchForm.pageNum = v;
      this.getDataList();
    },
    changesize(v) {
      this.searchForm.pageSize = v;
      this.getDataList();
    },
    // 下载
    handleDown(v) {
      this.downLoading.splice(v.index, 1, true);
      exportExcel("/osc/data_analysis/download", {
        id: v.row.id,
      }).then((res) => {
        this.downLoading.splice(v.index,1,false);
        const link = document.createElement("a");
        let blob = new Blob([res], { type: "application/vnd.ms-excel" });
        link.style.display = "none";
        link.href = URL.createObjectURL(blob);

        link.download = "数据分析.xlsx"; //下载的文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }).catch(err => {
        this.$Message.error('下载失败！');
        this.downLoading.splice(v.index,1,false);
      });
    },
  },
  mounted() {
    this.getDataList();
  },
};
</script>
<style scoped>
</style>