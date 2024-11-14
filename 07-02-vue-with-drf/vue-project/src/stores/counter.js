import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useCounterStore = defineStore('counter', () => {
  const articles = ref([])
  const API_URL = 'http://127.0.0.1:8000'
  const token = ref(null)
  const router = useRouter()

  // DRF로 전체 게시글 요청을 보내고 응답을 받아 articles에 저장하는 함수
  const getArticles = function () {
    axios({
      method: 'get',
      url: `${API_URL}/api/v1/articles/`,
      headers: {
        Authorization: `Token ${token.value}`
      }
    })
      .then((res) => {
        // console.log(res.data)
        articles.value = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }
  
  // 회원 가입 요청 액션
  const signUp = (payload) => {
    // const username =payload.username
    // const password1 =payload.password1
    // const password2 =payload.password2
    // 구조 분해 할당(JS문법)을 이용한 코드 작성. 위 세 줄과 동일 코드
    const { username, password1, password2 } = payload

    axios({
      method: 'post',
      url: `${API_URL}/accounts/signup/`,
      data: {
        // 단축 객체 형식 사용(JS 문법)
        username, password1, password2
      }
    })
    .then((res) => {
      console.log(res)
      console.log('회원가입 성공')
      const password = password1  // 회원 가입 성공 후 자동으로 로그인 (48, 49 line)
      logIn({ username, password })
    })
    .catch((err) => console.log(err))
  }

  // 로그인 요청 액션
  const logIn = (payload) => {
    const { username, password } = payload
    axios({
      method: 'post',
      url: `${API_URL}/accounts/login/`,
      data: {
        username, password
      }
    })
    .then((res) => {
      console.log(res.data)
      console.log('로그인 성공')
      token.value = res.data.key
      router.push({ name: 'ArticleView' }) // router push를 이용해 로그인 후 메인페이지로 이동시킴
    })
    .catch((err) => console.log(err))
  }

  // 로그인 상태 확인 (토큰 유무 확인)
  const isLogin = computed(() =>{
    if (token.value === null) {
      return false
    } else {
      return true
    }
  })

  // 로그아웃 요청 액션
  const logOut = () => {
    axios({
      method: 'post',
      url: `${API_URL}/accounts/logout/`,
    })
    .then((res) => {
      console.log(res.data)
      token.value = null
      router.push({ name: 'ArticleView' })
    })
    .catch((err) => console.log(err))
  }
  return { articles, API_URL, getArticles, signUp, logIn, token, isLogin, logOut }
}, { persist: true })
