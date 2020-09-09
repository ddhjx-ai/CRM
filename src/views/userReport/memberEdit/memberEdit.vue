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
        total: 1100,
        rows: [
          {
            id: 6377984,
            cell: [
              "6377984",
              "31954",
              "279",
              "显示",
              "<a href='javascript:edit_keyWord(6377984)'>福建广电网络集团股份有限公司</a>",
            ],
          },
          {
            id: 2181248,
            cell: [
              "2181248",
              "200338202",
              "254",
              "显示",
              "<a href='javascript:edit_keyWord(2181248)'>合肥庐源电力工程有限公司</a>",
            ],
          },
          {
            id: 6998144,
            cell: [
              "6998144",
              "31954",
              "94",
              "显示",
              "<a href='javascript:edit_keyWord(6998144)'>秦皇岛福电实业集团有限公司</a>",
            ],
          },
          {
            id: 9049088,
            cell: [
              "9049088",
              "12859035",
              "80",
              "显示",
              "<a href='javascript:edit_keyWord(9049088)'>中通服咨询设计研究院有限公司</a>",
            ],
          },
          {
            id: 1200236740799975424,
            cell: [
              "1200236740799975424",
              "12705871",
              "66",
              "显示",
              "<a href='javascript:edit_keyWord(1200236740799975424)'>河北建投新能源有限公司</a>",
            ],
          },
          {
            id: 4220160,
            cell: [
              "4220160",
              "73042996",
              "66",
              "显示",
              "<a href='javascript:edit_keyWord(4220160)'>中科软科技股份有限公司</a>",
            ],
          },
          {
            id: 7934336,
            cell: [
              "7934336",
              "12737474",
              "57",
              "显示",
              "<a href='javascript:edit_keyWord(7934336)'>中国人民财产保险股份有限公司</a>",
            ],
          },
          {
            id: 3257728,
            cell: [
              "3257728",
              "15978229",
              "55",
              "显示",
              "<a href='javascript:edit_keyWord(3257728)'>长江存储科技有限责任公司</a>",
            ],
          },
          {
            id: 2077696,
            cell: [
              "2077696",
              "31954",
              "47",
              "显示",
              "<a href='javascript:edit_keyWord(2077696)'>承德昊源电力承装集团有限公司</a>",
            ],
          },
          {
            id: 5963264,
            cell: [
              "5963264",
              "2851567",
              "47",
              "显示",
              "<a href='javascript:edit_keyWord(5963264)'>安徽中科自动化股份有限公司</a>",
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
        item.cell[4] = item.cell[4].replace(
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