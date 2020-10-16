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
              placeholder="按名称、链接地址、物料文件名查找"
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
        <Button @click="uploadMaterial" type="primary" icon="md-cloud-upload"
          >上传物料</Button
        >
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
          :page-size-opts="[10, 20, 50]"
          size="small"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </Row>
    </Card>

    <Modal
      :title="modalTitle"
      v-model="modalVisible"
      :mask-closable="false"
      :width="600"
    >
      <Form ref="form" :model="form" :label-width="90" :rules="formValidate">
        <FormItem label="登录名" prop="name">
          <Input v-model="form.name" />
        </FormItem>
        <FormItem label="别名" prop="alias">
          <Input v-model="form.alias" />
        </FormItem>
        <FormItem label="标题" prop="title">
          <Input v-model="form.title" />
        </FormItem>
        <FormItem label="业主" prop="yezhuId">
          <Select v-model="form.yezhuId">
            <Option v-for="item in YZList" :key="item.id" :value="item.id">{{
              item.name
            }}</Option>
          </Select>
        </FormItem>
        <FormItem label="链接地址" prop="linkAddress">
          <Input v-model="form.linkAddress" />
        </FormItem>
        <FormItem label="是否可用" prop="delFlag">
          <RadioGroup v-model="form.delFlag">
            <Radio :label="0">no</Radio>
            <Radio :label="1">yes</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="文件类型" prop="fileType">
          <Select v-model="form.fileType" style="width: 200px">
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
        <FormItem label="宽度" prop="width">
          <Input v-model="form.width" style="width: 200px" />
        </FormItem>
        <FormItem label="高度" prop="height">
          <Input v-model="form.height" style="width: 200px" />
        </FormItem>
        <FormItem label="活动描述" prop="description">
          <Input
            maxlength="2000"
            show-word-limit
            v-model="form.description"
            placeholder="请输入..."
            type="textarea"
          />
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
      :width="600"
    >
      <Form
        ref="releaseForm"
        :model="releaseForm"
        :label-width="90"
        :rules="formValidate"
      >
        <FormItem label="登录名" prop="name">
          <Input v-model="releaseForm.name" />
        </FormItem>
        <FormItem label="关键字" prop="keywords">
          <Input v-model="releaseForm.keywords" />
        </FormItem>
        <FormItem label="开始时间" prop="startDate">
          <DatePicker
            type="date"
            placeholder="选择时间"
            format="yyyy-MM-dd"
            @on-change="startChange"
            v-model="releaseForm.startDate"
          ></DatePicker>
        </FormItem>
        <FormItem label="结束时间" prop="endDate">
          <DatePicker
            type="date"
            placeholder="选择时间"
            format="yyyy-MM-dd"
            @on-change="endChange"
            v-model="releaseForm.endDate"
          ></DatePicker>
        </FormItem>
        <FormItem label="状态" prop="state">
          <Select v-model="releaseForm.state">
            <Option :value="0">disabled</Option>
            <Option :value="1">active</Option>
            <Option :value="2">stop</Option>
            <Option :value="3">bill</Option>
          </Select>
        </FormItem>
        <FormItem label="金额" prop="amount">
          <Input v-model="releaseForm.amount" number/>
        </FormItem>
        <FormItem label="广告位">
          <Row type="flex" :gutter='10'>
            <Col :span="8">
              <Select
                v-model="releaseForm.channelId"
                @on-change="selectChange1"
                placeholder="请选择"
              >
                <Option
                  v-for="item in channelList"
                  :key="item.id"
                  :value="item.id"
                  >{{ item.alias }}</Option
                >
              </Select>
            </Col>
            <Col :span="8" v-show="pageListFlag">
              <Select
                v-model="releaseForm.pageId"
                @on-change="selectChange2"
                placeholder="请选择页面"
              >
                <Option
                  v-for="item in pageList"
                  :key="item.id"
                  :value="item.id"
                  >{{ item.alias }}</Option
                >
              </Select>
            </Col>
            <Col :span="8" v-show="ggwListFlag">
              <Select
                v-model="releaseForm.guanggaoweiId"
                @on-change="selectChange3"
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
            </Col>
          </Row>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="releaseCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="releaseSubmit"
          >提交</Button
        >
      </div>
    </Modal>

    <!-- 上传弹出框 -->
    <Modal
      title="上传物料"
      v-model="uploadVisible"
      :mask-closable="false"
      :width="600"
    >
      <Form
        ref="uploadForm"
        :model="uploadForm"
        :label-width="110"
        :rules="formValidate"
      >
        <Form-item label="上传物料文件">
          <input type="file" @change="uploadImg" ref="imgFile" />
        </Form-item>
        <FormItem label="上传物料的宽度">
          <Input v-model="uploadForm.width" readonly />
        </FormItem>
        <FormItem label="上传物料的高度">
          <Input v-model="uploadForm.height" readonly />
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="submitLoading" @click="uploadSubmit"
            >上传</Button
          >
        </FormItem>
        <p style="color: red">新上传物料将替换原有物料</p>
        <FormItem label="已上传物料">
          <img :src="uploadedImg" alt :style="{width: imgWidth, height: imgHeight}"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <!-- <Button type="text" @click="uploadCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="uploadSubmit">提交</Button> -->
      </div>
    </Modal>
  </div>
