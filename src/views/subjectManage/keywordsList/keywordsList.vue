<template>
  <div class="app_container">
    <Card>
      <Row class="operation" style="margin-bottom: 10px">
        <Button type="primary" icon="md-add" @click="keywordsAdd">添加</Button>
        <Button @click="handleDel" type="primary" icon="md-trash"
          >批量删除</Button
        >
      </Row>
      <Row>
        <Table
          class="mygrid labelTable"
          :loading="loading"
          border
          :columns="keywordsColumns"
          :data="data"
          ref="table"
          @on-selection-change="changeSelect"
          style="padding-bootom: 10px"
        ></Table>
      </Row>
      <Row type="flex" justify="end" class="page">
        <Page
          :current="keywordsForm.page"
          :total="total"
          :page-size="keywordsForm.size"
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

    <!-- 添加 -->
    <Modal
      :title="modalTitle"
      v-model="addVisible"
      :mask-closable="false"
      :width="600"
    >
      <Form ref="addForm" :model="addForm" :label-width="120" :rules="rules">
        <FormItem
          prop="keywords"
          label="关键词"
          :rules="{
            required: true,
            message: '关键词不能为空',
            trigger: 'blur',
          }"
        >
          <Input
            type="text"
            v-model="addForm.keywords"
            placeholder="请输入关键词"
          ></Input>
        </FormItem>
        <FormItem prop="total" label="total">
          <Input
            type="text"
            number
            v-model="addForm.total"
            placeholder=""
          ></Input>
        </FormItem>
        <FormItem prop="yesterdayCount" label="yesterdayCount">
          <Input
            type="text"
            number
            v-model="addForm.yesterdayCount"
            placeholder=""
          ></Input>
        </FormItem>
        <FormItem prop="times" label="times">
          <Input
            type="text"
            number
            v-model="addForm.times"
            placeholder=""
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="addVisible = false">取消</Button>
        <Button type="primary" @click="handleSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  getKeywordsList,
  addKeywords,
  editKeywords,
  removeKeywords,
} from "@/api/channel";
import { validateNum } from "@/libs/validate";
import qs from "qs";
export default {
  name: "keywordsList",
  data() {
    return {
      addVisible: false,
      blocksId: "",
      keywordsForm: {
        page: 1,
        size: 10,
      },
      rules: {
        total: { validator: validateNum, trigger: "blur" },
        yesterdayCount: { validator: validateNum, trigger: "blur" },
        times: { validator: validateNum, trigger: "blur" },
      },
      modalType: 0,
      modalTitle: "添加",
      total: 0,
      keywordsColumns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "ID",
          key: "id",
          align: "center",
        },
        {
          title: "关键词",
          key: "keywords",
          align: "center",
        },
        {
          title: "total",
          key: "total",
          align: "center",
        },
        {
          title: "times",
          key: "times",
          align: "center",
        },
        {
          title: "yesterdayCount",
          key: "yesterdayCount",
          align: "center",
        },
        {
          title: "更新时间",
          key: "upTime",
          align: "center",
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
                      this.keywordsEdit(params.row);
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
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.keywordsRemove(params.row);
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
      addForm: {
        keywords: "",
        total: "",
        yesterdayCount: "",
        times: "",
      },
      selectCount: 0,
      selectList: [],
    };
  },
  activated() {
    this.blocksId = this.$route.query.id;
    this.getDataList();
  },
  /* created() {
    this.blocksId = this.$route.query.id;
  },
  mounted() {
    this.getDataList();
  }, */
  methods: {
    getDataList() {
      this.loading = true;
      getKeywordsList(this.blocksId, this.keywordsForm).then((res) => {
        if (res.success) {
          this.data = res.result.list;
          this.total = res.result.total;
          this.clearSelectAll();
          this.loading = false;
        }
      });
    },
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    changePage(v) {
      this.keywordsForm.page = v;
      this.getDataList();
    },
    changesize(v) {
      this.keywordsForm.size = v;
      this.getDataList();
    },
    changeSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    keywordsRemove(v) {
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除当前数据?",
        loading: true,
        onOk: () => {
          // 删除
          // qs.stringify({ids:[v.id]},{arrayFormat: 'brackets'})
          removeKeywords(
            qs.stringify({ ids: [v.id] }, { arrayFormat: "repeat" })
          ).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("删除成功");
              this.getDataList();
            }
          });
        },
      });
    },
    keywordsEdit(v) {
      this.modalType = 2;
      this.modalTitle = "编辑";
      this.$refs.addForm.resetFields();
      for (let attr in v) {
        if (v[attr] == null) {
          v[attr] = "";
        }
      }
      let str = JSON.stringify(v);
      let data = JSON.parse(str);
      this.addForm = data;
      // this.updateId = data.id;
      this.addVisible = true;
    },
    keywordsAdd() {
      this.modalType = 1;
      this.modalTitle = "添加";
      this.$refs.addForm.resetFields();
      this.addVisible = true;
    },
    handleSubmit() {
      let data;
      if (this.modalType === 1) {
        data = {
          ...this.addForm,
          blocksId: this.blocksId,
        };
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            addKeywords(data).then((res) => {
              if (res.success) {
                this.$Message.success("添加成功");
                this.getDataList();
                this.addVisible = false;
              }
            });
          }
        });
      } else {
        data = {
          keywords: this.addForm.keywords,
          total: this.addForm.total,
          yesterdayCount: this.addForm.yesterdayCount,
          times: this.addForm.times,
          blocksId: this.blocksId,
          id: this.addForm.id,
        };
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            editKeywords(data).then((res) => {
              if (res.success) {
                this.$Message.success("编辑成功");
                this.getDataList();
                this.addVisible = false;
              }
            });
          }
        });
      }
    },
    // 批量删除
    handleDel() {
      if (this.selectCount <= 0) {
        this.$Message.warning("请选择要删除的数据");
        return;
      }
      let ids = this.selectList.map((item) => {
        return item.id;
      });
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除所选的 " + this.selectCount + " 条数据?",
        loading: true,
        onOk: () => {
          // 批量删除
          removeKeywords(
            qs.stringify({ ids: ids }, { arrayFormat: "repeat" })
          ).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("删除成功");
              this.clearSelectAll();
              this.getDataList();
            }
          });
        },
      });
    },
  },
};
</script>