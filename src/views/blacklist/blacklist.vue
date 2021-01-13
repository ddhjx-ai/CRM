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
              <Option value="login_id">登录名</Option>
              <Option value="company_name">用户名</Option>
              <Option value="member_id">用户ID</Option>
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
        <Button @click="handleAdd" type="primary" icon="md-add">添加</Button>
        <Button @click="handleEdit" type="primary" icon="ios-create-outline"
          >修改</Button
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
          :page-size-opts="[10, 20, 50]"
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
        <FormItem label="账号ID:" prop="member_id">
          <Input v-model="form.member_id" />
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
        <FormItem label="delayTime:" prop="delay_time">
          <Input v-model="form.delay_time" />
        </FormItem>
        <FormItem label="ipNotAllow:" prop="IP_not_allow">
          <Input v-model="form.IP_not_allow" />
        </FormItem>
        <FormItem label="ipAllow:" prop="IP_allow">
          <Input v-model="form.IP_allow" />
        </FormItem>
        <FormItem label="ipCount:" prop="IP_count">
          <Input v-model="form.IP_count" />
        </FormItem>
        <FormItem label="isHunXiao:" prop="is_hunxiao">
          <Input v-model="form.is_hunxiao" />
        </FormItem>
        <FormItem label="isPic:" prop="is_pic">
          <Checkbox v-model="form.is_pic"></Checkbox>
        </FormItem>
        <FormItem label="allowCopy:" prop="allow_copy">
          <Checkbox v-model="form.allow_copy"></Checkbox>
        </FormItem>
        <div slot="footer">
          <Button type="text" @click="modalVisible = false">取消</Button>
          <Button type="primary" :loading="submitLoading" @click="handleSubmit"
            >提交</Button
          >
        </div>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { getCrmRequest, removeCrm, postCrmRequest } from "@/api/crm";
