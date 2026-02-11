<script setup>
import { reactive, onMounted, computed } from 'vue';
import boardService from '@/services/boardService';
import { useRouter } from 'vue-router';

const router = useRouter();

const state = reactive({
    list: [],
    searchText: '',
    size: 50,
    currentPage: 1,
    maxPage: 0
});

const getBoardMaxPage = async () => {
    const params = { size: state.size };
    if(state.searchText) {
        params.search_text = state.searchText;
    }
    const result = await boardService.getBoardMaxPage( params );
    state.maxPage = result.resultData;
}

const goToNowPage = async () => {
    const params = {
        page: state.currentPage,
        size: state.size
    };
    if(state.searchText) {
        params.search_text = state.searchText;
    }
    const result = await boardService.getBoardList( params );
    state.list = result.resultData;
}

onMounted( () => {
    doSearch();
});

const goToPage = async (page) => {
    state.currentPage = page;

    await goToNowPage();
    //window.scrollTo({
    //top: 0,
    //behavior: "smooth"
  //});
};

const doSearch = () => {
    state.currentPage = 1;
    getBoardMaxPage();
    goToNowPage();
}

const moveToDetail = id => {
    router.push({
        path: `/board/${id}`
    });
}


//페이징 그룹의 번호 갯수
const pageGroupSize = 10;
//현재 페이지 그룹 계산
const currentGroup = computed( () => Math.ceil(state.currentPage / pageGroupSize) );
//현재 그룹의 시작 페이지 번호
const startPage = computed ( () => ((currentGroup.value - 1) * pageGroupSize +1) );
const endPage = computed ( () => Math.min(currentGroup.value * pageGroupSize, state.maxPage) );
const displayedPages = computed( () => {
    const pages = [];
    for(let i=startPage.value; i<=endPage.value; i++) {
        pages.push(i);
    }
    return pages;
} );

const goToNextPage = () => {
    const nextPage = endPage.value + 1;
    if(nextPage > state.maxPage) { return; }
    goToPage(nextPage);
};

const goToPrevPage = () => {
    const prevPage = startPage.value - 1;
    if(prevPage < 1) { return; }
    goToPage(prevPage);
};

</script>

<template>
<h3>게시판 리스트</h3>
<div><input type="search" v-model="state.searchText" @keyup.enter="doSearch">
    <button @click="doSearch">검색</button>
</div>
<br>
<div v-if="state.list.length === 0">게시글이 없습니다.</div>
<div v-else>
    <table>
        <thead>
            <tr>
                <td>no</td>
                <td>title</td>
                <td>writer</td>
                <td>created at</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in state.list" :key="item.id" @click="moveToDetail(item.id)">
                <td>{{ item.id }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.nm }}</td>
                <td>{{ item.createdAt }}</td>
            </tr>
        </tbody>
    </table>
    <div>{{ startPage }} {{ currentGroup }} {{ endPage }}</div>
    <div class="paging">
        <button v-if="startPage > 1" @click="goToPage(1)">&lt;&lt;</button>
        <button v-if="startPage > 1" @click="goToPrevPage">&lt;</button>
        <span class="page"v-for="item in displayedPages"
            :key="item" :class="{selected: item == state.currentPage}" @click="goToPage(item)">
            {{ item }}
        </span>
        <button v-if="endPage < state.maxPage" @click="goToNextPage">&gt;</button>
        <button v-if="endPage < state.maxPage" @click="goToPage(state.maxPage)">&gt;&gt;</button>
    </div>
</div>
</template>

<style scoped>
table { border-collapse: collapse;}
table td, table th {  border: 1px solid gray; padding: 10px;}
table tbody tr:hover { background-color: aliceblue; cursor: pointer;}
.page { cursor: pointer;}
.page:not(:first-child) { margin-left: 8px; }
.selected { color: red; font-weight: bold;}
.paging { width: 100%; text-align: center; margin-top: 20px;}
</style>