<!-- 好友列表 -->
<template>
  <div class="friendlist">
    <ul>
			<!--遍历好友列表 每个item添加上边框 第一个元素无上边框 initial:新朋友 也没有上边框  -->
      <li v-for="item in searchedFriendlist" class="frienditem" :class="{ noborder: !item.initial}">
        <!-- 有新朋友时展示新朋友 -->
				<div class="list_title" v-if="item.initial">{{item.initial}}</div>
        <!-- 没有新朋友时,显示好友信息 -->
				<div
          class="friend-info"
          :class="{ active: item.id === selectFriendId }"
          @click="selectFriend(item.id)"
        >
					<!-- 头像 -->
          <img class="avatar" width="36" height="36" :src="item.img" />
					<!-- 备注 -->
          <div class="remark">{{item.remark}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  computed: {
		//  得知当前选择的是哪个好友  输入的搜索值
		...mapState(["selectFriendId", "searchText"]),
		// 筛选出含有搜索值的好友列表
    ...mapGetters(["searchedFriendlist"])
  },
  methods: {
		// 得知用户当前选择的是哪个好友
    ...mapActions(["selectFriend"])
  }
};
</script>

<style lang="stylus" scoped>
.friendlist {
  height: 540px;
  overflow-y: auto;

  .frienditem {
    border-top: 1px solid #dadada;

    &:first-child, &.noborder {
      border-top: none;
    }

    .list_title {
      box-sizing: border-box;
      width: 100%;
      font-size: 12px;
      padding: 15px 0 3px 12px;
      color: #999;
    }

    .friend-info {
      display: flex;
      padding: 12px;
      transition: background-color 0.1s;
      font-size: 0;

      &:hover {
        background-color: rgb(220, 220, 220);
      }

      &.active {
        background-color: #c4c4c4;
      }

      .avatar {
        border-radius: 2px;
        margin-right: 12px;
      }

      .remark {
        font-size: 14px;
        line-height: 36px;
      }
    }
  }
}
</style>
