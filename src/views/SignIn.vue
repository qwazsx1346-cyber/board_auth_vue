<script setup>
import { reactive } from 'vue';
import userService from '@/services/userService';
import { useAuthenticationStore } from '@/stores/authentication';
import { useRouter } from 'vue-router';

const router = useRouter();

const authentication = useAuthenticationStore();

const state = reactive({
  modeShowPw: false,
  signin: {
    uid: 'qwqw',
    upw: '1234',
  },
});

const changeModeShowPw = () => {
    state.modeShowPw = !state.modeShowPw;
};

const signIn = async () => {
    const result = await userService.signIn(state.signin);
    console.log('result: ', result);

    if(result.resultData === null) { //로그인 실패
        alert( result.resultMessage );
        return;
    }

    authentication.signIn(result.resultData);
    alert('로그인에 성공하였습니다.');
    router.push('/');
};
</script>

<template>
  <h3>로그인</h3>
  <!-- type앞에 콜론(:)이 있어주어야 변수사용 가능. 없으면 그냥 하드코딩이 되어버림-->
  <div>
    <input type="text" placeholder="아이디" v-model="state.signin.uid" />
  </div>
  <div>
    <input
      :type="state.modeShowPw ? 'text' : 'password'"
      placeholder="비밀번호"
      v-model="state.signin.upw"
    />
    <button @click="changeModeShowPw">비밀번호 보기</button>
  </div>
  <div><button @click="signIn">로그인</button></div>
</template>

<style scoped></style>
