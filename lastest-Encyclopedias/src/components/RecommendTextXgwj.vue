<template>
    <div class="recommendText">
        <div class="recommend-header-box">
            <div class="recommend-header">
                <span>{{ title }}</span>
            </div>
            <div class="recommend-header-line"></div>
        </div>
        <div class="recommend-content-box">
            <div v-if="listData.length == 0" style="
          padding-top: 10px;
          padding-bottom: 10px;
          padding-left: 25px;
          border-bottom: 1px solid #f5f5f5;
        ">
                <span>暂无数据</span>
            </div>
            <div v-else v-for="(item,index) in listData.slice(0, 5)" :key="index" class="recommend-content" @click="toFileDetail(item)">
                <span class="line_ellipsis_2" :title="item.projectName">{{ item.projectName }}</span>
            </div>
        </div>
        <Modal v-model="modal2" width="50" footer-hide>
            <p slot="header">
                <span>相关文件</span>
            </p>
            <div class="modallive">
                <p>
                    <span>项目代号:</span><span> {{ RelatedDocumentsForm.Code }}</span>
                </p>
                <p>
                    <span>项目名称:</span><span>{{ RelatedDocumentsForm.Name }}</span>
                </p>
                <p>
                    <span>项目部门:</span><span>{{ RelatedDocumentsForm.department }}</span>
                </p>
                <p>
                    <span>项目单位:</span><span>{{ RelatedDocumentsForm.Company }}</span>
                </p>
                <p>
                    <span>项目周期:</span><span>{{ RelatedDocumentsForm.cycle }}</span>
                </p>
                <p>
                    <span>总概算:</span><span>{{ RelatedDocumentsForm.Estimate }}</span>
                </p>
                <p>
                    <span>项目内容:</span><span>{{ RelatedDocumentsForm.content }}</span>
                </p>
                <p>
                    <span>评审结论:</span><span>{{ RelatedDocumentsForm.conclusion }}</span>
                </p>
                <p>
                    <span>专家意见:</span><span>{{ RelatedDocumentsForm.opinion }}</span>
                </p>
                <p>
                    <span>建议经费:</span><span>{{ RelatedDocumentsForm.funds }}</span>
                </p>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
  name: 'recommend-text',
  props: ['title', 'listData'],
  data() {
    return {
      modal2: false, //相关文件弹框
      RelatedDocumentsForm: {
        Code: '', //代号
        Name: '', //名称
        department: '', //部门
        Company: '', //单位
        cycle: '', //周期
        Estimate: '', //概算
        content: '', //内容
        conclusion: '', //结论
        opinion: '', //意见
        funds: '', //经费
      },
    };
  },
  mounted() {},
  methods: {
    //文件详情
    toFileDetail(item) {
      this.modal2 = true;
      console.log(item);
      this.RelatedDocumentsForm = {
        Code: item.projectNo, //代号
        Name: item.projectName, //名称
        department: item.viewDeptName, //部门
        Company: item.unit, //单位
        cycle: item.startYear + '-' + item.startYearEnd, //周期
        Estimate: item.generalCount, //概算
        content: item.projectContent, //内容
        conclusion: item.recordResult, //结论
        opinion: item.expertSuggest, //意见
        funds: item.proposedFunding, //经费
      };
    },
  },
};
</script>
<style lang="less" scoped>
.recommendText {
  width: 100%;
  padding: 0 15px 0 15px;

  .recommend-header-box {
    height: 50px;

    .recommend-header {
      height: 48px;
      line-height: 48px;

      span {
        font-size: 18px;
        color: #3f424b;
      }
    }
    .recommend-header-line {
      position: relative;
      width: 105px;
      height: 2px;
      background: #3388ff;
    }
  }
  .recommend-content-box {
    .recommend-content {
      padding-top: 10px;
      padding-bottom: 10px;
      // padding-left: 25px;
      line-height: 30px;
      cursor: pointer;
      // background: url("../img/recommend_link.png") no-repeat 0px 18px;
      border-bottom: 1px solid #f5f5f5;
      span:hover {
        color: #3388ff;
      }
    }
  }
}
</style>
