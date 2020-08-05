package controller

import (
	"chat/app/model"
	"chat/app/service"
	"chat/app/util"
	"fmt"
	"net/http"
)

var UserService service.UserService

//用户注册
func UserRegister(writer http.ResponseWriter, request *http.Request) {
	var user model.User
	util.Bind(request, &user)
	avatar := util.RandomAvatar()
	user, err := UserService.UserRegister(user.Mobile, user.Passwd, user.Nickname, avatar, user.Sex, user.Memo)
	if err != nil {
		util.RespFail(writer, err.Error())
	} else {
		util.RespOk(writer, user, "")
	}
}

//用户登录
func UserLogin(writer http.ResponseWriter, request *http.Request) {
	request.ParseForm()

	mobile := request.PostForm.Get("mobile")
	plainpwd := request.PostForm.Get("passwd")

	//校验参数
	if len(mobile) == 0 || len(plainpwd) == 0 {
		util.RespFail(writer, "用户名或密码不正确")
	}
	loginUser, err := UserService.Login(mobile, plainpwd)
	if err != nil {
		util.RespFail(writer, err.Error())
	} else {
		util.RespOk(writer, loginUser, "")
	}
}

//更新个人资料
func UpdateInfo(writer http.ResponseWriter, request *http.Request) {
	var user model.User
	util.Bind(request, &user)
	fmt.Println("1", user.Mobile)
	fmt.Println("2", user.Nickname)
	fmt.Println("3", user.Memo)
	fmt.Println("4", user.Sex)
	updateUser, err := UserService.UpdateInfo(user.Mobile, user.Nickname, user.Memo, user.Sex)
	if err != nil {
		util.RespFail(writer, err.Error())
	} else {
		util.RespOk(writer, updateUser, "")
	}

}
