<!-- 好友信息 -->
<template>
  <div class="Info-wrapper">
    <div class="newfriend">
      <div class="newhead">
        <div class="nickname">添加好友</div>
        <Button type="text" @click="addFriend">
          <Icon type="ios-add-circle-outline" size="24" color="green"/>
        </Button>
      </div>
    </div>
    <div class="newfriend">
      <div class="newhead">
        <div class="nickname">加入群聊</div>
        <Button type="text" @click="addgroup">
          <Icon type="ios-add-circle-outline" size="24" color="blue"/>
        </Button>
      </div>
    </div>
    <div class="newfriend">
      <div class="newhead">
        <div class="nickname">创建群聊</div>
        <Button type="text" @click="newgroup">
          <Icon type="ios-add-circle-outline" size="24" color="red"/>
        </Button>
      </div>
    </div>
    <!-- 添加好友弹框 -->
    <Modal v-model="addDialogVisible" footer-hide title="添加好友">
      <Form ref="addFormRef" :model="addForm" :rules="addFormRules" :label-width="80">
        <FormItem label="账号" prop="mobile">
          <Input v-model="addForm.mobile" placeholder="请输入要添加的好友账号"></Input>
        </FormItem>
        <div class="addfooter">
          <Button style="marginRight:10px;" @click="addcancel">取消</Button>
          <Button type="success" @click="addConfirm">确定</Button>
        </div>
      </Form>
    </Modal>
    <!-- 加入群聊弹框 -->
    <Modal v-model="addgroupDialogVisible" footer-hide title="加入群聊">
      <Form ref="addgroupFormRef" :model="addgroupForm" :rules="addgroupRules" :label-width="80">
        <FormItem label="群聊名称" prop="dstname">
          <Input v-model="addgroupForm.dstname" placeholder="请输入要添加的群聊名称"></Input>
        </FormItem>
        <div class="addfooter">
          <Button style="marginRight:10px;" @click="addgroupcancel">取消</Button>
          <Button type="success" @click="addgroupConfirm">确定</Button>
        </div>
      </Form>
    </Modal>
    <!-- 创建群聊弹框 -->
    <Modal v-model="newgroupDialogVisible" footer-hide title="创建群聊">
      <Form ref="newgroupFormRef" :model="newgroupForm" :rules="newgroupRules" :label-width="80">
        <FormItem label="群聊名称" prop="name">
          <Input v-model="newgroupForm.name" placeholder="请输入要创建的群聊名称"></Input>
        </FormItem>
        <FormItem label="群聊介绍" prop="memo">
          <Input v-model="newgroupForm.memo" placeholder="简单介绍一下你的群吧~"></Input>
        </FormItem>
        <div class="addfooter">
          <Button style="marginRight:10px;" @click="newgroupcancel">取消</Button>
          <Button type="success" @click="newgroupConfirm">确定</Button>
        </div>
      </Form>
    </Modal>
  </div>
</template>

