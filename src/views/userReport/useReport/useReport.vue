<style lang="less">
</style>
<template>
  <div class="search">
    <Card>
      <Row>
        <Form
          ref="searchForm"
          :model="searchForm"
          inline
          :label-width="80"
          label-position="right"
        >
          <Form-item label="快速查找" prop="memberId">
            <Input
              type="text"
              v-model="searchForm.memberId"
              placeholder="根据用户ID查找"
              style="width: 200px"
            />
          </Form-item>
          <Form-item class="operation">
            <Button @click="handleSearch" type="primary" icon="ios-search"
              >查询</Button
            >
            <Button @click="handleReset">重置</Button>
          </Form-item>
        </Form>
      </Row>
      <!-- <Row class="operation" style="margin-bottom:10px">
        <Button @click="handleCandidate" type="primary">第一候选人</Button>
        <Button @click="handleShield" type="primary">屏蔽</Button>
        <Button @click="getDataList" icon="md-refresh">刷新</Button>
      </Row> -->
      <Row>
        <Table
          :loading="loading"
          border
          :columns="columns"
          :data="data"
          ref="table"
          sortable="custom"
          @on-sort-change="changeSort"
          @on-selection-change="changeSelect"
        >
          <template slot-scope="{ row }" slot="isFirst">
            <i-switch
              size="large"
              v-model="row.isFirst"
              @on-change="changeSwitch(row)"
              :true-value="1"
              :false-value="0"
            >
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </template>
        </Table>
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
  </div>
</template>

<script>
import { getCrmRequest, removeCrm, postCrmRequest,putCrmRequest } from "@/api/crm";
import { validatePrice } from "@/libs/validate";
import qs from "qs";
export default {
  name: "useReport",
  data() {
    return {
      firstTotal: 0,
      loading: false, // 表单加载状态
      searchForm: {
        // 搜索框对应data对象
        page: 1, // 当前页数
        size: 10, // 页面大小
        memberId: "",
        sortOrder: "",
        sortName: "",
      },
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      columns: [
        // 表头
        {
          type: "index",
          width: 100,
          align: "center",
          title: "序号",
        },
        {
          title: "ID",
          key: "id",
          minWidth: 100,
          align: "center",
          sortable: true,
        },
        {
          title: "用户id",
          key: "memberId",
          align: "center",
          sortable: true,
          minWidth: 120,
        },
        {
          title: "第一候选人",
          slot: "isFirst",
          key: 'isFirst',
          sortable: true,
          minWidth: 150,
          renderHeader: (h, params) => {
            return h("span", {}, "第一候选人" + "(" + this.firstTotal + ")");
          },
          align: "center",
          /* render: (h, params) => {
            return h(
              "Switch",
              {
                props: {
                  "true-value": "1",
                  "false-value": "0",
                },
              },
              params.row.first_id
            );
          }, */
        },
        /* {
          title: "显示",
          key: "3",
          align: "center",
        }, */
        {
          title: "信息标题",
          key: "title",
          align: "center",
          minWidth: 500,
          sortable: true,
          render: (h, params) => {
            return h(
              "a",
              {
                /* props: {
                  type: "text",
                }, */
                style: {
                  color: "#2d8cf0",
                  "text-decoration": "none",
                },
                attrs: {},
                domProps: {
                  title: params.row.title,
                },
                class: "buttonDom",
                on: {
                  click: () => {
                    this.titleToHerf(params.row);
                  },
                },
              },
              params.row.title
            );
          },
        },
        {
          title: "发布时间",
          key: "publishDate",
          align: "center",
          sortable: true,
          minWidth:150,
        },
      ],
      data: [], // 表单数据
      total: 0, // 表单数据总数
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
    },
    changesize(v) {
      this.searchForm.size = v;
      this.getDataList();
    },
    getDataList() {
      this.loading = true;
      // 请求后端获取表单数据 请自行修改接口
      postCrmRequest(
        "/up/report/part_list",
        qs.stringify(this.searchForm)
      ).then((res) => {
        this.loading = false;
        if (res.success) {
          if (!res.result) return;
          this.data = res.result.list;
          this.total = res.result.total;
          this.firstTotal = res.result.firstTotal;
        }
      });
    },
    changeSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    changeSort(e) {
      this.searchForm.sortName = e.key.replace(/[A-Z]/g, (s) => {
        return "_" + s.toLowerCase();
      });
      this.searchForm.sortOrder = e.order;
      if (e.order == "normal") {
        this.searchForm.sortOrder = "";
      }
      this.getDataList();
    },
    // 查询
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
      this.searchForm.sortOrder = "";
      this.searchForm.sortName = "";
      this.getDataList();
    },
    // 切换候选人开关
    changeSwitch(v) {
      this.$Modal.confirm({
        title: "确认",
        content: "您确认要继续执行当前操作？",
        loading: true,
        onOk: () => {
          putCrmRequest(
            "/up/report/first/" + v.id,
            qs.stringify({ isFirst: v.isFirst })
          ).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              this.getDataList();
            }
          });
        },
        onCancel: () => {
          // v.isFirst === 1 ? (v.isFirst = 0) : (v.isFirst = 1);
          this.$Message.info("操作取消");
          this.getDataList();
        },
      });
    },
    // 点击信息标题跳转
    titleToHerf(v) {
      window.open("https://www.chinabidding.cn" + v.zbwUrl);
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less">
@import './useReport.less';
</style>