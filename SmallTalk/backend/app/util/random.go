package util

import (
	"math/rand"
	"strconv"
	"time"
)

func GenRandomNum() string {
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	num := r.Intn(100)
	return strconv.Itoa(num)
}

func RandomAvatar() string {
	num := GenRandomNum()
	str := "./resource/" + num + ".jpg"
	//fmt.Println(str)
	return str
}