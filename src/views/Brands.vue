<template>
	<div class="container">
		<search-bar :navigate-back="false" @click="$router.push('/search')" />
		<brands-pagination />
		<category-banner />
		<brand-list />
	</div>
</template>

<script setup>
import SearchBar from "../components/Navigation/Searchbar.vue";
import BrandsPagination from "../components/View Specific/Brands/Pagination.vue";
import CategoryBanner from "../components/Banners/Brands.vue";
import BrandList from "../components/View Specific/Brands/Catalogue.vue";
</script>

<style scoped>
.container {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
}
</style>
