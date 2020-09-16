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
import { getCrmRequest, removeCrm } from "@/api/crm";
import { validatePrice } from "@/libs/validate";
import axios from "axios";
import qs from "qs";
export default {
  name: "involvement",
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
          minWidth: 120,
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
          minWidth: 150,
          render: (h, params) => {
            return h(
              "a",
              {
                style: {
                  "text-decoration": "none",
                },
                attrs: {
                  href: params.row.href,
                  target: "_blank",
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
        total: 169947,
        rows: [
          {
            id: 1200236740695117824,
            cell: [
              "1200236740695117824",
              "12705871",
              "否",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgs/nC64oc.html" target="_blank">鲁能集团、都城伟业集团有限公司2019年第3批集中采购物资类招标采购中标候选人公示</a> ',
              "2019-03-20 00:00:00.0",
            ],
          },
          {
            id: 1200236740690923520,
            cell: [
              "1200236740690923520",
              "12705871",
              "是",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgs/nn-wEM.html" target="_blank">华润新能源鄄城风电场100MW一期工程项目风机塔筒设备采购中标候选人公示</a> ',
              "2019-09-20 00:00:00.0",
            ],
          },
          {
            id: 1200236740682534912,
            cell: [
              "1200236740682534912",
              "12705871",
              "是",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgs/nn2yzE.html" target="_blank">华润宜城板桥二期50MW风电场项目风机塔筒采购中标候选人公示</a> ',
              "2019-09-12 00:00:00.0",
            ],
          },
          {
            id: 1200236740674146304,
            cell: [
              "1200236740674146304",
              "12705871",
              "否",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgs/nnlu19.html" target="_blank">大唐哈巴河清洁能源有限公司2019-WZ08-13华创备品备件物资询价采购询价结果公告</a> ',
              "2019-10-09 00:00:00.0",
            ],
          },
          {
            id: 1200236740665757696,
            cell: [
              "1200236740665757696",
              "12705871",
              "是",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgs/nnlDpm.html" target="_blank">﻿大唐哈巴河清洁能源有限公司2019-WZ08-13华创备品备件物资询价编号：P-XJ-19-00092260中标公示</a> ',
              "2019-10-09 00:00:00.0",
            ],
          },
          {
            id: 1200236740661563392,
            cell: [
              "1200236740661563392",
              "12705871",
              "否",
              "显示",
              '<a href="https://www.chinabidding.cn/xmxx/nCP5jj.html" target="_blank">总投资10000万元风电场项目</a> ',
              "2019-03-28 00:00:00.0",
            ],
          },
          {
            id: 1200236740653174784,
            cell: [
              "1200236740653174784",
              "12705871",
              "否",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgs/nn1NaT.html" target="_blank">华润电力漯河郾城区30MW分散式风电项目塔筒设备采购中标候选人公示</a> ',
              "2019-07-13 00:00:00.0",
            ],
          },
          {
            id: 1200236740644786176,
            cell: [
              "1200236740644786176",
              "12705871",
              "否",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgs/nnspIs.html" target="_blank">华润电力中西大区风电项目睢阳区20MW、太康30MW、内黄县润电20MW分散式风电项目电缆采购中标候选人公示</a> ',
              "2019-09-30 00:00:00.0",
            ],
          },
          {
            id: 1200236740636397568,
            cell: [
              "1200236740636397568",
              "12705871",
              "否",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgs/nnPeEP.html" target="_blank">华润电力沙洋马良一期50MW风电场、枣阳太平风电场二期10MW风电场工程项目风机塔筒采购中标候选人公示</a> ',
              "2019-11-28 00:00:00.0",
            ],
          },
          {
            id: 1200236740632203264,
            cell: [
              "1200236740632203264",
              "12705871",
              "否",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgs/nnCU8O.html" target="_blank">阜新巨龙湖风力发电有限公司-彰东风电场66台金风风机变桨系统升级改造(2次挂网)结果公告</a> ',
              "2019-06-12 00:00:00.0",
            ],
          },
          {
            id: 1200236740623814656,
            cell: [
              "1200236740623814656",
              "12705871",
              "否",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgs/nntpaC.html" target="_blank">华润电力郾城区30MW分散式风电项目电缆采购中标候选人公示</a> ',
              "2019-08-14 00:00:00.0",
            ],
          },
          {
            id: 1200236740615426048,
            cell: [
              "1200236740615426048",
              "12705871",
              "否",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgs/nCSSkH.html" target="_blank">海原呱呱山风电项目风电机组塔筒采购Ⅳ标段中标候选人公示</a> ',
              "2019-04-13 00:00:00.0",
            ],
          },
          {
            id: 1200236740607037440,
            cell: [
              "1200236740607037440",
              "12705871",
              "否",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgs/nnOg6c.html" target="_blank">华润电力承德围场元宝山300MW风电项目塔筒设备采购I标段中标候选人公示</a> ',
              "2019-11-28 00:00:00.0",
            ],
          },
          {
            id: 1200236740598648832,
            cell: [
              "1200236740598648832",
              "12705871",
              "否",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgs/nnckgj.html" target="_blank">华润五寨韩家楼50MW风电项目35kV及1kV电力电缆采购中标候选人公示</a> ',
              "2019-10-17 00:00:00.0",
            ],
          },
          {
            id: 1200236740594454528,
            cell: [
              "1200236740594454528",
              "12705871",
              "是",
              "显示",
              '<a href="https://www.chinabidding.cn/zbgg/nncwKd.html" target="_blank">荣成风电场四期10号与五期27号风机基础环加固工程采购(国华（荣成）新能源有限公司)</a> ',
              "2019-10-17 00:00:00.0",
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
      getCrmRequest("/website.Channels/getList", params);
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