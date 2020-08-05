const Mock = require('mockjs')
const tid = Mock.mock({
	"number|10001-99999": 11000
});
Mock.mock('/api/register', 'post',tid)