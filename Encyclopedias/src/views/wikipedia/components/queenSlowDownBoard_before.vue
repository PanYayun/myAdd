<template>
  <div class="flex">
    <div class="left_module">
      <div
        class="main_info unique_wrap"
        v-if="subDetailData.middleContent != null"
      >
        <div class="lemmaWgt_lemmaTitle flex vertical_center">
          <span>{{ subDetailData.topContent.Text_title }}</span>
          <ul class="handle_lemma flex">
            <li>
              <i class="iconfont icon-erji"></i>
              <span>语音</span>
            </li>
            <li>
              <i class="iconfont icon-bianji"></i>
              <span>编辑</span>
            </li>
            <li>
              <i class="iconfont icon-xinxi"></i>
              <span>讨论</span>
            </li>
            <li>
              <i class="iconfont icon-zengjia-cuxiantiao"></i>
              <span>上传视频</span>
            </li>
          </ul>
          <div @click="isTrue">
            <collection :coliectionData="coliectionData"></collection>
          </div>
        </div>
        <div class="text" style="text-indent: 0px;">
          {{ subDetailData.topContent.Text_Content }}
        </div>
        <!-- <div class="btm_wrap">
          <Button type="primary" style="margin-right: 15px;">质量报告</Button>
          <Button>查看图谱</Button>
        </div> -->
      </div>
      <div
        class="0000--box"
        style="margin-top: 16px;"
        v-for="(item, index) in subDetailData.middleContent"
        :key="index"
      >
        <div
          class="11111--box"
          v-for="(item2, index2) in item.middleBox"
          :key="index + index2"
        >
          <div class="ifififi" v-if="item2.Text_Type == 'Text&Picture'">
            <div class="unique_wrap fun_diagram">
              <div class="unique_title_text flex">
                <span>{{ item2.Text_title }}</span>
                <div class="show_type vertical_center flex">
                  <span @click="clickzhankai(item2)">{{
                    item2.isOpen ? "收起" : "展开"
                  }}</span>
                  <i
                    class="iconfont icon-shouqi"
                    :class="{ 'down-rotate': item2.isOpen }"
                  ></i>
                </div>
              </div>
              <collapse>
                <!-- :class="[
                    item2.isOpen == true
                      ? 'div-height-open'
                      : 'div-height-close',
                  ]" -->
                <div style="overflow: hidden;" v-show="item2.isOpen">
                  <div class="text">
                    <div class="img_wrap" style="margin-left: 20px;">
                      <img
                        src="http://n.sinaimg.cn/sinakd2021626s/581/w850h531/20210626/3a11-krwipar6835151.jpg"
                      />
                    </div>
                    {{ item2.Text_Content }}
                  </div>
                  <!-- <div class="text" style="margin-bottom: 0px;">
                    减速板通常对称地布置在机身或机翼上，同时为了不破坏飞机的飞行姿态，阻力作用点的位置必须进行验算和实验。因此，当选择减速板在飞机上的具体安装位置时，需要同时考虑飞机的外形结构、重心位置、重量分布、整体结构强度、飞行姿态等多种因素，而不同飞机上减速板的安装位置也变的五花八门。
                  </div> -->
                </div>
              </collapse>
            </div>
          </div>
          <div class="ifififi" v-if="item2.Text_Type == 'table'">
            <div class="unique_wrap padding_0">
              <div class="unique_title_text flex" style="margin-bottom: 17px;">
                <span>{{ item2.Text_title }}</span>
                <div class="show_type vertical_center flex">
                  <span @click="clickzhankai(item2)">{{
                    item2.isOpen ? "收起" : "展开"
                  }}</span>
                  <i
                    class="iconfont icon-shouqi"
                    :class="{ 'down-rotate': item2.isOpen }"
                  ></i>
                </div>
              </div>
              <collapse>
                <div
                  class="table scope_table"
                  style="overflow: hidden;"
                  v-show="item2.isOpen"
                >
                  <table>
                    <tr
                      v-for="(table_item, index3) in item2.Text_Content"
                      :key="index + index2 + index3"
                    >
                      <td>
                        {{ getMapKeyAndValueWithString(table_item, "k") }}
                      </td>
                      <td>
                        {{ getMapKeyAndValueWithString(table_item, "v") }}
                      </td>
                    </tr>
                  </table>
                </div>
              </collapse>
            </div>
          </div>
          <div class="ifififi" v-if="item2.Text_Type == 'text'">
            <div class="unique_wrap padding_0">
              <div class="unique_title_text flex" style="margin-bottom: 17px;">
                <span>{{ item2.Text_title }}</span>
                <div class="show_type vertical_center flex">
                  <span @click="clickzhankai(item2)">{{
                    item2.isOpen ? "收起" : "展开"
                  }}</span>
                  <i
                    class="iconfont icon-shouqi"
                    :class="{ 'down-rotate': item2.isOpen }"
                  ></i>
                </div>
              </div>
              <collapse>
                <div style="overflow: hidden;" v-show="item2.isOpen">
                  <div class="text">{{ item2.Text_Content }}</div>
                  <!-- <div class="text" style="margin-bottom: 0px;">
                    减速板通常对称地布置在机身或机翼上，同时为了不破坏飞机的飞行姿态，阻力作用点的位置必须进行验算和实验。因此，当选择减速板在飞机上的具体安装位置时，需要同时考虑飞机的外形结构、重心位置、重量分布、整体结构强度、飞行姿态等多种因素，而不同飞机上减速板的安装位置也变的五花八门。
                  </div> -->
                </div>
              </collapse>
            </div>
          </div>

          <div class="ifififi" v-if="item2.Text_Type == 'MapInList'">
            <div class="unique_wrap margin_tp">
              <div class="solid_title">
                {{ item2.Text_title }}
              </div>
              <div class="table">
                <table>
                  <thead>
                    <tr style="font-size: 13px;">
                      <th>序号</th>
                      <th>用户</th>
                      <th>飞机型号</th>
                      <th>飞机出厂编号</th>
                      <th>飞机总体单位</th>
                      <th>发生时间</th>
                      <th>故障现象描述</th>
                      <th>现象分类</th>
                      <th>是否有归零</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(table_item, index3) in faultList"
                      :key="index + index2 + index3"
                    >
                      <td>{{ index3 + 1 }}</td>
                      <td>{{ table_item.equipmentUser }}</td>
                      <td>{{ table_item.planeType }}</td>
                      <td>{{ table_item.planeProduceId }}</td>
                      <td>{{ table_item.planeProduceCompany }}</td>
                      <td>{{ table_item.DateOfOccurrence }}</td>
                      <td>{{ table_item.faultPhenomenonDesc }}</td>
                      <td>
                        {{ table_item.PhenomenonClassificationSecondary }}
                      </td>
                      <td>you</td>
                      <td @click="lookfaultZeroingAnalysisDetail(table_item)">
                        <span class="operation-buttons">查看</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <Row v-if="spin_search_Page_box">
              <Col span="24">
                <div
                  style="
            margin-bottom: 10px;
            padding-top: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
          "
                >
                  <div>
                    <span style="margin-right: 10px"
                      >共{{ totalCount }}条记录</span
                    >
                  </div>
                  <div>
                    <Page
                      :total="totalCount"
                      :current="table_current_1"
                      :page-size="5"
                      :page-size-opts="[5, 10, 20, 30]"
                      @on-change="table_Pagechange_1"
                      @on-page-size-change="table_PageSizechange_1"
                      show-sizer
                      show-elevator
                    ></Page>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <!-- <div class="unique_wrap margin_tp">
        <div class="solid_title flex">
          <span style="flex: 1;">故障归零情况分析</span>
          <ul class="handle_lemma flex">
            <li>
              <i class="iconfont icon-erji"></i>
              <span>语音</span>
            </li>
            <li>
              <i class="iconfont icon-bianji"></i>
              <span>编辑</span>
            </li>
            <li>
              <i class="iconfont icon-xinxi"></i>
              <span>讨论</span>
            </li>
            <li>
              <i class="iconfont icon-zengjia-cuxiantiao"></i>
              <span>上传视频</span>
            </li>
          </ul>
        </div>
        <div>
          <Radio-group
            v-model="button2"
            type="button"
            class="flex vertical_center"
          >
            <Radio label="故障描述"></Radio>
            <Radio :label="'机理分析\n失效分析'"></Radio>
            <Radio label="深圳"></Radio>
            <Radio label="杭州"></Radio>
          </Radio-group>
          <ul class="malfunctionAnalyseList">
            <li v-for="item in 5" :key="item">
              <img
                src="http://n.sinaimg.cn/sinakd2021626s/581/w850h531/20210626/3a11-krwipar6835151.jpg"
              />
              <div class="info flex">
                <div class="name">环境、载荷分析</div>
                <div class="describe text_hidden_3">
                  对于随机载荷，统计分析方法主要有两类：计数法和功率谱法。由于产生疲劳损伤的主要原因是循环次数和应力幅值，因此在编谱时首先必须遵循某一等效损伤原则，将随机的应力—时间历程简化为一系列不同幅值的全循环和半循环，这一简化的过程叫做计数法。功率谱法是借助富氏变换，将连续变化的.
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div> -->
    </div>
    <div class="right_module">
      <div class="info_picture_wrap">
        <img
          src="http://n.sinaimg.cn/sinakd2021626s/581/w850h531/20210626/3a11-krwipar6835151.jpg"
        />
        <p>图片(10)张</p>
      </div>
      <!-- 相似产品词条 -->
      <div class="termExplain margin_tp" v-if="search_term.data.length > 0">
        <ul class="list_nav_ul flex">
          <li class="active">{{ search_term.header }}</li>
        </ul>
        <div class="list">
          <div
            class="item flex"
            v-for="(item, index) in search_term.data"
            :key="index"
          >
            <Tooltip
              max-width="350"
              :content="item.title + '\n' + '释义来源：' + item.source"
            >
              <div class="item flex">
                <span style="flex:1" class="name">{{ item.title }}</span>
                <span class="paraphrase">释义来源：{{ item.source }}</span>
              </div>
            </Tooltip>
            <!-- <div class="info_details" v-show="false">
              对于歼击机、强击机，应根据空机重量、乘员、滑油、氧气重量、按战术技术要求携带的基本武器重量以及按战术技术要求确定的机内燃油重量之和确定；
              对于其他类飞机，应根据带基本任务有效负载和
            </div> -->
          </div>
        </div>
      </div>
      <!-- 标准中的知识-->
      <div class="standardKnowledge" v-if="search_standard.data.length > 0">
        <ul class="list_nav_ul flex">
          <li class="active">{{ search_standard.header }}</li>
        </ul>
        <div class="list">
          <div
            class="item flex"
            v-for="(item, index) in search_standard.data"
            :key="index"
          >
            <img :src="require('@/img/lianjie.png')" />
            <Tooltip max-width="350" :content="item.title">
              <span class="name">{{ item.title }}</span>
            </Tooltip>
            <!-- <div class="info_details" v-show="false">
              对于歼击机、强击机，应根据空机重量、乘员、滑油、氧气重量、按战术技术要求携带的基本武器重量以及按战术技术要求确定的机内燃油重量之和确定；
              对于其他类飞机，应根据带基本任务有效负载和
            </div> -->
          </div>
        </div>
      </div>
      <!--  其他推荐 -->
      <div class="restsRecommend" v-if="search_other.data.length > 0">
        <ul class="list_nav_ul flex">
          <li class="active">{{ search_other.header }}</li>
        </ul>
        <div class="list">
          <div
            class="item"
            v-for="(item, index) in search_other.data"
            :key="index"
          >
            <Tooltip max-width="350" :content="item.title">
              <div class="title text_hidden_1">
                {{ item.title }}
              </div>
            </Tooltip>
            <div class="info flex">
              <img :src="$store.state.app.img_url + item.image" />
              <div class="flex text_info">
                <Tooltip max-width="350" :content="item.description">
                  <span class="name text_hidden_2">{{ item.description }}</span>
                </Tooltip>
                <span style="flex: 1;"></span>
                <span class="reason">推荐理由:{{ item.data_type }}</span>
              </div>
            </div>
            <!-- <div class="info_details" v-show="false">
              对于歼击机、强击机，应根据空机重量、乘员、滑油、氧气重量、按战术技术要求携带的基本武器重量以及按战术技术要求确定的机内燃油重量之和确定；
              对于其他类飞机，应根据带基本任务有效负载和
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <failure-record-model
      :failureRecord="table_current_item"
      ref="failureRecord"
    ></failure-record-model>
  </div>
