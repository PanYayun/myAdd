<template>
  <div class="background_login" style="position: relative;">
    <div class="login_box">
      <div
        style="
          padding-top: 44px;
          padding-bottom: 42px;
          overflow: hidden;
          color: #3f424b;
          font-size: 24px;
          text-align: center;
        "
      >
        账号登录
      </div>
      <Form
        ref="formLogin"
        :model="formLogin"
        :rules="ruleValidate"
        label-position="left"
        :label-width="100"
      >
        <FormItem :label-width="0" prop="username">
          <Input
            v-model="formLogin.username"
            placeholder="手机/邮箱/用户名"
          ></Input>
        </FormItem>
        <FormItem :label-width="0" prop="password">
          <Input
            type="password"
            v-model="formLogin.password"
            placeholder="密码"
          ></Input>
        </FormItem>
        <div>
          <FormItem label="" :label-width="0" prop="checkbox">
            <CheckboxGroup
              style="float: left"
              v-model="formLogin.checkbox"
              @on-change="remeberPasswordChange"
            >
              <Checkbox label="记住密码"></Checkbox>
            </CheckboxGroup>
            <!-- <div style="float: right; cursor: pointer">忘记密码</div> -->
          </FormItem>
        </div>
        <FormItem :label-width="0">
          <Button long type="primary" @click="handleSubmit('formLogin')"
            >登录
          </Button>
        </FormItem>
        <div class="loginBtn_tips">
          <div style="float: left" @click="loginFromTemp()">游客登录</div>
          <div style="float: right" @click="toRegister()">立即注册</div>
        </div>
      </Form>
    </div>
    <Spin size="large" fix v-if="loaddingShow"></Spin>
  </div>
</template>

<script>
const Base64 = require("js-base64").Base64;
export default {
  data() {
    return {
      loaddingShow: false,
      loginData: "",
      formLogin: {
        username: "",
        password: "",
        checkbox: [],
      },
      ruleValidate: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      chatHistory: [],
    };
  },
  methods: {
    remeberPasswordChange() {
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.loaddingShow = true;
          const { username, password } = this.formLogin;
          this.$axios(
            "/users/login",
            "post",
            this.$qs.stringify({ username, password })
          ).then((res) => {
            this.loaddingShow = false;
            const { data, code, msg } = res.data;
            const { redirect } = this.$route.query;
            if (code === 200) {
              //登录接口成功后 保存用户token
              this.loginData = data;
              this.$store.dispatch("storageUserInfo", this.loginData); // 将用户信息存储到vuex里面
              this.$store.dispatch("storageToken", this.loginData.token); // 单独储存一个token
              this.$store.dispatch("storageisLogin", true); // 将用户信息存储到vuex里面
              this.checkAdmin(unescape(redirect));
              this.$Message.success("登录成功！");
            } else {
              this.$Message.error(msg);
            }
          });
        }
      });
    },

    checkAdmin(redirect) {
      //判断用户是否管理用户
      this.loaddingShow = true;
      this.$axios(
        "/users/is_admin",
        "post",
        this.$qs.stringify({ username: this.formLogin.username })
      ).then((res) => {
        this.loaddingShow = false;
        const { data, code, msg } = res.data;
        if (code === 200) {
          this.$store.dispatch("storageisAdmin", data.is_admin);
          this.setUserInfo();
          setTimeout(() => {
            // this.$router.push({ path: redirect ? redirect : "/" });
            if (redirect && redirect != undefined && redirect != "undefined") {
              this.$router.push({
                path: redirect,
                query: {
                  isRegister: true,
                },
              });
            } else {
              this.$router.push({ path: this.HomeYe ? this.HomeYe : "/" });
            }
          }, 300);
        } else {
          //用户身份验证失败 需要删 除用户数据，让用户重新点击登录
          this.$store.dispatch("storageUserInfo", ""); // 将用户信息存储到vuex里面
          this.$store.dispatch("storageToken", ""); // 清空用户token
          this.$store.dispatch("storageisLogin", false); // 将用户信息存储到vuex里面
          this.$Message.error("用户身份验证失败，请重新登录");
        }
      });
    },
    loginFromTemp() {
      this.$store.dispatch("storageisLogin", true);
      this.$router.push("/");
    },
    toRegister() {
      this.$router.push("/register");
    },
    // 储存表单信息
    setUserInfo: function() {
      // 判断用户是否勾选记住密码，如果勾选，向cookie中储存登录信息，
      // 如果没有勾选，储存的信息为空
      var remember = false;
      if (this.formLogin.checkbox[0] === "记住密码") {
        remember = true;
      }
      if (remember) {
        this.setCookie("username", this.formLogin.username);
        // base64加密密码
        let passWord = Base64.encode(this.formLogin.password);
        this.setCookie("password", passWord);
      } else {
        this.setCookie("username", "");
        this.setCookie("password", "");
      }
    },
    // 获取cookie
    getCookie: function(key) {
      if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(key + "=");
        if (start !== -1) {
          start = start + key.length + 1;
          var end = document.cookie.indexOf(";", start);
          if (end === -1) end = document.cookie.length;
          return unescape(document.cookie.substring(start, end));
        }
      }
      return "";
    },
    // 保存cookie
    setCookie: function(cName, value, expiredays) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie =
        cName +
        "=" +
        decodeURIComponent(value) +
        (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
    },
  },
  computed: {
    HomeYe() {
      return this.$store.state.user.HomeYe;
    },
  },
  created() {
    // 在页面加载时从cookie获取登录信息
    let username = this.getCookie("username");
    let password = Base64.decode(this.getCookie("password"));
    // 如果存在赋值给表单，并且将记住密码勾选
    if (username) {
      this.formLogin.username = username;
      this.formLogin.password = password;
      this.formLogin.checkbox = ["记住密码"];
    }
  },
};
</script>

<style lang="less" scoped>
.background_login {
  height: 900px;
  width: 1600px;
  margin: 0 auto;
  background: url("../img/login_background2.png") no-repeat 0%;
  display: flex;
  align-items: center;
  justify-content: center;

  /deep/ .ivu-input {
    height: 42px;
    line-height: 42px;
  }

  /deep/ .ivu-form-item-error-tip {
    padding-top: 4px;
  }

  /deep/ .ivu-form-item {
    margin-bottom: 20px;
  }

  /deep/ .ivu-btn {
    height: 44px;
    font-size: 16px;
    border-radius: 20px;
    margin-top: 20px;
    background: #3388ff;
  }

  .login_box {
    width: 460px;
    height: 440px;
    background: #ffffff;
    padding: 0 30px;
    box-sizing: border-box;
  }

  .loginBtn_tips {
    overflow: hidden;

    & > div {
      line-height: 16px;
      color: #136ec2;
      cursor: pointer;
    }
  }
}
</style>
