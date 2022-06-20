<template>
    <div style="background: #f7f9fa">
        <div style="width: 100%; height: 104px; background: white; display: table" @click="toHome()">
            <div style="display: table-cell; vertical-align: middle">
                <img src="../../img/hkbk-logo.png" alt="" style="padding-left: 200px" />
            </div>
        </div>

        <div class="register-content">
            <div class="register-content-sub">
                <div class="account-label">注册账号</div>
                <Form ref="formInline" :model="formInline" :rules="ruleInline" inline :label-width="80">
                    <FormItem :prop="item.key" v-for="(item, index) in userKey" :key="index" :class="index % 2 != 0 ? 'input-normal' : ''" :label="item.label">
                        <Input type="text" v-model="formInline[item.key]" :placeholder="item.placeholder" v-if="item.label != '性别'">
                        </Input>
                        <RadioGroup v-model="formInline[item.key]" v-if="item.label == '性别'">
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
                        已有航空百科账号？<span>立即登录</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="copyright">
            Copyright © 2008 - 2018 中国航空综合技术研究所丨版权所有
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        username: '',
        name: '',
        password: '',
        aginPassword: '',
        email: '',
        mobile: '',
        gender: '',
        company: '',
        department: '',
        profession: '',
      },
      userKey: [
        {
          key: 'username',
          placeholder: '用户名',
          label: '用户名',
        },
        {
          key: 'name',
          placeholder: '姓名',
          label: '姓名',
        },
        {
          key: 'password',
          placeholder: '密码',
          label: '密码',
        },
        {
          key: 'aginPassword',
          placeholder: '确认密码',
          label: '确认密码',
        },
        {
          key: 'email',
          placeholder: '邮箱地址',
          label: '邮箱地址',
        },
        {
          key: 'mobile',
          placeholder: '联系方式',
          label: '联系方式',
        },
        {
          key: 'gender',
          placeholder: '性别',
          label: '性别',
        },
        {
          key: 'company',
          placeholder: '所在单位',
          label: '所在单位',
        },
        {
          key: 'department',
          placeholder: '所在部门',
          label: '所在部门',
        },
        {
          key: 'profession',
          placeholder: '专业',
          label: '专业',
        },
      ],
      ruleInline: {
        username: [
          {
            message: '请输入用户名',
            required: true,
            trigger: 'blur',
          },
        ],
        name: [
          {
            message: '请输入姓名',
            required: true,
            trigger: 'blur',
          },
        ],
        password: [
          {
            message: '请输入密码',
            required: true,
            trigger: 'blur',
          },
        ],
        aginPassword: [
          {
            message: '请输入确认密码',
            required: true,
            trigger: 'blur',
          },
        ],
        email: [
          {
            message: '请输入邮箱地址',
            required: true,
            trigger: 'blur',
          },
          { type: 'email', message: '请输入正确格式的邮箱', trigger: 'blur' },
        ],
        mobile: [
          {
            message: '请输入联系方式',
            required: true,
            trigger: 'blur',
          },
        ],
        gender: [
          {
            message: '请输入性别',
            required: true,
            trigger: 'blur',
          },
        ],
        company: [
          {
            message: '请输入所在单位',
            required: true,
            trigger: 'blur',
          },
        ],
        department: [
          {
            message: '请输入所在部门',
            required: true,
            trigger: 'blur',
          },
        ],
        profession: [
          {
            message: '请输入专业',
            required: true,
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    toHome() {
      this.$router.push('/digitalQuality');
    },
    toRegister(value) {
      console.log(value);

      this.$refs[value].validate(valid => {
        if (valid) {
          this.$axios(
            'users/register',
            'post',
            this.$qs.stringify(this.formInline)
          ).then(res => {
            const { data, code, msg } = res.data;
            if (code === 200) {
              this.$store.dispatch('storageUserInfo', data); // 将用户信息存储到vuex里面
              this.$store.dispatch('storageToken', data.token); // 单独储存一个token
              this.$Message.success(msg);
              setTimeout(() => {
                this.$router.push('/');
              }, 1500);
            } else {
              this.$Message.error(msg);
            }
          });
        }
      });
    },
    toLogin() {
      this.$router.push('/login');
    },
    toHome() {
      console.log(this.$store.state.user.isLogin);
      if (this.$store.state.user.isLogin == true) {
        this.$router.push('/digitalQuality');
      } else {
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-content {
  margin-top: 100px;
  width: 100%;
  height: 500px;

  .register-content-sub {
    background-color: white;
    width: 1200px;
    // height: 500px;
    box-shadow: 0px 0px 5px #888888;
    // text-align: center;
    // position: absolute;
    margin: auto;
    // left: 50%;
    // top: 50%;
    // transform: translate(-50%, -50%);
    .account-label {
      text-align: start;
      margin-left: 30px;
      margin-right: 30px;
      border-bottom: 1px solid #f5f5f5;
      line-height: 80px;
      font-size: 17px;
      color: #3f424b;
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
  margin-top: 20px;
  margin-bottom: 30px;
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
    padding-bottom: 30px;
  }
}

.copyright {
  text-align: center;
  margin-top: 70px;
  padding-bottom: 50px;
}
/deep/ .ivu-form-item-content {
  width: 500px;
}
</style>
