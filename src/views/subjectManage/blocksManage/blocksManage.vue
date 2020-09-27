<template>
  <div>
    <Card>
      <!-- 主题模块 -->
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
                      >{{ item.name }}</Option
                    >
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
      <!-- 导航栏模块 -->
      <Row class="rowModal">
        <Form
          ref="mainUrlForm"
          :model="mainUrlForm"
          inline
          :label-width="100"
          :rules="formValidate"
        >
          <Col :span="12">
            <h3 class="basicDetail">添加导航栏</h3>
            <Row>
              <Col :span="16">
                <FormItem label="导航名" prop="name" style="width: 100%">
                  <Input
                    v-model="mainUrlForm.name"
                    placeholder="请输入导航名，如 xx频道分类"
                  />
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
            <h3 class="basicDetail">添加导航栏内容</h3>
            <FormItem>
              <Button
                type="primary"
                :disabled="mainUrlAbled"
                @click="mainDataSubmit"
                >添加数据</Button
              >
            </FormItem>
          </Col>
        </Form>
      </Row>
      <!-- 菜单栏模块 -->
      <Row class="rowModal">
        <Form ref="menuListForm" :model="menuListForm" inline>
          <Col :span="12">
            <h3 class="basicDetail">添加菜单栏</h3>
            <Row>
              <FormItem>
                <Button type="primary" @click="menuModalSubmit"
                  >导入数据</Button
                >
              </FormItem>
            </Row>
          </Col>
        </Form>
      </Row>
      <!-- banner图模块 -->
      <Row class="rowModal">
        <Form ref="menuListForm" :model="menuListForm" inline>
          <Col :span="12">
            <h3 class="basicDetail">添加banner图</h3>
            <Row>
              <FormItem>
                <Button type="primary" @click="bannerModalSubmit"
                  >添加banner图</Button
                >
              </FormItem>
            </Row>
          </Col>
        </Form>
      </Row>
      <!-- 数据展示模块 -->
      <Row class="rowModal">
        <Col :span="24">
          <h3 class="basicDetail">添加数据展示模块</h3>
          <Row class="operation" style="margin-bottom: 10px; margin-top: 10px">
            <Button type="primary" @click="labelModalSubmit"
              >添加数据展示模块</Button
            >
          </Row>
          <Row>
            <Table
              class="mygrid labelTable"
              :loading="loading"
              border
              :columns="labelColumns"
              :data="labelData"
              ref="table"
              @on-selection-change="changeSelect"
              style="padding-bootom: 10px"
            ></Table>
          </Row>
        </Col>
      </Row>
      <!-- 新模块 -->
      <Row class="rowModal">
        <Col :span="24">
          <h3 class="basicDetail">添加新模块</h3>
          <Row class="operation" style="margin-bottom: 10px; margin-top: 10px">
            <Form
              ref="newModalForm"
              :model="newModalForm"
              inline
              :label-width="90"
            >
              <Row>
                <Col span="7">
                  <FormItem
                    label="name"
                    prop="name"
                    :rules="{
                      required: true,
                      message: '内容不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <Input type="text" v-model="newModalForm.name"></Input>
                  </FormItem>
                </Col>
                <Col span="7">
                  <FormItem
                    label="defaultKey"
                    prop="defaultKey"
                    :rules="{
                      required: true,
                      message: '内容不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <Input
                      type="text"
                      v-model="newModalForm.defaultKey"
                    ></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="queryType" prop="queryType">
                    <Select v-model="newModalForm.queryType">
                      <Option :value="0">不匹配</Option>
                      <Option :value="1">标题</Option>
                      <Option :value="2">内容</Option>
                      <Option :value="3">附件</Option>
                      <Option :value="4">VIP</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="showType" prop="showType">
                    <Select v-model="newModalForm.showType">
                      <Option :value="1">关键词</Option>
                      <Option :value="2">进展</Option>
                      <Option :value="3">了解更多</Option>
                      <Option :value="4">附件下载</Option>
                      <Option :value="5">立即咨询</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="7">
                  <FormItem label="与值" prop="andKey">
                    <Input type="text" v-model="newModalForm.andKey"></Input>
                  </FormItem>
                </Col>
                <Col span="7">
                  <FormItem label="或值" prop="orKey">
                    <Input type="text" v-model="newModalForm.orKey"></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="type" prop="type">
                    <Select v-model="newModalForm.type">
                      <Option :value="1">1</Option>
                      <Option :value="2">2</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem>
                    <Button type="primary" @click="newModalSubmit">保存</Button>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Row>
        </Col>
      </Row>
      <!-- 附件下载模块 -->
      <Row class="rowModal">
        <Col :span="24">
          <h3 class="basicDetail">添加附件下载模块</h3>
          <Row class="operation" style="margin-bottom: 10px; margin-top: 10px">
            <Form
              ref="downloadModalForm"
              :model="downloadModalForm"
              inline
              :label-width="90"
            >
              <Row>
                <Col span="7">
                  <FormItem
                    label="name"
                    prop="name"
                    :rules="{
                      required: true,
                      message: '内容不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <Input type="text" v-model="downloadModalForm.name"></Input>
                  </FormItem>
                </Col>
                <Col span="7">
                  <FormItem
                    label="defaultKey"
                    prop="defaultKey"
                    :rules="{
                      required: true,
                      message: '内容不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <Input
                      type="text"
                      v-model="downloadModalForm.defaultKey"
                    ></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="queryType" prop="queryType">
                    <Select v-model="downloadModalForm.queryType">
                      <Option :value="0">不匹配</Option>
                      <Option :value="1">标题</Option>
                      <Option :value="2">内容</Option>
                      <Option :value="3">附件</Option>
                      <Option :value="4">VIP</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="showType" prop="showType">
                    <Select v-model="downloadModalForm.showType">
                      <Option :value="1">关键词</Option>
                      <Option :value="2">进展</Option>
                      <Option :value="3">了解更多</Option>
                      <Option :value="4">附件下载</Option>
                      <Option :value="5">立即咨询</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="7">
                  <FormItem label="与值" prop="andKey">
                    <Input
                      type="text"
                      v-model="downloadModalForm.andKey"
                    ></Input>
                  </FormItem>
                </Col>
                <Col span="7">
                  <FormItem label="或值" prop="orKey">
                    <Input
                      type="text"
                      v-model="downloadModalForm.orKey"
                    ></Input>
                  </FormItem>
                </Col>
                <Col span="5">
                  <FormItem label="type" prop="type">
                    <Select v-model="downloadModalForm.type">
                      <Option :value="1">1</Option>
                      <Option :value="2">2</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem>
                    <Button type="primary" @click="downloadModalSubmit"
                      >保存</Button
                    >
                    <Button @click="downloadModalReset">重置</Button>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Row>
        </Col>
      </Row>
      <!-- 彩色模块 -->
      <Row class="rowModal">
        <Col :span="24">
          <h3 class="basicDetail">添加中间数据模块</h3>
          <Row class="operation" style="margin-bottom: 10px; margin-top: 10px">
            <Button type="primary" @click="contentModalSubmit"
              >添加中间数据模块</Button
            >
          </Row>
          <Row>
            <Table
              class="mygrid labelTable"
              :loading="loading"
              border
              :columns="contentColumns"
              :data="contentData"
              ref="table"
              @on-selection-change="changeSelect"
              style="padding-bootom: 10px"
            ></Table>
          </Row>
        </Col>
      </Row>
    </Card>

    <!-- 导入导航栏数据 -->
    <Modal
      title="添加导航栏内容"
      v-model="mainUrlVisible"
      :mask-closable="false"
      :width="600"
    >
      <Form
        ref="mainUrlModalForm"
        :model="mainUrlModalForm"
        :rules="mainUrlValidate"
        :label-width="80"
      >
        <FormItem label="导航名" prop="name">
          <Input
            type="text"
            v-model="mainUrlModalForm.name"
            placeholder="请输入导航名，用空格隔开，如:医疗器械 拟在建项目 建筑工程"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handleMainCancel">取消</Button>
        <Button
          type="primary"
          :loading="submitLoading"
          @click="handleMainSubmit"
          >提交</Button
        >
      </div>
    </Modal>

    <!-- 导入文件 -->
    <Modal
      title="导入菜单栏数据"
      v-model="menuVisible"
      :mask-closable="false"
      :width="600"
    >
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div>
          <Button
            :loading="reading"
            icon="ios-cloud-upload-outline"
            style="margin-right: 10px"
            @click="importExcel"
            >上传Excel文件</Button
          >
          <input
            v-show="false"
            type="file"
            @change="getExcelFile"
            accept=".xls, .xlsx"
            ref="excelFile"
          />
          <span v-if="uploadfile.name"
            >当前选择文件：{{ uploadfile.name }}</span
          >
        </div>
        <Button @click="clearImportData" icon="md-trash">清空数据</Button>
      </div>
      <div slot="footer">
        <Button type="text" @click="handleMenuCancel">取消</Button>
        <Button
          type="primary"
          :loading="submitLoading"
          @click="handleMenuSubmit"
          >提交</Button
        >
      </div>
    </Modal>

    <!-- banner图 -->
    <Modal
      title="添加banner图"
      v-model="bannerVisible"
      :mask-closable="false"
      :width="800"
    >
      <Form ref="bannerModalForm" :model="bannerModalForm" :label-width="80">
        <Row v-for="(item, index) in bannerModalForm.bannerList" :key="index">
          <Col span="10">
            <FormItem
              :label="'banner' + (index + 1)"
              :prop="'bannerList.' + index + '.url'"
              :rules="{
                required: true,
                message: '图片路径不能为空',
                trigger: 'blur',
              }"
            >
              <Input
                type="text"
                v-model="item.url"
                placeholder="请输入图片路径"
              ></Input>
            </FormItem>
          </Col>
          <Col span="7" style="margin-left: 10px">
            <FormItem
              class="leftBtnForm"
              :prop="'bannerList.' + index + '.name'"
              :rules="{
                required: true,
                message: '图片链接不能为空',
                trigger: 'blur',
              }"
            >
              <Input
                type="text"
                v-model="item.name"
                placeholder="请输入图片链接"
              ></Input>
            </FormItem>
          </Col>
          <Col span="4" style="margin-left: 10px">
            <FormItem
              class="leftBtnForm"
              :prop="'bannerList.' + index + '.color'"
              :rules="{
                required: true,
                message: '图片背景色不能为空',
                trigger: 'change',
              }"
            >
              <ColorPicker v-model="item.color" />
            </FormItem>
          </Col>
          <Col span="2" v-if="index !== 0">
            <Button @click="handleBannerRemove(index)">删除</Button>
          </Col>
        </Row>
        <FormItem>
          <Row>
            <Col span="8">
              <Button type="dashed" long @click="handleBannerAdd" icon="md-add"
                >添加图片</Button
              >
            </Col>
          </Row>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handleBannerCancel">取消</Button>
        <Button
          type="primary"
          :loading="submitLoading"
          @click="handleBannerSubmit"
          >提交</Button
        >
      </div>
    </Modal>

    <!-- 数据展示模块 -->
    <Modal
      :title="modalLabelText"
      v-model="labelVisible"
      :mask-closable="false"
      :width="1000"
    >
      <Form
        ref="labelModalForm"
        :model="labelModalForm"
        inline
        :label-width="90"
      >
        <Row>
          <Col span="7">
            <FormItem
              label="name"
              prop="name"
              :rules="{
                required: true,
                message: '内容不能为空',
                trigger: 'blur',
              }"
            >
              <Input type="text" v-model="labelModalForm.name"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem
              label="defaultKey"
              prop="defaultKey"
              :rules="{
                required: true,
                message: '内容不能为空',
                trigger: 'blur',
              }"
            >
              <Input type="text" v-model="labelModalForm.defaultKey"></Input>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="queryType" prop="queryType">
              <Select v-model="labelModalForm.queryType">
                <Option :value="0">不匹配</Option>
                <Option :value="1">标题</Option>
                <Option :value="2">内容</Option>
                <Option :value="3">附件</Option>
                <Option :value="4">VIP</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="showType" prop="showType">
              <Select v-model="labelModalForm.showType">
                <Option :value="1">关键词</Option>
                <Option :value="2">进展</Option>
                <Option :value="3">了解更多</Option>
                <Option :value="4">附件下载</Option>
                <Option :value="5">立即咨询</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="7">
            <FormItem label="与值" prop="andKey">
              <Input type="text" v-model="labelModalForm.andKey"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="或值" prop="orKey">
              <Input type="text" v-model="labelModalForm.orKey"></Input>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="type" prop="type">
              <Select v-model="labelModalForm.type">
                <Option :value="1">1</Option>
                <Option :value="2">2</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="text" @click="labelVisible = false">取消</Button>
        <Button
          type="primary"
          :loading="submitLoading"
          @click="handleLabelSubmit"
          >提交</Button
        >
      </div>
    </Modal>

    <!-- 中间数据模块 -->
    <Modal
      :title="modalContentText"
      v-model="contentVisible"
      :mask-closable="false"
      :width="1000"
    >
      <Form
        ref="contentModalForm"
        :model="contentModalForm"
        inline
        :label-width="90"
      >
        <Row>
          <Col span="7">
            <FormItem
              label="name"
              prop="name"
              :rules="{
                required: true,
                message: '内容不能为空',
                trigger: 'blur',
              }"
            >
              <Input type="text" v-model="contentModalForm.name"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem
              label="defaultKey"
              prop="defaultKey"
              :rules="{
                required: true,
                message: '内容不能为空',
                trigger: 'blur',
              }"
            >
              <Input type="text" v-model="contentModalForm.defaultKey"></Input>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="queryType" prop="queryType">
              <Select v-model="contentModalForm.queryType">
                <Option :value="0">不匹配</Option>
                <Option :value="1">标题</Option>
                <Option :value="2">内容</Option>
                <Option :value="3">附件</Option>
                <Option :value="4">VIP</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="showType" prop="showType">
              <Select v-model="contentModalForm.showType">
                <Option :value="1">关键词</Option>
                <Option :value="2">进展</Option>
                <Option :value="3">了解更多</Option>
                <Option :value="4">附件下载</Option>
                <Option :value="5">立即咨询</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="7">
            <FormItem label="与值" prop="andKey">
              <Input type="text" v-model="contentModalForm.andKey"></Input>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="或值" prop="orKey">
              <Input type="text" v-model="contentModalForm.orKey"></Input>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="type" prop="type">
              <Select v-model="contentModalForm.type">
                <Option :value="1">1</Option>
                <Option :value="2">2</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="text" @click="contentVisible = false">取消</Button>
        <Button
          type="primary"
          :loading="submitLoading"
          @click="handleContentSubmit"
          >提交</Button
        >
      </div>
    </Modal>

    <!-- 彩色数据模块 -->
    <Modal
      title="编辑彩色数据模块"
      v-model="colorfulVisible"
      :mask-closable="false"
      :width="600"
    >
      <Form
        ref="colorfulModalForm"
        :model="colorfulModalForm"
        :label-width="80"
      >
        <FormItem
          prop="nameStr"
          :rules="{
            required: true,
            message: '内容不能为空',
            trigger: 'blur',
          }"
          label="数据内容"
        >
          <Input
            type="text"
            v-model="colorfulModalForm.nameStr"
            placeholder="请输入彩色模块数据,数据之间使用空格隔开,如:水泥 石材 混凝土"
          ></Input>
        </FormItem>
        <FormItem
          prop="imgurl"
          :rules="{
            required: true,
            message: '图片路径不能为空',
            trigger: 'blur',
          }"
          label="图片路径"
        >
          <Input
            type="text"
            v-model="colorfulModalForm.imgurl"
            placeholder="请输入图片路径"
          ></Input>
        </FormItem>
        <FormItem
          prop="color"
          :rules="{
            required: true,
            message: '颜色不能为空',
            trigger: 'change',
          }"
          label="颜色"
        >
          <ColorPicker v-model="colorfulModalForm.color" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handleColorfulCancel">取消</Button>
        <Button
          type="primary"
          :loading="submitLoading"
          @click="handleColorfulSubmit"
          >提交</Button
        >
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
  addManualData,
  saveshowdataBlock,
  removeLabelBlock,
  saveNewData,
  saveDownloadData,
  saveContentData,
  saveColorData,
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
      mainUrlVisible: false,
      mainUrlForm: {
        name: "",
      },
      mainUrlModalForm: {
        name: "",
      },
      mainUrlValidate: {
        name: { required: true, message: "内容不能为空", trigger: "blur" },
      },
      mainUrlAbled: true,
      // 菜单栏
      menuListId: "",
      menuVisible: false,
      reading: false,
      uploadfile: {},
      importTableData: [],
      // banner
      bannerVisible: false,
      bannerModalForm: {
        bannerList: [
          {
            url: "",
            name: "javascript:void(0);",
            color: "",
          },
        ],
      },
      // 数据展示模块
      labelIndex: 1,
      labelVisible: false,
      keywords: "",
      modalType: 1,
      modalLabelText: "添加数据展示模块",
      labelBlockId: "",
      labelModalForm: {
        andKey: "",
        orKey: "",
        type: 1,
        name: "",
        queryType: 0,
        showType: 1,
        defaultKey: "",
      },
      labelData: [],
      labelColumns: [
        {
          type: "index",
          title: "序号",
          align: "center",
        },
        {
          title: "name",
          key: "name",
          align: "center",
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
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.labelEdit(params.row);
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
                      this.labelRemove(params.row);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      // 新模块
      newModalForm: {
        andKey: "",
        orKey: "",
        type: 1,
        name: "",
        queryType: 0,
        showType: 1,
        defaultKey: "",
      },
      // 下载模块
      downloadModalForm: {
        andKey: "",
        orKey: "",
        type: 1,
        name: "",
        queryType: 0,
        showType: 1,
        defaultKey: "",
      },
      // 中间模块
      contentIndex: 1,
      contentVisible: false,
      contentBlockId: "",
      contentModalForm: {
        andKey: "",
        orKey: "",
        type: 1,
        name: "",
        queryType: 0,
        showType: 1,
        defaultKey: "",
      },
      modalContentText: "添加中间模块数据",
      contentData: [],
      contentColumns: [
        {
          type: "index",
          title: "序号",
          align: "center",
        },
        {
          title: "name",
          key: "name",
          align: "center",
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth: 300,
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
                      this.contentEdit(params.row);
                    },
                  },
                },
                "编辑中间模块数据"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.colorfulEdit(params.row);
                    },
                  },
                },
                "编辑彩色模块数据"
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
                      this.contentRemove(params.row);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      // 彩色模块
      colorfulVisible: false,
      colorfulBlockId: "",
      colorfulModalForm: {
        nameStr: "",
        imgurl: "",
        color: "",
      },
    };
  },
  created() {
    this.channelId = this.$route.query.id;
    this.themeBlockId = this.$route.query.themeId;
    let blcokSession = this.getSession();
    if (blcokSession.themeId) {
      this.themeForm.themeId = blcokSession.themeId;
    }
    if (blcokSession.mainUrlName) {
      this.mainUrlForm.name = blcokSession.mainUrlName;
      this.mainUrlAbled = false;
    }
    this.getTableList();
    this.getContentTableList();
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
    mainDataSubmit() {
      this.mainUrlVisible = true;
      this.$refs.mainUrlModalForm.resetFields();
    },
    handleMainSubmit() {
      let blcokSession = this.getSession();
      let data = {
        list: [{ name: this.mainUrlModalForm.name }],
        blockId: blcokSession.mainUrlId,
        dataType: 1,
      };
      this.$refs.mainUrlModalForm.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          addManualData(data).then((res) => {
            if (res.success) {
              this.submitLoading = false;
              this.mainUrlVisible = false;
              this.$Message.success("添加导航栏内容成功");
            }
          });
        }
      });
    },
    handleMainCancel() {
      this.mainUrlVisible = false;
    },
    // 添加菜单栏，导入excel
    importExcel() {
      this.$refs.excelFile.click();
    },
    menuModalSubmit() {
      this.menuVisible = true;
      this.uploadfile = {};
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
    getExcelFile() {
      let file = this.$refs.excelFile.files[0];
      this.uploadfile = file;
    },
    clearImportData() {
      this.uploadfile = {};
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
      }
      this.submitLoading = true;
      let formData = new FormData();
      formData.append("file", this.uploadfile);
      formData.append("blockId", this.menuListId);
      importExcel(formData).then((res) => {
        if (res.success) {
          this.submitLoading = true;
          this.$Message.success("导入成功");
          this.menuVisible = false;
        }
      });
    },
    // 添加banner图
    bannerModalSubmit() {
      this.bannerVisible = true;
      this.$refs.bannerModalForm.resetFields();
      this.bannerModalForm = {
        bannerList: [
          {
            url: "",
            name: "javascript:void(0);",
            color: "",
          },
        ],
      };
      let blcokSession = this.getSession();
      if (!blcokSession.bannerBlockId) {
        themeBlockId(
          qs.stringify({ channelId: this.channelId, blockType: 3 })
        ).then((res) => {
          if (res.success) {
            blcokSession.bannerBlockId = res.result;
            this.setSession(blcokSession);
          }
        });
      }
    },
    handleBannerAdd() {
      this.bannerModalForm.bannerList.push({
        name: "javascript:void(0);",
        url: "",
        color: "",
      });
    },
    handleBannerRemove(index) {
      this.bannerModalForm.bannerList.splice(index, 1);
    },
    handleBannerSubmit() {
      let blcokSession = this.getSession();
      let data = {
        list: this.bannerModalForm.bannerList,
        blockId: blcokSession.bannerBlockId,
        dataType: 2,
      };
      this.$refs.bannerModalForm.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          addManualData(data).then((res) => {
            if (res.success) {
              this.submitLoading = false;
              this.$Message.success("添加banner图成功");
              this.bannerVisible = false;
            }
          });
        }
      });
    },
    handleBannerCancel() {
      this.bannerVisible = false;
    },
    // 添加lable_list数据
    labelModalSubmit() {
      this.labelVisible = true;
      this.modalType = 1;
      this.modalLabelText = "添加数据展示模块";
      this.$refs.labelModalForm.resetFields();
    },
    labelEdit(v) {
      this.labelVisible = true;
      this.$refs.labelModalForm.resetFields();
      this.labelModalForm.name = v.name;
      this.modalType = 2;
      this.modalLabelText = "编辑数据展示模块";
      this.labelBlockId = v.labelBlockId;
    },
    labelRemove(v) {
      let data = {
        blockId: v.labelBlockId,
      };
      let blcokSession = this.getSession();
      this.$Modal.confirm({
        title: "确认删除",
        // 记得确认修改此处
        content: "您确认要删除该数据?",
        loading: true,
        onOk: () => {
          // 删除
          removeLabelBlock(data).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("删除成功");
              let index = blcokSession.labelList.findIndex((item) => {
                return v.labelBlockId == item.labelBlockId;
              });
              blcokSession.labelList.splice(index, 1);
              this.setSession(blcokSession);
              this.getTableList();
            }
          });
        },
      });
    },
    handleLabelSubmit() {
      let blcokSession = this.getSession();
      blcokSession.labelList = blcokSession.labelList || [];
      this.$refs.labelModalForm.validate((valid) => {
        if (valid) {
          if (this.modalType === 1) {
            let data = {
              ...this.labelModalForm,
              channelId: this.channelId,
            };
            saveshowdataBlock(qs.stringify(data)).then((res) => {
              if (res.result) {
                this.$Message.success("添加数据展示模块成功");
                this.labelVisible = false;
                blcokSession.labelList.push({
                  labelBlockId: res.result,
                  name: this.labelModalForm.name,
                });
                this.setSession(blcokSession);
                this.getTableList();
              }
            });
          } else if (this.modalType === 2) {
            let data = {
              ...this.labelModalForm,
              channelId: this.channelId,
              blockId: this.labelBlockId,
            };
            saveshowdataBlock(qs.stringify(data)).then((res) => {
              if (res.success) {
                this.$Message.success("编辑数据展示模块成功");
                this.labelVisible = false;
                blcokSession.labelList.forEach((item) => {
                  if (this.labelBlockId === item.labelBlockId) {
                    item.name = this.labelModalForm.name;
                  }
                });
                this.setSession(blcokSession);
                this.getTableList();
              }
            });
          }
        }
      });
    },
    getTableList() {
      let blcokSession = this.getSession();
      this.labelData = blcokSession.labelList || [];
    },
    // 新模块
    newModalSubmit() {
      let blcokSession = this.getSession();
      this.$refs.newModalForm.validate((valid) => {
        if (valid) {
          let data;
          if (blcokSession.newBlockId) {
            data = {
              ...this.newModalForm,
              channelId: this.channelId,
              blockId: blcokSession.newBlockId,
            };
          } else {
            data = {
              ...this.newModalForm,
              channelId: this.channelId,
            };
          }
          saveNewData(qs.stringify(data)).then((res) => {
            if (res.success) {
              this.$Message.success("新模块添加成功");
              blcokSession.newBlockId = res.result;
              this.setSession(blcokSession);
              this.getTableList();
            }
          });
        }
      });
    },
    // 附件下载
    downloadModalSubmit() {
      let blcokSession = this.getSession();
      this.$refs.downloadModalForm.validate((valid) => {
        if (valid) {
          let data;
          if (blcokSession.downloadBlockId) {
            data = {
              ...this.downloadModalForm,
              channelId: this.channelId,
              blockId: blcokSession.downloadBlockId,
            };
          } else {
            data = {
              ...this.downloadModalForm,
              channelId: this.channelId,
            };
          }
          saveDownloadData(qs.stringify(data)).then((res) => {
            if (res.success) {
              this.$Message.success("新模块添加成功");
              blcokSession.downloadBlockId = res.result;
              this.setSession(blcokSession);
              this.getTableList();
            }
          });
        }
      });
    },
    // 中间模块
    contentModalSubmit() {
      this.contentVisible = true;
      this.modalType = 1;
      this.modalContentText = "添加中间数据模块";
      this.$refs.contentModalForm.resetFields();
    },
    contentEdit(v) {
      this.contentVisible = true;
      this.$refs.contentModalForm.resetFields();
      this.contentModalForm.name = v.name;
      this.modalType = 2;
      this.modalcontentText = "编辑中间数据模块";
      this.contentBlockId = v.contentBlockId;
    },
    handleContentSubmit() {
      let blcokSession = this.getSession();
      blcokSession.contentList = blcokSession.contentList || [];
      this.$refs.contentModalForm.validate((valid) => {
        if (valid) {
          if (this.modalType === 1) {
            let contentIndex = blcokSession.contentIndex || 1;
            let data = {
              ...this.contentModalForm,
              channelId: this.channelId,
              sortNo: contentIndex,
            };
            saveContentData(qs.stringify(data)).then((res) => {
              if (res.result) {
                this.$Message.success("添加中间数据模块成功");
                this.contentVisible = false;
                contentIndex++;
                blcokSession.contentList.push({
                  contentBlockId: res.result.content_blockId,
                  colorfulId: res.result.color_blockId,
                  name: this.contentModalForm.name,
                });
                blcokSession.contentIndex = contentIndex;
                this.setSession(blcokSession);
                this.getContentTableList();
              }
            });
          } else if (this.modalType === 2) {
            let data = {
              ...this.contentModalForm,
              channelId: this.channelId,
              blockId: this.contentBlockId,
            };
            saveContentData(qs.stringify(data)).then((res) => {
              if (res.success) {
                this.$Message.success("编辑中间数据模块成功");
                this.contentVisible = false;
                blcokSession.contentList.forEach((item) => {
                  if (this.contentBlockId === item.contentBlockId) {
                    item.name = this.contentModalForm.name;
                  }
                });
                this.setSession(blcokSession);
                this.getContentTableList();
              }
            });
          }
        }
      });
    },
    getContentTableList() {
      let blcokSession = this.getSession();
      this.contentData = blcokSession.contentList || [];
    },
    // 编辑彩色模块
    colorfulEdit(v) {
      this.colorfulVisible = true;
      this.colorfulBlockId = v.colorfulId;
      this.$refs.colorfulModalForm.resetFields();
    },
    handleColorfulSubmit() {
      this.$refs.colorfulModalForm.validate((valid) => {
        if (valid) {
          let data = {
            ...this.colorfulModalForm,
            blockId: this.colorfulBlockId,
          };
          saveColorData(qs.stringify(data)).then((res) => {
            this.$Message.success("编辑彩色模块成功");
            this.colorfulVisible = false;
          });
        }
      });
    },
    handleColorfulCancel() {
      this.colorfulVisible = false;
    },
  },
};
</script>

<style lang="less">
@import "./blocksManage.less";
</style>