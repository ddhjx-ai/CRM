
<template>
  <div class="search">
    <!-- <Card> -->
    <div class="loading" v-if="isShow">
      <Button :loading="loading">加载中...</Button>
    </div>
    <div ref="imageDom">
      <div class="title">
        <img src="../../../assets/preSale/logo.png" alt="" />
        <p>信息体验报告</p>
        <Button
          type="text"
          ghost
          icon="ios-cloud-download-outline"
          @click="toImage"
          >下载</Button
        >
      </div>
      <div class="container">
        <div class="item">
          <!-- <p class="itemTitle">
              1 在<span style="color: #2e5ae7">上海</span>，与<span
                style="color: #2e5ae7"
                >窗帘</span
              >相关的最新信息如下所示：
            </p>
            <ul class="itemInfo">
              <li>
                【<span style="color: #d53d01">招标</span
                >】园区运营部2021年电动遮阳窗帘及防蚊纱窗维修零配件更换货物项目比选公告
              </li>
              <li>
                【<span style="color: #d53d01">招标</span
                >】园区运营部2021年电动遮阳窗帘及防蚊纱窗维修零配件更换货物项目比选公告
              </li>
            </ul> -->
        </div>
        <div class="item">
          <!-- <p class="itemTitle">
            1 在<span style="color: #2e5ae7">上海</span>，与<span
              style="color: #2e5ae7"
              >窗帘</span
            >相关的最新信息如下所示：
          </p>
          <ul class="itemInfo">
            <li>
              【<span style="color: #d53d01">招标</span
              >】园区运营部2021年电动遮阳窗帘及防蚊纱窗维修零配件更换货物项目比选公告
            </li>
            <li>
                【<span style="color: #d53d01">招标</span
                >】园区运营部2021年电动遮阳窗帘及防蚊纱窗维修零配件更换货物项目比选公告
              </li>
          </ul> -->
        </div>
      </div>
      <div class="footer">
        <img src="../../../assets/preSale/phone.png" alt="" />
        <div>
          <p>拨打<span style="color: #ff1515">18701536736</span></p>
          <p>联系专属客服，可为您关注的项目进行免费信息订阅</p>
        </div>
      </div>
    </div>
    <!-- </Card> -->
  </div>
</template>

<script>
import {
  getCrmRequest,
  removeCrm,
  postCrmRequest,
  putCrmRequest,
} from "@/api/crm";
import qs from "qs";
import html2canvas from "html2canvas";
export default {
  name: "preSaleDetail",
  data() {
    return {
      areaList: [],
      companyList: [],
      loading: true,
      isShow: false
    };
  },
  // 表格动态列 计算属性
  methods: {
    toImage() {
      html2canvas(this.$refs.imageDom, {
        backgroundColor: "#ffffff",
      }).then((canvas) => {
        var imgData = canvas.toDataURL("image/jpeg");
        this.fileDownload(imgData);
      });
    },
    fileDownload(downloadUrl) {
      let aLink = document.createElement("a");
      aLink.style.display = "none";
      aLink.href = downloadUrl;
      aLink.download = "信息体验报告.png";
      // 触发点击-然后移除
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink);
    },
  },
  mounted() {},
};
</script>

<style lang="less" escoped>
.main .single-page-con .single-page{
  margin: 0;
  height: 100%;
}
.search{
  position: relative;
  height: 100%;
}
.loading {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  width: 1160px;
  margin: 0 auto;
  padding: 20px;
}
.title {
  height: 500px;
  background-image: url("../../../assets/preSale/bgc.png");
  background-color: #aaa;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  box-sizing: border-box;
  padding-top: 100px;
  position: relative;
  button {
    position: absolute;
    top: 85px;
    right: 105px;
    color: #ccc;
    font-size: 20px;
  }
  p {
    color: #fff;
    font-weight: bold;
    font-size: 90px;
    text-align: center;
  }
  img {
    display: block;
    margin: 0 auto 50px;
    width: 467px;
    height: 79px;
  }
}
.item {
  .itemTitle {
    line-height: 42px;
    font-size: 24px;
    font-weight: bold;
  }

  .itemInfo {
    padding-left: 60px;
    line-height: 42px;
    font-size: 16px;
    position: relative;
    color: #666;
  }
}
.footer {
  font-size: 16px;
  display: flex;
  justify-content: center;
  margin-top: 60px;
  padding-bottom: 20px;
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 60px;
    p {
      line-height: 50px;
    }
  }
}
</style>