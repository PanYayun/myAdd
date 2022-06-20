<template>
  <div class="content flex">
    <div class="flex wrap" style="margin-top: 10px;margin-bottom: 70px; align-items: center;">
      <!-- <div class="title">智慧标准</div> -->
      <div class="input_searching flex" style="margin-left: 100px">
        <input
          type="text"
          placeholder="请输入"
          v-model="value"
          @keydown="keyDown($event)"
        />
        <div class="searching_btn flex" @click="searchResult">
          <Icon type="ios-search" />
          <label>检索</label>
        </div>
        <!-- <button
          style="width:100px;height:50px; background: #3388ff;color:#ffffff;margin-left:20px;cursor:pointer;"
        >
          <a
            style="display:inline-block;height: 100%;width: 100%;line-height: 50px;color:#ffffff"
            :href="[
              'http://localhost/singleLoginZHJB?account=' +
                this.$store.state.user.userInfo.username +
                '&url=/zhjb/frontIndex'
            ]"
            >高级检索</a
          > -->
          <!-- http://localhost/singleLoginZHJB?account=`store.state.user.userInfo.username`&url=/zhjb/frontIndex -->
          <!-- :href="['http://localhost:8080/share_detail'+'?newsId='+item.newId]" -->
          <!-- this.$store.state.user.userInfo.username -->
        <!-- </button> -->
        <!--                <span @click="superSearch">高级检索</span>-->
      </div>
      <div class="top_search">
        <div class="wrap">
          <div class="ts_title">
            行业动态
          </div>
          <ul>
            <li>飞机地面加油和排油用橡胶软管及软管组合件</li>
            <li>玩具中塑化材料及可放入口中产品的判定指南</li>
            <li>
              光纤试验方法规范 第42部分：传输特性的测量方法和试验程序 波长色散
            </li>
            <li>一般工业固体废物贮存、处置场污染控制标准</li>
            <li>森林生态系统长期定位观测研究站建设规范</li>
            <li>家用移动机器人性能评估方法</li>
          </ul>
        </div>
      </div>
    </div>
  
  
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      value: "",
    };
  },
  mounted() {
    //判断如果是从智慧标准登录,等进入智慧标准
    if (this.$route.path == "/standard/index") {
      this.$store.commit("changeHomeYe", "/standard/index");
    }
    this.getList();
  },
  methods: {
    keyDown(event) {
      var key = event.keyCode;
      if (key == 13) {
        this.searchResult();
      }
    },
    searchResult() {
      if (!this.value) {
        this.$Message.warning("请输入检索信息");
        return false;
      }
      this.$store.dispatch("setVal", this.value);
      this.$router.push("/standard/searchingResult");
    },
    getList() {},
    superSearch() {
      this.$router.push("/standard/advancedSearch");
    },
  },
};
</script>

<style scoped lang="less">
.flex {
  display: flex;
}

.content {
  align-items: center;
  justify-content: center;

  .title {
    color: white;
    font-size: 30px;
    text-align: center;
  }

  > .wrap {
    flex-direction: column;
    justify-content: center;
  }

  .input_searching {
    align-items: center;
    margin-top: 8%;

    input {
      display: block;
      width: 560px;
      line-height: 20px;
      padding: 15px 0px;
      text-indent: 15px;
    }

    span {
      font-size: 14px;
      cursor: pointer;
      margin-left: 20px;
      color: white;
      line-height: 50px;
    }

    .searching_btn {
      width: 100px;
      height: 50px;
      align-items: center;
      justify-content: center;
      background: #3388ff;
      color: white;
      font-size: 14px;
      cursor: pointer;

      i {
        margin-right: 5px;
        font-size: 16px;
      }
    }
  }

  .top_search {
    width: 540px;
    margin-left: 32px;
    margin-top: 30px;
    color: white;

    .wrap {
      padding: 25px 23px;
      background: rgba(176, 176, 176, 0.5);
    }

    .ts_title {
      font-size: 16px;
      position: relative;
      text-indent: 13px;

      &:before {
        width: 3px;
        height: 15px;
        background: #006bff;
        content: "";
        position: absolute;
        left: 0px;
        top: 4px;
      }
    }

    ul {
      li {
        font-size: 14px;
        margin-top: 16px;
        position: relative;
        text-indent: 13px;

        &:before {
          content: "";
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: white;
          left: 0px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}

.index_footer {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 26px;
  color: white;
  font-size: 14px;
}
</style>
