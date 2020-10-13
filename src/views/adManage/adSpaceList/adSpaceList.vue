<style lang="less">
</style>
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
          <Form-item label="查询内容" prop="search">
            <Input
              type="text"
              v-model="searchForm.search"
              placeholder="按名称或者创建人搜索"
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
      </Row>
      <Row class="operation" style="margin-bottom: 10px">
        <Button @click="add" type="primary" icon="md-add">添加</Button>
        <Button @click="releasePlan" type="primary" icon="md-clipboard"
          >发布计划</Button
        >
        <Button @click="getDataList" icon="md-refresh">刷新</Button>
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
          :page-size-opts="[5, 10, 20, 50]"
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
      :width="500"
    >
      <Form ref="form" :model="form" :label-width="80" :rules="formValidate">
        <FormItem label="登录名" prop="name">
          <Input v-model="form.name" />
        </FormItem>
        <FormItem label="别名" prop="alias">
          <Input v-model="form.alias" />
        </FormItem>
        <FormItem label="价格" prop="price">
          <Input v-model="form.price" />
        </FormItem>
        <FormItem label="文件类型" prop="fileType">
          <i-select v-model="form.fileType">
            <i-option
              v-for="item in fileTypeList"
              :key="item"
              :value="item.value"
              >{{ item.label }}</i-option
            >
          </i-select>
        </FormItem>
        <FormItem label="个数" prop="amount">
          <Input v-model="form.amount" />
        </FormItem>
        <FormItem label="宽度" prop="width">
          <Input v-model="form.width" />
        </FormItem>
        <FormItem label="高度" prop="height">
          <Input v-model="form.height" />
        </FormItem>
        <FormItem label="是否可用" prop="delFlag">
          <RadioGroup v-model="form.delFlag">
            <Radio :label="0">no</Radio>
            <Radio :label="1">yes</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="页面" prop="pageName">
          <i-select v-model="form.pageName">
            <i-option
              v-for="item in pageList"
              :key="item"
              :value="item.value"
              >{{ item.label }}</i-option
            >
          </i-select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handleCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handleSubmit"
          >提交</Button
        >
      </div>
    </Modal>

    <!-- 发布计划弹出框 -->
    <Modal
      title="发布计划"
      v-model="releaseVisible"
      :mask-closable="false"
      :width="500"
    >
      <Form
        ref="releaseForm"
        :model="releaseForm"
        :label-width="80"
        :rules="formValidate"
      >
        <FormItem label="登录名" prop="name">
          <Input v-model="releaseForm.name" />
        </FormItem>
        <FormItem label="广告">
          <i-select v-model="releaseForm.advertisement">
            <i-option v-for="item in adList" :key="item" :value="item.value">{{
              item.label
            }}</i-option>
          </i-select>
        </FormItem>
        <FormItem label="关键字">
          <Input v-model="releaseForm.keyWords" />
        </FormItem>
        <FormItem label="开始时间" prop="startTime">
          <Date-picker
            type="date"
            v-model="releaseForm.startTime"
            format="yyyy-MM-dd"
            placeholder="选择时间"
          ></Date-picker>
        </FormItem>
        <FormItem label="结束时间" prop="endTime">
          <Date-picker
            type="date"
            v-model="releaseForm.endTime"
            format="yyyy-MM-dd"
            placeholder="选择时间"
          ></Date-picker>
        </FormItem>
        <FormItem label="状态">
          <i-select v-model="releaseForm.status">
            <i-option value="disabled">disabled</i-option>
            <i-option value="active">active</i-option>
            <i-option value="stop">stop</i-option>
            <i-option value="bill">bill</i-option>
          </i-select>
        </FormItem>
        <FormItem label="金额" prop="amount">
          <Input v-model="releaseForm.amount" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="releaseCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="releaseSubmit"
          >提交</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import { getCrmRequest, removeCrm, postCrmRequest } from "@/api/crm";
