<template>
  <div>
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
                    <Select v-model="newModalForm.queryType">
                      <Option :value="0">不匹配</Option>
                      <Option :value="1">标题</Option>
                      <Option :value="2">内容</Option>
                      <Option :value="3">附件</Option>
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
                <Col span="12">
                  <FormItem
                    label="一级行业"
                    prop="categoryIds"
                    style="width: 100%"
                  >
                    <Select
                      v-model="newModalForm.categoryIds"
                      @on-change="newCategoryChange"
                    >
                      <Option :value="1">交通运输</Option>
                      <Option :value="2">能源化工--电力</Option>
                      <Option :value="3">能源化工--化工</Option>
                      <Option :value="4">冶金矿产</Option>
                      <Option :value="5">机械电子</Option>
                      <Option :value="6">网络通讯计算机</Option>
                      <Option :value="7">市政房地产建筑</Option>
                      <Option :value="8">水利</Option>
                      <Option :value="9">环保</Option>
                      <Option :value="10">医疗卫生</Option>
                      <Option :value="11">科技文教旅游</Option>
                      <Option :value="12">出版印刷</Option>
                      <Option :value="13">轻工纺织食品</Option>
                      <Option :value="14">农林牧渔</Option>
                      <Option :value="15">商业服务</Option>
                      <Option :value="16">园林绿化</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem
                    label="二级行业"
                    prop="caegoryIds2"
                    style="width: 100%"
                  >
                    <Select v-model="newModalForm.caegoryIds2">
                      <Option
                        v-for="item in newSecList"
                        :value="item.id"
                        :key="item.id"
                        >{{ item.name }}</Option
                      >
                    </Select>
                  </FormItem>
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
                    <Select v-model="downloadModalForm.queryType">
                      <Option :value="0">不匹配</Option>
                      <Option :value="1">标题</Option>
                      <Option :value="2">内容</Option>
                      <Option :value="3">附件</Option>
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
                <Col span="12">
                  <FormItem
                    label="一级行业"
                    prop="categoryIds"
                    style="width: 100%"
                  >
                    <Select
                      v-model="downloadModalForm.categoryIds"
                      @on-change="downloadCategoryChange"
                    >
                      <Option :value="1">交通运输</Option>
                      <Option :value="2">能源化工--电力</Option>
                      <Option :value="3">能源化工--化工</Option>
                      <Option :value="4">冶金矿产</Option>
                      <Option :value="5">机械电子</Option>
                      <Option :value="6">网络通讯计算机</Option>
                      <Option :value="7">市政房地产建筑</Option>
                      <Option :value="8">水利</Option>
                      <Option :value="9">环保</Option>
                      <Option :value="10">医疗卫生</Option>
                      <Option :value="11">科技文教旅游</Option>
                      <Option :value="12">出版印刷</Option>
                      <Option :value="13">轻工纺织食品</Option>
                      <Option :value="14">农林牧渔</Option>
                      <Option :value="15">商业服务</Option>
                      <Option :value="16">园林绿化</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem
                    label="二级行业"
                    prop="caegoryIds2"
                    style="width: 100%"
                  >
                    <Select v-model="downloadModalForm.caegoryIds2">
                      <Option
                        v-for="item in downloadSecList"
                        :value="item.id"
                        :key="item.id"
                        >{{ item.name }}</Option
                      >
                    </Select>
                  </FormItem>
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
      <!-- 彩色模块 -->
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
              ref="table"
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
                  <!-- <Col span="3">
                    <FormItem
                      style="width: 100%"
                      class="leftBtnForm"
                    >
                      <Button type="primary" @click="showInput(item)">添加URL</Button
                    >
                    </FormItem>
                  </Col> -->
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
              <Select v-model="labelModalForm.queryType">
                <Option :value="0">不匹配</Option>
                <Option :value="1">标题</Option>
                <Option :value="2">内容</Option>
                <Option :value="3">附件</Option>
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
          <Col span="12">
            <FormItem label="一级行业" prop="categoryIds" style="width: 100%">
              <Select
                v-model="labelModalForm.categoryIds"
                @on-change="labelCategoryChange"
              >
                <Option :value="1">交通运输</Option>
                <Option :value="2">能源化工--电力</Option>
                <Option :value="3">能源化工--化工</Option>
                <Option :value="4">冶金矿产</Option>
                <Option :value="5">机械电子</Option>
                <Option :value="6">网络通讯计算机</Option>
                <Option :value="7">市政房地产建筑</Option>
                <Option :value="8">水利</Option>
                <Option :value="9">环保</Option>
                <Option :value="10">医疗卫生</Option>
                <Option :value="11">科技文教旅游</Option>
                <Option :value="12">出版印刷</Option>
                <Option :value="13">轻工纺织食品</Option>
                <Option :value="14">农林牧渔</Option>
                <Option :value="15">商业服务</Option>
                <Option :value="16">园林绿化</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="二级行业" prop="caegoryIds2" style="width: 100%">
              <Select v-model="labelModalForm.caegoryIds2">
                <Option
                  v-for="item in labelSecList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
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
              <Select v-model="contentModalForm.queryType">
                <Option :value="0">不匹配</Option>
                <Option :value="1">标题</Option>
                <Option :value="2">内容</Option>
                <Option :value="3">附件</Option>
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
          <Col span="12">
            <FormItem label="一级行业" prop="categoryIds" style="width: 100%">
              <Select
                v-model="contentModalForm.categoryIds"
                @on-change="contentCategoryChange"
              >
                <Option :value="1">交通运输</Option>
                <Option :value="2">能源化工--电力</Option>
                <Option :value="3">能源化工--化工</Option>
                <Option :value="4">冶金矿产</Option>
                <Option :value="5">机械电子</Option>
                <Option :value="6">网络通讯计算机</Option>
                <Option :value="7">市政房地产建筑</Option>
                <Option :value="8">水利</Option>
                <Option :value="9">环保</Option>
                <Option :value="10">医疗卫生</Option>
                <Option :value="11">科技文教旅游</Option>
                <Option :value="12">出版印刷</Option>
                <Option :value="13">轻工纺织食品</Option>
                <Option :value="14">农林牧渔</Option>
                <Option :value="15">商业服务</Option>
                <Option :value="16">园林绿化</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="二级行业" prop="caegoryIds2" style="width: 100%">
              <Select v-model="contentModalForm.caegoryIds2">
                <Option
                  v-for="item in contentSecList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
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
      :width="650"
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
        <!-- <FormItem
          prop="url"
          :rules="{
            required: true,
            message: '访问路径不能为空',
            trigger: 'blur',
          }"
          label="内容地址"
        >
          <Input
            type="text"
            v-model="colorfulModalForm.url"
            placeholder="请输入内容访问地址"
          ></Input>
        </FormItem> -->
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

    <!-- excel查看弹框 -->
    <Modal
      title="Excel内容"
      v-model="menuViewVisible"
      :mask-closable="false"
      :width="800"
    >
      <Tree :data="menuViewTree"></Tree>
      <div slot="footer">
        <!-- <Button type="text" @click="handleColorfulCancel">取消</Button> -->
        <Button type="primary" @click="menuViewVisible = false">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  getAllThemeList, // 获取主题列表接口
  themeAddModal, // 添加主题模块接口
  // addModal,
  // themeBlockId,
  // importExcel,
  // addManualData,
  // saveshowdataBlock,
  // saveNewData,
  // saveDownloadData,
  // saveContentData,
  // saveRightData,
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
export default {
  name: "blocksManage",
  data() {
    return {
      // 二级行业列表
      secondList: [
        [
          { name: "高速公路、道路", id: 101 },
          { name: "桥梁、立交桥", id: 102 },
          { name: "机场", id: 103 },
          { name: "铁路、轨道交通", id: 104 },
          { name: "航道、水利枢纽", id: 105 },
          { name: "港口、码头、泊位、渔港", id: 106 },
          { name: "客运站、交通枢纽", id: 107 },
          { name: "隧道", id: 108 },
          { name: "物流", id: 109 },
        ],
        [
          { name: "火电", id: 201 },
          { name: "核电", id: 202 },
          { name: "水电", id: 203 },
          { name: "风电", id: 204 },
          { name: "电网建设", id: 205 },
          { name: "太阳能、光伏发电", id: 206 },
          { name: "垃圾焚烧发电及其他新能源发电", id: 207 },
          { name: "水泥余热发电", id: 208 },
        ],
        [
          { name: "天然气、输气管道", id: 301 },
          { name: "石油、石化", id: 302 },
          { name: "有机化学", id: 303 },
          { name: "无机化学", id: 304 },
          { name: "煤化工", id: 305 },
        ],
        [
          { name: "选煤厂、煤矿、尾矿", id: 401 },
          { name: "矿山、矿产、矿石", id: 402 },
          { name: "水泥生产线、混凝土", id: 403 },
          { name: "金属冶炼", id: 404 },
          { name: "钢厂、钢结构", id: 405 },
          { name: "玻璃及其他", id: 406 },
        ],
        [
          { name: "机械产品、厂房、生产车间", id: 501 },
          { name: "医疗器械、电子产品、电器产品", id: 502 },
          { name: "造船、造车", id: 503 },
        ],
        [{ name: "网络通讯计算机", id: 601 }],
        [
          { name: "房地产建筑", id: 701 },
          { name: "供热", id: 702 },
          { name: "排水", id: 704 },
          { name: "土地治理", id: 705 },
        ],
        [
          { name: "水厂、供水", id: 801 },
          { name: "灌溉", id: 802 },
          { name: "围海造地", id: 803 },
          { name: "水库、引水", id: 804 },
          { name: "防护堤、防洪堤", id: 805 },
        ],
        [
          { name: "垃圾", id: 901 },
          { name: "水处理", id: 902 },
          { name: "废弃物处理", id: 903 },
          { name: "脱硫脱硝、除尘除渣", id: 904 },
          { name: "污泥治理", id: 905 },
        ],
        [
          { name: "医院", id: 1001 },
          { name: "制药制剂", id: 1002 },
        ],
        [{ name: "科技文教旅游", id: 1105 }],
        [{ name: "出版印刷", id: 1205 }],
        [
          { name: "纺织", id: 1301 },
          { name: "食品生产", id: 1302 },
          { name: "肉类加工、屠宰", id: 1303 },
          { name: "造纸", id: 1304 },
          { name: "粮食储备", id: 1305 },
          { name: "卷烟物流", id: 1306 },
          { name: "其他", id: 1307 },
        ],
        [{ name: "农林牧渔", id: 1405 }],
        [{ name: "商业服务", id: 1505 }],
        [{ name: "园林绿化", id: 1605 }],
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
        categoryIds: '',
        caegoryIds2: ''
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
        categoryIds: '',
        caegoryIds2: ''
      },
      // 下载模块
      downloadSecList: [],
      downloadBlockId: "",
      downloadModalForm: {
        andKey: "",
        orKey: "",
        type: 1,
        name: "附件下载",
        queryType: 3,
        showType: 4,
        defaultKey: "",
        keywords: "",
        categoryIds: '',
        caegoryIds2: ''
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
        queryType: 0,
        showType: 1,
        defaultKey: "",
        // sortNo: 1,
        keywords: "",
        categoryIds: '',
        caegoryIds2: ''
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
                "编辑彩色模块"
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
  mounted() {
    this.channelId = this.$route.query.id;
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
        let data;
        if (res[0]) {
          data = res[0];
        } else {
          return;
        }
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
        if (data.show_data_block.length > 0) {
          this.labelSortNo =
            data.show_data_block[data.show_data_block.length - 1].sort_no;
          this.labelData = [...data.show_data_block];
        }
        if (data.new_data_block) {
          this.newBlockId = data.new_data_block.new_data_block_id;
          this.newModalForm.name = data.new_data_block.name;
          this.newModalForm.defaultKey = data.new_data_block.default_key;
          this.newModalForm.queryType = data.new_data_block.query_type;
          this.newModalForm.showType = data.new_data_block.show_type * 1;
          this.newModalForm.keywords = data.new_data_block.sphinx_query;
        }
        if (data.download_block) {
          this.downloadBlockId = data.download_block.download_block_id;
          this.downloadModalForm.name = data.download_block.name;
          this.downloadModalForm.defaultKey = data.download_block.default_key;
          this.downloadModalForm.queryType = data.download_block.query_type;
          this.downloadModalForm.showType = data.download_block.show_type * 1;
          this.downloadModalForm.keywords = data.download_block.sphinx_query;
        }
        if (data.content_block.length > 0) {
          this.contentSortNo =
            data.content_block[data.content_block.length - 1].sort_no;
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
      // console.log(this.$refs.excelFile.files[0])
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
          console.log(data);
          this.menuViewTree = data;
          console.log(this.menuViewTree);
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
          this.labelModalForm.keywords = res.sphinx_query;
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
      if(this.labelModalForm.queryType == 4){
        if(!this.labelModalForm.keywords && !this.labelModalForm.categoryIds){
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
              categoryIds: this.labelModalForm.categoryIds,
              caegoryIds2: this.labelModalForm.caegoryIds2,
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
              categoryIds: this.labelModalForm.categoryIds,
              caegoryIds2: this.labelModalForm.caegoryIds2,
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
    labelCategoryChange(v) {
      this.labelSecList = this.secondList[v - 1];
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
      if(this.newModalForm.queryType == 4){
        if(!this.newModalForm.keywords && !this.newModalForm.categoryIds){
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
              categoryIds: this.newModalForm.categoryIds,
              caegoryIds2: this.newModalForm.caegoryIds2,
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
              categoryIds: this.newModalForm.categoryIds,
              caegoryIds2: this.newModalForm.caegoryIds2,
              channelId: this.channelId,
              componentId: 5,
            };
          }
          addData(qs.stringify(data)).then((res) => {
            if (res.success) {
              this.$Message.success("操作成功");
              this.getDetail();
            }
          });
        }
      });
    },
    newCategoryChange(v) {
      this.newSecList = this.secondList[v - 1];
    },
    // 附件下载
    downloadModalSubmit() {
      if(this.downloadModalForm.queryType == 4){
        if(!this.downloadModalForm.keywords && !this.downloadModalForm.categoryIds){
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
              categoryIds: this.downloadModalForm.categoryIds,
              caegoryIds2: this.downloadModalForm.caegoryIds2,
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
              categoryIds: this.downloadModalForm.categoryIds,
              caegoryIds2: this.downloadModalForm.caegoryIds2,
              channelId: this.channelId,
            };
          }
          if (this.downloadModalForm.name.indexOf("附件") != -1) {
            data.componentId = 6;
          } else {
            data.componentId = 15;
          }
          addData(qs.stringify(data)).then((res) => {
            if (res.success) {
              this.$Message.success("操作成功");
              this.getDetail();
            }
          });
        }
      });
    },
    downloadCategoryChange(v) {
      this.downloadSecList = this.secondList[v-1];
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
          this.contentModalForm.keywords = res.sphinx_query;
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
      if(this.contentModalForm.queryType == 4){
        if(!this.contentModalForm.keywords && !this.contentModalForm.categoryIds){
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
              categoryIds: this.contentModalForm.categoryIds,
              caegoryIds2: this.contentModalForm.caegoryIds2,
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
              categoryIds: this.contentModalForm.categoryIds,
              caegoryIds2: this.contentModalForm.caegoryIds2,
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
    contentCategoryChange(v) {
      this.contentSecList = this.secondList[v - 1];
    },
    // 编辑彩色模块
    colorfulEdit(v) {
      this.colorfulVisible = true;
      this.colorfulBlockId = v.color_block_id;
      this.$refs.colorfulModalForm.resetFields();
      colorfulDetail(v.color_block_id).then((res) => {
        if (res.name) {
          this.colorfulModalForm.nameStr = res.name;
          this.colorfulModalForm.imgurl = res.img_url;
          this.colorfulModalForm.color = res.color;
        }
      });
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
            this.getDetail();
          });
        }
      });
    },
    handleColorfulCancel() {
      this.colorfulVisible = false;
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
    showInput(i) {
      console.log(i);
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
  },
};
</script>

<style lang="less">
@import "./blocksManage.less";
</style>