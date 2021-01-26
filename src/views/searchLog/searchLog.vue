<template>
  <div class="app_container">
    <Card>
      <Form inline :label-width="130" label-position="left" class="operation">
        <Form-item label="分词：">
          <Button type="primary">普通搜索play</Button>
          <Button type="primary">高级招标play</Button>
          <Button type="primary">高级采购play</Button>
          <Button type="primary">高级项目play</Button>
          <Button type="primary">全文搜索★</Button>
        </Form-item>
      </Form>
      <Form inline :label-width="130" label-position="left" class="operation">
        <Form-item label="一元分词：">
          <Button type="primary">★一元高级招标play</Button>
          <Button type="primary">★一元高级采购play</Button>
          <Button type="primary">一元高级项目play</Button>
          <Button type="primary">★一元高级项目(二级行业)play</Button>
          <Button type="primary">一元全文搜索play</Button>
        </Form-item>
      </Form>
      <Form inline :label-width="130" label-position="left" class="operation">
        <Form-item label="原版jsp方式搜索：">
          <Button type="primary">★普通搜索jsp</Button>
          <Button type="primary">高级招标jsp</Button>
          <Button type="primary">高级采购jsp</Button>
          <Button type="primary">高级项目jsp</Button>
          <Button type="primary">项目信息频道</Button>
          <Button type="primary">资讯中心频道</Button>
          <Button type="primary">法规中心频道</Button>
          <Button type="primary">供应商频道之商品</Button>
          <Button type="primary">供应商频道之企业</Button>
          <Button type="primary">供应商频道之展会</Button>
          <Button type="primary">电力频道</Button>
          <Button type="primary">地产频道—主页</Button>
          <Button type="primary">地产频道—招拍挂</Button>
          <Button type="primary">地产频道—地产报道</Button>
          <Button type="primary">地产频道—供地计划</Button>
          <Button type="primary">地产频道—城市规划</Button>
          <Button type="primary">地产频道—房产新闻</Button>
          <Button type="primary">地产频道—地价信息</Button>
          <Button type="primary">地产频道—房价信息</Button>
          <Button type="primary">地产频道—政策法规</Button>
          <Button type="primary">医药频道—主页</Button>
          <Button type="primary">医药频道—Zbzx</Button>
          <Button type="primary">医药频道—Zszx</Button>
          <Button type="primary">医药频道—Message</Button>
          <Button type="primary">邮件—全部</Button>
          <Button type="primary">邮件—采招</Button>
          <Button type="primary">邮件—搜标</Button>
        </Form-item>
      </Form>
      <Form
        ref="form"
        inline
        :model="form"
        :label-width="80"
        :rules="formValidate"
      >
        <FormItem label="IP:" prop="ip">
          <Input v-model="form.ip" />
        </FormItem>
        <FormItem label="JSession:" prop="JSession">
          <Input v-model="form.JSession" />
        </FormItem>
        <FormItem label="Member_id:" prop="Member_id">
          <Input v-model="form.Member_id" />
        </FormItem>
        <FormItem>
          <Button>提交</Button>
        </FormItem>
      </Form>
      <Row>
        <Col>
          <div style="margin-bottom: 10px">
            全部数量：0 本月数量：0 本日数量：0 昨日数量：0
          </div>
        </Col>
        <Col>
          <Table
            :loading="loading"
            border
            :columns="columns"
            :data="data"
            ref="table"
            @on-selection-change="changeSelect"
          ></Table>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
export default {
  name: "searchLog",
  data() {
    return {
      form: {
        ip: "",
        JSession: "",
        Member_id: "",
      },
      columns: [],
      data: [],
      loading: false,
    };
  },
  methods: {
    changeSelect() {},
  },
};
</script>