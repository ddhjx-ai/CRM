<template>
  <div class="search">
    <Card>
      <Row>
        <Form ref="searchForm" :model="searchForm" inline :label-width="90" label-position="right">
          <Form-item label="公司名" prop="companyName">
            <Input type="text" v-model="searchForm.companyName" style="width: 200px;" />
          </Form-item>
          <Form-item label="用户名" prop="userName">
            <Input type="text" v-model="searchForm.userName" style="width: 200px;" />
          </Form-item>
          <Form-item label="邮箱" prop="emailStr">
            <Input type="text" v-model="searchForm.emailStr" style="width: 200px;" />
          </Form-item>
          <Form-item label="是否停用" prop="status">
            <Select v-model="searchForm.status" style="width:200px" placeholder="全部">
              <Option value="0">否</Option>
              <Option value="1">是</Option>
            </Select>
          </Form-item>
          <Form-item label="客户分类" prop="userType">
            <Select v-model="searchForm.userType" style="width:200px" placeholder="全部">
              <Option value="0">彩钻用户</Option>
              <Option value="1">VIP用户</Option>
              <Option value="2">标准用户</Option>
            </Select>
          </Form-item>
          <Form-item label="到期时间" prop="start">
            <!-- <DatePicker
              type="date"
              placeholder="起始时间"
              format="yyyy-MM-dd"
              @on-change="startChange"
              v-model="searchForm.start"
              style="width: 200px"
            ></DatePicker>
          </Form-item>
          <Form-item class="formSpan">
            <span>-</span>
          </Form-item>
          <Form-item class="hideLabel" prop="end">
            <DatePicker
              class="endPicker"
              type="date"
              placeholder="结束时间"
              format="yyyy-MM-dd"
              @on-change="endChange"
              v-model="searchForm.end"
              style="width: 200px"
            ></DatePicker> -->
            <DatePicker type="daterange" @on-change="dateChange" split-panels style="width: 200px"></DatePicker>
          </Form-item>
          <Form-item style="margin-left:-35px;" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
            <Button @click="handleReset">重置</Button>
          </Form-item>
        </Form>
      </Row>
      <Row class="operation" style="margin-bottom:10px">
        <Button @click="handleAdd" type="primary">添加用户</Button>
        <Button @click="handleSync" type="primary">同步所有用户信息</Button>
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

    <Modal
      :title="modalTitle"
      v-model="modalVisible"
      :mask-closable="false"
      :width="1000"
      class="detailModal"
    >
      <h3 class="basicDetail">基本信息</h3>
      <Form ref="form" inline :model="form" :label-width="100" :rules="formValidate">
        <Row>
          <Col :span="8">
            <FormItem label="用户名" prop="userName">
              <Input v-model="form.userName" style="width: 200px;" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="公司名" prop="companyName">
              <Input v-model="form.companyName" style="width: 200px;" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="到期时间" prop="endDate">
              <DatePicker
                type="date"
                format="yyyy-MM-dd"
                @on-change="endChange"
                v-model="form.endDate"
                style="width: 200px;"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="客户分类" prop="userType">
              <Select v-model="form.userType" style="width: 200px;">
                <Option value="1">VIP客户</Option>
                <Option value="2">彩钻客户</Option>
                <Option value="3">标准客户</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="负责人" prop="id">
              <Input v-model="form.id" style="width: 200px;" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="项目大全分类" prop="type">
              <RadioGroup v-model="form.type">
                <Radio label="0">完整版</Radio>
                <Radio label="1">简版</Radio>
                <Radio label="2">全部</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col :span="16">
            <FormItem label="备注" prop="remark" style="width: 100%">
              <Input v-model="form.remark" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem>
              <Button type="success" @click="handleCancel">保存</Button>
              <Button
                type="info"
                :loading="submitLoading"
                @click="handleSubmit"
                style="margin-left: 15px"
              >同步网站信息</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <h3 class="basicDetail">邮箱</h3>
      <Form ref="emailForm" :model="emailForm" :label-width="100" :rules="formValidate">
        <Row>
          <Col :span="16">
            <FormItem label="邮箱" prop="id" style="width: 100%">
              <Input v-model="emailForm.id" placeholder="多个邮箱用逗号隔开"/>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem>
              <Button type="success" @click="handleCancel">添加</Button>
            </FormItem>
          </Col>
          <Col :span="16">
            <FormItem label="规则邮箱" prop="id" style="width: 100%">
              <Input v-model="emailForm.id" placeholder="该邮箱将关联所有邮箱地址"/>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem>
              <Button type="success" @click="handleCancel">添加</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Row>
        <Table
          class="mygrid"
          :loading="loading"
          border
          :columns="emailColums"
          :data="emailData"
          ref="table"
          @on-selection-change="changeSelect"
        ></Table>
      </Row>
    </Modal>
  </div>
