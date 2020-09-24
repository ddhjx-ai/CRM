<style lang="less">
@import "./webData.less";
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

    <Modal :title="modalTitle" v-model="modalVisible" :mask-closable="false" :width="600">
      <Form ref="form" :model="form" :label-width="150" :rules="formValidate">
        <FormItem label="登录名" prop="name">
          <Input v-model="form.name" />
        </FormItem>
        <FormItem label="别名" prop="alias">
          <Input v-model="form.alias" />
        </FormItem>
        <FormItem label="sphinx_query" prop="sphinx_query">
          <Input v-model="form.sphinx_query" />
        </FormItem>
        <FormItem label="sphinx_table_name" prop="sphinx_table_name" v-if="modalType">
          <Input v-model="form.sphinx_table_name" />
        </FormItem>
        <FormItem label="sphinx_table_name2" prop="sphinx_table_name2" v-if="modalType">
          <Input v-model="form.sphinx_table_name2" />
        </FormItem>
        <FormItem label="sphinx_area" prop="sphinx_area" v-if="modalType">
          <Input v-model="form.sphinx_area" />
        </FormItem>
        <FormItem label="sphinx_cate" prop="sphinx_cate" v-if="modalType">
          <Input v-model="form.sphinx_cate" />
        </FormItem>
        <FormItem label="sphinx_classaid" prop="sphinx_classaid" v-if="modalType">
          <Input v-model="form.sphinx_classaid" />
        </FormItem>
        <FormItem label="query" prop="query">
          <Input v-model="form.query" />
        </FormItem>
        <FormItem label="任务地址" prop="url">
          <Input v-model="form.url" />
        </FormItem>
        <FormItem label="rp" prop="rp">
          <Input v-model="form.rp" />
        </FormItem>
        <FormItem label="is_show_description" prop="isShowDescription">
          <Checkbox v-model="form.isShowDescription"></Checkbox>
        </FormItem>
        <FormItem label="is_show_total" prop="isShowTotal">
          <Checkbox v-model="form.isShowTotal"></Checkbox>
        </FormItem>
        <FormItem label="页面" prop="pages">
          <Select v-model="form.pages" multiple>
            <Option v-for="item in optionList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            <!-- <Option value="1">1</Option>
            <Option value="12">12</Option> -->
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
import {
  validateNum,
} from "@/libs/validate";
export default {
  name: "webData",
  data() {
    return {
      optionList: [],
      openTip: false, // 显示提示
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
        query: "",
        sphinx_query: "",
        sphinx_table_name: '',
        sphinx_table_name2: '',
        sphinx_area:'',
        sphinx_cate: '',
        sphinx_classaid: '',
        url: "",
        rp: 0,
        isShowDescription: false,
        isShowTotal: false,
        pages: [],
      },
      // 表单验证规则
      formValidate: {
        /* name: [{ required: true, message: "不能为空", trigger: "blur" }],
        alias: [{ required: true, message: "不能为空", trigger: "blur" }],
        rp: [
          { validator: validateNum, trigger: "blur" },
        ], */
        /* pages: [
          {type: 'array', required: true, message: "不能为空", trigger: "blur" }
        ] */
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
          key: "name",
          align: "center",
        },
        {
          title: "别名",
          key: "alias",
          align: "center",
        },
        {
          title: "sql语句",
          key: "query",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  title: params.row.query,
                },
                class: "spanDom",
                domProps: {
                  title: params.row.query,
                },
              },
              params.row.query
            );
          },
        },
        {
          title: "sphinx_sql语句",
          key: "sphinx_query",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  title: params.row.sphinx_query,
                },
                class: "spanDom",
                domProps: {
                  title: params.row.sphinx_query,
                },
              },
              params.row.sphinx_query
            );
          },
        },
        {
          title: "地址",
          // key: "url",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  title: params.row.url,
                },
                class: "spanDom",
                domProps: {
                  title: params.row.url,
                },
              },
              params.row.url
            );
          },
        },
        {
          title: "显示条数",
          key: "rp",
          align: "center",
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth: 120,
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
      updateId: '',
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
      getCrmRequest("/website/blocks/list", this.searchForm).then((res) => {
        if (res.success) {
          this.data = res.result.list;
          this.total = res.result.count;
          this.loading = false;
        }
      });
    },
    getOptionsList() {
      getCrmRequest("/website/blocks/pages_list").then((res) => {
        if (res.success) {
          this.optionList = res.result;
        }
      });
    },
    handleCancel() {
      this.modalVisible = false;
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          if (this.modalType == 0) {
            let data = {
              name: this.form.name,
              alias: this.form.alias,
              query: this.form.query,
              sphinx_query: this.form.sphinx_query,
              url: this.form.url,
              rp: this.form.rp,
              isShowDescription: this.form.isShowDescription,
              isShowTotal: this.form.isShowTotal,
              pages: this.form.pages
            }
            data.pages = data.pages.map(item => {
              return {id: item}
            })
            console.log(data)
            // 添加 避免编辑后传入id等数据 记得删除
            postCrmRequest("/website/blocks/add", qs.stringify(data)).then(res => {
              this.submitLoading = false;
              if (res.success) {
                this.$Message.success("操作成功");
                this.getDataList();
                this.modalVisible = false;
              }
            });
          } else {
            // 编辑
            let data = {
              name: this.form.name,
              alias: this.form.alias,
              query: this.form.query,
              sphinx_query: this.form.sphinx_query,
              url: this.form.url,
              rp: this.form.rp,
              isShowDescription: this.form.isShowDescription,
              isShowTotal: this.form.isShowTotal,
              pages: this.form.pages,
              sphinx_table_name: this.form.sphinx_table_name,
              sphinx_table_name2: this.form.sphinx_table_name2,
              sphinx_area: this.form.sphinx_area,
              sphinx_cate: this.form.sphinx_cate,
              sphinx_classaid: this.form.sphinx_classaid
            }
            data.pages = data.pages.map(item => {
              return {id: item}
            })
            console.log(data)
            postCrmRequest("/website/blocks/update/" + this.updateId, qs.stringify(data)).then(res => {
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
      delete this.form.id;
      this.modalVisible = true;
    },
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
      this.form.pages = data.pages.map((item) => {
        return item.id;
      });
      this.updateId = data.id
      this.modalVisible = true;
    },
    remove(v) {
      console.log(v);
      this.$Modal.confirm({
        title: "确认删除",
        // 记得确认修改此处
        content: "您确认要删除 " + v.name + " ?",
        loading: true,
        onOk: () => {
          // 删除
          removeCrm("/website/blocks/del/" + [v.id]).then((res) => {
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
    this.getOptionsList();
  },
};
</script>
<style lang="less" scoped>
.mygrid .ivu-table th {
  text-align: center;
}
</style>