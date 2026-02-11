<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import boardService from '@/services/boardService';
import { useAuthenticationStore } from '@/stores/authentication';


const authentication = useAuthenticationStore();
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

const delList = (async () => {
  if(!confirm('삭제하시겠습니까?')) { //아니오를 누르면 return을 만나서 메소드 종료, 예를 누르면 아래 코드를 실행
    return;
  }

  const params = { id:state.data.id };
  const result = await boardService.delList(params);
  console.log('result: ', result);

  if(result.resultData) {
    router.push('/board/list');
  } else {
      alert(result.resultMessage);
  }
})

const goToMod = () => {
    router.push({
        path: '/board/write',
        state: {
            data:{
                id: route.params.id, //문자열
                title: state.data.title,
                contents: state.data.contents
            }
            
        }
    })
}


</script>

<template>
<h3>게시판 디테일</h3>
  <div>번호: {{ state.data.id }}</div>
  <div>제목: {{ state.data.title }}</div>
  <div>내용: {{ state.data.contents }}</div>
  <div>작성일: {{ state.data.createdAt }}</div>
  <div>작성자: {{ state.data.nm }}</div>
  <div v-show="state.data.userId == authentication.state.signedUser.signedUserId">
      <button @click="delList">삭제</button>
      <button @click="goToMod">수정</button>
  </div>
</template>

<style scoped>

</style>