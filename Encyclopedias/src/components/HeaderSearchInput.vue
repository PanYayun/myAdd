<template>
  <!-- 顶部检索 -->
  <div class="layout_container"
       style="display: flex">
    <div style="width: 210px; height: 104px; margin-right: 162px; display: flex; justify-content: center; align-items: center">
      <img @click="gotoHome"
           style="display: block; width: 210px; cursor: pointer"
           src="@/img/Logo.png" />
    </div>
    <div style="height: 104px; display: flex; align-items: center; position: relative">
      <Input class="search_input"
             search
             enter-button="搜索"
             v-model="Input_seach_data_1"
             @on-search="Input_seach_click_1" />
      <Button type="primary"
              ghost
              style="margin-left: 12px; width: 100px; height: 40px"
              @click="Btnimg_seach_click_1">以图搜索</Button>
      <div class="loadMask"
           style="padding: 25px"
           v-show="loadMask">
        <Upload accept="image/*"
                type="drag"
                :show-upload-list="false"
                action="api/baike/sousuo/search_by_image"
                :before-upload="handleUpload">
          <div style="height: 116px; font-size: 16px; color: #808695; text-align: center; line-height: 116px">拖拽图片到这里</div>
        </Upload>
        <Upload accept="image/*"
                style="width: 100%; text-align: center"
                :show-upload-list="false"
                action="api/baike/sousuo/search_by_image"
                :before-upload="handleUpload">
          <Button style="width: 88px; height: 30px; background: #3388ff; color: #ffffff">选择文件</Button>
        </Upload>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderSearchInput',
  components: {},
  data () {
    return {
      // 第一个输入框的值
      Input_seach_data_1: '',
      loadMask: false,
    };
  },
  beforeDestroy () {
    this.$nextTick(() => {
      if (this.$route.query.val == undefined) return;
      if (JSON.stringify(this.$route.query.val) == undefined) {
        return;
      }
      this.Input_seach_data_1 = JSON.parse(this.$route.query.val).data;
    });
  },
  methods: {
    gotoHome () {
      this.$router.push('/');
    },
    Input_seach_click_1 () {
      // 0是本站搜索，1是全站搜索，val.date是输入框的内容即参数，2是以图搜索，val.date是文件数据
      this.$emit(
        'seach_btn',
        JSON.stringify({ type: '1', data: this.Input_seach_data_1 })
      );
    },
    Btnimg_seach_click_1 () {
      this.loadMask = !this.loadMask;
    },
    handleUpload (file) {
      const param = new FormData();
      param.append('img', file);
      // 0是本站搜索，1是全站搜索，val.date是输入框的内容即参数，2是以图搜索，val.date是文件数据
      // 传输之前转成FormData格式
      this.$store.commit('updated_SearchImg', { type: '2', data: param });
      this.$emit(
        'seach_btn',
        JSON.stringify({ type: '2', data: param.get('img')['name'] })
      );
      return false;
    },
  },
  computed: {},
  watch: {},
};
</script>
<style lang="less" scoped>
.search_input {
  height: 40px;
  width: auto;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  /deep/ input {
    width: 615px;
    height: 40px;
    box-shadow: none;
    border-radius: 0;
    float: left;
  }
  /deep/ .ivu-input-search {
    width: 100px;
    float: left;
    height: 40px;
    line-height: 40px;
  }
}
.loadMask {
  position: absolute;
  left: 0;
  top: 82px;
  width: 824px;
  height: 218px;
  background: #ffffff;
  z-index: 999;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  box-shadow: 0px 0px 3px 1px #eeeeee;
}
</style>
