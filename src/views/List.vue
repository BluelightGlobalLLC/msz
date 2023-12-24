<template>
	<div class="container">
		<search-bar :navigate-back="true" :title="searchbarTitle" @click="$router.push('/search')" />
		<list-items />
	</div>
</template>

<script setup>
import SearchBar from "../components/Navigation/Searchbar.vue";
import ListItems from "../components/Scrolls/ListItems.vue";

import { useRoute } from "vue-router";
import { onActivated, ref } from "vue";
const route = useRoute();

const searchbarTitle = ref("");
const getListData = () => {
	searchbarTitle.value = route.params.title;
};
onActivated(getListData);
</script>

<style scoped>
.container {
	height: 100%;
	min-height: 100%;
	width: 100%;
}
</style>
