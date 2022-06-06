<template>
    <div class="contentDetail">
        <div class="back">
            <div class="title">{{ BZZWMC }}</div>
            <div class="mulu" ref="menuScroll">
                <div>目录</div>
                <ul v-for="(item, index) in mulu" :key="index" @click="touchMulu(index)" :class="{ active: curMulu == index }">
                    <li style="cursor: pointer">{{ item.BZZJBH }}{{ item.BTMC }}</li>
                </ul>
            </div>
            <div class="content">
                <Spin fix v-if="spin_ContentDetail_content"></Spin>
                <div class="contentContent" v-html="BZZW" @click="clickText($event)"></div>
            </div>
            <div class="pageButton">
                <Button class="next-button" type="primary" @click="nextPage" :class="curMulu == mulu.length - 1 ? 'disabled' : ''">下一节</Button>
                <Button class="up-button" style="background-color: white" @click="upPage" :class="curMulu == 0 ? 'disabled' : ''">上一节</Button>
            </div>
        </div>
        <div class="rightBack">
            <div class="rightTitle">
                条款区
                <div class="bottomline"></div>
            </div>
            <div class="tree">
                <Tree :data="zhibiao" :render="renderContent" @on-select-change="Tree_click"></Tree>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'ContentDetail',
  data() {
    return {
      mulu: [],
      curMulu: 0,
      BZZW: '',
      default_filte_data: '',
      spin_ContentDetail_content: true,
      zhibiao: [],
    };
  },
  mounted() {
    this.spin_ContentDetail_content = true;
    this.createMulu().then(() => {
      this.loadBZZW();
      this.loadRightZB();
    });
  },
  computed: {
    all_data_key() {
      return this.$route.query.id;
    },
    BZZWMC() {
      return this.$route.query.BZZWMC;
    },
  },
  methods: {
    createMulu() {
      return new Promise((resolve, reject) => {
        this.$axios(
          '/baike/biaozhun/get_bzml',
          'post',
          this.$qs.stringify({
            BZBH: this.all_data_key, //当前分类ID
          })
        ).then(res => {
          if (res.data.data.length == 0) {
            setTimeout(() => {
              this.spin_ContentDetail_content = false;
              this.$Message.warning({
                duration: 5,
                background: true,
                content: '暂无数据！',
              });
            }, 200);
            return;
          }
          this.default_filte_data = res.data.data.filter((item, index) => {
            item.index = index;
            return item.SFYZW == '1';
          });
          // 保存当前目录选中项的
          this.default_filte_data = this.default_filte_data[0];
          // 此时目录已经赋值
          this.mulu = res.data.data;
          // 根据路由传值，初始化默认选中的目录和默认选中的目录对应的正文

          // 保存当前目录选中项的索引
          this.curMulu = this.default_filte_data.index;
          //可以执行下一步
          resolve();
        });
      });
    },
    touchMulu(index) {
      this.spin_ContentDetail_content = true;
      this.curMulu = index;
      this.default_filte_data = this.mulu[index];
      if (this.mulu[index].SFYZW == 0) {
        // 如果本目录没有正文
        this.BZZW = '暂无数据';
        this.$Message.warning({
          content: '当前目录没有正文！',
          background: true,
          duration: 3,
        });
        setTimeout(() => {
          this.spin_ContentDetail_content = false;
        }, 200);
        return;
      }
      this.loadBZZW();
      this.loadRightZB();
    },
    loadBZZW() {
      this.$axios(
        '/baike/biaozhun/get_bzzw',
        'post',
        this.$qs.stringify({
          BTID: this.default_filte_data.BTID, //当前分类ID
        })
      ).then(res => {
        this.BZZW = res.data.data.WBNR.replace(
          /src=\"/g,
          `src="` + this.$store.state.app.img_url
        );
        const str1 = this.BZZW.replace(/<(\s*[^>]*)?>/g, '<$1>');
        this.BZZW = str1.replace(
          /<BK>(.*?)<\/BK>/g,
          '<a style="font-size:12pt;color: #136ec2">$1</a>'
        );
        // this.idex = val.default.ml.indexOf(key);
        setTimeout(() => {
          this.spin_ContentDetail_content = false;
        }, 200);
      });
    },
    nextPage() {
      if (this.curMulu < this.mulu.length - 1) {
        this.curMulu += 1;
        this.touchMulu(this.curMulu);
      } else {
        // this.curMulu = 0;
        // this.touchMulu(this.curMulu);
      }
    },
    upPage() {
      if (this.curMulu > 0) {
        this.curMulu -= 1;
        this.touchMulu(this.curMulu);
      } else {
        // this.curMulu = this.mulu.length - 1;
        // this.touchMulu(this.curMulu);
      }
    },
    for_expand(val) {
      val.map(item => {
        item.expand = true;
        if (item.hasOwnProperty('children')) {
          this.for_expand(item.children);
        }
      });
    },
    loadRightZB() {
      this.$axios(
        '/baike/biaozhun/get_zbmc',
        'post',
        this.$qs.stringify({
          BTID: this.default_filte_data.BTID, //当前分类ID
        })
      ).then(res => {
        this.for_expand(res.data.data);
        this.zhibiao = res.data.data;
      });
    },
    renderContent(h, { root, node, data }) {
      if (data.title.length > 15) {
        return h('div', [
          h(
            'Tooltip',
            {
              props: {
                // 设置属性--但是placement不定义，则为自动
                placement: 'top',
              },
            },
            [
              h(
                'span',
                {
                  style: {
                    display: 'inline-block',
                    width: '180px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  },
                },
                data.title
              ), // 表格显示文字
              h(
                'div',
                {
                  slot: 'content',
                  style: {
                    whiteSpace: 'normal',
                  },
                },
                data.title // 气泡内的文字
              ),
            ]
          ),
        ]);
      } else {
        return h('div', [
          h(
            'span',
            {
              style: {
                display: 'inline-block',
                width: '180px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              },
            },
            data.title
          ),
        ]);
      }
    },
    Tree_click(params, item) {
      this.$router.push({
        path: '/BasicQuotaDetail',
        query: { id: item.id },
      });
    },
    clickText(e) {
      if (e.target.text != undefined) {
        this.$router.push({
          path: '/TermDetail',
          query: {
            id: e.target.text,
          },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.active {
  color: #3388ff;
}
// .disabled{
//     background-color: darkgray;
//     color: rgb(121, 121, 121);
// }
.ivu-tree /deep/ .ivu-tree-arrow {
  display: none;
}
.contentDetail {
  overflow: hidden;
  width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
  .rightBack {
    background-color: white;
    width: 259px;
    height: 558px;
    float: right;
    .rightTitle {
      line-height: 50px;
      font-size: 18px;
      margin: 0px 17px;
      border-bottom: 1px solid #eee;

      .bottomline {
        width: 100px;
        height: 1px;
        margin-bottom: 0px;
        background-color: #3388ff;
      }
    }
    .tree {
      width: 100%;
      height: 660px;
      margin: 0px;
      background: #ffffff;
      margin-top: 20px;
      padding-left: 17px;
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }
  .back {
    background-color: white;
    width: 940px;
    height: 732px;
    float: left;
    position: relative;
    .title {
      font-size: 24px;
      color: #3f424b;
      white-space: nowrap;
      overflow: hidden;
      line-height: 60px;
      align-content: center;
      margin: 0px 30px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      border-bottom: 1px solid #eee;
    }
    .mulu {
      margin: 30px 0px 0px 0px;
      padding: 0px 0px 0px 30px;
      width: 220px;
      height: 528px;
      overflow: scroll;
      color: #3f424b;
      box-sizing: border-box;
      border-right: 1px solid #eee;
      float: left;
      & > div {
        font-size: 16px;
        margin-bottom: 14px;
      }
      & > ul {
        line-height: 26px;
        font-size: 14px;
      }
      & > ul:hover {
        color: #136ec2;
      }
    }
    .content {
      position: relative;
      width: 720px;
      height: 558px;
      float: left;
      padding: 0 30px;
      margin-top: 30px;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      color: #3f424b;
      overflow: hidden;
      .contentTitle {
        font-size: 16px;
        line-height: 16px;
      }
      .contentContent {
        height: 440px;
        line-height: 28px;
        font-size: 14px;
        overflow-y: scroll;
        overflow-x: hidden;
      }
    }
    button {
      width: 98px;
      height: 36px;
      border: 1px solid #eee;
      border-radius: 2px;
    }
    .pageButton {
      position: absolute;
      bottom: 128px;
      left: 462px;
      .up-button {
        margin-left: 14px;
      }
      // .up-button:hover {
      //     color: white;
      //     background-color: #136ec2;
      // }
      // .next-button:hover {
      //     color: white;
      //     background-color: #136ec2;
      // }
    }
  }
}
</style>