<style lang="less">
@import './weixin.less';
</style>
<template>
  <div class="weixinLogin">
    <div>
      <h1>欢迎使用中台管理系统</h1>
      <i-button type="primary" @click="loginToCRM">立即进入</i-button>
    </div>
  </div>
</template>
<script>
import { weiXinLogin } from "@/api/weiXin";
import sha1 from "js-sha1";
export default {
  name: "beiJing",
  data() {
    return {};
  },
  methods: {
    loginToCRM() {
      var url = location.href.split("#")[0];
      weiXinLogin({area: 1}).then((res) => {
        var str1 = sha1(
          `jsapi_ticket=${res.jsapi_ticket}&noncestr=${res.nonceStr}&timestamp=${res.timestamp}&url=${url}`
        );
        this.wx.config({
          beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.corpid, // 必填，企业微信的corpID
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: str1, // 必填，签名，见 附录-JS-SDK使用权限签名算法
          jsApiList: ["openDefaultBrowser"], // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
        });
        let redirect_uri = encodeURI('http://osc.chinabidding.cn/osc/qywechatlogin?flag=1');
        this.wx.ready(() => {
          this.wx.invoke(
            "openDefaultBrowser",
            {
              // url: url, // 在默认浏览器打开redirect_uri，并附加code参数；也可以直接指定要打开的url，此时不会附带上code参数。
              url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww0c31d7c2891ce172&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
            },
            function (res) {
              if (res.errMsg == "openDefaultBrowser:ok") {
              }
            }
          );
        });
        this.wx.error((res) => {});
      });
    },
    // 判断是否是微信浏览器打开
    is_weixin() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    if(!this.is_weixin()){
      this.$router.push({
        name: 'login'
      })
    }
  },
};
</script>