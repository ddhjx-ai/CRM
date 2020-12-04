
<template>
  <div class="search">
    <Card>
      <Row style="margin-bottom: 10px;">
        <Button
          type="primary"
          icon="md-add"
          @click="handleAddKeywords"
          >添加产品词</Button
        >
        <Button @click="handleDel" type="primary" icon="md-trash" style="margin-left:10px;float:right"
          >删除</Button
        >
      </Row>
      <Row>
        <Table
          :loading="loading"
          border
          :columns="columns"
          :data="data"
          ref="table"
          @on-selection-change="changeSelect"
          class="keywordsTabel"
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
      title="添加产品词"
      v-model="keywordsVisible"
      :mask-closable="false"
      :width="800"
    >
      <Row>
        <Col :span="24">
          <Form
            :model="form"
            :label-width="80"
            ref="form"
            :rules="ruleValidate"
          >
            <FormItem label="产品词" prop="keywords">
              <Input
                v-model="form.keywords"
                type="textarea"
                placeholder="请输入产品词,多条产品词之间请用换行隔开"
                :rows="4"
              ></Input>
            </FormItem>
          </Form>
        </Col>
      </Row>
      <div slot="footer">
        <Button type="primary" @click="handleKeywordsSubmit()">提交</Button>
        <Button style="margin-left: 8px" @click="keywordsVisible = false"
          >取消</Button
        >
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
import qs from "qs";
export default {
  name: "addWords",
  data() {
    return {
      keywordsVisible: false,
      form: {
        keywords: "",
      },
      ruleValidate: {
        keywords: {
          required: true,
          message: "产品词不能为空",
          trigger: "blur",
        },
      },
      loading: false, // 表单加载状态
      searchForm: {
        // 搜索框对应data对象
        page: 1, // 当前页数
        size: 10, // 页面大小
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "行业名称",
          key: "categoryId",
          align: "center",
          width: 260,
          render: (h, params) => {
            return h('span', {} ,"电力行业")
          }
        },
        {
          title: "产品词",
          key: "pkeywords",
          align: "center",
          minWidth: 120,
        },
        {
          title: "创建人",
          key: "createBy",
          align: "center",
          width: 120,
        },
        /* {
          title: "操作",
          align: "center",
          width: 120,
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
                  },
                  on: {
                    click: () => {
                      this.handleDown(params.row);
                    },
                  },
                },
                "下载"
              ),
            ]);
          },
        }, */
      ],
      data: [], // 表单数据
      total: 0, // 表单数据总数
      selectCount: 0,
      selectList: [],
    };
  },
  // 表格动态列 计算属性
  methods: {
    handleAddKeywords() {
      this.keywordsVisible = true;
      this.$refs.form.resetFields();
    },
    // 添加产品词提交
    handleKeywordsSubmit() {
      let words = this.form.keywords.split(/[(\r\n)\r\n]+/).map(item => item.trim()).filter(item => item !== "") || [];
      if(words.length === 0) {
        return this.$Message.error("产品词不能为空");
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          postCrmRequest('/project_summary/add_product_keywords', qs.stringify({pkwords: words, categoryId: 1},{ arrayFormat: 'repeat' })).then(res => {
            if(res.success) {
              this.$Message.success("添加成功");
              this.keywordsVisible = false;
            }else {
              this.$Message.error(res.message);
              this.keywordsVisible = false;
            }
            this.getDataList()
          })
        }
      });
    },
    init() {
      this.getDataList();
    },
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    changePage(v) {
      this.searchForm.page = v;
      this.getDataList();
    },
    changesize(v) {
      this.searchForm.size = v;
      this.getDataList();
    },
    changeSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    // 获取产品词列表
    getDataList() {
      this.loading = true;
      // 请求后端获取表单数据 请自行修改接口
      getCrmRequest("/project_summary/product_keywords_list", this.searchForm).then((res) => {
        this.loading = false;
        if (res.success) {
          if (!res.result) return;
          this.data = res.result.content;
          this.total = res.result.totalElements;
          this.clearSelectAll();
          /* this.data = res.result.list;
          this.total = res.result.total;
          this.clearSelectAll() */
        }
      });
    },
    // 批量删除产品词
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
          postCrmRequest('/project_summary/delete',
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
    }
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
.keywordsTabel /deep/.ivu-table-header thead tr th .ivu-checkbox{
  display: none;
}
</style>