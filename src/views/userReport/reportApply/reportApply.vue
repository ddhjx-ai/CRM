<style lang="less">
@import "./reportApply.less";
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
              style="width: 200px"
            />
          </Form-item>
          <FormItem prop="searchType" class="leftBtnForm" style="width: 100px">
            <Select v-model="searchForm.searchType" placeholder="请选择">
              <Option value="0">用户ID</Option>
              <Option value="1">客服</Option>
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
        <Button @click="handleDel" type="primary" icon="md-trash"
          >批量删除</Button
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
      title="添加"
      v-model="addVisible"
      :mask-closable="false"
      :width="500"
    >
      <Form
        ref="addForm"
        :model="addForm"
        :label-width="110"
        :rules="formValidate"
      >
        <FormItem
          label="用户ID："
          prop="memberId"
          :rules="{
            required: true,
            message: '用户名不能为空',
            blur: 'trigger',
          }"
        >
          <Input v-model="addForm.memberId" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="addVisible = false">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="addSubmit"
          >提交</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import { getCrmRequest, removeCrm, postCrmRequest } from "@/api/crm";
import { validatePrice } from "@/libs/validate";
import qs from "qs";
export default {
  name: "reportApply",
  data() {
    return {
      addForm: {
        memberId: "",
      },
      addVisible: false,
      submitLoading: false,
      loading: true, // 表单加载状态
      searchForm: {
        // 搜索框对应data对象
        page: 1, // 当前页数
        size: 10, // 页面大小
        sortOrder: "",
        sortName: "",
        searchType: "",
        search: "",
      },
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
          minWidth: 100,
          align: "center",
          sortable: true,
        },
        {
          title: "用户id",
          key: "memberId",
          align: "center",
          sortable: true,
          minWidth: 120,
        },
        {
          title: "企业名称",
          key: "2",
          align: "center",
          sortable: true,
          minWidth: 200,
        },
        {
          title: "完成情况",
          // 已收集/未收集，初始都是未收集，已收集会有完成时间
          key: "companyName",
          align: "center",
          sortable: true,
          minWidth: 200,
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  color: "red",
                },
              },
              "未收集"
            );
          },
        },
        {
          title: "客服",
          key: "4",
          align: "center",
          sortable: true,
          minWidth: 120,
        },
        {
          title: "开始时间",
          key: "createDate",
          align: "center",
          sortable: true,
          minWidth: 150,
        },
        {
          title: "完成时间",
          key: "finishDate",
          align: "center",
          sortable: true,
          minWidth: 150,
        },
      ],
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
      this.searchForm.sortName = e.key.replace(/[A-Z]/g, (s) => {
        return "_" + s.toLowerCase();
      });
      this.searchForm.sortOrder = e.order;
      if (e.order == "normal") {
        this.searchForm.sortOrder = "";
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
    },
    changeSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    // 删除
    handleDel() {
      if (this.selectCount <= 0) {
        this.$Message.warning("请选择要删除的数据");
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
        },
      });
    },
    // 添加
    addSubmit() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleAdd() {
      this.addVisible = true;
      this.$refs.addForm.resetFields();
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