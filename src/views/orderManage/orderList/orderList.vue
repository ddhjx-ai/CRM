<style lang="less">
@import "../../../styles/table-common.less";
@import "./orderList.less";
</style>
<template>
  <div class="search">
    <Card>
      <Row class="operation">
        <Button @click="delAll" icon="md-trash">批量删除</Button>
        <Button @click="print" type="primary" icon="md-add">打印订单</Button>
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

    <!-- 编辑 -->
    <Modal title="编辑" v-model="modalVisible" :mask-closable="false" :width="500">
      <Form ref="editForm" :model="editForm" :label-width="80">
        <FormItem label="备注：">
          <Input v-model="editForm.buyerMessage" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="Default" @click="handleCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handleSubmit">提交</Button>
      </div>
    </Modal>

    <!-- 发货 -->
    <Modal title="发货" v-model="sendVisible" :mask-closable="false" :width="500">
      <Form ref="sendForm" :model="sendForm" :label-width="120" :rules="sendValidate">
        <FormItem label="快递名称：" prop="shippingName">
          <Select v-model="sendForm.shippingName" placeholder="请选择">
            <Option v-for="item in optionsList" :key="item.id" :value="item.id">{{item.expressName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="快递单号：" prop="shippingCode">
          <Input v-model="sendForm.shippingCode" />
        </FormItem>
        <FormItem label="运费(￥)：" prop="postFee">
          <Input v-model="sendForm.postFee" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="Default" @click="sendVisible = false">取消</Button>
        <Button type="primary" :loading="sendLoading" @click="sendSubmit">提交</Button>
      </div>
    </Modal>

    <!-- 打印 -->
    <Modal title="打印预览" v-model="printVisible" :mask-closable="false" :width="850">
      <div id="printBox">
        <Row type="flex" justify="center">
          <Col span="24">
            <h3 class="printTitle">XMall商城订单信息</h3>
          </Col>
        </Row>
        <Form :label-width="120">
          <Row>
            <Col span="6">
              <FormItem label="会员名称：">
                <span>{{printForm.buyerNick}}</span>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="下单时间：">
                <span></span>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="订单编号：">
                <span>{{printForm.orderId}}</span>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="支付方式：">
                <span>{{printForm.orderId}}</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="6">
              <FormItem label="付款时间：">
                <span>{{printForm.paymentTime}}</span>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="发货时间：">
                <span>{{printForm.consignTime}}</span>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="发货编号：">
                <span>{{printForm.shippingCode}}</span>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="收货人：">
                <span>{{printForm.receiverName}}</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="6">
              <FormItem label="手机：">
                <span>{{printForm.receiverPhone}}</span>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="收货地址：">
                <span>{{printForm.receiverAddress}}</span>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Row>
          <Col span="24">
            <Table border :columns="printColumns" :data="printData" sortable="custom" :width="800"></Table>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <div class="totalPrice" style="margin-top: 20px">运费：￥{{printForm.postFee}} + 支付费用：￥{{printForm.payment}} - 订单折扣：￥0 = 订单总金额：￥{{printForm.payment}}</div>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <div class="totalPrice">= 应付款金额：￥{{printForm.payment}}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div class="orderDes">订单备注：{{printForm.buyerMessage}}</div>
          </Col>
        </Row>
      </div>
      <div slot="footer" class="footer">
        <Button type="info" v-print="'#printBox'">打印</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { validatePrice } from "@/libs/validate";
import Print from "print-js";
export default {
  name: "orderList",
  data() {
    return {
      printVisible: false,
      printForm: {},
      printData: [
        {
          id: "159798203880210",
          itemId: "150642571432840",
          num: 1,
          orderId: "159798203879794",
          picPath:
            "https://resource.smartisan.com/resource/9c1d958f10a811df841298d50e1ca7c0.jpg",
          price: 89,
          title: "Smartisan 半入耳式耳机",
          total: null,
          totalFee: 89,
        },
      ],
      printColumns: [
        {
          title: "商品名称",
          key: "title",
          align: "center",
        },
        {
          title: "商品ID号",
          key: "itemId",
          align: "center",
        },
        {
          title: "价格(￥)",
          key: "price",
          align: "center",
        },
        {
          title: "数量(件)",
          key: "num",
          align: "center",
        },
        {
          title: "小计(￥)",
          key: "totalFee",
          align: "center",
        },
      ],
      sendVisible: false,
      sendForm: {
        shippingName: "",
        shippingCode: "",
        postFee: "",
      },
      sendValidate: {
        shippingName: [
          { required: true, message: "快递名称不能为空", trigger: "blur" },
        ],
        shippingCode: [
          { required: true, message: "快递单号不能为空", trigger: "blur" },
        ],
        postFee: [
          { required: true, message: "运费不能为空", trigger: "blur" },
          { validator: validatePrice, trigger: "blur" },
        ],
      },
      optionsList: [
        {
          created: 1527738310000,
          expressName: "京东快递",
          id: 1,
          sortOrder: 1,
          updated: null,
        },
      ],
      sendLoading: false,
      loading: true, // 表单加载状态
      searchForm: {
        // 搜索框对应data对象
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        sort: "createTime", // 默认排序字段
        order: "desc", // 默认排序方式
      },
      modalVisible: false, // 添加或编辑显示
      editForm: {
        // 添加或编辑表单对象初始化数据
        buyerMessage: "",
      },
      submitLoading: false, // 添加或编辑提交状态
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      // 不能配置的列（不显示）
      whiteColumns: ["action"],
      columns: [
        // 表头
        {
          type: "selection",
          width: 60,
          align: "center",
          fixed: "left",
        },
        {
          title: "账单",
          key: "orderId",
          width: 120,
          align: "center",
          fixed: "left",
        },
        {
          title: "支付金额(￥)",
          key: "orderId",
          width: 110,
          align: "center",
        },
        {
          title: "用户账号",
          key: "buyerNick",
          width: 120,
          align: "center",
        },
        {
          title: "物流号",
          key: "shippingCode",
          minWidth: 120,
          align: "center",
        },
        {
          title: "备注",
          key: "buyerMessage",
          align: "center",
          minWidth: 150,
        },
        {
          title: "创建时间",
          key: "createTime",
          width: 120,
          sortType: "desc",
        },
        {
          title: "支付时间",
          key: "paymentTime",
          width: 120,
          sortType: "desc",
        },
        {
          title: "关闭时间",
          key: "closeTime",
          width: 120,
          sortType: "desc",
        },
        {
          title: "完成时间",
          key: "consignTime",
          width: 120,
          sortable: true,
          // 禁止配置的列
          disabled: true,
        },
        {
          title: "订单状态",
          key: "status",
          align: "center",
          width: 120,
          render: (h, params) => {
            if (params.row.status == 1) {
              return h("div", [
                h(
                  "Tag",
                  {
                    props: {
                      color: "success",
                    },
                  },
                  "已发布"
                ),
              ]);
            } else if (params.row.status == 0) {
              return h("div", [
                h(
                  "Tag",
                  {
                    props: {
                      color: "error",
                    },
                  },
                  "已下架"
                ),
              ]);
            }
          },
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 260,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small",
                    // icon: "ios-create-outline",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.consignment(params.row);
                    },
                  },
                },
                "发货"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    // icon: "ios-create-outline",
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
                "备注"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    // icon: "md-trash",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.remove(params.row);
                    },
                  },
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small",
                    // icon: "md-trash",
                  },
                  on: {
                    click: () => {
                      this.cancel(params.row);
                    },
                  },
                },
                "取消订单"
              ),
            ]);
          },
        },
      ],
      columnChange: false,
      data: [], // 表单数据
      total: 0, // 表单数据总数
    };
  },
  // 表格动态列 计算属性
  computed: {},
  methods: {
    init() {
      this.getDataList();
    },
    changeColumns(v) {
      this.columns.map((item) => {
        let hide = true;
        for (let i = 0; i < v.length; i++) {
          if (!item.key) {
            hide = false;
            break;
          }
          if (item.key == v[i] || item.key.indexOf(this.whiteColumns) > -1) {
            hide = false;
            break;
          }
        }
        item.hide = hide;
        return item;
      });
      // 触发计算方法
      this.columnChange = !this.columnChange;
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
      // 以下为模拟数据
      this.data = [
        {
          buyerComment: null,
          buyerMessage: "清早起床拥抱太阳",
          buyerNick: "test",
          closeTime: 1597979655000,
          consignTime: 1597883105000,
          createTime: 1597827974000,
          endTime: null,
          orderId: "159782797402768",
          payment: 49,
          paymentTime: 1597827989000,
          paymentType: null,
          postFee: 0,
          shippingCode: "123",
          shippingName: "京东快递",
          status: 5,
          updateTime: 1597979655000,
          userId: 62,
        },
        {
          buyerComment: null,
          buyerMessage: "和工具和开关机",
          buyerNick: "test",
          closeTime: 1598338800000,
          consignTime: null,
          createTime: 1598252400000,
          endTime: null,
          orderId: "159825239969202",
          payment: 89,
          paymentTime: null,
          paymentType: null,
          postFee: null,
          shippingCode: null,
          shippingName: null,
          status: 5,
          updateTime: 1598515145000,
          userId: 62,
        },
      ];
      this.total = this.data.length;
      this.loading = false;
    },
    handleCancel() {
      this.modalVisible = false;
    },
    handleSubmit() {
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
    },
    // 发货提交
    sendSubmit() {
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
    },
    edit(v) {
      this.modalVisible = true;
      this.$refs.editForm.resetFields();
      // 转换null为""
      for (let attr in v) {
        if (v[attr] == null) {
          v[attr] = "";
        }
      }
      let str = JSON.stringify(v);
      let data = JSON.parse(str);
      this.editForm = data;
    },
    remove(v) {
      this.$Modal.confirm({
        title: "确认删除",
        // 记得确认修改此处
        content: "您确认要删除ID为 " + v.orderId + " 的订单?",
        loading: true,
        onOk: () => {
          // 删除
          // this.deleteRequest("请求地址，如/deleteByIds/" + v.id).then(res => {
          //   this.$Modal.remove();
          //   if (res.success) {
          //     this.$Message.success("操作成功");
          //     this.getDataList();
          //   }
          // });
          // 模拟请求成功
          this.$Message.success("操作成功");
          this.$Modal.remove();
          this.getDataList();
        },
      });
    },
    // ##wu 发货
    consignment(v) {
      this.sendVisible = true;
      this.$refs.sendForm.resetFields();
      this.sendForm.shippingCode = v.shippingCode;
      this.sendForm.shippingName = v.shippingName;
      this.sendForm.postFee = v.postFee;
    },
    // 取消订单
    cancel(v) {
      this.$Modal.confirm({
        title: "确认取消订单",
        // 记得确认修改此处
        content: "您确认要取消ID为 " + v.orderId + " 的订单?",
        loading: true,
        onOk: () => {
          // 删除
          // this.deleteRequest("请求地址，如/deleteByIds/" + v.id).then(res => {
          //   this.$Modal.remove();
          //   if (res.success) {
          //     this.$Message.success("操作成功");
          //     this.getDataList();
          //   }
          // });
          // 模拟请求成功
          this.$Message.success("操作成功");
          this.$Modal.remove();
          this.getDataList();
        },
      });
    },
    // 打开订单模态框
    print() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未选择要打印的数据");
        return;
      }
      this.printVisible = true;
    },
    // 打印订单
    printOrder() {
      Print({
        printable: "printBox",
        type: "html",
        // 继承原来的所有样式
        targetStyles: ["*"],
      });
      // this.jQuery('#printBox').print();
    },
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    changeSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    delAll() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未选择要删除的数据");
        return;
      }
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除所选的 " + this.selectCount + " 条数据?",
        loading: true,
        onOk: () => {
          let ids = "";
          this.selectList.forEach(function (e) {
            ids += e.id + ",";
          });
          ids = ids.substring(0, ids.length - 1);
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
  },
};
</script>