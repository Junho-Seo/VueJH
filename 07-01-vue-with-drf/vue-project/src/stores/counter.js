import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCounterStore = defineStore('counter', () => {
  const articles = ref([])
  const API_URL = 'http://127.0.0.1:8000'

  // DRF로 전체 게시글 요청을 보내고 응답을 받아 articles에 저장하는 함수
  // navbar에서 Articles 링크를 눌렀을 때 메인 페이지로 이동
  // 메인페이지의 가장 상위 컴포넌트 => ArticleView.vue
  // ArticleView 컴포넌트가 화면에 렌더링 될 때 전체 게시글 get요청을 하며 시작해야한다.
  // axios는 비동기 요청이기 때문에 화면 렌더링이 먼저 진행되고 articles 배열이 나중에 채워진다.
  // 전체 게시글 렌더링 시점 전에 getArticles가 이미 호출되어 articles 배열을 채우고 시작하기 위해
  // onMounted를 이용한다 (Lifecycle hook 고려)
  const getArticles = () => {
    axios.get(`${API_URL}/api/v1/articles/`)
    .then(res => {
      // console.log(res.data)
      articles.value = res.data
    })
    .catch(err => console.log(err))
  }

  return { articles, API_URL, getArticles }
}, { persist: true })
