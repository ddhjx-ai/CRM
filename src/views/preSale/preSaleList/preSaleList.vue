
<template>
  <div class="search">
    <Card>
      <Row type="flex" justify="space-between">
        <Form
          ref="searchForm"
          :model="searchForm"
          inline
          :label-width="80"
          label-position="right"
        >
          <Form-item label="快速查找" prop="search">
            <Input
              type="text"
              v-model="searchForm.search"
              placeholder="根据手机号查找"
              style="width: 200px"
            />
          </Form-item>
          <Form-item class="operation">
            <Button @click="handleSearch" type="primary" icon="ios-search"
              >查询</Button
            >
            <Button @click="handleReset">重置</Button>
          </Form-item>
        </Form>
        <Button @click="handleQrcode" type="primary" icon="md-qr-scanner"
          >查看二维码</Button
        >
      </Row>
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

    <Modal
      title="二维码"
      v-model="qrcodeVisible"
      :mask-closable="false"
      :width="500"
      class="qrcodeVisible"
    >
      <Form
        ref="qrcodeForm"
        :model="qrcodeForm"
        inline
        :label-width="80"
        label-position="right"
        :rules="rules"
      >
        <Form-item label="手机号：" prop="phone">
          <Input
            type="text"
            v-model="qrcodeForm.phone"
            placeholder="请输入完整的手机号"
          />
        </Form-item>
        <Form-item class="operation leftMargin">
          <Button @click="getQrcode" type="primary">生成二维码</Button>
        </Form-item>
      </Form>
      <Alert
        type="warning"
        show-icon
        style="width: 400px; display: inline-block"
        v-if="warnIsShow"
        >当前用户未绑定手机号，请输入手机号获取二维码</Alert
      >
      <div class="qrcode" ref="qrCodeUrl"></div>
      <div slot="footer">
        <Button type="primary" @click="qrcodeVisible = false">确认</Button>
      </div>
    </Modal>

    <Modal
      title="编辑"
      v-model="keywordsVisible"
      :mask-closable="false"
      :width="800"
    >
      <Form
        ref="keywordsForm"
        :model="keywordsForm"
        :label-width="80"
        label-position="right"
      >
        <Row
          v-for="(item, index) in keywordsForm.list"
          :key="index"
          :gutter="10"
        >
          <Col span="10">
            <FormItem
              style="width: 100%"
              :label="'关键词' + (index + 1)"
              :prop="'list.' + index + '.keyword'"
            >
              <Input
                type="text"
                v-model="item.keyword"
                placeholder="请输入关键词，如“医疗”"
              ></Input>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem
              style="width: 100%"
              class="leftBtnForm"
              :prop="'list.' + index + '.area'"
            >
              <Select
                :disabled="!item.keyword"
                v-model="item.area"
                filterable
                multiple
                placeholder="请选择地区"
              >
                <Option
                  v-for="city in cityList"
                  :value="city.value"
                  :key="city.value"
                  >{{ city.label }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="2" v-if="index !== 0">
            <Button @click="handlelistRemove(index)">删除</Button>
          </Col>
        </Row>
        <Row v-if="keywordsForm.list.length < 3">
          <FormItem>
            <Col span="6">
              <Button type="dashed" long @click="handleListAdd" icon="md-add"
                >添加关键词</Button
              >
            </Col>
          </FormItem>
        </Row>
        <Form-item label="企业名称" prop="companyName">
          <Input
            type="text"
            v-model="keywordsForm.companyName"
            placeholder="请输入企业名称"
          />
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="text" @click="keywordsVisible = false">取消</Button>
        <Button type="primary" @click="keywordsSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import {
  getCrmRequest,
  removeCrm,
  postCrmRequest,
  putCrmRequest,
} from "@/api/crm";
import { validateMobile } from "@/libs/validate";
import { getStore } from "@/libs/storage";
import qs from "qs";
export default {
  name: "preSaleList",
  data() {
    return {
      keywordsVisible: false,
      keywordsForm: {
        list: [
          {
            keyword: "",
            area: [],
          },
        ],
        companyName: "",
      },
      cityList: [
        {
          label: "北京",
          value: "北京",
        },
        {
          label: "上海",
          value: "上海",
        },
        {
          label: "天津",
          value: "天津",
        },
        {
          label: "重庆",
          value: "重庆",
        },
        {
          label: "河北",
          value: "河北",
        },
        {
          label: "山西",
          value: "山西",
        },
        {
          label: "内蒙古",
          value: "内蒙古",
        },
        {
          label: "辽宁",
          value: "辽宁",
        },
        {
          label: "吉林",
          value: "吉林",
        },
        {
          label: "黑龙江",
          value: "黑龙江",
        },
        {
          label: "江苏",
          value: "江苏",
        },
        {
          label: "浙江",
          value: "浙江",
        },
        {
          label: "安徽",
          value: "安徽",
        },
        {
          label: "福建",
          value: "福建",
        },
        {
          label: "江西",
          value: "江西",
        },
        {
          label: "山东",
          value: "山东",
        },
        {
          label: "河南",
          value: "河南",
        },
        {
          label: "湖北",
          value: "湖北",
        },
        {
          label: "湖南",
          value: "湖南",
        },
        {
          label: "广东",
          value: "广东",
        },
        {
          label: "广西",
          value: "广西",
        },
        {
          label: "海南",
          value: "海南",
        },
        {
          label: "贵州",
          value: "贵州",
        },
        {
          label: "云南",
          value: "云南",
        },
        {
          label: "西藏",
          value: "西藏",
        },
        {
          label: "陕西",
          value: "陕西",
        },
        {
          label: "四川",
          value: "四川",
        },
        {
          label: "甘肃",
          value: "甘肃",
        },
        {
          label: "青海",
          value: "青海",
        },
        {
          label: "新疆",
          value: "新疆",
        },
        {
          label: "宁夏",
          value: "宁夏",
        },
        {
          label: "香港",
          value: "香港",
        },
        {
          label: "澳门",
          value: "澳门",
        },
        {
          label: "台湾",
          value: "台湾",
        },
      ],
      warnIsShow: false,
      userPhone: "",
      qrcodeForm: {
        phone: "",
      },
      qrcodeVisible: false,
      loading: false, // 表单加载状态
      searchForm: {
        // 搜索框对应data对象
        page: 1, // 当前页数
        size: 10, // 页面大小
        search: "",
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
          title: "报告ID",
          key: "id",
          minWidth: 100,
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
              params.row.id
            );
          },
        },
        {
          title: "提交时间",
          key: "submitTime",
          align: "center",
          minWidth: 120,
        },
        {
          title: "员工姓名",
          key: "employName",
          align: "center",
          width: 120,
        },
        {
          title: "所在部门",
          key: "department",
          align: "center",
          minWidth: 120,
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          width: 120,
          render: (h, parmas) => {
            return h(
              "span",
              {
                style: {
                  color: parmas.row.status === 1 ? "#19be6b" : "#ed4014",
                },
              },
              parmas.row.status === 1 ? "已生成" : "未生成"
            );
          },
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
                      this.editKeywords(params.row);
                    },
                  },
                },
                "编辑"
              ),
            ]);
          },
        },
      ],
      rules: {
        phone: [{ validator: validateMobile, trigger: "blur" }],
      },
      data: [], // 表单数据
      total: 0, // 表单数据总数
      id: "",
      phone: "",
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
      // 请求后端获取表单数据 请自行修改接口
      getCrmRequest("/presale/list", this.searchForm).then((res) => {
        this.loading = false;
        if (res.success) {
          if (!res.result) return;
          this.data = res.result.list;
          this.total = res.result.total;
        }
      });
    },
    titleToHerf(v) {
      this.$router.push({
        name: "preSaleDetail",
        query: {
          id: v.id,
        },
      });
    },
    // 查询
    handleSearch() {
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      this.getDataList();
    },
    // 重置
    handleReset() {
      this.$refs.searchForm.resetFields();
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      this.getDataList();
    },
    // 查看二维码
    handleQrcode() {
      this.$refs.qrcodeForm.resetFields();
      this.userPhone = JSON.parse(getStore("userInfo")).mobile;
      if (this.userPhone) {
        this.creatQrCode(this.userPhone);
      } else {
        this.warnIsShow = true;
        this.$refs.qrCodeUrl.innerHTML = "";
      }
      this.qrcodeVisible = true;
    },
    creatQrCode(phone) {
      this.warnIsShow = false;
      this.$refs.qrCodeUrl.innerHTML = "";
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        // text: `http://127.0.0.1:8888/osc/presale/form?contact=${phone}`, // 需要转换为二维码的内容
        text: `http://192.168.0.44:8888/osc/presale/form?contact=${phone}`,
        width: 150,
        height: 150,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    },
    // 生成二维码
    getQrcode() {
      this.$refs.qrcodeForm.validate((valid) => {
        if (valid) {
          this.creatQrCode(this.qrcodeForm.phone);
        }
      });
    },
    // 查看关键词
    editKeywords(v) {
      this.$refs.keywordsForm.resetFields();
      this.keywordsForm.list = [
        {
          area: [],
          keyword: "",
        },
      ];
      getCrmRequest("/presale/update/" + v.id).then((res) => {
        if (res.success) {
          this.keywordsVisible = true;
          if (res.result) {
            let data = res.result;
            if (data.keyword1) {
              data.area1 ? (data.area1 = data.area1.split("，")) : null;
              this.keywordsForm.list[0].area = data.area1;
              this.keywordsForm.list[0].keyword = data.keyword1;
            }
            if (data.keyword2) {
              data.area2 ? (data.area2 = data.area2.split("，")) : null;
              this.keywordsForm.list.push({
                area: data.area2,
                keyword: data.keyword2,
              });
            }
            if (data.keyword3) {
              data.area3 ? (data.area3 = data.area3.split("，")) : null;
              this.keywordsForm.list.push({
                area: data.area3,
                keyword: data.keyword3,
              });
            }
            data.companyName
              ? (this.keywordsForm.companyName = data.companyName)
              : null;
            this.id = data.id;
            this.phone = data.phone;
          }
        }
      });
    },
    // 添加关键词
    handleListAdd() {
      this.keywordsForm.list.push({
        area: "",
        keyword: "",
      });
    },
    // 删除关键词
    handlelistRemove(i) {
      this.keywordsForm.list.splice(i, 1);
    },
    // 提交
    keywordsSubmit() {
      let keyword = {};
      this.keywordsForm.list.forEach((item, index) => {
        keyword["keyword" + (index + 1)] = item.keyword;
        keyword["area" + (index + 1)] = item.area.join("，");
      });
      let form = {
        id: this.id,
        phone: this.phone,
        companyName: this.keywordsForm.companyName,
        ...keyword,
      };
      postCrmRequest("/presale/update/info", form).then((res) => {
        if (res.success) {
          this.$Message.success("编辑成功");
          this.keywordsVisible = false;
        }
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" escoped>
.leftMargin .ivu-form-item-content {
  margin-left: 0 !important;
}
.qrcode {
  display: inline-block;
  img {
    width: 182px;
    height: 182px;
    background-color: #fff; //设置白色背景色
    padding: 6px; // 利用padding的特性，挤出白边
    box-sizing: border-box;
  }
}
.qrcodeVisible {
  text-align: center;
}
.leftBtnForm div.ivu-form-item-content {
  margin-left: 0px !important;
}
</style>