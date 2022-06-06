export default {
  state: {
    spinShow_: false,
    // img_url: "http://10.125.16.223:30080/data/", //云上
    img_url: "http://10.216.3.17/data/", //w外网
    // img_url: "http://localhost/data/", //内网
  },
  getters: {},
  mutations: {
    setspinShow_(state, payload) {
      if (!payload) {
        setTimeout(() => {
          state.spinShow_ = payload;
        }, 500);
      } else {
        state.spinShow_ = payload;
      }
    },
  },
  actions: {
    // 获取当前时间
    getCurrentDate({ state, commit }, index) {
      return new Promise((resolve, reject) => {
        try {
          var timeStr = "-";
          var curDate = new Date();
          var curYear = curDate.getFullYear(); // 获取完整的年份(4位,xxxx-????)
          var curMonth = curDate.getMonth() + 1; // 获取当前月份(0-11,0代表1月)
          if (curMonth < 10) {
            curMonth = "0" + curMonth;
          }
          var curDay = curDate.getDate(); // 获取当前日(1-31)
          if (curDay < 10) {
            curDay = "0" + curDay;
          }
          var curWeekDay = curDate.getDay(); // 获取当前星期X(0-6,0代表星期天)
          if (curWeekDay == 0) {
            curWeekDay = "7";
          }
          var curHour = curDate.getHours(); // 获取当前小时数(0-23)
          if (curHour < 10) {
            curHour = "0" + curHour;
          }
          var curMinute = curDate.getMinutes(); // 获取当前分钟数(0-59)
          if (curMinute < 10) {
            curMinute = "0" + curMinute;
          }
          var curSec = curDate.getSeconds(); // 获取当前秒数(0-59)
          if (curSec < 10) {
            curSec = "0" + curSec;
          }
          var Current1 = curYear + timeStr + curMonth + timeStr + curDay;
          var Current2 =
            curYear + timeStr + curMonth + timeStr + curDay + " " + curHour;
          var Current3 =
            curYear +
            timeStr +
            curMonth +
            timeStr +
            curDay +
            " " +
            curHour +
            ":" +
            curMinute;
          var Current4 =
            curYear +
            timeStr +
            curMonth +
            timeStr +
            curDay +
            " " +
            curHour +
            ":" +
            curMinute +
            ":" +
            curSec;
          if (index == 1) {
            resolve(Current1);
          } else if (index == 2) {
            resolve(Current2);
          } else if (index == 3) {
            resolve(Current3);
          } else if (index == 4) {
            resolve(Current4);
          }
        } catch (error) {
          reject(error);
        }
      });
    },
  },
};