import { validatePrice,validateNum } from "@/libs/validate";
import qs from "qs";
export default {
  name: "adSpaceList",
  data() {
    return {
      adList: [
        { value: "1", label: "北京城市景观研究院国内知名设计院" },
        { value: "2", label: "福建省水利水电勘测设计研究院" },
        { value: "3", label: "广西壮族自治区交通规划勘" },
        { value: "5", label: "贵州乌江水电开发有限责任公司" },
        { value: "6", label: "北京万科" },
        { value: "8", label: "贵港港务总公司" },
        { value: "11", label: "上海瑞惠" },
        { value: "12", label: "西门子（中国）有限公司" },
      ],
      loading: true, // 表单加载状态
      searchForm: {
        // 搜索框对应data对象
        page: 1, // 当前页数
        size: 10, // 页面大小
        search: "",
      },
      modalType: 0, // 添加或编辑标识
      modalVisible: false, // 添加或编辑显示
      modalTitle: "", // 添加或编辑标题
      releaseVisible: false, // 发布计划弹出框
      form: {
        // 添加或编辑表单对象初始化数据
        name: "",
        alias: "",
        price: '0',
        fileType: "",
        amount: 0,
        width: 0,
        height: 0,
        delFlag: 0,
        pageName: "",
      },
      releaseForm: {
        // 发布计划表单
        name: "",
        advertisement: "",
        keyWords: "",
        startTime: "",
        endTime: "",
        status: "",
        amount: "",
      },
      // 表单验证规则
      formValidate: {
        name: { required: true, message: "登录名不能为空", trigger: "blur" },
        price: [
          {
            required: true,
            message: "价格不能为空",
            trigger: "blur",
          },
          { validator: validatePrice, trigger: "blur" },
        ],
        amount: [
          {
            required: true,
            message: "金额不能为空",
            trigger: "blur",
          },
          { validator: validatePrice, trigger: "blur" },
        ],
        startTime: [
          {
            required: true,
            type: "date",
            message: "请选择日期",
            trigger: "change",
          },
        ],
        endTime: [
          {
            required: true,
            type: "date",
            message: "请选择日期",
            trigger: "change",
          },
        ],
        height:[{ validator: validateNum, trigger: "blur" }],
        width: [{ validator: validateNum, trigger: "blur" }],
        amount: [{ validator: validateNum, trigger: "blur" }]
      },
      submitLoading: false, // 添加或编辑提交状态
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
          align: "center",
        },
        {
          title: "页面",
          key: "pageAlias",
          align: "center",
        },
        {
          title: "名称",
          key: "name",
          align: "center",
        },
        {
          title: "别名",
          key: "alias",
          align: "center",
        },
        {
          title: "创建人",
          key: "createOpr",
          align: "center",
        },
        {
          title: "价格",
          key: "price",
          align: "center",
        },
        {
          title: "文件类型",
          key: "fileTypeMag",
          align: "center",
        },
        {
          title: "个数",
          key: "amount",
          align: "center",
        },
        {
          title: "是否删除",
          key: "delFlag",
          align: "center",
          render: (h, params) => {
            return h("div", {}, params.row.delFlag ? "yes" : "no");
          },
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 100,
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
      updateId: "",
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
      this.getDataList();
      this.clearSelectAll();
    },
    changesize(v) {
      this.searchForm.size = v;
      this.getDataList();
    },

    getDataList() {
      this.loading = true;
      // 请求后端获取表单数据 请自行修改接口
      getCrmRequest("/ad/ggw/list", this.searchForm).then((res) => {
        if (res.success) {
          this.loading = false;
          this.data = res.result.list;
          this.total = res.result.total;
        }
      });
    },
    handleCancel() {
      this.modalVisible = false;
    },
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
    add() {
      this.modalType = 0;
      this.modalTitle = "添加";
      this.$refs.form.resetFields();
      delete this.form.id;
      this.modalVisible = true;
    },
    edit(v) {
      this.modalType = 1;
      this.modalTitle = "编辑";
      this.$refs.form.resetFields();
      this.updateId = v.id;
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
    remove(v) {
      console.log(v);
      this.$Modal.confirm({
        title: "确认删除",
        // 记得确认修改此处
        content: "您确认要删除 " + v["1"] + " ?",
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
          // this.$Message.success("操作成功");
          // this.$Modal.remove();
          // this.getDataList();
          var params = qs.stringify({ id: v.id });
          removeCrm("/website.Sites/remove", params).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              this.getDataList();
            }
          });
        },
      });
    },
    // 发布计划
    releasePlan() {
      if (this.selectCount <= 0) {
        this.$Message.warning("请选择数据");
        return;
      } else if (this.selectCount != 1) {
        this.$Message.warning("只能选择一条信息进行操作！");
        return;
      }
      this.releaseVisible = true;
    },
    releaseCancel() {
      this.releaseVisible = false;
    },
    releaseSubmit() {
      this.$refs.releaseForm.validate((valid) => {
        console.log(valid);
        if (valid) {
          this.releaseVisible = false;
          this.submitLoading = true;
        }
      });
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
    },
  },
  mounted() {
    this.init();
  },
};
</script>