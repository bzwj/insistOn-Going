const Mock = require('mockjs')
let List = []
const count = 60

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    userid: "123456",
		userpw:'123456',
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
		sex: Mock.Random.integer(0, 1),
		img:Mock.Random.image('180x150', '#894FC4','中国加油'),
		content:Mock.mock('@cparagraph()')
  }))
}
Mock.mock('/api/login', 'post',List)