<style lang="less">
@import "../../../styles/table-common.less";
@import "./orderList.less";
</style>
<template>
  <div class="search">
    <Card>
      <Row>
        <Form ref="searchForm" :model="searchForm" inline :label-width="90" label-position="left">
          <Form-item label="关键词：" prop="search">
            <Input
              type="text"
              v-model="searchForm.search"
              placeholder="请输入关键词"
              clearable
              style="width: 200px;"
            />
          </Form-item>
          <Form-item style="margin-left:-35px;" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
            <Button @click="handleReset">重置</Button>
          </Form-item>
        </Form>
      </Row>
      <Row class="operation" type="flex" justify="space-between">
        <Col>
          <Button @click="delAll" icon="md-trash">批量删除</Button>
          <!-- <Button @click="print" type="primary" icon="md-add">打印订单</Button> -->
          <Button @click="getDataList" icon="md-refresh">刷新</Button>
        </Col>
        <Col>
          <div>
            共有数据：
            <span style="font-weight:bold;">{{totalCount}}</span> 条
          </div>
        </Col>
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
          :current="searchForm.page"
          :total="total"
          :page-size="searchForm.size"
          @on-change="changePage"
          @on-page-size-change="changesize"
          :page-size-opts="[5,10,20,50]"
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
        <Button type="Default" @click="modalVisible = false">取消</Button>
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
    <!-- <Modal title="打印预览" v-model="printVisible" :mask-closable="false" :width="850">
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
            <div
              class="totalPrice"
              style="margin-top: 20px"
            >运费：￥{{printForm.postFee}} + 支付费用：￥{{printForm.payment}} - 订单折扣：￥0 = 订单总金额：￥{{printForm.payment}}</div>
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
    </Modal>-->
  </div>
</template>

<script>
import { validatePrice } from "@/libs/validate";
import {
  getOrderList,
  getOrderCount,
  removeOrder,
  updateOrder,
} from "@/api/businessRoom";
import Print from "print-js";
import qs from "qs";
export default {
  name: "orderPage",
  data() {
    return {
      totalCount: 0, // 数据总数
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
        page: 1, // 当前页数
        size: 10, // 页面大小
        search: "",
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
          title: "订单号",
          key: "orderId",
          width: 160,
          align: "center",
          fixed: "left",
        },
        {
          title: "产品名称",
          key: "itemName",
          minWidth: 150,
          align: "center",
        },
        {
          title: "支付金额",
          key: "payment",
          width: 120,
          align: "center",
        },
        {
          title: "用户账号",
          key: "buyerNick",
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
          minWidth: 120,
          align: "center",
          render: (h, params) => {
            return h("div", {}, this.formdate(params.row.createTime));
          },
        },
        {
          title: "支付时间",
          key: "paymentTime",
          minWidth: 120,
          align: "center",
          render: (h, params) => {
            return h("div", {}, this.formdate(params.row.paymentTime));
          },
        },
        {
          title: "订单状态",
          key: "status",
          align: "center",
          width: 120,
          render: (h, params) => {
            if (params.row.status == 0) {
              return h("div", [
                h(
                  "Tag",
                  {
                    props: {
                      color: "primary",
                    },
                  },
                  "等待付款"
                ),
              ]);
            } else if (params.row.status === 1) {
              return h("div", [
                h(
                  "Tag",
                  {
                    props: {
                      color: "success",
                    },
                  },
                  "已完成"
                ),
              ]);
            } else if (params.row.status === 2) {
              return h("div", [
                h(
                  "Tag",
                  {
                    props: {
                      color: "warning",
                    },
                  },
                  "已取消"
                ),
              ]);
            }
          },
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 150,
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              /* h(
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
              ), */
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
              /* h(
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
              ), */
            ]);
          },
        },
      ],
      columnChange: false,
      data: [], // 表单数据
      total: 0, // 表单数据总数
      updateId: 0, // 编辑的id
    };
  },
  // 表格动态列 计算属性
  computed: {},
  methods: {
    init() {
      this.getDataList();
      this.getAllCount();
    },
    // 获取总数据
    getAllCount() {
      getOrderCount().then((res) => {
        if (res.success) {
          this.totalCount = res.result;
        }
      });
    },
    // 时间处理函数
    formdate(date) {
      if(!date) {
        return '-'
      }
      let time = new Date(date);
      let year = time.getFullYear();
      let month = (time.getMonth() + 1).toString().padStart(2, "0");
      let day = time.getDate().toString().padStart(2, "0");
      let hour = time.getHours().toString().padStart(2, "0");
      let minute = time.getMinutes().toString().padStart(2, "0");
      let second = time.getSeconds().toString().padStart(2, "0");
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },
    changePage(v) {
      this.searchForm.page = v;
      this.getDataList();
      this.clearSelectAll();
    },
    changesize(v) {
      this.searchForm.size = v;
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
    // 获取列表数据
    getDataList() {
      this.loading = true;
      getOrderList(this.searchForm).then((res) => {
        this.loading = false;
        /* if (res.success) {
          if (res.result.list.length !== 0) {
            this.data = res.result.list;
            this.total = res.result.count;
          } else if (
            res.result.list.length === 0 &&
            this.searchForm.page !== 1
          ) {
            this.searchForm.page -= 1;
            this.getDataList();
          }
        } */
        if (res.result.list.length !== 0) {
          this.data = res.result.list;
          this.total = res.result.count;
        } else {
          if (this.searchForm.page !== 1) {
            this.searchForm.page -= 1;
            this.getDataList();
          } else {
            this.data = res.result.list;
            this.total = res.result.count;
          }
        }
      });
    },
    // 查询
    handleSearch() {
      let data = {
        page: 1,
        size: 10,
        search: this.searchForm.search,
      };
      this.loading = true;
      getOrderList(data).then((res) => {
        this.loading = false;
        if (res.success) {
          this.data = res.result.list;
          this.total = res.result.count;
        }
      });
    },
    // 重置
    handleReset() {
      this.$refs.searchForm.resetFields();
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      // 重新加载数据
      this.getDataList();
    },
    handleCancel() {
      this.modalVisible = false;
    },
    handleSubmit() {
      // 编辑
      let data = {
        note: this.editForm.buyerMessage,
      };
      updateOrder(this.updateId, qs.stringify(data)).then((res) => {
        this.submitLoading = false;
        if (res.success) {
          this.$Message.success("操作成功");
          this.getDataList();
          this.modalVisible = false;
        }
      });
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
      this.updateId = v.orderId;
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
      this.editForm.buyerMessage = data.buyerMessage;
    },
    remove(v) {
      this.$Modal.confirm({
        title: "确认删除",
        // 记得确认修改此处
        content: "您确认要删除ID为 " + v.orderId + " 的订单?",
        loading: true,
        onOk: () => {
          // 删除
          removeOrder([v.orderId]).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              this.init();
            }
          });
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
          let ids = [];
          ids = this.selectList.map(function (e) {
            return e.orderId;
          });
          // 批量删除
          removeOrder(ids).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              this.clearSelectAll();
              this.init();
            }
          });
        },
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>