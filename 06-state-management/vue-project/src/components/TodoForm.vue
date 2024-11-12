<template>
  <div>
    <form @submit.prevent="createTodo(todoText)" ref="formElem">
      <input type="text" v-model="todoText">
      <input type="submit">
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCounterStore } from '@/stores/counter';

const store = useCounterStore()
const todoText = ref('')

// form 태그 선택 (null 값은 의미 x)
// ref 함수의 다른 역할(복습. 참고자료.)
const formElem = ref(null)

// 중앙 저장소의 addTodo 액션을 직접 호출(store.addTodo(todoText))해도 되지만
// 굳이 createTodo 메서드를 만들어 호출하는 이유는
// addTodo 호출 전후로 추가 로직을 작성할 수 있기 때문
// ex) text input 초기화 기능 추가
const createTodo = (todoText) => {
  store.addTodo(todoText)
  formElem.value.reset()
}

</script>

<style scoped>

</style>