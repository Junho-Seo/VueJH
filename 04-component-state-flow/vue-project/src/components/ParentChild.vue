<template>
  <div>
    <p>{{ myMsg }}</p>
    <p>{{dynamicProps}}</p>
    <ParentGrandChild
      :my-msg="myMsg"
      @update-name="updateName"
    />
    <!-- <button @click="$emit('someEvent')">클릭</button> -->
    <button @click="buttonClick">클릭</button>
    <button @click="emitArgs">추가 인자 전달</button>
  </div>
</template>

<script setup>
import ParentGrandChild from '@/components/ParentGrandChild.vue';
// 2. 내려받은 props를 선언
// 네이밍 케이스가 다름에 주의(노션 참조 https://www.notion.so/bambi23/Vue_D5_Component-State-Flow-136b42ae3f6680c6982dc804d19c8caa?pvs=4)
// 2.1 '문자열 배열'을 사용한 선언
// defineProps(['myMsg'])

// 2.2 '객체'를 사용한 선언 (권장 방식)
// 객체의 속성값이 내려받는 데이터의 유효성 검사의 역할을 한다!
// 데이터 타입이 일치하지 않는 경우 콘솔에서 오류 확인 가능(출력은 된다)
defineProps({
  myMsg: String,
  dynamicProps: String,
})

// JS 쪽에서 props 데이터를 활용해야 하는 경우
// const props = defineProps({
//   myMsg: String,
// })
// console.log(props.myMsg) // 'message'

// emit 이벤트 선언 (권장 방식) (배열 방식과 객체 방식 존재)
// 배열 방식
const emit = defineEmits(['someEvent', 'emitArgs', 'updateName'])
const buttonClick = () => {
  emit('someEvent')
}
const emitArgs = () => {
  emit('emitArgs', 1, 2, 3)
}
const updateName = () => {
  emit('updateName')
}

</script>

<style scoped>

</style>
