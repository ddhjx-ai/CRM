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
          <Form-item label="快速查找" prop="query">
            <Input
              type="text"
              v-model="searchForm.query"
              style="width: 200px"
            />
          </Form-item>
          <FormItem prop="qtype" class="leftBtnForm" style="width: 100px">
            <Select v-model="searchForm.qtype" placeholder="请选择">
              <Option value="info_id">信息ID</Option>
              <Option value="title">标题</Option>
            </Select>
          </FormItem>
          <Form-item class="operation">
            <Button @click="handleSearch" type="primary" icon="ios-search"
              >查询</Button
            >
            <Button @click="handleReset">重置</Button>
          </Form-item>
        </Form>
      </Row>
      <Row class="operation" style="margin-bottom: 10px">
        <Button @click="handleUp" type="primary" icon="md-arrow-dropup"
          >上移</Button
        >
        <Button @click="handleDown" type="primary" icon="md-arrow-dropdown"
          >下移</Button
        >
        <Button @click="handleSelect" type="primary" icon="md-search"
          >选取</Button
        >
        <Button @click="handleDel" type="primary" icon="md-trash">删除</Button>
        <Button @click="handleRefresh" icon="md-refresh">刷新</Button>
      </Row>
      <Row>
        <Table
          class="mygrid"
          :loading="loading"
          border
          :columns="columns"
          :data="data"
          ref="table"
          sortable="custom"
          @on-selection-change="changeSelect"
        >
        </Table>
      </Row>
      <Row
        type="flex"
        justify="end"
        align="middle"
        class="page"
        style="margin-top: 10px"
      >
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
        <Button
          type="text"
          @click="getTotal"
          style="margin-left: 20px; color: #2d8cf0"
          >查看更多>></Button
        >
      </Row>
    </Card>

    <Modal
      title="添加信息"
      v-model="modalVisible"
      :mask-closable="false"
      :width="1000"
      @on-visible-change="modalClose"
    >
      <Form
        ref="form"
        :model="form"
        :label-width="50"
        :rules="formValidate"
        inline
      >
        <Row>
          <FormItem label="ID:" class="titleW" prop="id">
            <Input v-model="form.id" />
          </FormItem>
          <!-- <FormItem label="标题:" class="titleW" prop="title">
            <Input v-model="form.title" />
          </FormItem>
          <FormItem class="marginL" prop="info">
            <i-select
              v-model="form.info"
              style="width: 100px"
              placeholder="全部"
            >
              <i-option
                v-for="item in infoOptions"
                :key="item"
                :value="item.value"
                >{{ item.label }}</i-option
              >
            </i-select>
          </FormItem>
          <FormItem class="marginL" prop="address">
            <i-select
              v-model="form.address"
              style="width: 100px"
              placeholder="地区"
            >
              <i-option
                v-for="item in addOptions"
                :key="item"
                :value="item.value"
                >{{ item.label }}</i-option
              >
            </i-select>
          </FormItem>
          <FormItem class="marginL" prop="trade">
            <i-select
              v-model="form.trade"
              style="width: 100px"
              placeholder="行业"
            >
              <i-option
                v-for="item in tradeOptions"
                :key="item"
                :value="item.value"
                >{{ item.label }}</i-option
              >
            </i-select>
          </FormItem>
          <FormItem class="marginL" prop="time">
            <i-select
              v-model="form.time"
              style="width: 100px"
              placeholder="时间段"
            >
              <i-option value="one">近一天</i-option>
              <i-option value="two">近两天</i-option>
              <i-option value="three">近三天</i-option>
              <i-option value="seven">近一周</i-option>
            </i-select>
          </FormItem>
          <FormItem class="marginL" prop="status">
            <i-select
              v-model="form.status"
              style="width: 100px"
              placeholder="是否已发布"
            >
              <i-option value="1">已发布</i-option>
              <i-option value="2">未发布</i-option>
            </i-select>
          </FormItem> -->
          <FormItem class="marginL">
            <Button @click="getModalData">搜索</Button>
          </FormItem>
        </Row>
      </Form>
      <Row class="operation" style="margin-bottom: 10px">
        <Button @click="handlePull" type="primary" icon="md-add">推荐</Button>
      </Row>
      <Row>
        <Table
          class="mygrid"
          :loading="modalLoading"
          border
          :columns="modalColumns"
          :data="modalData"
          ref="modalTable"
          sortable="custom"
          @on-selection-change="modalChangeSelect"
        >
        </Table>
      </Row>
      <Row type="flex" justify="end" class="page" style="margin-top: 10px">
        <Page
          :current="form.page"
          :total="modalTotal"
          :page-size="form.size"
          @on-change="modalChangePage"
          @on-page-size-change="modalChangesize"
          :page-size-opts="[10, 20, 50]"
          size="small"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </Row>
    </Modal>
  </div>
