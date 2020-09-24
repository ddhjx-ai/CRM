<template>
  <div>
    <Card>
      <Row>
        <Form ref="searchForm" :model="searchForm" inline :label-width="90" label-position="left">
          <Form-item label="主题名称" prop="name">
            <Input
              type="text"
              v-model="searchForm.name"
              clearable
              placeholder="请输入主题名"
              style="width: 200px;"
            />
          </Form-item>
          <Form-item style="margin-left:-35px;" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
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

    <Modal :title="modalTitle" v-model="modalVisible" :mask-closable="false" :width="600">
      <Form ref="form" :model="form" :label-width="120" :rules="formValidate">
        <FormItem label="主题名" prop="name">
          <Input v-model="form.name" placeholder="请输入主题名" />
        </FormItem>
        <FormItem label="是否禁用" prop="isDeleted">
          <i-switch size="large" v-model="form.isDeleted" :true-value="0" :false-value="1">
            <span slot="open">启用</span>
            <span slot="close">禁用</span>
          </i-switch>
        </FormItem>
        <FormItem label="主题色" prop="themeColor">
          <!-- <Input v-model="form.themeColor" placeholder="请输入颜色，如 #aabbcc" /> -->
          <ColorPicker v-model="form.themeColor" />
        </FormItem>
        <FormItem label="关键词背景色" prop="keyColor" style="width:100%">
          <!-- <Input v-model="form.keyColor" placeholder="请输入颜色，如 #aabbcc" /> -->
          <ColorPicker v-model="form.keyColor" />
        </FormItem>
        <FormItem label="分类图标" prop="distributeImg">
          <Input v-model="form.distributeImg" placeholder="请输入图标路径" />
        </FormItem>
        <FormItem label="分类hover图标" prop="distributeHoverImg">
          <Input v-model="form.distributeHoverImg" placeholder="请输入图标路径" />
        </FormItem>
        <FormItem label="下载图标" prop="enclosureImg">
          <Input v-model="form.enclosureImg" placeholder="请输入图标路径" />
        </FormItem>
        <FormItem label="下载hover图标" prop="enclosureHoverImg">
          <Input v-model="form.enclosureHoverImg" placeholder="请输入图标路径" />
        </FormItem>
        <FormItem label="注册图标" prop="registerImg">
          <Input v-model="form.registerImg" placeholder="请输入图标路径" />
        </FormItem>
        <FormItem label="登录图标" prop="loginImg">
          <Input v-model="form.loginImg" placeholder="请输入图标路径" />
        </FormItem>
        <FormItem label="发公告图标" prop="publishImg">
          <Input v-model="form.publishImg" placeholder="请输入图标路径" />
        </FormItem>
        <FormItem label="商务室图标" prop="busroomImg">
          <Input v-model="form.busroomImg" placeholder="请输入图标路径" />
        </FormItem>
        <FormItem label="彩钻商城图标" prop="mallImg">
          <Input v-model="form.mallImg" placeholder="请输入图标路径" />
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
import {
  getThemeList,
  themeAdd,
  themeUpdate,
  themeDel,
} from "@/api/channel.js";
import qs from "qs";
export default {
  name: "themeManage",
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
          fixed: "left",
        },
        {
          title: "主题名",
          key: "name",
          align: "center",
          fixed: "left",
           width: 100,
        },
        {
          title: "主题色",
          key: "themeColor",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h("Tag", {
              style: {
                backgroundColor: params.row.themeColor,
                "border-radius": "5px",
              },
            });
          },
        },
        {
          title: "关键词背景色",
          key: "keyColor",
          align: "center",
           width: 100,
          render: (h, params) => {
            return h("Tag", {
              style: {
                backgroundColor: params.row.keyColor,
                "border-radius": "5px",
              },
            });
          },
        },
        {
          title: "分类图标",
          key: "distributeImg",
          align: "center",
          minWidth: 120,
        },
        {
          title: "分类hover图标",
          key: "distributeHoverImg",
          align: "center",
          minWidth: 120,
        },
        {
          title: "注册图标",
          key: "registerImg",
          align: "center",
          minWidth: 120,
        },
        {
          title: "登录图标",
          key: "loginImg",
          align: "center",
          minWidth: 120,
        },
        {
          title: "发公告图标",
          key: "publishImg",
          align: "center",
          minWidth: 120,
        },
        {
          title: "商务室图标",
          key: "busroomImg",
          align: "center",
          minWidth: 120,
        },
        {
          title: "彩钻商城图标",
          key: "mallImg",
          align: "center",
          minWidth: 120,
        },
        {
          title: "下载图标",
          key: "enclosureImg",
          align: "center",
          minWidth: 120,
        },
        {
          title: "下载hover图标",
          key: "enclosureHoverImg",
          align: "center",
          minWidth: 120,
        },
        {
          title: "状态",
          key: "isDeleted",
          align: "center",
          width: 100,
          render: (h, params) =>{
            return h("Tag", {
              props: {
                color: params.row.isDeleted ? 'error' : 'success'
              },
            }, params.row.isDeleted ? '禁用' : '启用');
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 160,
          fixed: "right",
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
      data: [
        {
          busroom_img: "../img/channel/health/shangwushi.png",
          distribute_hover_img: "../img/channel/health/ylzt_cont_icon1.png",
          distribute_img: "../img/channel/white_arrow02.png",
          enclosure_hover_img:
            "../img/channel/health/ylzt_cont_icon_xzhover.png",
          enclosure_img: "../img/channel/zt_cont_icon_xz.png",
          id: 1,
          is_deleted: 0,
          key_color: "#e3fdff",
          light_color: "#19d8e4",
          login_img: "../img/channel/health/ylsy_cont_icon4.png",
          mall_img: "../img/channel/health/shangcheng.png",
          name: "浅青色",
          publish_img: "../img/channel/health/ylsy_cont_icon5.png",
          register_img: "../img/channel/health/ylsy_cont_icon3.png",
          theme_color: "#0ec0cb",
        },
        {
          busroom_img: "../img/channel/electric/shangwushi.png",
          distribute_hover_img: "../img/channel/zt_cont_icon_hover_e.png",
          distribute_img: "../img/channel/white_arrow02.png",
          enclosure_hover_img:
            "../img/channel/education/jyzt_cont_icon_xzhover.png",
          enclosure_img: "../img/channel/zt_cont_icon_xz.png",
          id: 4,
          is_deleted: 0,
          key_color: "#e5fffc",
          light_color: "#3cb6a4",
          login_img: "../img/channel/sy_cont_icon_e4.png",
          mall_img: "../img/channel/electric/shangcheng.png",
          name: "国网绿",
          publish_img: "../img/channel/sy_cont_icon_e5.png",
          register_img: "../img/channel/sy_cont_icon_e3.png",
          theme_color: "#2c9686",
        },
      ],
      total: 0, // 表单数据总数
      searchForm: {
        page: 1,
        size: 10,
        name: "",
      },
      form: {
        // 添加或编辑表单对象初始化数据
        name: "",
        themeColor: "",
        keyColor: "",
        busroomImg: "",
        distributeHoverImg: "",
        distributeImg: "",
        enclosureHoverImg: "",
        enclosureImg: "",
        mallImg: "",
        publishImg: "",
        registerImg: "",
        loginImg: "",
        isDeleted: 0,
      },
      formValidate: {
        name: { required: true, message: "该项不能为空", trigger: "blur" },
        themeColor: {
          required: true,
          message: "该项不能为空",
          trigger: "blur",
        },
        keyColor: { required: true, message: "该项不能为空", trigger: "blur" },
        busroomImg: {
          required: true,
          message: "该项不能为空",
          trigger: "blur",
        },
        distributeHoverImg: {
          required: true,
          message: "该项不能为空",
          trigger: "blur",
        },
        distributeImg: {
          required: true,
          message: "该项不能为空",
          trigger: "blur",
        },
        enclosureHoverImg: {
          required: true,
          message: "该项不能为空",
          trigger: "blur",
        },
        enclosureImg: {
          required: true,
          message: "该项不能为空",
          trigger: "blur",
        },
        mallImg: { required: true, message: "该项不能为空", trigger: "blur" },
        publishImg: {
          required: true,
          message: "该项不能为空",
          trigger: "blur",
        },
        registerImg: {
          required: true,
          message: "该项不能为空",
          trigger: "blur",
        },
        loginImg: { required: true, message: "该项不能为空", trigger: "blur" },
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
    changePage(v) {
      this.searchForm.page = v;
      this.getDataList();
      // this.clearSelectAll();
    },
    changesize(v) {
      this.searchForm.size = v;
      this.getDataList();
    },
    getDataList() {
      this.loading = true;
      getThemeList(this.searchForm).then((res) => {
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
    // 提交
    handleSubmit() {
      let data = {};
      console.log(data);
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          if (this.modalType == 0) {
            // 添加 避免编辑后传入id等数据 记得删除
            themeAdd(qs.stringify(this.form)).then((res) => {
              this.submitLoading = false;
              if (res.success) {
                this.$Message.success("操作成功");
                this.getDataList();
                this.modalVisible = false;
              }
            });
          } else {
            // 编辑
            themeUpdate(this.updateId, qs.stringify(this.form)).then((res) => {
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
    // 删除
    remove(v) {
      this.$Modal.confirm({
        title: "确认删除",
        // 记得确认修改此处
        content: "您确认要删除该主题 ?",
        loading: true,
        onOk: () => {
          // 删除
          themeDel(v.id).then((res) => {
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

<style lang="less" scoped>
.ivu-table-border td .ivu-table-cell {
  width: 100% !important;
  height: 100% !important;
}
</style>