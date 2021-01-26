<style lang="less">
@import "../../../styles/table-common.less";
</style>
<template>
  <div>
    <Card>
      <Row>
        <Form
          ref="searchForm"
          :model="searchForm"
          inline
          :label-width="110"
          label-position="right"
        >
          <Form-item label="访客编号" prop="number">
            <Input
              type="text"
              v-model="searchForm.number"
              style="width: 260px"
            />
          </Form-item>
          <Form-item label="对话时间" prop="startTime">
            <DatePicker
              type="datetimerange"
              placeholder="请选择时间"
              format="yyyy-MM-dd HH:mm"
              style="width: 260px"
              @on-change="timeChange"
            ></DatePicker>
          </Form-item>
          <span v-if="drop">
            <FormItem prop="tag" label="访客标签">
              <Select v-model="searchForm.tag" multiple style="width: 260px">
                <Option
                  v-for="item in tagList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </FormItem>
            <FormItem prop="totalStart" label="总对话数">
              <Row style="width: 260px">
                <Col :span="11">
                  <Input type="number" v-model="searchForm.totalStart" number />
                </Col>
                <Col :span="2" style="text-align: center">-</Col>
                <Col :span="11">
                  <Input type="number" v-model="searchForm.totalEnd" number />
                </Col>
              </Row>
            </FormItem>
            <FormItem prop="serviceStart" label="客服对话数">
              <Row style="width: 260px">
                <Col :span="11">
                  <Input
                    type="number"
                    v-model="searchForm.serviceStart"
                    number
                  />
                </Col>
                <Col :span="2" style="text-align: center">-</Col>
                <Col :span="11">
                  <Input type="number" v-model="searchForm.serviceEnd" number />
                </Col>
              </Row>
            </FormItem>
            <FormItem prop="" label="访客对话数">
              <Row style="width: 260px">
                <Col :span="11">
                  <Input
                    type="number"
                    v-model="searchForm.visitorStart"
                    number
                  />
                </Col>
                <Col :span="2" style="text-align: center">-</Col>
                <Col :span="11">
                  <Input type="number" v-model="searchForm.visitorEnd" number />
                </Col>
              </Row>
            </FormItem>
            <FormItem prop="visitedSource" label="访客来源处理后">
              <Select
                v-model="searchForm.visitedSource"
                multiple
                style="width: 260px"
              >
                <Option
                  v-for="item in visitedSourceList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </FormItem>
            <FormItem prop="sourceStyle" label="来源风格">
              <Select
                v-model="searchForm.sourceStyle"
                multiple
                style="width: 260px"
              >
                <Option
                  v-for="item in sourceStyleList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </FormItem>
            <FormItem prop="visitedPage" label="咨询页面处理后">
              <Select
                v-model="searchForm.visitedPage"
                multiple
                style="width: 260px"
              >
                <Option
                  v-for="item in visitedPageList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </FormItem>
            <FormItem prop="areaList" label="访客地区">
              <Select
                v-model="searchForm.areaList"
                multiple
                style="width: 260px"
              >
                <Option
                  v-for="item in provinceList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </FormItem>
            <Form-item label="信息ID" prop="infoId">
              <Input
                type="text"
                v-model="searchForm.infoId"
                style="width: 260px"
              />
            </Form-item>
            <FormItem prop="industry" label="一级行业">
              <Select
                v-model="searchForm.industry"
                multiple
                style="width: 260px"
              >
                <Option
                  v-for="item in industryList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </FormItem>
            <FormItem prop="infoArea" label="信息所在地区">
              <Select
                v-model="searchForm.infoArea"
                multiple
                style="width: 260px"
              >
                <Option
                  v-for="item in infoAreaList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </FormItem>
          </span>
          <Form-item class="operation">
            <Button @click="handleSearch" type="primary" icon="ios-search"
              >查询</Button
            >
            <Button @click="handleReset">重置</Button>
            <a class="drop-down" @click="dropDown">
              {{ dropDownContent }}
              <Icon :type="dropDownIcon"></Icon>
            </a>
          </Form-item>
        </Form>
      </Row>
      <Row class="operation" style="margin-bottom: 10px">
        <Button @click="getDataList" icon="md-refresh">刷新</Button>
      </Row>
      <Row>
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
  </div>
</template>
<script>
import { getCrmRequest, postCrmRequest } from "@/api/crm";
import { provinceList } from "./provinceList";
export default {
  name: "filterData",
  data() {
    return {
      tagList: [],
      visitedSourceList: [],
      sourceStyleList: [],
      visitedPageList: [],
      industryList:[],
      infoArea:[],
      provinceList: provinceList,
      searchForm: {
        pageSize: 20,
        pageNum: 1,
        number: "",
        startTime: "",
        endTime: "",
        totalStart: "",
        totalEnd: "",
        serviceStart: "",
        serviceEnd: "",
        visitorStart: "",
        visitorEnd: "",
        areaList: [],
        tag: [],
        sourceStyle: [],
        visitedSource: [],
        visitedPage: [],
        infoId:'',
        industry:[],
        infoArea:[]
      },
      loading: false,
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
          width: 120,
          align: "center",
          key: "x",
        },
        {
          title: "客服对话数",
          width: 120,
          align: "center",
          key: "y",
        },
        {
          title: "访客对话数",
          width: 120,
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
          title: "访问来源处理后",
          minWidth: 120,
          align: "center",
          key: "visitedSource",
        },
        {
          title: "来源风格",
          width: 120,
          align: "center",
          key: "sourceNet",
        },
        {
          title: "咨询页面",
          minWidth: 120,
          align: "center",
          key: "visitedPage",
        },
        {
          title: "咨询页面处理后",
          minWidth: 120,
          align: "center",
          key: "visitedPage",
        },
        {
          title: "信息id",
          minWidth: 120,
          align: "center",
          key: "visitedPage",
        },
        {
          title: "一级行业",
          minWidth: 120,
          align: "center",
          key: "visitedPage",
        },
        {
          title: "信息地区",
          minWidth: 120,
          align: "center",
          key: "visitedPage",
        },
        {
          title: "访客地区处理后",
          minWidth: 120,
          align: "center",
          key: "visitedPage",
        },
      ],
      data: [],
      total: 0,
      dropDownContent: "展开",
      dropDownIcon: "ios-arrow-down",
      drop: false,
    };
  },
  methods: {
    getDataList() {},
    changePage(v) {
      this.searchForm.pageNum = v;
      this.getDataList();
    },
    changesize(v) {
      this.searchForm.pageSize = v;
      this.getDataList();
    },
    // 重置
    handleReset() {
      this.$refs.searchForm.resetFields();
      this.searchForm.pageNum = 1;
      this.searchForm.pageSize = 20;
      this.getDataList();
    },
    // 查询
    handleSearch() {
      this.searchForm.pageNum = 1;
      this.searchForm.pageSize = 20;
      this.getDataList();
    },
    // 时间选择
    timeChange(v) {
      console.log(v);
      this.searchForm.startTime = v[0];
      this.searchForm.endTime = v[1];
    },
    dropDown() {
      if (this.drop) {
        this.dropDownContent = "展开";
        this.dropDownIcon = "ios-arrow-down";
      } else {
        this.dropDownContent = "收起";
        this.dropDownIcon = "ios-arrow-up";
      }
      this.drop = !this.drop;
    },
  },
  mounted() {
    this.getDataList();
  },
};
</script>
    