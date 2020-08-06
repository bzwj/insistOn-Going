<!-- 最左边的选择框 -->
<template>
  <div class="mycard">
    <!-- 头像 -->
    <header>
	  <img :src="userInfo.avatar" class="avatar" />
    </header>
    <!-- 左边菜单 -->
    <div class="navbar" @click="clearSearch">
      <router-link to="/chat" class="icon iconfont icon-5"></router-link>
	  <router-link to="/groupchat" class="icon iconfont icon-qun"></router-link>
      <router-link to="/friend" class="icon iconfont icon-friend"></router-link>
      <!-- <router-link to="/square" class="icon iconfont icon-friend1"></router-link> -->
      <router-link to="/my" class="icon iconfont icon-foundationinfo"></router-link>
    </div>
    <!-- 退出按钮 -->
    <footer>
      <Tooltip content="退出" placement="top" theme="light">
        <Icon type="md-power" size="24" @click="exit" />
      </Tooltip>
    </footer>
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
export default {
  computed: {
    // 获取当前用户
	...mapState(["userInfo"])
  },
  methods: {
    clearSearch() {
      // this.$store.dispatch("search", "");
    },
    // 点击退出按钮，返回到登陆页面
    exit() {
			this.$router.push("/login");
			this.$store.commit('setuserInfo','');//更新userInfo
	}
  }
};
</script>

<style lang="stylus" scoped>
@import '../../assets/font_1768975_xnq5eiy03en/iconfont.css';

.mycard {
  position: relative;
  width: 100%;
  height: 100%;


  .avatar {
    width: 36px;
    height: 36px;
    margin: 20px 12px 0 12px;
    border-radius: 2px;
  }

  .navbar {
    width: 100%;
    text-align: center;
  }

  .icon {
    display: inline-block;
    font-size: 26px;
    margin-top: 28px;
    padding: 0 16px;
    box-sizing: border-box;
    color: rgb(173, 174, 175);
    opacity: 0.8;
    cursor: pointer;

    &.active {
      color: rgb(0, 220, 65);
    }

    &:hover {
      opacity: 1;
    }
  }
}

footer {
  position: absolute;
  bottom: 5px;
  width: 100%;
  text-align: center;
}
</style>
