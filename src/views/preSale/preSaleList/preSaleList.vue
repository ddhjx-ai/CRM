
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
          <Form-item label="快速查找" prop="memberId">
            <Input
              type="text"
              v-model="searchForm.memberId"
              placeholder="根据完整的手机号查找"
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
          minWidth: 120,
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
          minWidth: 120,
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
          minWidth: 120,
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
      ],
      rules: {
        phone: [{ validator: validateMobile, trigger: "blur" }],
      },
      data: [], // 表单数据
      total: 0, // 表单数据总数
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
      getCrmRequest("/presale/list").then((res) => {
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
      this.userPhone = JSON.parse(getStore("userInfo").mobile);
      // this.userPhone ? this.warnIsShow = false : this.warnIsShow = true;
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
        text: `http://www.baidu.com`, // 需要转换为二维码的内容
        width: 100,
        height: 100,
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
    width: 132px;
    height: 132px;
    background-color: #fff; //设置白色背景色
    padding: 6px; // 利用padding的特性，挤出白边
    box-sizing: border-box;
  }
}
.qrcodeVisible {
  text-align: center;
}
</style>