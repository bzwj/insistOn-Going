<template>
  <!-- 广场页面 -->
  <div class="square">
    <!-- 发表评论按钮 -->
    <div class="issue">
      <Button type="success" style="position:absolute;left:15px;bottom:0" @click="addIssue">
        发表动态
        <Icon type="ios-add-circle-outline" />
      </Button>
    </div>
    <div>
      <div class="postBox">
        <div class="post" v-for="(item,index) in postList" :key="index">
          <div class="info">
            <img class="avator" :src="item.img" alt style="width:36px;height:36px;" />
            <p class="name">{{item.name}}</p>
            <span class="time">{{item.time}}</span>
          </div>
          <div class="content">
            <p>{{item.content}}</p>
          </div>
          <List border size="small" v-for="(item2,index2) in commentList" :key="index2">
            <!-- <ListItem>{{item2.content}}</ListItem> -->
            <ListItem>
              <span>{{item2.user}}：</span>
              <p>{{item2.content}}</p>
            </ListItem>
          </List>
          <div class="oper">
            <div class="like" @click="likeClick(item)">
              <Icon v-if="!item.isLike" type="ios-heart-outline" size="24" />
              <Icon v-if="item.isLike" type="ios-heart" size="24" color="red" />
            </div>
            <div class="talk" @click="addCom">
              <Icon type="ios-create-outline" size="24" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 填写评论的弹框 -->
    <Modal v-model="comDialogVisible" title="添加评论" @on-ok="ok" @on-cancel="cancel">
      <Form :model="comForm" :label-width="50" ref="comFormRef">
        <FormItem label="内容" prop="content">
          <Input
            v-model="comForm.content"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 4}"
            placeholder="写下想对作者说的话吧"
          ></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- 发表动态的弹框 -->
    <Modal v-model="issueDialogVisible" title="发表动态" @on-ok="okis" @on-cancel="cancelis">
      <Form :model="issueForm" :label-width="50" ref="issueFormRef">
        <FormItem label="内容" prop="content">
          <Input
            v-model="issueForm.content"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 4}"
            placeholder="写下你此刻的心情吧~"
          ></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 文章
      postList: [],
      commentList: [
        { id: Date.now(), user: "李白", content: "天生我才必有用" },
        { id: Date.now(), user: "江小白", content: "劝君更进一杯酒" },
        { id: Date.now(), user: "小马", content: "我姓马，风吹草低见牛羊的马" }
      ],
      //控制填写评论弹框的消失与隐藏
      comDialogVisible: false,
      //发表评论的内容对象
      comForm: {},
      //控制发表动态弹框的消失与隐藏
      issueDialogVisible: false,
      //发表动态的内容对象
      issueForm: {}
    };
  },
  // 加载页面时就请求数据
  created() {
    this.getPostList();
  },
  methods: {
    getPostList() {
      // 发起axios请求（传递注册的信息，并获取接口返回的账号信息）
      this.$axios
        .post("/api/postlist")
        .then(res => {
          // console.log(res);
          // 赋值
          this.postList = res.data;
          console.log(this.postList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击喜欢
    likeClick(item) {
      item.isLike = !item.isLike;
    },
    // 发表评论的确定事件触发的函数
    ok() {
      // this.$Message.info("Clicked ok");
      console.log(this.comForm.content);
      this.commentList.push({ user: "我", content: this.comForm.content });
      this.$refs.comFormRef.resetFields();
    },
    // 发表评论的取消事件触发的函数
    cancel() {
      this.$Message.info("Clicked cancel");
      this.$refs.comFormRef.resetFields();
    },
    // 点击评论
    addCom() {
      this.comDialogVisible = true;
    },
    // 发表动态
    addIssue() {
      this.issueDialogVisible = true;
    },
    // 发表动态的确定按钮触发的事件
    okis() {
      // this.$Message.info("Clicked ok");
      this.postList.unshift({
        name: "我",
        img: "../../../static/images/UserAvatar.jpg",
        content: this.issueForm.content,
        time: (new Date(Date.now()).toLocaleString())
      });
      this.$refs.issueFormRef.resetFields();
    },
    // 发表动态的取消按钮触发的事件
    cancelis() {
      this.$Message.info("Clicked cancel");
      this.$refs.issueFormRef.resetFields();
    }
  },
  filters: {
    // 将日期过滤为 hour:minutes
    time(date) {
      if (typeof date === "string") {
        date = new Date(date);
      }
      if (date.getMinutes() < 10) {
        return date.getHours() + ":0" + date.getMinutes();
      } else {
        return date.getHours() + ":" + date.getMinutes();
      }
    }
  }
};
</script>

<style  scoped>
.square {
  height: 100%;
  width: 800px;
  display: flex;
  padding: 5px;
  background-image: url("../../../static/images/squarebg.png");
  background-size: 2000px 100%;
  font-weight: 300;
}
.issue {
  width: 150px;
  position: relative;
}
.postBox {
  width: 650px;
  height: 100%;
  overflow-y: auto;
  margin-left: 30px;
}
.post {
  border: 1px solid gray;
}
.info {
  padding: 20px 20px 6px 20px;
  display: flex;
}
.name {
  flex: 5;
  margin-left: 20px;
  height: 36px;
  line-height: 36px;
  font-size: 18px;
  font-weight: 500;
}
.time {
  height: 36px;
  line-height: 36px;
}
.content {
  padding: 10px;
}
.oper {
  width: 100%;
  display: flex;
  text-align: center;
  border-top: 1px solid gray;
}
.like {
  opacity: 0.6;
  flex: 1;
  border-right: 1px solid gray;
}
.talk {
  opacity: 0.6;
  flex: 1;
}
</style>