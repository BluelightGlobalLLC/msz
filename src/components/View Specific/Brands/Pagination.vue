<template>
	<div class="pagination" dir="ltr">
		<div style="display: flex">
			<div v-for="category in categories" :key="category" class="category-name"
				:class="{ categoryClicked: activeCategory == category }" @click="changeCategory($event, category)">
				{{ category }}
			</div>
		</div>
		<div class="pagination-line" :style="{ left: paginationLeftPX }"></div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMainStore } from "../../../store/useMainStore"
import { storeToRefs } from "pinia";

const main = useMainStore()
const { fetchCategories, fetchBrands } = main
const { categories } = storeToRefs(main);

const activeCategory = ref("All");
const paginationLeftPX = ref("0.5rem");

onMounted(fetchCategories)
onMounted(fetchBrands('All'))

function changeCategory(event, categoryName) {
	activeCategory.value = categoryName;
	if (categoryName == "All") {
		paginationLeftPX.value = "0.5rem";
	} else {
		paginationLeftPX.value =
			event.target.offsetLeft +
			(event.target.getBoundingClientRect().right - event.target.getBoundingClientRect().left) / 3 +
			"px";
	}
	fetchBrands(categoryName)
}
</script>

<style scoped>
.pagination {
	height: 3.5rem;
	width: 100%;
	background-color: #ffffff;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	font-family: Poppins;
	font-weight: 500;
	font-size: 0.9rem;
	text-align: center;
	display: flex;
	color: #979797;
	overflow-x: scroll;
	-ms-overflow-style: none;
	scrollbar-width: none;
	top: 3.063rem;
	position: fixed;
}

.pagination::-webkit-scrollbar {
	display: none;
}

.category-name {
	display: flex;
	align-items: center;
	padding: 0 1rem 0;
	margin-top: 1.2rem;
}

.categoryClicked {
	color: #000000;
}

.pagination-line {
	min-height: 0.5rem;
	min-width: 2rem;
	max-height: 0.5rem;
	max-width: 2rem;
	border-top-left-radius: 0.5rem;
	border-top-right-radius: 0.5rem;
	background-color: #000;
	z-index: 100;
	transition: left 0.5s;
	position: relative;
}
</style>
