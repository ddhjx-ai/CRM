<template>
  <div>
    <div class="maskLoading" v-if="isShow">
      <Button :loading="maskLoading">加载中...</Button>
    </div>
    <Card>
      <!-- 主题模块 -->
      <Row class="rowModal">
        <h1 :style="{ color: themeColor }">
          {{ channelName }}
        </h1>
      </Row>
      <Row class="rowModal">
        <Form
          ref="themeForm"
          :model="themeForm"
          :rules="ruleValidate"
          inline
          :label-width="100"
        >
          <Col :span="12">
            <h3 style="margin-bottom: 10px">选择主题</h3>
            <Row>
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
            </Row>
            <Row>
              <FormItem>
                <Button
                  type="primary"
                  @click="themeAddSubmit"
                  :loading="themeLoading"
                  >保存</Button
                >
              </FormItem>
            </Row>
          </Col>
        </Form>
      </Row>
      <!-- 导航栏模块 -->
      <Row class="rowModal">
        <Form
          ref="mainUrlModalForm"
          :model="mainUrlModalForm"
          inline
          :label-width="100"
          :rules="ruleValidate"
        >
          <Col :span="12">
            <h3 style="margin-bottom: 10px">添加导航栏</h3>
            <Row>
              <FormItem label="导航名" prop="title" style="width: 100%">
                <Input
                  v-model="mainUrlModalForm.title"
                  placeholder="请输入导航名，如 xx频道分类"
                />
              </FormItem>
            </Row>
            <Row>
              <FormItem label="导航内容" prop="name" style="width: 100%">
                <Input
                  v-model="mainUrlModalForm.name"
                  placeholder="请输入导航内容，用空格隔开，如:医疗器械 拟在建项目 建筑工程"
                />
              </FormItem>
            </Row>
            <Row class="operation">
              <FormItem>
                <Button
                  type="primary"
                  @click="mainModalSubmit"
                  :loading="mainLoading"
                  >保存</Button
                >
                <Button @click="ModalReset('mainUrlModalForm')">重置</Button>
              </FormItem>
            </Row>
          </Col>
        </Form>
      </Row>
      <!-- 菜单栏模块 -->
      <Row class="rowModal">
        <Form ref="menuListForm" inline :label-width="100">
          <Col :span="12">
            <h3 style="margin-bottom: 10px">添加菜单栏</h3>
            <Row>
              <FormItem style="width: 100%">
                <Button
                  type="primary"
                  @click="downloadTemplate"
                  icon="ios-cloud-download-outline"
                  >下载Excel模板</Button
                >
                <a
                  href="./template.xlsx"
                  download="模板"
                  ref="excelDownload"
                  v-show="false"
                  >下载</a
                >
              </FormItem>
              <FormItem style="width: 100%">
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  "
                >
                  <div>
                    <Button
                      icon="ios-cloud-upload-outline"
                      style="margin-right: 10px"
                      @click="importFile"
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
                      >当前文件：{{ uploadfile.name }}</span
                    >
                  </div>
                </div>
              </FormItem>
            </Row>
            <Row class="operation">
              <FormItem>
                <Button
                  type="primary"
                  @click="menuModalSubmit"
                  :loading="menuLoading"
                  >导入</Button
                >
                <Button @click="clearImportData">重置</Button>
                <Button
                  type="primary"
                  @click="getMenuView"
                  :disabled="!menuBlockId"
                  :title="!menuBlockId ? '未上传Excel文件，请先上传' : ''"
                  >查看文件内容</Button
                >
              </FormItem>
            </Row>
          </Col>
        </Form>
      </Row>
      <!-- banner图模块 -->
      <Row class="rowModal">
        <h3 style="margin-bottom: 10px">添加banner图</h3>
        <Col :span="20">
          <Form
            ref="bannerModalForm"
            :model="bannerModalForm"
            :label-width="100"
          >
            <Row
              v-for="(item, index) in bannerModalForm.bannerList"
              :key="index"
              :gutter="10"
            >
              <Col span="10">
                <FormItem
                  style="width: 100%"
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
              <Col span="7">
                <FormItem
                  style="width: 100%"
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
                    style="margin-left: 0px"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="2">
                <FormItem
                  style="width: 100%"
                  class="leftBtnForm"
                  :prop="'bannerList.' + index + '.color'"
                  :rules="{
                    required: true,
                    message: '颜色不能为空',
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
            <Row>
              <FormItem>
                <Col span="6">
                  <Button
                    type="dashed"
                    long
                    @click="handleBannerAdd"
                    icon="md-add"
                    >添加图片</Button
                  >
                </Col>
              </FormItem>
            </Row>
            <Row class="operation">
              <FormItem style="width: 100%">
                <Col span="24">
                  <Button
                    type="primary"
                    :loading="bannerLoading"
                    @click="handleBannerSubmit"
                    >保存</Button
                  >
                  <Button @click="ModalBannerReset('bannerModalForm')"
                    >重置</Button
                  >
                </Col>
              </FormItem>
            </Row>
          </Form>
        </Col>
      </Row>
      <!-- 数据展示模块 -->
      <Row class="rowModal">
        <Col :span="24">
          <h3 style="margin-bottom: 10px">添加数据展示模块</h3>
          <Row class="operation" style="margin-bottom: 10px">
            <Button type="primary" icon="md-add" @click="labelModalSubmit"
              >添加</Button
            >
          </Row>
          <Row>
            <Table
              class="mygrid labelTable"
              :loading="loading"
              border
              :columns="labelColumns"
              :data="labelData"
              ref="labelTable"
              @on-selection-change="changeSelect"
              style="padding-bootom: 10px"
            ></Table>
          </Row>
        </Col>
      </Row>
      <!-- 新模块 -->
      <Row class="rowModal">
        <Col :span="24">
          <h3 style="margin-bottom: 10px">添加新模块</h3>
          <Row class="operation" style="margin-bottom: 10px; margin-top: 10px">
            <Form
              ref="newModalForm"
              :model="newModalForm"
              inline
              :label-width="95"
            >
              <Row>
                <Col span="12">
                  <FormItem
                    label="queryType"
                    prop="queryType"
                    style="width: 100%"
                  >
                    <Select
                      v-model="newModalForm.queryType"
                      @on-change="newQuerySele"
                    >
                      <!-- <Option :value="0">不匹配</Option> -->
                      <Option :value="1">标题</Option>
                      <Option :value="2">内容</Option>
                      <!-- <Option :value="3">附件</Option> -->
                      <Option :value="4">VIP</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem
                    label="showType"
                    prop="showType"
                    style="width: 100%"
                  >
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
                <Col span="12">
                  <FormItem label="与值" prop="andKey" style="width: 100%">
                    <Input
                      type="text"
                      v-model="newModalForm.andKey"
                      placeholder="关键词之间用空格隔开"
                    ></Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="或值" prop="orKey" style="width: 100%">
                    <Input
                      type="text"
                      v-model="newModalForm.orKey"
                      placeholder="关键词之间用空格隔开"
                    ></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem label="type" prop="type" style="width: 100%">
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
                    <Button
                      type="primary"
                      @click="getNewKeywords('newModalForm')"
                      >生成关键词</Button
                    >
                    <Button
                      type="info"
                      @click="toKeywordsList(newBlockId)"
                      :disabled="!newBlockId"
                      >查看关键词</Button
                    >
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem
                    style="width: 100%"
                    label="title"
                    prop="name"
                    :rules="{
                      required: true,
                      message: '内容不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <Input
                      type="text"
                      v-model="newModalForm.name"
                      placeholder="请输入新模块标题"
                    ></Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem
                    style="width: 100%"
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
                      placeholder="默认关键词"
                    ></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row v-if="newModalForm.queryType == 4">
                <Col span="24">
                  <FormItem
                    label="一级行业"
                    prop="categoryIds"
                    style="width: 100%"
                  >
                    <Select v-model="newModalForm.categoryIds" multiple>
                      <Option
                        v-for="item in firstList"
                        :key="item.id"
                        :value="item.id"
                        >{{ item.name }}</Option
                      >
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem
                    label="搜索范围"
                    prop="caegoryIds2"
                    style="width: 100%"
                  >
                    <search-checkbox :searchValue.sync="newModalForm.caegoryIds2"></search-checkbox>
                    <!-- <RadioGroup v-model="newModalForm.caegoryIds2">
                      <Radio
                        label="1"
                        :disabled="newModalForm.queryType == 4"
                        border
                        >招标采购信息搜索</Radio
                      >
                      <Radio
                        label="2"
                        :disabled="newModalForm.queryType == 4"
                        border
                        >项目信息搜索</Radio
                      >
                      <Radio
                        label="3"
                        :disabled="newModalForm.queryType != 4"
                        border
                        >VIP信息搜索</Radio
                      >
                      <Radio
                        label="4"
                        :disabled="newModalForm.queryType == 4"
                        border
                        >招标信息搜索</Radio
                      >
                      <Radio
                        label="5"
                        :disabled="newModalForm.queryType == 4"
                        border
                        >采购信息搜索</Radio
                      >
                    </RadioGroup> -->
                  </FormItem>
                </Col>
                <Col span="24" style="margin-left:95px;margin-top:-30px;color:#ed4014">
            <p>提示：招标采购类和项目类不可同时选择!</p>
          </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem label="关键词" style="width: 100%">
                    <Input
                      type="textarea"
                      v-model="newModalForm.keywords"
                    ></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormItem label="blockId" style="width: 100%">
                    <span>{{ newBlockId }}</span>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <FormItem>
                  <Button type="primary" @click="newModalSubmit">保存</Button>
                  <Button @click="ModalReset('newModalForm')">重置</Button>
                </FormItem>
              </Row>
            </Form>
          </Row>
        </Col>
      </Row>
      <!-- 附件下载模块 -->
      <Row class="rowModal">
        <Col :span="24">
          <h3 style="margin-bottom: 10px">添加附件下载模块</h3>
          <Row class="operation" style="margin-bottom: 10px">
            <Form
              ref="downloadModalForm"
              :model="downloadModalForm"
              inline
              :label-width="95"
            >
              <Row>
                <Col span="12">
                  <FormItem
                    label="queryType"
                    prop="queryType"
                    style="width: 100%"
                  >
                    <Select
                      v-model="downloadModalForm.queryType"
                      @on-change="downloadQuerySele"
                    >
                      <!-- <Option :value="0">不匹配</Option> -->
                      <Option :value="1">标题</Option>
                      <Option :value="2">内容</Option>
                      <!-- <Option :value="3">附件</Option> -->
                      <Option :value="4">VIP</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem
                    label="showType"
                    prop="showType"
                    style="width: 100%"
                  >
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
                <Col span="12">
                  <FormItem label="与值" prop="andKey" style="width: 100%">
                    <Input
                      type="text"
                      v-model="downloadModalForm.andKey"
                      placeholder="关键词之间用空格隔开"
                    ></Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="或值" prop="orKey" style="width: 100%">
                    <Input
                      type="text"
                      v-model="downloadModalForm.orKey"
                      placeholder="关键词之间用空格隔开"
                    ></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem label="type" prop="type" style="width: 100%">
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
                    <Button
                      type="primary"
                      @click="getNewKeywords('downloadModalForm')"
                      >生成关键词</Button
                    >
                    <Button
                      type="info"
                      @click="toKeywordsList(downloadBlockId)"
                      :disabled="!downloadBlockId"
                      >查看关键词</Button
                    >
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem
                    style="width: 100%"
                    label="title"
                    prop="name"
                    :rules="{
                      required: true,
                      message: '内容不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <Input
                      type="text"
                      v-model="downloadModalForm.name"
                      placeholder="请输入附件下载模块标题"
                    ></Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem
                    style="width: 100%"
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
                      placeholder="默认关键词"
                    ></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row v-if="downloadModalForm.queryType == 4">
                <Col span="24">
                  <FormItem
                    label="一级行业"
                    prop="categoryIds"
                    style="width: 100%"
                  >
                    <Select v-model="downloadModalForm.categoryIds" multiple>
                      <Option
                        v-for="item in firstList"
                        :key="item.id"
                        :value="item.id"
                        >{{ item.name }}</Option
                      >
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem
                    label="搜索范围"
                    prop="caegoryIds2"
                    style="width: 100%"
                  >
                    <search-checkbox :searchValue.sync="downloadModalForm.caegoryIds2"></search-checkbox>
                    <!-- <RadioGroup v-model="downloadModalForm.caegoryIds2">
                      <Radio
                        label="1"
                        :disabled="downloadModalForm.queryType == 4"
                        border
                        >招标采购信息搜索</Radio
                      >
                      <Radio
                        label="2"
                        :disabled="downloadModalForm.queryType == 4"
                        border
                        >项目信息搜索</Radio
                      >
                      <Radio
                        label="3"
                        :disabled="downloadModalForm.queryType != 4"
                        border
                        >VIP信息搜索</Radio
                      >
                      <Radio
                        label="4"
                        :disabled="downloadModalForm.queryType == 4"
                        border
                        >招标信息搜索</Radio
                      >
                      <Radio
                        label="5"
                        :disabled="downloadModalForm.queryType == 4"
                        border
                        >采购信息搜索</Radio
                      >
                    </RadioGroup> -->
                  </FormItem>
                </Col>
                <Col span="24" style="margin-left:95px;margin-top:-30px;color:#ed4014">
            <p>提示：招标采购类和项目类不可同时选择!</p>
          </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem label="关键词" style="width: 100%">
                    <Input
                      type="textarea"
                      v-model="downloadModalForm.keywords"
                    ></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormItem label="blockId" style="width: 100%">
                    <span>{{ downloadBlockId }}</span>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem>
                    <Button type="primary" @click="downloadModalSubmit"
                      >保存</Button
                    >
                    <Button @click="ModalReset('downloadModalForm')"
                      >重置</Button
                    >
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Row>
        </Col>
      </Row>
      <!-- 中间数据模块 -->
      <Row class="rowModal">
        <Col :span="24">
          <h3 style="margin-bottom: 10px">添加中间数据模块</h3>
          <Row class="operation" style="margin-bottom: 10px; margin-top: 10px">
            <Button type="primary" icon="md-add" @click="contentModalSubmit"
              >添加</Button
            >
          </Row>
          <Row>
            <Table
              class="mygrid labelTable"
              :loading="loading"
              border
              :columns="contentColumns"
              :data="contentData"
              ref="contentTable"
              @on-selection-change="changeSelect"
              style="padding-bootom: 10px"
            ></Table>
          </Row>
        </Col>
      </Row>
      <!-- 右边数据模块 -->
      <Row class="rowModal">
        <Col :span="24">
          <h3 style="margin-bottom: 10px">添加右边数据模块</h3>
          <Row class="operation" style="margin-bottom: 10px">
            <Form
              ref="asideModalForm"
              :model="asideModalForm"
              :label-width="80"
            >
              <Col :span="18">
                <Row>
                  <Col span="18">
                    <FormItem
                      label="title"
                      prop="name"
                      :rules="{
                        required: true,
                        message: '标题不能为空',
                        trigger: 'blur',
                      }"
                    >
                      <Input
                        type="text"
                        v-model="asideModalForm.name"
                        placeholder="请输入右边模块标题"
                      ></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row
                  v-for="(item, index) in asideModalForm.asideList"
                  :key="index"
                  :gutter="10"
                >
                  <Col span="12">
                    <FormItem
                      style="width: 100%"
                      :label="'aside' + (index + 1)"
                      :prop="'asideList.' + index + '.name'"
                      :rules="{
                        required: true,
                        message: '内容不能为空',
                        trigger: 'blur',
                      }"
                    >
                      <Input
                        type="text"
                        v-model="item.name"
                        placeholder="必填，请输入内容"
                      ></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem
                      style="width: 100%"
                      :prop="'asideList.' + index + '.url'"
                      class="leftBtnForm"
                    >
                      <Input
                        type="text"
                        v-model="item.url"
                        placeholder="选填，需要手动输入URL时，请输入URL"
                      ></Input>
                    </FormItem>
                  </Col>
                  <Col span="3" style="margin-left: 10px">
                    <Button @click="handleasideRemove(index)">删除</Button>
                  </Col>
                </Row>
                <Row>
                  <FormItem>
                    <Col span="8">
                      <Button
                        type="dashed"
                        long
                        @click="handleAsideAdd"
                        icon="md-add"
                        >添加</Button
                      >
                    </Col>
                  </FormItem>
                </Row>
                <Row>
                  <FormItem>
                    <Button
                      type="primary"
                      :loading="asideLoading"
                      @click="handleAsideSubmit"
                      >保存</Button
                    >
                    <Button @click="ModalAsideReset('asideModalForm')"
                      >重置</Button
                    >
                  </FormItem>
                </Row>
              </Col>
            </Form>
          </Row>
        </Col>
      </Row>
    </Card>

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
        :label-width="95"
        :rules="ruleValidate"
      >
        <Row>
          <Col span="12">
            <FormItem label="queryType" prop="queryType" style="width: 100%">
              <Select
                v-model="labelModalForm.queryType"
                @on-change="labelQuerySele"
              >
                <!-- <Option :value="0">不匹配</Option> -->
                <Option :value="1">标题</Option>
                <Option :value="2">内容</Option>
                <!-- <Option :value="3">附件</Option> -->
                <Option :value="4">VIP</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="showType" prop="showType" style="width: 100%">
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
          <Col span="12">
            <FormItem label="与值" prop="andKey" style="width: 100%">
              <Input
                type="text"
                v-model="labelModalForm.andKey"
                placeholder="关键词之间用空格隔开"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="或值" prop="orKey" style="width: 100%">
              <Input
                type="text"
                v-model="labelModalForm.orKey"
                placeholder="关键词之间用空格隔开"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="type" prop="type" style="width: 100%">
              <Select v-model="labelModalForm.type">
                <Option :value="1">1</Option>
                <Option :value="1">2</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem>
              <Button type="primary" @click="getNewKeywords('labelModalForm')"
                >生成关键词</Button
              >
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem
              style="width: 100%"
              label="title"
              prop="name"
              :rules="{
                required: true,
                message: '内容不能为空',
                trigger: 'blur',
              }"
            >
              <Input
                type="text"
                v-model="labelModalForm.name"
                placeholder="请输入数据展示模块标题"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem
              style="width: 100%"
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
                v-model="labelModalForm.defaultKey"
                placeholder="默认关键词"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row v-if="labelModalForm.queryType == 4">
          <Col span="24">
            <FormItem label="一级行业" prop="categoryIds" style="width: 100%">
              <Select v-model="labelModalForm.categoryIds" multiple>
                <Option
                  v-for="item in firstList"
                  :key="item.id"
                  :value="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="搜索范围" prop="caegoryIds2" style="width: 100%">
              <search-checkbox :searchValue.sync="labelModalForm.caegoryIds2"></search-checkbox>
              <!-- <RadioGroup v-model="labelModalForm.caegoryIds2">
                <Radio
                  label="1"
                  :disabled="labelModalForm.queryType == 4"
                  border
                  >招标采购信息搜索</Radio
                >
                <Radio
                  label="2"
                  :disabled="labelModalForm.queryType == 4"
                  border
                  >项目信息搜索</Radio
                >
                <Radio
                  label="3"
                  :disabled="labelModalForm.queryType != 4"
                  border
                  >VIP信息搜索</Radio
                >
                <Radio
                  label="4"
                  :disabled="labelModalForm.queryType == 4"
                  border
                  >招标信息搜索</Radio
                >
                <Radio
                  label="5"
                  :disabled="labelModalForm.queryType == 4"
                  border
                  >采购信息搜索</Radio
                >
              </RadioGroup> -->
            </FormItem>
          </Col>
          <Col span="24" style="margin-left:95px;margin-top:-30px;color:#ed4014">
            <p>提示：招标采购类和项目类不可同时选择!</p>
          </Col>
        </Row>
        <Row>
          <FormItem label="关键词" prop="keywords" style="width: 100%">
            <Input type="textarea" v-model="labelModalForm.keywords"></Input>
          </FormItem>
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
        :label-width="95"
      >
        <Row>
          <Col span="12">
            <FormItem label="queryType" prop="queryType" style="width: 100%">
              <Select
                v-model="contentModalForm.queryType"
                @on-change="contentQuerySele"
              >
                <!-- <Option :value="0">不匹配</Option> -->
                <Option :value="1">标题</Option>
                <Option :value="2">内容</Option>
                <!-- <Option :value="3">附件</Option> -->
                <Option :value="4">VIP</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="showType" prop="showType" style="width: 100%">
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
          <Col span="12">
            <FormItem label="与值" prop="andKey" style="width: 100%">
              <Input
                type="text"
                v-model="contentModalForm.andKey"
                placeholder="关键词之间用空格隔开"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="或值" prop="orKey" style="width: 100%">
              <Input
                type="text"
                v-model="contentModalForm.orKey"
                placeholder="关键词之间用空格隔开"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="type" prop="type" style="width: 100%">
              <Select v-model="contentModalForm.type">
                <Option :value="1">1</Option>
                <Option :value="2">2</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem>
              <Button type="primary" @click="getNewKeywords('contentModalForm')"
                >生成关键词</Button
              >
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem
              style="width: 100%"
              label="title"
              prop="name"
              :rules="{
                required: true,
                message: '内容不能为空',
                trigger: 'blur',
              }"
            >
              <Input
                type="text"
                v-model="contentModalForm.name"
                placeholder="请输入中间模块标题"
              ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem
              style="width: 100%"
              label="defaultKey"
              prop="defaultKey"
              :rules="[
                {
                  required: true,
                  message: '内容不能为空',
                  trigger: 'blur',
                },
              ]"
            >
              <Input
                type="text"
                v-model="contentModalForm.defaultKey"
                placeholder="默认关键词"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row v-if="contentModalForm.queryType == 4">
          <Col span="24">
            <FormItem label="一级行业" prop="categoryIds" style="width: 100%">
              <Select v-model="contentModalForm.categoryIds" multiple>
                <Option
                  v-for="item in firstList"
                  :key="item.id"
                  :value="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="搜索范围" prop="caegoryIds2" style="width: 100%">
              <search-checkbox :searchValue.sync="contentModalForm.caegoryIds2"></search-checkbox>
              <!-- <RadioGroup v-model="contentModalForm.caegoryIds2">
                <Radio
                  label="1"
                  :disabled="contentModalForm.queryType == 4"
                  border
                  >招标采购信息搜索</Radio
                >
                <Radio
                  label="2"
                  :disabled="contentModalForm.queryType == 4"
                  border
                  >项目信息搜索</Radio
                >
                <Radio
                  label="3"
                  :disabled="contentModalForm.queryType != 4"
                  border
                  >VIP信息搜索</Radio
                >
                <Radio
                  label="4"
                  :disabled="contentModalForm.queryType == 4"
                  border
                  >招标信息搜索</Radio
                >
                <Radio
                  label="5"
                  :disabled="contentModalForm.queryType == 4"
                  border
                  >采购信息搜索</Radio
                >
              </RadioGroup> -->
            </FormItem>
          </Col>
          <Col span="24" style="margin-left:95px;margin-top:-30px;color:#ed4014">
            <p>提示：招标采购类和项目类不可同时选择!</p>
          </Col>
        </Row>
        <Row>
          <FormItem label="关键词" prop="keywords" style="width: 100%">
            <Input type="textarea" v-model="contentModalForm.keywords"></Input>
          </FormItem>
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
      :width="800"
    >
      <Form
        ref="colorfulModalForm"
        :model="colorfulModalForm"
        :label-width="80"
      >
        <Row
          v-for="(item, index) in colorfulModalForm.colorfulList"
          :key="index"
          :gutter="10"
        >
          <Col span="8">
            <FormItem
              style="width: 100%"
              :label="'数据' + (index + 1)"
              :prop="'colorfulList.' + index + '.name'"
              :rules="{
                required: true,
                message: '内容不能为空',
                trigger: 'blur',
              }"
            >
              <Input
                type="text"
                v-model="item.name"
                placeholder="请输入"
              ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem
              style="width: 100%"
              :prop="'colorfulList.' + index + '.search'"
              class="leftBtnForm"
            >
              <Input
                type="text"
                v-model="item.search"
                placeholder="选填，多个关键词使用空格隔开"
              ></Input>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem
              style="width: 100%"
              :prop="'colorfulList.' + index + '.type'"
              class="leftBtnForm"
            >
              <Select v-model="item.type">
                <Option :value="1">内容</Option>
                <Option :value="2">标题</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="3" style="margin-left: 10px">
            <Button @click="handlecolorfulRemove(index)">删除</Button>
          </Col>
        </Row>
        <Row>
          <FormItem>
            <Col span="12">
              <Button
                type="dashed"
                long
                @click="handlecolorfulAdd"
                icon="md-add"
                >添加</Button
              >
            </Col>
          </FormItem>
        </Row>
        <Row>
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
        </Row>
        <Row>
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
        </Row>
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

    <!-- excel查看弹框 -->
    <Modal
      title="Excel内容"
      v-model="menuViewVisible"
      :mask-closable="false"
      :width="800"
    >
      <Tree :data="menuViewTree"></Tree>
      <div slot="footer">
        <Button type="primary" @click="menuViewVisible = false">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  getAllThemeList, // 获取主题列表接口
  themeAddModal, // 添加主题模块接口
  removeLabelBlock,
  saveColorData,
  delContentData,
  // -------------
  addNav, // 添加导航栏模块接口
  addMenu,
  addBanner,
  addRight,
  addData,
  channelDetail,
  labelDetail, // 数据展示模块回显
  colorfulDetail, // 彩色模块数据回显
  getKeywords, // 生成关键词
  getMenuTree, // 查看已上传的文件内容
} from "@/api/channel";
import qs from "qs";
// excel转换工具类
import excel from "@/libs/excel";
import { validateSort } from "@/libs/validate";
import searchCheckbox from "../../my-components/osc-components/searchCheckbox";
import SearchCheckbox from '../../my-components/osc-components/searchCheckbox.vue';
export default {
  name: "blocksManage",
  data() {
    return {
      maskLoading: true,
      isShow: true,
      // 一级行业列表
      firstList: [
        { name: "交通运输", id: "1" },
        { name: "市政房地产建筑", id: "3" },
        { name: "水利桥梁", id: "4" },
        { name: "能源", id: "17" },
        { name: "化工", id: "18" },
        { name: "环保", id: "6" },
        { name: "冶金矿产原材料", id: "10" },
        { name: "机械电子电器", id: "5" },
        { name: "网络通讯计算机", id: "2" },
        { name: "医疗卫生", id: "8" },
        { name: "园林绿化", id: "16" },
        { name: "商业服务", id: "14" },
        { name: "出版印刷", id: "11" },
        { name: "轻工纺织食品", id: "12" },
        { name: "农林牧渔", id: "13" },
        { name: "科技文教旅游", id: "9" },
        { name: "其它", id: "15" },
      ],
      menuViewVisible: false,
      menuViewTree: [],
      themeColor: "#000000",
      channelName: "",
      ruleValidate: {
        themeId: {
          type: "number",
          required: true,
          message: "请选择主题名",
          trigger: "change",
        },
        title: {
          required: true,
          message: "导航栏名称不能为空",
          trigger: "blur",
        },
        name: { required: true, message: "导航内容不能为空", trigger: "blur" },
        sortNo: [
          {
            type: "number",
            required: true,
            message: "排序值不能为空",
            trigger: "blur",
          },
          { validator: validateSort, trigger: "blur" },
        ],
      },
      submitLoading: false,
      channelId: "",
      // 主题模块
      themeBlockId: "",
      themeList: [], // 主题列表
      themeForm: {
        themeId: "",
      },
      themeLoading: false,
      // 导航栏模块
      mainBlockId: "",
      mainUrlModalForm: {
        name: "",
        title: "",
      },
      mainLoading: false,
      // 菜单栏
      menuBlockId: "",
      menuLoading: false,
      uploadfile: {
        name: "",
      },
      // banner图
      bannerBlockId: "",
      bannerLoading: false,
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
      labelSecList: [],
      labelBlockId: "",
      labelSortNo: 0,
      labelVisible: false,
      modalType: 1,
      modalLabelText: "添加数据展示模块",
      labelModalForm: {
        andKey: "",
        orKey: "",
        type: 1,
        name: "",
        queryType: 2,
        showType: 1,
        defaultKey: "",
        keywords: "",
        categoryIds: [],
        caegoryIds2: [],
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
          title: "blockId",
          key: "blocks_id",
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
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.labelRemove(params.row);
                    },
                  },
                },
                "删除"
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
                      this.toKeywordsList(params.row.blocks_id);
                    },
                  },
                },
                "查看关键词"
              ),
            ]);
          },
        },
      ],
      labelKeywordsColumns: [
        {
          type: "index",
          title: "序号",
          align: "center",
        },
        {
          title: "关键词",
          key: "keywords",
          align: "center",
        },
        {
          title: "数量",
          key: "count",
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
                      this.keywordsEdit(params.row);
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
                      this.keywordsRemove(params.row);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      labelKeywordsVisible: false,
      labelKeywordsData: [],
      // 新模块
      newSecList: [],
      newBlockId: "",
      newModalForm: {
        andKey: "",
        orKey: "",
        type: 1,
        name: "",
        queryType: 4,
        showType: 3,
        defaultKey: "",
        keywords: "",
        categoryIds: [],
        caegoryIds2: [],
      },
      // 下载模块
      downloadSecList: [],
      downloadBlockId: "",
      downloadModalForm: {
        andKey: "",
        orKey: "",
        type: 1,
        name: "附件下载",
        queryType: 2,
        showType: 4,
        defaultKey: "",
        keywords: "",
        categoryIds: [],
        caegoryIds2: [],
      },
      // 中间模块
      contentSecList: [],
      contentBlockId: "",
      contentSortNo: 0,
      contentVisible: false,
      contentModalForm: {
        andKey: "",
        orKey: "",
        type: 1,
        name: "",
        queryType: 2,
        showType: 1,
        defaultKey: "",
        // sortNo: 1,
        keywords: "",
        categoryIds: [],
        caegoryIds2: [],
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
          title: "blockId",
          key: "content_block_id",
          align: "center",
        },
        {
          title: "彩色模块",
          key: "status",
          align: "center",
          render: (h, params) => {
            return h(
              "Tag",
              {
                props: {
                  color: params.row.status ? "success" : "default",
                },
              },
              params.row.status ? "已添加" : "未添加"
            );
          },
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
                "编辑中间模块"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
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
                "编辑彩色模块"
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
                      this.contentRemove(params.row);
                    },
                  },
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.toKeywordsList(params.row.content_block_id);
                    },
                  },
                },
                "查看关键词"
              ),
            ]);
          },
        },
      ],
      // 彩色模块
      colorfulVisible: false,
      colorfulBlockId: "",
      colorfulModalForm: {
        // nameStr: "",
        imgurl: "",
        color: "",
        colorfulList: [
          {
            name: "",
            search: "",
            type: 1,
          },
        ],
      },
      // 右边数据模块
      asideBlockId: "",
      asideLoading: false,
      asideModalForm: {
        name: "",
        asideList: [
          {
            name: "",
            url: "",
          },
        ],
      },
    };
  },
  components: {
    searchCheckbox
  },
  created() {
    let id = this.$route.query.id;
    if(id == 17) {
      this.labelModalForm.caegoryIds2 = ['1','2','3','4','6','7']
    }
  },
  mounted() {
    this.channelId = this.$route.query.id;
    this.isShow = true;
    this.getThemeList();
    this.getDetail();
  },
  methods: {
    // 获取详情
    getDetail() {
      channelDetail(this.channelId).then((res) => {
        if (!res) {
          this.$router.push({ name: "error-402" });
        }
        let data = [];
        if (res[0]) {
          data = res[0];
        } else {
          return;
        }
        this.isShow = false;
        if (data.AchannelName) {
          this.channelName = data.AchannelName;
        }
        if (data.theme_block) {
          this.themeColor = data.theme_block.theme_color;
          this.themeForm.themeId = data.theme_block.theme_id;
          this.themeBlockId = data.theme_block.theme_block_id;
        }
        if (data.navi_block.length > 0) {
          this.mainBlockId = data.navi_block[0].navi_block_id;
          this.mainUrlModalForm.title = data.navi_block[0].title;
          let str = "";
          data.navi_block.forEach((item) => {
            str += item.name + " ";
          });
          this.mainUrlModalForm.name = str;
        }
        if (data.menu_block) {
          this.menuBlockId = data.menu_block.menu_block_id;
        }
        if (data.banner_block.length > 0) {
          this.bannerBlockId = data.banner_block[0].banner_block_id;
          this.bannerModalForm.bannerList = data.banner_block.map((item) => {
            return {
              name: item.name,
              url: item.url,
              color: item.color,
            };
          });
        }
        if (data.show_data_block) {
          if (data.show_data_block.length > 0) {
            this.labelSortNo =
              data.show_data_block[data.show_data_block.length - 1].sort_no;
          }
          this.labelData = [...data.show_data_block];
        }
        if (data.new_data_block) {
          this.newBlockId = data.new_data_block.new_data_block_id;
          this.newModalForm.name = data.new_data_block.name;
          this.newModalForm.defaultKey = data.new_data_block.default_key;
          this.newModalForm.queryType = data.new_data_block.query_type;
          this.newModalForm.showType = data.new_data_block.show_type * 1;
          this.newModalForm.keywords = data.new_data_block.sphinx_query || "";
          if (data.new_data_block.category_ids) {
            this.newModalForm.categoryIds = data.new_data_block.category_ids.split(
              ","
            );
          }
          this.newModalForm.caegoryIds2 = data.new_data_block.caegory_ids2
            ? data.new_data_block.caegory_ids2.split(',')
            : [];
        }
        if (data.download_block) {
          this.downloadBlockId = data.download_block.download_block_id;
          this.downloadModalForm.name = data.download_block.name;
          this.downloadModalForm.defaultKey = data.download_block.default_key;
          this.downloadModalForm.queryType = data.download_block.query_type;
          this.downloadModalForm.showType = data.download_block.show_type * 1;
          this.downloadModalForm.keywords =
            data.download_block.sphinx_query || "";
          if (data.download_block.category_ids) {
            this.downloadModalForm.categoryIds = data.download_block.category_ids.split(
              ","
            );
          }
          this.downloadModalForm.caegoryIds2 = data.download_block.caegory_ids2
            ? data.download_block.caegory_ids2.split(",")
            : [];
        }
        if (data.content_block) {
          if (data.content_block.length > 0) {
            this.contentSortNo =
              data.content_block[data.content_block.length - 1].sort_no;
          }
          this.contentData = [...data.content_block];
        }
        if (data.right_block.length > 0) {
          this.asideBlockId = data.right_block[0].right_block_id;
          this.asideModalForm.name = data.right_block[0].title;
          this.asideModalForm.asideList = data.right_block.map((item) => {
            return {
              name: item.name,
              url: item.url,
            };
          });
        }
      });
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
      let data;
      this.$refs.themeForm.validate((valid) => {
        if (valid) {
          if (this.themeBlockId) {
            data = {
              themeId: this.themeForm.themeId,
              channelId: this.channelId,
              blockId: this.themeBlockId,
            };
          } else {
            data = {
              themeId: this.themeForm.themeId,
              channelId: this.channelId,
            };
          }
          this.themeLoading = true;
          themeAddModal(data).then((res) => {
            if (res.success) {
              this.themeLoading = false;
              this.$Message.success("操作成功");
              this.getDetail();
            }
          });
        }
      });
    },
    // 添加导航模块
    mainModalSubmit() {
      let data;
      this.$refs.mainUrlModalForm.validate((valid) => {
        if (valid) {
          if (this.mainBlockId) {
            data = {
              blockId: this.mainBlockId,
              channelId: this.channelId,
              name: this.mainUrlModalForm.title,
              contentList: this.mainUrlModalForm.name,
            };
          } else {
            data = {
              channelId: this.channelId,
              name: this.mainUrlModalForm.title,
              contentList: this.mainUrlModalForm.name,
            };
          }
          this.mainLoading = true;
          addNav(qs.stringify(data)).then((res) => {
            if (res.success) {
              this.mainLoading = false;
              // this.mainBlockId = res.result.navi_block_id;
              this.getDetail();
              this.$Message.success("操作成功");
            }
          });
        }
      });
    },
    // 添加菜单栏，导入excel
    importFile() {
      this.$refs.excelFile.click();
    },
    getExcelFile() {
      if (!this.$refs.excelFile.files[0]) return;
      let file = this.$refs.excelFile.files[0];
      this.uploadfile = file;
    },
    clearImportData() {
      this.uploadfile = {};
      this.$refs.excelFile.value = null;
    },
    menuModalSubmit() {
      if (this.uploadfile && !this.uploadfile.name) {
        return this.$Message.error("请先选择excel文件");
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
      this.menuLoading = true;
      let formData = new FormData();
      formData.append("file", this.uploadfile);
      formData.append("channelId", this.channelId);
      if (this.menuBlockId) {
        formData.append("blockId", this.menuBlockId);
      }
      addMenu(formData).then((res) => {
        if (res.success) {
          this.menuLoading = false;
          // this.menuBlockId = res.result.menu_block_id;
          this.getDetail();
          this.$Message.success("导入成功");
        } else {
          this.$Message.error("导入失败");
          this.menuLoading = false;
        }
      });
    },
    downloadTemplate() {
      this.$refs.excelDownload.click();
    },
    getMenuView() {
      this.menuViewVisible = true;
      getMenuTree(this.menuBlockId).then((res) => {
        if (res.success) {
          let data = [];
          res.result.forEach((item, index) => {
            data[index] = {
              title: item.title[0].txt1,
              children: [
                {
                  title: "hottxt",
                  children: [],
                },
                {
                  title: "hotlist",
                  children: [],
                },
              ],
              render: (h, { root, node, data }) => {
                return h(
                  "span",
                  {
                    style: {
                      "font-weight": "bold",
                    },
                  },
                  data.title
                );
              },
            };
            item.content[0].hotlist.forEach((listItem, listIndex) => {
              listItem.render = (h, { root, node, data }) => {
                return h("div", {}, [
                  h("p", {}, data.txt1),
                  h("p", {}, data.txt_a),
                ]);
              };
            });
            item.content[0].hottxt.forEach((txtItem, txtIndex) => {
              txtItem.render = (h, { root, node, data }) => {
                return h("div", {}, [
                  h("p", {}, data.txt1),
                  h("p", {}, data.txt_a),
                ]);
              };
            });
            data[index].children[0].children = item.content[0].hottxt;
            data[index].children[1].children = item.content[0].hotlist;
          });
          this.menuViewTree = data;
        }
      });
    },
    // 添加banner图
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
      let data;
      this.$refs.bannerModalForm.validate((valid) => {
        if (valid) {
          this.bannerLoading = true;
          if (this.bannerBlockId) {
            data = {
              channelId: this.channelId,
              blockId: this.bannerBlockId,
              list: this.bannerModalForm.bannerList,
            };
          } else {
            data = {
              channelId: this.channelId,
              list: this.bannerModalForm.bannerList,
              blockId: 0,
            };
          }
          addBanner(data).then((res) => {
            if (res.success) {
              this.bannerLoading = false;
              this.getDetail();
              this.$Message.success("操作成功");
            }
          });
        }
      });
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
      labelDetail(v.blocks_id).then((res) => {
        if (res) {
          this.labelModalForm.name = res.name;
          this.labelModalForm.queryType = res.query_type;
          this.labelModalForm.showType = res.show_type * 1;
          this.labelModalForm.sortNo = res.sort_no;
          this.labelModalForm.defaultKey = res.default_key;
          this.labelModalForm.keywords = res.sphinx_query || "";
          if (res.category_ids) {
            this.labelModalForm.categoryIds = res.category_ids.split(",");
          } else {
            this.labelModalForm.categoryIds = [];
          }
          this.labelModalForm.caegoryIds2 = res.caegory_ids2
            ? res.caegory_ids2.split(",")
            : "";
        }
      });
      this.modalType = 2;
      this.modalLabelText = "编辑数据展示模块";
      this.labelBlockId = v.blocks_id;
    },
    labelRemove(v) {
      let data = {
        blockId: v.blocks_id,
      };
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除该数据?",
        loading: true,
        onOk: () => {
          // 删除
          removeLabelBlock(data).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("删除成功");
              this.getDetail();
            }
          });
        },
      });
    },
    handleLabelSubmit() {
      if (this.labelModalForm.queryType == 4) {
        if (
          !this.labelModalForm.keywords &&
          this.labelModalForm.categoryIds.length === 0
        ) {
          return this.$Message.error("关键词和一级行业不能同时为空");
        }
      }
      this.$refs.labelModalForm.validate((valid) => {
        if (valid) {
          if (this.modalType === 1) {
            let data = {
              name: this.labelModalForm.name,
              defaultKey: this.labelModalForm.defaultKey,
              queryType: this.labelModalForm.queryType,
              showType: this.labelModalForm.showType,
              sphinxQuery: this.labelModalForm.keywords,
              categoryIds:
                this.labelModalForm.queryType == 4
                  ? this.labelModalForm.categoryIds.join(",")
                  : "",
              caegoryIds2: this.labelModalForm.caegoryIds2.join(","),
              channelId: this.channelId,
              componentId: 4,
              sortNo: this.labelSortNo + 1,
            };
            addData(qs.stringify(data)).then((res) => {
              if (res.result) {
                this.getDetail();
                this.$Message.success("添加数据展示模块成功");
                this.labelVisible = false;
              }
            });
          } else {
            let data = {
              name: this.labelModalForm.name,
              defaultKey: this.labelModalForm.defaultKey,
              queryType: this.labelModalForm.queryType,
              showType: this.labelModalForm.showType,
              sphinxQuery: this.labelModalForm.keywords,
              categoryIds:
                this.labelModalForm.queryType == 4
                  ? this.labelModalForm.categoryIds.join(",")
                  : "",
              caegoryIds2: this.labelModalForm.caegoryIds2.join(","),
              channelId: this.channelId,
              blockId: this.labelBlockId,
              componentId: 4,
            };
            addData(qs.stringify(data)).then((res) => {
              if (res.success) {
                this.getDetail();
                this.$Message.success("编辑数据展示模块成功");
                this.labelVisible = false;
              }
            });
          }
        }
      });
    },
    toKeywordsList(id) {
      this.$router.push({
        name: "keywordsList",
        query: {
          id: id,
        },
      });
    },
    labelQuerySele(v) {
      /* if (v == 4) {
        this.labelModalForm.caegoryIds2 = "3";
      } else {
        this.labelModalForm.caegoryIds2 = "1";
      } */
    },
    // 新模块
    getNewKeywords(model) {
      let data = {
        andKey: this[model].andKey,
        orKey: this[model].orKey,
        type: this[model].type,
      };
      getKeywords(qs.stringify(data)).then((res) => {
        if (res.success) {
          this[model].keywords = res.result;
          this.$Message.success("操作成功");
        } else {
          this.getDetail();
          this.$Message.error("操作失败");
        }
      });
    },
    newModalSubmit() {
      if (this.newModalForm.queryType == 4) {
        if (
          !this.newModalForm.keywords &&
          this.newModalForm.categoryIds.length == 0
        ) {
          return this.$Message.error("关键词和一级行业不能同时为空");
        }
      }
      this.$refs.newModalForm.validate((valid) => {
        if (valid) {
          let data;
          if (this.newBlockId) {
            data = {
              name: this.newModalForm.name,
              defaultKey: this.newModalForm.defaultKey,
              queryType: this.newModalForm.queryType,
              showType: this.newModalForm.showType,
              sphinxQuery: this.newModalForm.keywords,
              categoryIds:
                this.newModalForm.queryType == 4
                  ? this.newModalForm.categoryIds.join(",")
                  : "",
              caegoryIds2: this.newModalForm.caegoryIds2.join(","),
              channelId: this.channelId,
              blockId: this.newBlockId,
              componentId: 5,
            };
          } else {
            data = {
              name: this.newModalForm.name,
              defaultKey: this.newModalForm.defaultKey,
              queryType: this.newModalForm.queryType,
              showType: this.newModalForm.showType,
              sphinxQuery: this.newModalForm.keywords,
              categoryIds:
                this.newModalForm.queryType == 4
                  ? this.newModalForm.categoryIds.join(",")
                  : "",
              caegoryIds2: this.newModalForm.caegoryIds2.join(","),
              channelId: this.channelId,
              componentId: 5,
            };
          }
          /* console.log("newModalForm.caegoryIds2",data)
          return */
          addData(qs.stringify(data)).then((res) => {
            if (res.success) {
              this.$Message.success("操作成功");
              this.getDetail();
            }
          });
        }
      });
    },
    newQuerySele(v) {
      /* if (v == 4) {
        this.newModalForm.caegoryIds2 = "3";
      } else {
        this.newModalForm.caegoryIds2 = "1";
      } */
    },
    // 附件下载
    downloadModalSubmit() {
      if (this.downloadModalForm.queryType == 4) {
        if (
          !this.downloadModalForm.keywords &&
          this.downloadModalForm.categoryIds.length === 0
        ) {
          return this.$Message.error("关键词和一级行业不能同时为空");
        }
      }
      this.$refs.downloadModalForm.validate((valid) => {
        if (valid) {
          let data;
          if (this.downloadBlockId) {
            data = {
              name: this.downloadModalForm.name,
              defaultKey: this.downloadModalForm.defaultKey,
              queryType: this.downloadModalForm.queryType,
              showType: this.downloadModalForm.showType,
              sphinxQuery: this.downloadModalForm.keywords,
              categoryIds:
                this.downloadModalForm.queryType == 4
                  ? this.downloadModalForm.categoryIds.join(",")
                  : "",
              caegoryIds2: this.downloadModalForm.caegoryIds2.join(","),
              channelId: this.channelId,
              blockId: this.downloadBlockId,
            };
          } else {
            data = {
              name: this.downloadModalForm.name,
              defaultKey: this.downloadModalForm.defaultKey,
              queryType: this.downloadModalForm.queryType,
              showType: this.downloadModalForm.showType,
              sphinxQuery: this.downloadModalForm.keywords,
              categoryIds:
                this.downloadModalForm.queryType == 4
                  ? this.downloadModalForm.categoryIds.join(",")
                  : "",
              caegoryIds2: this.downloadModalForm.caegoryIds2.join(","),
              channelId: this.channelId,
            };
          }
          if (this.downloadModalForm.name.indexOf("附件") != -1) {
            data.componentId = 6;
          } else {
            data.componentId = 15;
          }
          addData(qs.stringify(data, { arrayFormat: "repeat" })).then((res) => {
            if (res.success) {
              this.$Message.success("操作成功");
              this.getDetail();
            }
          });
        }
      });
    },
    downloadQuerySele(v) {
      /* if (v == 4) {
        this.downloadModalForm.caegoryIds2 = "3";
      } else {
        this.downloadModalForm.caegoryIds2 = "1";
      } */
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
      labelDetail(v.content_block_id).then((res) => {
        if (res) {
          this.contentModalForm.name = res.name;
          this.contentModalForm.defaultKey = res.default_key;
          this.contentModalForm.queryType = res.query_type;
          this.contentModalForm.showType = res.show_type * 1;
          this.contentModalForm.sortNo = res.sort_no;
          this.contentModalForm.keywords = res.sphinx_query || "";
          if (res.category_ids) {
            this.contentModalForm.categoryIds = res.category_ids.split(",");
          } else {
            this.contentModalForm.categoryIds = [];
          }
          this.contentModalForm.caegoryIds2 = res.caegory_ids2
            ? res.caegory_ids2.split(",")
            : "";
        }
      });
      this.modalType = 2;
      this.modalcontentText = "编辑中间数据模块";
      this.contentBlockId = v.content_block_id;
    },
    contentRemove(v) {
      let data = {
        content_blockId: v.content_block_id,
        color_blockId: v.color_block_id,
      };
      this.$Modal.confirm({
        title: "确认删除",
        // 记得确认修改此处
        content: "您确认要删除该数据?",
        loading: true,
        onOk: () => {
          // 删除
          delContentData(data).then((res) => {
            this.$Modal.remove();
            if (res.success) {
              this.$Message.success("删除成功");
              this.getDetail();
            }
          });
        },
      });
    },
    handleContentSubmit() {
      if (this.contentModalForm.queryType == 4) {
        if (
          !this.contentModalForm.keywords &&
          this.contentModalForm.categoryIds.length === 0
        ) {
          return this.$Message.error("关键词和一级行业不能同时为空");
        }
      }
      this.$refs.contentModalForm.validate((valid) => {
        if (valid) {
          if (this.modalType === 1) {
            let data = {
              name: this.contentModalForm.name,
              defaultKey: this.contentModalForm.defaultKey,
              queryType: this.contentModalForm.queryType,
              showType: this.contentModalForm.showType,
              sphinxQuery: this.contentModalForm.keywords,
              categoryIds:
                this.contentModalForm.queryType == 4
                  ? this.contentModalForm.categoryIds.join(",")
                  : "",
              caegoryIds2: this.contentModalForm.caegoryIds2.join(","),
              channelId: this.channelId,
              componentId: 8,
              sortNo: this.contentSortNo + 1,
            };
            addData(qs.stringify(data)).then((res) => {
              if (res.result) {
                this.$Message.success("添加成功");
                this.contentVisible = false;
                this.getDetail();
              }
            });
          } else if (this.modalType === 2) {
            let data = {
              name: this.contentModalForm.name,
              defaultKey: this.contentModalForm.defaultKey,
              queryType: this.contentModalForm.queryType,
              showType: this.contentModalForm.showType,
              sphinxQuery: this.contentModalForm.keywords,
              categoryIds:
                this.contentModalForm.queryType == 4
                  ? this.contentModalForm.categoryIds.join(",")
                  : "",
              caegoryIds2: this.contentModalForm.caegoryIds2.join(","),
              channelId: this.channelId,
              blockId: this.contentBlockId,
              componentId: 8,
            };
            addData(qs.stringify(data)).then((res) => {
              if (res.success) {
                this.$Message.success("编辑成功");
                this.contentVisible = false;
                this.getDetail();
              }
            });
          }
        }
      });
    },
    contentQuerySele(v) {
      /* if (v == 4) {
        this.contentModalForm.caegoryIds2 = "3";
      } else {
        this.contentModalForm.caegoryIds2 = "1";
      } */
    },
    // 编辑彩色模块
    colorfulEdit(v) {
      this.colorfulVisible = true;
      this.colorfulBlockId = v.color_block_id;
      this.$refs.colorfulModalForm.resetFields();
      this.colorfulModalForm.colorfulList = [
        {
          name: "",
          search: "",
          type: 1,
        },
      ];
      colorfulDetail(v.color_block_id).then((res) => {
        if (res.color) {
          this.colorfulModalForm.imgurl = res.img_url;
          this.colorfulModalForm.color = res.color;
          if (res.data.length === 0) {
            this.colorfulModalForm.colorfulList = [
              {
                name: "",
                search: "",
                type: 1,
              },
            ];
          } else {
            res.data = res.data.map((item) => {
              item.search = item.search.replace(/,+/g, " ");
              return item;
            });
            this.colorfulModalForm.colorfulList = res.data;
          }
        }
      });
    },
    handleColorfulSubmit() {
      this.$refs.colorfulModalForm.validate((valid) => {
        if (valid) {
          let list = this.colorfulModalForm.colorfulList.map((item) => {
            if (item.search.length !== 0) {
              item.search = item.search.trim().replace(/ +/g, ",");
            }
            return item;
          });
          let data = {
            list: list,
            imgurl: this.colorfulModalForm.imgurl,
            color: this.colorfulModalForm.color,
            blockId: this.colorfulBlockId,
          };
          saveColorData(data).then((res) => {
            this.$Message.success("编辑彩色模块成功");
            this.colorfulVisible = false;
            this.getDetail();
          });
        }
      });
    },
    handleColorfulCancel() {
      this.colorfulVisible = false;
    },
    handlecolorfulRemove(index) {
      this.colorfulModalForm.colorfulList.splice(index, 1);
    },
    handlecolorfulAdd() {
      this.colorfulModalForm.colorfulList.push({
        name: "",
        search: "",
        type: 1,
      });
    },
    // 右边数据模块
    handleasideRemove(index) {
      this.asideModalForm.asideList.splice(index, 1);
    },
    handleAsideAdd() {
      this.asideModalForm.asideList.push({
        name: "",
        url: "",
      });
    },
    handleAsideSubmit() {
      let data;
      let nameStr = "";
      this.asideModalForm.asideList.forEach((item) => {
        if (item.url) {
          nameStr += item.name + "+" + item.url + " ";
        } else {
          nameStr += item.name + " ";
        }
      });
      this.$refs.asideModalForm.validate((valid) => {
        if (valid) {
          if (this.asideBlockId) {
            data = {
              name: this.asideModalForm.name,
              contentList: nameStr,
              blockId: this.asideBlockId,
              channelId: this.channelId,
            };
          } else {
            data = {
              name: this.asideModalForm.name,
              contentList: nameStr,
              channelId: this.channelId,
            };
          }
          this.asideLoading = true;
          addRight(qs.stringify(data)).then((res) => {
            if (res.success) {
              this.asideLoading = false;
              this.$Message.success("操作成功");
              this.getDetail();
              // this.asideBlockId = res.result.right_block_id;
            }
          });
        }
      });
    },
    // 重置
    ModalReset(name) {
      this.$refs[name].resetFields();
    },
    ModalAsideReset(name) {
      this.asideModalForm = {
        name: "",
        asideList: [
          {
            name: "",
            url: "",
          },
        ],
      };
      this.$refs[name].resetFields();
    },
    ModalBannerReset(name) {
      this.bannerModalForm = {
        bannerList: [
          {
            url: "",
            name: "javascript:void(0);",
            color: "",
          },
        ],
      };
      this.$refs[name].resetFields();
    },
    // 
    searchChange(v) {
      console.log(v)
      if(v.length === 1){
        let status = this.searchList.filter(item => item.value === v[0])[0].status
        console.log(status)
        this.searchList = this.searchList.map(item => {
          if(item.status !== status){
            item.flag = true
          }
          return item;
        })
      }
      if(v.length === 0) {
        this.searchList = this.searchList.map(item => {
          item.flag = false;
          return item;
        })
      }
    }
  },
};
</script>

<style lang="less">
@import "./blocksManage.less";
</style>