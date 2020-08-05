<!-- 文本输入框 -->
<template>
  <div class="text">
    <div class="emimg">
      <!-- 表情包 -->
      <div class="emoji">
        <!-- 文本框表情包小图片，点击显示表情包(再次点击小表情和文本表情包消失) -->
        <i class="icon iconfont icon-smile" @click="showEmoji=!showEmoji"></i>
        <!-- vue中的transition 组件 条件渲染(使用 v-if) 条件展示(使用 v-show) -->
        <transition name="showbox">
          <!-- 表情包以li标签的形式展示 -->
          <div class="emojiBox" v-show="showEmoji">
            <li v-for="(item, index) in emojis" :key="index">
              <img :src="'static/emoji/'+item.file" :data="item.code" @click="content +=item.code" />
            </li>
          </div>
        </transition>
      </div>
      <div class="img">
        <i class="icon iconfont icon-GIF" @click="showImg=!showImg"></i>
        <transition name="showbox">
          <!-- 图片包以li标签的形式展示 -->
          <div class="imgBox" v-show="showImg">
            <li v-for="(item, index) in gifs" :key="index" class="imgli">
              <!-- <img  :src="'static/gif/'+item.file" :data="item.file" @click="content += '<img src=\' '+'static/gif/'+item.file+' \'>'" /> -->
              <img :src="'static/gif/'+item.file" :data="item.file" @click="content +=item.file" />
            </li>
          </div>
        </transition>
      </div>
    </div>

    <!-- 文本区域 -->
    <textarea ref="text" v-model="content" @keyup="onKeyup" @click="showEmoji=false,showImg=false"></textarea>
    <!-- 发送按钮 发送消息|验证消息是否为空-->
    <div class="send" @click="send">
      <span>发送(ent)</span>
    </div>
    <!-- 点击发送按钮,且消息为空时,给出提示(时长1秒) -->
    <transition name="appear">
      <div class="warn" v-show="warn">
        <div class="description">不能发送空白信息</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      // 保存文本区域输入的内容
      content: "",
      // reply: "未找到",
      // 记录发送空白信息的频率,几次空白给几次提示(间隔1s)
      frequency: 0,
      // 控制"不能发送空白信息"的显示与隐藏
      warn: false,
      // 控制表情包的显示与隐藏
      showEmoji: false,
      // 控制图片包的显示与隐藏
      showImg: false,
      messages: []
    };
	},
	created(){
		console.log(this.selectId)
	},
  // computed用来监控自己定义的变量，该变量不在data里面声明，直接在computed里面定义，
  // 然后就可以在页面上进行双向数据绑定展示出结果或者用作其他处理
  // mapState在store.js中的State中获取当前选择的是那个对话以及表情包
  // mapState在store.js中的Getters中获取选择是哪个对话匹配相应的对话
  computed: {
    ...mapState(["selectId", "emojis", "gifs", "userInfo", "chatlist"]),
    ...mapGetters(["selectedChat"])
  },
  methods: {
    initwebsocket: function() {
      var url =
        "ws://" +
        location.host +
        ":8080/chat?id=" +
        this.$store.state.userInfo.id +
        "&token=" +
        this.$store.state.userInfo.token;
			this.webSocket = new WebSocket(url);
			// 通过 onmessage 事件来接收服务器返回的数据
      this.webSocket.onmessage = function(evt) {
        if (evt.data.indexOf("}") > -1) {
					//这里处理接收到的消息
					console.log(evt.data)
          this.$store.dispatch("reciveMessage", JSON.parse(evt.data));
        } else {
          //心跳消息
          console.log("recv<==" + evt.data);
        }
      }.bind(this);
      this.webSocket.onclose = function(evt) {
        console.log(evt.data); //关闭websocket连接事件处理
      };
      this.webSocket.onerror = function(evt) {
        console.log(evt.data); //websocket错误处理
      };
    },

    // 按键 按回车键(13)发送信息
    onKeyup(e) {
      if (e.keyCode === 13) {
        this.send();
      }
    },
    // 点击发送按钮发送信息
    send() {
      // 判断当发送的内容少于1个符号的时候,给出提示"不能发送空白消息"并1s后消失
      if (this.content.length < 1) {
        this.warn = true;
        this.content = "";
        setTimeout(() => {
          this.warn = false;
        }, 1000);
      } else {
        // 输入文本框有值的话保存文本内容赋值给msg,发送消息时作为参数传递
        var msg = {
          dstid: this.selectId,
          // cmd用来判断消息类型：10（单聊）11（群聊）0（心跳）
          cmd: 10,
          userid: this.$store.state.userInfo.id,
          // media：1文本类型
          media: 1,
          content: this.content
        };
        console.log(msg);
        // 调取store.js中的sendMessage方法，提交msg参数
        // dispatch含有异步操作，存储
        this.$store.dispatch("sendMessage", msg);
        // 发送完消息清空文本框
				this.content = "";
				//通过 send() 方法来向服务器发送数据
        this.webSocket.send(JSON.stringify(msg));
        // 关闭表情包和动图
        this.showEmoji = false;
        this.showImg = false;
      }
    }
  },
  // 在进入的时候 聚焦输入框
  // mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
  mounted() {
    this.$refs.text.focus();
    // 初始化
    this.initwebsocket();
  },
  // 监测Vue实例上的数据变动
  // 如果对应一个对象，键是观察表达式，值是对应回调，值也可以是方法名，或者是对象，包含选项
  watch: {
    // 在选择其它对话的时候 聚焦输入框
    selectId() {
      setTimeout(() => {
        this.$refs.text.focus();
      }, 0);
    },
    // 当输入框中的值为空时 弹出提示  并在一秒后消失
    content() {
      if (this.content === "") {
        // 如果多次为输入内容点击发送，就提醒多次
        if (this.frequency === 0) {
          this.warn = true;
          this.frequency++;
          setTimeout(() => {
            this.warn = false;
          }, 1000);
        }
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../assets/font_1768975_xnq5eiy03en/iconfont.css';

.text {
  position: relative;
  height: 150px;
  background: #fff;

  .emimg {
    display: flex;
    justify-content: flex-start;

    .emoji {
      position: relative;
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      padding: 0 10px;
      box-sizing: border-box;
      color: #7c7c7c;

      .emojiBox {
        position: absolute;
        display: flex;
        flex-wrap: wrap;
        top: -210px;
        left: -100px;
        width: 300px;
        height: 200px;
        padding: 5px;
        background-color: #fff;
        border: 1px solid #d1d1d1;
        border-radius: 2px;
        box-shadow: 0 1px 2px 1px #d1d1d1;

        &.showbox-enter-active, &.showbox-leave-active {
          transition: all 0.5s;
        }

        &.showbox-enter, &.showbox-leave-active {
          opacity: 0;
        }
      }
    }

    .img {
      height: 40px;
      line-height: 40px;

      .imgBox {
        position: absolute;
        display: flex;
        flex-wrap: wrap;
        top: -210px;
        left: -100px;
        width: 300px;
        height: 200px;
        background-color: #fff;
        border: 1px solid #d1d1d1;
        border-radius: 2px;
        box-shadow: 0 1px 2px 1px #d1d1d1;
        overflow-y: auto;

        .imgli {
          margin: 3px;

          img {
            width: 50px;
            height: 50px;
          }
        }
      }
    }
  }

  textarea {
    box-sizing: border-box;
    padding: 0 30px;
    height: 110px;
    width: 100%;
    border: none;
    outline: none;
    font-family: 'Micrsofot Yahei';
    resize: none;
  }

  .send {
    position: absolute;
    bottom: 10px;
    right: 30px;
    width: 75px;
    height: 28px;
    line-height: 28px;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    background: #f5f5f5;
    font-size: 14px;
    color: #7c7c7c;

    &:hover {
      background: rgb(18, 150, 17);
      color: #fff;
    }
  }

  .warn {
    position: absolute;
    bottom: 50px;
    right: 10px;
    width: 110px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    text-align: center;
    border: 1px solid #bdbdbd;
    border-radius: 4px;
    box-shadow: 0 1px 5px 1px #bdbdbd;

    &.appear-enter-active, &.appear-leave-active {
      transition: all 1s;
    }

    &.appear-enter, &.appear-leave-active {
      opacity: 0;
    }

    &:before {
      content: ' ';
      position: absolute;
      top: 100%;
      right: 20px;
      border: 7px solid transparent;
      border-top-color: #fff;
      filter: drop-shadow(1px 3px 2px #bdbdbd);
    }
  }
}
</style>
