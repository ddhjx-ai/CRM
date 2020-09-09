<style lang="less">
</style>
<template>
  <div class="search">
    <Card>
      <Row class="operation" style="margin-bottom: 10px">
        <Button @click="handleShow" type="primary">显示</Button>
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
    <Modal title="编辑" v-model="editVisible" :mask-closable="false" :width="500">
      <Form ref="editForm" :model="editForm" :label-width="100" :rules="formValidate">
        <FormItem label="keyword：" prop="keyword">
          <Input v-model="editForm.keyword" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="editVisible = false">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="editSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { postCrmRequest, removeCrm } from "@/libs/axios";
import { validatePrice } from "@/libs/validate";
import axios from "axios";
import qs from "qs";
export default {
  name: "memberEdit",
  data() {
    return {
      editVisible: false,
      editForm: {
        keyword: ''
      },
      submitLoading: false,
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
          title: "搜索次数",
          key: "2",
        },
        {
          title: "是否显示",
          key: "3",
        },
        {
          title: "关键词",
          key: "4",
        },

        {
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
              /* h(
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
              ), */
            ]);
          },
        },
      ],
      data: [], // 表单数据
      total: 0, // 表单数据总数
      dataList: {
        page: 1,
        total: 15377,
        rows: [
          {
            id: 19429,
            cell: [
              "19429",
              "14745251",
              "56",
              '<span style="color:red">不显示</span>',
              "<a href='javascript:edit_keyWord(19429)'>中移建设有限公司吉林分公司2018-2019</a>",
            ],
          },
          {
            id: 22162,
            cell: [
              "22162",
              "4754988",
              "35",
              '<span style="color:red">不显示</span>',
              "<a href='javascript:edit_keyWord(22162)'>云南电网有限责任公司昆明供电局2019-2021年非生产区域</a>",
            ],
          },
          {
            id: 20343,
            cell: [
              "20343",
              "15835144",
              "30",
              '<span style="color:red">不显示</span>',
              "<a href='javascript:edit_keyWord(20343)'>宜昌市交通投资有限公司</a>",
            ],
          },
          {
            id: 18041,
            cell: [
              "18041",
              "14440797",
              "26",
              '<span style="color:red">不显示</span>',
              "<a href='javascript:edit_keyWord(18041)'>中国电信武汉分公司2018-2020年市政配合管线迁改维护</a>",
            ],
          },
          {
            id: 19898,
            cell: [
              "19898",
              "15556163",
              "25",
              '<span style="color:red">不显示</span>',
              "<a href='javascript:edit_keyWord(19898)'>内蒙古电力（集团）有限责任公司2018年配网工程第一批设备材料采购</a>",
            ],
          },
          {
            id: 22095,
            cell: [
              "22095",
              "4754988",
              "17",
              '<span style="color:red">不显示</span>',
              "<a href='javascript:edit_keyWord(22095)'>交通银行股份有限公司云南省分行</a>",
            ],
          },
          {
            id: 19891,
            cell: [
              "19891",
              "15556163",
              "16",
              '<span style="color:red">不显示</span>',
              "<a href='javascript:edit_keyWord(19891)'>国网山西省电力公司2018年第二次物资集中规模招标采</a>",
            ],
          },
          {
            id: 19922,
            cell: [
              "19922",
              "15556163",
              "14",
              '<span style="color:red">不显示</span>',
              "<a href='javascript:edit_keyWord(19922)'>浙江华云清洁能源有限公司华云能源2018年舟山项目物资类采购</a>",
            ],
          },
          {
            id: 17754,
            cell: [
              "17754",
              "15917750",
              "14",
              '<span style="color:red">不显示</span>',
              "<a href='javascript:edit_keyWord(17754)'>2018-2019年度绍兴建元电力集团有限公司及下属公司合格供应商资格预审公告</a>",
            ],
          },
          {
            id: 21370,
            cell: [
              "21370",
              "14243113",
              "13",
              '<span style="color:red">不显示</span>',
              "<a href='javascript:edit_keyWord(21370)'>   国网新源控股有限公司2018年第二批</a>",
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
        item.cell[3] = item.cell[3].replace(
          /<[\s\S]*>([\s\S]*)<\/[\s\S]*>/g,
          "$1"
        );
        item.cell[4] = item.cell[4].replace(
          /<a[\s\S]*>([\s\S]*)<\/[\s\S]*>/g,
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
    // 显示
    handleShow() {
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
    // 编辑
    editSubmit() {

    },
    // 获取商品详情
    edit(v) {
      this.$refs.editForm.resetFields();
      this.editVisible = true
      this.editForm.keyword = v['4']
      console.log(v)
    },
  },
  mounted() {
    this.init();
    this.getListData();
  },
};
</script>