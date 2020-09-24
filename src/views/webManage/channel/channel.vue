<style lang="less">
</style>
<template>
  <div class="search">
    <Card>
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
        <FormItem label="登录名" prop="name">
          <Input v-model="form.name" />
        </FormItem>
        <FormItem label="别名" prop="alias">
          <Input v-model="form.alias" />
        </FormItem>
        <FormItem label="site" prop="siteId">
          <Select v-model="form.siteId" >
            <Option v-for="item in optionList" :key="item" :value="item.id">{{ item.name }}</Option>
          </Select>
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
import { getCrmRequest, removeCrm, postCrmRequest } from "@/api/crm";
import qs from "qs";
export default {
  name: "channel",
  data() {
    return {
      optionList: [
        {
          value: "",
          label: "none",
        },
        {
          value: "1",
          label: "chinabidding_en",
        },
        {
          value: "2",
          label: "cblseo",
        },
        {
          value: "3",
          label: "sbiao_wap",
        },
        {
          value: "4",
          label: "sbiao_seo",
        },
        {
          value: "5",
          label: "sbiao_cn",
        },
        {
          value: "6",
          label: "cblcn",
        },
        {
          value: "7",
          label: "touch",
        },
        {
          value: "8",
          label: "cblcomcn",
        },
        {
          value: "9",
          label: "gys",
        },
      ],
      loading: true, // 表单加载状态
      searchForm: {
        // 搜索框对应data对象
        page: 1, // 当前页数
        size: 10, // 页面大小
      },
      modalType: 0, // 添加或编辑标识
      modalVisible: false, // 添加或编辑显示
      modalTitle: "", // 添加或编辑标题
      form: {
        // 添加或编辑表单对象初始化数据
        name: "",
        alias: "",
        siteId: "",
      },
      // 表单验证规则
      formValidate: {
        /* name: [{ required: true, message: "不能为空", trigger: "blur" }],
        alias: [{ required: true, message: "不能为空", trigger: "blur" }], */
        // siteId: [{type: 'number', required: true, message: "请选择站点", trigger: "change" }]
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
          width: 80,
          align: "center",
        },
        {
          title: "名称",
          align: "center",
          key: "name",
        },
        {
          title: "别名",
          key: "alias",
          align: "center",
        },
        {
          title: "站点",
          key: "siteName",
          align: "center",
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
                    icon: "ios-create-outline",
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
                    icon: "md-trash",
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
    getOptionsList() {
      getCrmRequest("/website/sites/list", { page: -1, size: -1 }).then(
        (res) => {
          if (res.success) {
            this.optionList = res.result.list;
          }
        }
      );
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
      getCrmRequest("/website/channels/list", this.searchForm).then((res) => {
        if (res.success) {
          this.data = res.result.list;
          this.total = res.result.count;
          this.loading = false;
        }
      });
    },
    handleCancel() {
      this.modalVisible = false;
    },
    handleSubmit() {
       /* postCrmRequest("/website/channels/add", qs.stringify({name: 'a', a: [{id:1}, {id:2}] }, { arrayFormat: 'repeat' }))
       postCrmRequest("/website/channels/add", qs.stringify({name: 'a', a: [{id:1}, {id:2}] }, { arrayFormat: 'indices' }))
       postCrmRequest("/website/channels/add", qs.stringify({name: 'a', a: [{id:1}, {id:2}] }, { arrayFormat: 'brackets' }))
       postCrmRequest("/website/channels/add", qs.stringify({name: 'a', a: [{id:1}, {id:2}] }, {arrayFormat: 'indices', allowDots: true})) */
      //  postCrmRequest("/website/channels/add", JSON.stringify({name: 'a', a: [{id:1}, {id:2}] }))
      console.log(this.form);
      let data = {
        name: this.form.name,
        alias: this.form.alias,
        siteId: this.form.siteId,
      };
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          if (this.modalType == 0) {
            // 添加 避免编辑后传入id等数据 记得删除
            postCrmRequest("/website/channels/add", qs.stringify(data)).then(
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
              "/website/channels/update/" + this.updateId,
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
    add() {
      this.modalType = 0;
      this.modalTitle = "添加";
      this.$refs.form.resetFields();
      this.getOptionsList();
      this.modalVisible = true;
    },
    edit(v) {
      this.modalType = 1;
      this.modalTitle = "编辑";
      this.$refs.form.resetFields();
      this.getOptionsList();
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
    remove(v) {
      this.$Modal.confirm({
        title: "确认删除",
        // 记得确认修改此处
        content: "您确认要删除 " + v.name + " ?",
        loading: true,
        onOk: () => {
          // 删除
          removeCrm("/website/channels/del/" + [v.id]).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              this.getDataList();
            }
          });
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
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
.mygrid .ivu-table th {
  text-align: center;
}
</style>