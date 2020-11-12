
<template>
  <div class="search">
    <Card>
      <Row>
        <Form
          ref="searchForm"
          :model="searchForm"
          inline
          :label-width="80"
          label-position="right"
          :rules="rules"
        >
          <Form-item label="手机号：" prop="phone">
            <Input
              type="text"
              v-model="searchForm.phone"
              placeholder="请输入完整的手机号"
            />
          </Form-item>
          <Form-item class="operation leftMargin">
            <Button @click="handleQrcode" type="primary">生成二维码</Button>
            <Button @click="handleReset">重置</Button>
          </Form-item>
        </Form>
      </Row>
      <Row>
        <img :src="imgSrc" alt="" />
      </Row>
    </Card>
  </div>
</template>

<script>
import {
  getCrmRequest,
  removeCrm,
  postCrmRequest,
  putCrmRequest,
} from "@/api/crm";
import { validateMobile } from "@/libs/validate";
import qs from "qs";
export default {
  name: "qrcode",
  data() {
    return {
      searchForm: {
        phone: "",
      },
      imgSrc: "",
      rules: {
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { validator: validateMobile, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleQrcode() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset() {
      this.$refs.searchForm.resetFields();
    },
  },
  mounted() {},
};
</script>

<style lang="less" escoped>
.main .single-page-con .single-page {
  height: calc(100% - 20px);
}
.search {
  position: relative;
  height: 100%;
}
.ivu-card-bordered {
  height: 100%;
}
.leftMargin .ivu-form-item-content {
  margin-left: 0 !important;
}
</style>