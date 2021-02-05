<style lang="less" scoped>
@import "../../../styles/table-common.less";
.selectWidth /deep/ .ivu-select-dropdown {
  width: 100% !important;
  /deep/ .ivu-select-dropdown-list li {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
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
              @on-keyup="searchForm.number=searchForm.number.trim().replace(/[ ]/g,'')"
            />
          </Form-item>
          <Form-item label="信息ID" prop="infoId">
            <Input
              type="text"
              v-model="searchForm.infoId"
              style="width: 260px"
              @on-keyup="searchForm.infoId=searchForm.infoId.trim().replace(/[ ]/g,'')"
            />
          </Form-item>
          <span v-if="drop">
            <FormItem prop="tag" label="访客标签">
              <Select
                v-model="searchForm.tag"
                multiple
                style="width: 260px"
                class="selectWidth"
              >
                <Option
                  v-for="item in tagList"
                  :value="item"
                  :key="item"
                  :title="item"
                  >{{ item }}</Option
                >
              </Select>
            </FormItem>
            <FormItem prop="visitedAreaDealed" label="访客地区处理后">
              <Select
                v-model="searchForm.visitedAreaDealed"
                multiple
                style="width: 260px"
              >
                <Option
                  v-for="item in handleProvinceList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </FormItem>
            <Form-item label="对话时间">
              <DatePicker
                type="datetimerange"
                placeholder="请选择时间"
                format="yyyy-MM-dd HH:mm"
                style="width: 260px"
                @on-change="timeChange"
                v-model="timeRange"
              ></DatePicker>
            </Form-item>
            <FormItem prop="minX" label="总对话数">
              <Row style="width: 260px">
                <Col :span="11">
                  <Input
                    type="text"
                    v-model="searchForm.minX"
                    @on-keyup="handleNumber('minX')"
                  />
                </Col>
                <Col :span="2" style="text-align: center">-</Col>
                <Col :span="11">
                  <Input
                    type="text"
                    v-model="searchForm.maxX"
                    @on-keyup="handleNumber('maxX')"
                  />
                </Col>
              </Row>
            </FormItem>
            <FormItem prop="minY" label="客服对话数">
              <Row style="width: 260px">
                <Col :span="11">
                  <Input
                    type="text"
                    v-model="searchForm.minY"
                    @on-keyup="handleNumber('minY')"
                  />
                </Col>
                <Col :span="2" style="text-align: center">-</Col>
                <Col :span="11">
                  <Input
                    type="text"
                    v-model="searchForm.maxY"
                    @on-keyup="handleNumber('maxY')"
                  />
                </Col>
              </Row>
            </FormItem>
            <FormItem prop="minZ" label="访客对话数">
              <Row style="width: 260px">
                <Col :span="11">
                  <Input
                    type="text"
                    v-model="searchForm.minZ"
                    @on-keyup="handleNumber('minZ')"
                  />
                </Col>
                <Col :span="2" style="text-align: center">-</Col>
                <Col :span="11">
                  <Input
                    type="text"
                    v-model="searchForm.maxZ"
                    @on-keyup="handleNumber('maxZ')"
                  />
                </Col>
              </Row>
            </FormItem>
            <FormItem prop="visitedSourceDealed" label="访客来源处理后">
              <Select
                v-model="searchForm.visitedSourceDealed"
                multiple
                style="width: 260px"
                class="selectWidth"
              >
                <Option
                  v-for="item in visitedSourceList"
                  :value="item"
                  :key="item"
                  :title="item"
                  >{{ item }}</Option
                >
              </Select>
            </FormItem>
            <FormItem prop="sourceStyle" label="来源风格">
              <Select
                v-model="searchForm.sourceStyle"
                multiple
                style="width: 260px"
                class="selectWidth"
              >
                <Option
                  v-for="item in sourceStyleList"
                  :value="item"
                  :key="item"
                  :title="item"
                  >{{ item }}</Option
                >
              </Select>
            </FormItem>
            <FormItem prop="visitedPageDealed" label="咨询页面处理后">
              <Select
                v-model="searchForm.visitedPageDealed"
                multiple
                style="width: 260px"
                class="selectWidth"
              >
                <Option
                  v-for="item in visitedPageList"
                  :value="item"
                  :key="item"
                  :title="item"
                  >{{ item }}</Option
                >
              </Select>
            </FormItem>

            <FormItem prop="category" label="一级行业">
              <Select
                v-model="searchForm.category"
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
            <FormItem prop="area" label="信息所在地区">
              <Select v-model="searchForm.area" multiple style="width: 260px">
                <Option
                  v-for="item in provinceList"
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
      <Row
        class="operation"
        style="margin-bottom: 10px"
        type="flex"
        justify="space-between"
      >
        <Button
          @click="downloadData"
          type="info"
          icon="ios-cloud-download-outline"
          :disabled="downloadFlag"
          >数据下载</Button
        >
        <Button @click="getDataList" type="primary" icon="md-refresh"
          >刷新</Button
        >
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
import { provinceList, tradeList, handleProvinceList } from "./provinceList";
export default {
  name: "filterData",
  data() {
    return {
      timeRange: [new Date(new Date() - 7 * 24 * 3600 * 1000), new Date()],
      tagList: [],
      visitedSourceList: [],
      sourceStyleList: [],
      visitedPageList: [],
      industryList: tradeList, // 一级行业
      provinceList: provinceList, // 访客地区
      handleProvinceList: handleProvinceList, // 访客地区处理后
      searchForm: {
        pageSize: 20,
        pageNum: 1,
        flag: 0,
        number: "",
        infoId: "",
        tag: [],
        visitedAreaDealed: [],
        startcontactTime: this.format(
          new Date(new Date() - 7 * 24 * 3600 * 1000),
          "yyyy-MM-dd HH:mm"
        ),
        endcontactTime: this.format(new Date(), "yyyy-MM-dd HH:mm"),
        minX: "",
        maxX: "",
        minY: "",
        maxY: "",
        minZ: "",
        maxZ: "",
        visitedSourceDealed: [],
        sourceStyle: [],
        visitedPageDealed: [],
        category: [],
        area: [],
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
          title: "信息id",
          minWidth: 120,
          align: "center",
          key: "infoId",
        },
        {
          title: "访客标签",
          minWidth: 120,
          align: "center",
          key: "tag",
        },
        {
          title: "总对话数",
          width: 100,
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
          title: "访问来源处理后",
          minWidth: 140,
          align: "center",
          key: "visitedSourceDealed",
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
          title: "咨询页面处理后",
          minWidth: 140,
          align: "center",
          key: "visitedPageDealed",
        },

        {
          title: "一级行业",
          minWidth: 120,
          align: "center",
          key: "category",
        },
        {
          title: "信息地区",
          minWidth: 120,
          align: "center",
          key: "area",
        },
        {
          title: "访客地区处理后",
          minWidth: 140,
          align: "center",
          key: "visitedAreaDealed",
        },
      ],
      data: [],
      total: 0,
      dropDownContent: "展开",
      dropDownIcon: "ios-arrow-down",
      drop: false,
      downloadFlag: true,
    };
  },
  methods: {
    getDataList() {
      this.loading = true;
      postCrmRequest("/data_analysis/search", this.searchForm).then((res) => {
        this.loading = false;
        if (res.success) {
          this.data = res.result.content;
          this.total = res.result.totalElements;
        }
      });
    },
    changePage(v) {
      this.searchForm.pageNum = v;
      this.getDataList();
    },
    changesize(v) {
      this.searchForm.pageSize = v;
      this.getDataList();
    },
    // 数据下载
    downloadData() {
      let data = { ...this.searchForm };
      delete data.pageSize;
      delete data.pageNum;
      delete data.flag;
      postCrmRequest('/data_analysis/search_dowload', data).then(res => {
        if(res.success){
          this.$Message.success('操作成功！');
          this.downloadFlag = true;
        }
      })
      console.log(data, this.searchForm);
    },
    // 访问标签下拉选
    getTagList() {
      getCrmRequest("/data_analysis/select_tag").then((res) => {
        if (res.success) {
          this.tagList = res.result;
        }
      });
    },
    // 访问来源下拉选
    getVisitedSource() {
      getCrmRequest("/data_analysis/select_fwly").then((res) => {
        if (res.success) {
          this.visitedSourceList = res.result;
        }
      });
    },
    // 咨询页面下拉选
    getVisitedPage() {
      getCrmRequest("/data_analysis/select_zxym").then((res) => {
        if (res.success) {
          this.visitedPageList = res.result;
        }
      });
    },
    // 来源风格下拉选
    getSourceStyle() {
      getCrmRequest("/data_analysis/select_lystyle").then((res) => {
        if (res.success) {
          this.sourceStyleList = res.result;
        }
      });
    },
    // 重置
    handleReset() {
      this.$refs.searchForm.resetFields();
      this.downloadFlag = true;
      this.searchForm.pageNum = 1;
      this.searchForm.pageSize = 20;
      this.searchForm.flag = 1;
      this.searchForm.startcontactTime = this.format(
        new Date(new Date() - 7 * 24 * 3600 * 1000),
        "yyyy-MM-dd HH:mm"
      );
      this.searchForm.endcontactTime = this.format(
        new Date(),
        "yyyy-MM-dd HH:mm"
      );
      this.timeRange = [
        new Date(new Date() - 7 * 24 * 3600 * 1000),
        new Date(),
      ];
      this.searchForm.maxX = "";
      this.searchForm.maxY = "";
      this.searchForm.maxZ = "";
      this.getDataList();
    },
    // 查询
    handleSearch() {
      this.searchForm.pageNum = 1;
      this.searchForm.pageSize = 20;
      this.searchForm.flag = 1;
      this.downloadFlag = false;
      this.getDataList();
    },
    // 时间选择
    timeChange(v) {
      this.searchForm.startcontactTime = v[0];
      this.searchForm.endcontactTime = v[1];
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
    // 输入数字
    handleNumber(name) {
      if ((this.searchForm[name].length === 1) & (parseInt(this.searchForm[name]) === 0)) {
        this.searchForm[name] = 0;
      } else {
        this.searchForm[name] = this.searchForm[name].replace(
          /^(0+)|[^\d]+/g,
          ""
        );
      }
    },
  },
  activated() {
    this.getDataList();
    this.getTagList();
    this.getVisitedSource();
    this.getVisitedPage();
    this.getSourceStyle();
  },
};
</script>
    