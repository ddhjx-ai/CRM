<template>
  <div class="app_container">
      <Card>

          <Row>
        <Table
          class="mygrid"
          :loading="loading"
          border
          :columns="columns"
          :data="data"
          ref="table"
        ></Table>
      </Row>
      </Card>
  </div>
</template>

<script>
export default {
name: 'failMember',
data() {
    return{
        columns: [
            {
          type: "index",
          width: 70,
          title: "序号",
          align: "center",
        },
        {
          title: "公司名",
          key: "companyName",
          minWidth: 120,
          align: "center",
        },
        {
          title: "到期时间",
          key: "name",
          minWidth: 120,
          align: "center",
        },
        {
          title: "失败邮箱",
          key: "name",
          minWidth: 120,
          align: "center",
        },
        {
          title: "客户分类",
          key: "name",
          minWidth: 120,
          align: "center",
        },
        {
          title: "负责人",
          key: "name",
          minWidth: 120,
          align: "center",
        },
        ],
        data: [],
        loading: false
    }
},
methods: {
    getAllList() {
        this.loading = true
    }
},
mounted() {
    this.getAllList();
}
}
</script>

<style scoped lang="less">
.mygrid .ivu-table th {
  text-align: center;
}
</style>