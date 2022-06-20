<template>
    <div style="padding: 15px 20px 0px 20px; background: white; border-radius: 5px">
        <Card :bordered="false" dis-hover :padding="0">
            <Row>
                <Col span="24" style="padding-bottom: 15px; border-bottom: 1px solid #eeeeee">
                <p style="font-size: 18px; font-weight: 800">
                    "{{ TaskName }}"任务审核
                </p>
                </Col>
                <Col span="24" style="padding:  15px 0;">
                <p style="font-size: 18px; font-weight: 800">{{ page_name }}</p>
                </Col>
                <div v-for="(item, index) in textbox" :key="index" style="clear: both;width: 100%">
                    <Col v-if='item.hasOwnProperty("name_key")' span="24" style="display:flex;align-items: center;margin:10px 0;" class="Stame">
                    <span class="StandardName">{{ item.name_key }}：</span>
                    <!-- <div class="textName" v-html="name_value"></div> -->
                    <Input v-model="item.name_value" type="textarea" disabled />
                    </Col>

                    <Col v-else-if='item.hasOwnProperty("text_key")' span="24" style="display:flex;align-items: center;margin:10px 0;">
                    <span class="StandardName">{{ item.text_key }}：</span>
                    <!-- <div class="textarea" v-html="text_value"></div> -->
                    <Input v-model="item.text_value" type="textarea" disabled />
                    </Col>
                </div>
                <!--        <Col-->
                <!--          span="24"-->
                <!--          style="display:flex;align-items: center;margin:10px 0;"-->
                <!--          class="Stame"-->
                <!--        >-->
                <!--          <span class="StandardName">{{ name_key }}：</span>-->
                <!--          &lt;!&ndash; <div class="textName" v-html="name_value"></div> &ndash;&gt;-->
                <!--          <Input v-model="name_value" type="textarea" disabled />-->
                <!--        </Col>-->
                <!--        <Col-->
                <!--            span="24"-->
                <!--            style="display:flex;align-items: center;margin:10px 0;"-->
                <!--            class="Stame"-->
                <!--        >-->
                <!--          <span class="StandardName">{{ name_key1 }}：</span>-->
                <!--          &lt;!&ndash; <div class="textName" v-html="name_value"></div> &ndash;&gt;-->
                <!--          <Input v-model="name_value1" type="textarea" disabled />-->
                <!--        </Col>-->
                <!--        <Col span="24" style="display:flex;align-items: center;margin:10px 0;">-->
                <!--          <span class="StandardName">{{ text_key }}：</span>-->
                <!--          &lt;!&ndash; <div class="textarea" v-html="text_value"></div> &ndash;&gt;-->
                <!--          <Input v-model="text_value" type="textarea" disabled />-->
                <!--        </Col>-->
                <Col span="24" style="padding:  15px 0;text-align: right;">
                <p>当前审核第{{ current_count }}条数据，共{{ total_count }}条</p>
                </Col>
                <Col span="24" style="padding:  15px 0;">
                <Button type="primary" style="width: 100px" @click="PreviousStep()">查看下一条</Button>
                <Button type="primary" style="width: 100px;margin-left:20px;" @click="NextSteps()">刷新结果</Button>
                </Col>
                <Col span="24" style="padding:  30px 0;">
                <p style="font-size: 18px; font-weight: 800">
                    分类结果
                </p>
                </Col>
            </Row>
            <Table border ref="selection" :columns="columns4" :data="not_choiced_classList" @on-selection-change="seleChoice"></Table>
            <Row style="padding-bottom:50px">
                <Col span="24" style="text-align: center; margin-top: 30px;padding-bootm:30px">
                <Button type="primary" @click="preservation" style="width: 100px;margin-right:20px">保存结果</Button>
                <Button type="primary" @click="returnkey" style="width: 100px;">返回</Button>
                </Col>
            </Row>
        </Card>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import { _debounce } from '@/libs/Perform_optimization.js';
