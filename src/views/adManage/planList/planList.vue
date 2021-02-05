<style lang="less">
@import "./planList.less";
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
          <Form-item label="快速查找" prop="search">
            <Input
              type="text"
              v-model="searchForm.search"
              placeholder="按名称、广告位、广告查找"
              style="width: 260px"
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
      <Row class="operation" style="margin-bottom: 10px">
        <Button @click="add" type="primary" icon="md-add">添加</Button>
        <Button @click="endPlan" type="primary">结束</Button>
        <Button @click="releasePlan" :disabled="true" type="primary">重发</Button>
        <!-- <Button @click="addAd" type="primary" icon="ios-create-outline">编辑广告</Button> -->
        <Button @click="getDataList" icon="md-refresh">刷新</Button>
      </Row>
      <Row>
        <Table
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

    <!-- -->
    <Modal
      :title="modalTitle"
      v-model="modalVisible"
      :mask-closable="false"
      :width="600"
      @on-visible-change="modelCancel"
      class="planList"
    >
      <Form ref="form" :model="form" :label-width="90" :rules="formValidate">
        <FormItem label="登录名" prop="name">
          <Input v-model="form.name" />
        </FormItem>
        <FormItem label="广告" prop="guanggaoId">
          <Select v-model="form.guanggaoId" filterable>
            <Option v-for="item in adList" :title="item.name" :key="item.id" :value="item.id">{{
              item.name
            }}</Option>
          </Select>
        </FormItem>
        <FormItem label="关键字" prop="keywords">
          <Input v-model="form.keywords" />
        </FormItem>
        <FormItem label="开始时间" prop="startDate">
          <Date-picker
            type="date"
            v-model="form.startDate"
            format="yyyy-MM-dd"
            @on-change="startChange"
            placeholder="选择时间"
          ></Date-picker>
        </FormItem>
        <FormItem label="结束时间" prop="endDate">
          <Date-picker
            type="date"
            v-model="form.endDate"
            format="yyyy-MM-dd"
            placeholder="选择时间"
            @on-change="endChange"
          ></Date-picker>
        </FormItem>
        <FormItem label="状态" prop="state">
          <Select v-model="form.state">
            <Option :value="0">disabled</Option>
            <Option :value="1">active</Option>
            <Option :value="2">stop</Option>
            <Option :value="3">bill</Option>
          </Select>
        </FormItem>
        <FormItem label="排序字段" number prop="sortId">
          <Input v-model="form.sortId" />
        </FormItem>
        <FormItem label="金额" prop="amount">
          <Input v-model="form.amount" number />
        </FormItem>
        <Row type="flex" :gutter="10">
          <Col :span="10">
            <FormItem label="广告位" prop="channelId">
              <Select
                v-model="form.channelId"
                @on-change="selectChange1"
                placeholder="请选择"
                filterable
              >
                <Option
                  v-for="item in channelList"
                  :key="item.id"
                  :value="item.id"
                  >{{ item.alias }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col :span="7" v-show="pageListFlag">
            <FormItem class="leftBtnForm" prop="pageId">
              <Select
                v-model="form.pageId"
                @on-change="selectChange2"
                placeholder="请选择页面"
                filterable
              >
                <Option
                  v-for="item in pageList"
                  :key="item.id"
                  :value="item.id"
                  >{{ item.alias }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col :span="7" v-show="ggwListFlag">
            <FormItem class="leftBtnForm" prop="guanggaoweiId">
              <Select
                v-model="form.guanggaoweiId"
                @on-change="selectChange3"
                filterable
                :placeholder="
                  ggwList.length > 0 ? '请选择广告位' : '该页面没有广告位'
                "
              >
                <Option
                  v-for="item in ggwList"
                  :key="item.id"
                  :value="item.id"
                  >{{ item.alias }}</Option
                >
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handleCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handleSubmit"
          >提交</Button
        >
      </div>
    </Modal>

    <!-- 编辑广告弹出框 -->
    <Modal
      title="编辑广告"
      v-model="adVisible"
      :mask-closable="false"
      :width="600"
    >
      <Form
        ref="adForm"
        :model="adForm"
        :label-width="80"
        :rules="formValidate"
      >
        <FormItem label="登录名" prop="name">
          <Input v-model="adForm.name" />
        </FormItem>
        <FormItem label="别名">
          <Input v-model="adForm.alias" />
        </FormItem>
        <FormItem label="标题">
          <Input v-model="adForm.title" />
        </FormItem>
        <FormItem label="业主">
          <Select v-model="form.owner" filterable>
            <Option v-for="item in ownerList" :key="item" :value="item.value">{{
              item.label
            }}</Option>
          </Select>
        </FormItem>
        <FormItem label="链接地址">
          <Input v-model="adForm.linkUrl" />
        </FormItem>
        <FormItem label="是否可用">
          <RadioGroup v-model="adForm.isUse">
            <Radio :label="0">no</Radio>
            <Radio :label="1">yes</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="文件类型">
          <Select v-model="adForm.fileType">
            <Option :value="0">word</Option>
            <Option :value="1">swf</Option>
            <Option :value="2">flv</Option>
            <Option :value="3">bmp</Option>
            <Option :value="4">gif</Option>
            <Option :value="5">jpg</Option>
            <Option :value="6">png</Option>
            <Option :value="7">other</Option>
          </Select>
        </FormItem>
        <FormItem label="宽度">
          <Input v-model="adForm.width" />
        </FormItem>
        <FormItem label="高度">
          <Input v-model="adForm.height" />
        </FormItem>
        <FormItem label="活动描述">
          <Input
            v-model="adForm.describe"
            placeholder="请输入..."
            type="textarea"
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="adCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="adSubmit"
          >提交</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import { getCrmRequest, deleteCrm, postCrmRequest } from "@/api/crm";
import { validatePrice, validateNum } from "@/libs/validate";
import qs from "qs";
export default {
  name: "planList",
  data() {
    return {
      pageListFlag: false,
      ggwListFlag: false,
      channelList: [],
      pageList: [],
      ggwList: [],
      adList: [],
      ownerList: [],
      loading: false, // 表单加载状态
      searchForm: {
        // 搜索框对应data对象
        page: 1, // 当前页数
        size: 10, // 页面大小
        search: "",
      },
      modalType: 0, // 添加或编辑标识
      modalVisible: false, // 添加或编辑显示
      modalTitle: "", // 添加或编辑标题
      adVisible: false, // 广告弹出框
      form: {
        // 添加或编辑表单对象初始化数据
        name: "",
        keywords: "",
        sortId: 0,
        startDate: "",
        endDate: "",
        startUseDate: "",
        endUseDate: "",
        state: 1,
        amount: 0,
        guanggaoId: "",
        guanggaoweiId: "",
        channelId: "",
        pageId: "",
      },
      adForm: {
        loginName: "",
        owner: "",
        title: "",
        alias: "",
        linkUrl: "",
        isUse: 0,
        fileType: "",
        width: "",
        height: "",
        describe: "",
      },
      // 表单验证规则
      formValidate: {
        price: [
          { required: true, message: "价格不能为空", trigger: "blur" },
          { validator: validatePrice, trigger: "blur" },
        ],
        amount: [
          {
            type: "number",
            required: true,
            message: "请输入合法的金额",
            trigger: "blur",
          },
          { validator: validatePrice, trigger: "blur" },
        ],
        owner: [{ required: true, message: "请选择一个业主", trigger: "blur" }],
        startDate: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        endDate: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        sortId: [{ validator: validateNum, trigger: "blur" }],
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
          fixed: "left",
        },
        {
          title: "ID",
          key: "id",
          width: 100,
          align: "center",
          fixed: "left",
        },
        {
          title: "名称",
          key: "name",
          align: "center",
          minWidth: 180,
        },
        {
          title: "广告位",
          key: "guanggaoweiName",
          align: "center",
          minWidth: 150,
        },
        {
          title: "广告位页面",
          key: "pageAlias",
          align: "center",
          minWidth: 150,
        },
        {
          title: "广告",
          key: "guanggaoName",
          align: "center",
          minWidth: 180,
        },
        {
          title: "开始时间",
          key: "startDate",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            return h("div", {}, this.formdate(params.row.startDate));
          },
        },
        {
          title: "结束时间",
          key: "endDate",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            return h("div", {}, this.formdate(params.row.endDate));
          },
        },
        {
          title: "广告小计",
          key: "payable",
          align: "center",
          width: 100,
        },
        {
          title: "状态",
          key: "state",
          align: "center",
          width: 100,
          render: (h, params) => {
            if (params.row.state == 0) {
              return h("div", {}, "disabled");
            } else if (params.row.state == 1) {
              return h("div", {}, "active");
            } else if (params.row.state == 2) {
              return h("div", {}, "stop");
            } else {
              return h("div", {}, "bill");
            }
          },
        },
        {
          title: "排序字段",
          key: "sortId",
          align: "center",
          width: 100,
        },
        {
          title: "广告金额",
          key: "amount",
          align: "center",
          width: 100,
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 150,
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
      data: [], // 表单数据
      total: 0, // 表单数据总数
      updateId: "",
    };
  },
  // 表格动态列 计算属性
  computed: {},
  methods: {
    init() {
      this.getDataList();
      this.getGGList();
      this.getChannelList();
    },
    getDataList() {
      this.loading = true;
      // 请求后端获取表单数据 请自行修改接口
      getCrmRequest("/ad/fbjh/list", this.searchForm).then((res) => {
        this.loading = false;
        if (res.success) {
          this.data = res.result.list;
          this.total = res.result.total;
        }
        this.clearSelectAll();
      });
    },
    // 获取广告下拉列表
    getGGList() {
      getCrmRequest("/ad/fbjh/gg_list").then((res) => {
        if (res.success) {
          this.adList = res.result;
        }
      });
    },
    // 获取下拉列表channel
    getChannelList() {
      getCrmRequest("/ad/fbjh/channel_list").then((res) => {
        if (res.success) {
          this.channelList = res.result;
        }
      });
    },
    // 获取下拉列表page
    getPageList(id, otherId) {
      getCrmRequest("/ad/fbjh/page_list", { channelId: id }).then((res) => {
        if (res.success) {
          this.pageList = res.result;
          if (otherId) {
            this.form.pageId = otherId;
          }
        }
      });
    },
    // 获取下拉列表广告位ggw
    getGGWList(id, otherId) {
      getCrmRequest("/ad/fbjh/ggw_list", { pageId: id }).then((res) => {
        if (res.success) {
          this.ggwList = res.result;
          if (otherId) {
            this.form.guanggaoweiId = otherId;
          }
        }
      });
    },
    // 时间处理函数
    formdate(date) {
      if (!date) {
        return "-";
      }
      let time = new Date(date);
      let year = time.getFullYear();
      let month = (time.getMonth() + 1).toString().padStart(2, "0");
      let day = time.getDate().toString().padStart(2, "0");
      let hour = time.getHours().toString().padStart(2, "0");
      let minute = time.getMinutes().toString().padStart(2, "0");
      let second = time.getSeconds().toString().padStart(2, "0");
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
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
    handleCancel() {
      this.modalVisible = false;
    },
    handleSubmit() {
      let data = {
        name: this.form.name,
        keywords: this.form.keywords,
        sortId: this.form.sortId,
        startDate: this.form.startUseDate,
        endDate: this.form.endUseDate,
        state: this.form.state,
        amount: this.form.amount,
        guanggaoId: this.form.guanggaoId,
        guanggaoweiId: this.form.guanggaoweiId,
      };
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          if (this.modalType == 0) {
            // 添加
            postCrmRequest("/ad/fbjh/add", data).then((res) => {
              this.submitLoading = false;
              if (res.success) {
                this.$Message.success("添加成功");
                this.getDataList();
                this.modalVisible = false;
              }
            });
          } else {
            // 编辑
            postCrmRequest("/ad/fbjh/update/" + this.updateId, data).then(
              (res) => {
                this.submitLoading = false;
                if (res.success) {
                  this.$Message.success("编辑成功");
                  this.getDataList();
                  this.modalVisible = false;
                }
              }
            );
          }
        }
      });
    },
    add() {
      this.modalType = 0;
      this.modalTitle = "添加";
      this.$refs.form.resetFields();
      this.pageListFlag = false;
      this.ggwListFlag = false;
      this.modalVisible = true;
    },
    edit(v) {
      this.modalType = 1;
      this.modalTitle = "编辑";
      this.pageListFlag = true;
      this.ggwListFlag = true;
      this.updateId = v.id;
      this.getPageList(v.channelId, v.pageId);
      this.getGGWList(v.pageId, v.guanggaoweiId);
      // 转换null为""
      for (let attr in v) {
        if (v[attr] == null) {
          v[attr] = "";
        }
      }
      let str = JSON.stringify(v);
      let data = JSON.parse(str);
      this.form = data;
      this.form.startUseDate = this.formdate(this.form.startDate).slice(0, 10);
      this.form.endUseDate = this.formdate(this.form.endDate).slice(0, 10);
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
          deleteCrm("/ad/fbjh/delete/" + v.id).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              this.getDataList();
            }
          });
        },
      });
    },
    selectChange1(v) {
      this.pageList = [];
      this.ggwList = [];
      this.form.pageId = "";
      this.form.guanggaoweiId = "";
      this.pageListFlag = true;
      this.ggwListFlag = false;
      this.getPageList(v);
    },
    selectChange2(v) {
      if (v === undefined) {
        return;
      }
      this.ggwList = [];
      this.form.guanggaoweiId = "";
      this.ggwListFlag = true;
      this.getGGWList(v);
    },
    selectChange3(v) {
      /* console.log(v);
      console.log(this.form.guanggaoweiId); */
    },
    // 发布计划出账
    releasePlan() {
      return;
      if (this.selectCount <= 0) {
        this.$Message.warning("请选择一条数据");
        return;
      } else if (this.selectCount != 1) {
        this.$Message.warning("只能选择一条信息进行操作！");
        return;
      }
      var id = this.selectList[0].id;
      getCrmRequest("/ad.FaBuJiHuas/chuzhang", qs.stringify({ yzId: id })).then(
        () => {
          this.$Message.success("操作成功");
          this.getDataList();
        }
      );
    },
    // 结束所有发布计划
    endPlan() {
      if (this.selectCount <= 0) {
        this.$Message.warning("请选择一条数据");
        return;
      } else if (this.selectCount != 1) {
        this.$Message.warning("只能选择一条信息进行操作！");
        return;
      }
      var id = this.selectList[0].id;
      this.$Modal.confirm({
        title: "确认结束",
        // 记得确认修改此处
        content: "您确认要结束发布当前广告 ?",
        loading: true,
        onOk: () => {
          // 结束
          getCrmRequest("/ad/fbjh/over/" + id).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              this.getDataList();
            }
          });
        },
      });
    },
    // 添加广告
    addAd() {
      if (this.selectCount <= 0) {
        this.$Message.warning("请选择一条数据");
        return;
      } else if (this.selectCount != 1) {
        this.$Message.warning("只能选择一条信息进行操作！");
        return;
      }
      this.adVisible = true;
    },
    adSubmit() {
      this.adVisible = false;
    },
    adCancel() {
      this.adVisible = false;
    },
    // 跳转到业主广告列表页
    toAdList(row) {
      var id = row.id;
      this.$router.push({
        name: "adAllList-index",
        query: {
          id,
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
    // 查询
    handleSearch() {
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      this.getDataList();
    },
    // 重置
    handleReset() {
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      this.$refs.searchForm.resetFields();
      this.getDataList();
    },
    startChange(v) {
      if (new Date(v) > new Date(this.form.endDate)) {
        this.$Message.warning("起始时间不能大于截止时间");
        this.form.startDate = "";
        return;
      }
      this.form.startUseDate = v;
    },
    endChange(v) {
      if (new Date(v) < new Date(this.form.startDate)) {
        this.$Message.warning("截止时间不能小于起始时间");
        this.form.endDate = "";
        return;
      }
      this.form.endUseDate = v;
    },
    // 弹出框关闭时
    modelCancel(v) {
      if (!v) {
        this.$refs.form.resetFields();
        this.pageListFlag = false;
        this.ggwListFlag = false;
        this.pageList = [];
        this.ggwList = [];
      }
    },
  },
  activated() {
    this.init();
  },
};
</script>