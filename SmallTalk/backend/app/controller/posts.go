package controller

import (
	"chat/app/service"
	"net/http"
)

var PostService service.PostService

//加载帖子
func LoadPosts(writer http.ResponseWriter, request *http.Request) {

}
