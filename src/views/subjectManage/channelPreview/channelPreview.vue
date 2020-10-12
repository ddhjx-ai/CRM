<template>
  <div class="app_container">
    <div class="app_w">
      <div class="channel_url">
        <Row type="flex">
          <Col :span="5">测试频道分类</Col>
          <Col :span="url_span">测试频道分类</Col>
        </Row>
      </div>
      <div class="channel_menu">
        <Row type="flex" style="height: 100%">
          <Col :span="5" style="height: 100%">
            <ul>
              <li></li>
            </ul>
          </Col>
          <Col :span="19" style="background: #d8d8d8; height: 100%">

          </Col>
        </Row>
      </div>
      <div class="channel_content">
        <Row type="flex" justify="center" style=" height: 90px">
          <Col :span="conten_span">col-4</Col>
          <Col :span="conten_span">col-4</Col>
          <Col :span="conten_span">col-4</Col>
          <Col :span="conten_span">col-4</Col>
        </Row>
        <Row type="flex" style="height: 300px; background:#fff;">
          <Col :span="24" style="height: 100%">
            <ul>
              <li></li>
            </ul>
          </Col>
        </Row>
      </div>
      <div class="channel_two" style="margin-bottom:30px">
        <Row :gutter="30">
          <Col :span="12">
            <h3>在线报名</h3>
            <div style="height: 300px; background:#fff;"></div>
          </Col>
          <Col :span="12">
            <h3>附件下载</h3>
            <div style="height: 300px; background:#fff;"></div>
          </Col>
        </Row>
      </div>
      <div class="channel_colorful">
        <Row :gutter="10">
          <Col :span="19">
            <div style="height: 100%; background:#fff;">
111
            </div>
          </Col>
          <Col :span="5" >
            <div style="height: 100%; background:#fff;">
              <h3>VIP</h3>
            </div>
            
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "channelPreview",
  data() {
    return {
      url_span: 4,
      conten_span: 4,
    };
  },
};
</script>

<style scoped lang="less">
li{
    list-style: none;
  }
.app_container {
  display: flex;
  justify-content: center;
}
.app_w {
  width: 1080px;
}
.channel_url {
  height: 40px;
  background: #e2e2e2;
}
.channel_menu{
  height: 340px;
  background: #d1d1d1;
}
.channel_content{
  margin-bottom: 30px;
}
</style>