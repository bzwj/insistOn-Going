const Mock = require('mockjs')
let postList = []
const count = 10
for (let i = 0; i < count; i++) {
  postList.push(Mock.mock({
		img:Mock.Random.image('36x36', '#894FC4', '#FFF', 'png', '!'),
		name: Mock.Random.cname(),
		time:Mock.Random.now('yyyy-MM-dd HH:mm:ss'),
		content:Mock.mock('@cparagraph()'),
		isLike:false
  }))
}
Mock.mock('/api/postlist', 'post',postList)