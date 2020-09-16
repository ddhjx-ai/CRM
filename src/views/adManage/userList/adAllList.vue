<template>
  <div>
    <Card>
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
  </div>
</template>

<script>
import { getCrmRequest, removeCrm } from "@/api/crm";
import axios from "axios";
import qs from "qs";
export default {
  name: "adAllList",
  data() {
    return {
      loading: false,
      data: [],
      searchForm: {
        // 搜索框对应data对象
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        sort: "createTime", // 默认排序字段
        order: "desc", // 默认排序方式
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
          key: "1",
          align: "center",
        },
        {
          title: "创建人",
          key: "2",
          align: "center",
        },
        {
          title: "总金额",
          key: "3",
          align: "center",
        },
        {
          title: "创建时间",
          key: "4",
          align: "center",
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
      dataList: {
        page: 1,
        total: 63,
        rows: [
          {
            id: 9412736,
            cell: [
              "<a href='/admin.ad.guanggaos/yzGglist' target='mainFrame'>9412736</a>",
              "<a href='javascript:edit_yz(9412736)'>圣维斯—3A</a> ",
              "测试人员 ",
              "13 ",
              "2020-06-15 16:04:26.0 ",
            ],
          },
          {
            id: 9111680,
            cell: [
              "<a href='/admin.ad.guanggaos/yzGglist' target='mainFrame'>9111680</a>",
              "<a href='javascript:edit_yz(9111680)'>招标信息页-3A-齐鑫</a> ",
              "测试人员 ",
              "1 ",
              "2019-11-29 13:14:27.0 ",
            ],
          },
          {
            id: 8916992,
            cell: [
              "<a href='/admin.ad.guanggaos/yzGglist' target='mainFrame'>8916992</a>",
              "<a href='javascript:edit_yz(8916992)'>招标信息页-3A-花泽</a> ",
              "测试人员 ",
              "1 ",
              "2019-12-17 14:34:37.0 ",
            ],
          },
          {
            id: 8566400,
            cell: [
              "<a href='/admin.ad.guanggaos/yzGglist' target='mainFrame'>8566400</a>",
              "<a href='javascript:edit_yz(8566400)'>3A-通利源</a> ",
              "测试人员 ",
              "13 ",
              "2020-06-09 10:22:26.0 ",
            ],
          },
          {
            id: 7768704,
            cell: [
              "<a href='/admin.ad.guanggaos/yzGglist' target='mainFrame'>7768704</a>",
              "<a href='javascript:edit_yz(7768704)'>3A—天环法兰</a> ",
              "测试人员 ",
              "13 ",
              "2020-06-15 16:13:13.0 ",
            ],
          },
          {
            id: 5306368,
            cell: [
              "<a href='/admin.ad.guanggaos/yzGglist' target='mainFrame'>5306368</a>",
              "<a href='javascript:edit_yz(5306368)'>3A—嵘拓新材料</a> ",
              "测试人员 ",
              "1 ",
              "2020-07-16 10:49:16.0 ",
            ],
          },
          {
            id: 4992768,
            cell: [
              "<a href='/admin.ad.guanggaos/yzGglist' target='mainFrame'>4992768</a>",
              "<a href='javascript:edit_yz(4992768)'>3A—恒明电力</a> ",
              "测试人员 ",
              "13 ",
              "2020-06-09 10:12:35.0 ",
            ],
          },
          {
            id: 3630208,
            cell: [
              "<a href='/admin.ad.guanggaos/yzGglist' target='mainFrame'>3630208</a>",
              "<a href='javascript:edit_yz(3630208)'>3A—河南高速</a> ",
              "测试人员 ",
              "3 ",
              "2020-07-03 14:53:31.0 ",
            ],
          },
          {
            id: 1947264,
            cell: [
              "<a href='/admin.ad.guanggaos/yzGglist' target='mainFrame'>1947264</a>",
              "<a href='javascript:edit_yz(1947264)'>招标信息页-3A-达明</a> ",
              "测试人员 ",
              "1 ",
              "2020-01-13 17:19:23.0 ",
            ],
          },
          {
            id: 1240,
            cell: [
              "<a href='/admin.ad.guanggaos/yzGglist' target='mainFrame'>1240</a>",
              "<a href='javascript:edit_yz(1240)'>招标信息页-3A-国能</a> ",
              "测试人员 ",
              "1 ",
              "2019-10-25 09:05:45.0 ",
            ],
          }
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
    getListData() {
      var query = this.$route.query.id;
      console.log(query);
      var params = qs.stringify({
        page: 1,
        rp: 10,
        sortname: "id",
        sortorder: "desc",
        query: query,
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
      getCrmRequest("/website.Channels/getList", params);
      // this.requestData('https://crm.chinabidding.cn/admin/website.Channels/getList', params)
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
    init() {
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
    changeSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
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
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>