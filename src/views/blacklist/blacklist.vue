<template>
  <div class="search">
    <Card>
      <Row class="operation" style="margin-bottom:10px">
        <Button @click="handleAdd" type="primary" icon="md-add">添加</Button>
        <!-- <Button @click="handleEdit" type="primary" icon="ios-create-outline">修改</Button> -->
        <Button @click="handleDay" type="primary">+每天</Button>
        <Button @click="handleWeek" type="primary">+每周</Button>
        <Button @click="handleMonth" type="primary">+每月</Button>
        <Button @click="getDataList" icon="md-refresh">刷新</Button>
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

    <Modal :title="modalTitle" v-model="modalVisible" :mask-closable="false" :width="500">
      <Form ref="form" :model="form" :label-width="80" :rules="formValidate">
        <FormItem label="账号ID:" prop="id">
          <Input v-model="form.id" />
        </FormItem>
        <FormItem label="daily:" prop="daily">
          <Input v-model="form.daily" />
        </FormItem>
        <FormItem label="weekly:" prop="weekly">
          <Input v-model="form.weekly" />
        </FormItem>
        <FormItem label="monthly:" prop="monthly">
          <Input v-model="form.monthly" />
        </FormItem>
        <FormItem label="delayTime:" prop="delayTime">
          <Input v-model="form.delayTime" />
        </FormItem>
        <FormItem label="ipNotAllow:" prop="ipNotAllow">
          <Input v-model="form.ipNotAllow" />
        </FormItem>
        <FormItem label="ipAllow:" prop="ipAllow">
          <Input v-model="form.ipAllow" />
        </FormItem>
        <FormItem label="ipCount:" prop="ipCount">
          <Input v-model="form.ipCount" />
        </FormItem>
        <FormItem label="isHunXiao:" prop="isHunXiao">
          <Input v-model="form.isHunXiao" />
        </FormItem>
        <FormItem label="isPic:" prop="isPic">
          <!-- <Input v-model="form.isPic" /> -->
          <Checkbox v-model="form.isPic"></Checkbox>
        </FormItem>
        <FormItem label="allowCopy:" prop="allowCopy">
          <!-- <Input v-model="form.allowCopy" /> -->
          <Checkbox v-model="form.allowCopy"></Checkbox>
        </FormItem>
        <div slot="footer">
          <Button type="text" @click="handleCancel">取消</Button>
          <Button type="primary" :loading="submitLoading" @click="handleSubmit">提交</Button>
        </div>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { getCrmRequest, removeCrm } from "@/api/crm";