</template>

<script>
import collapse from "@/libs/collapse";
import failureRecordModel from "./failureRecordModel";
import collection from "@/components/collection.vue";

export default {
  name: "queenSlowDownBoard",
  props: ["detailData"],
  components: {
    collapse,
    failureRecordModel,
    collection,
  },
  data() {
    return {
      coliectionType: "质量知识百科", //["术语知识百科","标准指标", "标准知识百科", "质量知识百科", "元器件知识百科", "民航事故百科" ]
      coliectionData: {
        username: "",
        content: { type: "", name: "", param: { query: "" } },
      },
      button2: "北京",
      subDetailData: { middleContent: null },
      search_term: { data: [] },
      search_standard: { data: [] },
      //   search_newword: {},
      search_other: { data: [] },
      search_keyword: "飞机结构",
      faultList: [],
      spin_search_Page_box: true,
      table_current_1: 1,
      totalCount: 1,
      // 当前页
      pageNum: "1",
      // 分页粒度
      pageSize: "5",
      table_current_item: {},
    };
  },
  mounted() {
    this.loadAllData();
    this.isTrue();
  },
  computed: {
    WikipediaDetails() {
      return this.$store.state.page.WikipediaDetails;
    },
  },
  methods: {
    // 点击收藏
    isTrue() {
      console.log(this.search_keyword);
      this.coliectionData.username = this.$store.state.user.userInfo.username;
      this.coliectionData.content.type = this.coliectionType;
      this.coliectionData.content.name = this.search_keyword;
      this.coliectionData.content.param = {
        query: this.$route.query.id,
      };
    },
    clickzhankai(item2) {
      item2.isOpen = !item2.isOpen;
    },
    getMapKeyAndValueWithString(content, type) {
      if (content == undefined || content == "") {
        return "";
      }
      if (content.indexOf("@") != -1) {
        let arr = content.split("@");
        if (arr.length > 1) {
          if (type == "k") {
            return arr[0];
          }
          if (type == "v") {
            return arr[1];
          }
        }
      }
      return "";
    },
    loadAllData() {
      //搜索结果页-相关术语
      this.loadSearch_term();
      //搜索结果页-标准中的知识
      this.loadSearch_standard();
      //搜索结果页-其他领域知识推荐
      this.loadSearch_other();
    },
    //搜索结果页-相关术语
    loadSearch_term() {
      this.$axios(
        "/baike/sousuo/search_term",
        "post",
        this.$qs.stringify({
          query: this.search_keyword,
          uid: this.$store.state.user.userInfo.username,
        })
      ).then((res) => {
        this.search_term = res.data;
      });
    },
    //搜索结果页-标准中的知识
    loadSearch_standard() {
      this.$axios(
        "/baike/sousuo/search_standard",
        "post",
        this.$qs.stringify({
          query: this.search_keyword,
          uid: this.$store.state.user.userInfo.username,
        })
      ).then((res) => {
        this.search_standard = res.data;
      });
    },
    //搜索结果页-其他领域知识推荐
    loadSearch_other() {
      this.$axios(
        "/baike/sousuo/search_other",
        "post",
        this.$qs.stringify({
          query: this.search_keyword,
          uid: this.$store.state.user.userInfo.username,
        })
      ).then((res) => {
        this.search_other = res.data;
      });
    },
    // 切换页码
    table_Pagechange_1(index) {
      this.pageNum = index;
      this.requestGuzhangDetailData();
    },
    // 切换每页显示数量
    table_PageSizechange_1(index) {
      this.pageSize = index;
      this.requestGuzhangDetailData();
    },
    //故障详情
    requestGuzhangDetailData() {
      this.$axios("/baike/appServer/requestGetData", "get", {
        uToken: this.$store.state.user.token,
        uid: this.$store.state.user.userInfo.username,
        requestSource: "ZL",
        requestCode: "92612",
        requestFuncId: "102",
        requestTime: Date.parse(new Date()) / 1000,
        requetParams: {
          Fault_Id: "10100001",
          Page_Size: "1",
          Page_NUM: "5",
          Only_Records: true,
        },
      }).then((res) => {
        this.faultList = res.data.data.Text_Content;
        this.totalCount = res.data.totalNum;
        if (this.totalCount > 0) {
          this.spin_search_Page_box = true;
        }
      });
    },
    //处理故障数据  分页
    guzhangProcessingData() {
      this.detailData.middleContent.forEach((middleContent) => {
        middleContent.middleBox.forEach((middleBox, index) => {
          if (middleBox.Text_Type == "MapInList") {
            this.faultList = middleBox.Text_Content;
          }
        });
      });
    },
    lookfaultZeroingAnalysisDetail(table_item) {
      this.table_current_item = table_item;
      // console.log("table_item",table_item)
      this.$refs.failureRecord.subShowTree();
    },
  },
  watch: {
    WikipediaDetails: {
      handler(newVal, oldVal) {
        this.subDetailData = JSON.parse(JSON.stringify(this.WikipediaDetails));
        this.guzhangProcessingData();
      },
      // 加上之后第一次定义时就会执行
      // immediate: true,
      // 深度监听即当要监听对象或数组的时候需要添加deep:true属性
      deep: true,
    },
  },
};
</script>

