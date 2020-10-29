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
          <Form-item label="快速查找" prop="memberId">
            <Input
              type="text"
              v-model="searchForm.memberId"
              placeholder="根据用户ID查找"
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
      <!-- <Row class="operation" style="margin-bottom: 10px">
        <Button @click="handleShow" type="primary">显示</Button>
        <Button @click="getDataList" icon="md-refresh">刷新</Button>
      </Row> -->
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
          :page-size-opts="[10,20,50]"
          size="small"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </Row>
    </Card>

    <Modal title="编辑" v-model="editVisible" :mask-closable="false" :width="500">
      <Form ref="editForm" :model="editForm" :label-width="100" :rules="formValidate">
        <FormItem label="关键词：" prop="keyword">
          <Input v-model="editForm.keyword" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="editVisible = false">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="editSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getCrmRequest, removeCrm, postCrmRequest, putCrmRequest } from "@/api/crm";
import { validatePrice } from "@/libs/validate";
import qs from "qs";
export default {
  name: "userEdit",
  data() {
    return {
      editVisible: false,
      editForm: {
        keyword: "",
      },
      submitLoading: false,
      loading: false, // 表单加载状态
      searchForm: {
        // 搜索框对应data对象
        page: 1, // 当前页数
        size: 10, // 页面大小
        memberId: "",
        sortOrder: "",
        sortName: "",
      },
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      columns: [
        // 表头
        {
          type: "index",
          width: 100,
          align: "center",
          title: '序号'
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
          title: "搜索次数",
          key: "seachCount",
          align: "center",
          sortable: true,
          minWidth: 120,
        },
        {
          title: "是否显示",
          key: "isShow",
          align: "center",
          sortable: true,
          minWidth: 120,
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: params.row.isShow === 1 ? "success" : 'error',
                },
                on: {
                  click: () => {
                    this.handleShow(params.row);
                  },
                },
              },
              params.row.isShow===1 ? "显示" : "不显示"
            );
          },
        },
        {
          title: "关键词",
          key: "keyword",
          align: "center",
          sortable: true,
          minWidth: 280
        },

        {
          title: "操作",
          key: "action",
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
                    icon: "ios-create-outline",
                  },
                  style: {
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
                    icon: "md-trash",
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
      updateId:''
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
      postCrmRequest(
        "/up/report/year/aimuser_list",
        qs.stringify(this.searchForm)
      ).then((res) => {
        if (res.success) {
          this.loading = false;
          this.data = res.result.list;
          this.total = res.result.total;
        }
      });
    },
    changeSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    handleShow(v) {
      let data = {
        isShow: v.isShow ? 0 : 1,
      };
      this.$Modal.confirm({
        title: "提示",
        content: "您确认要改变该数据的显示状态?",
        loading: true,
        onOk: () => {
          putCrmRequest("/up/report/year/aimuser_update/" + v.id, data).then(
            (res) => {
              this.$Modal.remove();
              if (res.success) {
                this.$Message.success("操作成功");
                this.getDataList();
              }
            }
          );
        },
      });
    },
    // 编辑
    editSubmit() {
      putCrmRequest("/up/report/year/aimuser_update/" + this.updateId, {
        keyword: this.editForm.keyword,
      }).then((res) => {
        if (res.success) {
          this.$Message.success("操作成功");
          this.editVisible = false;
          this.getDataList();
        }
      });
    },
    // 获取商品详情
    edit(v) {
      this.$refs.editForm.resetFields();
      this.editVisible = true;
      this.editForm.keyword = v.keyword;
      this.updateId = v.id;
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
      this.searchForm.sortOrder = "";
      this.searchForm.sortName = "";
      this.getDataList();
    },
  },
  mounted() {
    this.init();
  },
};
</script>