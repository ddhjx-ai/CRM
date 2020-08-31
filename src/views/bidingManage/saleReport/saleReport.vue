<template>
  <div class="app_container">
      <iframe src="https://crm.chinabidding.cn/admin.report.researchreportcontroller/showreport" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
name: 'saleReport'
}
</script>

<style scoped lang="less">
.app_container{
    height: calc(100vh - 120px);
    iframe{
        width: 100%;
        height: 100%;
    }
}
</style>