export default {
  name: 'StandardClassification',
  data() {
    return {
      num: 0, //默认从0开始
      total_count: '', //总条数
      current_count: '', //当前审核的条数
      page_name: '', //标题
      record_id: '', //当前审核数据的Id
      name_key: '', //名称
      name_value: '', //名称的值
      name_key1: '', //名称
      name_value1: '', //名称的值
      text_key: '', //文本标题
      text_value: '', //文本内容
      textbox: [],
      choiced_classList: [], //选中
      not_choiced_classList: [], //未选中
      is_single_choice: '', //是否是单选
      StandardKnowledge: false, //判断是否是相似标准推荐
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        },
        {
          title: '序号',
          align: 'center',
          key: 'index',
        },
        {
          title: '类别',
          key: 'age',
          align: 'center',
        },
      ],
    };
  },
  methods: {
    //初始化
    Initialize() {
      let thats = this.StandardKnowledge
        ? '/baike/yuchuli/biaozhun/check_832_class'
        : '/baike/yuchuli/shigu/check_accident_xingzhi';
      this.$Spin.show();
      this.choiced_classList = []; //选中
      this.not_choiced_classList = []; //未选中

      //原ID this.toExamineid
      //测试ID "test_subjob_id_3333" 'biaozhun-subtest-00006'
      this.$axios(
        thats,
        'post',
        this.$qs.stringify({
          subjob_id: this.toExamineid,
          index: this.num,
        })
      ).then(res => {
        if (this.StandardKnowledge == false) {
          this.text_key = res.data.textbox[1].text_key;
          this.text_value = res.data.textbox[1].text_value;
        } else {
          this.text_key = res.data.textbox[2].text_key;
          this.text_value = res.data.textbox[2].text_value;
        }
        this.page_name = res.data.page_name;
        this.record_id = res.data.record_id;
        this.total_count = res.data.total_count;
        this.current_count = res.data.current_count;
        this.name_key = res.data.textbox[0].name_key;
        this.name_value = res.data.textbox[0].name_value;
        this.name_key1 = res.data.textbox[1].name_key;
        this.name_value1 = res.data.textbox[1].name_value;

        this.textbox = res.data.textbox;
        this.is_single_choice = res.data.is_single_choice;
        this.choiced_classList = res.data.choiced_classList;
        //判断默认选中数组是否有值
        if (res.data.choiced_classList.length > 0) {
          res.data.choiced_classList.forEach(item => {
            res.data.not_choiced_classList.unshift(item);
          });
          this.not_choiced_classList = res.data.not_choiced_classList.map(
            (item, index) => {
              return {
                index: index + 1,
                age: item,
                address: '',
                _disabled: false,
                _checked: false,
              };
            }
          );
          console.log(
            res,
            res.data.choiced_classList,
            this.not_choiced_classList
          );
          this.not_choiced_classList.forEach((item, index) => {
            res.data.choiced_classList.forEach((item1, index1) => {
              if (item.age === item1) {
                this.not_choiced_classList[index]._checked = true;
              } else if (this.is_single_choice) {
                this.not_choiced_classList[index]._disabled = true;
              }
            });
          });
          console.log(this.choiced_classList, this.not_choiced_classList);
        } else {
          this.not_choiced_classList = res.data.not_choiced_classList.map(
            (item, index) => {
              return {
                index: index + 1,
                age: item,
                address: '',
                _checked: false,
                _disabled: false,
              };
            }
          );
        }

        console.log(
          res,
          this.StandardKnowledge ? '标准-832分类' : '事故性质分类'
        );
        setTimeout(() => this.$Spin.hide(), 500);
      });
    },
    //刷新结果
    NextSteps() {
      this.Initialize();
    },
    //下一条数据
    PreviousStep() {
      if (this.current_count === this.total_count) {
        this.$Message.info('已经是最后一条');
        return;
      }
      this.num += 1;
      this.Initialize();
    },
    //保存结果
    //测试ID "test_subjob_id_3333" 'biaozhun-subtest-00006'
    preservation() {
      let thats = this.StandardKnowledge
        ? '/baike/yuchuli/biaozhun/save_832_class'
        : '/baike/yuchuli/shigu/save_accident_xingzhi';
      console.log(this.choiced_classList, '选择');
      this.$axios(
        thats,
        'post',
        this.$qs.stringify({
          subjob_id: this.toExamineid,
          record_id: this.record_id,
          choiced_classList: `"[${this.choiced_classList}]"`,
        })
      ).then(res => {
        if (this.total_count === 1) {
          this.$router.push('/TableList/KnowledgeAudit');
          return;
        }
        this.num = 0;
        this.Initialize();
        console.log(res, this.StandardKnowledge ? '832保存成功' : '保存成功');
      });
    },
    //返回
    returnkey() {
      this.$router.push('/TableList/KnowledgeAudit');
    },
    //勾选当前列表
    seleChoice(item) {
      console.log(item, '123');
      if (this.is_single_choice) {
        if (item.length > 0) {
          this.not_choiced_classList.forEach((item1, index) => {
            item.forEach(item2 => {
              if (item1.index === item2.index) {
                this.not_choiced_classList[index]._disabled = false;
                this.not_choiced_classList[index]._checked = true;
              } else {
                this.not_choiced_classList[index]._disabled = true;
                this.not_choiced_classList[index]._checked = false;
              }
            });
          });
          this.choiced_classList = [];
          this.choiced_classList = item.map(items => {
            return items.age;
          });
          return;
        }
        this.not_choiced_classList.forEach((item, index) => {
          this.not_choiced_classList[index]._disabled = false;
          this.not_choiced_classList[index]._checked = false;
        });
        this.choiced_classList = [];
        return;
      }
      this.choiced_classList = [];
      this.choiced_classList = item.map(items => {
        return items.age;
      });
      console.log(item, this.not_choiced_classList, this.choiced_classList);
    },
  },
  mounted() {
    console.log(this.Selected, '是什么');
    this.Selected === '标准知识加工'
      ? (this.StandardKnowledge = true)
      : (this.StandardKnowledge = false);
    this.Initialize();
    // this.model1 = this.cityList[0].label;
  },
  computed: {
    TaskName() {
      return this.$store.state.standard.TaskName;
    },
    //知识审核传的ID
    toExamineid() {
      return this.$store.state.standard.toExamineid;
    },
    //判断是通过事故还是标准知识进来
    Selected() {
      return this.$store.state.standard.Selected;
    },
  },
};
</script>
<style lang="less" scoped>
/deep/textarea.ivu-input {
  max-width: 100%;
  min-height: 100px;
  max-height: 100px;
  vertical-align: bottom;
  font-size: 14px;
  background: #f5f5f5;
  border-radius: 0;
  color: #666 !important;
  line-height: 2;
}
.Stame /deep/ textarea.ivu-input {
  min-height: 40px;
  max-height: 40px;
  color: #666;
}
/deep/.textarea {
  width: 90%;
  height: 100px;
  vertical-align: bottom;
  font-size: 14px;
  background: #f5f5f5;
  border-radius: 0;
  cursor: not-allowed;
  border: 1px solid #dcdee2;
  padding: 10px;
  overflow-y: scroll;
}
.StandardName {
  display: inline-block;
  width: 12%;
  text-align: right;
  margin-right: 10px;
}
/deep/.textName {
  width: 90%;
  height: 40px;
  vertical-align: bottom;
  font-size: 14px;
  background: #f5f5f5;
  border-radius: 0;
  cursor: not-allowed;
  border: 1px solid #dcdee2;
  padding: 10px;
  overflow-y: scroll;
  word-wrap: break-word;
}
</style>
