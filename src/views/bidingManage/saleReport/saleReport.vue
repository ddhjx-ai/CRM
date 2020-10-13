<template>
  <div class="app_container">
    <Card>
      <Row class="operation">
        <Form
          ref="searchForm"
          :model="searchForm"
          inline
          :label-width="80"
          label-position="right"
        >
          <Form-item label="报告标题" prop="title">
            <Input
              type="text"
              v-model="searchForm.title"
              clearable
              style="width: 200px"
            />
          </Form-item>
          <Form-item label="报告编号" prop="code">
            <Input
              type="text"
              v-model="searchForm.code"
              clearable
              style="width: 200px"
            />
          </Form-item>
          <Form-item label="关键词" prop="keywords">
            <Input
              type="text"
              v-model="searchForm.keywords"
              clearable
              style="width: 200px"
            />
          </Form-item>
          <Form-item label="是否上架" prop="status">
            <Select v-model="searchForm.status" style="width: 200px">
              <Option value="1">未上架</Option>
              <Option value="2">已上架</Option>
            </Select>
          </Form-item>
          <Form-item label="价格" prop="min_current_price">
            <Input
              type="text"
              v-model="searchForm.min_current_price"
              clearable
              style="width: 88px"
            />
          </Form-item>
          <Form-item class="formSpan">
            <span>-</span>
          </Form-item>
          <Form-item class="hideLabel" prop="max_current_price">
            <Input
              type="text"
              v-model="searchForm.max_current_price"
              clearable
              style="width: 88px"
            />
          </Form-item>
          <Form-item label="开始时间" prop="startDate">
            <!-- <DatePicker
              :value="value2"
              format="yyyy-MM-dd"
              type="daterange"
              split-panels
              @on-change="startChange"
              placement="bottom-end"
              style="width: 200px"
            ></DatePicker> -->
            <DatePicker type="daterange" @on-change="startChange" split-panels style="width: 200px"></DatePicker>
          </Form-item>
          <Form-item label="截止时间" prop="endDate">
            <!-- <DatePicker
              :value="value2"
              split-panels
              format="yyyy-MM-dd"
              type="daterange"
              @on-change="endChange"
              placement="bottom-end"
              style="width: 200px"
            ></DatePicker> -->
            <DatePicker type="daterange" @on-change="endChange" split-panels style="width: 200px"></DatePicker>
          </Form-item>
          <Form-item class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search"
              >查询</Button
            >
            <Button @click="handleReset">重置</Button>
          </Form-item>
        </Form>
      </Row>
      <Row style="margin-bottom: 10px">
        <Col>
          <Button @click="add" type="primary" icon="md-add">添加</Button>
        </Col>
      </Row>
      <Row>
        <Table
          class="mygrid"
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

    <Modal
      :title="modalTitle"
      v-model="modalVisible"
      :mask-closable="false"
      :width="1100"
    >
      <Form
        ref="form"
        :model="form"
        inline
        :label-width="80"
        :rules="formValidate"
      >
        <FormItem label="报告标题" prop="title">
          <Input v-model="form.title" style="width: 160px" />
        </FormItem>
        <FormItem label="报告编号" prop="code">
          <Input v-model="form.code" style="width: 160px" />
        </FormItem>
        <FormItem label="报告编号" prop="code">
          <DatePicker
            type="datetime"
            style="width: 160px"
            format="yyyy-MM-dd HH:mm"
          ></DatePicker>
        </FormItem>
        <FormItem label="关键词" prop="code">
          <Input v-model="form.code" style="width: 160px" />
        </FormItem>
        <FormItem label="报告格式" prop="code">
          <Input v-model="form.code" style="width: 160px" />
        </FormItem>
        <FormItem label="交付方式" prop="code">
          <Input v-model="form.code" style="width: 160px" />
        </FormItem>
        <FormItem label="订购热线" prop="code">
          <Input v-model="form.code" style="width: 160px" />
        </FormItem>
        <FormItem label="原价" prop="code">
          <Input v-model="form.code" style="width: 160px" />
        </FormItem>
        <FormItem label="现价" prop="code">
          <Input v-model="form.code" style="width: 160px" />
        </FormItem>
        <FormItem label="开始时间" prop="code">
          <Input v-model="form.code" style="width: 160px" />
        </FormItem>
        <FormItem label="截止时间" prop="code">
          <Input v-model="form.code" style="width: 160px" />
        </FormItem>
        <FormItem label="预约数量" prop="code">
          <Input v-model="form.code" style="width: 160px" />
        </FormItem>
        <FormItem label="预售数量" prop="code">
          <Input v-model="form.code" style="width: 160px" />
        </FormItem>
        <FormItem label="注释" prop="code">
          <Input v-model="form.code" style="width: 160px" />
        </FormItem>
        <FormItem label="排序" prop="code">
          <Input v-model="form.code" style="width: 160px" />
        </FormItem>
        <br />
        <FormItem label="封面" prop="code">
          <div class="demo-upload-list" v-for="item in uploadCoverList" :key="item">
            <template v-if="item.status === 'finished'">
              <img :src="item.url" />
              <div class="demo-upload-list-cover">
                <Icon
                  type="ios-eye-outline"
                  @click.native="handleCoverView(item.name)"
                ></Icon>
                <Icon
                  type="ios-trash-outline"
                  @click.native="handleCoverRemove(item)"
                ></Icon>
              </div>
            </template>
            <template v-else>
              <Progress
                v-if="item.showProgress"
                :percent="item.percentage"
                hide-info
              ></Progress>
            </template>
          </div>
          <Upload
            ref="coverUpload"
            :show-upload-list="false"
            :default-file-list="defaultCoverList"
            :on-success="handleSuccess"
            :format="['jpg', 'jpeg', 'png']"
            :max-size="2048"
            :on-format-error="handleCoverFormatError"
            :on-exceeded-size="handleCoverMaxSize"
            :before-upload="handleCoverBeforeUpload"
            type="drag"
            :data="uploadCoverData"
            :action="uploadCoverFileUrl"
            :headers="accessToken"
            :on-error="handleCoverError"
            multiple
            style="display: inline-block; width: 58px"
          >
            <div style="width: 58px; height: 58px; line-height: 58px">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload> </FormItem
        ><br />
        <FormItem label="导读" prop="code" style="width: 1012px">
          <Input
            type="textarea"
            v-model="form.code"
            :autosize="{ minRows: 5, maxRows: 5 }"
          /> </FormItem
        ><br />
        <FormItem label="报告目录" prop="code">
          <quill
            id="quill1"
            v-model="form.detail1"
            ref="quill1"
            :uploadData="uploadData"
          ></quill> </FormItem
        ><br />
        <FormItem label="图标目录" prop="code">
          <quill
            id="quill2"
            v-model="form.detail2"
            ref="quill2"
            :uploadData="uploadData"
          ></quill> </FormItem
        ><br />
        <FormItem label="其他信息" prop="code">
          <quill
            id="quill3"
            v-model="form.detail3"
            ref="quill3"
            :uploadData="uploadData"
          ></quill> </FormItem
        ><br />
        <FormItem label="精彩节选" prop="code">
          <div class="demo-upload-list" v-for="item in uploadList" :key="item">
            <template v-if="item.status === 'finished'">
              <img :src="item.url" />
              <div class="demo-upload-list-cover">
                <Icon
                  type="ios-eye-outline"
                  @click.native="handleView(item.name)"
                ></Icon>
                <Icon
                  type="ios-trash-outline"
                  @click.native="handleRemove(item)"
                ></Icon>
              </div>
            </template>
            <template v-else>
              <Progress
                v-if="item.showProgress"
                :percent="item.percentage"
                hide-info
              ></Progress>
            </template>
          </div>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['jpg', 'jpeg', 'png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            type="drag"
            :data="uploadData"
            :action="uploadFileUrl"
            :headers="accessToken"
            :on-error="handleError"
            style="display: inline-block; width: 58px"
          >
            <div style="width: 58px; height: 58px; line-height: 58px">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handleCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handleSubmit"
          >提交</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import quill from "@/views/my-components/xboot/quill";
import { validateIP } from "@/libs/validate";
import { uploadImgUrl } from "@/api/businessRoom";
export default {
  name: "saleReport",
  components: {
    quill,
  },
  data() {
    return {
      accessToken: {
        "Content-Type": "multipart/form-data",
      },
      uploadData: {
        id: "",
      },
      uploadFileUrl: uploadImgUrl,
      defaultList: [],
      defaultCoverList: [],
      uploadList: [], // 图片列表
      uploadCoverList: [], // 封面图片列表
      searchForm: {
        page: 1,
        size: 10,
        title: "",
        code: "",
        keywords: "",
        status: "",
        min_current_price: "",
        max_current_price: "",
        min_start_time: "",
        max_start_time: "",
        min_cut_off_time: "",
        max_cut_off_time: "",
      },
      data: [
        {
          comments: "测试1",
          id: 2,
          ip: 3232237727,
          ipRaw: "192.168.8.159",
          lastModify: 1562033166000,
        },
        {
          comments: "测试2",
          id: 3,
          ip: 3232237725,
          ipRaw: "192.168.8.157",
          lastModify: 1562033461000,
        },
        {
          comments: "测试3",
          id: 4,
          ip: 187475323,
          ipRaw: "11.44.165.123",
          lastModify: 1562033623000,
        },
        {
          comments: "测试4",
          id: 5,
          ip: 4294967295,
          ipRaw: "255.255.255.255",
          lastModify: 1562033575000,
        },
        {
          comments: "公司内部IP",
          id: 7,
          ip: 2051446435,
          ipRaw: "122.70.150.163",
          lastModify: 1562835966000,
        },
        {
          comments: "公司内部IP",
          id: 8,
          ip: 2051446436,
          ipRaw: "122.70.150.164",
          lastModify: 1562835978000,
        },
        {
          comments: "公司内部IP",
          id: 9,
          ip: 2051446437,
          ipRaw: "122.70.150.165",
          lastModify: 1562835990000,
        },
        {
          comments: "公司内部IP",
          id: 10,
          ip: 2051446434,
          ipRaw: "122.70.150.162",
          lastModify: 1563156730000,
        },
        {
          comments: "广告部",
          id: 11,
          ip: 3395498806,
          ipRaw: "202.99.51.54",
          lastModify: 1591262390000,
        },
      ],
      total: 0,
      columns: [
        {
          type: "index",
          title: "序号",
          width: 70,
          align: "center",
        },
        {
          title: "标题",
          key: "ipRaw",
          minWidth: 150,
          align: "center",
        },
        {
          title: "报告编号",
          key: "comments",
          minWidth: 150,
          align: "center",
        },
        {
          title: "开始时间",
          key: "lastModify",
          minWidth: 150,
          align: "center",
        },
        {
          title: "截止时间",
          key: "lastModify",
          minWidth: 150,
          align: "center",
        },
        {
          title: "现价",
          key: "lastModify",
          minWidth: 150,
          align: "center",
        },
        {
          title: "排行",
          key: "lastModify",
          minWidth: 150,
          align: "center",
        },
        {
          title: "实际预约数",
          key: "lastModify",
          minWidth: 150,
          align: "center",
        },
        {
          title: "是否上架",
          key: "lastModify",
          minWidth: 150,
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
                  style: {
                    marginRight: "5px",
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
      loading: false,
      modalType: 0, // 添加或编辑标识
      modalVisible: false, // 添加或编辑显示
      modalTitle: "", // 添加或编辑标题
      form: {
        // 添加或编辑表单对象初始化数据
        ipRaw: "",
        comments: "",
      },
      formValidate: {
        ipRaw: [
          {
            required: true,
            message: "ip不能为空",
            trigger: "blur",
          },
          { validator: validateIP, trigger: "blur" },
        ],
      },
      updateId: "",
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    //   时间处理
    formateDate(date) {
      date = new Date(date);
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");
      let hour = date.getHours().toString().padStart(2, "0");
      let minute = date.getMinutes().toString().padStart(2, "0");
      let second = date.getSeconds().toString().padStart(2, "0");

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
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    // 获取列表数据
    getDataList() {},
    // 重置
    handleReset() {
      this.$refs.searchForm.resetFields();
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      // 重新加载数据
      this.getDataList();
    },
    // 查询
    handleSearch() {},
    // 添加
    add() {
      this.modalType = 0;
      this.modalTitle = "添加";
      this.$refs.form.resetFields();
      this.modalVisible = true;
    },
    // 编辑
    edit(v) {
      this.modalType = 1;
      this.modalTitle = "编辑";
      this.$refs.form.resetFields();
      // 转换null为""
      for (let attr in v) {
        if (v[attr] == null) {
          v[attr] = "";
        }
      }
      let str = JSON.stringify(v);
      let data = JSON.parse(str);
      this.form = data;
      this.updateId = data.id;
      this.modalVisible = true;
    },
    handleCancel() {
      this.modalVisible = false;
    },
    // 搜索
    handleSearch() {
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      let data = {
        ...this.searchForm,
      };
      this.loading = true;
      searchProduct(data).then((res) => {
        this.loading = false;
        if (res.success) {
          this.data = res.result.itemList;
          this.total = res.result.count;
        }
      });
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
          // 模拟请求成功
          removeCrm("/website/sites" + [v.id]).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("操作成功");
              this.getDataList();
            }
          });
        },
      });
    },
    // 提交
    handleSubmit() {
      console.log(this.form);
      let data = {
        ipRaw: this.form.ipRaw,
        comments: this.form.comments,
      };
      console.log(data);
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          if (this.modalType == 0) {
            // 添加 避免编辑后传入id等数据 记得删除
            postCrmRequest("/website/sites/add", qs.stringify(this.form)).then(
              (res) => {
                this.submitLoading = false;
                if (res.success) {
                  this.$Message.success("操作成功");
                  this.getDataList();
                  this.modalVisible = false;
                }
              }
            );
          } else {
            // 编辑
            postCrmRequest(
              "/website/sites/update/" + this.updateId,
              qs.stringify(data)
            ).then((res) => {
              this.submitLoading = false;
              if (res.success) {
                this.$Message.success("操作成功");
                this.getDataList();
                this.modalVisible = false;
              }
            });
          }
        }
      });
    },
    // 重置
    handleReset() {
      this.$refs.searchForm.resetFields();
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      // 重新加载数据
      this.getDataList();
    },
    startChange(v) {
      this.searchForm.min_start_time = v[0];
      this.searchForm.max_start_time = v[1];
    },
    endChange(v) {
      this.searchForm.min_cut_off_time = v[0];
      this.searchForm.max_cut_off_time = v[1];
    },
    // 文件上传
    handleBeforeUpload(file) {
      /* console.log("beforeUploadfile", file);
      console.log("beforeUploaduploadList", this.uploadList); */
      const check = this.uploadList.length < 6;
      if (!check) {
        this.$Notice.warning({
          title: "最多只能上传5张图片",
        });
      }
      return check;
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "不支持的文件格式",
        desc:
          "所选文件‘ " +
          file.name +
          " ’格式不正确, 请选择 'jpg','jpeg','png' 格式文件",
      });
    },
    // 上传文件大小判断
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件过大",
        desc: "上传文件大小不能大于2M",
      });
    },
    handleSuccess(res, file) {
      if (res.success) {
        file.url = res.result;
        file.name = res.result;
        /* console.log('-------------------',this.uploadList)
        console.log('+++++++++++++++++++',this.$refs.upload.fileList)
        if(this.uploadList.length > 1) {
          this.uploadList.splice(0,1)
          this.$refs.upload.fileList.splice(0,1)
        }else if(this.uploadList.length === 0){
          this.uploadList = this.$refs.upload.fileList
        } */
        this.$refs.upload.fileList = [file];
        this.uploadList = this.$refs.upload.fileList;
        this.form.image = res.result;
      } else {
        this.$Message.error(res.message);
      }
    },
    handleError(error, file, fileList) {
      this.loading = false;
      this.$Message.error(error.toString());
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      this.form.image = "";
    },
  },
};
</script>

<style lang="less">
@import "./saleReport.less";
</style>