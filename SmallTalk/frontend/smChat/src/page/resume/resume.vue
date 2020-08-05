<!-- 个人信息 -->
<template>
  <div class="Info-wrapper">
    <div class="friendInfo">
      <div class="esInfo">
        <div class="left">
          <div class="people">
            <!-- 昵称 -->
            <div class="nickname">{{userInfo.nickname}}</div>
            <!-- 性别 根据获取到的值动态展示 w是女m是男-->
            <div class="sex">
              <div v-show="userInfo.sex == 'W'">
                <img src="./woman.png" alt />
              </div>
              <div v-show="userInfo.sex == 'M'">
                <img src="./man.png" alt />
              </div>
            </div>
          </div>
          <!-- 个性签名 -->
          <div class="signature">{{userInfo.memo}}</div>
        </div>
        <div class="right">
          <!-- 头像 -->
          <img class="avatar" width="60" height="60" :src="userInfo.avatar" />
        </div>
      </div>
      <div class="detInfo">
        <div class="wxid">
          <span>账号</span>
          {{userInfo.mobile}}
        </div>
      </div>
      <div class="edit">
        <Button type="success" @click="showEditDialog(userInfo.mobile)">修改资料</Button>
      </div>
    </div>
    <!-- 修改信息弹框 -->
    <Modal v-model="editDialogVisible" title="修改资料" footer-hide>
      <Form ref="editFormRef" :model="editForm" :rules="editFormRules" :label-width="80">
        <FormItem label="昵称" prop="nickname">
          <Input v-model="editForm.nickname" :placeholder="userInfo.nickname"></Input>
        </FormItem>
        <FormItem label="性别" prop="sex">
          <RadioGroup v-model="editForm.sex">
            <Radio label="W">Female</Radio>
            <Radio label="M">Male</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="个人简介" prop="memo">
          <Input
            v-model="editForm.memo"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 3}"
            :placeholder="userInfo.memo"
          ></Input>
        </FormItem>
        <div class="addfooter">
          <Button style="marginRight:10px;" @click="editCancel">取消</Button>
          <Button type="success" @click="editConfirm">确定</Button>
        </div>
      </Form>
    </Modal>
  </div>
</template>


<script>
import qs from "qs";
import { mapState } from "vuex";
export default {
  data() {
    return {
      //控制修改信息弹框的消失与隐藏
      editDialogVisible: false,
      //查询到的用户信息对象
      editForm: {},
      // 修改用户的表单验证规则
      editFormRules: {
        nickname: [
          {
            required: true,
            message: "请设置昵称",
            trigger: "blur"
          }
        ],
        sex: [
          {
            required: true,
            message: "请设置性别",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    // 点击修改资料，显示弹框
    showEditDialog() {
      this.editDialogVisible = true;
    },
    // 取消修改
    editCancel() {
			this.editDialogVisible = false;
			this.$refs.editFormRef.resetFields();
    },
    // 确认修改资料
    editConfirm() {
      this.$axios
        .post(
          "/user/updateinfo",
          qs.stringify({
            mobile: this.$store.state.userInfo.mobile,
            nickname: this.editForm.nickname,
            memo: this.editForm.memo,
            sex: this.editForm.sex
          })
        )
        .then(res => {
          if (res.data.code !== 0) {
            return this.$Message.error("修改失败");
          } else {
						// console.log(res.data)
						this.editDialogVisible = false;
						this.$store.commit("setuserInfo", res.data.data);
						 this.$refs.editFormRef.resetFields();
            return this.$Message.success("修改成功");
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
.newfriend {
  height: 60px;
  padding: 28px 0 0 30px;
  box-sizing: border-box;
  border-bottom: 1px solid #e7e7e7;

  .nickname {
    font-size: 18px;
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

      .sex {
        display: inline-block;
        vertical-align: top;

        img {
          width: 18px;
        }
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

  .area, .wxid {
    font-size: 14px;
    margin-top: 20px;

    span {
      font-size: 14px;
      color: rgba(153, 153, 153, 0.8);
      margin-right: 40px;
    }
  }
}

.send {
  position: relative;
  text-align: center;
  width: 140px;
  height: 36px;
  top: 50px;
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