import { validateNum, validateIP } from "@/libs/validate";
import qs from "qs";
export default {
  name: "blacklist",
  data() {
    const validateTime = (rule, value, callback) => {
      const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if (!reg.test(value)) {
        callback(new Error("请输入合法的数字！"));
      } else {
        callback();
      }
    };
    return {
      modalVisible: false,
      form: {
        member_id: "",
        daily: "",
        weekly: "",
        monthly: "",
        delay_time: "",
        IP_not_allow: "",
        IP_allow: "",
        IP_count: "",
        is_hunxiao: "",
        is_pic: false,
        allow_copy: false,
      },
      formValidate: {
        member_id:{ validator: validateNum, trigger: "blur" },
        daily: { validator: validateNum, trigger: "blur" },
        weekly: { validator: validateNum, trigger: "blur" },
        monthly: { validator: validateNum, trigger: "blur" },
        delay_time: { validator: validateTime, trigger: "blur" },
        IP_not_allow: { validator: validateIP, trigger: "blur" },
        IP_allow: { validator: validateIP, trigger: "blur" },
      },
      loading: true, // 表单加载状态
      searchForm: {
        // 搜索框对应data对象
        page: 1, // 当前页数
        size: 10, // 页面大小
        sortOrder: "",
        sortName: "",
        qtype: "login_id",
        query: "",
      },
      modalType: 0, // 添加或编辑标识
      modalVisible: false, // 添加或编辑显示
      modalTitle: "",
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
          title: "用户ID",
          width: 120,
          align: "center",
          key: "member_id",
          sortable: true,
        },
        {
          title: "登录名",
          key: "login_id",
          width: 120,
          align: "center",
          sortable: true,
        },
        {
          title: "公司名",
          key: "company_name",
          sortable: true,
          minWidth: 120,
          align: "center",
        },
        {
          title: "每天浏览信息",
          key: "daily",
          align: "center",
          width: 140,
          sortable: true,
        },
        {
          title: "每周浏览信息",
          key: "weekly",
          align: "center",
          width: 140,
          sortable: true,
        },
        {
          title: "每月浏览信息",
          key: "monthly",
          align: "center",
          width: 140,
          sortable: true,
        },
        {
          title: "延时",
          key: "delay_time",
          align: "center",
          width: 130,
          sortable: true,
        },
        {
          title: "禁止IP",
          key: "IP_not_allow",
          align: "center",
          width: 130,
          sortable: true,
        },
        {
          title: "允许IP",
          key: "IP_allow",
          align: "center",
          width: 130,
          sortable: true,
        },
        {
          title: "混淆信息",
          key: "is_hunxiao",
          align: "center",
          width: 130,
          sortable: true,
        },
        {
          title: "转换图片",
          key: "is_pic",
          align: "center",
          width: 130,
          sortable: true,
        },
        {
          title: "允许复制",
          key: "allow_copy",
          align: "center",
          width: 130,
          sortable: true,
        },
        {
          title: "加入时间",
          key: "create_date",
          align: "center",
          width: 150,
          sortable: true,
        },
      ],
      data: [], // 表单数据
      total: 0, // 表单数据总数
      updateId: ''
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
    },
    changesize(v) {
      this.searchForm.size = v;
      this.getDataList();
    },
    getDataList() {
      this.loading = false;
      // 请求后端获取表单数据 请自行修改接口
      postCrmRequest("/black/list", qs.stringify(this.searchForm)).then(
        (res) => {
          this.loading = false;
          if (res.success) {
            this.data = res.result.list;
            this.total = res.result.total;
            this.clearSelectAll();
          }
        }
      );
    },
    changeSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    changeSort(e) {
      console.log(e);
      this.searchForm.sortName = e.key;
      this.searchForm.sortOrder = e.order;
      if (e.order == "normal") {
        this.searchForm.sortOrder = "";
      }
      this.getDataList();
    },
    // 编辑
    handleEdit() {
      if (this.selectCount === 0) {
        return this.$Message.warning("请选择一条要修改的数据！");
      }
      if (this.selectCount > 1) {
        return this.$Message.warning("请选择一条要修改的数据！");
      }
      this.modalType = 1;
      this.modalTitle = "编辑";
      this.$refs.form.resetFields();
      let v = this.selectList[0]
      // 转换null为""
      for (let attr in v) {
        if (v[attr] == null) {
          v[attr] = "";
        }
      }
      let str = JSON.stringify(v);
      let data = JSON.parse(str);
      this.form = data;
      this.updateId = v.id;
      this.modalVisible = true;
    },
    // 添加
    handleAdd() {
      this.modalType = 0;
      this.modalTitle = "添加";
      this.$refs.form.resetFields();
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
            postCrmRequest("/black/save", qs.stringify(this.form)).then(res => {
              this.submitLoading = false;
              if (res.success) {
                this.$Message.success("添加成功");
                this.getDataList();
                this.modalVisible = false;
              }
            });
          } else {
            // 编辑
            let data = {
              member_id: this.form.member_id,
              daily: this.form.daily,
              weekly: this.form.weekly,
              monthly: this.form.monthly,
              delay_time: this.form.delay_time,
              IP_not_allow: this.form.IP_not_allow,
              IP_allow: this.form.IP_allow,
              IP_count: this.form.IP_count,
              is_hunxiao: this.form.is_hunxiao,
              is_pic: this.form.is_pic,
              allow_copy: this.form.allow_copy,
              id: this.updateId
            }
            postCrmRequest("/black/save", qs.stringify(data)).then(res => {
              this.submitLoading = false;
              if (res.success) {
                this.$Message.success("修改成功");
                this.getDataList();
                this.modalVisible = false;
              }
            });
          }
        }
      });
    },
    // 重置
    handleReset() {
      this.$refs.searchForm.resetFields();
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      this.searchForm.sortOrder = "";
      this.searchForm.sortName = "";
      this.getDataList();
    },
    // 查询
    handleSearch() {
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      this.getDataList();
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