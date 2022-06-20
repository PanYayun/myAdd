<template>
  <div style="background: #ffffff; box-shadow: 0px 7px 10px -8px #e5e5e5 inset">
    <div class="atlasCont">
      <div class="atlasCont_l">
        <div class="atlasCont_img_cont">
          <atlas-components
            @nodeClick="nodeClick"
            @showBtn="showBtnBack"
            @typeVal="typeVal"
            @typeInfo="typeInfo"
            :clickIdVal="clickIdVal"
            @rightList="rightList"
          ></atlas-components>
        </div>
        <div></div>
      </div>
      <div class="atlasCont_r">
        <div class="atlasCont_r_div">
          <div class="atlasCont_r_title">节点信息</div>
          <div class="atlasCont_r_cont">
            <div>
              <div class="atlasCont_r_cont_l">ID：</div>
              <div class="atlasCont_r_cont_r">{{ nodeId }}</div>
            </div>
            <div>
              <div class="atlasCont_r_cont_l">名称：</div>
              <div class="atlasCont_r_cont_r">{{ nodeText }}</div>
            </div>
            <div>
              <div class="atlasCont_r_cont_l">类型：</div>
              <div class="atlasCont_r_cont_r">{{ nodeType }}</div>
            </div>
          </div>
          <div class="atlasCont_r_btn" @click="handClickBtn" v-if="showBtn">
            查看详情
          </div>
        </div>
        <div class="atlasCont_r_div" v-if="showNodeList === true">
          <div class="atlasCont_r_title">节点列表</div>
          <div class="atlasCont_r_cont">
            <div class="atlasCont_r_cont_search">
              <input
                class="cont_search_input"
                placeholder="关键字检索"
                type="text"
                v-model="nodeSearchKey"
                @keyup.enter.prevent="searchEnterFun($event)"
              />
              <div class="cont_search_btn" @click="doSearchNode()">搜索</div>
            </div>
            <div class="atlasCont_r_search_result">
              <div
                v-for="(item, index) in atlasCont_r_search_result_list_show"
                :key="index"
                @click="clickNode(item)"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
        <div class="atlasCont_r_div" v-if="showNodeList === false">
          <div class="atlasCont_r_title">答案列表</div>
          <div class="atlasCont_r_search_result">
            <ul class="testul">
              <li
                v-for="(item, index) in answer_result_list"
                :key="index"
                @click="clickAnswer(item)"
              >
                <div class="answer_title">{{ item.answer }}</div>
                <div class="answer_title2">{{ item.source }}</div>
               
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import atlasComponents from "@/components/atlasComponents.vue";
export default {
  name: "atlasImg",
  components: { atlasComponents },
  data() {
    return {
      clickIdVal: "",
      nodeText: "",
      nodeId: "",
      nodeType: "",
      rightListNew: "",
      showBtn: false,   // 查看详情页
      activeText: "全部",
      typeValText_atlas: "", //需要传输的值
      typeValType_atlas: "", //需要传输的类型
      atlasType: "", // 图谱的类型
      atlasSearch: "", // 图谱搜索字段
      atlasQuestion: "", // 图谱问题字段
      atlasClick: "", // 图谱点击事件
      atlasAnswer: "", // 图谱问题点击事件
      // newatlas: [],

      atlasCont_r_search_result_list: [],//原始数组
      atlasCont_r_search_result_listNew: [],//中间的数组
      atlasCont_r_search_result_list_show: [],//显示的数组
      answer_result_list: [],
      nodeSearchKey: "",
      showNodeList: true,
    };
  },
  methods: {
    nodeClick(res) {
      this.nodeText = res.text;
      this.nodeId = res.id;
      this.nodeType = res.type;
    },
    // 点击事件
    handClickBtn() {
      if (this.typeValType_atlas === 'biaozhun') {
        this.$router.push({ path: "/BasicDetail", query: { id: this.typeValText_atlas } });
      } else if (this.typeValType_atlas === 'shuyu') {
        this.$router.push({ path: "/TermDetail", query: { id: this.typeValText_atlas } });
      } else if (this.typeValType_atlas === 'shigu') {
        this.$router.push({ path: '/CivilAviationDetail', query: { id: this.typeValText_atlas } })
      } else if (this.typeValType_atlas === 'zhibiao') {
        this.$router.push({ path: "/BasicQuotaDetail", query: { id: this.typeValText_atlas } });
      }
    },
    // 获取的事件数据
    typeInfo(res) {
      this.typeValText_atlas = res
    },
    // 获取右侧的列表
    rightList(res) {
      const arr1 = res;
      const arr2 = this.atlasCont_r_search_result_list;
      const arr = arr2.concat(arr1);
      const arrNew = new Set(arr);
      this.atlasCont_r_search_result_list = Array.from(arrNew)
      this.atlasCont_r_search_result_list_show = this.atlasCont_r_search_result_list
    },
    // 获取的事件类型
    typeVal(res) {
      this.typeValType_atlas = res
    },
    showBtnBack(res) {
      this.showBtn = res
    },
    getAtlas(type, search, question, click, answer) {
      const parms = {
        type: type, // 图谱的类型
        search: search, // 图谱搜索字段
        question: question, // 图谱问题字段
        click: click, // 图谱点击事件
        click_answer: answer // 图谱问题点击事件
      };
      this.$axios(
        "/baike/newindex/tupu/interface",
        "post",
        this.$qs.stringify(parms)
      ).then(res => {
        setTimeout(() => {
          this.$store.commit("setspinShow_", false);
        }, 200);
        this.answer_result_list = res.data.data.answer;
        this.atlasCont_r_search_result_list = res.data.data.nodelist;
        this.atlasCont_r_search_result_list_show = this.atlasCont_r_search_result_list

        this.$store.commit("updated_atlasImg", res.data.data.graph);
        
        if (question.length > 0) {
          this.showNodeList = false
        }
        if (search.length > 0) {
          this.showNodeList = true
        }
        if (click.length > 0) {
          this.showNodeList = true
        }
      });
    },
    showAlas() {
      this.$axios("/baike/newindex/tupu", "post").then(res => {
        setTimeout(() => {
          this.$store.commit("setspinShow_", false);
        }, 200);
         console.log(res.data.data.typelist,'--------------------------')
        var arr1 = res.data.data.typelist;
        arr1.unshift("全部");
        // list = res.data.data.typelist
        // this.listUl = arr1;
        this.$store.commit("updated_atlasTypeList", arr1);
        // res.data.data.graph.nodes.splice(5, res.data.data.graph.nodes.length - 1);
        this.atlasCont_r_search_result_list = res.data.data.nodelist;
        this.atlasCont_r_search_result_list_show = this.atlasCont_r_search_result_list
        // splice
        this.$store.commit("updated_atlasImg", res.data.data.graph);
      });
    },
    loadData() {
      if (this.SearchImg.type === "3") {
        //搜索
        this.getAtlas("search", this.SearchImg.data, "", "", "");
      } else if (this.SearchImg.type === "4") {
        //提问
        this.getAtlas("question", "", this.SearchImg.data, "", "");
      } else {
        this.showAlas();
      }
    },
    //选中节点
    clickNode(item) {
      this.clickIdVal = item
    },
    clickAnswer(item) {
      this.getAtlas("click_answer", "", this.SearchImg.data, "", item.source);
    },
    /**检查一个字符串是否包含在另一个字符串里,并且首字符相同
     * i:计算机科学与技术
     * j:计科
     * 返回true
     * */
    checkStrContain(i, j) {
      if (!i || !j) {
        return false;
      }
      // 精准搜索
      // return i.indexOf(j) 
      if (i.indexOf(j) != -1) {
        return true
      } else return false
      // 模糊搜索
      // i = i.substr(1,i.length-1);
      // j = j.substr(1,j.length-1);
      // var a;
      // var b;
      // if (i.length > j.length) {
      //     a = i;
      //     b = j;
      // } else {
      //     a = j;
      //     b = i;
      // }
      // var count = 0;
      // for (var bi = 0; bi < b.length; bi++) {
      //     var bArr = b.split("");
      //     if (a.indexOf(bArr[bi]) != -1) {
      //         count++;
      //     } else {
      //         break;
      //     }
      // }
      // if (b.length == count) {
      //     return true;
      // } else {
      //     return false;
      // }
    },

    /**
     * 根据字符串模糊搜索返回符合条件的数据
     * name   搜索字符串
     */
    getArrayByName() {
      if (this.nodeSearchKey && this.nodeSearchKey.length > 0) {
        var result = [];
        for (var key in this.atlasCont_r_search_result_list) {
          if (this.checkStrContain(this.atlasCont_r_search_result_list[key], this.nodeSearchKey)) {
            result.push(this.atlasCont_r_search_result_list[key])
          }
        }
        this.atlasCont_r_search_result_list_show = result
      } else {
        this.atlasCont_r_search_result_list_show = this.atlasCont_r_search_result_list
      }

    },
    doSearchNode() {
      this.getArrayByName()
      // console.log(this.nodeSearchKey, 'nodeSearchKey');
    },
    //点击回车，进行搜索
    searchEnterFun(e) {
      var keyCode = window.event ? e.keyCode : e.which;
      if (keyCode == 13) {
        this.doSearchNode()
      }
    },
  },
  mounted() { },
  watch: {
    SearchImg: {
      handler(newVal, oldVal) {
        // console.log("run", newVal.type);
        // 打开全局遮罩
        this.$store.commit("setspinShow_", true);
        this.loadData();
      },
      // 加上之后第一次定义时就会执行
      immediate: true
    },
    // nodeId() {
    //   // this.getAtlas("click", "", "", this.nodeId, "")
    // }
  },
  computed: {
    SearchImg() {
      if (this.$route.query.val == undefined) {
        return { type: undefined };
      } else {
        return JSON.parse(this.$route.query.val);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.atlasCont {
  width: 1400px;
  margin: 0 auto;
  overflow: hidden;
  box-sizing: border-box;
  padding-top: 20px;
  .atlasCont_l {
    width: 1120px;
    height: 100%;
    background: #ffffff;
    float: left;
    box-sizing: border-box;

    .atlasCont_img_cont {
      width: 100%;
      box-sizing: border-box;
    }
  }
  .atlasCont_r {
    width: 240px;
    height: 100%;
    float: left;
    padding-left: 20px;
    .atlasCont_r_div {
      width: 100%;
      background: #ffffff;
      padding: 0 16px;
      padding-bottom: 12px;
      box-sizing: border-box;
      overflow: hidden;
      border: 1px solid #e5e5e5;
      margin-bottom: 20px;
      .atlasCont_r_title {
        height: 50px;
        font-size: 18px;
        line-height: 50px;
        border-bottom: 1px solid #eeeeee;
      }
      .atlasCont_r_cont {
        overflow: hidden;
        padding-top: 22px;
        box-sizing: border-box;
        > div {
          margin-bottom: 10px;
          clear: both;
          overflow: hidden;
          > div {
            float: left;
          }
        }
        .atlasCont_r_cont_l {
          width: 46px;
          text-align: right;
        }
        .atlasCont_r_cont_r {
          width: 128px;
        }
        > div:last-child {
          border-bottom: 20px !important;
        }
        .atlasCont_r_cont_search {
          width: 100%;
          overflow: hidden;
          .cont_search_input {
            float: left;
            width: 118px;
            height: 30px;
            border: 1px solid #e2e2e2;
            font-size: 12px;
            border-radius: 3px;
            box-sizing: border-box;
            text-indent: 6px;
          }
          .cont_search_btn {
            float: left;
            font-size: 12px;
            color: #ffffff;
            width: 60px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            border-radius: 3px;
            margin-left: 8px;
            background: #217efc;
          }
        }
        .atlasCont_r_search_result {
          height: 196px;
          overflow-y: auto;
          margin-top: 20px;
          > div {
            overflow: hidden;
            clear: both;
            line-height: 20px;
            cursor: pointer;
            margin-bottom: 10px;
          }
        }
      }
      .atlasCont_r_btn {
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: #ffffff;
        background: #217efc;
        text-align: center;
        border-radius: 3px;
        margin-top: 10px;
        cursor: pointer;
      }
    }
  }
}
.testul li{
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 10px;
  box-sizing:border-box;
}
.testul li:nth-last-child(1){
  border: none;
}
.answer_title {
  margin-top: 10px;
}
.answer_title2{
  color: #999999;
}
</style>