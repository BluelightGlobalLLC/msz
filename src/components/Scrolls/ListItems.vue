<template>
	<div class="flex-wrapper">
		<empty-feature v-if="!loading && !data.length" :feature="feature" class="empty-feature" />
		<img src="../../assets/Misc/loader.svg" alt="loading.." class="loader" v-if="loading && !data.length">
		<div v-if="data.length" class="list-wrapper" :class="{ padding: data }">
			<div v-for="item in data" :key="item" class="wrapper" @click="$router.push('/product/' + item.productId)">
				<div class="img-container">
					<img class="product-img" :src="item.productThumbnail" alt="device image" />
				</div>
				<div class="text-content">
					<div v-if="item.tags" class="tags">
						<div v-for="tag in item.tags" :key="tag" class="tag" :style="{ 'background-color': tag[1] }">
							{{ tag[0] }}
						</div>
					</div>
					<h1 class="product-name">{{ item.productName }}</h1>
					<div v-if="item.rating" class="rating-wrapper">
						<h3 class="rating-number">{{ item.rating.toFixed(1) }}</h3>
						<img v-for="star in Math.round(item.rating)" :key="star" class="rating-star"
							src="../../assets/viewList/star.png" alt="" />
					</div>
					<div class="spacing"></div>
					<h4 v-if="item.oldPrice" class="old-price">OMR {{ item.oldPrice }}</h4>
					<h2 class="new-price">{{ item.currentPrice == "Out Of Stock" ? item.currentPrice : `OMR
						${item.currentPrice}` }}</h2>
				</div>
			</div>
		</div>
		<filler-scroll v-if="!data.length && !loading" />
	</div>
</template>

<script setup>
import EmptyFeature from "../Miscellaneous/EmptyFeature.vue";
import FillerScroll from "./Filler.vue";

import axios from "axios";
import { ref, onActivated } from "vue";
import { useMainStore } from "../../store/useMainStore";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const route = useRoute();
const main = useMainStore();
const { historyItems, likedItems, currentLanguage } = storeToRefs(main);

const data = ref([]);
const feature = ref([]) // feature for EmptyFeature prop
const loading = ref(true)

// fn figures whether data should be fetched from API or from Store
async function getListData() {
	setTimeout(() => { loading.value = false; feature.value = ["Oops! We couldn't find what you were looking for!", "Try searching for another product"] }, 8000)
	if (route.params.fetchaddress === "history") {
		loading.value = false
		data.value = historyItems.value;
		feature.value = ["Oops! Your history is empty!", "Looks like you haven't browsed anything yet"]
	} else if (route.params.fetchaddress === "wishlist") {
		loading.value = false
		data.value = likedItems.value;
		feature.value = ["Oops! Your wishlist is empty!", "Looks like you haven't added liked anything yet"]
	} else if (route.params.fetchaddress === "dbase") {
		try {
			loading.value = true
			let linkParam = ""
			switch (route.params.title) {
				case "Top Offers":
					linkParam = `https://api.jeswinsunsi.repl.co/v1/${currentLanguage.value}/scrolls/list/dummy`
					break;
				case "Trending Smartphones":
					linkParam = `https://api.jeswinsunsi.repl.co/v1/${currentLanguage.value}/scrolls/list/dummy`
					break;
				case "Trending Tablets":
					linkParam = `https://api.jeswinsunsi.repl.co/v1/${currentLanguage.value}/scrolls/list/dummy`
					break;
				case "Trending Cases":
					linkParam = `https://api.jeswinsunsi.repl.co/v1/${currentLanguage.value}/scrolls/list/dummy`
					break;
				case "Trending Smartwatches":
					linkParam = `https://api.jeswinsunsi.repl.co/v1/${currentLanguage.value}/scrolls/list/dummy`
					break;
				case "Trending Headphones":
					linkParam = `https://api.jeswinsunsi.repl.co/v1/${currentLanguage.value}/scrolls/list/dummy`
					break;
				case "Trending Smartbands":
					linkParam = `https://api.jeswinsunsi.repl.co/v1/${currentLanguage.value}/scrolls/list/dummy`
					break;
			}
			const response = await axios.get(linkParam);
			data.value = response.data;
			if (!data.value.length) {
				loading.value = false
			}
			feature.value = ["Oops! We couldn't find what you were looking for!", "Try searching for another product"]
		} catch (error) {
			console.error(error);
		}
	}
	else if (route.params.fetchaddress === "stock") {
		loading.value = true
		const response = await axios.get(`https://api.jeswinsunsi.repl.co/v1/${currentLanguage.value}/navigation/search/${route.params.title}`);
		data.value = response.data;
		if (!data.value.length) {
			loading.value = false
		}
		feature.value = ["Oops! We couldn't find what you were looking for!", "Try searching for another product"]
	}
}

onActivated(() => getListData());
</script>

<style scoped>
.flex-wrapper {
	display: flex;
	justify-content: center;
	flex-direction: column;
}

.loader {
	height: 4rem;
	width: auto;
	margin-top: 30%;
}


.list-wrapper {
	display: flex;
	flex-direction: column;
	width: 100%;
	min-height: calc(100vh - 3.8rem);
	background-color: #f4f4f4;
}

.padding {
	padding: 0.8rem;
	padding-bottom: 4rem;
}

.wrapper {
	width: 100%;
	height: 8.4rem;
	padding-left: 0.4rem;
	padding-top: 0.1rem;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	font-family: Poppins;
	border-radius: 0.4rem;
	margin-bottom: 0.5rem;
}

.img-container {
	height: 7rem;
	width: 5.5rem;
	background: #f0f0f0;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 0.3rem;
	margin-right: 0.7rem;
	margin-left: 0.3rem;
	border-radius: 0.4rem;
}

.product-img {
	height: auto;
	width: 3rem;
	max-height: 8;
	max-width: 3rem;
	min-height: auto;
	min-width: 3rem;
}

.text-content {
	height: 100%;
	flex-grow: 1;
	width: 70%;
	display: flex;
	flex-direction: column;
	padding-top: 0.9rem;
	padding-right: 2rem;
}

.product-name {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: #343434;
	font-weight: 500;
	line-height: 1.5rem;
	font-size: 0.9rem;
}

.rating-wrapper {
	display: flex;
	align-items: center;
	font-size: 0.7rem;
	font-weight: 500;
	color: #e5b613;
}

.rating-number {
	margin-top: 0.15rem;
	margin-right: 0.05rem;
}

.rating-star {
	max-height: 0.7rem;
	max-width: 0.7rem;
}

.spacing {
	margin-bottom: 1rem;
}

.old-price {
	font-size: 0.7rem;
	color: #999999;
	font-weight: 500;
	text-decoration: line-through;
	margin-bottom: 0.05rem;
}

.new-price {
	font-weight: 600;
	color: #fb3b5b;
	font-size: 0.95rem;
}

.tags {
	display: flex;
	margin-bottom: 0.1rem;
}

.tag {
	height: max-content;
	width: max-content;
	font-weight: 500;
	font-size: 0.7rem;
	color: #ffffff;
	padding: 0.25rem 0.4rem;
	border-radius: 0.2rem;
	margin-right: 0.25rem;
}
</style>
