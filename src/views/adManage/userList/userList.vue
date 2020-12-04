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
          <Form-item label="快速查找" prop="search">
            <Input
              type="text"
              v-model="searchForm.search"
              placeholder="按名称、创建人查找"
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
        <Button @click="endPlan" type="primary" icon="ios-book-outline"
          >结束所有发布计划</Button
        >
        <Button @click="releasePlan" type="primary" icon="md-book"
          >所有发布计划出账</Button
        >
        <Button @click="addAd" type="primary" icon="md-add-circle"
          >添加广告</Button
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
        <FormItem label="登录名" prop="name">
          <Input v-model="form.name" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handleCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handleSubmit"
          >提交</Button
        >
      </div>
    </Modal>

    <!-- 添加广告弹出框 -->
    <Modal
      title="添加广告"
      v-model="adVisible"
      :mask-closable="false"
      :width="500"
      @on-visible-change="selectClear"
    >
      <Form
        ref="adForm"
        :model="adForm"
        :label-width="80"
        :rules="formValidate"
      >
        <FormItem label="登录名" prop="name">
          <Input v-model="adForm.name" />
        </FormItem>
        <FormItem label="链接地址">
          <Input v-model="adForm.linkUrl" />
        </FormItem>
        <FormItem label="是否可用">
          <RadioGroup v-model="adForm.delFlag">
            <Radio :label="0">no</Radio>
            <Radio :label="1">yes</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="文件类型">
          <Select v-model="adForm.fileType" style="width: 200px">
            <Option :value="0">word</Option>
            <Option :value="1">swf</Option>
            <Option :value="2">flv</Option>
            <Option :value="3">bmp</Option>
            <Option :value="4">gif</Option>
            <Option :value="5">jpg</Option>
            <Option :value="6">png</Option>
            <Option :value="7">other</Option>
          </Select>
        </FormItem>
        <FormItem label="宽度">
          <Input v-model="adForm.width" />
        </FormItem>
        <FormItem label="高度">
          <Input v-model="adForm.height" />
        </FormItem>
        <FormItem label="活动描述">
          <Input
            v-model="adForm.describe"
            placeholder="请输入..."
            type="textarea"
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="adCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="adSubmit"
          >提交</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import { getCrmRequest, deleteCrm, postCrmRequest } from "@/api/crm";
