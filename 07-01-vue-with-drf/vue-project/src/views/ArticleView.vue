<template>
  <div>
    <h1>Article Page</h1>
    <RouterLink :to="{ name: 'CreateView' }">CREATE</RouterLink>
    <ArticleList />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCounterStore } from '@/stores/counter';
import ArticleList from '@/components/ArticleList.vue';
import { RouterLink } from 'vue-router';

const store = useCounterStore()
// Lifecycle Hook
onMounted(() => {
  // mount 되기 전에 store에 있는 전체 게시글 요청 함수(store.getArticles)를 호출
  store.getArticles()
})
</script>

<style>

</style>
