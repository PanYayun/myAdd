<template>
  <div>
    <Modal v-model="isShowTree" width="70%" title="型号故障记录详情">
      <div slot="footer" style="text-align: center">
        <Button type="primary" size="default" @click="closeModel">关闭</Button>
      </div>
      <div>
        <div class="top-con">
          <div v-for="(item, index) in tableList" :key="index">
            <div v-if="item.type == 0">
              <div
                class="header-top table-item-key table-item"
                v-if="checkTitleIsisEmpty(index)"
              >
                {{ item.key }}
              </div>
            </div>
            <div v-if="item.type == 1">
              <div class="flex" v-if="isEmpty(item.value)">
                <div class="table-item table-item-key table-item25">
                  {{ item.key }}
                </div>
                <div
                  v-if="item.key == '故障定位'"
                  class="table-item  table-item75"
                >
                  <div v-html="changeHtml(item.value)"></div>
                </div>
                <div v-else class="table-item  table-item75">
                  {{ processValue(item.key, item.value) }}
                </div>
              </div>
            </div>
            <div class="flex" v-if="item.type == 2">
              <div class="flex table-item50" v-if="isEmpty(item.value)">
                <div class="table-item table-item-key table-item50">
                  {{ item.key }}
                </div>
                <div class="table-item  table-item50">
                  {{ processValue(item.key, item.value) }}
                </div>
              </div>
              <div class="flex table-item50" v-if="isEmpty(item.value2)">
                <div class="table-item table-item-key table-item50">
                  {{ item.key2 }}
                </div>
                <div class="table-item  table-item50">
                  {{ processValue(item.key2, item.value2) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- gzdesc   故障描述 -->
        <!-- gzdw   故障定位 -->
        <!-- jlfxSxfx   机理分析失效分析 -->
        <!-- gzfx 故障复现 -->
        <!-- improvementVerification   改进措施 -->
        <!-- yzqk   验证情况 -->
        <!-- jyfs 举一反三 -->
        <!-- jl 结论 -->
        <div
          v-if="failureRecord"
          style="font-size: 23px;margin-top: 20px;font-weight: 600;border-bottom: 1px solid #e5e5e5;padding-bottom: 17px;"
        >
          故障及归零情况分析
        </div>
        <div class="bottom-con" v-if="failureRecord.gzdesc">
          <div class="heaeder-title">故障描述</div>
          <div class="list-box">
            <div
              class="text"
              style="text-indent: 0px;"
              v-html="
                failureRecord.gzdesc.replace(
                  /src=\&quot;/g,
                  `src=&quot;` + this.$store.state.app.img_url
                )
              "
            ></div>
          </div>
        </div>
        <div class="bottom-con" v-if="failureRecord.gzdw">
          <div class="heaeder-title">故障定位</div>
          <div class="list-box">
            <div
              class="text"
              style="text-indent: 0px;"
              v-html="
                failureRecord.gzdw.replace(
                  /src=\&quot;/g,
                  `src=&quot;` + this.$store.state.app.img_url
                )
              "
            ></div>
          </div>
        </div>
        <div class="bottom-con" v-if="failureRecord.jlfxSxfx">
          <div class="heaeder-title">机理分析失效分析</div>
          <div class="list-box">
            <div
              class="text"
              style="text-indent: 0px;"
              v-html="
                failureRecord.jlfxSxfx.replace(
                  /src=\&quot;/g,
                  `src=&quot;` + this.$store.state.app.img_url
                )
              "
            ></div>
          </div>
        </div>
        <div class="bottom-con" v-if="failureRecord.gzfx">
          <div class="heaeder-title">故障复现</div>
          <div class="list-box">
            <div
              class="text"
              style="text-indent: 0px;"
              v-html="
                failureRecord.gzfx.replace(
                  /src=\&quot;/g,
                  `src=&quot;` + this.$store.state.app.img_url
                )
              "
            ></div>
          </div>
        </div>
        <div class="bottom-con" v-if="failureRecord.improvementVerification">
          <div class="heaeder-title">改进措施</div>
          <div class="list-box">
            <div
              class="text"
              style="text-indent: 0px;"
              v-html="
                failureRecord.improvementVerification.replace(
                  /src=\&quot;/g,
                  `src=&quot;` + this.$store.state.app.img_url
                )
              "
            ></div>
          </div>
        </div>
        <div class="bottom-con" v-if="failureRecord.yzqk">
          <div class="heaeder-title">验证情况</div>
          <div class="list-box">
            <div
              class="text"
              style="text-indent: 0px;"
              v-html="
                failureRecord.yzqk.replace(
                  /src=\&quot;/g,
                  `src=&quot;` + this.$store.state.app.img_url
                )
              "
            ></div>
          </div>
        </div>
        <div class="bottom-con" v-if="failureRecord.jyfs">
          <div class="heaeder-title">举一反三</div>
          <div class="list-box">
            <div
              class="text"
              style="text-indent: 0px;"
              v-html="
                failureRecord.jyfs.replace(
                  /src=\&quot;/g,
                  `src=&quot;` + this.$store.state.app.img_url
                )
              "
            ></div>
          </div>
        </div>
        <div class="bottom-con" v-if="failureRecord.jl">
          <div class="heaeder-title">结论</div>
          <div class="list-box">
            <div
              class="text"
              style="text-indent: 0px;"
              v-html="
                failureRecord.jl.replace(
                  /src=\&quot;/g,
                  `src=&quot;` + this.$store.state.app.img_url
                )
              "
            ></div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import collapse from "@/libs/collapse";
import { time_format } from "@/libs/tools";

export default {
  name: "failureRecordModel",
  props: ["failureRecord"],
  components: {
    collapse,
  },
  data() {
    return { isShowTree: false, tableList: [] };
  },
  computed: {
    formatTime() {
      return function(times) {
        if (!times || times == "") {
          return "";
        }
        return time_format(new Date(new Date(times).getTime()), "yy-MM-dd");
      };
    },
  },
  watch: {
    failureRecord: {
      handler(newVal, oldVal) {
        this.gettableListData(newVal);
      },
      // 加上之后第一次定义时就会执行
      immediate: true,
      // 深度监听即当要监听对象或数组的时候需要添加deep:true属性
      deep: true,
    },
  },
  mounted() {},
  methods: {
    subShowTree() {
      this.isShowTree = true;
    },
    gettableListData(newVal) {
      if (true) {
        if (newVal.planeType == "D14") {
          this.tableList = [
            {
              key: "用户",
              value: newVal.equipmentUser,
              type: 2,
              key2: "发生日期",
              value2: newVal.DateOfOccurrence,
            },
            {
              key: "导弹型号",
              value: newVal.planeType,
              type: 2,
              key2: "导弹出厂编号",
              value2: newVal.planeProduceId,
            },
            {
              key: "导弹总体单位",
              value: newVal.planeProduceCompany,
              type: 1,
            },
            {
              key: "所属系统",
              value: newVal.SystemStr,
              type: 2,
              key2: "系统型号",
              value2: newVal.systemType,
            },
            {
              key: "系统编码",
              value: newVal.systemId,
              type: 2,
              key2: "系统研制单位",
              value2: newVal.systemProduceCompany,
            },
            {
              key: "产品名称",
              value: newVal.productName,
              type: 2,
              key2: "产品型号",
              value2: newVal.productId,
            },
            {
              key: "产品编码",
              value: newVal.productCode,
              type: 2,
              key2: "产品研制单位",
              value2: newVal.productProduceCompany,
            },
            {
              key: "故障现象描述",
              value: newVal.faultPhenomenonDesc,
              type: 1,
            },
            {
              key: "现象分类",
              value: newVal.xxflname,
              type: 2,
              key2: "现象二级分类",
              value2: newVal.xxejflname,
            },
            {
              key: "故障类型",
              value: newVal.faultType,
              type: 2,
              key2: "故障模式",
              value2: newVal.fualtMode,
            },
            {
              key: "故障原因",
              value: newVal.causeOfFualt,
              type: 1,
            },
            {
              key: "原因分类",
              value: newVal.yyflname,
              type: 2,
              key2: "原因二级分类",
              value2: newVal.yyejflname,
            },
            {
              key: "故障机理",
              value: newVal.faultMechanism,
              type: 2,
              key2: "故障机理二级分类",
              value2: newVal.faultMechanismSecondary,
            },
            {
              key: "元器件故障分类",
              value: newVal.componentClassification,
              type: 2,
              key2: "元器件故障二级分类",
              value2: newVal.componentClassificationSecondary,
            },
            {
              key: "零部件分类",
              value: newVal.partsClassification,
              type: 2,
              key2: "零部件故障二级分类",
              value2: newVal.partsClassificationSecondary,
            },
          ];
        } else {
          this.tableList = [
            {
              key: "用户",
              value: newVal.equipmentUser,
              type: 2,
              key2: "发生日期",
              value2: newVal.DateOfOccurrence,
            },
            {
              key: "飞机型号",
              value: newVal.planeType,
              type: 2,
              key2: "飞机出厂编号",
              value2: newVal.planeProduceId,
            },
            {
              key: "飞机总体单位",
              value: newVal.planeProduceCompany,
              type: 1,
            },
            {
              key: "所属系统",
              value: newVal.SystemStr,
              type: 2,
              key2: "系统型号",
              value2: newVal.systemType,
            },
            {
              key: "系统编码",
              value: newVal.systemId,
              type: 2,
              key2: "系统研制单位",
              value2: newVal.systemProduceCompany,
            },
            {
              key: "产品名称",
              value: newVal.productName,
              type: 2,
              key2: "产品型号",
              value2: newVal.productId,
            },
            {
              key: "产品编码",
              value: newVal.productCode,
              type: 2,
              key2: "产品研制单位",
              value2: newVal.productProduceCompany,
            },
            {
              key: "故障现象描述",
              value: newVal.faultPhenomenonDesc,
              type: 1,
            },
            {
              key: "现象分类",
              value: newVal.xxflname,
              type: 2,
              key2: "现象二级分类",
              value2: newVal.xxejflname,
            },
            {
              key: "故障类型",
              value: newVal.faultType,
              type: 2,
              key2: "故障模式",
              value2: newVal.fualtMode,
            },
            {
              key: "故障原因",
              value: newVal.causeOfFualt,
              type: 1,
            },
            {
              key: "原因分类",
              value: newVal.yyflname,
              type: 2,
              key2: "原因二级分类",
              value2: newVal.yyejflname,
            },
            {
              key: "故障机理",
              value: newVal.faultMechanism,
              type: 2,
              key2: "故障机理二级分类",
              value2: newVal.faultMechanismSecondary,
            },
            {
              key: "元器件故障分类",
              value: newVal.componentClassification,
              type: 2,
              key2: "元器件故障二级分类",
              value2: newVal.componentClassificationSecondary,
            },
            {
              key: "零部件分类",
              value: newVal.partsClassification,
              type: 2,
              key2: "零部件故障二级分类",
              value2: newVal.partsClassificationSecondary,
            },
          ];
        }
      }
      this.$forceUpdate();
    },
    closeModel() {
      this.isShowTree = false;
    },
    checkIsThereAnyZeroingInformation(item) {
      if (
        item.faultZeroingAnalysis &&
        item.faultZeroingAnalysis != null &&
        item.faultZeroingAnalysis != undefined &&
        item.faultZeroingAnalysis.length > 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    isEmpty(name) {
      if (name != "" && name != undefined) {
        return true;
      } else {
        return false;
      }
    },
    //处理当前title下是否全是空值  到下一个title截止
    checkTitleIsisEmpty(index) {
      var b = false;
      for (var i = index + 1; i < this.tableList.length; i++) {
        let item = this.tableList[i];
        if (item.type == 0) {
          break;
        }
        if (item.type == 1) {
          if (
            item.value != undefined &&
            (item.value != undefined) != null &&
            item.value != ""
          ) {
            b = true;
          }
        }
        if (item.type == 2) {
          if (
            (item.value != undefined &&
              (item.value != undefined) != null &&
              item.value != "") ||
            (item.value != undefined &&
              (item.value != undefined) != null &&
              item.value2 != "")
          ) {
            b = true;
          }
        }
      }
      return b;
    },
    //处理时间
    processValue(key, value) {
      if (value == undefined || value == null) {
        return "";
      }
      if (key == "日期") {
        return this.formatTime(value);
      } else {
        return value;
      }
    },
    changeHtml(html) {
      html = html.replace(/src=\"/g, `src="` + this.$store.state.app.img_url);
      return html;
    },
  },
};
</script>

<style scoped lang="less">
/deep/ .ivu-modal-header-inner {
  font-size: 18px;
  font-weight: bold;
  color: #3f424b;
}
.top-con {
  .table-item {
    border: 1px solid #eee;
    // margin: auto;
    text-align: center;
    word-break: break-all;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  // .table-item2 {
  //   height: 100px;
  // }
  .table-item50 {
    width: 50%;
  }
  .table-item25 {
    width: 25%;
  }
  .table-item75 {
    width: 75%;
  }
  .table-item-key {
    font-weight: bold;
  }
}
.bottom-con {
  margin-top: 10px;
  margin-bottom: 20px;
  .heaeder-title {
    font-size: 16px;
    font-weight: bold;
    line-height: 50px;
    border-bottom: 1px solid #eee;
  }
  .list-box {
    // /deep/ img {
    //   width: 100%;
    //   height: auto;
    // }
    margin-top: 10px;
    .titile {
      font-size: 15px;
      font-weight: bold;
    }
    .content {
      font-size: 14px;
      color: #666666;
      margin-top: 10px;
    }
  }
}
img {
  width: 100% !important;
}
.flex {
  display: flex;
}
</style>
