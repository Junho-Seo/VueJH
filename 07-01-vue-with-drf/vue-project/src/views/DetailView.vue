<template>
  <div>
    <h1>Detail</h1>
      <div v-if="article">
        <p>게시글 번호: {{ article.id }}</p>
        <p>제목: {{ article.title }}</p>
        <p>내용: {{ article.content }}</p>
        <p>작성일 : {{ article.created_at }}</p>
        <p>수정일 : {{ article.updated_at }}</p>
      </div>
  </div>
</template>

<script setup>
// ArticleView(메인페이지)와 마찬가지로 화면이 그려지기 전에 해당 게시글 요청을 먼저 하고 응답 받고 미리 세팅
// 즉, DetailView가 mounted 되기 전에 axios 요청을 보내며 시작해야 한다.
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { useRoute } from 'vue-router';

const store = useCounterStore()
const route = useRoute()
const article = ref(null)

// DetailView가 마운트 되기 전에 DRF로 단일 게시글 조회를 요청 후 응답데이터를 저장
onMounted(() => {
  axios.get(`${store.API_URL}/api/v1/articles/${route.params.id}`)
  .then((res) => {
    // console.log(res.data)
    article.value = res.data
  })
  .catch((err) => console.log(err))
})
</script>

<style>

</style>
