// 登录页面
<template>
  <div id="login">
    <particles></particles>
    <div class="register">
      <Card class="cardBox">
        <div id="head">
          <img src="../../../static/images/fly-b.png" alt />
          <h1>Small Talk</h1>
        </div>
        <Form ref="logInfo" :model="logInfo" :rules="logInfoRules">
          <FormItem prop="mobile">
            <Input type="text" v-model="logInfo.mobile" placeholder="请输入账号">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="passwd">
            <Input type="password" v-model="logInfo.passwd" placeholder="请输入密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="login" style="width:100%">登录</Button>
          </FormItem>
        </Form>
        <div id="foot">
          <p>
            没有账号？
            <a href="http://localhost:80/#/">立即注册</a>
          </p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import particles from "../../components/particles/particles";
import register from "../register/register";
import homepage from "../homepage/homepage";
import router from "../../router";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      // 登录信息
      logInfo: {
        mobile: "18539474047",
        passwd: "4047"
      },
      user: {},
      // 登录验证规则
      logInfoRules: {
        mobile: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    particles,
    register,
    homepage
  },
  methods: {
    //  ...mapMutations(['changeLogin']),
    // 点击登录按钮出发的事件
    login() {
      // 先判断注册时填写的表单是否填写及是否按要求填写
      this.$refs.logInfo.validate(async valid => {
        if (!valid) return;
        // 发起axios请求（传递注册的信息，并获取接口返回的账号信息）
        this.$axios
          .post(
            "/user/login",
            qs.stringify({
              mobile: this.logInfo.mobile,
              passwd: this.logInfo.passwd
            })
          )
          .then(res => {
            if (res.data.code === 0) {
              this.user = res.data.data;
              console.log(res.data.data);
              //更新userInfo
              this.$store.commit("setuserInfo", this.user);
              this.$Message["success"]({
                background: true,
                content: "登陆成功，即将跳转..."
              });
              this.$router.push("/chat");
            } else {
              this.$Message["error"]({
                background: true,
                content: "请检查账号和密码是否正确！"
              });
            }
            // console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  }
};
</script>

<style  scoped>
.cardBox {
  width: 350px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#head {
  display: flex;
  margin-bottom: 10px;
  height: 60px;
  /* background-color: #000; */
}
#head img {
  width: 60px;
  border-radius: 50%;
  margin-left: 50px;
}
#head h1 {
  margin-left: 10px;
  line-height: 60px;
}
#foot p {
  margin-left: 50%;
}
</style>