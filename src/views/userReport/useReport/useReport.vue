<style lang="less">
</style>
<template>
  <div class="search">
    <Card>
      <Row class="operation" style="margin-bottom:10px">
        <Button @click="handleCandidate" type="primary">第一候选人</Button>
        <Button @click="handleShield" type="primary">屏蔽</Button>
        <Button @click="getDataList" icon="md-refresh">刷新</Button>
      </Row>
      <Row>
        <Table
          :loading="loading"
          border
          :columns="columns"
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
import { postCrmRequest, removeCrm } from "@/libs/axios";
import { validatePrice } from "@/libs/validate";
import axios from "axios";
import qs from "qs";
export default {
  name: "useReport",
  data() {
    return {
      loading: true, // 表单加载状态
      searchForm: {
        // 搜索框对应data对象
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
      },
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
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
          width: 100,
        },
        {
          title: "用户id",
          key: "1",
        },
        {
          title: "第一候选人",
          key: "2",
        },
        {
          title: "显示",
          key: "3",
        },
        {
          title: "信息标题",
          key: "4",
          render: (h, params) => {
            return h(
              "a",
              {
                style: {
                  "text-decoration": "none",
                },
                attrs:  {
                  href: params.row.href,
                  target: '_blank'
                },
              },
              params.row[4]
            );
          },
        },
        {
          title: "发布时间",
          key: "5",
        },
      ],
      data: [], // 表单数据
      total: 0, // 表单数据总数
      dataList: {
        page: 1,
        total: 4662,
        rows: [
          {
            id: 11206,
            cell: [
              "11206",
              "15739267",
              "否",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgs/nC6uaM.html" target="_blank">嘉兴市公共资源交易中心关于嘉兴市公安局港区分局公安总机房搬迁项目的结果公告</a> ',
              "2019-03-13 00:00:00.0",
            ],
          },
          {
            id: 11205,
            cell: [
              "11205",
              "15739267",
              "否",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgs/nCZ7QR.html" target="_blank">嘉兴市公安局港区分局公安总机房搬迁中标结果公告</a> ',
              "2019-03-13 00:00:00.0",
            ],
          },
          {
            id: 11204,
            cell: [
              "11204",
              "15739267",
              "否",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgg/nne-s2.html" target="_blank">数据中心机房项目招标公告</a> ',
              "2019-06-24 00:00:00.0",
            ],
          },
          {
            id: 11203,
            cell: [
              "11203",
              "15739267",
              "否",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgs/nnOl3l.html" target="_blank">机房设备及运维项目的合同公示</a> ',
              "2019-11-26 00:00:00.0",
            ],
          },
          {
            id: 11202,
            cell: [
              "11202",
              "15739267",
              "否",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgs/nnB1Rd.html" target="_blank">浙江省市场监督管理局机房设备及运维项目中标公告</a> ',
              "2019-10-21 00:00:00.0",
            ],
          },
          {
            id: 11201,
            cell: [
              "11201",
              "15739267",
              "否",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgs/nnB1Oq.html" target="_blank">关于机房设备及运维项目的中标(成交)结果公告[浙江省成套工程有限公司]</a> ',
              "2019-10-21 00:00:00.0",
            ],
          },
          {
            id: 11200,
            cell: [
              "11200",
              "15739267",
              "否",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgs/nnJ27i.html" target="_blank">嘉兴恒创电力集团有限公司华创信息科技分公司2019年海盐桐乡自动化机房动环辅助设施维护中标结果公示</a> ',
              "2019-09-09 00:00:00.0",
            ],
          },
          {
            id: 11199,
            cell: [
              "11199",
              "15739267",
              "否",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgs/nnq86b.html" target="_blank">北航杭州创新研究院机房建设的成交结果公告</a> ',
              "2019-07-29 00:00:00.0",
            ],
          },
          {
            id: 11198,
            cell: [
              "11198",
              "15739267",
              "否",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgs/nCgj6t.html" target="_blank">宁德电视台数据中心机房项目中标公告</a> ',
              "2019-06-04 00:00:00.0",
            ],
          },
          {
            id: 11197,
            cell: [
              "11197",
              "15739267",
              "否",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgs/nnaXWR.html" target="_blank">江山市上余第二卫生服务中心弱电智能化工程开标结果公示</a> ',
              "2019-09-06 00:00:00.0",
            ],
          },
          {
            id: 11196,
            cell: [
              "11196",
              "15739267",
              "否",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgs/nnWgV0.html" target="_blank">杭州市万家花园业主委员会江干区闸弄口街道万家花园小区监控工程磋商项目竞争性磋商评标公示</a> ',
              "2019-08-19 00:00:00.0",
            ],
          },
        ],
      },
    };
  },
  // 表格动态列 计算属性
  computed: {},
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
        item.cell["href"] = item.cell[4].replace(
          /<a href="([\s\S]*)" [\s\S]*>[\s\S]*<\/a[\s\S]*>/g,
          "$1"
        );
        item.cell[4] = item.cell[4].replace(
          /<a[\s\S]*>([\s\S]*)<\/a[\s\S]*>/g,
          "$1"
        );

        console.log(item.cell["href"]);
        item = { ...item.cell, id: item.id };
        return item;
      });
      this.total = this.data.length;
      this.loading = false;
    },
    changeSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    // 第一候选人
    handleCandidate() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未选择数据");
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
    // 屏蔽
    handleShield() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未选择要屏蔽的数据");
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
  },
  mounted() {
    this.init();
    this.getListData();
  },
};
</script>