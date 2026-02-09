<script setup>
import userService from './services/userService';
import { useAuthenticationStore } from './stores/authentication';

const authentication = useAuthenticationStore();

const doSignout = async () => {
    const result = await userService.signOut();
    console.log('result: ', result);
    console.log('typeof result.resultData: ', typeof result.resultData);
    if(result.resultData === 1) {
        authentication.signOut();
    } else {
        alert('로그아웃 실패!');
    }
}
</script>

<template>
<header>
    <router-link to="/" >홈</router-link>
    <router-link to="/board/list" >리스트</router-link>
    <div v-if="authentication.state.isSigned">
        {{ authentication.state.signedUser.nm }}님 환영합니다.
        <router-link to="/board/write">글쓰기</router-link>
        <a href="" @click.prevent="doSignout">로그아웃</a>
        <!--a태그는 기본적으로 href태그와 같이가야함 이게 있으면 클릭시 마우스커서가 손모양으로 바뀜-->
    </div>
    <div v-else>
        <router-link to="/signup" >회원가입</router-link>
        <router-link to="/signin">로그인</router-link>
    </div>
</header>
<main>
    <router-view />
</main>
</template>

<style scoped>

</style>