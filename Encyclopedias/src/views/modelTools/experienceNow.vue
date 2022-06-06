<template>
    <div class="contbody">
        <div class="contbody_title">
            立即体验
        </div>
        <div style="padding-top:24px;overflow: hidden;">
            <div class="modelStyle_one">
                <div class="modelStyle_l">
                    选择模型：
                </div>
                <div class="modelStyle_r">
                    <Select v-model="modelChoice">
                        <Option v-for="(item,index) in listData" label-in-value :id="item.id" :key="index" @click.native="descriptionBtn(item.description)" :value="item.id">{{item.name}} </Option>
                    </Select>
                </div>
            </div>
            <div class="modelStyle_two">
                <div class="modelStyle_l">模型描述：</div>
                <div class="modelStyle_r">
                    <Input v-model="modelDescribe" disabled type="textarea" :rows="4" placeholder="暂无描述" />
                </div>
            </div>
            <div class="modelStyle_two">
                <div class="modelStyle_l">请输入一段想分析的文本：</div>
                <div class="modelStyle_r">
                    <Input v-model="analysisText" type="textarea" :rows="4" placeholder="描述" />
                </div>
            </div>
            <div style="width:100%;margin-top:30px;display: flex;justify-content: center;">
                <Button type="primary" @click="analysisBtn()">分析</Button>
            </div>
            <div style="height:50px;display:flex;align-items: center;">
                分析结果
            </div>
            <div class="result_box">
                <wordcloud :wordcloudData="wordcloudData"></wordcloud>
                <div class="result_box_type">
                    <div>
                        <div style="background:#3f424b" class="result_box_type_color"></div>
                        <div>非常相关</div>
                    </div>
                    <div>
                        <div style="background:#858b9a" class="result_box_type_color"></div>
                        <div>一般相关</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import wordcloud from '@/components/wordcloudTwo.vue';
export default {
  name: 'experienceNow',
  components: { wordcloud },

  props: {},
  data() {
    return {
      modelChoice: '', //模型选择
      modelDescribe: '', //模型描述
      analysisText: '', //分析的文本
      analysisResult: '', //分析结果
      listData: [], //下拉的数据列表
      maxText: [], //大文本
      smallText: [], // 小文本
      wordcloudData: [],
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 选择模型下拉
    getListDown() {
      this.$axios(
        '/baike/tyzx/get_task_type',
        'post',
        this.$qs.stringify({
          type: '文本分类',
        })
      ).then(res => {
        this.listData = res.data.data;
      });
    },
    descriptionBtn(item) {
      this.modelDescribe = item;
    },
    // 点击分析按钮
    analysisBtn() {
      // this.wordcloudData =[{name: "专业工程", value: 2}, {name: "导航", value: 1}, {name: "计量", value: 1}]
      if (this.modelChoice != '') {
        if (this.analysisText != '') {
          this.$axios(
            '/baike/tyzx/get_single_res',
            'post',
            this.$qs.stringify({
              text: this.analysisText,
              image_id: this.modelChoice,
            })
          ).then(res => {
            this.wordcloudData = res.data.data;
          });
        } else {
          this.$Message.warning({
            background: true,
            content: '请输入一段想分析的文本',
          });
        }
      } else {
        this.$Message.warning({
          background: true,
          content: '请选择模型',
        });
      }
    },
  },
  created() {
    this.getListDown();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.contbody {
  padding: 0px 20px 0px 20px;
  background: white;
  border-radius: 5px;
  .contbody_title {
    height: 46px;
    line-height: 46px;
    font-size: 16px;
    color: #3f424b;
    border-bottom: 1px solid #eeeeee;
  }
  // 模块的模板1
  .modelStyle_one {
    display: flex;
    .modelStyle_l {
      line-height: 30px;
      text-align: right;
    }
    .modelStyle_r {
      flex: 1;
      height: 30px;
    }
  }
  // 模块的模板2
  .modelStyle_two {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    .modelStyle_l {
      min-width: 80px;
      line-height: 30px;
      text-align: left;
    }
    .modelStyle_r {
      flex: 1;
      height: 30px;
      /deep/ .ivu-input {
        resize: none;
        margin-top: 10px;
        height: 80px;
      }
    }
  }
  .result_box {
    height: 114px;
    width: 100%;
    border-color: #ececec;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    margin-bottom: 20px;
    position: relative;
    .result_box_type {
      position: absolute;
      right: 5px;
      bottom: 5px;
      display: flex;
      flex-direction: column;
      z-index: 99;
      & > div {
        display: flex;
        font-size: 12px;
        color: #a9aca6;
        align-items: center;
        .result_box_type_color {
          width: 8px;
          height: 8px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>