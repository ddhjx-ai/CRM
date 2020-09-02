<style lang="less">
</style>
<template>
  <div class="search">
    <Card>
      <Row class="operation">
        <Button @click="add" type="primary" icon="md-add">添加</Button>
        <Button @click="uploadMaterial" type="primary" icon="md-cloud-upload">上传物料</Button>
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
        <FormItem label="标题">
          <Input v-model="form.title" />
        </FormItem>
        <FormItem label="业主" prop="owner">
          <i-select v-model="form.owner">
            <i-option v-for="item in ownerList" :key="item" :value="item.value">{{ item.label }}</i-option>
          </i-select>
        </FormItem>
        <FormItem label="链接地址">
          <Input v-model="form.linkUrl" />
        </FormItem>
        <FormItem label="是否可用">
          <RadioGroup v-model="form.isUse">
            <Radio :label="0">no</Radio>
            <Radio :label="1">yes</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="文件类型">
          <i-select v-model="form.fileType" style="width:200px">
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
          <Input v-model="form.width" style="width:200px" />
        </FormItem>
        <FormItem label="高度">
          <Input v-model="form.height" style="width:200px" />
        </FormItem>
        <FormItem label="活动描述">
          <Input v-model="form.describe" placeholder="请输入..." type="textarea" />
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
        <FormItem label="广告位">
          <i-select v-model="releaseForm.advertisement" style="width:200px">
            <i-option v-for="item in adList" :key="item" :value="item.value">{{item.label}}</i-option>
          </i-select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="releaseCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="releaseSubmit">提交</Button>
      </div>
    </Modal>

    <!-- 上传弹出框 -->
    <Modal title="上传物料" v-model="uploadVisible" :mask-closable="false" :width="500">
      <Form ref="uploadForm" :model="uploadForm" :label-width="110" :rules="formValidate">
        <Form-item label="头像" prop="avatar">
          <upload-pic-input v-model="uploadForm.avatar" ref="upload"></upload-pic-input>
        </Form-item>
        <FormItem label="上传物料的宽度">
          <Input v-model="uploadForm.width" />
        </FormItem>
        <FormItem label="上传物料的高度">
          <Input v-model="uploadForm.height" />
        </FormItem>
        <FormItem label="已上传物料">
          <img :src="uploadedImg" alt />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="uploadCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="uploadSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { postCrmRequest, removeCrm } from "@/libs/axios";
