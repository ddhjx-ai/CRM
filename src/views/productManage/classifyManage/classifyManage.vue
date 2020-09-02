<style lang="less" escoped>
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
        <!-- <Input
          v-model="searchKey"
          suffix="ios-search"
          @on-change="search"
          placeholder="输入分类名搜索"
          clearable
          style="width: 250px"
          v-show="showType=='list'"
        />-->
        <!-- <i-switch v-model="strict" size="large" v-show="showType=='tree'" style="margin-left:5px" v-if="hide">
          <span slot="open">级联</span>
          <span slot="close">单选</span>
        </i-switch>
        <div style="float: right" v-if="hide">
          <RadioGroup v-model="showType" type="button">
            <Radio title="树结构" label="tree">
              <Icon type="md-list"></Icon>
            </Radio>
            <Radio title="列表" label="list">
              <Icon type="ios-apps"></Icon>
            </Radio>
          </RadioGroup>
        </div>-->
      </Row>
      <Row type="flex" justify="start">
        <Col :md="8" :lg="8" :xl="6">
          <!-- <Alert show-icon>
            当前选择编辑：
            <span class="select-title">{{editTitle}}</span>
            <a class="select-clear" v-if="form.id" @click="cancelEdit">取消选择</a>
          </Alert>
          <Input
            v-model="searchKey"
            suffix="ios-search"
            @on-change="search"
            placeholder="输入分类名搜索"
            clearable
          />-->
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

            <!-- <FormItem label="部门负责人" prop="mainHeader">
              <Select
                :loading="userLoading"
                not-found-text="该部门暂无用户数据"
                v-model="form.mainHeader"
                multiple
                filterable
                placeholder="请选择或输入搜索用户"
              >
                <Option
                  v-for="item in users"
                  :value="item.id"
                  :key="item.id"
                  :label="item.nickname"
                >
                  <span style="margin-right:10px;">{{ item.nickname }}</span>
                  <span style="color:#ccc;">{{ item.username }}</span>
                </Option>
              </Select>
            </FormItem>
            <FormItem label="副负责人" prop="viceHeader">
              <Select
                :loading="userLoading"
                not-found-text="该部门暂无用户数据"
                v-model="form.viceHeader"
                multiple
                filterable
                placeholder="请选择或输入搜索用户"
              >
                <Option
                  v-for="item in users"
                  :value="item.id"
                  :key="item.id"
                  :label="item.nickname"
                >
                  <span style="margin-right:10px;">{{ item.nickname }}</span>
                  <span style="color:#ccc;">{{ item.username }}</span>
                </Option>
              </Select>
            </FormItem>-->
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
              <Input v-model="form.remarks" type="textarea" :rows="4" placeholder="说点什么..." />
            </FormItem>
            <Form-item class="br">
              <Button
                @click="submitEdit"
                :loading="submitLoading"
                type="primary"
                icon="ios-create-outline"
              >修改并保存</Button>
              <!-- <Button @click="handleReset">重置</Button> -->
            </Form-item>
          </Form>
        </Col>
      </Row>
      <!-- <Alert show-icon v-show="showType=='list'">
        已选择
        <span class="select-count">{{selectCount}}</span> 项
        <a class="select-clear" @click="clearSelectAll">清空</a>
      </Alert>
      <Table
        row-key="title"
        :load-data="loadData"
        :columns="columns"
        :data="data"
        :loading="loading"
        border
        ref="table"
        @on-selection-change="showSelect"
        v-if="showType=='list'"
      ></Table>-->
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
        <FormItem label="是否为父节点：">
          <i-switch size="large" v-model="subForm.isParent" :true-value="1" :false-value="0">
            <span slot="open">启用</span>
            <span slot="close">禁用</span>
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
    <Modal title="添加根节点分类" v-model="rootVisible" :mask-closable="false" :width="500" @on-cancel="cancelRoot">
      <Form ref="rootForm" :model="rootForm" :label-width="130" :rules="formValidate">
        <FormItem label="分类名称：" prop="name">
          <Input v-model="rootForm.name" />
        </FormItem>
        <FormItem label="是否为父节点：">
          <i-switch size="large" v-model="rootForm.isParent" :true-value="1" :false-value="0">
            <span slot="open">启用</span>
            <span slot="close">禁用</span>
          </i-switch>
        </FormItem>
        <FormItem label="备注：">
          <Input v-model="rootForm.remarks" type="textarea" :rows="4" placeholder="说点什么..." />
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
import { getCateList, cateUpdate, cateRemove, cateAdd } from "@/libs/axios";
import qs from "qs";
export default {
  name: "department-manage",
  data() {
    return {
      rootVisible: false,
      subVisible: false,
      hide: false,
      // showType: "tree",
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
      },
      rootForm: {
        name: "",
        isParent: 1,
        remarks: "",
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
    };
  },
  methods: {
    init() {
      this.getParentList();
      this.getParentListEdit();
    },
    getParentList() {
      this.loading = true;
      /* initDepartment().then((res) => {
        this.loading = false;
        if (res.success) {
          res.result.forEach(function (e) {
            if (e.isParent) {
              e.loading = false;
              e.children = [];
              e._loading = false;
            }
          });
          this.data = res.result;
        }
      }); */
      getCateList({ id: 0 }).then((res) => {
        console.log(res);
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
        /* if (res.success) {
          res.result.forEach(function (e) {
            if (e.isParent) {
              e.loading = false;
              e.children = [];
            }
          });
          // 头部加入一级
          let first = {
            id: "0",
            title: "一级分类",
          };
          res.result.unshift(first);
          this.dataEdit = res.result;
        } */
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
      /* loadDepartment(item.id).then((res) => {
        if (res.success) {
          res.result.forEach(function (e) {
            if (e.isParent) {
              e.loading = false;
              e.children = [];
              e._loading = false;
            }
          });
          callback(res.result);
        }
      }); */

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
        }
      });
    },
    loadData1(item, callback) {
      getCateList({ id: item.id }).then((res) => {
        res.forEach((e) => {
          e.title = e.name;
          if (e.isParent) {
            e.loading = false;
            e.children = [];
            e._loading = false;
          }
        });
        callback(res);
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
      if (v.length > 0) {
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
        // data.status = data.status ? 0 : -1;
        data.parentTitle = "";
        this.form = data;
        if (!this.currentParent) {
          this.form.parentTitle = "一级分类";
        } else {
          this.form.parentTitle = this.currentParent.title;
        }
        // 加载部门用户数据
        /* this.userLoading = true;
        getUserByDepartmentId(data.id).then(res => {
          this.userLoading = false;
          if (res.success) {
            this.users = res.result;
            // 回显
            this.form = data;
          }
        }); */
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
    /* handleReset() {
      this.$refs.form.resetFields();
      for (let key in this.form) {
        this.form[key] = "";
      }
      this.form.status = 0;
    }, */
    showSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    submitEdit() {
      /* 
        id: 581
parentId: 580
status: 1
isParent: true
name: 摄影摄像
parentName: 数码
sortOrder: 1
      */
      var data = {
        id: this.form.id,
        parentId: this.form.pid,
        status: this.form.status,
        isParent: this.form.isParent,
        name: this.form.title,
        parentName: this.currentParent ? this.currentParent.title : "",
        sortOrder: this.form.sortOrder,
      };
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!this.form.id) {
            this.$Message.warning("请先点击选择要修改的分类");
            return;
          }
          this.submitLoading = true;
          /* editDepartment(this.form).then((res) => {
            this.submitLoading = false;
            if (res.success) {
              this.$Message.success("编辑成功");
              this.init();
              this.modalVisible = false;
            }
          }); */
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
          console.log(params);
          this.submitLoading = true;
          cateAdd(qs.stringify(params)).then((res) => {
            console.log(res);
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
    addRoot() {
      this.rootVisible = true;
    },
    addSub() {
      if (this.form.id == "" || this.form.id == null) {
        this.$Message.warning("请先点击选择一个分类");
        return;
      }
      this.subVisible = true;
    },
    cancelRoot() {
      this.$refs.rootForm.resetFields();
    },
    changeSelect(v) {
      this.selectCount = v.length;
      this.selectList = v;
    },
    remove(v) {
      this.selectCount = 1;
      this.selectList.push(v);
      this.delAll();
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
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除所选的数据?",
        loading: true,
        onOk: () => {
          /* let ids = "";
          this.selectList.forEach(function (e) {
            ids += e.id + ",";
          });
          ids = ids.substring(0, ids.length - 1);
          deleteDepartment({ ids: ids }).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("删除成功");
              this.selectList = [];
              this.selectCount = 0;
              // this.cancelEdit();
              this.init();
            }
          }); */
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