<style scoped lang="less">
.margin_tp {
  margin-top: 15px;
}

.padding_0 {
  padding-top: 0px;
}

.scope_table table tr:nth-child(odd) {
  background: #f5f5f5;
}

.scope_table table td {
  padding: 6px;
}

.scope_table table td:first-of-type {
  font-weight: bold;
}

.fun_diagram {
  margin-top: 16px;

  .text {
    word-wrap: break-word;
  }

  .img_wrap {
    width: 220px;
    float: right;

    img {
      display: block;
      width: 100%;
    }
  }
}

/deep/ .ivu-radio-group-button .ivu-radio-wrapper {
  border-radius: 0px;
  white-space: pre-line;
  height: 40px;
  line-height: 1;
  display: flex;
  align-items: center;
}

/deep/ .ivu-radio-group-button .ivu-radio-wrapper-checked {
  background: #2d8cf0;
  color: white;
}
.malfunctionAnalyseList {
  margin-top: 10px;
}
.malfunctionAnalyseList li {
  display: flex;
  padding: 20px 0px;
  border-bottom: 1px solid #eeeeee;
  img {
    width: auto;
    height: 100px;
  }
  .info {
    flex-direction: column;
    flex: 1;
    margin-left: 15px;
  }
  .name {
    font-size: 15px;
    font-weight: bold;
    flex: 1;
  }
  .describe {
    font-size: 14px;
    color: #666666;
  }
  &:last-of-type {
    padding-bottom: 0px;
    border-bottom: none;
  }
}
.div-height-open {
  height: auto;
}
.div-height-close {
  height: 0px;
}
.termExplain {
  .list {
    .item {
      padding-top: 5px;
      padding-bottom: 5px;
      padding-left: 5px;
      .name {
        display: inline-block;
        white-space: nowrap;
        width: 110px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
.operation-buttons {
  cursor: pointer;
}
.operation-buttons:hover {
  color: #3388ff;
}
.down-rotate {
  transform: rotate(180deg);
}
</style>
