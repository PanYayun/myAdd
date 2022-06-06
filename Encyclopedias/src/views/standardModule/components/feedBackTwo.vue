<template>
    <Modal v-model="visible" title="标准需求说明" width="550">
        <Form :model="form" :label-width="120">
            <FormItem label="标准需求名称：">
                <Input v-model="form.name" placeholder="请输入标准需求名称"></Input>
            </FormItem>
            <FormItem label="体系类别：">
                <Input v-model="form.name" placeholder="请输入体系类别"></Input>
            </FormItem>
            <FormItem label="标准分类：">
                <selectTree v-model="form.systemVal1" :treeData="systemTree" :showQuery="false"></selectTree>
            </FormItem>
            <FormItem label="用途或场景：">
                <Input v-model="form.value6" type="textarea" placeholder="请输入用途或场景" />
            </FormItem>
            <FormItem label="存在问题：">
                <Input v-model="form.value7" type="textarea" placeholder="请输入存在的问题" />
            </FormItem>
            <FormItem label="标准内容：">
                <Input v-model="form.value8" type="textarea" placeholder="请输入标准内容" />
            </FormItem>
            <FormItem label="参考文件：">
                <Input v-model="form.value9" type="textarea" placeholder="请输入参考文件" />
            </FormItem>
        </Form>
    </Modal>
</template>

<script>
import selectTree from '@/components/selectTree';

export default {
  name: 'feedBack',
  components: {
    selectTree,
  },
  props: {
    appear: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
      form: {
        systemVal: '',
        systemVal1: '',
      },
      systemTree: [
        {
          title: '早餐',
          children: [
            {
              title: '北方',
              children: [
                {
                  title: '豆浆',
                  children: [{ title: '豆浆+咸豆腐脑' }],
                },
                {
                  title: '油条',
                  children: [{ title: '油条+胡辣汤' }],
                },
              ],
            },
            {
              title: '南方',
              children: [
                {
                  title: '豆浆',
                  children: [{ title: '豆浆+甜豆腐脑' }],
                },
                { title: '肠粉' },
                { title: '虾饺' },
              ],
            },
          ],
        },
        {
          title: '午餐',
          children: [
            {
              title: '北方',
              children: [{ title: '面条' }, { title: '饺子' }],
            },
            {
              title: '南方',
              children: [{ title: '米饭' }, { title: '馄饨' }],
            },
          ],
        },
      ],
      systemShow: false,
      standardShow: false,
    };
  },
  mounted() {},
  methods: {
    showModule() {
      this.visible = true;
    },
    selectSystem() {
      this.systemShow = true;
      this.standardShow = false;
    },
    selectStandard() {
      this.systemShow = false;
      this.standardShow = true;
    },
  },
};
</script>

<style scoped lang="less">
.treeWrap {
  position: absolute;
  width: calc(100% - 150px);
  height: 200px;
  background-color: #ffffff;
  left: 2px;
  top: 37px;
  overflow: auto;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  z-index: 99;
  border-radius: 5px;
}

.transition-drop-appear,
.transition-drop-enter-active {
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

.transition-drop-leave-active {
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

.transition-drop-appear,
.transition-drop-enter-active {
  -webkit-animation-name: ivuTransitionDropIn;
  animation-name: ivuTransitionDropIn;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.transition-drop-leave-active {
  -webkit-animation-name: ivuTransitionDropOut;
  animation-name: ivuTransitionDropOut;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.transition-drop-appear,
.transition-drop-enter-active {
  opacity: 0;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}

.transition-drop-leave-active {
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}
</style>