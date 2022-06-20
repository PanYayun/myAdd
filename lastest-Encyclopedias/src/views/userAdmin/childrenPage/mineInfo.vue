<template>
  <div style="position: relative;">
    <div class="title_nav">我的资料</div>
    <div class="form_wrap" style="max-width: 600px">
      <Form
        :label-width="75"
        ref="formInline"
        :model="formInline"
        :rules="ruleInline"
        :hide-required-mark="true"
      >
        <Form-item
          :prop="item.key"
          v-for="(item, index) in userKey"
          :key="index"
          :label="item.label"
        >
          <Input
            type="text"
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
        </Form-item>
        <Form-item>
          <Button type="primary" @click="toModify('formInline')"
            >修改资料</Button
          >
        </Form-item>
      </Form>
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>

<script>
export default {
  name: "mineInfo",
  data() {
    return {
      spinShow: true,
      formInline: {
        email: "",
        mobile: "",
        gender: "",
        company: "",
        department: "",
        profession: "",
      },
      userKey: [
        {
          key: "email",
          placeholder: "请填写邮箱",
          label: "邮箱",
        },

        {
          key: "mobile",
          placeholder: "请输入联系方式",
          label: "联系方式",
        },
        {
          key: "gender",
          placeholder: "性别",
          label: "性别",
        },
        {
          key: "company",
          placeholder: "所在单位",
          label: "所在单位",
        },
        {
          key: "department",
          placeholder: "所在部门",
          label: "所在部门",
        },
        {
          key: "profession",
          placeholder: "专业",
          label: "专业",
        },
      ],
      ruleInline: {
        email: [
          {
            message: "请输入邮箱地址",
            required: true,
            trigger: "blur",
          },
          { type: "email", message: "请输入正确格式的邮箱", trigger: "blur" },
        ],
        mobile: [
          {
            message: "请输入联系方式",
            required: true,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    loadInfo() {
      this.$axios(
        "/users/get_user_profile",
        "post",
        this.$qs.stringify({
          username: this.$store.state.user.userInfo.username,
        })
      ).then((res) => {
        setTimeout(() => {
          this.spinShow = false;
        }, 300);
        console.log(res.data.data.email);
        this.formInline.email = res.data.data.email;
        this.formInline.mobile = res.data.data.mobile;
        this.formInline.gender = res.data.data.gender;
        this.formInline.company = res.data.data.company;
        this.formInline.department = res.data.data.department;
        this.formInline.profession = res.data.data.profession;
      });
    },
    toModify(value) {
      this.$refs[value].validate((valid) => {
        if (valid) {
          this.spinShow = true;
          var par = JSON.parse(JSON.stringify(this.formInline));
          par.username = this.$store.state.user.userInfo.username;
          this.$axios(
            "/users/update_user_profile",
            "post",
            this.$qs.stringify(par)
          ).then((res) => {
            if (res.data.code === 200) {
              this.$Message.success("修改成功！");
            } else {
              this.$Message.error(res.data.msg);
            }
            setTimeout(() => {
              this.spinShow = false;
            }, 200);
          });
        }
      });
    },
  },
  mounted() {
    this.loadInfo();
  },
};
</script>

<style scoped lang="less">
.form_wrap {
  padding-top: 40px;
}
/deep/ .ivu-input {
  height: 40px !important;
}
/deep/ .ivu-form-item-label {
  padding: 13px 12px 13px 0;
}
/deep/ .ivu-form-item-content {
  line-height: 39px;
}
</style>
