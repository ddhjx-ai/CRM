<style lang="less">
</style>
<template>
  <div class="search">
    <Card>
      <Row class="operation">
        <Button @click="add" type="primary" icon="md-add">添加</Button>
        <Button @click="releasePlan" type="primary" icon="md-clipboard">发布计划</Button>
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

    <Modal :title="modalTitle" v-model="modalVisible" :mask-closable="false" :width="500">
      <Form ref="form" :model="form" :label-width="80" :rules="formValidate">
        <FormItem label="登录名">
          <Input v-model="form.loginName" />
        </FormItem>
        <FormItem label="别名">
          <Input v-model="form.alias" />
        </FormItem>
        <FormItem label="价格" prop="price">
          <Input v-model="form.price" style="width:200px" />
        </FormItem>
        <FormItem label="文件类型" prop="fileType">
          <i-select v-model="form.fileType" style="width:200px">
            <i-option v-for="item in fileTypeList" :key="item" :value="item.value">{{ item.label }}</i-option>
          </i-select>
        </FormItem>
        <FormItem label="个数" prop="count">
          <Input v-model="form.count" style="width:200px" />
        </FormItem>
        <FormItem label="宽度" prop="width">
          <Input v-model="form.width" style="width:200px" />
        </FormItem>
        <FormItem label="高度" prop="height">
          <Input v-model="form.height" style="width:200px" />
        </FormItem>
        <FormItem label="是否可用">
          <RadioGroup v-model="form.isUse">
            <Radio :label="0">no</Radio>
            <Radio :label="1">yes</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="页面" prop="page">
          <i-select v-model="form.page" style="width:200px">
            <i-option v-for="item in pageList" :key="item" :value="item.value">{{ item.label }}</i-option>
          </i-select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handleCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handleSubmit">提交</Button>
      </div>
    </Modal>

    <!-- 发布计划弹出框 -->
    <Modal title="发布计划" v-model="releaseVisible" :mask-closable="false" :width="500">
      <Form ref="releaseForm" :model="releaseForm" :label-width="80" :rules="formValidate">
        <FormItem label="登录名">
          <Input v-model="releaseForm.loginName" />
        </FormItem>
        <FormItem label="广告">
          <i-select v-model="releaseForm.advertisement">
            <i-option v-for="item in adList" :key="item" :value="item.value">{{ item.label }}</i-option>
          </i-select>
        </FormItem>
        <FormItem label="关键字">
          <Input v-model="releaseForm.keyWords" />
        </FormItem>
        <FormItem label="开始时间" prop="startTime">
          <Date-picker
            type="date"
            v-model="releaseForm.startTime"
            format="yyyy-MM-dd"
            placeholder="选择时间"
            style="width: 200px"
          ></Date-picker>
        </FormItem>
        <FormItem label="结束时间" prop="endTime">
          <Date-picker
            type="date"
            v-model="releaseForm.endTime"
            format="yyyy-MM-dd"
            placeholder="选择时间"
            style="width: 200px"
          ></Date-picker>
        </FormItem>
        <FormItem label="状态">
          <i-select v-model="releaseForm.status" style="width:200px">
            <i-option value="disabled">disabled</i-option>
            <i-option value="active">active</i-option>
            <i-option value="stop">stop</i-option>
            <i-option value="bill">bill</i-option>
          </i-select>
        </FormItem>
        <FormItem label="金额" prop="amount">
          <Input v-model="releaseForm.amount" style="width:200px" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="releaseCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="releaseSubmit">提交</Button>
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
  name: "adSpaceList",
  data() {
    return {
      adList: [
        { value: "1", label: "北京城市景观研究院国内知名设计院" },
        { value: "2", label: "福建省水利水电勘测设计研究院" },
        { value: "3", label: "广西壮族自治区交通规划勘" },
        { value: "5", label: "贵州乌江水电开发有限责任公司" },
        { value: "6", label: "北京万科" },
        { value: "8", label: "贵港港务总公司" },
        { value: "11", label: "上海瑞惠" },
        { value: "12", label: "西门子（中国）有限公司" },
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
      releaseVisible: false, // 发布计划弹出框
      form: {
        // 添加或编辑表单对象初始化数据
        loginName: "",
        alias: "",
        price: "",
        fileType: "",
        count: 0,
        width: 0,
        height: 0,
        isUse: 0,
        page: "",
      },
      releaseForm: {
        // 发布计划表单
        loginName: "",
        advertisement: "",
        keyWords: "",
        startTime: "",
        endTime: "",
        status: "",
        amount: "",
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
        startTime: [ {required: true, type: 'date', message: '请选择日期', trigger: 'change'} ],
        endTime: [{  required: true, type: 'date', message: '请选择日期', trigger: 'change' }],
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
        },
        {
          title: "页面",
          key: "1",
        },
        {
          title: "名称",
          key: "2",
        },
        {
          title: "别名",
          key: "3",
        },
        {
          title: "创建人",
          key: "4",
        },
        {
          title: "价格",
          key: "5",
        },
        {
          title: "文件类型",
          key: "6",
        },
        {
          title: "个数",
          key: "7",
        },
        {
          title: "是否删除",
          key: "8",
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
        total: 1469,
        rows: [
          {
            id: 9628672,
            cell: [
              "9628672",
              "高级搜索 ",
              "<a href='javascript:edit_ggw(9628672)'>searchgj-right-A3</a> ",
              "高级搜索页-A3",
              "测试人员",
              "0 ",
              "静态图片及flash ",
              "0 ",
              "yes",
            ],
          },
          {
            id: 9113472,
            cell: [
              "9113472",
              "疫情专题页 ",
              "<a href='javascript:edit_ggw(9113472)'>yiqingguanggao-A3</a> ",
              "疫情专题页A3",
              "测试人员",
              "1 ",
              "走马灯,图片左右滚动 ",
              "6 ",
              "no",
            ],
          },
          {
            id: 5143168,
            cell: [
              "5143168",
              "高级搜索 ",
              "<a href='javascript:edit_ggw(5143168)'>searchgj-right-A2</a> ",
              "高级搜索页-A2",
              "测试人员",
              "0 ",
              "静态图片及flash ",
              "0 ",
              "yes",
            ],
          },
          {
            id: 4817920,
            cell: [
              "4817920",
              "首页4广告 ",
              "<a href='javascript:edit_ggw(4817920)'>index4ad-a</a> ",
              "首页4广告A",
              "测试人员",
              "0 ",
              "静态图片及flash ",
              "0 ",
              "no",
            ],
          },
          {
            id: 4692480,
            cell: [
              "4692480",
              "疫情专题页 ",
              "<a href='javascript:edit_ggw(4692480)'>yiqingguanggao-A1</a> ",
              "疫情专题A1",
              "测试人员",
              "1 ",
              "走马灯,图片左右滚动 ",
              "6 ",
              "no",
            ],
          },
          {
            id: 3118720,
            cell: [
              "3118720",
              "疫情专题页 ",
              "<a href='javascript:edit_ggw(3118720)'>yiqingguanggao-A2</a> ",
              "疫情专题页A2",
              "测试人员",
              "1 ",
              "走马灯,图片左右滚动 ",
              "6 ",
              "no",
            ],
          },
          {
            id: 2093312,
            cell: [
              "2093312",
              "高级搜索 ",
              "<a href='javascript:edit_ggw(2093312)'>searchgj-right-A4</a> ",
              "高级搜索页-A4",
              "测试人员",
              "0 ",
              "静态图片及flash ",
              "0 ",
              "yes",
            ],
          },
          {
            id: 1185920,
            cell: [
              "1185920",
              " ",
              "<a href='javascript:edit_ggw(1185920)'>11111111111111111111</a> ",
              "1111111111111111",
              "李强1",
              "0 ",
              "静态图片及flash ",
              "0 ",
              "no",
            ],
          },
          {
            id: 265856,
            cell: [
              "265856",
              "高级搜索 ",
              "<a href='javascript:edit_ggw(265856)'>searchgj-right-A1</a> ",
              "高级搜索页",
              "测试人员",
              "0 ",
              "静态图片及flash ",
              "0 ",
              "yes",
            ],
          },
          {
            id: 2377,
            cell: [
              "2377",
              "采购信息页广告 ",
              "<a href='javascript:edit_ggw(2377)'>cgxxIndexAd-b5-lb</a> ",
              "采购信息页-b5-轮播",
              "测试人员",
              "1 ",
              "走马灯,图片左右滚动 ",
              "5 ",
              "no",
            ],
          },
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
    requestData(url, data) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.send(data);
      xhr.onreadystatechange = function (res) {
        if (xhr.readyState == 4 && xhr.status == 200) {
        }
      };
    },
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
      postCrmRequest("/website.Channels/getList", params);
      // this.requestData('https://crm.chinabidding.cn/admin/website.Channels/getList', params)
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
        item.cell[2] = item.cell[2].replace(
          /<a[\s\S]*>([\s\S]*)<\/[\s\S]*>/g,
          "$1"
        );
        console.log(item.cell[2]);
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
      this.form.loginName = currentData["2"];
      this.form.alias = currentData["1"];
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
          removeCrm("/website.Sites/remove", params).then((res) => {
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
      }else if(this.selectCount != 1) {
        this.$Message.warning('只能选择一条信息进行操作！')
        return;
      }
      this.releaseVisible = true;
    },
    releaseCancel() {
      this.releaseVisible = false
    },
    releaseSubmit() {
      this.$refs.releaseForm.validate((valid) => {
        console.log(valid)
        if (valid) {
          this.releaseVisible = false
          this.submitLoading = true
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
  },
  mounted() {
    this.init();
    this.getListData();
  },
};
</script>