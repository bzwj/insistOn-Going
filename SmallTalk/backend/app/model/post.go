package model

import "time"

type U struct {
	Id       int64     `xorm:"pk autoincr bigint(64)" form:"id" json:"id"`
	Mobile   string    `xorm:"varchar(20)" form:"mobile" json:"mobile"`
	Passwd   string    `xorm:"varchar(40)" form:"passwd" json:"-"` // 用户密码 md5(passwd + salt)
	Avatar   string    `xorm:"varchar(150)" form:"avatar" json:"avatar"`
	Sex      string    `xorm:"varchar(2)" form:"sex" json:"sex"`
	Nickname string    `xorm:"varchar(20)" form:"nickname" json:"nickname"`
	Salt     string    `xorm:"varchar(10)" form:"salt" json:"-"`
	Online   int       `xorm:"int(10)" form:"online" json:"online"`   //是否在线
	Token    string    `xorm:"varchar(40)" form:"token" json:"token"` //用户鉴权
	Memo     string    `xorm:"varchar(140)" form:"memo" json:"memo"`
	Createat time.Time `xorm:"datetime" form:"createat" json:"createat"` //创建时间, 统计用户增量时使用
}

type Post struct {
	Postid  int64  `xorm:"pk autoincr bigint(64)" form:"postid" json:"postid"` //帖子Postid - 自增主键
	Userid  int64  `xorm:"bigint(64)" form:"userid" json:"userid"`             //创建者id
	Content string `xorm:"varchar(140)" from:"content" json:"content"`         //帖子内容
	Author  string `xorm:"varchar(20)" form"author" json:"author"`             //帖子作者
	Liker   string `xorm:"var char(20)" form "liker" json:"liker"`             //点赞者
	Comment []Comment
}

type Comment struct {
	Commentid int    `xorm:"pk autoincr bigint(64)" form:"commentid" json:"commentid"` // 评论ID
	Content   string `xorm:"varchar(140)" from:"content" json:"content"`               //评论内容
	Author    string `xorm:"varchar(20)" form"author" json:"author"`                   //评论作者
	Post      *Post
}
