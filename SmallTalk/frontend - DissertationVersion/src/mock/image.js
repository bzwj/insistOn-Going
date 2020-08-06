const Mock = require('mockjs')
let imgList = []
const count = 20
for (let i = 0; i < count; i++) {
  imgList.push(Mock.mock({
		img:Mock.Random.image('180x150', '#894FC4','中国加油'),
  }))
}
Mock.mock('/api/img', 'get',imgList)