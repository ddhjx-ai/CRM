<template>
  <div class="login">
    <Row
      type="flex"
      justify="center"
      align="middle"
      @keydown.enter.native="submitLogin"
      style="height: 100%"
      v-if="true"
    >
      <Col class="layout">
        <div>
          <Header />
          <Row v-if="!socialLogining">
            <Tabs v-model="tabName">
              <TabPane
                :label="$t('usernameLogin')"
                name="username"
                icon="md-person"
              >
                <Form
                  ref="usernameLoginForm"
                  :model="form"
                  :rules="rules"
                  class="form"
                  v-if="tabName == 'username'"
                >
                  <FormItem prop="username">
                    <Input
                      v-model="form.username"
                      prefix="ios-contact"
                      size="large"
                      clearable
                      placeholder="账号/邮箱/手机号"
                      autocomplete="off"
                    />
                  </FormItem>
                  <FormItem prop="password">
                    <Input
                      type="password"
                      v-model="form.password"
                      prefix="ios-lock"
                      size="large"
                      password
                      placeholder="请输入密码"
                      autocomplete="off"
                    />
                  </FormItem>
                  <FormItem prop="imgCode">
                    <Row
                      type="flex"
                      justify="space-between"
                      style="align-items: center; overflow: hidden"
                    >
                      <Input
                        v-model="form.imgCode"
                        size="large"
                        clearable
                        placeholder="请输入图片验证码"
                        :maxlength="10"
                        class="input-verify"
                      />
                      <div
                        class="code-image"
                        style="position: relative; font-size: 12px"
                      >
                        <Spin v-if="loadingCaptcha" fix></Spin>
                        <img
                          :src="captchaImg"
                          @click="getCaptchaImg"
                          alt="加载验证码失败"
                          style="width: 110px; cursor: pointer; display: block"
                        />
                      </div>
                    </Row>
                  </FormItem>
                </Form>
              </TabPane>
              <TabPane
                :label="$t('mobileLogin')"
                name="mobile"
                icon="ios-phone-portrait"
              >
                <Form
                  ref="mobileLoginForm"
                  :model="form"
                  :rules="rules"
                  class="form"
                  v-if="tabName == 'mobile'"
                >
                  <FormItem prop="mobile">
                    <Input
                      v-model="form.mobile"
                      prefix="ios-phone-portrait"
                      size="large"
                      clearable
                      placeholder="请输入手机号"
                    />
                  </FormItem>
                  <FormItem prop="code" :error="errorCode">
                    <Row type="flex" justify="space-between">
                      <Input
                        v-model="form.code"
                        prefix="ios-mail-outline"
                        size="large"
                        clearable
                        placeholder="请输入短信验证码"
                        :maxlength="6"
                        class="input-verify"
                      />
                      <CountDownButton
                        ref="countDown"
                        @on-click="sendSmsCode"
                        :autoCountDown="false"
                        size="large"
                        :loading="sending"
                        :text="getSms"
                      />
                    </Row>
                  </FormItem>
                </Form>
              </TabPane>
            </Tabs>

            <Row type="flex" justify="space-between" align="middle">
              <Checkbox v-model="saveLogin" size="large">{{
                $t("autoLogin")
              }}</Checkbox>
              <Dropdown trigger="click" @on-click="handleDropDown">
                <a class="forget-pass">{{ $t("forgetPass") }}</a>
                <DropdownMenu slot="list">
                  <DropdownItem name="test">体验测试账号</DropdownItem>
                  <DropdownItem name="resetByMobile"
                    >使用手机号重置密码(付费)</DropdownItem
                  >
                  <DropdownItem name="resetByEmail"
                    >使用邮箱重置密码(付费)</DropdownItem
                  >
                </DropdownMenu>
              </Dropdown>
            </Row>
            <Row>
              <Button
                class="login-btn"
                type="primary"
                size="large"
                :loading="loading"
                @click="submitLogin"
                long
              >
                <span v-if="!loading">{{ $t("login") }}</span>
                <span v-else>{{ $t("logining") }}</span>
              </Button>
            </Row>
            <Row type="flex" justify="space-between" class="other-login">
              <div class="other-way icons">
                {{ $t("otherLogin") }}
                <div class="other-icon" @click="toGithubLogin">
                  <icon scale="1.3" name="brands/github"></icon>
                </div>
                <div class="other-icon" @click="toQQLogin">
                  <icon scale="1.2" name="brands/qq"></icon>
                </div>
                <div class="other-icon" @click="toWeixinLogin">
                  <icon scale="1.3" name="brands/weixin"></icon>
                </div>
                <div class="other-icon" @click="toWeiboLogin">
                  <icon scale="1.3" name="brands/weibo"></icon>
                </div>
              </div>
              <router-link to="/regist">
                <a class="forget-pass">{{ $t("regist") }}</a>
              </router-link>
            </Row>
          </Row>
          <div v-if="socialLogining">
            <RectLoading />
          </div>
        </div>
        <Footer />
      </Col>
      <LangSwitch />
    </Row>
    <div class="selectCity" v-if="true">
      <div id="qrcode"></div>
      <div>
        请选择公司所在地区：
        <i-button
          :type="primary ? 'primary' : ''"
          @click="getWeCode('ww0c31d7c2891ce172', '1000038', 1, true)"
          >北京</i-button
        >
        <i-button
          :type="primary ? '' : 'primary'"
          @click="getWeCode('wwaf72994d2eb35329', '1000004', 2, false)"
          >武汉</i-button
        >
        <!-- <i-button
          :type="primary ? '' : 'primary'"
          @click="getWeCode('ww446591eeb1c9a3d3', '1000003',2,false)"
        >武汉</i-button> -->
      </div>
    </div>

    <!-- <div v-if="isWeiXin" class="weiXinLogin">
      <h1>欢迎使用中台管理系统</h1>
      <i-button type="primary" @click="loginToCRM">立即进入</i-button>
    </div> -->
  </div>