import { validatePrice } from "@/libs/validate";
import uploadPicInput from "@/views/my-components/xboot/upload-pic-input";
import axios from "axios";
import qs from "qs";
export default {
  name: "adList",
  components: {
    uploadPicInput,
  },
  data() {
    return {
      adList: [
        { value: "23", label: "搜标网首页" },
        { value: "39", label: "IT频道" },
        { value: "44", label: "首页" },
        { value: "46", label: "客服中心" },
        { value: "47", label: "信息详情" },
        { value: "49", label: "标书下载频道" },
        { value: "50", label: "采购页面广告" },
        { value: "51", label: "项目信息频道" },
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
      releaseVisible: false, // 发布计划弹出框
      uploadVisible: false, // 上传物料弹出框
      form: {
        // 添加或编辑表单对象初始化数据
        loginName: "",
        alias: "",
        title: "",
        owner: "",
        linkUrl: "",
        width: 0,
        height: 0,
        isUse: 0,
        describe: "",
        fileType: "",
      },
      uploadedImg: "",
      uploadForm: {
        width: 0,
        height: 0,
        avatar: "",
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
          { validator: validatePrice, trigger: "blur" },
        ],
        amount: [
          { required: true, message: "金额不能为空", trigger: "blur" },
          { validator: validatePrice, trigger: "blur" },
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
        },
        {
          title: "名称",
          key: "1",
        },
        {
          title: "链接地址",
          key: "2",
        },
        {
          title: "物料文件名",
          key: "3",
        },
        {
          title: "是否删除",
          key: "4",
        },
        {
          title: "类型",
          key: "5",
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
        total: 1254,
        rows: [
          {
            id: 9901824,
            cell: [
              "9901824",
              "<a href='javascript:edit_gg(9901824)'>czsj-test</a> ",
              " ",
              "194097576.jpg ",
              "yes",
              "jpg ",
            ],
          },
          {
            id: 9412736,
            cell: [
              "9412736",
              "<a href='javascript:edit_gg(9412736)'>圣维斯—3A</a> ",
              "https://dxthfl.b2b.hc360.com ",
              "680823451.png ",
              "no",
              "png ",
            ],
          },
          {
            id: 9300608,
            cell: [
              "9300608",
              "<a href='javascript:edit_gg(9300608)'>index4ad-top免费查看疫情相关招标</a> ",
              "https://www.chinabidding.cn/public/cblcn/Fangkong/index2.html ",
              "1839736402.gif ",
              "yes",
              "gif ",
            ],
          },
          {
            id: 9111680,
            cell: [
              "9111680",
              "<a href='javascript:edit_gg(9111680)'>招标信息页-3A-齐鑫</a> ",
              "http://jsqixin.cn/ ",
              "1752373853.jpg ",
              "no",
              "jpg ",
            ],
          },
          {
            id: 8916992,
            cell: [
              "8916992",
              "<a href='javascript:edit_gg(8916992)'>招标信息页-3A-花泽</a> ",
              "http://www.bjlvxin.com/ ",
              "797252804.png ",
              "no",
              "png ",
            ],
          },
          {
            id: 8636928,
            cell: [
              "8636928",
              "<a href='javascript:edit_gg(8636928)'>守正</a> ",
              "https://szecp.crc.com.cn/ ",
              " ",
              "yes",
              "jpg ",
            ],
          },
          {
            id: 8566400,
            cell: [
              "8566400",
              "<a href='javascript:edit_gg(8566400)'>3A-通利源</a> ",
              " ",
              "1563915905.png ",
              "no",
              "png ",
            ],
          },
          {
            id: 8351872,
            cell: [
              "8351872",
              "<a href='javascript:edit_gg(8351872)'>test-疫情1</a> ",
              "https://www.chinabidding.cn ",
              "1646015378.png ",
              "no",
              "png ",
            ],
          },
          {
            id: 8128256,
            cell: [
              "8128256",
              "<a href='javascript:edit_gg(8128256)'>会员赠送—腾达</a> ",
              "http://www.hebeicable.net/ ",
              "1007691936.jpg ",
              "no",
              "jpg ",
            ],
          },
          {
            id: 8106496,
            cell: [
              "8106496",
              "<a href='javascript:edit_gg(8106496)'>test111</a> ",
              " ",
              "1923011874.jpg ",
              "yes",
              "jpg ",
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
        item.cell[1] = item.cell[1].replace(
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
      console.log(currentData);
      this.form.loginName = currentData["1"];
      this.form.linkUrl = currentData["2"];
      this.form.isUse = currentData["4"] == "yes" ? 1 : 0;
      this.form.fileType = currentData["5"].trim();
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
    // 发布计划
    releasePlan() {
      if (this.selectCount <= 0) {
        this.$Message.warning("请选择数据");
        return;
      } else if (this.selectCount != 1) {
        this.$Message.warning("只能选择一条信息进行操作！");
        return;
      }
      console.log(this.selectCount);
      this.releaseVisible = true;
    },
    releaseCancel() {
      this.releaseVisible = false;
    },
    releaseSubmit() {
      this.$refs.releaseForm.validate((valid) => {
        console.log(valid);
        if (valid) {
          this.releaseVisible = false;
          this.submitLoading = true;
        }
      });
    },
    // 上传物料
    uploadMaterial() {
      console.log(this.selectList);
      if (this.selectCount <= 0) {
        this.$Message.warning("请选择数据");
        return;
      } else if (this.selectCount != 1) {
        this.$Message.warning("只能选择一条信息进行操作！");
        return;
      }
      //   this.uploadedImg ='https://gys-public.oss-cn-beijing.aliyuncs.com/y/196/gg/' +  this.selectList[0]['3'].trim();
      this.uploadVisible = true;
    },
    uploadSubmit() {},
    uploadCancel() {},
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