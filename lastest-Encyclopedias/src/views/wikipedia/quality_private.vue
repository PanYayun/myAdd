<template>
  <div class="main_container">
    <div class="flex">
      <div class="left_module">
        <!-- <tab :tabIndex="tabIndex" :tabList="tabList" @tabClick="tabClick"></tab> -->
        <div class="hint flex vertical_center horizontal_center" v-if="false">
          <img src="@/img/lightbulb.png" />
          <span style="margin-top: 2px">{{ newWord }}</span>
        </div>
        <div v-if="qualityData == null"></div>
        <div class="tree_data" v-else>
          <div
            class="tree_item"
            v-for="(item2, index2) in qualityData.Plane_Type_Fault_List"
            :key="index2"
          >
            <div class="title">{{ item2.Fault_Name }}</div>
            <div class="2222-ji">
              <div class="two_level">
                <div
                  v-for="(item3, index3) in item2.Lower_Fault_List"
                  :key="index2 + index3"
                >
                  <div
                    class="three-level-button"
                    :class="[
                      item2.level_two_index == index3
                        ? 'three-level-button-select'
                        : '',
                    ]"
                    style="cursor: pointer"
                    v-if="checkfloorIsShow(item3)"
                    @click="changeItme2List(item2, item3, index3)"
                  >
                    <div>{{ item3.Fault_Name }}</div>
                  </div>
                </div>
              </div>
              <div
                class="three_level_item 3333-ji"
                v-for="(item4, index4) in item2.level_two_obj"
                :key="'three' + index2 + index4"
              >
                <label v-if="checkfloorIsShow(item4)"
                  ><Icon
                    :type="
                      item4.isOpen ? 'md-arrow-dropdown' : 'md-arrow-dropup'
                    "
                    @click="clickIsOpen(item4)"
                  /><span @click="clickTitleIsOpen(item4)">{{
                    item4.Fault_Name
                  }}</span></label
                >
                <!-- <quality-six-level></quality-six-level> -->
                <collapse>
                  <div class="threeChildren 4444-ji" v-show="item4.isOpen">
                    <quality-six-level
                      :forLevelItem="item4"
                      :group_index="index2 + '' + index4"
                    ></quality-six-level>
                  </div>
                </collapse>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right_module">
        <div class="info_picture_wrap">
          <Carousel v-model="carouselValue" loop>
            <CarouselItem
              v-for="(item, index) in rotate_Pictures_urls"
              :key="index"
            >
              <div>
                <img style="width:300px;height:187px" :src="item" />
              </div>
            </CarouselItem>
          </Carousel>
          <p>图片({{ rotate_Pictures_urls.length }})张</p>
        </div>
        <!-- 相似产品词条 -->
        <div class="termExplain margin_tp" v-if="search_term.data.length > 0">
          <ul class="list_nav_ul flex">
            <li class="active">{{ search_term.header }}</li>
          </ul>
          <div class="list">
            <div>
              <div
                class="item flex"
                v-for="(item, index) in search_term.data"
                :key="index"
              >
                <span style="flex: 1" class="name">{{ item.title }}</span>
                <span class="paraphrase">{{ item.description }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="termExplain margin_tp" v-if="search_term2.data.length > 0">
          <ul class="list_nav_ul flex">
            <li class="active">{{ search_term2.header }}</li>
          </ul>
          <div class="list">
            <div>
              <div
                class="item flex"
                v-for="(item, index) in search_term2.data"
                :key="index"
              >
                <span style="flex: 1" class="name">{{ item.title }}</span>
                <span class="paraphrase">{{ item.description }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="termExplain margin_tp" v-if="search_term3.data.length > 0">
          <ul class="list_nav_ul flex">
            <li class="active">{{ search_term3.header }}</li>
          </ul>
          <div class="list">
            <div>
              <div
                class="item flex"
                v-for="(item, index) in search_term3.data"
                :key="index"
              >
                <span style="flex: 1" class="name">{{ item.title }}</span>
                <span class="paraphrase">{{ item.description }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 标准中的知识-->
        <!-- <div class="standardKnowledge">
          <ul class="list_nav_ul flex">
            <li class="active">标准中的知识</li>
          </ul>
          <div class="list">
            <div class="item flex">
              <img :src="require('@/img/lianjie.png')" />
              <span class="name"
                >GB/T 4217-1984
                热塑性塑料管材的公称外径和公称压力(公制系列)</span
              >
              <div class="info_details" v-show="false">
                对于歼击机、强击机，应根据空机重量、乘员、滑油、氧气重量、按战术技术要求携带的基本武器重量以及按战术技术要求确定的机内燃油重量之和确定；
                对于其他类飞机，应根据带基本任务有效负载和
              </div>
            </div>
            <div class="item flex">
              <img :src="require('@/img/lianjie.png')" />
              <span class="name"
                >GB/T 4217-1984
                热塑性塑料管材的公称外径和公称压力(公制系列)</span
              >
            </div>
            <div class="item flex">
              <img :src="require('@/img/lianjie.png')" />
              <span class="name"
                >GB/T 4217-1984
                热塑性塑料管材的公称外径和公称压力(公制系列)</span
              >
            </div>
          </div>
        </div> -->
        <!--  其他推荐 -->
        <!-- <div class="restsRecommend">
          <ul class="list_nav_ul flex">
            <li class="active">其他领域知识推荐</li>
          </ul>
          <div class="list">
            <div class="item">
              <div class="title text_hidden_1">
                2017年6月3日西南航B737飞行途中引擎B737飞行途中引擎
              </div>
              <div class="info flex">
                <img
                  src="https://img0.baidu.com/it/u=3024308660,1355431406&fm=26&fmt=auto&gp=0.jpg"
                />
                <div class="flex text_info">
                  <span class="name text_hidden_2"
                    >GB 4412-1984
                    机械化水泥立窑热工测量方法啊大大阿萨德按时大大多阿打算</span
                  >
                  <span style="flex: 1;"></span>
                  <span class="reason">推荐理由:相似元器件</span>
                </div>
              </div>
              <div class="info_details" v-show="false">
                对于歼击机、强击机，应根据空机重量、乘员、滑油、氧气重量、按战术技术要求携带的基本武器重量以及按战术技术要求确定的机内燃油重量之和确定；
                对于其他类飞机，应根据带基本任务有效负载和
              </div>
            </div>
            <div class="item">
              <div class="title text_hidden_1">
                2017年6月3日西南航B737飞行途中引擎B737飞行途中引擎
              </div>
              <div class="info flex">
                <img
                  src="https://img0.baidu.com/it/u=3024308660,1355431406&fm=26&fmt=auto&gp=0.jpg"
                />
                <div class="flex text_info">
                  <span class="name text_hidden_2"
                    >GB 4412-1984
                    机械化水泥立窑热工测量方法啊大大阿萨德按时大大多阿打算</span
                  >
                  <span style="flex: 1;"></span>
                  <span class="reason">推荐理由:相似元器件</span>
                </div>
              </div>
              <div class="info_details" v-show="false">
                对于歼击机、强击机，应根据空机重量、乘员、滑油、氧气重量、按战术技术要求携带的基本武器重量以及按战术技术要求确定的机内燃油重量之和确定；
                对于其他类飞机，应根据带基本任务有效负载和
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
// import tab from "@/components/tab";
import collapse from "@/libs/collapse";
import qualitySixLevel from "./components/qualitySixLevel";
export default {
  name: "qualityWikipedia",
  components: {
    // tab,
    collapse,
    qualitySixLevel,
  },
  data() {
    return {
      // tabList: [], //一级显示
      // Plane_Types: [], //一级分类数组
      // Plane_Type: "", //选中类型 做上传用
      // tabIndex: 0,
      newWord: "aaaaaaa", //新词发现
      qualityData: null, //质量数据
      carouselValue: 0,
      rotate_Pictures_urls: [],

      //推荐数据
      search_term: {
        header: "热门型号排行",
        data: [],
      },
      search_term2: {
        header: "热门故障排行",
        data: [],
      },
      search_term3: {
        header: "热门故障排行",
        data: [],
      },
    };
  },
  methods: {
    // tabClick(index) {
    //   this.$store.commit("setspinShow_", false);
    //   this.tabIndex = index;
    //   this.Plane_Type = this.Plane_Types[index].plane_type;

    //   this.requestHomeData();
    // },
    setRecommentData(Plane_Type) {
      this.search_term = {
        header: "热门型号排行",
        data: [
          { title: "XX10", description: "浏览次数" },
          { title: "XX20", description: "浏览次数" },
          { title: "XX10", description: "浏览次数" },
          { title: "XX30", description: "浏览次数" },
          { title: "XX40", description: "浏览次数" },
          { title: "XX50", description: "浏览次数" },
          { title: "XX60", description: "浏览次数" },
        ],
      };
      this.search_term2 = {
        header: "热门故障排行",
        data: [
          { title: "空中停车", description: "浏览次数" },
          { title: "跑冒滴漏", description: "浏览次数" },
          { title: "软件升级", description: "浏览次数" },
          { title: "通信异常", description: "浏览次数" },
          { title: "机体裂纹", description: "浏览次数" },
          { title: "密封问题", description: "浏览次数" },
          { title: "XX50", description: "浏览次数" },
        ],
      };
    },
    threeFold() {},
    requestHomeData() {
      // this.qualityData = detailData().data;
      // this.ProcessingData();
      // console.log("qualityData",this.qualityData)
      // return;

      var requestParam = {
        uToken: this.$store.state.user.userInfo.token,
        requestSource: "ZL",
        requestCode: "92612",
        requestFuncId: "103",
        requestParams: {
          orgCode: "X014",
        },
        requestTime: Date.parse(new Date()) / 1000,
      };
      // console.log(requestParam);
      // return;
      // this.$Spin.show();
      this.$store.commit("setspinShow_", true);
      this.$axios("/baike/appServer/requestGetData", "get", requestParam).then(
        (res) => {
          this.qualityData = res.data.data;
          this.ProcessingData();
          this.$store.commit("setspinShow_", false);
        }
      );
    },
    ProcessingData() {
      // this.tabList = [];
      // this.Plane_Types = this.qualityData.Plane_Types;
      // this.Plane_Types.forEach((item) => {
      //   this.tabList.push({ text: item.plane_name });
      // });
      if (this.qualityData.Rotate_Pictures_urls.length > 0) {
        this.rotate_Pictures_urls = this.qualityData.Rotate_Pictures_urls;
      } else {
        this.rotate_Pictures_urls = [
          "http://n.sinaimg.cn/sinakd2021626s/581/w850h531/20210626/3a11-krwipar6835151.jpg",
        ];
      }
      this.setRecommentData(this.qualityData.Plane_Type);
      this.qualityData.Plane_Type_Fault_List.forEach((item1) => {
        if (item1.Lower_Fault_List.length > 0) {
          item1.level_two_obj = item1.Lower_Fault_List[0].Lower_Fault_List;
          item1.level_two_index = 0;
          item1.Lower_Fault_List.forEach((item2, index2) => {
            item2.Lower_Fault_List.forEach((item3, index3) => {
              if (index3 == 0) {
                item3.isOpen = true;
              } else {
                item3.isOpen = false;
              }
            });
          });
        }
      });
    },
    changeItme2List(item2, item3, index) {
      item2.level_two_obj = item3.Lower_Fault_List;
      item2.level_two_index = index;
      this.$forceUpdate();
    },
    clickIsOpen(item4) {
      item4.isOpen = !item4.isOpen;
      this.$forceUpdate();
    },
    clickTitleIsOpen(item4) {
      console.log("clickIsOpen", item4);
      //Click：点击Spread：展开   Display：本层不展示
      if (item4.deed && item4.deed != undefined) {
        if (item4.deed.toLowerCase() == "click") {
          this.$router.push({
            name: "qualityWikipediaDetails",
            query: { id: item4.Fault_Id },
          });
          this.$store.commit("updated_WikipediaDetailsCagetory", item4);
          return;
        } else if (item4.deed.toLowerCase() == "spread") {
          this.clickIsOpen(item4);
          return;
        }
      }
      this.clickIsOpen(item4);
    },
    checkfloorIsShow(item) {
      if (item.deed == undefined || item.deed == "") {
        return true;
      }
      if (item.deed.toLowerCase() == "display") {
        return false;
      }
      return true;
    },
  },
  mounted() {
    this.requestHomeData();
    this.setRecommentData(0);
  },
};
</script>

<style scoped lang="less">
@import "../../styles/unified.css";
.hint {
  border: 1px solid #3388ff;
  height: 46px;
  background: #f4f9ff;
  img {
    width: 17px;
  }
}
.vertical_center {
  align-items: center;
}
.horizontal_center {
  justify-content: center;
}
.left_module {
  flex: 1;
  margin-right: 20px;
}

.right_module {
  width: 340px;
}

.tree_data {
  // margin-top: 20px;

  .tree_item {
    padding: 20px;
    background: white;
    margin-bottom: 20px;

    .title {
      font-size: 17px;
      font-weight: bold;
      position: relative;
      text-indent: 10px;
    }

    .title:before {
      position: absolute;
      width: 3px;
      height: 20px;
      background-color: #3388ff;
      content: "";
      left: 0px;
      top: 2px;
    }

    .two_level {
      display: flex;
      .three-level-button {
        margin-top: 20px;
        padding: 8px 30px 8px 30px;
        border: 1px solid #eee;
        text-align: center;
        color: #60636f;
        font-size: 16px;
        cursor: pointer;
      }
      .three-level-button-select {
        background: #2d8cf0;
        color: white;
      }
    }

    .three_level_item {
      margin-top: 15px;

      > label {
        font-size: 16px;
        font-weight: bold;
      }

      label {
        cursor: pointer;
      }
    }

    .four_level {
      font-size: 14px;
      margin-top: 13px;
      margin-left: 25px;
      .four_level_label {
        font-weight: bold;
      }
    }

    .five_level {
      flex-wrap: wrap;
      margin-top: 10px;

      label {
        margin-left: 10px;
        line-height: 26px;
        color: #60636f;
      }
    }
  }
}
.margin_tp {
  margin-top: 15px;
}
</style>
