
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
        <FormItem label="名称" prop="name">
          <Input v-model="form.name" />
        </FormItem>
        <FormItem label="别名" prop="alias">
          <Input v-model="form.alias" />
        </FormItem>
        <FormItem label="标题" prop="title">
          <Input v-model="form.title" />
        </FormItem>
        <FormItem label="关键字" prop="keywords">
          <Input v-model="form.keywords" />
        </FormItem>
        <FormItem label="活动描述" prop="describe">
          <Input v-model="form.describe" />
        </FormItem>
        <FormItem label="css" prop="css">
          <Input v-model="form.css" />
        </FormItem>
        <FormItem label="channel" prop="channelId">
          <i-select v-model="form.channelId">
            <i-option v-for="item in optionList" :key="item.id" :value="item.id">{{ item.name }}</i-option>
          </i-select>
        </FormItem>
        <FormItem label="blocks" prop="blocks">
          <Select v-model="form.blocks" multiple>
            <Option v-for="item in blockList" :value="item.id" :key="item.id">{{ item.name }}</Option>
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
  name: "webPage",
  data() {
    return {
      optionList: [],
      blockList: [],
      loading: false, // 表单加载状态
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
        title: "",
        keywords: "",
        describe: "",
        css: "",
        channelId: "",
        blocks: [],
      },
      // 表单验证规则
      formValidate: {
       /*  name: [{ required: true, message: "不能为空", trigger: "blur" }],
        alias: [{ required: true, message: "不能为空", trigger: "blur" }], */
        /* channelId: [{ required: true, message: "请选择channel", trigger: "change" }],
        blocks: [{ type: 'array', required: true, message: "请选择blocks", trigger: "change" }] */
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
          title: "标题",
          key: "title",
          align: "center",
        },
        {
          title: "keywords",
          key: "keywords",
          align: "center",
        },
        {
          title: "css",
          key: "css",
          align: "center",
        },
        {
          title: "description",
          key: "description",
          align: "center",
        },
        {
          title: "频道",
          key: "channelName",
          align: "center",
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth: 150,
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
    // 获取所有数据
    getDataList() {
      this.loading = true;
      getCrmRequest("/website/pages/list", this.searchForm).then((res) => {
        if (res.success) {
          this.data = res.result.list;
          this.total = res.result.count;
          this.loading = false;
        }
      });
    },
    // 获取下拉框数据
    getBlockList() {
      getCrmRequest("/website/pages/blocks_list").then((res) => {
        if (res.success) {
          this.blockList = res.result;
        }
      });
    },
    getOptionsList() {
      getCrmRequest("/website/channels/list", {page: -1, size: -1}).then((res) => {
        if (res.success) {
          this.optionList = res.result.list;
        }
      });
    },
    handleCancel() {
      this.modalVisible = false;
    },
    handleSubmit() {
      let data = {
        name: this.form.name,
        alias: this.form.alias,
        title: this.form.title,
        keywords: this.form.keywords,
        describe: this.form.describe,
        css: this.form.css,
        channelId: this.form.channelId,
        blocks: this.form.blocks,
      }
      data.blocks = data.blocks.map(item => {
        return {id: item}
      })
      console.log(data)
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          if (this.modalType == 0) {
            // 添加 避免编辑后传入id等数据 记得删除
            postCrmRequest("/website/pages/add", qs.stringify(data, { arrayFormat: 'repeat' })).then(res => {
              this.submitLoading = false;
              if (res.success) {
                this.$Message.success("操作成功");
                this.getDataList();
                this.modalVisible = false;
              }
            });
          } else {
            // 编辑
            postCrmRequest("/website/pages/update/" + this.updateId, qs.stringify(data, { arrayFormat: 'repeat' })).then(res => {
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
      this.form.blocks = data.blocks.map(item => {
        return item.id
      })
      this.updateId = data.id
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
          removeCrm("/website.Pages/remove/" + [v.id]).then((res) => {
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
    this.getBlockList();
    this.getOptionsList();
  },
};
</script>
<style lang="less" scoped>
.mygrid .ivu-table th {
  text-align: center;
}
</style>