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
          :columns="columns"
          :data="data"
          ref="table"
          @on-selection-change="changeSelect"
          style="padding-bootom: 10px"
        ></Table>
      </Row>
      <!-- <Row type="flex" justify="end" class="page">
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
      </Row> -->
    </Card>

    <!-- 添加 -->
    <Modal
      :title="modalTitle"
      v-model="addVisible"
      :mask-closable="false"
      :width="600"
    >
      <Form ref="form" :model="form" :label-width="120" :rules="rules">
        <FormItem prop="keywords" label="关键词">
          <Input
            type="text"
            v-model="form.keywords"
            placeholder="请输入关键词，例如：“医疗”"
          ></Input>
        </FormItem>
        <FormItem prop="total" label="total">
          <Select v-model="form.area" filterable multiple>
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem prop="yesterdayCount" label="yesterdayCount">
          <Input
            type="text"
            number
            v-model="form.yesterdayCount"
            placeholder=""
          ></Input>
        </FormItem>
        <FormItem prop="times" label="times">
          <Input type="text" number v-model="form.times" placeholder=""></Input>
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
  getCrmRequest,
  removeCrm,
  postCrmRequest,
  putCrmRequest,
} from "@/api/crm";
import { validateNum } from "@/libs/validate";
import qs from "qs";
export default {
  name: "keyList",
  data() {
    return {
      cityList: [
        {
          label: '北京',
          value: '北京'
        },
        {
          label: '上海',
          value: '上海'
        },
        {
          label: '天津',
          value: '天津'
        },
        {
          label: '重庆',
          value: '重庆'
        },
        {
          label: '河北',
          value: '河北'
        },
        {
          label: '山西',
          value: '山西'
        },
        {
          label: '内蒙古',
          value: '内蒙古'
        },
        {
          label: '辽宁',
          value: '辽宁'
        },
        {
          label: '吉林',
          value: '吉林'
        },
        {
          label: '黑龙江',
          value: '黑龙江'
        },
        {
          label: '江苏',
          value: '江苏'
        },
        {
          label: '浙江',
          value: '浙江'
        },
        {
          label: '安徽',
          value: '安徽'
        },
        {
          label: '福建',
          value: '福建'
        },
        {
          label: '江西',
          value: '江西'
        },
        {
          label: '山东',
          value: '山东'
        },
        {
          label: '河南',
          value: '河南'
        },
        {
          label: '湖北',
          value: '湖北'
        },
        {
          label: '湖南',
          value: '湖南'
        },
        {
          label: '广东',
          value: '广东'
        },
        {
          label: '广西',
          value: '广西'
        },
        {
          label: '海南',
          value: '海南'
        },
        {
          label: '贵州',
          value: '贵州'
        },
        {
          label: '云南',
          value: '云南'
        },
        {
          label: '西藏',
          value: '西藏'
        },
        {
          label: '陕西',
          value: '陕西'
        },
        {
          label: '四川',
          value: '四川'
        },
        {
          label: '甘肃',
          value: '甘肃'
        },
        {
          label: '青海',
          value: '青海'
        },
        {
          label: '新疆',
          value: '新疆'
        },
        {
          label: '宁夏',
          value: '宁夏'
        },
        {
          label: '香港',
          value: '香港'
        },
        {
          label: '澳门',
          value: '澳门'
        },
        {
          label: '台湾',
          value: '台湾'
        },
      ],
      addVisible: false,
      id: "",
      rules: {
        total: { validator: validateNum, trigger: "blur" },
        yesterdayCount: { validator: validateNum, trigger: "blur" },
        times: { validator: validateNum, trigger: "blur" },
      },
      modalType: 0,
      modalTitle: "添加",
      total: 0,
      columns: [
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
          title: '地区',
          key: 'areas',
          align: 'center'
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
      form: {
        keywords: "",
        total: "",
        yesterdayCount: "",
        times: "",
      },
      selectCount: 0,
      selectList: [],
    };
  },
  created() {
    this.id = this.$route.query.id;
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.loading = true;
      getCrmRequest('/presale/update/'+ this.id).then((res) => {
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
      this.$refs.form.resetFields();
      for (let attr in v) {
        if (v[attr] == null) {
          v[attr] = "";
        }
      }
      let str = JSON.stringify(v);
      let data = JSON.parse(str);
      this.form = data;
      // this.updateId = data.id;
      this.addVisible = true;
    },
    keywordsAdd() {
      this.modalType = 1;
      this.modalTitle = "添加";
      this.$refs.form.resetFields();
      this.addVisible = true;
    },
    handleSubmit() {
      let data;
      if (this.modalType === 1) {
        data = {
          ...this.form,
          id: this.id,
        };
        addKeywords(data).then((res) => {
          if (res.success) {
            this.$Message.success("添加成功");
            this.getDataList();
            this.addVisible = false;
          }
        });
      } else {
        data = {
          keywords: this.form.keywords,
          total: this.form.total,
          yesterdayCount: this.form.yesterdayCount,
          times: this.form.times,
          id: this.id,
          id: this.form.id,
        };
        editKeywords(data).then((res) => {
          if (res.success) {
            this.$Message.success("编辑成功");
            this.getDataList();
            this.addVisible = false;
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

<style scoped lang="less">
</style>