</template>

<script>
import {
  login,
  userInfo,
  githubLogin,
  qqLogin,
  weiboLogin,
  wechatLogin,
  getJWT,
  sendLoginSms,
  smsLogin,
  initCaptcha,
  drawCodeImage,
  getOtherSet,
  getNotice,
} from "@/api/index";
// import { weiXinLogin } from "@/api/crm";
import { validateMobile } from "@/libs/validate";
import Cookies from "js-cookie";
import Header from "@/views/main-components/header";
import Footer from "@/views/main-components/footer";
import LangSwitch from "@/views/main-components/lang-switch";
import RectLoading from "@/views/my-components/xboot/rect-loading";
import CountDownButton from "@/views/my-components/xboot/count-down-button";
import util from "@/libs/util.js";
import sha1 from "js-sha1";
let Hashes = require("jshashes");
export default {
  components: {
    CountDownButton,
    RectLoading,
    LangSwitch,
    Header,
    Footer,
  },
  data() {
    return {
      primary: true,
      captchaId: "",
      captchaImg: "",
      loadingCaptcha: true,
      socialLogining: true,
      error: false,
      tabName: "username",
      saveLogin: true,
      getSms: "获取验证码",
      loading: false,
      sending: false,
      errorCode: "",
      form: {
        username: "",
        password: "123456",
        mobile: "阿里云短信0.045/条 若余额不足联系作者充值",
        code: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
        imgCode: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur",
          },
          {
            validator: validateMobile,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    getCaptchaImg() {
      this.loadingCaptcha = true;
      initCaptcha().then((res) => {
        this.loadingCaptcha = false;
        if (res.success) {
          this.captchaId = res.result;
          this.captchaImg = drawCodeImage + this.captchaId;
        }
      });
    },
    sendSmsCode() {
      this.$refs.mobileLoginForm.validate((valid) => {
        if (valid) {
          this.sending = true;
          this.getSms = "发送中";
          sendLoginSms(this.form.mobile).then((res) => {
            this.getSms = "获取验证码";
            this.sending = false;
            if (res.success) {
              this.$Message.success("发送短信验证码成功");
              // 开始倒计时
              this.$refs.countDown.startCountDown();
            }
          });
        }
      });
    },
    afterLogin(res) {
      let accessToken = res.result;
      this.setStore("accessToken", accessToken);
      getOtherSet().then((res) => {
        if (res.result) {
          let domain = res.result.ssoDomain;
          Cookies.set("accessToken", accessToken, {
            domain: domain,
            expires: 7,
          });
        }
      });
      // 获取用户信息
      userInfo().then((res) => {
        if (res.success) {
          // 避免超过大小限制
          delete res.result.permissions;
          let roles = [];
          res.result.roles.forEach((e) => {
            roles.push(e.name);
          });
          this.setStore("roles", roles);
          this.setStore("saveLogin", this.saveLogin);
          if (this.saveLogin) {
            // 保存7天
            Cookies.set("userInfo", JSON.stringify(res.result), {
              expires: 7,
            });
          } else {
            Cookies.set("userInfo", JSON.stringify(res.result));
          }
          this.setStore("userInfo", res.result);
          this.$store.commit("setAvatarPath", res.result.avatar);
          // 加载菜单
          util.initRouter(this);
          this.$router.push({
            name: "home_index",
          });
        } else {
          this.loading = false;
        }
      });
    },
    submitLogin() {
      if (this.tabName == "username") {
        this.$refs.usernameLoginForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            login({
              username: this.form.username,
              password: this.form.password,
              code: this.form.imgCode,
              captchaId: this.captchaId,
              saveLogin: this.saveLogin,
            }).then((res) => {
              if (res.success) {
                this.afterLogin(res);
              } else {
                this.loading = false;
                this.getCaptchaImg();
              }
            });
          }
        });
      } else if (this.tabName == "mobile") {
        this.$refs.mobileLoginForm.validate((valid) => {
          if (valid) {
            if (this.form.code == "") {
              this.errorCode = "验证码不能为空";
              return;
            } else {
              this.errorCode = "";
            }
            this.loading = true;
            this.form.saveLogin = this.saveLogin;
            smsLogin(this.form).then((res) => {
              if (res.success) {
                this.afterLogin(res);
              } else {
                this.loading = false;
              }
            });
          }
        });
      }
    },
    toGithubLogin() {
      this.socialLogining = true;
      githubLogin().then((res) => {
        if (res.success) {
          window.location.href = res.result;
        } else {
          this.socialLogining = false;
        }
      });
    },
    toQQLogin() {
      this.socialLogining = true;
      qqLogin().then((res) => {
        if (res.success) {
          window.location.href = res.result;
        } else {
          this.socialLogining = false;
        }
      });
    },
    toWeiboLogin() {
      this.socialLogining = true;
      weiboLogin().then((res) => {
        if (res.success) {
          window.location.href = res.result;
        } else {
          this.socialLogining = false;
        }
      });
    },
    toWeixinLogin() {
      this.socialLogining = true;
      wechatLogin().then((res) => {
        if (res.success) {
          window.location.href = res.result;
        } else {
          this.socialLogining = false;
        }
      });
    },
    relatedLogin() {
      let q = this.$route.query;
      let error = q.error;
      if (error !== "" && error !== undefined) {
        this.$Message.error(error);
      }
      let related = q.related;
      let JWTKey = q.JWTKey;
      if (related && related == "1" && JWTKey) {
        getJWT({ JWTKey: JWTKey }).then((res) => {
          if (res.success) {
            this.socialLogining = true;
            let accessToken = res.result;
            this.setStore("accessToken", accessToken);
            getOtherSet().then((res) => {
              if (res.result) {
                let domain = res.result.ssoDomain;
                Cookies.set("accessToken", accessToken, {
                  domain: domain,
                  expires: 7,
                });
              }
            });
            // 获取用户信息
            userInfo().then((res) => {
              if (res.success) {
                // 避免超过大小限制
                delete res.result.permissions;
                let roles = [];
                res.result.roles.forEach((e) => {
                  roles.push(e.name);
                });
                this.setStore("roles", roles);
                // 保存7天
                Cookies.set("userInfo", JSON.stringify(res.result), {
                  expires: 7,
                });
                this.setStore("userInfo", res.result);
                this.$store.commit("setAvatarPath", res.result.avatar);
                // 加载菜单
                util.initRouter(this);
                this.$router.push({
                  name: "home_index",
                });
              } else {
                this.socialLogining = false;
                this.$Message.error("获取登录用户信息失败");
              }
            });
          } else {
            this.socialLogining = false;
            this.$Message.error("使用第三方账号登录失败");
          }
        });
      } else {
        this.socialLogining = false;
      }
    },
    handleDropDown(v) {
      if (v == "test") {
        this.test();
      } else if (v == "resetByMobile") {
        this.$router.push({
          name: "reset",
        });
      } else if (v == "resetByEmail") {
        this.$router.push({
          name: "reset",
          query: {
            type: "1",
          },
        });
      }
    },
    showNotice() {
      getNotice().then((res) => {
        if (res.success) {
          if (!res.result) {
            return;
          }
          let data = res.result;
          if (
            data.open &&
            (data.title || data.content) &&
            data.position == "LOGIN"
          ) {
            this.$Notice.info({
              title: data.title,
              desc: data.content,
              duration: data.duration,
            });
          }
        }
      });
    },
    test() {
      this.$Notice.info({
        title: "测试体验账号",
        desc: "账号：test或test2<br>密码：123456",
      });
    },
    getWeCode(appid, agentid, query, flag = true) {
      this.primary = flag;
      this.WwLogin({
        id: "qrcode",
        appid: appid,
        agentid: agentid,
        redirect_uri: encodeURI(
          // "//osc.chinabidding.cn/osc/qywechatlogin?flag=" + query
          "http://osc.chinabidding.cn/osc/qywechatlogin?flag=" + query
        ),
        connect_redirect: 1,
        state: new Date().getTime(),
        href: "",
      });
    },
  },
  mounted() {
    // this.isWeiXin = this.is_weixin();
    this.getWeCode("ww0c31d7c2891ce172", "1000038", 1, true);
    this.relatedLogin();
    this.showNotice();
    this.getCaptchaImg();
  },
};
</script>

<style lang="less">
@import "./login.less";
.selectCity {
  button {
    margin: 0 10px;
  }
}
</style>