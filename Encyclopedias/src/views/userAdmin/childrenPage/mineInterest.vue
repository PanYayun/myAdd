<template>
  <div>
    <div class="title_nav">我的兴趣</div>
    <div class="interestLabel" style="margin-bottom: 20px">
      <!-- 我关注的标签 -->
      <div class="attentionLabel">
        <div class="title">已关注</div>
        <div class="dataWrap" style="position: relative;">
          <Spin size="large" fix v-if="spinShow_1"></Spin>
          <!-- <div class="noData" v-if="false">尚未添加兴趣标签</div> -->
          <div class="labelList" v-if="true">
            <ul>
              <li
                class="flex"
                :key="index"
                v-for="(firstData, index) in interestsOut"
              >
                <div class="labelGroupName">{{ firstData.className }}：</div>
                <div
                  class="labelGroupList flex"
                  v-if="firstData.recommended.length"
                >
                  <div
                    v-for="(thirdData, index) in firstData.recommended"
                    class="item flex vertical_center"
                    style="  border: 1px solid #3388ff !important;color: #3388ff;"
                    :key="index"
                    @mouseover="mouseoverSpan(index, $event)"
                    @mouseleave="mouseleaveSpan(index, $event)"
                  >
                    <span class="name" style="color: #3388ff;">{{
                      thirdData
                    }}</span>
                    <span
                      class="delete"
                      style="color: #3388ff;"
                      @click="handleThirdClick(thirdData, firstData.className)"
                      >×</span
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--  感兴趣的标签 -->
      <div class="beFondLabel">
        <div class="title">您可能感兴趣</div>
        <div class="labelList">
          <ul class="labelListFun">
            <li
              class="flex"
              :key="index"
              v-for="(firstData, index) in interests2"
            >
              <div class="labelGroupName">{{ firstData.className }}：</div>
              <div class="labelGroupList flex">
                <div
                  v-for="(thirdData, index) in firstData.recommended"
                  class="item flex vertical_center"
                  :class="{
                    blueSpan: checkThirdFocus(thirdData, firstData.className),
                  }"
                  :key="index"
                  @mouseover="mouseoverSpan(index, $event)"
                  @mouseleave="mouseleaveSpan(index, $event)"
                  @click="handleThirdClick(thirdData, firstData.className)"
                >
                  <span class="name">{{ thirdData }}</span>
                  <span class="delete">×</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 选择标签 -->
      <div class="selectLabel">
        <div class="title">选择标签</div>
        <!-- 第一层 -->
        <div class="dataWrap">
          <div class="oneLevel">
            <ul class="flex">
              <li
                v-for="(firstData, index) in interests"
                :key="index"
                @click="firstClick(index, $event)"
              >
                {{ firstData.name }}
              </li>
            </ul>
          </div>
          <!-- 第二层 -->
          <div class="twoLevel">
            <ul
              class="flex"
              v-for="(firstData, index) in interests"
              v-show="index === firstNum"
              :key="index"
            >
              <li
                v-for="(secondData, index) in firstData.childInfo"
                :key="index"
                @click="secondDataClick(index, $event)"
              >
                {{ secondData.name }}
              </li>
            </ul>
          </div>
          <!-- 第三层 -->
          <div class="treeLevel">
            <div
              v-for="(firstData, index) in interests"
              v-show="index === firstNum"
              :key="index"
            >
              <div
                v-for="(secondData, index) in firstData.childInfo"
                v-show="index === secondNum"
                style="padding: 20px; flex-wrap: wrap"
                class="flex"
                :key="index"
              >
                <div
                  v-for="(thirdData, index) in secondData.childInfo"
                  :key="index"
                  :class="[
                    'item',
                    {
                      'is-focus': checkThirdFocus(
                        thirdData.name,
                        firstData.name
                      ),
                    },
                  ]"
                  @click="handleThirdClick(thirdData.name, firstData.name)"
                >
                  <span> {{ thirdData.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button v-if="isRegister != undefined" type="primary" @click="editBtn"
        >确认修改</Button
      >
      <Button v-else type="primary" @click="editBtn">确认修改</Button>
      <Button
        v-if="isRegister != undefined"
        style="margin-left:20px"
        type="primary"
        @click="passBtn"
        >跳过</Button
      >
    </div>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";

export default {
  name: "mineInterest",
  data() {
    return {
      spinShow_1: true,
      spanShow: true,
      firstNum: "0", //    第一层点击下标
      secondNum: "0", //    第二层点击下标
      thirdArrKey: [], // 第三层的key
      interestsOut: {}, // 第三层的大对象
      isRegister: "", //是否从注册页面进来的
      thirdObject: {
        className: "",
        recommended: [],
      }, // 第三层的key
      interests: [],
      interests2: [],
    };
  },
  mounted() {
    this.obtainDataFun();
    this.obtainDataFun_recommend();
    this.isRegister = this.$route.query.isRegister;
  },
  methods: {
    passBtn() {
      this.$router.push({
        path: "/",
      });
    },
    // 确定修改
    editBtn() {
      this.$axios("/users/update_user_interests", "post", {
        username: this.$store.state.user.userInfo.username,
        interests: this.interestsOut,
      }).then((res) => {
        console.log(this.interestsOut);
        if (this.isRegister) {
          this.$router.push({
            path: "/",
          });
        } else {
          this.$Message.success("修改成功");
        }
        // console.log(res.taglist)
      });
    },
    // 获取所有的兴趣
    obtainDataFun() {
      this.$axios(
        "/users/get_user_interests",
        "post",
        this.$qs.stringify({
          username: this.$store.state.user.userInfo.username,
        })
      ).then((res) => {
        this.interests = res.data.data.interests;
        this.interestsOut = res.data.data.taglist;
        setTimeout(() => {
          this.spinShow_1 = false;
        }, 200);
      });
    },
    // 获取推荐兴趣
    obtainDataFun_recommend() {
      this.$axios(
        "/users/get_user_recommended_interests",
        "post",
        this.$qs.stringify({
          username: this.$store.state.user.userInfo.username,
        })
      ).then((res) => {
        this.interests2 = res.data.data.interests;
      });
    },
    //   小按钮的移入移出
    mouseoverSpan: function(val, e) {
      for (let i = 0; i < e.currentTarget.parentElement.children.length; i++) {
        const element = e.currentTarget.parentElement.children[i];
        if (i == val) {
          element.classList.add("blueSpan");
        }
      }
    },
    mouseleaveSpan: function(val, e) {
      for (let i = 0; i < e.currentTarget.parentElement.children.length; i++) {
        const element = e.currentTarget.parentElement.children[i];
        if (i == val) {
          element.classList.remove("blueSpan");
        }
      }
    },
    //    第一层点击事件
    firstClick(val, e) {
      this.firstNum = val;
      for (let i = 0; i < e.currentTarget.parentElement.children.length; i++) {
        const element = e.currentTarget.parentElement.children[i];
        if (i == val) {
          element.classList.add("blueClick");
        } else {
          element.classList.remove("blueClick");
        }
      }
    },
    // 第二层点击事件
    secondDataClick(val, e) {
      this.secondNum = val;
      for (let i = 0; i < e.currentTarget.parentElement.children.length; i++) {
        const element = e.currentTarget.parentElement.children[i];
        if (i == val) {
          element.classList.add("blueClick");
        } else {
          element.classList.remove("blueClick");
        }
      }
    },
    handleThirdClick(thirdName, firstName) {
      // 当不存在当前点击三级标签对应的一级标签对象数据时添加一份
      if (!(firstName in this.interestsOut)) {
        this.$set(this.interestsOut, firstName, cloneDeep(this.thirdObject));
      }
      // 设置当前点击的三级标签的className
      this.interestsOut[firstName].className = firstName;
      // 当前点击的三级标签不存在时,添加到对应的recommended数组中
      if (!this.interestsOut[firstName].recommended.includes(thirdName)) {
        this.interestsOut[firstName].recommended.push(thirdName);
      } else {
        // 当再次点击改三级标签时视为取消选中,在对应的recommended中去除
        const index = this.interestsOut[firstName].recommended.indexOf(
          thirdName
        );
        this.$delete(this.interestsOut[firstName].recommended, index);
      }
      // 当前点击的三级标签所对应的一级数据中recommended为0时,视为当前一级标签没有所选中的数据,删除该属性
      if (!this.interestsOut[firstName].recommended.length) {
        delete this.interestsOut[firstName];
      }
    },
    checkThirdFocus(thirdName, firstName) {
      // 检查当前三级标签是否为已添加
      if (!(firstName in this.interestsOut)) {
        return false;
      }
      return this.interestsOut[firstName].recommended.includes(thirdName);
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // vm.$router.replace(from.path)
      console.log(
        to,
        "--------------",
        from,
        "---------------",
        next,
        "---------"
      );
    });
  },
};
</script>

<style scoped lang="less">
.labelGroupList_second {
  display: flex;
}
.attentionLabel {
  .title {
    font-size: 15px;
    color: #333333;
    font-weight: bold;
    margin-top: 20px;
  }
}
.labelList {
  margin-top: 20px;
  li {
    min-height: 34px;
    .labelGroupName {
      width: 124px;
      text-align: right;
    }
  }
}
.labelListFun .delete {
  display: none;
}
.blueSpan {
  border: 1px solid #3388ff !important;
  color: #3388ff;
  & > span {
    color: #3388ff;
  }
}
.blueClick {
  color: #3388ff !important;
}
.labelGroupList {
  flex: 1;
  flex-wrap: wrap;
  .item {
    padding: 0px 7px;
    height: 22px;
    border: 1px solid #e6e6e6;
    border-radius: 3px;
    cursor: pointer;
    color: #333333;
    margin-bottom: 12px;
    margin-right: 12px;
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;

    .name {
      font-size: 14px;
    }

    .delete {
      font-size: 22px;
      line-height: 18px;
      margin-left: 5px;
    }
  }

  .item:last-of-type {
    margin-right: 0px;
  }
}

.beFondLabel {
  .title {
    font-size: 15px;
    color: #333333;
    font-weight: bold;
  }

  .dataWrap {
    width: 100%;
    min-height: 20px;
    padding: 15px 0px;
    flex-wrap: wrap;

    .item {
      border: 1px solid #e6e6e6;
      padding: 4px 12px;
      border-radius: 15px;
      font-size: 14px;
      cursor: pointer;
      margin-bottom: 12px;
      margin-right: 12px;
      -moz-user-select: none; /*火狐*/
      -webkit-user-select: none; /*webkit浏览器*/
      -ms-user-select: none; /*IE10*/
      -khtml-user-select: none; /*早期浏览器*/
      user-select: none;
    }

    .item:last-of-type {
      margin-right: 0px;
    }
  }
}
.selectLabel {
  .title {
    font-size: 15px;
    color: #333333;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .dataWrap {
    .oneLevel {
      ul {
        border-bottom: 1px solid #efefef;
        li {
          padding-bottom: 14px;
          font-size: 14px;
          color: #333333;
          font-weight: bold;
          margin-right: 20px;
          cursor: pointer;
        }
        & > li:hover {
          color: #3388ff;
        }
        li:last-of-type {
          margin-right: 0px;
        }
      }
    }
    .twoLevel {
      margin-top: 15px;
      display: flex;
      ul {
        flex-wrap: wrap;
        li {
          margin-bottom: 12px;
          color: #333333;
          font-size: 14px;
          margin-right: 40px;
          cursor: pointer;
        }
        li:hover {
          color: #3388ff;
        }
      }
    }
    .treeLevel {
      background: #f3f3f3;
      margin-top: 20px;
      margin-bottom: 20px;
      border-radius: 6px;
      border: 1px solid #efefef;
      position: relative;
      > div {
        flex-wrap: wrap;
        padding-bottom: 0px !important;
        .item {
          padding: 0px 13px;
          font-size: 12px;
          height: 26px;
          line-height: 26px;
          background: white;
          color: #999999;
          border: 1px solid #c6c6c6;
          border-radius: 4px;
          margin-right: 14px;
          margin-bottom: 14px;
          cursor: pointer;

          &.is-focus {
            color: #3388ff;
            border: 1px solid #3388ff !important;
          }
        }
      }
    }
    .treeLevel:before {
      position: absolute;
      content: "";
      width: 20px;
      height: 20px;
      left: 50%;
      top: -10px;
      background: #f3f3f3;
      transform: translateX(-50%);
      transform: rotate(45deg);
      border: 1px solid #efefef;
      border-bottom: none;
      border-right: none;
    }
  }
}
</style>
