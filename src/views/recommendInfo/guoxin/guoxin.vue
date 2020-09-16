<style lang="less">
</style>
<template>
  <div class="search">
    <Card>
      <Row class="operation" style="margin-bottom:10px">
        <Button @click="handleUp" type="primary" icon="md-arrow-dropup">上移</Button>
        <Button @click="handleDown" type="primary" icon="md-arrow-dropdown">下移</Button>
        <Button @click="handleSelect" type="primary" icon="md-search">选取</Button>
        <Button @click="handleDel" type="primary" icon="md-trash">删除</Button>
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
          sortable="custom"
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

    <Modal title="添加信息" v-model="modalVisible" :mask-closable="false" :width="1000">
      <Form ref="form" :model="form" :label-width="50" :rules="formValidate" inline>
        <Row>
          <FormItem label="ID:" class="titleW" prop="id">
            <Input v-model="form.id" />
          </FormItem>
          <FormItem label="标题:" class="titleW" prop="title">
            <Input v-model="form.title" />
          </FormItem>
          <FormItem class="marginL" prop="info">
            <i-select v-model="form.info" style="width:100px" placeholder="全部">
              <i-option v-for="item in infoOptions" :key="item" :value="item.value">{{ item.label }}</i-option>
            </i-select>
          </FormItem>
          <FormItem class="marginL" prop="address">
            <i-select v-model="form.address" style="width:100px" placeholder="地区">
              <i-option v-for="item in addOptions" :key="item" :value="item.value">{{ item.label }}</i-option>
            </i-select>
          </FormItem>
          <FormItem class="marginL" prop="trade">
            <i-select v-model="form.trade" style="width:100px" placeholder="行业">
              <i-option
                v-for="item in tradeOptions"
                :key="item"
                :value="item.value"
              >{{ item.label }}</i-option>
            </i-select>
          </FormItem>
          <FormItem class="marginL" prop="time">
            <i-select v-model="form.time" style="width:100px" placeholder="时间段">
              <i-option value="one">近一天</i-option>
              <i-option value="two">近两天</i-option>
              <i-option value="three">近三天</i-option>
              <i-option value="seven">近一周</i-option>
            </i-select>
          </FormItem>
          <FormItem class="marginL" prop="status">
            <i-select v-model="form.status" style="width:100px" placeholder="是否已发布">
              <i-option value="1">已发布</i-option>
              <i-option value="2">未发布</i-option>
            </i-select>
          </FormItem>
          <FormItem class="marginL">
            <Button @click="handleSearch">搜索</Button>
          </FormItem>
        </Row>
      </Form>
      <Row class="operation" style="margin-bottom:10px">
        <Button @click="handlePull" type="primary" icon="md-add">推荐</Button>
      </Row>
      <Row>
        <Table
          class="mygrid"
          :loading="loading"
          border
          :columns="modalColumns"
          :data="modalData"
          ref="modalDable"
          sortable="custom"
          @on-selection-change="modalChangeSelect"
        ></Table>
      </Row>
      <Row type="flex" justify="end" class="page">
        <Page
          :current="modalPage.pageNumber"
          :total="modalTotal"
          :page-size="modalPage.pageSize"
          @on-change="modalChangePage"
          @on-page-size-change="modalChangePageSize"
          :page-size-opts="[10,20,50]"
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
import { getCrmRequest, removeCrm } from "@/api/crm";
import { validatePrice } from "@/libs/validate";
import axios from "axios";
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
        id: "",
        title: "",
        info: "",
        address: "",
        trade: "",
        time: "",
        status: "",
      },
      loading: true, // 表单加载状态
      searchForm: {
        // 搜索框对应data对象
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
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
          align: "center",
        },
        {
          title: "标题",
          key: "1",
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
              params.row[1]
            );
          },
        },
        {
          title: "发布时间",
          key: "2",
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
          align: "center",
        },
        {
          title: "标题",
          key: "1",
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
              params.row[1]
            );
          },
        },
        {
          title: "信息类型",
          key: "2",
          align: "center",
        },
        {
          title: "信息状态",
          key: "3",
          align: "center",
        },
        {
          title: "发布时间",
          key: "4",
          align: "center",
        },
      ],
      modalPage: {
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
      },
      data: [], // 表单数据
      modalData: [],
      modalTotal: 0,
      total: 0, // 表单数据总数
      dataList: {
        page: "1",
        total: "200",
        rows: [
          {
            id: "2056750140",
            cell: [
              "2056750140",
              "<a href='http://www.chinabidding.com.cn/cblcn/InfoShow/zbgg?record_id=nUmlKR' target='_blank'>海通恒信国际融资租赁股份有限公司厨房设备、消耗品和办公用品供应商入围项目招标公告</a>",
              "2020-09-09 16:14:56.0",
            ],
          },
          {
            id: "2056727907",
            cell: [
              "2056727907",
              "<a href='http://www.chinabidding.com.cn/cblcn/InfoShow/zbgg?record_id=nUmfQP' target='_blank'>光大信托太平洋保险大厦办公楼空气净化器租赁项目招标公告</a>",
              "2020-09-09 14:30:07.0",
            ],
          },
          {
            id: "2056686771",
            cell: [
              "2056686771",
              "<a href='http://www.chinabidding.com.cn/cblcn/InfoShow/zbgs?record_id=nUmHTj' target='_blank'>中国光大银行IT服务管理系统2020年升级项目中标结果公告</a>",
              "2020-09-09 11:42:32.0",
            ],
          },
          {
            id: "2056686604",
            cell: [
              "2056686604",
              "<a href='http://www.chinabidding.com.cn/cblcn/InfoShow/zbgs?record_id=nUmHK1' target='_blank'>中国光大银行分行安全桌面云服务平台选型入围项目中标结果公告</a>",
              "2020-09-09 11:41:43.0",
            ],
          },
          {
            id: "2056460142",
            cell: [
              "2056460142",
              "<a href='http://www.chinabidding.com.cn/cblcn/InfoShow/zbgg?record_id=nUMAMN' target='_blank'>中银消费金融有限公司社会招聘采购招聘管理系统及人才测评系统项目竞争性磋商邀请书</a>",
              "2020-09-08 15:30:21.0",
            ],
          },
          {
            id: "2056453133",
            cell: [
              "2056453133",
              "<a href='http://www.chinabidding.com.cn/cblcn/InfoShow/zbgs?record_id=nUMuFt' target='_blank'>中国光大银行POWER小型机集中扩容采购项目成交结果公告</a>",
              "2020-09-08 14:54:12.0",
            ],
          },
          {
            id: "2056181354",
            cell: [
              "2056181354",
              "<a href='http://www.chinabidding.com.cn/cblcn/InfoShow/zbgg?record_id=nUbyVi' target='_blank'>中银消费金融有限公司催收供应商入库采购项目更正公告</a>",
              "2020-09-07 10:34:22.0",
            ],
          },
          {
            id: "2056400426",
            cell: [
              "2056400426",
              "<a href='http://www.chinabidding.com.cn/cblcn/InfoShow/zbgs?record_id=nUMecK' target='_blank'>中国光大银行信用卡外呼平台软硬件升级项目成交结果公告</a>",
              "2020-09-08 10:07:26.0",
            ],
          },
          {
            id: "2056254462",
            cell: [
              "2056254462",
              "<a href='http://www.chinabidding.com.cn/cblcn/InfoShow/zbgg?record_id=nUbzPP' target='_blank'>中国人民保险集团周转房评估服务项目征集公告</a>",
              "2020-09-07 17:18:32.0",
            ],
          },
          {
            id: "2056250828",
            cell: [
              "2056250828",
              "<a href='http://www.chinabidding.com.cn/cblcn/InfoShow/zbgg?record_id=nUblon' target='_blank'>​中国光大银行总行备份网络远程扩展板卡扩容采购项目询价公告</a>",
              "2020-09-07 16:58:13.0",
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
      getCrmRequest("/tj.InfoTJ/show_infos?block_id=288&zt_id=0", params);
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
        item.cell["href"] = item.cell[1].replace(
          /<a href=([\s\S]*) [\s\S]*>[\s\S]*<\/a[\s\S]*>/g,
          "$1"
        );
        item.cell[1] = item.cell[1].replace(
          /<a[\s\S]*>([\s\S]*)<\/a[\s\S]*>/g,
          "$1"
        );
        item.cell["href"] = item.cell["href"].slice(
          1,
          item.cell["href"].length - 2
        );
        item = { ...item.cell, id: item.id };
        return item;
      });
      this.total = this.data.length;
      this.loading = false;
    },
    getModalData() {
      this.loading = true;
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
      getCrmRequest(
        "/tj.InfoTJ/search_list?search_id=1303934252492120064",
        params
      );
      let data = {
        page: "1",
        total: "1000",
        rows: [
          {
            id: "2056975824",
            cell: [
              "2056975824",
              "<a href='http://www.chinabidding.com.cn/cblcn/InfoShow/xmxx?record_id=nU02z7' target='_blank'>浙江贝纶丝线有限公司年产900吨高性能丝线建设项目 </a>",
              "[VIP项目]",
              "已发布",
              "2020-09-10 13:36:37.0",
            ],
          },
          {
            id: "2056974770",
            cell: [
              "2056974770",
              "<a href='http://www.chinabidding.com.cn/cblcn/InfoShow/xmxx?record_id=nU02ry' target='_blank'>年产5万吨固废衍生再生资源综合利用技改项目 </a>",
              "[VIP项目]",
              "已发布",
              "2020-09-10 13:36:19.0",
            ],
          },
          {
            id: "2056974696",
            cell: [
              "2056974696",
              "<a href='http://www.chinabidding.com.cn/cblcn/InfoShow/xmxx?record_id=nU02HQ' target='_blank'>万盛精密钣金江苏有限公司全自动多功能医用清洗机智能化生产线扩建项目</a>",
              "[VIP项目]",
              "已发布",
              "2020-09-10 13:36:09.0",
            ],
          },
          {
            id: "2056974622",
            cell: [
              "2056974622",
              "<a href='http://www.chinabidding.com.cn/cblcn/InfoShow/xmxx?record_id=nU02qE' target='_blank'>宁波国际会议中心发展有限公司宁波国际会议中心项目(含酒店) （更新1）   </a>",
              "[VIP项目]",
              "已发布",
              "2020-09-10 13:36:00.0",
            ],
          },
          {
            id: "2056974617",
            cell: [
              "2056974617",
              "<a href='http://www.chinabidding.com.cn/cblcn/InfoShow/xmxx?record_id=nU02qS' target='_blank'>河北省邢台市轴承配件生产项目 </a>",
              "[VIP项目]",
              "已发布",
              "2020-09-10 13:35:46.0",
            ],
          },
          {
            id: "2056974594",
            cell: [
              "2056974594",
              "<a href='http://www.chinabidding.com.cn/cblcn/InfoShow/xmxx?record_id=nU02q-' target='_blank'>河北唐山市改建金属制品加工项目 </a>",
              "[VIP项目]",
              "已发布",
              "2020-09-10 13:35:34.0",
            ],
          },
          {
            id: "2056974592",
            cell: [
              "2056974592",
              "<a href='http://www.chinabidding.com.cn/cblcn/InfoShow/xmxx?record_id=nU02q2' target='_blank'>年产45万吨干混砂浆项目 </a>",
              "[VIP项目]",
              "已发布",
              "2020-09-10 13:35:02.0",
            ],
          },
          {
            id: "2056974400",
            cell: [
              "2056974400",
              "<a href='http://www.chinabidding.com.cn/cblcn/InfoShow/xmxx?record_id=nU021V' target='_blank'>围场满族蒙古族自治县程鹏蔬菜种植专业合作社程鹏蔬菜保鲜项目 </a>",
              "[VIP项目]",
              "已发布",
              "2020-09-10 13:34:43.0",
            ],
          },
          {
            id: "2056974357",
            cell: [
              "2056974357",
              "<a href='http://www.chinabidding.com.cn/cblcn/InfoShow/xmxx?record_id=nU023R' target='_blank'>年产2万套木门项目 </a>",
              "[VIP项目]",
              "已发布",
              "2020-09-10 13:34:28.0",
            ],
          },
          {
            id: "2056974335",
            cell: [
              "2056974335",
              "<a href='http://www.chinabidding.com.cn/cblcn/InfoShow/xmxx?record_id=nU023i' target='_blank'>河北省衡水市研发试验室扩建项目 </a>",
              "[VIP项目]",
              "已发布",
              "2020-09-10 13:34:19.0",
            ],
          },
        ],
      };
      this.modalData = data.rows.map((item) => {
        item.cell["href"] = item.cell[1].replace(
          /<a href=([\s\S]*) [\s\S]*>[\s\S]*<\/a[\s\S]*>/g,
          "$1"
        );
        item.cell[1] = item.cell[1].replace(
          /<a[\s\S]*>([\s\S]*)<\/a[\s\S]*>/g,
          "$1"
        );
        item.cell["href"] = item.cell["href"].slice(
          1,
          item.cell["href"].length - 2
        );
        item = { ...item.cell, id: item.id };
        return item;
      });
      this.modalTotal = this.modalData.length;
      this.loading = false;
    },
    changeSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    modalChangeSelect(e) {
        this.modalSelectList = e;
      this.modalSelectCount = e.length;
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
      this.modalSelectCount = 0
      this.modalSelectList = []
      this.$refs.form.resetFields();
      this.getModalData();
    },
    // 推荐
    handlePull() {
      if (this.modalSelectCount <= 0) {
        this.$Message.warning("您还未选择要推荐的数据");
        return;
      }
      if (this.modalSelectCount > 1) {
        this.$Message.warning("请选择一条数据");
        return;
      }
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
      console.log(this.selectList)
      let params = {
        block_id: 288,
        record_id: this.selectList[0].id,
        zhuanti_id: 0,
      };
      getCrmRequest("/tj.InfoTJ/up", params);
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
        block_id: 288,
        record_id: this.selectList[0].id,
        zhuanti_id: 0,
      };
      getCrmRequest("/tj.InfoTJ/down", params);
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
.marginL .ivu-form-item-content {
  margin-left: 0 !important;
}
.ivu-form-inline .ivu-form-item {
  width: 100px;
}

.ivu-form-inline .titleW {
  width: 140px;
}
</style>