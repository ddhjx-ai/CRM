<style lang="less">
</style>
<template>
  <div class="search">
    <Card>
      <Row class="operation">
        <Button @click="add" type="primary" icon="md-add">添加</Button>
        <Button @click="endPlan" type="primary" icon="ios-power">结束</Button>
        <Button @click="releasePlan" type="primary" icon="md-refresh-circle">重发</Button>
        <Button @click="addAd" type="primary" icon="ios-create-outline">编辑广告</Button>
        <Button @click="getDataList" icon="md-refresh">刷新</Button>
      </Row>
      <Row>
        <Table
          :loading="loading"
          border
          :columns="dynamicColums"
          :data="data"
          ref="table"
          sortable="custom"
          @on-sort-change="changeSort"
          @on-selection-change="changeSelect"
        ></Table>
      </Row>
      <Row type="flex" justify="end" class="page">
        <Page
          :current="searchForm.pageNumber"
          :total="total"
          :page-size="searchForm.pageSize"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size-opts="[10,20,50]"
          size="small"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </Row>
    </Card>

    <!-- -->
    <Modal :title="modalTitle" v-model="modalVisible" :mask-closable="false" :width="500">
      <Form ref="form" :model="form" :label-width="80" :rules="formValidate">
        <FormItem label="登录名">
          <Input v-model="form.loginName" />
        </FormItem>
        <FormItem label="广告">
          <i-select v-model="form.advertisement">
            <i-option v-for="item in adList" :key="item" :value="item.value">{{item.label}}</i-option>
          </i-select>
        </FormItem>
        <FormItem label="关键字">
          <Input v-model="form.keyWords" />
        </FormItem>
        <FormItem label="开始时间" prop="startTime">
          <Date-picker
            type="date"
            v-model="form.startTime"
            format="yyyy-MM-dd"
            placeholder="选择时间"
          ></Date-picker>
        </FormItem>
        <FormItem label="结束时间" prop="endTime">
          <Date-picker
            type="date"
            v-model="form.endTime"
            format="yyyy-MM-dd"
            placeholder="选择时间"
            width="100%"
          ></Date-picker>
        </FormItem>
        <FormItem label="状态">
          <i-select v-model="form.status" >
            <i-option value="disabled">disabled</i-option>
            <i-option value="active">active</i-option>
            <i-option value="stop">stop</i-option>
            <i-option value="bill">bill</i-option>
          </i-select>
        </FormItem>
        <FormItem label="排序字段">
          <Input v-model="form.sort" />
        </FormItem>
        <FormItem label="金额" prop="amount">
          <Input v-model="form.amount"  />
        </FormItem>
        <FormItem label="广告位">
          <Input v-model="form.adSpace" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handleCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handleSubmit">提交</Button>
      </div>
    </Modal>

    <!-- 编辑广告弹出框 -->
    <Modal title="编辑广告" v-model="adVisible" :mask-closable="false" :width="500">
      <Form ref="adForm" :model="adForm" :label-width="80" :rules="formValidate">
        <FormItem label="登录名">
          <Input v-model="adForm.loginName" />
        </FormItem>
        <FormItem label="别名">
          <Input v-model="adForm.alias" />
        </FormItem>
        <FormItem label="标题">
          <Input v-model="adForm.title" />
        </FormItem>
        <FormItem label="业主">
          <i-select v-model="form.owner">
            <i-option v-for="item in ownerList" :key="item" :value="item.value">{{item.label}}</i-option>
          </i-select>
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
          <i-select v-model="adForm.fileType" >
            <i-option value="word">word</i-option>
            <i-option value="swf">swf</i-option>
            <i-option value="flv">flv</i-option>
            <i-option value="bmp">bmp</i-option>
            <i-option value="gif">gif</i-option>
            <i-option value="jpg">jpg</i-option>
            <i-option value="png">png</i-option>
            <i-option value="other">other</i-option>
          </i-select>
        </FormItem>
        <FormItem label="宽度">
          <Input v-model="adForm.width"  />
        </FormItem>
        <FormItem label="高度">
          <Input v-model="adForm.height"  />
        </FormItem>
        <FormItem label="活动描述">
          <Input v-model="adForm.describe" placeholder="请输入..." type="textarea" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="adCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="adSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { postCrmRequest, removeCrm } from "@/libs/axios";
