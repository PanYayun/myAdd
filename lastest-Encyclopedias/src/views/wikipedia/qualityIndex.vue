<template>
  <div class="index_background">
    <div class="index_title">
      <router-link style="color:#ffffff" to="/quality_private" >质量知识服务云平台</router-link>
    </div>
    <div class="index_ul">
      <div>
        <router-link target="_blank" to="/quality_private"
          >质量知识展示</router-link
        >
      </div>
      <div>
        <router-link target="_blank" to="/TableList/NewDataUpload"
          >数据管理</router-link
        >
      </div>
      <div>
        <router-link target="_blank" to="/TableList/addTask"
          >知识加工</router-link
        >
      </div>
      <div>
        <router-link target="_blank" to="/qualityWikipediaRecommend">知识推送</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.index_background {
  width: 1600px;
  height: 796px;
  margin: 0 auto;
  background: url("../../img/background000.png") no-repeat 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.index_title {
  font-size: 46px;
  line-height: 46px;
  margin-top: 268px;
  color: #ffffff;
  font-weight: 600;
}
.index_ul {
  overflow: hidden;
  display: flex;
  width: 612px;
  justify-content: space-between;
  margin-top: 50px;
  margin-bottom: 308px;
  & > div {
    width: 130px;
    height: 44px;
    font-size: 16px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #3388ff;
    cursor: pointer;
    border-radius: 3px;
    a {
      color: #ffffff;
      display: block;
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 44px;
    }
  }
  & > div:hover {
    background: #317ef3;
  }
}
.index_footer {
  color: #ffffff;
  font-size: 16px;
}
</style>