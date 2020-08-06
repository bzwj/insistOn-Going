package main

import (
	"chat/app/controller"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/chat", controller.Chat)                               //聊天功能
	http.HandleFunc("/user/login", controller.UserLogin)                    //用户登录
	http.HandleFunc("/user/register", controller.UserRegister)              //用户注册
	http.HandleFunc("/user/updateinfo", controller.UpdateInfo)              //更新个人信息
	http.HandleFunc("/contact/loadfriend", controller.LoadFriend)           //加载好友列表
	http.HandleFunc("/contact/loadcommunity", controller.LoadCommunity)     //加载群聊列表
	http.HandleFunc("/contact/addfriend", controller.AddFriend)             //添加好友
	http.HandleFunc("/contact/createcommunity", controller.CreateCommunity) //创建群聊
	http.HandleFunc("/contact/joincommunity", controller.JoinCommunity)     //加入群聊

	//提供静态资源目录支持
	http.Handle("/resource/", http.FileServer(http.Dir(".")))
	log.Fatal(http.ListenAndServe(":8080", nil))
}
