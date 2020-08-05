package util

import (
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
)

func AnalyR(r *http.Request) ([]byte, error) {
	if r.Body == nil {
		return nil, errors.New("The 'r.Body' is a null object")
	}
	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		return []byte{}, errors.New("Reading 'r.Body change []byte is err " + fmt.Sprint(err))
	}
	return b, err
}
