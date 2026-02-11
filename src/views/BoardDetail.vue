<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import boardService from '@/services/boardService';

const route = useRoute();
const router = useRouter();

const state = reactive({
    data: {
        id: 0,
        title: '',
        contents: '',
        createdAt: '',
        nm: '',
        userId: 0
    }
});

onMounted(async () => {
    const id = route.params.id; //PathVarialbe 받아서 id 상수에 담아주세요.
    state.data = await boardService.getBoard(id);
    console.log('id: ', id);
})


</script>

<template>
<h3>게시판 디테일</h3>
  <div>번호: {{ state.data.id }}</div>
  <div>제목: {{ state.data.title }}</div>
  <div>내용: {{ state.data.contents }}</div>
  <div>작성일: {{ state.data.createdAt }}</div>
  <div>작성자: {{ state.data.nm }}</div>
</template>

<style scoped>

</style>