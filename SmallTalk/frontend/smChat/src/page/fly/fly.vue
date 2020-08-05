<template>
  <div class="fly">
    <div class="about">
      <div class="btnGrop">
        <Button type="success" shape="circle" @click="pick">捡飞机</Button>
        <Button type="warning" shape="circle" @click="out">掷飞机</Button>
      </div>
    </div>
		 <!-- 掷飞机弹框 -->
    <Modal v-model="sendDialogVisible" title="掷飞机" @on-ok="ok" @on-cancel="cancel">
      <Form :model="sendForm" :label-width="50" ref="sendFormRef">
        <FormItem label="内容" prop="content">
          <Input
            v-model="sendForm.content"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 4}"
            placeholder="写下你想说的话吧~"
          ></Input>
        </FormItem>
      </Form>
    </Modal>
		<!-- 捡飞机弹框 -->
  </div>
</template>

<script>
import anonymous from "../../components/anonymous/anonymous";
import vText from "../../components/text/text";
export default {
  data() {
    return {
			// 控制掷飞机弹框的消失与隐藏
			sendDialogVisible:false,
			// 掷飞机时填写的内容对象
			sendForm:{}
		};
  },
  components: {
    anonymous,
    vText
  },
  methods: {
    // 扔飞机
    out() {
     this.sendDialogVisible = true
		},
		 // 扔飞机的确定事件触发的函数
    ok() {
      this.$Message.info("Clicked ok");
      this.$refs.sendFormRef.resetFields();
    },
    // 扔飞机的取消事件触发的函数
    cancel() {
      this.$Message.info("Clicked cancel");
      this.$refs.sendFormRef.resetFields();
    },
    // 捡飞机
    pick() {
      this.$Message.info({
        content: "您已成功捡到一个飞机，赶快在右侧开启匿名聊天吧~",
        duration: 3
      });
    },
  }
};
</script>

<style  scoped>
.fly {
  display: flex;
  height: 100%;
  width: 800px;
  background-image: url("../../../static/images/flybg.jpg");
  background-size: 800px 100%;
}
.about {
  width: 240px;
  background-size: 240px 100%;
  background-repeat: no-repeat;
  overflow: hidden;
  padding: 35px;
}
.anonymous {
  flex: 1;
}
</style>