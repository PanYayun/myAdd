<template>
  <div style="background: #f7f9fa; position: relative;">
    <div class="headerTop" @click="toHome()">
      <div style="width:1200px;margin:0 auto">
        <div
          style="height:70px;display:flex;justify-content: center;align-items: center;cursor: pointer;"
        >
          <router-link
            to="/digitalQuality"
            style="display:flex;justify-content: center;align-items: center;"
          >
            <img src="@/img/avicLogo.png" alt="" />
            <span
              style="    font-size: 24px;color: #282828;margin-left: 12px;font-weight: 600;"
              >航空数智服务</span
            >
          </router-link>
        </div>
      </div>
    </div>

    <div class="register-content">
      <div class="register-content-sub">
        <div class="account-label">注册账号</div>
        <Form
          ref="formInline"
          class="fromDiv"
          :model="formInline"
          :rules="ruleInline"
          inline
          :label-width="70"
        >
          <FormItem
            :prop="item.key"
            v-for="(item, index) in userKey"
            :key="index"
            :class="index % 2 != 0 ? 'input-normal' : ''"
            :label="item.label"
          >
            <Input
              :type="item.type"
              v-model="formInline[item.key]"
              :placeholder="item.placeholder"
              v-if="item.label != '性别'"
            >
            </Input>
            <RadioGroup
              v-model="formInline[item.key]"
              v-if="item.label == '性别'"
            >
              <Radio label="男">男</Radio>
              <Radio label="女">女</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
        <div class="register-btn">
          <div class="register-btn-sub" @click="toRegister('formInline')">
            注册
          </div>
        </div>
        <div class="login-div">
          <div class="login-div-sub">
            已有航空百科账号？<span @click="toLogin()">立即登录</span>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">
      Copyright © 2008 - 2018 中国航空综合技术研究所丨版权所有
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
export default {
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.formInline.password) {
        callback(new Error("两次密码不正确"));
      } else {
        callback();
      }
    };
    const validateMobileCheck = (rule, value, callback) => {
      //用一个正则来验证(支持手机号码、含区号固定电话、不含区号固定电话)
      var pattern = /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/;
      if (value === "") {
        callback(new Error("请输入联系方式"));
      } else {
        if (pattern.test(value)) {
          callback();
        } else {
          callback(new Error("联系方式不正确"));
        }
      }
    };
    return {
      loginData: "",
      spinShow: false,
      formInline: {
        username: "",
        name: "",
        password: "",
        aginPassword: "",
        email: "",
        mobile: "",
        gender: "",
        company: "",
        department: "",
        profession: "",
      },
      userKey: [
        {
          key: "username",
          placeholder: "用户名",
          label: "用户名",
          type: "text",
        },
        {
          key: "name",
          placeholder: "姓名",
          label: "姓名",
          type: "text",
        },
        {
          key: "password",
          placeholder: "密码",
          label: "密码",
          type: "password",
        },
        {
          key: "aginPassword",
          placeholder: "确认密码",
          label: "确认密码",
          type: "password",
        },
        {
          key: "email",
          placeholder: "邮箱地址",
          label: "邮箱地址",
          type: "text",
        },
        {
          key: "mobile",
          placeholder: "联系方式",
          label: "联系方式",
          type: "text",
        },
        {
          key: "gender",
          placeholder: "性别",
          label: "性别",
          type: "text",
        },
        {
          key: "company",
          placeholder: "所在单位",
          label: "所在单位",
          type: "text",
        },
        {
          key: "department",
          placeholder: "所在部门",
          label: "所在部门",
          type: "text",
        },
        {
          key: "profession",
          placeholder: "专业",
          label: "专业",
          type: "text",
        },
      ],
      ruleInline: {
        username: [
          {
            message: "请输入用户名",
            required: true,
            trigger: "blur",
          },
        ],
        name: [
          {
            message: "请输入姓名",
            required: true,
            trigger: "blur",
          },
        ],
        password: [
          {
            message: "请输入密码",
            required: true,
            trigger: "blur",
          },
        ],
        aginPassword: [
          { validator: validatePassCheck, trigger: "blur", required: true },
        ],
        email: [
          {
            message: "请输入邮箱地址",
            required: true,
            trigger: "blur",
          },
          { type: "email", message: "请输入正确格式的邮箱", trigger: "blur" },
        ],
        mobile: [
          // {
          //   message: "请输入联系方式",
          //   required: true,
          //   trigger: "blur",
          // },
          { validator: validateMobileCheck, trigger: "blur", required: true },
        ],
        gender: [
          {
            message: "请选择性别",
            required: false,
            trigger: "blur",
          },
        ],
        company: [
          {
            message: "请输入所在单位",
            required: false,
            trigger: "blur",
          },
        ],
        department: [
          {
            message: "请输入所在部门",
            required: false,
            trigger: "blur",
          },
        ],
        profession: [
          {
            message: "请输入专业",
            required: false,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    toHome() {
      this.$router.push("/digitalQuality");
    },
    toRegister(value) {
      console.log(value);

      this.$refs[value].validate((valid) => {
        if (valid) {
          if (this.formInline.password !== this.formInline.aginPassword) {
            this.$Message.error("两次输入的密码不相同");
            return;
          }
          this.spinShow = true;
          this.$axios(
            "users/register",
            "post",
            this.$qs.stringify(this.formInline)
          ).then((res) => {
            const { data, code, msg } = res.data;
            this.spinShow = false;
            if (code === 200) {
              //注册成功
              this.login();
              setTimeout(() => {
                this.spinShow = false;
              }, 300);
            } else {
              //注册失败
              this.$Message.error(msg);
            }
          });
        }
      });
    },
    login() {
      //注册成功后 登录
      this.spinShow = true;
      this.$axios(
        "/users/login",
        "post",
        this.$qs.stringify({
          username: this.formInline.username,
          password: this.formInline.password,
        })
      ).then((res) => {
        this.spinShow = false;
        const { data, code, msg } = res.data;
        if (code === 200) {
          //登录成功
          this.loginData = data;

          //登录成功 验证身份成功后 跳标签管理
          this.$store.dispatch("storageUserInfo", this.loginData); // 将用户信息存储到vuex里面
          this.$store.dispatch("storageToken", this.loginData.token); // 单独储存一个token
          this.$store.dispatch("storageisLogin", true); // 将用户信息存储到vuex里面
          //登录成功 验证身份用户是否是管理者
          this.checkAdmin();
        } else {
          //登录失败
          this.$Message.error("注册成功，但登录失败，请重新登录");
          //跳登录
          this.toLogin();
        }
      });
    },
    checkAdmin() {
      //判断用户是否管理用户
      this.spinShow = true;
      var par = { username: this.formInline.username };
      this.$axios("/users/is_admin", "post", this.$qs.stringify(par)).then(
        (res) => {
          const { data, code, msg } = res.data;
          this.spinShow = false;
          if (code === 200) {
            this.$store.dispatch("storageisAdmin", data.is_admin);
            setTimeout(() => {
              this.$router.push({
                path: "/userAdmin/mineInterest",
                query: {
                  isRegister: true,
                },
              });
            }, 300);
          } else {
            //身份验证失败 去登录页手动登录
            this.$Message.error("注册成功，用户身份验证失败，请重新登录");
            //登录成功 验证失败 删除之前的vux数据 后跳登录
            this.$store.dispatch("storageUserInfo", ""); // 将用户信息存储到vuex里面
            this.$store.dispatch("storageToken", ""); // 清空用户token
            this.$store.dispatch("storageisLogin", false); // 将用户信息存储到vuex里面
            this.toLogin();
          }
        }
      );
    },
    toLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
.fromDiv {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.headerTop {
  width: 100%;
  height: 70px;
  display: flex;
  background: #ffffff;
  & > div {
    display: flex;
    align-items: center;
  }
}
.register-content {
  margin-top: 40px;
  width: 100%;
  height: auto;
  overflow: hidden;

  .register-content-sub {
    background-color: white;
    width: 1200px;
    padding: 0 30px;
    box-sizing: border-box;
    margin: auto;
    .account-label {
      text-align: start;
      border-bottom: 1px solid #eeeeee;
      line-height: 58px;
      font-size: 17px;
      color: #3f424b;
      margin-bottom: 50px;
      .login {
        font-size: 17px;
        color: #1c708f;
      }
    }
    /deep/ .ivu-input {
      height: 42px;
      width: 100%;
      line-height: 42px;
    }
    /deep/ ivu-form-item {
      margin-right: 0px;
    }
    /deep/ .ivu-form-item-error-tip {
      padding-top: 4px;
      padding-left: 14px;
    }
    /deep/ .ivu-form-item {
      margin-bottom: 20px;
    }
  }
}
.iput-normal {
  /deep/ .ivu-form-item {
    margin-left: 50px !important;
  }
}
.register-btn {
  position: relative;
  width: 100%;
  height: 42px;
  margin-top: 30px;
  margin-bottom: 30px;
  cursor: pointer;
  .register-btn-sub {
    text-align: center;
    width: 100px;
    height: 42px;
    background-color: #398bfb;
    font-size: 17px;
    color: white;
    line-height: 42px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.login-div {
  width: 100%;
  .login-div-sub {
    text-align: center;
    padding-bottom: 60px;
    font-size: 16px;
    & > span {
      color: #3388ff;
      cursor: pointer;
    }
  }
}

.copyright {
  text-align: center;
  margin-top: 60px;
  padding-bottom: 60px;
  color: #868991;
  font-size: 16px;
}
/deep/ .ivu-form-item-content {
  width: 480px;
  line-height: 38px;
}
/deep/ .ivu-form .ivu-form-item-label {
  padding: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 42px;
  margin-right: 15px;
}
/deep/ .ivu-input-wrapper {
  width: 90%;
}
</style>
