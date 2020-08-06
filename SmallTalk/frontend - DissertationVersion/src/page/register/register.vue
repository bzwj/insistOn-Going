// 注册页面
<template>
  <div id="app">
    <particles></particles>
    <div class="register">
      <Card class="cardBox">
        <div id="head">
          <img src="../../../static/images/fly-b.png" alt />
          <h1>Small Talk</h1>
        </div>
        <Form ref="regInfo" :model="regInfo" :rules="regInfoRules">
          <FormItem prop="mobile">
            <Input type="text" v-model="regInfo.mobile" placeholder="请填写手机号">
              <Icon type="ios-call-outline" slot="prepend" />
            </Input>
          </FormItem>
          <FormItem prop="passwd">
            <Input type="password" v-model="regInfo.passwd" placeholder="请设置密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="passwdr">
            <Input type="password" v-model="regInfo.passwdr" placeholder="请确认密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Input type="text" v-model="regInfo.memo" placeholder="请用一句话来介绍一下自己吧">
              <Icon type="ios-information" slot="prepend" />
            </Input>
          </FormItem>
          <FormItem prop="nickname">
            <Input type="text" v-model="regInfo.nickname" placeholder="为自己起一个好听的名字吧">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem label="性别">
            <RadioGroup v-model="regInfo.sex">
              <Radio label="M">Male</Radio>
              <Radio label="W">Female</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem>
            <Button type="success" @click="register" style="width:100%">注册</Button>
          </FormItem>
        </Form>
        <div id="foot">
          <p>
            已有账号？
            <a href="http://localhost:80/#/login">立即登录</a>
          </p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import particles from "../../components/particles/particles";
import login from "../login/login";
import qs from "qs"
export default {
  data() {
    return {
      // 注册信息
      regInfo: {
        mobile: "",
        passwd: "",
        passwdr: "",
        memo: "",
        avatar: "",
        sex: "male"
      },
      // 注册验证规则
      regInfoRules: {
        mobile: [{ required: true, message: "请填写正确的手机号", trigger: "blur" }],
        nickname: [{ required: true, message: "请设置昵称", trigger: "blur" }],
        passwd: [{ required: true, message: "请设置密码", trigger: "blur" }],
        passwdr: [{ required: true, message: "请再次输入密码", trigger: "blur" }]
      }
    };
  },
  components: {
    particles,
    login
  },
  methods: {
    // 点击注册按钮出发的事件
    register() {
      // 先判断注册时填写的表单是否填写及是否按要求填写
      this.$refs.regInfo.validate(async valid => {
        if (!valid) return;
        console.log(this.regInfo);
        this.$axios
					.post("/user/register",
					qs.stringify({
						mobile:this.regInfo.mobile,
						passwd:this.regInfo.passwd,
						passwdr:this.regInfo.passwdr,
						memo:this.regInfo.memo,
						avatar:this.regInfo.avatar,
						sex:this.regInfo.sex,
						nickname:this.regInfo.nickname,
						}) )
          .then(res => {
            console.log(res);
            if (res.data.code != 0) {
              return this.$Message.error(res.data.msg);
            } else {
              this.$router.push("/login");
              return this.$Message.success("注册成功，请登录");
            }
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
.user-header {
  position: relative;
  display: inline-block;
}
.user-header-com {
  width: 50px;
  height: 50px;
  display: inline-block;
}
.header-upload-btn {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  /* 通过定位把input放在img标签上面，通过不透明度隐藏 */
}
.tip {
  font-size: 14px;
  color: #666;
}
/* error是用于错误提示 */
.error {
  font-size: 12px;
  color: tomato;
  margin-left: 10px;
}

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
.ivu-form-item {
  margin-bottom: 20px;
}
</style>