import { validateNum } from "@/libs/validate";
import axios from "axios";
import qs from "qs";
export default {
  name: "planList",
  data() {
    return {
      adList: [
        {value: '1', label: '北京城市景观研究院国内知名设计院'},
        {value: '2', label: '福建省水利水电勘测设计研究院'},
        {value: '3', label: '广西壮族自治区交通规划勘'},
        {value: '5', label: '贵州乌江水电开发有限责任公司'},
        {value: '6', label: '北京万科'},
        {value: '8', label: '贵港港务总公司'},
        {value: '11', label: '上海瑞惠'},
        {value: '12', label: '西门子（中国）有限公司'},
      ],
      ownerList: [
        { value: "1", label: "hhh" },
        { value: "2", label: "zhangnan" },
        { value: "3", label: "zxc" },
        { value: "4", label: "特价机票" },
        { value: "5", label: "swb" },
        { value: "6", label: "补数据" },
        { value: "7", label: "百度推广" },
        { value: "9", label: "宝胜电缆" },
      ],
      loading: true, // 表单加载状态
      searchForm: {
        // 搜索框对应data对象
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        sort: "createTime", // 默认排序字段
        order: "desc", // 默认排序方式
      },
      modalType: 0, // 添加或编辑标识
      modalVisible: false, // 添加或编辑显示
      modalTitle: "", // 添加或编辑标题
      adVisible: false, // 广告弹出框
      form: {
        // 添加或编辑表单对象初始化数据
        loginName: "",
        advertisement: '',
        keyWords: '',
        startTiem: '',
        endTime: '',
        status: '',
        sort: '',
        amount: '',
        adSpace: ''
      },
      adForm: {
        loginName: "",
        owner: '',
        title: '',
        alias: '',
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
          { validator: validateNum, trigger: "blur" },
        ],
        amount: [
          { required: true, message: "金额不能为空", trigger: "blur" },
          { validator: validateNum, trigger: "blur" },
        ],
        owner: [{ required: true, message: "请选择一个业主", trigger: "blur" }],
        startTime: [
          {
            required: true,
            type: "date",
            message: "请选择日期",
            trigger: "change",
          },
        ],
        endTime: [
          {
            required: true,
            type: "date",
            message: "请选择日期",
            trigger: "change",
          },
        ],
      },
      submitLoading: false, // 添加或编辑提交状态
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      // 表格动态列 默认勾选显示的列的key
      columnSettings: ["name", "sex", "createTime", "updateTime"],
      // 不能配置的列（不显示）
      whiteColumns: ["action"],
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
          align: "center"
        },
        {
          title: "名称",
          key: "1",
        },
        {
          title: "广告位",
          key: "2",
        },
        {
          title: "广告位页面",
          key: "3",
        },
        {
          title: "广告",
          key: "4",
        },
        {
          title: "开始时间",
          key: "5",
        },
        {
          title: "结束时间",
          key: "6",
        },
        {
          title: "广告小计",
          key: "7",
        },
        {
          title: "状态",
          key: "8",
        },
        {
          title: "排序字段",
          key: "9",
        },
        {
          title: "广告金额",
          key: "10",
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    icon: "ios-create-outline",
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
                    icon: "md-trash",
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
      columnChange: false,
      data: [], // 表单数据
      total: 0, // 表单数据总数
      dataList: {
        page: 1,
        total: 2019,
        rows: [
          {
            id: 9617152,
            cell: [
              "9617152",
              "<a href='javascript:edit_fbjh(9617152)'>招标信息-客服兑换—C1东雪天隆</a> ",
              "zbxxIndexAd-c1 ",
              "招标信息页广告 ",
              "<a href='javascript:edit_guanggao(6235904)'>招标信息-客服兑换—C1东雪天隆</a> ",
              "2020-04-27 00:00:00.0 ",
              "2020-06-26 00:00:00.0 ",
              "0 ",
              "active ",
              "0 ",
              "1 ",
            ],
          },
          {
            id: 9599232,
            cell: [
              "9599232",
              "<a href='javascript:edit_fbjh(9599232)'>会员赠送—日上电缆</a> ",
              "zbxxIndexAd-b4 ",
              "招标信息页广告 ",
              "<a href='javascript:edit_guanggao(3590400)'>会员赠送—日上电缆</a> ",
              "2020-07-14 00:00:00.0 ",
              "2020-08-13 00:00:00.0 ",
              "0 ",
              "active ",
              "0 ",
              "13 ",
            ],
          },
          {
            id: 9592192,
            cell: [
              "9592192",
              "<a href='javascript:edit_fbjh(9592192)'>招标信息-太阳能-C3</a> ",
              "zbxxIndexAd-c3 ",
              "招标信息页广告 ",
              "<a href='javascript:edit_guanggao(6013056)'>招标信息-客服兑换</a> ",
              "2020-03-23 00:00:00.0 ",
              "2020-06-15 16:52:52.0 ",
              "84 ",
              "disabled ",
              "0 ",
              "1 ",
            ],
          },
          {
            id: 9537408,
            cell: [
              "9537408",
              "<a href='javascript:edit_fbjh(9537408)'>中瑞</a> ",
              "searchgj-right-A2 ",
              "高级搜索 ",
              "<a href='javascript:edit_guanggao(3936128)'>高级搜索—中瑞</a> ",
              "2020-06-17 14:22:46.0 ",
              "2020-07-24 09:21:30.0 ",
              "36 ",
              "disabled ",
              "0 ",
              " ",
            ],
          },
          {
            id: 8990208,
            cell: [
              "8990208",
              "<a href='javascript:edit_fbjh(8990208)'>首页—成都青冶—丁金玉赠送b1</a> ",
              "index4ad-b1 ",
              "首页4广告 ",
              "<a href='javascript:edit_guanggao(6985984)'>首页—成都青冶—丁金玉赠送</a> ",
              "2020-04-14 00:00:00.0 ",
              "2020-05-13 00:00:00.0 ",
              "0 ",
              "active ",
              "0 ",
              "3 ",
            ],
          },
          {
            id: 8691584,
            cell: [
              "8691584",
              "<a href='javascript:edit_fbjh(8691584)'>index4ad-top免费查看疫情相关招标</a> ",
              "index4ad-top ",
              "首页4广告 ",
              "<a href='javascript:edit_guanggao(9300608)'>index4ad-top免费查看疫情相关招标</a> ",
              "2019-11-20 00:00:00.0 ",
              "2020-12-20 00:00:00.0 ",
              "0 ",
              "active ",
              "0 ",
              "0 ",
            ],
          },
          {
            id: 8647040,
            cell: [
              "8647040",
              "<a href='javascript:edit_fbjh(8647040)'>招标信息-客服兑换-C2</a> ",
              "zbxxIndexAd-c2 ",
              "招标信息页广告 ",
              "<a href='javascript:edit_guanggao(6013056)'>招标信息-客服兑换</a> ",
              "2020-03-23 00:00:00.0 ",
              "2020-07-22 00:00:00.0 ",
              "0 ",
              "stop ",
              "0 ",
              "0 ",
            ],
          },
          {
            id: 8554752,
            cell: [
              "8554752",
              "<a href='javascript:edit_fbjh(8554752)'>招标信息-客服兑换</a> ",
              "zbxxIndexAd-b3 ",
              "招标信息页广告 ",
              "<a href='javascript:edit_guanggao(6013056)'>招标信息-客服兑换</a> ",
              "2020-03-23 00:00:00.0 ",
              "2020-07-22 00:00:00.0 ",
              "0 ",
              "active ",
              "0 ",
              "0 ",
            ],
          },
          {
            id: 8464896,
            cell: [
              "8464896",
              "<a href='javascript:edit_fbjh(8464896)'>招标信息页-3A-齐鑫-B1</a> ",
              "zbxxIndexAd-b1 ",
              "招标信息页广告 ",
              "<a href='javascript:edit_guanggao(9111680)'>招标信息页-3A-齐鑫</a> ",
              "2019-11-29 00:00:00.0 ",
              "2020-05-29 00:00:00.0 ",
              "0 ",
              "active ",
              "0 ",
              "1 ",
            ],
          }
        ],
      },
    };
  },
  // 表格动态列 计算属性
  computed: {
    dynamicColums: function () {
      this.columnChange;
      return this.columns.filter((item) => item.hide != true);
    },
  },
  methods: {
    getListData() {
      var params = qs.stringify({
        page: 1,
        rp: 10,
        sortname: "id",
        sortorder: "desc",
        query: "",
        qtype: "",
        area: "",
        year: "",
        date_select: "",
        assigned_select: "",
        categoryid: "",
        book_type: "",
        agency_type: "",
        agency_kind: "",
      });
      postCrmRequest("/ad.FaBuJiHuas/getList", params);
    },
    init() {
      this.getDataList();
    },
    changeColumns(v) {
      this.columns.map((item) => {
        let hide = true;
        for (let i = 0; i < v.length; i++) {
          if (!item.key) {
            hide = false;
            break;
          }
          if (item.key == v[i] || item.key.indexOf(this.whiteColumns) > -1) {
            hide = false;
            break;
          }
        }
        item.hide = hide;
        return item;
      });
      // 触发计算方法
      this.columnChange = !this.columnChange;
    },
    changePage(v) {
      this.searchForm.pageNumber = v;
      this.getDataList();
      this.clearSelectAll();
    },
    changePageSize(v) {
      this.searchForm.pageSize = v;
      this.getDataList();
    },
    changeSort(e) {
      this.searchForm.sort = e.key;
      this.searchForm.order = e.order;
      if (e.order == "normal") {
        this.searchForm.order = "";
      }
      this.getDataList();
    },
    getDataList() {
      this.loading = true;
      // 请求后端获取表单数据 请自行修改接口
      // this.getRequest("请求路径", this.searchForm).then(res => {
      //   this.loading = false;
      //   if (res.success) {
      //     this.data = res.result.content;
      //     this.total = res.result.totalElements;
      //   }
      // });
      // 以下为模拟数据 "<a href='javascript:edit_ggw(2377)'>cgxxIndexAd-b5-lb</a> "
      let list = this.dataList.rows;
      this.data = list.map((item) => {
        item.cell[4] = item.cell[4].replace(
          /<a[\s\S]*>([\s\S]*)<\/[\s\S]*>/g,
          "$1"
        );
        item.cell[1] = item.cell[1].replace(
          /<a[\s\S]*>([\s\S]*)<\/[\s\S]*>/g,
          "$1"
        )
        item = { ...item.cell, id: item.id };
        return item;
      });
      this.total = this.data.length;
      this.loading = false;
    },
    handleCancel() {
      this.modalVisible = false;
    },
    handleSubmit() {
      console.log(this.form);
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          if (this.modalType == 0) {
            // 添加 避免编辑后传入id等数据 记得删除
            delete this.form.id;
            // this.postRequest("请求地址", this.form).then(res => {
            //   this.submitLoading = false;
            //   if (res.success) {
            //     this.$Message.success("操作成功");
            //     this.getDataList();
            //     this.modalVisible = false;
            //   }
            // });
            // 模拟请求成功
            this.submitLoading = false;
            this.$Message.success("操作成功");
            this.getDataList();
            this.modalVisible = false;
          } else {
            // 编辑
            // this.postRequest("请求地址", this.form).then(res => {
            //   this.submitLoading = false;
            //   if (res.success) {
            //     this.$Message.success("操作成功");
            //     this.getDataList();
            //     this.modalVisible = false;
            //   }
            // });
            // 模拟请求成功
            this.submitLoading = false;
            this.$Message.success("操作成功");
            this.getDataList();
            this.modalVisible = false;
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
      var currentData = this.data.find((item) => {
        return item.id == v.id;
      });
      this.form.loginName = currentData["1"];

      // 转换null为""
      /* for (let attr in v) {
        if (v[attr] == null) {
          v[attr] = "";
        }
      }
      let str = JSON.stringify(v);
      let data = JSON.parse(str);
      this.form = data; */
      this.modalVisible = true;
    },
    remove(v) {
      console.log(v);
      this.$Modal.confirm({
        title: "确认删除",
        // 记得确认修改此处
        content: "您确认要删除 " + v["1"] + " ?",
        loading: true,
        onOk: () => {
          // 删除
          // this.deleteRequest("请求地址，如/deleteByIds/" + v.id).then(res => {
          //   this.$Modal.remove();
          //   if (res.success) {
          //     this.$Message.success("操作成功");
          //     this.getDataList();
          //   }
          // });
          // 模拟请求成功
          // this.$Message.success("操作成功");
          // this.$Modal.remove();
          // this.getDataList();
          var params = qs.stringify({ id: v.id });
          removeCrm("/ad.GuangGaos/delete", params).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              this.getDataList();
            }
          });
        },
      });
    },
    // 发布计划出账
    releasePlan() {
      if (this.selectCount <= 0) {
        this.$Message.warning("请选择一条数据");
        return;
      } else if (this.selectCount != 1) {
        this.$Message.warning("只能选择一条信息进行操作！");
        return;
      }
      var id = this.selectList[0].id;
      postCrmRequest(
        "/ad.FaBuJiHuas/chuzhang",
        qs.stringify({ yzId: id })
      ).then(() => {
        this.$Message.success("操作成功");
        this.getDataList();
      });
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
      postCrmRequest(
        "/ad.FaBuJiHuas/toOver",
        qs.stringify({ fbjhId: id })
      ).then(() => {
        this.$Message.success("操作成功");
        this.getDataList();
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
    toAddList(row) {
      var id = row.id;
      this.$router.push({
        name: "adAllList-index",
        query: {
          id,
        },
      });
      console.log(id);
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
  },
  mounted() {
    this.init();
    this.getListData();
  },
};
</script>