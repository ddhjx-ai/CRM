<template>
  <div>
    <Card>
      <Row class="rowModal">
        <Form ref="themeForm" :model="themeForm" inline :label-width="100">
          <Col :span="12">
            <h3 class="basicDetail">选择主题</h3>
            <Row>
              <Col :span="16">
                <FormItem prop="themeId" label="主题名" style="width: 100%">
                  <Select v-model="themeForm.themeId">
                    <Option
                      v-for="item in themeList"
                      :value="item.id"
                      :key="item.id"
                    >{{ item.name }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :span="8">
                <FormItem class="btnForm">
                  <Button type="primary" @click="themeAddSubmit">保存</Button>
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Form>
      </Row>
      <Row class="rowModal">
        <Form
          ref="mainUrlForm"
          :model="mainUrlForm"
          inline
          :label-width="100"
          :rules="formValidate"
        >
          <Col :span="12">
            <h3 class="basicDetail">添加导航</h3>
            <Row>
              <Col :span="16">
                <FormItem label="导航名" prop="name" style="width: 100%">
                  <Input v-model="mainUrlForm.name" placeholder="请输入导航名，如 xx频道分类" />
                </FormItem>
              </Col>
              <Col :span="8">
                <FormItem class="btnForm">
                  <Button type="primary" @click="mainModalSubmit">保存</Button>
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col :span="12">
            <h3 class="basicDetail">添加导航数据</h3>
            <FormItem class="leftBtnForm">
              <Button type="primary" :disabled="mainUrlAbled" @click="mainDataSubmit">添加数据</Button>
            </FormItem>
          </Col>
        </Form>
      </Row>
      <Row class="rowModal">
        <Form
          ref="menuListForm"
          :model="menuListForm"
          inline
          :label-width="100"
          :rules="formValidate"
        >
          <Col :span="12">
            <h3 class="basicDetail">添加菜单栏</h3>
            <Row>
              <!-- <Col :span="16">
                <FormItem label="菜单栏" prop="name" style="width: 100%">
                  <Input v-model="menuListForm.name" placeholder="请输入导航名，如 xx频道分类" />
                </FormItem>
              </Col>-->
              <FormItem>
                <Button type="info" @click="downloadTemple">下载excel模板</Button>
              </FormItem>
              <FormItem class="leftBtnForm">
                <Button type="primary" @click="menuModalSubmit">导入数据</Button>
              </FormItem>
            </Row>
          </Col>
          <!-- <Col :span="12">
            <h3 class="basicDetail">添加菜单栏数据</h3>
            <FormItem class="leftBtnForm">
              <Button type="primary" :disabled="menuListAbled" @click="mainDataSubmit">添加数据</Button>
            </FormItem>
          </Col>-->
        </Form>
      </Row>
    </Card>

    <Modal title="导入菜单栏数据" v-model="menuVisible" :mask-closable="false" :width="600">
      <div style="display:flex;justify-content: space-between;align-items: center;">
        <!-- <Upload action :before-upload="beforeUploadImport" accept=".xls, .xlsx">
          <Button
            :loading="reading"
            icon="ios-cloud-upload-outline"
            style="margin-right:10px"
          >上传Excel文件</Button>
          <span v-if="uploadfile.name">当前选择文件：{{ uploadfile.name }}</span>
        </Upload>
        <Button @click="clearImportData" icon="md-trash">清空数据</Button>-->
        <div>
          <Button
            :loading="reading"
            icon="ios-cloud-upload-outline"
            style="margin-right:10px"
            @click="importExcel"
          >上传Excel文件</Button>
          <input
            v-show="false"
            type="file"
            @change="getExcelFile"
            accept=".xls, .xlsx"
            ref="excelFile"
          />
          <span v-if="uploadfile.name">当前选择文件：{{ uploadfile.name }}</span>
        </div>
        <Button @click="clearImportData" icon="md-trash">清空数据</Button>
      </div>
      <div slot="footer">
        <Button type="text" @click="handleMenuCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handleMenuSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  getAllThemeList,
  themeAddModal,
  addModal,
  themeBlockId,
  importExcel,
} from "@/api/channel";
// 模版导入文件表数据
import { userColumns } from "@/libs/menuTemplate";
import qs from "qs";
// excel转换工具类
import excel from "@/libs/excel";
export default {
  name: "blocksManage",
  data() {
    return {
      menuListAbled: true,
      menuListForm: {
        name: "",
      },
      formValidate: {},
      submitLoading: false,
      channelId: "",
      // 主题模块
      themeList: [],
      themeForm: {
        themeId: "",
      },
      themeBlockId: "",
      // 导航栏模块
      mainUrlForm: {
        name: "",
      },
      mainUrlAbled: true,
      // 菜单栏
      menuListId: "",
      menuVisible: false,
      reading: false,
      uploadfile: {},
      importTableData: [],
    };
  },
  created() {
    this.channelId = this.$route.query.id;
    this.themeBlockId = this.$route.query.channelId;
    let blcokSession = this.getSession();
    if (blcokSession.themeId) {
      this.themeForm.themeId = blcokSession.themeId;
    }
    if (blcokSession.mainUrlName) {
      this.mainUrlForm.name = blcokSession.mainUrlName;
      this.mainUrlAbled = false;
    }
  },
  mounted() {
    this.getThemeList();
  },
  methods: {
    // 获取/设置session
    getSession() {
      return JSON.parse(sessionStorage.getItem("blcokSession") || "{}");
    },
    setSession(session) {
      sessionStorage.setItem("blcokSession", JSON.stringify(session));
    },
    // 获取主题列表
    getThemeList() {
      getAllThemeList().then((res) => {
        if (res.success) {
          this.themeList = res.result;
        }
      });
    },
    // 添加主题模块
    themeAddSubmit() {
      let data = {
        blockId: this.themeBlockId,
        themeId: this.themeForm.themeId,
      };
      let blcokSession = this.getSession();
      themeAddModal(data).then((res) => {
        if (res.success) {
          this.$Message.success("操作成功");
          blcokSession.themeId = this.themeForm.themeId;
          this.setSession(blcokSession);
        }
      });
    },
    // 添加导航模块
    mainModalSubmit() {
      let data = {
        channelId: this.channelId,
        componentId: 3,
        DISC: 60,
        name: this.mainUrlForm.name,
      };
      let blcokSession = this.getSession();
      if (blcokSession.mainUrlId) {
        data.blockId = blcokSession.mainUrlId;
      }
      addModal(qs.stringify(data)).then((res) => {
        this.$Message.success("操作成功");
        blcokSession.mainUrlName = this.mainUrlForm.name;
        blcokSession.mainUrlId = res.result;
        this.setSession(blcokSession);
        this.mainUrlAbled = false;
      });
    },
    // 添加导航数据
    mainDataSubmit() {},
    // 添加菜单栏，导入excel
    importExcel() {
      this.$refs.excelFile.click();
    },
    menuModalSubmit() {
      this.menuVisible = true;
      let blcokSession = this.getSession();
      if (blcokSession.menuListId) {
        this.menuListId = blcokSession.menuListId;
      } else {
        themeBlockId(
          qs.stringify({ channelId: this.channelId, blockType: 2 })
        ).then((res) => {
          if (res.success) {
            this.menuListId = res.result;
            blcokSession.menuListId = res.result;
            this.setSession(blcokSession);
          }
        });
      }
    },
    // 导入数据模板
    downloadTemple() {
      let title = [];
      let key = [];
      userColumns.forEach((e) => {
        title.push(e.title);
        key.push(e.key);
      });
      const params = {
        title: title,
        key: [],
        data: [],
        autoWidth: true,
        filename: "导入数据模版",
      };
      excel.export_array_to_excel(params);
    },
    // 上传文件
    getExcelFile() {
      let file = this.$refs.excelFile.files[0];
      this.uploadfile = file;
    },
    clearImportData() {
      this.uploadfile = {};
    },
    beforeUploadImport(file) {
      this.uploadfile = file;
      const fileExt = file.name.split(".").pop().toLocaleLowerCase();
      if (fileExt == "xlsx" || fileExt == "xls") {
        this.readFile(file);
        this.file = file;
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
    // 读取文件
    readFile(file) {
      this.reading = true;
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onerror = (e) => {
        this.reading = false;
        this.$Message.error("文件读取出错");
      };
      reader.onload = (e) => {
        const data = e.target.result;
        const { header, results } = excel.read(data, "array");
        const tableTitle = header.map((item) => {
          return { title: item, key: item, minWidth: 100, align: "center" };
        });
        this.importTableData = results;
        // this.importColumns = tableTitle;
        this.reading = false;
        this.$Message.success("读取数据成功");
      };
    },
    handleMenuCancel() {
      this.uploadfile = {};
      this.menuVisible = false;
    },
    handleMenuSubmit() {
      if (!this.uploadfile.name) {
        return this.$Message.error("请先导入excel文件");
      }
      const fileExt = this.uploadfile.name.split(".").pop().toLocaleLowerCase();
      let ext = ["xlsx", "xls"]
      if (!ext.includes(fileExt)) {
        this.$Notice.warning({
          title: "文件类型错误",
          desc:
            "所选文件‘ " +
            this.uploadfile.name +
            " ’不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。",
        });
        return;
      }
      this.submitLoading = true;
      let formData = new FormData();
      formData.append("file", this.uploadfile);
      formData.append("blockId", this.menuListId);
      let file = {
        blockId: this.menuListId,
        formData
      }
      console.log(this.uploadfile, file);
      importExcel(formData).then((res) => {});
      // 传入导入数据 后端接收body数组列表批量导入
      // this.importRequest("请求路径", this.importTableData).then(res => {
      //   this.submitLoading = false;
      //   if (res.success) {
      //     this.importModalVisible = false;
      //     this.getDataList();
      //     this.$Modal.info({
      //       title: "导入结果",
      //       content: res.message
      //     });
      //   }
      // });
    },
  },
};
</script>

<style lang="less">
@import "./blocksManage.less";
</style>