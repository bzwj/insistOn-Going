import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
Vue.use(Vuex)

//获取当前时间
const now = new Date();
// VueX中的stste
const state = {
	// 对话好友列表
	chatlist: [
	],
	// 群聊列表
	grouplist: [
	],
	//当前登录用户信息：先去localStorage中获取数据
	userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
	//emoji表情
	emojis: [
		{ file: '100.gif', code: '/::)', title: '微笑', reg: /\/::\)/g },
		{ file: '101.gif', code: '/::~', title: '伤心', reg: /\/::~/g },
		{ file: '102.gif', code: '/::B', title: '美女', reg: /\/::B/g },
		{ file: '103.gif', code: '/::|', title: '发呆', reg: /\/::\|/g },
		{ file: '104.gif', code: '/:8-)', title: '墨镜', reg: /\/:8-\)/g },
		{ file: '105.gif', code: '/::<', title: '哭', reg: /\/::</g },
		{ file: '106.gif', code: '/::$', title: '羞', reg: /\/::\$/g },
		{ file: '107.gif', code: '/::X', title: '哑', reg: /\/::X/g },
		{ file: '108.gif', code: '/::Z', title: '睡', reg: /\/::Z/g },
		{ file: '109.gif', code: '/::\'(', title: '哭', reg: /\/::'\(/g },
		{ file: '110.gif', code: '/::-|', title: '囧', reg: /\/::-\|/g },
		{ file: '111.gif', code: '/::@', title: '怒', reg: /\/::@/g },
		{ file: '112.gif', code: '/::P', title: '调皮', reg: /\/::P/g },
		{ file: '113.gif', code: '/::D', title: '笑', reg: /\/::D/g },
		{ file: '114.gif', code: '/::O', title: '惊讶', reg: /\/::O/g },
		{ file: '115.gif', code: '/::(', title: '难过', reg: /\/::\(/g },
		{ file: '116.gif', code: '/::+', title: '酷', reg: /\/::\+/g },
		{ file: '117.gif', code: '/:--b', title: '汗', reg: /\/:--b/g },
		{ file: '118.gif', code: '/::Q', title: '抓狂', reg: /\/::Q/g },
		{ file: '119.gif', code: '/::T', title: '吐', reg: /\/::T/g },
		{ file: '120.gif', code: '/:,@P', title: '笑', reg: /\/:,@P/g },
		{ file: '121.gif', code: '/:,@-D', title: '快乐', reg: /\/:,@-D/g },
		{ file: '122.gif', code: '/::d', title: '奇', reg: /\/::d/g },
		{ file: '123.gif', code: '/:,@o', title: '傲', reg: /\/:,@o/g },
		{ file: '124.gif', code: '/::g', title: '饿', reg: /\/::g/g },
		{ file: '125.gif', code: '/:|-)', title: '累', reg: /\/:\|-\)/g },
		{ file: '126.gif', code: '/::!', title: '吓', reg: /\/::!/g },
		{ file: '127.gif', code: '/::L', title: '汗', reg: /\/::L/g },
		{ file: '128.gif', code: '/::>', title: '高兴', reg: /\/::>/g },
		{ file: '129.gif', code: '/::,@', title: '闲', reg: /\/::,@/g },
		{ file: '130.gif', code: '/:,@f', title: '努力', reg: /\/:,@f/g },
		{ file: '131.gif', code: '/::-S', title: '骂', reg: /\/::-S/g },
		{ file: '133.gif', code: '/:,@x', title: '秘密', reg: /\/:,@x/g },
		{ file: '134.gif', code: '/:,@@', title: '乱', reg: /\/:,@@/g },
		{ file: '135.gif', code: '/::8', title: '疯', reg: /\/::8/g },
		{ file: '136.gif', code: '/:,@!', title: '哀', reg: /\/:,@!/g },
		{ file: '137.gif', code: '/:!!!', title: '鬼', reg: /\/:!!!/g },
		{ file: '138.gif', code: '/:xx', title: '打击', reg: /\/:xx/g },
		{ file: '139.gif', code: '/:bye', title: 'bye', reg: /\/:bye/g },
		{ file: '142.gif', code: '/:handclap', title: '鼓掌', reg: /\/:handclap/g },
		{ file: '145.gif', code: '/:<@', title: '什么', reg: /\/:<@/g },
		{ file: '147.gif', code: '/::-O', title: '累', reg: /\/::-O/g },
		{ file: '153.gif', code: '/:@x', title: '吓', reg: /\/:@x/g },
		{ file: '155.gif', code: '/:pd', title: '刀', reg: /\/:pd/g },
		{ file: '156.gif', code: '/:<W>', title: '水果', reg: /\/:<W>/g },
		{ file: '157.gif', code: '/:beer', title: '酒', reg: /\/:beer/g },
		{ file: '158.gif', code: '/:basketb', title: '篮球', reg: /\/:basketb/g },
		{ file: '159.gif', code: '/:oo', title: '乒乓', reg: /\/:oo/g },
		{ file: '195.gif', code: '/:circle', title: '跳舞', reg: /\/:circle/g },
		{ file: '160.gif', code: '/:coffee', title: '咖啡', reg: /\/:coffee/g }
	],
	// 动图
	gifs: [
		{ file: 'tired.jpg' },
		{ file: '202003242127025685.gif' },
		{ file: '202003242140455510.gif' },
		{ file: '202004011932211249.gif' },
		{ file: '202004012113346535.gif' },
		{ file: '202004012312561218.gif' },
		{ file: '202004012312581678.gif' },
		{ file: '202004012337518452.gif' },
		{ file: '202004041938586573.gif' },
		{ file: '202004041942206327.gif' },
		{ file: '202004041942219928.gif' },
		{ file: '202004041942241082.gif' },
		{ file: '202004081819080590.gif' },
		{ file: '202004081834531521.gif' },
		{ file: 'ai.jpg' },
		{ file: 'baituo.jpg' },
		{ file: 'bao.gif' },
		{ file: 'go.jpg' },
		{ file: 'good.gif' },
		{ file: 'haha.gif' },
		{ file: 'hh.jpg' },
		{ file: 'ku.gif' },
		{ file: 'love.jpg' },
		{ file: 'lue.gif' },
		{ file: 'po.jpg' },
		{ file: 'safe.gif' },
		{ file: 'shuai.gif' },
		{ file: 'smile.gif' },
		{ file: 'thanks.jpg' },
	],
	// 得知当前选择的是哪个对话
	selectId: 0,
	// 得知当前选择的是哪个群聊
	selectgroupId: 0,
	// 得知当前选择的是哪个好友
	selectFriendId: 0,
}

