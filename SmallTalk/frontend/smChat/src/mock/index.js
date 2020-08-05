const Mock = require('mockjs')
// 将register相关的处理回调引入
import { register } from './register'
import {login} from "./login"
import {postList} from "./postList"
import {image} from "./image"
// 配置拦截匹配规则和处理回调
Mock.mock(/\/register/, register)
Mock.mock(/\/login/, login)
Mock.mock(/\/postList/, postList)
Mock.mock(/\/image/, image)