<style lang="less">
@import "../../../styles/table-common.less";
</style>
<template>
  <div class="search">
    <Card>
      <Row class="operation" style="margin-bottom: 10px">
        <Button type="primary" @click="handleImport" icon="md-cloud-upload"
          >批量导入数据</Button
        >
        <Button @click="getDataList" icon="md-refresh">刷新</Button>
      </Row>
      <Row>
        <Alert show-icon>
          <p v-if="lastTime">
            上次上传时间：{{ lastTime }}，成功添加{{
              successCount
            }}条数据，失败(重复){{ failCount }}条数据
          </p>
          <p v-else>您还没有上传记录！</p>
        </Alert>
        <Table
          :loading="loading"
          border
          :columns="columns"
          :data="data"
          ref="table"
        ></Table>
      </Row>
      <Row type="flex" justify="end" class="page" style="margin-top: 10px">
        <Page
          :current="searchForm.pageNum"
          :total="total"
          :page-size="searchForm.pageSize"
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

    <Modal title="导入数据" closable v-model="importModalVisible" width="500">
      <!-- <Alert type="warning" show-icon>第一步：下载模板；第二步，编写内容；第三步，批量导入</Alert> -->
      <Button
        @click="downloadTemple"
        type="info"
        style="margin-bottom: 20px"
        icon="ios-cloud-download-outline"
        >下载Excel模板</Button
      >
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <Upload action :before-upload="beforeUploadImport" accept=".xls, .xlsx">
          <Button
            :loading="reading"
            icon="ios-cloud-upload-outline"
            style="margin-right: 10px"
            >上传Excel文件</Button
          >
          <span v-if="uploadfile.name"
            >当前选择文件：{{ uploadfile.name }}</span
          >
        </Upload>
        <!-- <Button @click="clearImportData" icon="md-trash">清空数据</Button> -->
      </div>
      <div slot="footer">
        <Button
          :loading="importLoading"
          :disabled="!uploadfile.name"
          @click="importData"
          style="margin-left: 5px"
          type="primary"
        >
          确认导入
        </Button>
        <Button @click="importModalVisible = false" style="margin-left: 5px"
          >关闭</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import { getCrmRequest, postCrmRequest } from "@/api/crm";
import { basicColumns, basicData } from "@/libs/importTemplate";
import excel from "@/libs/excel";
export default {
  name: "rawData",
  data() {
    return {
      successCount: 0,
      failCount: 0,
      lastTime: "",
      importLoading: false, // 导入中
      loading: false,
      reading: false, // 读取中
      importModalVisible: false, // 抽屉显示
      columns: [
        {
          title: "访客编号",
          minWidth: 120,
          align: "center",
          key: "number",
        },
        {
          title: "访客标签",
          minWidth: 120,
          align: "center",
          key: "tag",
        },
        {
          title: "总对话数",
          width: 110,
          align: "center",
          key: "x",
        },
        {
          title: "客服对话数",
          width: 110,
          align: "center",
          key: "y",
        },
        {
          title: "访客对话数",
          width: 110,
          align: "center",
          key: "z",
        },
        {
          title: "对话时间",
          width: 180,
          align: "center",
          key: "contactTime",
        },
        {
          title: "访问来源",
          minWidth: 120,
          align: "center",
          key: "visitedSource",
        },
        {
          title: "来源风格",
          width: 120,
          align: "center",
          key: "sourceStyle",
        },
        {
          title: "咨询页面",
          minWidth: 120,
          align: "center",
          key: "visitedPage",
        },
        {
          title: "访客地区",
          minWidth: 120,
          align: "center",
          key: "visitedArea",
        },
      ],
      total: 0,
      data: [],
      searchForm: {
        pageNum: 1,
        pageSize: 20,
      },
      uploadfile: {
        name: "",
      },
    };
  },
  activated() {
    this.getDataList();
  },
  methods: {
    changePage(v) {
      this.searchForm.pageNum = v;
      this.getDataList();
    },
    changesize(v) {
      this.searchForm.pageSize = v;
      this.getDataList();
    },
    getDataList() {
      this.loading = true;
      getCrmRequest("/data_analysis/list", this.searchForm).then((res) => {
        if (res.success) {
          this.total = res.result.result.totalElements;
          this.data = res.result.result.content;
          if (res.result.message) {
            this.successCount = res.result.message.successNum;
            this.failCount = res.result.message.failNum;
            this.lastTime = res.result.message.uploadTime;
          }
        }
        this.loading = false;
      });
    },
    // 导入数据按钮
    handleImport() {
      this.importModalVisible = true;
      this.clearImportData();
    },
    beforeUploadImport(file) {
      const fileExt = file.name.split(".").pop().toLocaleLowerCase();
      if (fileExt == "xlsx" || fileExt == "xls") {
        this.uploadfile = file;
      } else {
        this.$Notice.warning({
          title: "文件类型错误",
          desc:
            "所选文件‘ " +
            file.name +
            " ’不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。",
        });
      }
      return false;
    },
    // 导入数据
    importData() {
      this.importLoading = true;
      // 传入导入数据 后端接收body数组列表批量导入
      let formData = new FormData();
      formData.append("file", this.uploadfile);
      postCrmRequest("/data_analysis/upload", formData).then((res) => {
        this.importLoading = false;
        if (res.success) {
          this.$Modal.success({
            title: "提示",
            // 记得确认修改此处
            content: "数据导入成功！",
            loading: true,
            onOk: () => {
              this.$Modal.remove();
            },
          });
        }
        this.importModalVisible = false;
        this.getDataList();
      });
    },
    // 下载模板
    downloadTemple() {
      let title = [];
      let key = [];
      basicColumns.forEach((e) => {
        title.push(e.title);
        key.push(e.key);
      });
      const params = {
        title: title,
        key: key,
        data: basicData,
        autoWidth: true,
        filename: "导入数据模版",
      };
      excel.export_array_to_excel(params);
    },
    // 清空数据
    clearImportData() {
      this.uploadfile = {};
    },
  },
  mounted() {
    // this.getDataList();
  },
};
</script>