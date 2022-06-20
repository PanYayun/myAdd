<template>
  <div class="content" style="position: relative;">
    <div class="content-sub">
      <div class="userName">
        <div>用户名：{{ userInfo.username }}</div>
      </div>
      <div class="user-role">
        用户角色
      </div>
      <div class="register-content">
        <div class="register-content-sub">
          <Form
            ref="formInline"
            class="fromDiv"
            :model="formInline"
            :rules="ruleInline"
            inline
            :label-width="70"
          >
            <div>
              <FormItem
                label="通用场景"
                class="input-item-check-box input-item-check-box-not-bottom"
              >
                <RadioGroup v-model="role1" class="changjing">
                  <Radio label="无权限"></Radio>
                  <Radio label="普通用户"></Radio>
                  <Radio label="审核员"></Radio>
                  <Radio label="管理员"></Radio>
                </RadioGroup>
              </FormItem>
              <FormItem
                label="标准场景"
                class="input-item-check-box input-item-check-box-not-bottom"
              >
                <RadioGroup v-model="role2" class="changjing">
                  <Radio label="无权限"></Radio>
                  <Radio label="普通用户"></Radio>
                  <Radio label="审核员"></Radio>
                  <Radio label="管理员"></Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="质量场景" class="input-item-check-box">
                <RadioGroup v-model="role3" class="changjing">
                  <Radio label="无权限"></Radio>
                  <Radio label="普通用户"></Radio>
                  <Radio label="审核员"></Radio>
                  <Radio label="管理员"></Radio>
                </RadioGroup>
              </FormItem>
            </div>
            <div>
              <FormItem
                :prop="item.key"
                v-for="(item, index) in userKey"
                :key="index"
                :class="[index % 2 != 0 ? 'input-normal' : '', 'input-item']"
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
            </div>
          </Form>
        </div>
      </div>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userInfo"],
  data() {
    return {
      spinShow: false,
      role1: "无权限",
      role2: "无权限",
      role3: "无权限",
      formInline: {
        name: "",
        password: "",
        email: "",
        mobile: "",
        gender: "",
        company: "",
        department: "",
        profession: "",
      },
      userKey: [
        {
          key: "name",
          placeholder: "姓名",
          label: "姓名",
          type: "text",
        },
        {
          key: "password",
          placeholder: "修改密码",
          label: "修改密码",
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
        name: [
          {
            message: "请输入姓名",
            required: false,
            trigger: "blur",
          },
        ],
        password: [
          {
            message: "请输入密码",
            required: false,
            trigger: "blur",
          },
        ],
        email: [
          {
            message: "请输入邮箱地址",
            required: false,
            trigger: "blur",
          },
          { type: "email", message: "请输入正确格式的邮箱", trigger: "blur" },
        ],
        mobile: [
          {
            message: "请输入联系方式",
            required: false,
            trigger: "blur",
          },
        ],
        gender: [
          {
            message: "请输入性别",
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
    loadUserData() {
      this.spinShow = true;
      var par = {
        username: this.$store.state.user.userInfo.username,
        user_username: this.userInfo.username,
      };
      this.$axios(
        "/users/get_this_user_info",
        "post",
        this.$qs.stringify(par)
      ).then((res) => {
        console.log(res.data.data);
        if (res.data.code === 200) {
          this.spinShow = false;
          this.formInline.name = res.data.data.name;
          this.formInline.email = res.data.data.email;
          this.formInline.mobile = res.data.data.mobile;
          this.formInline.gender = res.data.data.gender;
          this.formInline.company = res.data.data.company;
          this.formInline.department = res.data.data.department;
          this.formInline.profession = res.data.data.profession;
          this.role1 = res.data.data.role1;
          this.role2 = res.data.data.role2;
          this.role3 = res.data.data.role3;
        } else {
          this.loadUserData();
        }
      });
    },
    commitInfo() {
      var par = JSON.parse(JSON.stringify(this.formInline));
      par.user_username = this.userInfo.username;
      par.username = this.$store.state.user.userInfo.username;
      par.role1 = this.role1;
      par.role2 = this.role2;
      par.role3 = this.role3;
      this.$axios("/users/admin_update_user_profile", "post", par).then(
        (res) => {
          this.$emit("commitInfoFinish", res);
        }
      );
    },
  },
  watch: {
    userInfo: function(newVal, oldVal) {
      console.log("userInfo变化了");
      this.formInline.name = newVal.name;
      this.formInline.email = newVal.email;
      this.formInline.mobile = newVal.mobile;
      this.formInline.gender = newVal.gender;
      this.formInline.company = newVal.company;
      this.formInline.department = newVal.department;
      this.formInline.profession = newVal.profession;
      this.loadUserData();
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  height: 476px;
  overflow-y: scroll;
  .content-sub {
    padding: 20px 20px;
  }
}
.userName {
  height: 40px;
  line-height: 40px;
  padding-left: 30px;
  margin-bottom: 8px;
}
.user-role {
  line-height: 18px;
  height: 18px;
  color: #282828;
  font-size: 18px;
}
.fromDiv {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.headerTop {
  width: 100%;
  height: 104px;
  display: flex;
  background: #ffffff;
  & > div {
    display: flex;
    align-items: center;
  }
}
.register-content {
  padding-left: 34px;
  width: 100%;
  height: auto;
  overflow: hidden;
  padding-top: 14px;

  .register-content-sub {
    background-color: white;
    width: 700px;
    // padding: 0 30px;
    box-sizing: border-box;
    margin: 0px;
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
    /deep/ .input-item .ivu-form-item {
      margin-bottom: 20px;
      background: red;
    }
  }
}
.iput-normal {
  /deep/ .ivu-form-item {
    margin-left: 50px !important;
  }
}

/deep/ .input-item .ivu-form-item-content {
  width: 270px;
  line-height: 38px;
}
/deep/ .input-item-check-box .ivu-form-item-content {
  width: 620px;
  line-height: 38px;
}
.input-item-check-box {
  height: 30px;
}
.input-item-check-box-not-bottom {
  margin-bottom: 0px;
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
.changjing {
  display: flex;
  width: auto;
  justify-content: space-between;
}
</style>
