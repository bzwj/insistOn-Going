<!-- 聊天列表 -->
<template>
  <div class="msglist">
    <ul>
      <li v-for="item in chatlist" class="sessionlist" :class="{ active: item.id === selectId }" @click="selectSession(item.id)">
        <div class="list-left">
          <img class="avatar" width="42" height="42" :alt="item.nickname" :src="item.avatar" />
        </div>
        <div class="list-right">
          <p class="name">{{item.nickname}}</p>

          <!-- <span class="time">{{item.messages[item.messages.length-1].date | time}}</span>

          <p class="lastmsg">{{item.messages[item.messages.length-1].content}}</p>-->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import qs from "qs";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  created() {
    this.$axios
      .post(
        "/contact/loadfriend",
        qs.stringify({ userid: this.$store.state.userInfo.id })
      )
      .then(res => {
        // console.log(res.data.rows);
        if (res.data.code != 0) {
          return this.$Message.error(res.data.msg);
        } else {
          res.data.rows.map(row => {
            row.messages = row.messages ? row.messages : [];
          });
          this.chatlist = res.data.rows;
          this.$store.commit("updateChatList", this.chatlist);
          //this.$store.state.chatlist
          //   console.log(this.$store.state.chatlist)
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    // 得知当前选择的是哪个对话 输入的搜索值
    ...mapState(["selectId", "searchText", "userInfo"]),
    // 筛选出含有搜索值的聊天列表
    // ...mapGetters(["searchedChatlist"])
  },
  data() {
    return {
      chatlist: []
    };
  },
  methods: {
    // 得知用户当前选择的是哪个对话。便于匹配对应的对话框
    ...mapActions(["selectSession"])
  },
  // 过滤器
  filters: {
    // 将日期过滤为 hour:minutes
    time(date) {
      if (typeof date === "string") {
        date = new Date(date);
      }
      // getMinutes() 方法可返回时间的分钟字段。
      if (date.getMinutes() < 10) {
        // 分钟小于10时前面补0
        return date.getHours() + ":0" + date.getMinutes();
      } else {
        return date.getHours() + ":" + date.getMinutes();
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.msglist {
  height: 540px;
  overflow-y: auto;

  .sessionlist {
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

    .list-right {
      position: relative;
      flex: 1;
      margin-top: 4px;
    }

    .name {
      display: inline-block;
      vertical-align: top;
      font-size: 14px;
    }

    .time {
      float: right;
      color: #999;
      font-size: 10px;
      vertical-align: top;
    }

    .lastmsg {
      position: absolute;
      font-size: 12px;
      width: 130px;
      height: 15px;
      line-height: 15px;
      color: #999;
      bottom: 4px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