const mutations = {
	// 保存用户登录信息
	setuserInfo(state, v) {
		//将传递的数据先保存到localStorage中
		localStorage.setItem('userInfo', JSON.stringify(v));
		// 之后才是修改state中的状态
		state.userInfo = v;
	},
	// 更改单聊列表信息
	updateChatList(state, payload) {
		state.chatlist = payload
	},
	// 更改群聊列表信息
	updateGroupList(state, payload) {
		state.grouplist = payload
	},
	// 从localStorage 中获取数据
	initData(state) {
		let data = localStorage.getItem('vue-chat');
		if (data) {
			state.chatlist = JSON.parse(data);
		}
	},
	// 得知用户当前选择的是哪个对话。便于匹配对应的对话框
	selectSession(state, value) {
		state.selectId = value
	},
	// 得知用户当前选择的是哪个对话。便于匹配对应的对话框
	selectgroupSession(state, value) {
		state.selectgroupId = value
	},
	// 发送信息
	sendMessage(state, msg) {
		let result = state.chatlist.find(session => session.id === state.selectId);
		if(!result)result={}
		if(!result.messages)result.messages=[];
		result.messages.push({
			content: msg.content,
			date: new Date(),
			self: true
		});
	},
	// 发送群信息
	sendgroupMessage(state, msg) {
		let result = state.grouplist.find(session => session.id === state.selectgroupId);
		if(!result)result={}
		if(!result.groupmessages)result.groupmessages=[];
		result.groupmessages.push({
			content: msg.content,
			date: new Date(),
			self: true
		});
	},
	//接收消息
	reciveMessage(state, msg) {
		let result = state.chatlist.find(session => session.id === msg.userid);
		if(!result)result={}
		if(!result.messages)result.messages=[];
		result.messages.push({
			content: msg.content,
			date: new Date(),
			self: false
		});
	},
	//接收群消息
	recivegroupMessage(state, msg) {
		let result = state.grouplist.find(session => session.id === msg.dstid);
		// 接收群消息的时候如果是自己发出的，不再接受！
		if(state.userInfo.id === msg.userid) {
			return
		}else{
			result.groupmessages.push({
				content: msg.content,
				date: new Date(),
				self: false,
				avatar:msg.avatar
			});
		}
		console.log(result)
		// if(!result)result={}
		// if(!result.groupmessages)result.groupmessages=[];
		// result.groupmessages.push({
		// 	content: msg.content,
		// 	date: new Date(),
		// 	self: false
		// });
	},
	// 选择好友后，点击发送信息。判断在聊天列表中是否有该好友，有的话跳到该好友对话。没有的话
	// 添加该好友的对话 并置顶
	send(state) {
		let result = state.friendlist.find(friend => friend.id === state.selectFriendId)
		let msg = state.chatlist.find(msg => msg.user.name === result.remark)
		if (!msg) {
			state.selectId = 1
			for (let i = 0; i < state.chatlist.length; i++) {
				state.chatlist[i].id++;
				state.chatlist[i].index++;
			}
			state.chatlist.unshift({
				id: 1,
				user: {
					name: result.remark,
					img: result.img
				},
				messages: [
					{
						content: '已经置顶聊天，可以给我发信息啦！',
						date: new Date()
					}
				],
				index: 1
			})
		} else {
			state.selectId = msg.index
			router.push({ path: '/chat' })
		}
	}
}
const getters = {
	chatlist(state) {
		return state.chatlist
	},
	// 通过当前选择是哪个对话匹配相应的对话
	selectedChat(state) {
		let session = state.chatlist.find(session => session.id === state.selectId);
		if(!session)session={}
		return session
	},
	selectedgroupChat(state) {
		let session = state.grouplist.find(session => session.id === state.selectgroupId);
		if(!session)session={}
		return session
	},
	// 单聊的消息
	messages(state) {
		let session = state.chatlist.find(session => session.id === state.selectId);
		// if(!session)session={};
		// if(!session.messages)session.messages=[];
		return session.messages
	},
	// 群聊的消息
	groupmessages(state) {
		let session = state.grouplist.find(session => session.id === state.selectgroupId);
		// if(!session)session={};
		// if(!session.messages)session.messages=[];
		return session.groupmessages
	},
}
// 提交的是 mutation
const actions = {
	selectSession: ({ commit }, value) => commit('selectSession', value),
	selectgroupSession: ({ commit }, value) => commit('selectgroupSession', value),
	sendMessage: ({ commit }, msg) => commit('sendMessage', msg),
	reciveMessage: ({ commit }, msg) => commit('reciveMessage', msg),
	sendgroupMessage: ({ commit }, msg) => commit('sendgroupMessage', msg),
	recivegroupMessage: ({ commit }, msg) => commit('recivegroupMessage', msg),
	send: ({ commit }) => commit('send'),
	initData: ({ commit }) => commit('initData')
}

const store = new Vuex.Store({
	state,
	mutations,
	getters,
	actions
})

// 监听聊天列表的值， 发生变化就保存在localStorage中
store.watch(
	(state) => state.chatlist,
	(val) => {
		localStorage.setItem('vue-chat', JSON.stringify(val));
	},
	{
		deep: true
	}
)
export default store;
