<script setup>
import { useAuthenticationStore } from './stores/authentication';

const authentication = useAuthenticationStore();

</script>

<template>
<header>
    <span v-if="authentication.state.isSigned">
        {{ authentication.state.signedUser.nm }}님 환영합니다.
    </span>
    <router-link to="/signup">회원가입</router-link>
    <router-link to="/signin">로그인</router-link>
    <router-link to="/board/write">글쓰기</router-link>
</header>
<main>
    <router-view />
</main>
</template>

<style scoped>

</style>