import { validatePrice } from "@/libs/validate";
import qs from "qs";
export default {
  name: "userList",
  data() {
    return {
      openTip: false, // 显示提示
      loading: false, // 表单加载状态
      searchForm: {
        // 搜索框对应data对象
        page: 1, // 当前页数
        size: 10, // 页面大小
        search: "",
      },
      modalType: 0, // 添加或编辑标识
      modalVisible: false, // 添加或编辑显示
      modalTitle: "", // 添加或编辑标题
      adVisible: false, // 广告弹出框
      form: {
        // 添加或编辑表单对象初始化数据
        name: "",
      },
      adForm: {
        name: "",
        linkAddress: "",
        delFlag: 0,
        fileType: 0,
        width: 0,
        height: 0,
        description: "",
      },
      // 表单验证规则
      formValidate: {
        price: [
          { required: true, message: "价格不能为空", trigger: "blur" },
          { validator: validatePrice, trigger: "blur" },
        ],
        amount: [
          { required: true, message: "金额不能为空", trigger: "blur" },
          { validator: validatePrice, trigger: "blur" },
        ],
        owner: [{ required: true, message: "请选择一个业主", trigger: "blur" }],
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
          width: 120,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "text",
                  size: "small",
                },
                style: {
                  color: "#2e68a7",
                },
                on: {
                  click: () => {
                    this.toAddList(params.row);
                  },
                },
              },
              `${params.row.id}`
            );
          },
        },
        {
          title: "名称",
          key: "name",
          align: "center",
        },
        {
          title: "创建人",
          key: "createOpr",
          align: "center",
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
              h(
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
              ),
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
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },
    getDataList() {
      this.loading = true;
      // 请求后端获取表单数据 请自行修改接口
      getCrmRequest("/ad/yz/list", this.searchForm).then((res) => {
        if (res.success) {
          this.loading = false;
          this.data = res.result.list;
          this.total = res.result.total;
        }
      });
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

    handleCancel() {
      this.modalVisible = false;
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          if (this.modalType == 0) {
            // 添加
            postCrmRequest("/ad/yz/add", qs.stringify(this.form)).then((res) => {
              this.submitLoading = false;
              if (res.success) {
                this.$Message.success("添加成功");
                this.getDataList();
                this.modalVisible = false;
              } else {
                this.$Message.error("添加失败");
                this.getDataList();
                this.modalVisible = false;
              }
            });
          } else {
            // 编辑
            let data = {
              name: this.form.name
            }
            postCrmRequest("/ad/yz/update/" + this.updateId, qs.stringify(data)).then(
              (res) => {
                this.submitLoading = false;
                if (res.success) {
                  this.$Message.success("编辑成功");
                  this.getDataList();
                  this.modalVisible = false;
                } else {
                  this.$Message.error("编辑失败");
                  this.getDataList();
                  this.modalVisible = false;
                }
              }
            );
          }
        }
      });
    },
    add() {
      this.modalType = 0;
      this.modalTitle = "添加";
      this.$refs.form.resetFields();
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
      this.$Modal.confirm({
        title: "确认删除",
        // 记得确认修改此处
        content: "您确认要删除 " + v.name + " ?",
        loading: true,
        onOk: () => {
          // 删除
          deleteCrm("/ad/yz/delete/" + v.id).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              this.getDataList();
            }
          });
        },
      });
    },
    // 发布计划出账
    releasePlan() {
      return
      if (this.selectCount <= 0) {
        this.$Message.warning("请选择一条数据");
        return;
      } else if (this.selectCount != 1) {
        this.$Message.warning("只能选择一条信息进行操作！");
        return;
      }
      var id = this.selectList[0].id;
      getCrmRequest("/ad.FaBuJiHuas/chuzhang", qs.stringify({ yzId: id })).then(
        () => {
          this.$Message.success("操作成功");
          this.getDataList();
        }
      );
    },
    // 结束所有发布计划
    endPlan() {
      return
      if (this.selectCount <= 0) {
        this.$Message.warning("请选择一条数据");
        return;
      } else if (this.selectCount != 1) {
        this.$Message.warning("只能选择一条信息进行操作！");
        return;
      }
      var id = this.selectList[0].id;
      getCrmRequest(
        "/ad.FaBuJiHuas/toOverAll",
        qs.stringify({ yzId: id })
      ).then(() => {
        this.$Message.success("操作成功");
        this.getDataList();
      });
    },
    // 添加广告
    addAd() {
      if (this.selectCount <= 0) {
        this.$Message.warning("请选择一条数据");
        return;
      } else if (this.selectCount != 1) {
        this.$Message.warning("只能选择一条数据进行操作！");
        return;
      }
      this.adVisible = true;
      this.$refs.adForm.resetFields();
    },
    adSubmit() {
      this.submitLoading = true;
      let data = {
        name: this.adForm.name,
        alias: "",
        title: "",
        yezhuId: this.selectList[0].id,
        linkAddress: this.adForm.linkAddress,
        width: this.adForm.width,
        height: this.adForm.height,
        delFlag: this.adForm.delFlag,
        description: this.adForm.description,
        fileType: this.adForm.fileType,
      };
      postCrmRequest("/ad/yz/add_gg", data).then((res) => {
        this.submitLoading = false;
        if (res.success) {
          this.$Message.success("添加成功");
          this.getDataList();
          this.adVisible = false;
        } else {
          this.$Message.error("添加失败");
          this.getDataList();
          this.adVisible = false;
        }
      });
    },
    adCancel() {
      this.adVisible = false;
    },
    // 跳转到业主广告列表页
    toAddList(row) {
      var id = row.id;
      this.$router.push({
        name: "adAllList-index",
        query: {
          id,
        },
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
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      this.$refs.searchForm.resetFields();
      this.getDataList();
    },
    selectClear(v) {
      if (!v) {
        this.clearSelectAll();
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>