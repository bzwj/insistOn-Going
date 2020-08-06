<!-- 搜索框 -->
<template>
  <div class="wrapper">
    <div class="search-wrapper">
      <!-- 输入框 当搜索框中文字输入完之后触发change事件-->
      <input type="text" class="searchInput" v-model="search" @keyup="change" placeholder="搜索" />
      <!-- 放大镜 如果搜索框中有文字不显示，无文字显示该放大镜-->
			<i class="icon iconfont icon-search" v-show="noText"></i>
			<!-- 删除 如果搜索框中有文字显示删除，无文字不显示-->
      <div class="searchInput-delete" v-show="haveText" @click="del"></div>
    </div>
  </div>
</template>

<script> 
export default {
  data() {
    return {
			// 用来存放搜索框中的值
      search: "",
      active: false
    };
  },
  computed: {
		// 放大镜是否显示的计算属性
    noText() {
      if (this.search === "") return true;
      return false;
		},
		// 删除是否显示的计算属性
    haveText() {
      if (this.search === "") return false;
      return true;
    }
  },
  methods: {
		// 文本框失去焦点时搜索（store.js中的search）,并将文本框中的内容作为参数传递
    change() {
      this.$store.dispatch("search", this.search);
		},
		// 搜索时，点击删除：清空搜索文本框内容，触发change事件
    del() {
      this.search = "";
      this.change();
    }
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
  padding: 22px 12px 12px 12px;
}

.search-wrapper {
  position: relative;
  display: flex;
  box-sizing: border-box;
  height: 26px;
  width: 100%;
  background-color: #e5e3e2;
  border: 1px solid #d9d7d6;
  border-radius: 2px;

  .searchInput {
    flex: 1;
    font-size: 12px;
    padding: 6px;
    background-color: #e5e3e2;
    outline: none;

    &:focus {
      background-color: #f2efee;
    }
  }

  .icon-search {
    display: inline-block;
    width: 24px;
    height: 24px;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
  }

  .searchInput-delete {
    display: block;
    position: absolute;
    outline: none;
    top: 0;
    right: 0;
    width: 24px;
    height: 100%;
    background-image: url('delete.png');
    background-size: 26px;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
  }
}
</style>
