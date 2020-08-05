package main

import (
	"chat/app/controller"
	"log"
	"net/http"
)

//10行代码实现万能注册模版
//func registerView() {
//	tpl, err := template.ParseGlob(`C:\Alex\chat\app\view\**\*`)
//	if err != nil {
//		log.Fatal(err.Error())
//	}
//	for _, v := range tpl.Templates() {
//		tplName := v.Name()
//		http.HandleFunc(tplName, func(writer http.ResponseWriter, request *http.Request) {
//			tpl.ExecuteTemplate(writer, tplName, nil)
//		})
//	}
//}

func main() {
	http.HandleFunc("/user/login", controller.UserLogin)                    //用户登录
	http.HandleFunc("/user/register", controller.UserRegister)              //用户注册
	http.HandleFunc("/user/updateinfo", controller.UpdateInfo)              //更新个人信息
	http.HandleFunc("/contact/addfriend", controller.AddFriend)             //添加好友
	http.HandleFunc("/contact/loadfriend", controller.LoadFriend)           //加载好友列表
	http.HandleFunc("/contact/loadcommunity", controller.LoadCommunity)     //加载群聊列表
	http.HandleFunc("/contact/createcommunity", controller.CreateCommunity) //创建群聊
	http.HandleFunc("/contact/joincommunity", controller.JoinCommunity)     //加入群聊
	http.HandleFunc("/contact/loadposts", controller.LoadPosts)             //加载帖子
	http.HandleFunc("/chat", controller.Chat)                               //聊天页面
	http.HandleFunc("/attach/upload", controller.FileUpload)                //文件上传

	//提供静态资源目录支持
	http.Handle("/asset/", http.FileServer(http.Dir(".")))
	http.Handle("/resource/", http.FileServer(http.Dir(".")))
	log.Fatal(http.ListenAndServe(":8080", nil))
	//registerView()

	//server := http.Server{Addr: "127.0.0.1:8080"}
	//if err := server.ListenAndServe(); err != nil {
	//	fmt.Println("http server litening fail")
	//}
}
