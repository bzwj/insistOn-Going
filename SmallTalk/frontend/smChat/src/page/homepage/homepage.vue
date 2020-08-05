 <template>
  <div class="home">
    <div class="sidebar">
      <mycard></mycard>
    </div>
    <div class="main">
      <router-view>
				<!-- <chatlist></chatlist> -->
			</router-view>
    </div>
  </div>
</template>
 <script>
import mycard from "../../components/mycard/mycard";
// import chatlist from "../../components/chatlist/chatlist";
import { mapActions } from "vuex";
export default {
  components: {
		mycard,
		// chatlist
  },
  created() {
    this.$store.dispatch("initData");
  }
};
</script>
<style scoped>
.home {
  display: flex;
  border-radius: 50px;
  margin:20px auto;
  width: 860px;
  height: 600px;
}

.sidebar {
  width: 60px;
  height: 600px;
  background: #2b2c2f;
}

.main {
  flex: 1;
  height: 600px;
  background: rgb(242, 242, 242);
}
</style>
