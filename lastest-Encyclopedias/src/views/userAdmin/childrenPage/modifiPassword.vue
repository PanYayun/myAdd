<template>
    <div style="position: relative;">
        <div class="title_nav">
            修改密码
        </div>
        <div class="form_wrap" style="max-width: 600px;">
            <Form :label-width="75">
                <Form-item label="原密码">
                    <Input type="password" v-model="oldPassword" placeholder="请填写原密码" class="info_input"></Input>
                </Form-item>
                <Form-item label="新密码">
                    <Input type="password" v-model="newPassword" placeholder="请填写新密码" class="info_input"></Input>
                </Form-item>
                <Form-item label="确认密码">
                    <Input type="password" v-model="aginPassword" placeholder="请确认新密码" class="info_input"></Input>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="toModify()">修改密码</Button>
                    <!-- <Button style="margin-left: 10px;" @click="toHome()">暂时跳过</Button> -->
                </Form-item>
            </Form>
        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>

<script>
export default {
  name: 'modifiPassword',
  data() {
    return {
      spinShow: false,
      oldPassword: '',
      newPassword: '',
      aginPassword: '',
    };
  },
  methods: {
    // toHome() {
    //   this.$router.push("/home");
    // },
    toModify() {
      if (this.oldPassword.length <= 0) {
        this.$Message.error('请输入旧密码');
        return;
      }
      if (this.newPassword.length <= 0) {
        this.$Message.error('请输入新密码');
        return;
      }
      if (this.aginPassword.length <= 0) {
        this.$Message.error('请再次输入新密码');
        return;
      }
      if (this.aginPassword !== this.newPassword) {
        this.$Message.error('两次输入的密码不一样，请重新输入新密码');
        return;
      }
      var par = {};
      par.username = this.$store.state.user.userInfo.username;
      par.password_original = this.oldPassword;
      par.password_new = this.newPassword;
      this.spinShow = true;
      this.$axios(
        '/users/update_password',
        'post',
        this.$qs.stringify(par)
      ).then(res => {
        setTimeout(() => {
          this.spinShow = false;
        }, 300);
        console.log(res);
        if (res.data.code === 200) {
          this.$Message.success('密码修改成功');
        } else {
          this.$Message.error('无效的原始密码');
        }
      });
    },
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
