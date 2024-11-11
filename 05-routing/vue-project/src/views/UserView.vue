<template>
  <div>
    <h1>UserView</h1>
    <RouterLink :to="{ name: 'user-profile'}">Profile</RouterLink>
    <RouterLink :to="{ name: 'user-posts'}">Posts</RouterLink>

    <h2>{{ $route.params }}번 유저 프로필 페이지</h2>
    <h2>{{ $route.params.id }}번 유저 프로필 페이지</h2>
    <!-- 권장 방식은 아래처럼 JS에서 route 객체 생성 후 변수 작성하여 이용 -->
    <h2>{{ userId }}번 유저 프로필 페이지</h2>
    <button @click="goHome">홈으로</button>
    <hr>
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { useRoute, RouterLink, RouterView, useRouter } from 'vue-router'
import { ref } from 'vue';

const route = useRoute()
const userId = ref(route.params.id)

const router = useRouter()
const goHome = function () {
  // router.push({name: 'home'})
  router.replace({name: 'home'})
}
</script>

<style scoped>

</style>