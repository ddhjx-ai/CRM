<style lang="less" scoped>
@import "../../../styles/tree-common.less";
@import "./classifyManage.less";
</style>
<template>
  <div class="search">
    <Card>
      <Row class="operation">
        <Button @click="delAll" icon="md-trash" type="error">删除所选分类</Button>
        <Button @click="addSub" type="primary" icon="md-add">添加子级分类</Button>
        <Button @click="addRoot" icon="md-add">添加根节点分类</Button>
        <Button @click="getParentList" icon="md-refresh">刷新</Button>
      </Row>
      <Row type="flex" justify="start">
        <Col :md="8" :lg="8" :xl="6">
          <div class="tree-bar" :style="{maxHeight: maxHeight}">
            <Tree
              ref="tree"
              :data="data"
              :load-data="loadData"
              @on-check-change="changeSelect"
              @on-select-change="selectTree"
              :check-strictly="!strict"
            ></Tree>
            <Spin size="large" fix v-if="loading"></Spin>
          </div>
        </Col>
        <Col :md="15" :lg="13" :xl="9" style="margin-left:10px;">
          <Form ref="form" :model="form" :label-width="110" :rules="formValidate">
            <FormItem label="分类名称：" prop="title">
              <Input v-model="form.title" />
            </FormItem>
            <FormItem label="选择父节点：" prop="parentTitle">
              <div style="display:flex;">
                <Input v-model="form.parentTitle" readonly style="margin-right:10px;" />
                <Poptip
                  transfer
                  trigger="click"
                  placement="right-start"
                  title="选择父节点分类"
                  width="250"
                >
                  <Button icon="md-list">选择父节点</Button>
                  <div slot="content" style="position:relative;min-height:5vh">
                    <Tree
                      :data="dataEdit"
                      :load-data="loadData1"
                      @on-select-change="selectTreeEdit"
                    ></Tree>
                    <Spin size="large" fix v-if="loadingEdit"></Spin>
                  </div>
                </Poptip>
              </div>
            </FormItem>
            <FormItem label="排序值：" prop="sortOrder">
              <Tooltip trigger="hover" placement="right" content="值越小越靠前，支持小数">
                <InputNumber :max="1000" :min="0" v-model="form.sortOrder"></InputNumber>
              </Tooltip>
            </FormItem>
            <FormItem label="是否启用：" prop="status">
              <i-switch size="large" v-model="form.status" :true-value="1" :false-value="0">
                <span slot="open">启用</span>
                <span slot="close">禁用</span>
              </i-switch>
            </FormItem>
            <FormItem label="备注：">
              <Input v-model="form.remark" type="textarea" :rows="4" placeholder="说点什么..." />
            </FormItem>
            <Form-item class="br">
              <Button
                @click="submitEdit"
                :loading="submitLoading"
                type="primary"
                icon="ios-create-outline"
              >修改并保存</Button>
            </Form-item>
          </Form>
        </Col>
      </Row>
    </Card>

    <Modal
      title="添加子级分类"
      v-model="subVisible"
      :mask-closable="false"
      :width="500"
      @on-cancel="cancelSub"
    >
      <Form ref="subForm" :model="subForm" :label-width="130" :rules="formValidate">
        <div>
          <FormItem label="上级分类：">{{form.title}}</FormItem>
        </div>
        <FormItem label="分类名称：" prop="name">
          <Input v-model="subForm.name" />
        </FormItem>
        <FormItem label="排序值：" prop="sortOrder">
          <Tooltip trigger="hover" placement="right" content="值越小越靠前，支持小数">
            <InputNumber :max="1000" :min="0" v-model="subForm.sortOrder"></InputNumber>
          </Tooltip>
        </FormItem>
        <FormItem label="是否启用：" prop="status">
          <i-switch size="large" v-model="subForm.status" :true-value="1" :false-value="0">
            <span slot="open">启用</span>
            <span slot="close">禁用</span>
          </i-switch>
        </FormItem>
        <FormItem label="是否为父节点：" prop="isParent">
          <i-switch size="large" v-model="subForm.isParent" :true-value="1" :false-value="0">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
        <FormItem label="备注：">
          <Input v-model="subForm.remark" type="textarea" :rows="4" placeholder="说点什么..." />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="subCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="subSubmit">提交</Button>
      </div>
    </Modal>

    <!-- 根节点分类 -->
    <Modal
      title="添加根节点分类"
      v-model="rootVisible"
      :mask-closable="false"
      :width="500"
      @on-cancel="cancelRoot"
    >
      <Form ref="rootForm" :model="rootForm" :label-width="130" :rules="formValidate">
        <FormItem label="分类名称：" prop="name">
          <Input v-model="rootForm.name" />
        </FormItem>
        <FormItem label="排序值：" prop="sortOrder">
          <Tooltip trigger="hover" placement="right" content="值越小越靠前，支持小数">
            <InputNumber :max="1000" :min="0" v-model="rootForm.sortOrder"></InputNumber>
          </Tooltip>
        </FormItem>
        <FormItem label="是否启用：">
          <i-switch size="large" v-model="rootForm.status" :true-value="1" :false-value="0">
            <span slot="open">启用</span>
            <span slot="close">禁用</span>
          </i-switch>
        </FormItem>
        <FormItem label="是否为父节点：" prop="isParent">
          <i-switch size="large" v-model="rootForm.isParent" :true-value="1" :false-value="0">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
        <FormItem label="备注：">
          <Input v-model="rootForm.remark" type="textarea" :rows="4" placeholder="说点什么..." />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="rootVisible = false">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="rootSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  initDepartment,
  loadDepartment,
  addDepartment,
  editDepartment,
  deleteDepartment,
  searchDepartment,
  getUserByDepartmentId,
} from "@/api/index";
import {
  getCateList,
  cateUpdate,
  cateRemove,
  cateAdd,
  getProductList,
} from "@/api/businessRoom";
import qs from "qs";
export default {
  name: "department-manage",
  data() {
    return {
      rootVisible: false,
      subVisible: false,
      loading: true,
      maxHeight: "500px",
      strict: true,
      userLoading: false,
      loadingEdit: true,
      selectList: [],
      selectCount: 0,
      modalTitle: "",
      editTitle: "",
      searchKey: "",
      form: {
        id: "",
        title: "",
        pid: "",
        parentTitle: "",
        sortOrder: 0,
        status: 0,
      },
      subForm: {
        name: "",
        isParent: 0,
        remark: "",
        status: 1,
        sortOrder: 0,
      },
      rootForm: {
        name: "",
        isParent: 1,
        remark: "",
        sortOrder: 1,
        status: 1,
      },
      formValidate: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
      },
      submitLoading: false,
      data: [],
      dataEdit: [],
      users: [],

      // 父级分类列表
      parentIdList: [],
      // 当前选中的分类的父级
      currentParent: {},
      currentId: "",
      // 获取当前分类是否存在子类
      sonListLength: 0,
      // 当前分类是否存在数据
      productListLength: 0,
      // 当前选中的分类是否是父节点
      isParent: false,
    };
  },
  methods: {
    init() {
      this.getParentList();
      this.getParentListEdit();
    },
    getParentList() {
      this.loading = true;
      getCateList({ id: 0 }).then((res) => {
        this.loading = false;
        res.forEach((e) => {
          e.title = e.name;
          if (e.isParent) {
            e.loading = false;
            e.children = [];
            e._loading = false;
          }
          this.parentIdList.push(e);
        });
        this.data = res;
      });
    },

    getParentListEdit() {
      this.loadingEdit = true;
      getCateList({ id: 0 }).then((res) => {
        this.loadingEdit = false;
        res.forEach((e) => {
          e.title = e.name;
          if (e.isParent) {
            e.loading = false;
            e.children = [];
          }
        });
        let first = {
          id: "0",
          title: "一级分类",
        };
        res.unshift(first);
        this.dataEdit = res;
      });
    },
    loadData(item, callback) {
      getCateList({ id: item.id }).then((res) => {
        if (res.length > 0) {
          res.forEach((e) => {
            e.title = e.name;
            if (e.isParent) {
              e.loading = false;
              e.children = [];
              e._loading = false;
              this.parentIdList.push(e);
            }
          });
          callback(res);
        } else {
          callback([]);
          this.$Message.warning("该分类暂未添加子级分类");
        }
      });
    },
    loadData1(item, callback) {
      getCateList({ id: item.id }).then((res) => {
        if (res.length > 0) {
          res.forEach((e) => {
            e.title = e.name;
            if (e.isParent) {
              e.loading = false;
              e.children = [];
              e._loading = false;
            }
          });
          callback(res);
        } else {
          callback([]);
          this.$Message.warning("该分类暂未添加子级分类");
        }
      });
    },
    search() {
      if (this.searchKey) {
        this.loading = true;
        searchDepartment({ title: this.searchKey }).then((res) => {
          this.loading = false;
          if (res.success) {
            this.data = res.result;
          }
        });
      } else {
        this.getParentList();
      }
    },
    selectTree(v) {
      console.log(v)
      if (v.length > 0) {
        this.isParent = v[0].isParent;
        let id = v[0].id;
        getCateList({ id: id }).then((res) => {
          this.sonListLength = res.length;
        });
        if (!v[0].children) {
          getProductList({ page: 1, size: 10, cid: id }).then((res) => {
            if (res.success) {
              this.productListLength = res.result.count;
            }
          });
        }
        this.currentId = v[0].id;
        this.currentParent = this.parentIdList.find((item) => {
          return item.id == v[0].pid;
        });
        // 转换null为""
        for (let attr in v[0]) {
          if (v[0][attr] == null) {
            v[0][attr] = "";
          }
        }
        let str = JSON.stringify(v[0]);
        let data = JSON.parse(str);
        data.parentTitle = "";
        this.form = data;
        if (!this.currentParent) {
          this.form.parentTitle = "一级分类";
        } else {
          this.form.parentTitle = this.currentParent.title;
        }
      } else {
        this.cancelEdit();
        this.currentId = "";
      }
    },
    cancelEdit() {
      let data = this.$refs.tree.getSelectedNodes()[0];
      if (data) {
        data.selected = false;
      }
      this.$refs.form.resetFields();
      delete this.form.id;
    },
    selectTreeEdit(v) {
      /* if(v[0].id === -1) {
        this.$Message.warning("请选择一个父节点");
        return
      } */
      if (v.length > 0) {
        // 转换null为""
        for (let attr in v[0]) {
          if (v[0][attr] == null) {
            v[0][attr] = "";
          }
        }
        let str = JSON.stringify(v[0]);
        let data = JSON.parse(str);
        this.form.pid = data.id;
        this.form.parentTitle = data.title;
      }
    },
    subCancel() {
      this.subVisible = false;
    },
    cancelSub() {
      this.$refs.subForm.resetFields();
    },
    showSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    submitEdit() {
      var data = {
        id: this.form.id,
        parentId: this.form.pid,
        status: this.form.status,
        isParent: this.form.isParent,
        name: this.form.title,
        parentName: this.currentParent ? this.currentParent.title : "",
        sortOrder: this.form.sortOrder,
        remark: this.form.remark,
      };
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!this.form.id) {
            this.$Message.warning("请先点击选择要修改的分类");
            return;
          }
          this.submitLoading = true;
          cateUpdate(qs.stringify(data)).then((res) => {
            this.submitLoading = false;
            if (res.success) {
              this.$Message.success("编辑成功");
              this.init();
              this.modalVisible = false;
            }
          });
        }
      });
    },
    subSubmit() {
      this.$refs.subForm.validate((valid) => {
        if (valid) {
          let params = {
            parentId: this.form.id,
            ...this.subForm,
          };
          this.submitLoading = true;
          cateAdd(qs.stringify(params)).then((res) => {
            this.submitLoading = false;
            if (res.success) {
              this.$Message.success("添加成功");
              this.init();
              this.subVisible = false;
            }
          });
        }
      });
    },
    rootSubmit() {
      this.$refs.rootForm.validate((valid) => {
        if (valid) {
          let params = {
            parentId: 0,
            ...this.rootForm,
          };
          this.submitLoading = true;
          cateAdd(qs.stringify(params)).then((res) => {
            this.submitLoading = false;
            if (res.success) {
              this.$Message.success("添加成功");
              this.init();
              this.rootVisible = false;
            }
          });
        }
      });
    },
    addRoot() {
      this.rootVisible = true;
      this.$refs.rootForm.resetFields();
    },
    addSub() {
      if (this.form.id == "" || this.form.id == null) {
        this.$Message.warning("请先点击选择一个分类");
        return;
      }
      if(!this.isParent) {
        this.$Modal.confirm({
          title: "提示",
          content: "该节点不是一个父节点，无法添加子节点分类，请选择一个父节点",
          loading: true,
          onOk: () => {
            this.$Modal.remove();
          },
        });
        return;
      }
      this.subVisible = true;
      this.$refs.subForm.resetFields();
    },
    cancelRoot() {
      this.$refs.rootForm.resetFields();
    },
    changeSelect(v) {
      this.selectCount = v.length;
      this.selectList = v;
    },
    delAll() {
      /* if (this.selectCount <= 0) {
        this.$Message.warning("您还未勾选要删除的数据");
        return;
      } */
      if (!this.currentId) {
        this.$Message.warning("请选择要删除的数据");
        return;
      }
      if (this.sonListLength !== 0) {
        this.$Modal.confirm({
          title: "提示",
          content: "请先删除该分类下的所有子类别",
          loading: true,
          onOk: () => {
            this.$Modal.remove();
          },
        });
        return;
      }
      if (this.productListLength !== 0) {
        this.$Modal.confirm({
          title: "提示",
          content: "该分类下还有商品数据，请先到商品列表中删除对应商品数据",
          loading: true,
          onOk: () => {
            this.$Modal.remove();
          },
        });
        return;
      }
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除所选的数据?",
        loading: true,
        onOk: () => {
          cateRemove(this.currentId).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("删除成功");
              this.currentId = "";
              this.cancelEdit();
              this.init();
            }
          });
        },
      });
    },
  },
  mounted() {
    // 计算高度
    let height = document.documentElement.clientHeight;
    this.maxHeight = Number(height - 287) + "px";
    this.init();
  },
};
</script>