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
              placeholder="按名称或者创建人查找"
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
      <Row class="operation" style="margin-bottom: 10px">
        <Button @click="add" type="primary" icon="md-add">添加</Button>
        <Button @click="releasePlan" type="primary" icon="md-clipboard"
          >发布计划</Button
        >
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
          :page-size-opts="[5, 10, 20, 50]"
          size="small"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </Row>
    </Card>

    <!-- 添加、编辑 -->
    <Modal
      :title="modalTitle"
      v-model="modalVisible"
      :mask-closable="false"
      :width="500"
    >
      <Form ref="form" :model="form" :label-width="80" :rules="formValidate">
        <FormItem label="登录名" prop="name">
          <Input v-model="form.name" />
        </FormItem>
        <FormItem label="别名" prop="alias">
          <Input v-model="form.alias" />
        </FormItem>
        <FormItem label="价格" prop="price">
          <Input v-model="form.price" />
        </FormItem>
        <FormItem label="文件类型" prop="fileType">
          <Select v-model="form.fileType">
            <Option
              v-for="item in fileTypeList"
              :key="item.id"
              :value="item.id"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="个数" prop="amount">
          <Input v-model="form.amount" />
        </FormItem>
        <FormItem label="宽度" prop="width">
          <Input v-model="form.width" />
        </FormItem>
        <FormItem label="高度" prop="height">
          <Input v-model="form.height" />
        </FormItem>
        <FormItem label="是否可用" prop="delFlag">
          <RadioGroup v-model="form.delFlag">
            <Radio :label="0">no</Radio>
            <Radio :label="1">yes</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="页面" prop="pageId">
          <Select v-model="form.pageId">
            <Option v-for="item in pageList" :value="item.id" :key="item.id">{{
              item.name
            }}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handleCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handleSubmit"
          >提交</Button
        >
      </div>
    </Modal>

    <!-- 发布计划弹出框 -->
    <Modal
      title="发布计划"
      v-model="releaseVisible"
      :mask-closable="false"
      :width="500"
      @on-visible-change="selectClear"
    >
      <Form
        ref="releaseForm"
        :model="releaseForm"
        :label-width="80"
        :rules="formValidate"
      >
        <FormItem label="登录名" prop="name">
          <Input v-model="releaseForm.name" />
        </FormItem>
        <FormItem label="广告" prop='guanggaoId'>
          <Select v-model="releaseForm.guanggaoId">
            <Option v-for="item in adList" :key="item.id" :value="item.id">{{
              item.name
            }}</Option>
          </Select>
        </FormItem>
        <FormItem label="关键字" prop='keywords'>
          <Input v-model="releaseForm.keywords" />
        </FormItem>
        <FormItem label="开始时间" prop="startDate">
          <Date-picker
            type="date"
            v-model="releaseForm.startDate"
            @on-change="startChange"
            format="yyyy-MM-dd"
            placeholder="选择时间"
          ></Date-picker>
        </FormItem>
        <FormItem label="结束时间" prop="endDate">
          <Date-picker
            type="date"
            v-model="releaseForm.endDate"
            format="yyyy-MM-dd"
            placeholder="选择时间"
            @on-change="endChange"
          ></Date-picker>
        </FormItem>
        <FormItem label="状态" prop='state'>
          <Select v-model="releaseForm.state">
            <Option :value="0">disabled</Option>
            <Option :value="1">active</Option>
            <Option :value="2">stop</Option>
            <Option :value="3">bill</Option>
          </Select>
        </FormItem>
        <FormItem label="金额" prop="amount">
          <Input v-model="releaseForm.amount" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="releaseCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="releaseSubmit"
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
  name: "adSpaceList",
  data() {
    return {
      /* 
        jingtaitupian(0,"静态图片及flash"),
        tupianqiehuan(1,"图片切换"),
        zmd_shangxia(2,"走马灯,图片上下滚动"),
        zmd_zuoyou(3,"走马灯,图片左右滚动"),
        shipintanchukuang(4,"视频弹出框"),
        openwindow(5,"弹出页面广告"),
        shengmingwenzilian(6,"声明文字链"),
        guanggaowenzilian(7,"广告文字链"),
        float_leftbottom(8,"左下浮动广告"),
        float_rightbottom(9,"右下角浮动广告"),
        float_leftmiddle(10,"置左居中浮动广告"),
        float_lefttop(11,"左上角浮动广告"),
        float_righttop(12,"右上角浮动广告"),
        float_middle(13,"居中浮动广告"),
        float_middletop(14,"居中置顶浮动广告"),
        float_middlebottom(15,"居中置底浮动广告"),
        float_rightmiddle(16,"置右居中浮动广告"),
        float_rightbottom_onload(17,"置右下浮动广告"),
        float_rightbottom_delay(18,"置右下浮动广告"),
        tupianqiehuan_js(19,"图片切换"),
        float_rightbottom_zoom(20,"右下缩放效果"),
        top_zoom(21,"顶部通栏缩放效果"),
        openguanggao(22,"弹出广告"),
        shengmingwz(23,"声明文字无连接地址"),
        hot_agency(24,"热门招标机构"),
        null_value(25,null);
      */
      fileTypeList: [
        {
          name: "jingtaitupian",
          id: 0,
        },
        {
          name: "tupianqiehuan",
          id: 1,
        },
        {
          name: "zmd_shangxia",
          id: 2,
        },
        {
          name: "zmd_zuoyou",
          id: 3,
        },
        {
          name: "shipintanchukuang",
          id: 4,
        },
        {
          name: "openwindow",
          id: 5,
        },
        {
          name: "shengmingwenzilian",
          id: 6,
        },
        {
          name: "guanggaowenzilian",
          id: 7,
        },
        {
          name: "float_leftbottom",
          id: 8,
        },
        {
          name: "float_rightbottom",
          id: 9,
        },
        {
          name: "float_leftmiddle",
          id: 10,
        },
        {
          name: "float_lefttop",
          id: 11,
        },
        {
          name: "float_righttop",
          id: 12,
        },
        {
          name: "float_middle",
          id: 13,
        },
        {
          name: "float_middletop",
          id: 14,
        },
        {
          name: "float_middlebottom",
          id: 15,
        },
        {
          name: "float_rightmiddle",
          id: 16,
        },
        {
          name: "float_rightbottom_onload",
          id: 17,
        },
        {
          name: "float_rightbottom_delay",
          id: 18,
        },
        {
          name: "tupianqiehuan_js",
          id: 19,
        },
        {
          name: "float_rightbottom_zoom",
          id: 20,
        },
        {
          name: "top_zoom",
          id: 21,
        },
        {
          name: "openguanggao",
          id: 22,
        },
        {
          name: "shengmingwz",
          id: 23,
        },
        {
          name: "hot_agency",
          id: 24,
        },
        {
          name: "other",
          id: 25,
        },
      ],
      pageList: [],
      adList: [],
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
      releaseVisible: false, // 发布计划弹出框
      form: {
        // 添加或编辑表单对象初始化数据
        name: "",
        alias: "",
        price: "0",
        fileType: 0,
        amount: 0,
        width: 0,
        height: 0,
        delFlag: 0,
        pageId: "",
      },
      releaseForm: {
        // 发布计划表单
        name: "",
        guanggaoId: "",
        keywords: "",
        startDate: "",
        endDate: "",
        state: 1,
        amount: "",
      },
      // 表单验证规则
      formValidate: {
        name: { required:true, message: "登录名不能为空", trigger: "blur" },
        price: [
          {
            required: true,
            message: "价格不能为空",
            trigger: "blur",
          },
          { validator: validatePrice, trigger: "blur" },
        ],
        amount: [
          {
            required: true,
            message: "金额不能为空",
            trigger: "blur",
          },
          { validator: validatePrice, trigger: "blur" },
        ],
        startDate: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        endDate: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        height: [{ validator: validateNum, trigger: "blur" }],
        width: [{ validator: validateNum, trigger: "blur" }],
        amount: [{ validator: validateNum, trigger: "blur" }],
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
          title: "页面",
          key: "pageAlias",
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
          title: "创建人",
          key: "createOpr",
          align: "center",
        },
        {
          title: "价格",
          key: "price",
          align: "center",
          // sortable: true
        },
        {
          title: "文件类型",
          key: "fileTypeMag",
          align: "center",
        },
        {
          title: "个数",
          key: "amount",
          align: "center",
          // sortable: true
        },
        {
          title: "是否删除",
          key: "delFlag",
          align: "center",
          render: (h, params) => {
            return h("div", {}, params.row.delFlag ? "yes" : "no");
          },
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
      this.getpageList();
      this.getGGList();
    },
    // 获取广告下拉列表
    getGGList() {
      getCrmRequest("/ad/fbjh/gg_list").then((res) => {
        if (res.success) {
          this.adList = res.result;
        }
      });
    },
    // 获取页面下拉列表
    getpageList() {
      getCrmRequest("/website/blocks/pages_list").then((res) => {
        if (res.success) {
          this.pageList = res.result;
        }
      });
    },
    getDataList() {
      this.loading = true;
      // 请求后端获取表单数据 请自行修改接口
      getCrmRequest("/ad/ggw/list", this.searchForm).then((res) => {
        if (res.success) {
          this.loading = false;
          this.data = res.result.list;
          this.total = res.result.total;
        }
      });
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
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          if (this.modalType == 0) {
            // 添加 避免编辑后传入id等数据 记得删除
            postCrmRequest("/ad/ggw/add", this.form).then(
              (res) => {
                this.submitLoading = false;
                if (res.success) {
                  this.$Message.success("添加成功");
                  this.getDataList();
                  this.modalVisible = false;
                } else {
                  this.$Message.error("添加失败");
                  this.getDataList();
                  this.modalVisible = false;
                }
              }
            );
          } else {
            // 编辑
            let data = {
              name: this.form.name,
              alias: this.form.alias,
              price: this.form.price,
              fileType: this.form.fileType,
              amount: this.form.amount,
              width: this.form.width,
              height: this.form.height,
              delFlag: this.form.delFlag,
              pageId: this.form.pageId,
            }
            postCrmRequest("/ad/ggw/update/" + this.updateId, data).then(
              (res) => {
                this.submitLoading = false;
                if (res.success) {
                  this.$Message.success("编辑成功");
                  this.getDataList();
                  this.modalVisible = false;
                } else {
                  this.$Message.error("编辑失败");
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
      delete this.form.id;
      this.modalVisible = true;
    },
    edit(v) {
      this.modalType = 1;
      this.modalTitle = "编辑";
      this.$refs.form.resetFields();
      this.updateId = v.id;
      // 转换null为""
      for (let attr in v) {
        if (v[attr] == null) {
          v[attr] = "";
        }
        if (attr == "price") {
          v[attr] = "" + v[attr];
        }
      }
      let str = JSON.stringify(v);
      let data = JSON.parse(str);
      console.log(data);
      this.form = data;
      this.modalVisible = true;
    },
    // 删除
    remove(v) {
      console.log(v);
      this.$Modal.confirm({
        title: "确认删除",
        // 记得确认修改此处
        content: "您确认要删除 " + v.name + " ?",
        loading: true,
        onOk: () => {
          // 删除
          deleteCrm("/ad/ggw/delete/" + v.id).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              this.getDataList();
            }
          });
        },
      });
    },
    // 发布计划
    releasePlan() {
      if (this.selectCount <= 0) {
        this.$Message.warning("请选择数据");
        return;
      } else if (this.selectCount != 1) {
        this.$Message.warning("只能选择一条信息进行操作！");
        return;
      }
      this.releaseVisible = true;
      this.$refs.releaseForm.resetFields();
    },
    releaseCancel() {
      this.releaseVisible = false;
    },
    releaseSubmit() {
      this.$refs.releaseForm.validate((valid) => {
        if (valid) {
          let data = {
            name: this.releaseForm.name,
            keywords: this.releaseForm.keywords,
            startDate: this.releaseForm.startDate,
            sortId: 0,
            endDate: this.releaseForm.endDate,
            state: this.releaseForm.state,
            amount: this.releaseForm.amount,
            guanggaoId: this.releaseForm.id,
            guanggaoweiId: this.selectList[0].id,
          };
          this.submitLoading = true;
          postCrmRequest("/ad/ggw/fbjh", data).then(res => {
            if(res.success) {
              this.$Message.success("发布成功");
              this.releaseVisible = false;
              this.submitLoading = false;
            }else {
              this.$Message.error("发布失败");
              this.submitLoading = false;
            }
          });
        }
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
      if (new Date(v) > new Date(this.releaseForm.endDate)) {
        this.$Message.warning("起始时间不能大于截止时间");
        this.releaseForm.startDate = "";
        return;
      }
      this.releaseForm.startDate = v;
    },
    endChange(v) {
      if (new Date(v) < new Date(this.releaseForm.startDate)) {
        this.$Message.warning("截止时间不能小于起始时间");
        this.releaseForm.endDate = "";
        return;
      }
      this.releaseForm.endDate = v;
    },
    selectClear(v) {
      if(!v) {
        this.clearSelectAll();
      }
    }
  },
  mounted() {
    this.init();
  },
};
</script>