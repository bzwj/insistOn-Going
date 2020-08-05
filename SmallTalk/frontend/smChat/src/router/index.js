import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login/login.vue'
import home from '@/page/homepage/homepage.vue'

Vue.use(Router)

const routes = [
  {
    // 注册页面
    path: '/',
    component: require('@/page/register/register.vue')
  },
  
  {
    // 登录页面
    path: '/login',
    component: login
  },
  {
    //首页
    path: '/homepage',
		component: home,
		children:[
			{
				// 单聊页面
				path: '/chat',
				component: require('@/page/chat/chat.vue')
			},
			{
				// 群聊页面
				path: '/groupchat',
				component: require('@/page/groupchat/groupchat.vue')
			},
			{
				// 好友列表页
				path: '/friend',
				component: require('@/page/friend/friend.vue')
			},
			{
				// 个人资料
				path: '/my',
				component: require('@/page/resume/resume.vue')
			},
			{
				// 广场
				path: '/square',
				component: require('@/page/square/square.vue')
			},
		]
  },
]
const router = new Router({
  routes,
  linkActiveClass: 'active'
})
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
// 	// to将要访问的路径  from代表从哪个路径来  next是一个函数，表示放行
// 	// next()放行    next('/login')强制跳转
//   // 如果要访问的路径是登录页，直接放行
// 	  if (to.path === '/login') {
// 	    next();
// 	  } else {
// 	    let token = localStorage.getItem('Authorization');	
// 	    if (token === 'null' || token === '') {	
// 	      next('/login');	
// 	    } else {	
// 	      next();	
// 	    }	
// 	  }	
// 	});
// 每次刷新都会跳转到此路由
// router.push({ path: '/login' });
export default router