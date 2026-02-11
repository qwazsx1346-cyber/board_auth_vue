<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

onMounted(() => {
    const id = route.params.id; //PathVarialbe 받아서 id 상수에 담아주세요.

    console.log('id: ', id);
})

const state = reactive({
    data: {

    }
})

const findById = (id) => {
    state.data;
}

</script>

<template>
<h3>게시판 디테일</h3>
</template>

<style scoped>

</style>