<script>
import qs from "qs";
import router from "../../router";
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      // 控制添加好友弹框的显示与隐藏
      addDialogVisible: false,
      // 控制加入群聊弹框的显示与隐藏
      addgroupDialogVisible: false,
      // 控制创建群聊弹框的显示与隐藏
      newgroupDialogVisible: false,
      // 添加好友的表单对象
      addForm: {
        mobile: ""
      },
      // 添加好友的表单验证
      addFormRules: {
        mobile: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ]
      },
      // 加入群聊的表单对象
      addgroupForm: {
        // userid: "",
        dstname: ""
      },
      // 加入群聊的表单验证
      addgroupRules: {
        dstname: [
          {
            required: true,
            message: "请输入群聊名称",
            trigger: "blur"
          }
        ]
      },
      // 创建群聊的表单对象
      newgroupForm: {
        // userid: "",
        name: "",
        memo: ""
      },
      // 加入群聊的表单验证
      newgroupRules: {
        name: [
          {
            required: true,
            message: "请输入群聊名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    // this.geUserList();
  },
  computed: {
    // 通过当前选择是哪个好友匹配相应的好友
    ...mapGetters(["selectedFriend"]),
    ...mapState(["userInfo"])
  },
  methods: {
    // 点击发消息触发的事件
    send() {
      // 发起聊天
      this.$store.dispatch("send");
      this.$store.dispatch("search", "");
    },
    //点击添加好友
    addFriend() {
      this.addDialogVisible = true;
    },
    // 取消添加好友
    addcancel() {
      this.addDialogVisible = false;
    },
    // 确认添加好友
    addConfirm() {
      console.log(this.$store.state.userInfo.id);
      console.log(this.addgroupForm.dstname);
      this.$axios
        .post(
          "/contact/addfriend",
          qs.stringify({
            userid: this.$store.state.userInfo.id,
            dstname: this.addForm.mobile
          })
        )
        .then(res => {
          if (res.data.code !== 0) {
						return this.$Message.error(res.data.msg);
          } else {
						this.addDialogVisible = false;
						this.$router.push('/chat')
						return this.$Message.success(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //点击加入群聊
    addgroup() {
      this.addgroupDialogVisible = true;
    },
    // 取消加入群聊
    addgroupcancel() {
      this.addgroupDialogVisible = false;
    },
    // 确认加入群聊
    addgroupConfirm() {
      console.log(this.$store.state.userInfo.id);
      console.log(this.addgroupForm.dstname);
      this.$axios
        .post(
          "/contact/joincommunity",
          qs.stringify({
            userid: this.$store.state.userInfo.id,
            dstname: this.addgroupForm.dstname
          })
        )
        .then(res => {
          if (res.data.code !== 0) {
            return this.$Message.error(res.data.msg);
          } else {
						this.addgroupDialogVisible = false;
						this.$router.push('/groupchat')
						return this.$Message.success(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //点击创建群聊
    newgroup() {
      this.newgroupDialogVisible = true;
    },
    // 取消创建群聊
    newgroupcancel() {
      this.newgroupDialogVisible = false;
    },
    // 确认创建群聊
    newgroupConfirm() {
      console.log(this.$store.state.userInfo.id);
      console.log(this.newgroupForm.name);
      this.$axios
        .post(
          "/contact/createcommunity",
          qs.stringify({
            ownerid: this.$store.state.userInfo.id,
            name: this.newgroupForm.name,
            memo: this.newgroupForm.memo
          })
        )
        .then(res => {
          if (res.data.code !== 0) {
            return this.$Message.error(res.data.msg);
          } else {
						this.newgroupDialogVisible = false;
						this.$router.push('/groupchat')
						return this.$Message.success(res.data.msg);		
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.newfriend, .groupInfo {
  height: 60px;
  padding: 28px 0 0 30px;
  box-sizing: border-box;
  border-bottom: 1px solid #e7e7e7;

  .nickname, .groupname {
    font-size: 18px;
  }
}

.newhead {
  display: flex;

  .opt {
    margin-left: 10px;
    margin-top: -6px;
  }
}

.friendInfo {
  padding: 0 90px;
}

.esInfo {
  display: flex;
  align-items: center;
  padding: 100px 0 45px 0;

  .left {
    flex: 1;

    .people {
      .nickname {
        display: inline-block;
        font-size: 20px;
        margin-bottom: 16px;
      }

      .gender-male, .gender-female {
        display: inline-block;
        width: 18px;
        height: 18px;
        vertical-align: top;
        margin-top: 2px;
      }

      .gender-male {
        background-image: url('man.png');
        background-size: cover;
      }

      .gender-female {
        background-image: url('woman.png');
        background-size: cover;
      }
    }

    .signature {
      font-size: 14px;
      color: rgba(153, 153, 153, 0.8);
    }
  }

  .right {
    .avatar {
      border-radius: 3px;
    }
  }
}

.detInfo {
  padding: 40px 0;
  border-top: 1px solid #e7e7e7;
  border-bottom: 1px solid #e7e7e7;

  .remark, .area, .wxid {
    font-size: 14px;
    margin-top: 20px;

    span {
      font-size: 14px;
      color: rgba(153, 153, 153, 0.8);
      margin-right: 40px;
    }
  }

  .remark {
    margin-top: 0;
  }
}

.chatGroup {
  width: 300px;
  height: 350px;
  margin-top: 30px;
  margin-left: 90px;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow-y: scroll;
}

.groupBox {
  width: 60px;
  margin: 15px;
  height: 80px;
  text-align: center;
}

.newList {
  width: 300px;
  height: 500px;
  margin-left: 90px;
  padding: 10px;
  overflow-y: scroll;
}

.newBox {
  padding: 10px 0;
  border-bottom: 1px solid lightgray;
  display: flex;
}

.newname {
  margin-left: 10px;
  flex: 1;
}

.addlist {
  height: 350px;
  overflow-y: scroll;

  .peobox {
    height: 50px;
    display: flex;
    align-items: center;

    .addname {
      flex: 2;
      margin-left: 20px;
    }
  }
}

.send {
  position: relative;
  text-align: center;
  width: 140px;
  height: 36px;
  left: 115px;
  top: 30px;
  line-height: 36px;
  font-size: 14px;
  color: #fff;
  background-color: #1aad19;
  cursor: pointer;
  border-radius: 2px;

  &:hover {
    background: rgb(18, 150, 17);
  }
}

.addfooter {
  display: flex;
  justify-content: flex-end;
}
</style>

