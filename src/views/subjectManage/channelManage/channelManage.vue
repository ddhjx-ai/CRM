<template>
  <div>
    <Card>
      <Row>
        <Form
          ref="searchForm"
          :model="searchForm"
          inline
          :label-width="80"
          label-position="left"
        >
          <Form-item label="关键词" prop="search">
            <Input
              type="text"
              placeholder="请输入频道名、描述、主题"
              v-model="searchForm.search"
              clearable
              style="width: 200px"
            />
          </Form-item>
          <Form-item style="margin-left: -35px" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search"
              >搜索</Button
            >
            <Button @click="handleReset">重置</Button>
          </Form-item>
        </Form>
      </Row>
      <Row class="operation" style="margin-bottom: 10px">
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
        <FormItem label="频道名" prop="channelName">
          <Input
            v-model="form.channelName"
            placeholder="请输入频道名，如 xx频道"
          />
        </FormItem>
        <FormItem label="描述" prop="description">
          <Input v-model="form.description" />
        </FormItem>
        <FormItem label="是否禁用" prop="isDeleted">
          <i-switch
            size="large"
            v-model="form.isDeleted"
            :true-value="0"
            :false-value="1"
          >
            <span slot="open">启用</span>
            <span slot="close">禁用</span>
          </i-switch>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handleCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handleSubmit"
          >提交</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  getChanelList,
  channelNameAdd,
  channelUpdate,
  themeBlockId,
} from "@/api/channel.js";
import qs from "qs";
export default {
  name: "channelManage",
  data() {
    return {
      loading: false,
      submitLoading: false,
      columns: [
        {
          type: "index",
          title: "序号",
          width: 70,
          align: "center",
        },
        {
          title: "频道名",
          key: "channelName",
          align: "center",
          render: (h, params) => {
            return h(
              "a",
              {
                style: {
                  "text-decoration": "none",
                },
                on: {
                  click: () => {
                    this.locationTo(params.row);
                  },
                },
              },
              params.row.channelName
            );
          },
        },
        {
          title: "描述",
          key: "description",
          align: "center",
        },
        {
          title: "主题",
          key: "themeName",
          align: "center",
        },
        {
          title: "创建时间",
          key: "inTime",
          align: "center",
          render: (h, params) => {
            return h("div", {}, this.formateDate(params.row.inTime));
          },
        },
        {
          title: "状态",
          key: "isDeleted",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h(
              "Tag",
              {
                props: {
                  color: params.row.isDeleted ? "error" : "success",
                },
              },
              params.row.isDeleted ? "禁用" : "启用"
            );
          },
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 180,
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
      data: [],
      total: 0, // 表单数据总数
      searchForm: {
        page: 1,
        size: 10,
        search: "",
      },
      form: {
        // 添加或编辑表单对象初始化数据
        channelName: "",
        isDeleted: 0,
        description: "",
      },
      formValidate: {
        channelName: [
          { required: true, message: "频道名不能为空", trigger: "blur" },
        ],
      },
      modalType: 0, // 添加或编辑标识
      modalVisible: false, // 添加或编辑显示
      modalTitle: "", // 添加或编辑标题
      updateId: "",
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    // 时间格式化
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
    },
    changesize(v) {
      this.searchForm.size = v;
      this.getDataList();
    },
    getDataList() {
      this.loading = true;
      getChanelList(this.searchForm).then((res) => {
        if (res.success) {
          this.data = res.result.list;
          this.total = res.result.count;
          this.loading = false;
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
    // 跳转到block页面
    locationTo(v){
      this.$router.push({
        name: 'blocksManage',
        query: {
          id: v.id
        }
      })
    },
    // 提交
    handleSubmit() {
      let id;
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          if (this.modalType == 0) {
            // 添加 避免编辑后传入id等数据 记得删除
            channelNameAdd(qs.stringify(this.form))
              .then((res) => {
                this.submitLoading = false;
                if (res.success) {
                  this.$Message.success("添加成功");
                  this.getDataList();
                  this.modalVisible = false;
                  /* id = res.result.id;
                  return themeBlockId(
                    qs.stringify({ channelId: res.result.id, blockType: 1 })
                  ); */
                }
              })
              /* .then((e) => {
                if (e.success) {
                  sessionStorage.clear();
                  this.$router.push({
                    name: "blocksManage",
                    query: {
                      id: id,
                      themeId: e.result,
                    },
                  });
                  this.$Message.success("操作成功");
                  this.getDataList();
                  this.modalVisible = false;
                }
              }); */
          } else {
            // 编辑
            postCrmRequest(
              "/website/pages/update/" + this.updateId,
              qs.stringify(data)
            ).then((res) => {
              this.submitLoading = false;
              if (res.success) {
                this.$Message.success("编辑成功");
                this.getDataList();
                this.modalVisible = false;
              }
            });
          }
        }
      });
    },
    // 删除
    remove(v) {
      this.$Modal.confirm({
        title: "确认删除",
        // 记得确认修改此处
        content: "您确认要删除该频道?",
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
    // 搜索
    handleSearch() {
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      // 重新加载数据
      this.getDataList();
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