</template>

<script>
import { getCrmRequest, removeCrm, postCrmRequest } from "@/api/crm";
import { validatePrice } from "@/libs/validate";
import qs from "qs";
export default {
  name: "guoxin",
  data() {
    return {
      tradeOptions: [
        {
          label: "交通运输",
          value: "1",
        },
        {
          label: "机械电子电器",
          value: "5",
        },
        {
          label: "能源化工",
          value: "7",
        },
        {
          label: "冶金矿产原材料",
          value: "10",
        },
        {
          label: "网络通讯计算机",
          value: "2",
        },
        {
          label: "市政房地产建筑",
          value: "3",
        },
        {
          label: "水利桥梁",
          value: "4",
        },
        {
          label: "环保",
          value: "6",
        },
        {
          label: "医疗卫生",
          value: "8",
        },
        {
          label: "科技文教旅游",
          value: "9",
        },
        {
          label: "出版印刷",
          value: "11",
        },
        {
          label: "轻工纺织食品",
          value: "12",
        },
        {
          label: "农林牧渔",
          value: "13",
        },
        {
          label: "商业服务",
          value: "14",
        },
        {
          label: "园林绿化",
          value: "16",
        },
        {
          label: "其它",
          value: "15",
        },
      ],
      addOptions: [
        {
          label: "北京",
          value: "1",
        },
        {
          label: "上海",
          value: "2",
        },
        {
          label: "天津",
          value: "3",
        },
        {
          label: "重庆",
          value: "4",
        },
        {
          label: "河北",
          value: "5",
        },
        {
          label: "山西",
          value: "6",
        },
        {
          label: "内蒙古",
          value: "7",
        },
        {
          label: "辽宁",
          value: "8",
        },
        {
          label: "吉林",
          value: "9",
        },
        {
          label: "黑龙江",
          value: "10",
        },
        {
          label: "江苏",
          value: "11",
        },
        {
          label: "浙江",
          value: "12",
        },
        {
          label: "安徽",
          value: "13",
        },
        {
          label: "福建",
          value: "14",
        },
        {
          label: "江西",
          value: "15",
        },
        {
          label: "山东",
          value: "16",
        },
        {
          label: "河南",
          value: "17",
        },
        {
          label: "湖北",
          value: "18",
        },
        {
          label: "湖南",
          value: "19",
        },
        {
          label: "广东",
          value: "20",
        },
        {
          label: "广西",
          value: "21",
        },
        {
          label: "海南",
          value: "22",
        },
        {
          label: "贵州",
          value: "23",
        },
        {
          label: "云南",
          value: "24",
        },
        {
          label: "西藏",
          value: "25",
        },
        {
          label: "陕西",
          value: "26",
        },
        {
          label: "四川",
          value: "27",
        },
        {
          label: "甘肃",
          value: "28",
        },
        {
          label: "青海",
          value: "29",
        },
        {
          label: "新疆",
          value: "30",
        },
        {
          label: "宁夏",
          value: "31",
        },
        {
          label: "香港",
          value: "32",
        },
        {
          label: "澳门",
          value: "33",
        },
        {
          label: "台湾",
          value: "34",
        },
        {
          label: "跨省",
          value: "36",
        },
        {
          label: "亚洲",
          value: "43",
        },
        {
          label: "欧洲",
          value: "44",
        },
        {
          label: "非洲",
          value: "45",
        },
        {
          label: "北美洲",
          value: "46",
        },
        {
          label: "南美洲",
          value: "47",
        },
        {
          label: "大洋洲",
          value: "48",
        },
        {
          label: "中美洲",
          value: "49",
        },
        {
          label: "加勒比",
          value: "50",
        },
      ],
      infoOptions: [
        {
          label: "招标信息",
          value: "ZBXX",
        },
        {
          label: "招标预告",
          value: "ZBYG",
        },
        {
          label: "工程招标",
          value: "gczb",
        },
        {
          label: "货物招标",
          value: "hwzb",
        },
        {
          label: "服务招标",
          value: "fwzb",
        },
        {
          label: "中标公示",
          value: "ZBGS",
        },
        {
          label: "采购信息",
          value: "CGXX",
        },
        {
          label: "政府采购",
          value: "ZFCG",
        },
        {
          label: "企业采购",
          value: "QYCG",
        },
        {
          label: "招标动态",
          value: "ZBDT",
        },
        {
          label: "VIP项目",
          value: "VIPXM",
        },
        {
          label: "招商项目",
          value: "ZSXM",
        },
        {
          label: "项目动态",
          value: "XMDT",
        },
        {
          label: "项目跟踪",
          value: "XMGZ",
        },
        {
          label: "拟在建",
          value: "NZJXM",
        },
        {
          label: "备案核准",
          value: "BAHZ",
        },
        {
          label: "政策法规",
          value: "FLFG",
        },
        {
          label: "标书下载",
          value: "BSXZ",
        },
        {
          label: "资讯中心",
          value: "ZXZX",
        },
        {
          label: "代理机构",
          value: "DLJG",
        },
        {
          label: "新华信托",
          value: "XHXT",
        },
        {
          label: "新华信托产品",
          value: "XHProduct",
        },
        {
          label: "新华信托答疑",
          value: "XHQA",
        },
      ],
      modalVisible: false,
      form: {
        page: 1, // 当前页数
        size: 10, // 页面大小
        id: "",
      },
      loading: true, // 表单加载状态
      searchForm: {
        // 搜索框对应data对象
        page: 1, // 当前页数
        size: 10, // 页面大小
        qtype: "info_id",
        query: "",
      },
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      modalSelectList: [], // 多选数据
      modalSelectCount: 0, // 多选计数
      columns: [
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
          title: "标题",
          key: "title",
          minWidth: 300,
          align: "center",
          render: (h, params) => {
            return h(
              "a",
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
              params.row.title
            );
          },
        },
        {
          title: "发布时间",
          width: 180,
          key: "publish_date",
          align: "center",
        },
      ],
      modalColumns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "id",
          key: "id",
          width: 120,
          align: "center",
        },
        {
          title: "标题",
          key: "title",
          minWidth: 300,
          align: "center",
          render: (h, params) => {
            return h(
              "a",
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
              params.row.title
            );
          },
        },
        {
          title: "信息类型",
          key: "infoType",
          align: "center",
          width: 100,
        },
        {
          title: "信息状态",
          key: "status",
          align: "center",
          width: 100,
        },
        {
          title: "发布时间",
          key: "publish_date",
          align: "center",
          width: 180,
        },
      ],
      data: [], // 表单数据
      total: 200, // 表单数据总数
      modalData: [],
      modalTotal: 1000,
      modalLoading: false,
      isSearch: false,
    };
  },
  // 表格动态列 计算属性
  computed: {},
  methods: {
    init() {
      this.getDataList();
    },
    changePage(v) {
      this.searchForm.page = v;
      this.clearSelectAll();
      if (this.isSearch) {
        let data = {
          blocksId: 288,
          ztid: 0,
          ...this.searchForm,
        };
        this.getSearchList(data);
      } else {
        this.getDataList();
      }
    },
    changesize(v) {
      this.searchForm.size = v;
      if (this.isSearch) {
        let data = {
          blocksId: 288,
          ztid: 0,
          ...this.searchForm,
        };
        this.getSearchList(data);
      } else {
        this.getDataList();
      }
    },
    changeSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    // 信息列表
    getDataList() {
      this.isSearch = false;
      this.loading = true;
      // 请求后端获取表单数据 请自行修改接口
      let params = {
        blocksId: 288,
        ztid: 0,
        page: this.searchForm.page,
        size: this.searchForm.size,
        qtype: "",
        query: "",
      };
      postCrmRequest("/infotj/gx/show_infos", qs.stringify(params)).then(
        (res) => {
          this.loading = false;
          if (res.success) {
            this.data = res.result;
            this.clearSelectAll();
          }
        }
      );
    },
    // 重置
    handleReset() {
      this.$refs.searchForm.resetFields();
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      this.isSearch = false;
      this.getDataList();
    },
    // 查询
    handleSearch() {
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      if (this.searchForm.query.trim() === "") {
        this.isSearch = false;
        this.getDataList();
      } else {
        this.isSearch = true;
        let data = {
          blocksId: 288,
          ztid: 0,
          ...this.searchForm,
        };
        this.getSearchList(data);
      }
    },
    // 刷新
    handleRefresh() {
      if (this.isSearch) {
        let data = {
          blocksId: 288,
          ztid: 0,
          ...this.searchForm,
        };
        this.getSearchList(data);
      } else {
        this.getDataList();
      }
    },
    getSearchList(data) {
      this.loading = true;
      postCrmRequest("/infotj/gx/show_infos", qs.stringify(data)).then(
        (res) => {
          this.loading = false;
          if (res.success) {
            this.data = res.result;
            this.clearSelectAll();
          }
        }
      );
    },
    // 选取列表
    getModalData() {
      this.modalLoading = true;
      getCrmRequest("/infotj/gx/search_list", this.form).then((res) => {
        this.modalLoading = false;
        if (res.success) {
          this.modalData = res.result;
          this.clearModalSelectAll();
        }
      });
    },
    // 获取总条数
    getTotal() {
      let params = {
        blocksId: 288,
        ztid: 0,
      };
      getCrmRequest("/infotj/gx/more", params).then((res) => {
        if (res.success) {
          this.total = res.result;
        }
      });
    },
    clearModalSelectAll() {
      this.$refs.modalTable.selectAll(false);
    },
    modalChangePage(v) {
      this.form.page = v;
      this.getModalData();
      this.clearModalSelectAll();
    },
    modalChangeSelect(e) {
      this.modalSelectList = e;
      this.modalSelectCount = e.length;
    },
    modalChangesize(v) {
      this.form.size = v;
      this.getModalData();
    },
    modalClose(v) {
      if (!v) {
        this.form.size = 10;
        this.form.page = 1;
        this.form.id = "";
      }
    },
    // 标题跳转
    titleToHerf(v) {
      window.open(v.url);
    },
    // 删除
    handleDel() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未选择要删除的数据");
        return;
      }
      let ids = this.selectList.map((item) => {
        return item.id;
      });
      let params = {
        blocksId: 288,
        zhuantiId: 0,
        ids: ids,
      };
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除所选的 " + this.selectCount + " 条数据?",
        loading: true,
        onOk: () => {
          // 批量删除
          postCrmRequest(
            "/infotj/gx/delete",
            qs.stringify(params, { arrayFormat: "repeat" })
          ).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              this.clearSelectAll();
              if (this.isSearch) {
                let data = {
                  blocksId: 288,
                  ztid: 0,
                  ...this.searchForm,
                };
                this.getSearchList(data);
              } else {
                this.getDataList();
              }
            }
          });
        },
      });
    },
    // 选取
    handleSelect() {
      this.modalVisible = true;
      this.modalSelectCount = 0;
      this.modalSelectList = [];
      this.$refs.form.resetFields();
      this.getModalData();
    },
    // 推荐
    handlePull() {
      if (this.modalSelectCount <= 0) {
        this.$Message.warning("您还未选择要推荐的数据");
        return;
      }
      let ids = this.modalSelectList.map((item) => {
        return item.id;
      });
      let params = {
        blocksId: 288,
        zhuantiId: 0,
        ids: ids,
      };
      this.$Modal.confirm({
        title: "确认",
        content: "您确认要推荐当前数据？",
        loading: true,
        onOk: () => {
          postCrmRequest(
            "/infotj/gx/recommand",
            qs.stringify(params, { arrayFormat: "repeat" })
          ).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success(res.result);
            } else {
              this.$Message.error(res.result);
            }
            this.getModalData();
          });
        },
        onCancel: () => {
          this.clearModalSelectAll();
        },
      });
    },
    // 上移
    handleUp() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未选择要推荐的数据");
        return;
      }
      if (this.selectCount > 1) {
        this.$Message.warning("请选择一条数据");
        return;
      }
      let params = {
        blocksId: 288,
        infosId: this.selectList[0].id,
        ztid: 0,
      };
      this.$Modal.confirm({
        title: "确认",
        content: "您确认要上移当前数据？",
        loading: true,
        onOk: () => {
          postCrmRequest("/infotj/gx/up", qs.stringify(params)).then((res) => {
            this.$Modal.remove();
            this.$Message.success(res);
            if (this.isSearch) {
              let data = {
                blocksId: 288,
                ztid: 0,
                ...this.searchForm,
              };
              this.getSearchList(data);
            } else {
              this.getDataList();
            }
          });
        },
        onCancel: () => {
          this.clearSelectAll();
        },
      });
    },
    // 下移
    handleDown() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未选择要推荐的数据");
        return;
      }
      if (this.selectCount > 1) {
        this.$Message.warning("请选择一条数据");
        return;
      }
      let params = {
        blocksId: 288,
        infosId: this.selectList[0].id,
        ztid: 0,
      };
      this.$Modal.confirm({
        title: "确认",
        content: "您确认要下移当前数据？",
        loading: true,
        onOk: () => {
          postCrmRequest("/infotj/gx/down", qs.stringify(params)).then(
            (res) => {
              this.$Modal.remove();
              this.$Message.success(res);
              if (this.isSearch) {
                let data = {
                  blocksId: 288,
                  ztid: 0,
                  ...this.searchForm,
                };
                this.getSearchList(data);
              } else {
                this.getDataList();
              }
            }
          );
        },
        onCancel: () => {
          this.clearSelectAll();
        },
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
.leftBtnForm /deep/ div.ivu-form-item-content {
  margin-left: 0px !important;
}
/deep/ .ivu-page-item-jump-next:after,
.ivu-page-item-jump-prev:after {
  content: "\2022\2022\2022" !important;
}
</style>