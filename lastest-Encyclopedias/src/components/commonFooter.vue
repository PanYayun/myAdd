<template>
  <div>
    <Footer
      style="padding-bottom: 0; width: 100%"
      v-if="$route.path != '/qualityIndex'"
    >
      <div class="footerBox">
        <div class="footer">
          <!-- <div class="footer_title">
            <div>
              <img
                src="~@/img/Phone.png"
                alt=""
                style="margin-right: 10px"
              />联系我们
            </div>
          </div> -->
          <!-- <div class="footer_one">
            <div>地址：北京市朝阳区京顺路7号</div>
            <div>传真：010-84142105</div>
            <div>邮编：100028</div>
            <div>
              单位网址:
              <a
                target="_blank"
                style="color: #ffffff"
                href="http://www.cape.cn/"
                >http://www.cape.cn/</a
              >
            </div>
          </div> -->
          <div class="footer_one_sup">
            <div v-for="(item, index) in footerArr" :key="index">
              <div class="headerTitle">
                {{ item.title }}
              </div>
              <div class="headerCont">
                <div v-for="(item2, index) in item.arr" :key="index">
                 
                  <router-link v-if="item2.url != ''" :to="item2.url"> {{ item2.text }}</router-link>
                <a v-else :href="item2.sup"> {{ item2.text }}</a>
                </div>
              </div>
            </div>
          </div>
          <div class="footer_two">
            <div>
              <img src="~@/img/index_a.png" alt="" style="margin-right: 10px" />
              常用链接
            </div>
            <div>
              <div>
                <a href="https://www.avic.com/">中国航空工业集团有限公司</a>
              </div>
              <!-- <div>市场监督管理总局</div> -->
            </div>
            <div>
              <div>
                <a href="https://www.cape.avic.com/">航空工业综合技术研究所</a>
              </div>
              <!-- <div>国家信息中心-大数据发展部</div> -->
            </div>
            <div>
              <div><a href="http://www.chinazbj.com/">国检检测</a></div>
              <!-- <div>大数据创新平台研究中心</div> -->
            </div>
            <div>
              <div><a href="https://bbs.biaozhuns.com/">标准网</a></div>
              <!-- <div></div> -->
            </div>
            <div>
              <div><a href="http://www.sic.gov.cn/">国家信息中心</a></div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer_bottom">
        <span
          >Copyright © 2018-2021 中国航空综合技术研究所大数据部 版权所有</span
        >
      </div>
    </Footer>
    <intelligent-chat :isShowChat2="isShowChat" ref="chat"></intelligent-chat>
  </div>
</template>

<script>
import IntelligentChat from "@/components/IntelligentChat.vue";
import { footerData } from "@/libs/footerData.js";
export default {
  components: {
    IntelligentChat,
  },
  data() {
    return {
      footerArr: footerData,
      isShowChat: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 判断是否弹出对话框
    handShow() {
      this.isShowChat = !this.isShowChat;
      this.$refs.chat.scrollToBottom(); // 对话框 内容滑到底部
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
/* footer */
.footerBox {
  min-width: 1200px;
  background: #2e3033;
  color: #ffffff;
  overflow: hidden;
}

.footer {
  width: 1200px;
  margin: 0 auto;
  padding-top: 40px;
  box-sizing: border-box;
}

.footer_title {
  float: left;
  overflow: hidden;
  font-size: 20px;
  font-weight: 600;
}

.footer_one {
  overflow: hidden;
  clear: both;
  font-size: 14px;
  margin-top: 30px;
  margin-bottom: 50px;
  float: left;
  margin-left: 25px;
}

.footer_two {
  overflow: hidden;
  clear: both;
  height: 76px;
  border-top: 1px solid #666666;
  padding-top: 18px;
  box-sizing: border-box;
  a {
    color: #c5c5c5;
  }
}

.footer_one > div {
  float: left;
  overflow: hidden;
  margin-right: 140px;
}

.footer_one > div:last-child {
  margin: 0;
}

.footer_two > div {
  float: left;
  overflow: hidden;
  line-height: 22px;
  font-size: 12px;
  color: #c5c5c5;
  margin-right: 90px;
}

.footer_two > div > div {
  clear: both;
}

.footer_two > div:nth-child(1) {
  margin-right: 40px;
}

.footer_two > div:last-child {
  margin-right: 0px;
}

.footer_bottom {
  height: 40px;
  min-width: 1200px;
  background: #25272a;
  font-size: 12px;
  color: #999999;
  text-align: center;
  line-height: 40px;
}

.ivu-layout-footer {
  padding: 0 !important;
}
.footer_one_sup {
  overflow: hidden;
  padding-bottom: 40px;
  display: flex;
  & > div {
    width: 15%;
    & > .headerTitle {
      font-size: 17px;
      color: #ffffff;
      line-height: 17px;
      margin-bottom: 20px;
      font-weight: 600;
    }
    & > .headerCont {
      font-size: 14px;
      line-height: 14px;
      color: #999999;
      overflow: hidden;
      & > div {
        margin-bottom: 16px;
        cursor: pointer;
      }
      a{
         color: #999999;
      }
      // & > div:hover {
      //   color: #3388ff;
      // }
    }
  }
  & > div:nth-last-child(1) {
    flex: 1;
  }
}
</style>