import { validateNum, validateIP } from "@/libs/validate";
import qs from "qs";
export default {
  name: "blacklist",
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
        id: "",
        daily: "",
        weekly: "",
        monthly: "",
        delayTime: "",
        ipNotAllow: "",
        ipAllow: "",
        ipCount: "",
        isHunXiao: "",
        isPic: false,
        allowCopy: false,
      },
      formValidate: {
        daily: { validator: validateNum, trigger: "blur" },
        weekly: { validator: validateNum, trigger: "blur" },
        monthly: { validator: validateNum, trigger: "blur" },
        delayTime: { validator: validateNum, trigger: "blur" },
        ipNotAllow: { validator: validateIP, trigger: "blur" },
        ipAllow: { validator: validateIP, trigger: "blur" },
      },
      loading: true, // 表单加载状态
      searchForm: {
        // 搜索框对应data对象
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
      },
      modalType: 0, // 添加或编辑标识
      modalVisible: false, // 添加或编辑显示
      modalTitle: '',
      submitLoading: false,
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "登录名",
          key: "2",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            return h(
              "a",
              {
                style: {
                  "text-decoration": "none",
                },
                attrs: {},
                on: {
                  click: () => {
                    this.handleId(params.row);
                  },
                },
              },
              params.row[2]
            );
          },
        },
        {
          title: "公司名",
          key: "3",
          minWidth: 120,
          align: "center",
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
              params.row[3]
            );
          },
        },
        {
          title: "每天浏览信息",
          key: "4",
          align: "center",
        },
        {
          title: "每周浏览信息",
          key: "5",
          align: "center",
        },
        {
          title: "每月浏览信息",
          key: "6",
          align: "center",
        },
        {
          title: "延时",
          key: "7",
          align: "center",
        },
        {
          title: "禁止IP",
          key: "8",
          align: "center",
        },
        {
          title: "允许IP",
          key: "9",
          align: "center",
        },
        {
          title: "混淆信息",
          key: "10",
          align: "center",
        },
        {
          title: "转换图片",
          key: "11",
          align: "center",
        },
        {
          title: "允许复制",
          key: "12",
          align: "center",
        },
        {
          title: "加入时间",
          key: "13",
          align: "center",
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
                      this.handleEdit(params.row);
                    },
                  },
                },
                "编辑"
              ),
            ]);
          },
        },
      ],

      data: [], // 表单数据
      total: 0, // 表单数据总数
      dataList: {
        page: 1,
        total: 500,
        rows: [
          {
            id: 300005674,
            cell: [
              "300005674",
              "200333411 ",
              "<a href='javascript:show_lishi(200333411)'>15921795260</a>",
              "<a href=/Workbench.Cust/serve?id=200333411 target=_blank>[cn]魁博信息科技（上海）有限公司</a>",
              "200 ",
              "3000 ",
              "7000",
              "0.0 ",
              " ",
              "*.*.*.*",
              "1 ",
              "否",
              "是",
              "2020-08-13 13:30:23.0",
            ],
          },
          {
            id: 300005673,
            cell: [
              "300005673",
              "80992234 ",
              "<a href='javascript:show_lishi(80992234)'>ouguanvalve</a>",
              "<a href=/Workbench.Cust/serve?id=80992234 target=_blank>欧冠阀门科技有限公司</a>",
              "200 ",
              "3000 ",
              "7000",
              "0.0 ",
              " ",
              "*.*.*.*",
              "1 ",
              "否",
              "是",
              "2020-08-13 11:31:28.0",
            ],
          },
          {
            id: 300005672,
            cell: [
              "300005672",
              "14216296 ",
              "<a href='javascript:show_lishi(14216296)'>duvit</a>",
              "<a href=/Workbench.Cust/serve?id=14216296 target=_blank>邝利锋</a>",
              "200 ",
              "3000 ",
              "7000",
              "0.0 ",
              " ",
              "*.*.*.*",
              "1 ",
              "否",
              "是",
              "2020-08-13 11:13:18.0",
            ],
          },
          {
            id: 300005671,
            cell: [
              "300005671",
              "12784250 ",
              "<a href='javascript:show_lishi(12784250)'>bjyd2016</a>",
              "<a href=/Workbench.Cust/serve?id=12784250 target=_blank>益都智能技术（北京）股份有限公司</a>",
              "200 ",
              "3000 ",
              "7000",
              "0.0 ",
              " ",
              "*.*.*.*",
              "1 ",
              "否",
              "是",
              "2020-08-12 13:15:59.0",
            ],
          },
          {
            id: 300005670,
            cell: [
              "300005670",
              "300120136 ",
              "<a href='javascript:show_lishi(300120136)'>spq888</a>",
              "<a href=/Workbench.Cust/serve?id=300120136 target=_blank>深圳市商票圈科技有限公司</a>",
              "500 ",
              "3000 ",
              "7000",
              "0.0 ",
              " ",
              "*.*.*.*",
              "1 ",
              "否",
              "是",
              "2020-08-07 17:09:53.0",
            ],
          },
          {
            id: 300005669,
            cell: [
              "300005669",
              "82906316 ",
              "<a href='javascript:show_lishi(82906316)'>renwn1993</a>",
              "<a href=/Workbench.Cust/serve?id=82906316 target=_blank>[cn]采购与招标网</a>",
              "4 ",
              "500 ",
              "1000",
              "0.0 ",
              " ",
              "*.*.*.*",
              "1 ",
              "否",
              "是",
              "2020-08-07 15:30:19.0",
            ],
          },
          {
            id: 300005668,
            cell: [
              "300005668",
              "300025159 ",
              "<a href='javascript:show_lishi(300025159)'>shangtianwo</a>",
              "<a href=/Workbench.Cust/serve?id=300025159 target=_blank>山东上田沃土地规划设计服务有限公司</a>",
              "200 ",
              "3000 ",
              "7000",
              "0.0 ",
              " ",
              "*.*.*.*",
              "1 ",
              "否",
              "是",
              "2020-08-06 21:12:00.0",
            ],
          },
          {
            id: 300005667,
            cell: [
              "300005667",
              "300117814 ",
              "<a href='javascript:show_lishi(300117814)'>nmghl2020</a>",
              "<a href=/Workbench.Cust/serve?id=300117814 target=_blank>内蒙古和利工程项目管理有限公司</a>",
              "200 ",
              "3000 ",
              "7000",
              "0.0 ",
              " ",
              "*.*.*.*",
              "1 ",
              "否",
              "是",
              "2020-08-05 18:06:25.0",
            ],
          },
          {
            id: 300005666,
            cell: [
              "300005666",
              "77120651 ",
              "<a href='javascript:show_lishi(77120651)'>shlujia2017</a>",
              "<a href=/Workbench.Cust/serve?id=77120651 target=_blank>上海录佳实业有限公司</a>",
              "200 ",
              "3000 ",
              "7000",
              "0.0 ",
              " ",
              "*.*.*.*",
              "1 ",
              "否",
              "是",
              "2020-08-03 16:31:12.0",
            ],
          },
          {
            id: 300005665,
            cell: [
              "300005665",
              "200185782 ",
              "<a href='javascript:show_lishi(200185782)'>jsshengshi</a>",
              "<a href=/Workbench.Cust/serve?id=200185782 target=_blank>[comcn]江苏圣世铁路设备有限公司</a>",
              "200 ",
              "3000 ",
              "7000",
              "0.0 ",
              " ",
              "*.*.*.*",
              "1 ",
              "否",
              "是",
              "2020-07-31 12:41:00.0",
            ],
          },
        ],
      },
    };
  },
  // 表格动态列 计算属性
  computed: {},
  methods: {
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
      getCrmRequest("/chinabidding.BlackLists/getList", params);
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
        item.cell[2] = item.cell[2].replace(
          /<a[\s\S]*>([\s\S]*)<\/a[\s\S]*>/g,
          "$1"
        );
        item.cell["href"] = item.cell[3].replace(
          /<a href=([\s\S]*) [\s\S]*>[\s\S]*<\/a[\s\S]*>/g,
          "$1"
        );
        item.cell[3] = item.cell[3].replace(
          /<a[\s\S]*>([\s\S]*)<\/a[\s\S]*>/g,
          "$1"
        );
        item.cell["href"] =
          "https://crm.chinabidding.cn/" +
          item.cell["href"].slice(1, item.cell["href"].length - 2);
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
    // 编辑
    handleEdit(v) {
      this.modalType = 1;
      this.modalTitle = "编辑";
      this.$refs.form.resetFields();
      // 转换null为""
      for (let attr in v) {
        if (v[attr] == null) {
          v[attr] = "";
        }
      }
      let str = JSON.stringify(v);
      let data = JSON.parse(str);
      this.form = data;
      this.modalVisible = true;
    },
    // 添加
    handleAdd() {
      this.modalType = 0;
      this.modalTitle = "添加";
      this.$refs.form.resetFields();
      delete this.form.id;
      this.modalVisible = true;
    },
    // 提交编辑/添加
    handleSubmit() {
      console.log(this.form);
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          if (this.modalType == 0) {
            // 添加 避免编辑后传入id等数据 记得删除
            delete this.form.id;
            // this.postRequest("请求地址", this.form).then(res => {
            //   this.submitLoading = false;
            //   if (res.success) {
            //     this.$Message.success("操作成功");
            //     this.getDataList();
            //     this.modalVisible = false;
            //   }
            // });
            // 模拟请求成功
            this.submitLoading = false;
            this.$Message.success("操作成功");
            this.getDataList();
            this.modalVisible = false;
          } else {
            // 编辑
            // this.postRequest("请求地址", this.form).then(res => {
            //   this.submitLoading = false;
            //   if (res.success) {
            //     this.$Message.success("操作成功");
            //     this.getDataList();
            //     this.modalVisible = false;
            //   }
            // });
            // 模拟请求成功
            this.submitLoading = false;
            this.$Message.success("操作成功");
            this.getDataList();
            this.modalVisible = false;
          }
        }
      });
    },
    // 删除
    handleDel() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未选择要删除的数据");
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
    // 选取
    handleSelect() {
      this.modalVisible = true;
      this.modalSelectCount = 0;
      this.modalSelectList = [];
      this.$refs.form.resetFields();
      this.getModalData();
    },
    handleId() {},
    // 每天
    handleDay() {
      if (this.selectCount !== 1) {
        this.$Message.warning("请先选择一条要处理的数据");
        return;
      }
    },
    // 每周
    handleWeek() {
      if (this.selectCount !== 1) {
        this.$Message.warning("请先选择一条要处理的数据");
        return;
      }
    },
    // 每月
    handleMonth() {
      if (this.selectCount !== 1) {
        this.$Message.warning("请先选择一条要处理的数据");
        return;
      }
    },
  },
  mounted() {
    this.init();
    this.getListData();
  },
};
</script>
<style lang="less" scoped>
.mygrid .ivu-table th {
  text-align: center;
}
</style>