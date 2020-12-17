<template>
  <div class="app_container">
    <Card>
      <Row class="operation" style="margin-bottom:10px">
        <Form ref="searchForm" :model="searchForm" inline :label-width="80" label-position="right">
          <Form-item label="姓名" prop="ipRaw">
            <Input type="text" v-model="searchForm.ipRaw" clearable style="width: 200px;" />
          </Form-item>
          <Form-item label="电话" prop="ipRaw">
            <Input type="text" v-model="searchForm.ipRaw" clearable style="width: 200px;" />
          </Form-item>
          <Form-item label="开始时间" prop="startDate">
            <DatePicker type="date" placeholder="选择时间" v-model="searchForm.startDate" style="width: 200px;"></DatePicker>
          </Form-item>
          <Form-item label="结束时间" prop="endDate">
            <DatePicker type="date" placeholder="选择时间" v-model="searchForm.endDate" style="width: 200px;"></DatePicker>
          </Form-item>
          <Form-item label="是否联系" prop="select">
            <Select v-model="searchForm.select" style="width: 200px;">
                <Option value="0">全部</Option>
                <Option value="1">已联系</Option>
                <Option value="2">未联系</Option>
            </Select>
          </Form-item>
          <Form-item label="备注" prop="ipRaw">
            <Input type="text" v-model="searchForm.ipRaw" clearable style="width: 200px;" />
          </Form-item>
          <Form-item class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search">查询</Button>
            <Button @click="handleReset">重置</Button>
          </Form-item>
        </Form>
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
        <FormItem label="IP" prop="ipRaw">
          <Input v-model="form.ipRaw" />
        </FormItem>
        <FormItem label="描述" prop="comments">
          <Input v-model="form.comments" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handleCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handleSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { validateIP } from "@/libs/validate";
export default {
  name: "bidingWrite",
  data() {
    return {
      searchForm: {
        page: 1,
        size: 10,
        ipRaw: "",
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
          title: "姓名",
          key: "ipRaw",
          minWidth: 150,
          align: "center",
        },
        {
          title: "电话",
          key: "comments",
          minWidth: 150,
          align: "center",
        },
        {
          title: "提交时间",
          key: "lastModify",
          minWidth: 150,
          align: "center",
          
        },
        {
          title: "是否联系",
          key: "lastModify",
          minWidth: 150,
          align: "center",
          
        },
        {
          title: "负责人",
          key: "lastModify",
          minWidth: 150,
          align: "center",
          
        },
        {
          title: "备注",
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
  },
};
</script>

<style scoped lang="less">
</style>