</template>

<script>
import { getCrmRequest, deleteCrm, postCrmRequest } from "@/api/crm";
import { validatePrice, validateNum } from "@/libs/validate";
import qs from "qs";
export default {
  name: "adList",
  components: {
  },
  data() {
    return {
      pageListFlag: false,
      ggwListFlag: false,
      channelList: [],
      pageList: [],
      ggwList: [],
      adList: [],
      YZList: [],
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
      uploadVisible: false, // 上传物料弹出框
      form: {
        // 添加或编辑表单对象初始化数据
        name: "",
        alias: "",
        title: "",
        yezhuId: "",
        linkAddress: "",
        width: 0,
        height: 0,
        delFlag: 0,
        description: "",
        fileType: 0,
      },
      uploadedImg: "",
      uploadForm: {
        width: 0,
        height: 0,
      },
      uploadfile: {
        name: "",
      },
      releaseForm: {
        // 发布计划表单
        name: "",
        keywords: "",
        sortId: 0,
        /* startDate: "2014-10-14",
        endDate: "2019-10-14", */
        startDate: "",
        endDate: "",
        state: 1,
        amount: 0,
        guanggaoId: "",
        guanggaoweiId: "",
        channelId: "",
        pageId: "",
      },
      // 表单验证规则
      formValidate: {
        price: [
          {
            required: true,
            message: "价格不能为空",
            trigger: "blur",
          },
          { validator: validatePrice, trigger: "blur" },
        ],
        amount: [
          {type:'number', required: true, message: "请输入合法的金额", trigger: "blur" },
          { validator: validatePrice, trigger: "blur" },
        ],
        yezhuId: [
          {
            type: "number",
            required: true,
            message: "请选择一个业主",
            trigger: "change",
          },
        ],
        startDate: {
          required: true,
          message: "请选择日期",
          trigger: "change",
        },
        endDate: {
          required: true,
          message: "请选择日期",
          trigger: "change",
        },
        height: [{ validator: validateNum, trigger: "blur" }],
        width: [{ validator: validateNum, trigger: "blur" }],
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
          title: "名称",
          key: "name",
          align: "center",
          minWidth: 180,
        },
        {
          title: "链接地址",
          key: "linkAddress",
          align: "center",
          minWidth: 180,
        },
        {
          title: "物料文件名",
          key: "picName",
          align: "center",
          minWidth: 120,
        },
        {
          title: "是否删除",
          key: "delFlag",
          align: "center",
          width:100,
          render: (h, params) => {
            return h("div", {}, params.row.delFlag ? "yes" : "no");
          },
        },
        {
          title: "文件类型",
          key: "fileTypeMsg",
          align: "center",
          width:100,
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
      imgWidth: 0,
      imgHeight: 0
    };
  },
  // 表格动态列 计算属性
  computed: {},
  methods: {
    init() {
      this.getDataList();
      this.getYZList();
    },
    // 获取数据列表
    getDataList() {
      this.loading = true;
      // 请求后端获取表单数据 请自行修改接口
      getCrmRequest("/ad/gg/list", this.searchForm).then((res) => {
        if (res.success) {
          this.loading = false;
          this.data = res.result.list;
          this.total = res.result.total;
        }
      });
    },
    // 获取业主列表
    getYZList() {
      getCrmRequest("/ad/gg/yezhu_list").then((res) => {
        if (res.success) {
          this.YZList = res.result;
        }
      });
    },
    // 获取下拉列表channel
    getChannelList() {
      getCrmRequest('/ad/fbjh/channel_list').then(res => {
        if(res.success) {
          this.channelList = res.result
        }
      })
    },
    // 获取下拉列表page
    getPageList(id) {
      getCrmRequest('/ad/fbjh/page_list', {channelId: id}).then(res => {
        if(res.success) {
          this.pageList = res.result
        }
      })
    },
    // 获取下拉列表广告位ggw
    getGGWList(id) {
      getCrmRequest('/ad/fbjh/ggw_list', {pageId: id}).then(res => {
        if(res.success) {
          this.ggwList = res.result
        }
      })
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
      return `${year}-${month}-${day}`;
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
            // 添加
            postCrmRequest("/ad/gg/add", this.form).then(
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
              title: this.form.title,
              yezhuId: this.form.yezhuId,
              linkAddress: this.form.linkAddress,
              width: this.form.width,
              height: this.form.height,
              delFlag: this.form.delFlag,
              description: this.form.description,
              fileType: this.form.fileType,
            };
            postCrmRequest(
              "/ad/gg/update/" + this.updateId,
              data
            ).then((res) => {
              this.submitLoading = false;
              if (res.success) {
                this.$Message.success("编辑成功");
                this.getDataList();
                this.modalVisible = false;
              } else {
                this.$Message.success("编辑失败");
                this.getDataList();
                this.modalVisible = false;
              }
            });
          }
        }
      });
    },
    add() {
      this.modalType = 0;
      this.modalTitle = "添加";
      this.$refs.form.resetFields();
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
      }
      let str = JSON.stringify(v);
      let data = JSON.parse(str);
      this.form = data;
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
          deleteCrm("/ad/gg/delete/" + v.id).then((res) => {
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
        this.$Message.warning("请选择一条数据");
        return;
      } else if (this.selectCount != 1) {
        this.$Message.warning("只能选择一条数据进行操作！");
        return;
      }
      /* console.log(this.releaseForm.startDate)
      console.log(this.releaseForm.endDate)
      this.releaseForm.startDate = this.formdate(this.releaseForm.startDate)
      this.releaseForm.endDate = this.formdate(this.releaseForm.endDate) */
      this.releaseVisible = true;
      this.pageListFlag = false;
      this.ggwListFlag = false;
      this.releaseForm.channelId = ''
      this.releaseForm.pageId = ''
      this.releaseForm.guanggaoweiId = ''
      this.$refs.releaseForm.resetFields();
      this.getChannelList();
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
            guanggaoId: this.selectList[0].id,
            guanggaoweiId: this.releaseForm.guanggaoweiId,
          };
          this.submitLoading = true;
          postCrmRequest("/ad/gg/fbjh", data).then(res => {
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
    selectChange1(v) {
      this.pageList = [];
      this.ggwList = [];
      this.releaseForm.pageId = '';
      this.releaseForm.guanggaoweiId = '';
      this.pageListFlag = true;
      this.ggwListFlag = false;
      this.getPageList(v);
    },
    selectChange2(v) {
      if(v === undefined){
        return
      }
      this.ggwList = [];
      this.releaseForm.guanggaoweiId = '';
      this.ggwListFlag = true;
      this.getGGWList(v);
    },
    selectChange3(v) {
      
    },
    // 上传物料
    uploadMaterial() {
      if (this.selectCount <= 0) {
        this.$Message.warning("请选择一条数据");
        return;
      } else if (this.selectCount != 1) {
        this.$Message.warning("只能选择一条数据进行操作！");
        return;
      }
      this.uploadfile = {};
      this.$refs.imgFile.value = null;
      this.uploadVisible = true;
      this.uploadForm.width = this.selectList[0].width;
      this.uploadForm.height = this.selectList[0].height;
      this.imgWidth = this.selectList[0].width + 'px';
      this.imgHeight = this.selectList[0].height + 'px';
      if(this.selectList[0].dir) {
        this.uploadedImg = this.selectList[0].dir + this.selectList[0].picName
      }else {
        this.uploadedImg = "";
      }
    },
    // 上传图片
    uploadImg() {
      let file = this.$refs.imgFile.files[0];
      this.uploadfile = file;
    },
    uploadSubmit() {
      if (!this.uploadfile.name) {
        return this.$Message.error("请先选择要上传的文件");
      }
      /* const fileExt = this.uploadfile.name.split(".").pop().toLocaleLowerCase();
      let ext = ["xlsx", "xls"];
      if (!ext.includes(fileExt)) {
        this.$Notice.warning({
          title: "文件类型错误",
          desc:
            "所选文件‘ " +
            this.uploadfile.name +
            " ’不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。",
        });
        return;
      } */
      this.submitLoading = true;
      let formData = new FormData();
      formData.append("file", this.uploadfile);
      formData.append("id", this.selectList[0].id);
      formData.append("yezhuId", this.selectList[0].yezhuId);
      postCrmRequest("/ad/gg/upload", formData).then((res) => {
        if (res.success) {
          this.$Message.success("上传成功");
          this.uploadedImg = res.result;
          this.submitLoading = false;
        } else {
          this.$Message.error("上传失败");
          this.submitLoading = false;
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
  },
  mounted() {
    this.init();
  },
};
</script>