</template>

<script>
import { getCrmRequest, removeCrm } from "@/api/crm";
import { validateNum, validateIP } from "@/libs/validate";
import qs from "qs";
export default {
  name: "memberList",
  data() {
    return {
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
      emailForm: {},
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
      modalTitle: "",
      submitLoading: false,
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      columns: [
        {
          type: "index",
          title: "序号",
          width: 70,
          align: "center",
          fixed: "left",
        },
        {
          title: "公司名",
          key: "companyName",
          minWidth: 180,
          align: "center",
          fixed: "left",
        },
        {
          title: "用户名",
          key: "userName",
          minWidth: 120,
          align: "center",
        },
        {
          title: "邮箱",
          key: "emailStr",
          minWidth: 160,
          align: "center",
        },
        {
          title: "有效订阅",
          key: "subscribeNum",
          minWidth: 100,
          align: "center",
        },
        {
          title: "到期时间",
          //   key: "stopDate",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            return h("div", {}, this.formdate(params.row.endDate));
          },
        },
        {
          title: "客户分类",
          key: "userType",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            return h("div", {}, params.row.userType == 1 ? "VIP客户" : "");
          },
        },
        {
          title: "负责人",
          key: "metaName",
          align: "center",
          minWidth: 120,
        },
        {
          title: "停用时间",
          //   key: "endDate",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            return h("div", {}, this.formdate(params.row.stopDate));
          },
        },
        {
          title: "创建时间",
          key: "createDate",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            return h("div", {}, this.formdate(params.row.createDate));
          },
        },
        {
          title: "是否停用",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: params.row.status == 0 ? "success" : "error",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.handleStop(params.row);
                    },
                  },
                },
                params.row.status === 0 ? "否" : "是"
              ),
            ]);
          },
        },
        {
          title: "发送情况",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "a",
              {
                props: {},
                style: {},
                on: {
                  click: () => {
                    this.handleDetail(params.row);
                  },
                },
              },
              "查看"
            );
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
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
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
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.handleRemove(params.row);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      emailColums: [
        {
          type: "index",
          title: "序号",
          width: 70,
          align: "center",
        },
        {
          title: "邮箱",
          align: "center",
          minWidth: 120,
        },
        {
          title: "规则名",
          key: "userType",
          align: "center",
          minWidth: 120,
        },
        {
          title: "添加时间",
          key: "metaName",
          align: "center",
          minWidth: 120,
        },
        {
          title: "最后一次发送时间",
          //   key: "endDate",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            return h("div", {}, this.formdate(params.row.stopDate));
          },
        },
        {
          title: "类型",
          key: "createDate",
          align: "center",
        },
        {
          title: "状态",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: params.row.status == 0 ? "success" : "error",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.handleStop(params.row);
                    },
                  },
                },
                params.row.status === 0 ? "否" : "是"
              ),
            ]);
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
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
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
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.handleRemove(params.row);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      data: [], // 表单数据
      emailData: [], // 邮箱表单数据
      total: 0, // 表单数据总数
      dataList: {
        total: 178,
        rows: [
          {
            companyName: "中航勘察设计研究院有限公司",
            createDate: 1553652320000,
            emailStr: "18612304059@163.com,",
            endDate: 1621440000000,
            id: 11,
            metaName: "刘萍萍",
            status: 0,
            stopDate: 1600141502000,
            subscribeNum: 3,
            type: 0,
            userName: "中航勘察",
            userType: 1,
          },
          {
            companyName: "河南鼎力杆塔股份有限公司",
            createDate: 1553652391000,
            emailStr: "hndldg@163.com,13938342605@139.com,13603498966@139.com,",
            endDate: 1563638400000,
            id: 12,
            metaName: "运承晔",
            status: 1,
            stopDate: 1563518983000,
            subscribeNum: 1,
            type: 0,
            userName: "河南鼎力",
            userType: 1,
          },
          {
            companyName: "中国电建集团河南省电力勘测设计院有限公司",
            createDate: 1553652478000,
            emailStr: "hndltx@163.com,15837108608@163.com,dou.yao@163.com,",
            endDate: 1602345600000,
            id: 13,
            metaName: "运承晔",
            status: 0,
            subscribeNum: 3,
            type: 0,
            userName: "ydscn",
            userType: 1,
          },
          {
            companyName: "远洋线缆有限公司",
            createDate: 1553652611000,
            emailStr: "lwj0491@qq.com,",
            endDate: 1571414400000,
            id: 14,
            metaName: "路遥",
            status: 1,
            stopDate: 1571414400000,
            subscribeNum: 1,
            type: 0,
            userName: "刘卫江",
            userType: 1,
          },
          {
            companyName: "深圳供电规划设计院有限公司",
            createDate: 1553652932000,
            emailStr: "89710847@qq.com,",
            endDate: 1566489600000,
            id: 15,
            metaName: "李银",
            status: 1,
            stopDate: 1566489600000,
            subscribeNum: 2,
            type: 0,
            userName: "深圳供电院",
            userType: 1,
          },
          {
            companyName: "北京恒扉嘉泰建设工程有限公司",
            createDate: 1553652983000,
            emailStr: "hengfeiec@163.com,",
            endDate: 1629993600000,
            id: 16,
            metaName: "刘东雪",
            status: 0,
            stopDate: 1561564800000,
            subscribeNum: 2,
            type: 0,
            userName: "hengfeijiatai",
            userType: 1,
          },
          {
            companyName: "中国能源建设集团广东省电力设计研究院有限公司",
            createDate: 1553653158000,
            emailStr: "huangdongjoy@163.com,",
            endDate: 1598803200000,
            id: 17,
            metaName: "刘萍萍",
            status: 1,
            stopDate: 1598803200000,
            subscribeNum: 1,
            type: 0,
            userName: "dlsj",
            userType: 1,
          },
          {
            companyName: "山东鲁润热能科技有限公司",
            createDate: 1553653205000,
            emailStr: "muziss10666@126.com,",
            endDate: 1561910400000,
            id: 18,
            metaName: "运承晔",
            status: 1,
            stopDate: 1561910400000,
            subscribeNum: 4,
            type: 0,
            userName: "lurunjituan7666",
            userType: 1,
          },
          {
            companyName: "东北电力烟塔工程有限公司",
            createDate: 1553653344000,
            emailStr: "dtgj822@sohu.com,ddytsckfb@163.com,",
            endDate: 1588435200000,
            id: 19,
            metaName: "运承晔",
            status: 1,
            stopDate: 1588435200000,
            subscribeNum: 2,
            type: 0,
            userName: "ddytsckfb",
            userType: 1,
          },
          {
            companyName: "青岛中源电力电气有限公司",
            createDate: 1553653396000,
            emailStr: "960587824@qq.com,",
            endDate: 1564588800000,
            id: 20,
            metaName: "胡筱莉",
            status: 1,
            stopDate: 1564588800000,
            subscribeNum: 1,
            type: 0,
            userName: "960587824",
            userType: 1,
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
    // 时间处理函数
    formdate(date) {
      if (!date) {
        return "-";
      }
      let time = new Date(date);
      let year = time.getFullYear();
      let month = (time.getMonth() + 1).toString().padStart(2, "0");
      let day = time.getDate().toString().padStart(2, "0");
      let hour = time.getHours().toString().padStart(2, "0");
      let minute = time.getMinutes().toString().padStart(2, "0");
      let second = time.getSeconds().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
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
    // 获取列表书
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
      this.data = this.dataList.rows;
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
    // 同步所有信息
    handleSync() {},
    // 删除
    handleRemove(v) {
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除所选当前数据?",
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
    // 查看详情
    handleDetail(v) {},
    // 启用/停用
    handleStop(v) {},
    dateChange(v) {
      this.searchForm.start = v[0]
      this.searchForm.end = v[1]
    }
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less">
@import "../../../styles/table-common.less";
@import "./memberList.less";
</style>