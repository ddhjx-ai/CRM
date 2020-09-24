<template>
  <div class="app_container">
    <Card>
      <Row class="operation" style="margin-bottom:10px">
        <Form ref="searchForm" :model="searchForm" inline :label-width="80" label-position="right">
          <Form-item label="用户名" prop="loginId">
            <Input type="text" v-model="searchForm.loginId" clearable style="width: 200px;" />
          </Form-item>
          <Form-item style="margin-left:-35px;" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search">查询</Button>
            <Button @click="handleReset">重置</Button>
          </Form-item>
        </Form>
      </Row>
      <Row class="operation" style="margin-bottom:10px">
        <Button @click="add" type="primary" icon="md-add">添加</Button>
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

    <Modal :title="modalTitle" v-model="modalVisible" :mask-closable="false" :width="500">
      <Form ref="form" :model="form" :label-width="80" :rules="formValidate">
        <FormItem label="用户名" prop="loginId">
          <Input v-model="form.loginId" />
        </FormItem>
        <FormItem label="描述" prop="comments">
          <Input v-model="form.comments" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handleCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handleSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { validateIP } from "@/libs/validate";
export default {
  name: "userWhiteList",
  data() {
    return {
      searchForm: {
        page: 1,
        size: 10,
        loginId: "",
      },
      data: [
        {
          comments: "测试1",
          id: 1,
          lastModify: 1562033181000,
          loginId: "zhanghaitao",
          memberId: 7927182,
        },
        {
          comments: "测试2",
          id: 2,
          lastModify: 1562033234000,
          loginId: "wangwu",
          memberId: 4400571,
        },
      ],

      total: 0,
      columns: [
        {
          type: "index",
          title: "序号",
          width: 70,
          align: "center",
        },
        {
          title: "用户名",
          key: "loginId",
          minWidth: 150,
          align: "center",
        },
        {
          title: "描述",
          key: "comments",
          minWidth: 150,
          align: "center",
        },
        {
          title: "最后修改时间",
          key: "lastModify",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            return h("div", {}, this.formateDate(params.row.lastModify));
          },
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 150,
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
      loading: false,
      modalType: 0, // 添加或编辑标识
      modalVisible: false, // 添加或编辑显示
      modalTitle: "", // 添加或编辑标题
      form: {
        // 添加或编辑表单对象初始化数据
        loginId: "",
        comments: "",
      },
      formValidate: {
        loginId: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
        ],
      },
      updateId: "",
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    //   时间处理
    formateDate(date) {
      date = new Date(date);
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");
      let hour = date.getHours().toString().padStart(2, "0");
      let minute = date.getMinutes().toString().padStart(2, "0");
      let second = date.getSeconds().toString().padStart(2, "0");

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
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    // 获取列表数据
    getDataList() {},
    // 重置
    handleReset() {
      this.$refs.searchForm.resetFields();
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      // 重新加载数据
      this.getDataList();
    },
    // 查询
    handleSearch() {},
    // 添加
    add() {
      this.modalType = 0;
      this.modalTitle = "添加";
      this.$refs.form.resetFields();
      this.modalVisible = true;
    },
    // 编辑
    edit(v) {
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
      this.updateId = data.id;
      this.modalVisible = true;
    },
    handleCancel() {
      this.modalVisible = false;
    },
    // 搜索
    handleSearch() {
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      let data = {
        ...this.searchForm,
      };
      this.loading = true;
      searchProduct(data).then((res) => {
        this.loading = false;
        if (res.success) {
          this.data = res.result.itemList;
          this.total = res.result.count;
        }
      });
    },
    // 删除
    remove(v) {
      console.log(v);
      this.$Modal.confirm({
        title: "确认删除",
        // 记得确认修改此处
        content: "您确认要删除 " + v.name + " ?",
        loading: true,
        onOk: () => {
          // 模拟请求成功
          removeCrm("/website/sites" + [v.id]).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              this.getDataList();
            }
          });
        },
      });
    },
    // 提交
    handleSubmit() {
      console.log(this.form);
      let data = {
        ipRaw: this.form.ipRaw,
        comments: this.form.comments,
      };
      console.log(data);
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          if (this.modalType == 0) {
            // 添加 避免编辑后传入id等数据 记得删除
            postCrmRequest("/website/sites/add", qs.stringify(this.form)).then(
              (res) => {
                this.submitLoading = false;
                if (res.success) {
                  this.$Message.success("操作成功");
                  this.getDataList();
                  this.modalVisible = false;
                }
              }
            );
          } else {
            // 编辑
            postCrmRequest(
              "/website/sites/update/" + this.updateId,
              qs.stringify(data)
            ).then((res) => {
              this.submitLoading = false;
              if (res.success) {
                this.$Message.success("操作成功");
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
      // 重新加载数据
      this.getDataList();
    },
  },
};
</script>

<style scoped lang="less">
</style>