<template>
	<div class="scroll-wrapper" :style="{ 'margin-bottom': props.rem + 'rem' }">
		<h1 class="title">{{ props.title }}</h1>
		<div class="scroll-container" v-if="currentLanguage == 'en'">
			<div class="scroll-padding"></div>
			<div v-for="item in data" :key="item" @click="$router.push('/list/dbase/Trending ' + item.title)">
				<div class="category-card scroll-item" :style="{ 'background-image': 'url(' + item.image + ')' }">
					<h3 class="category-name">{{ item.title }}</h3>
				</div>
			</div>
		</div>
		<div class="scroll-container" v-if="currentLanguage == 'ar'">
			<div class="scroll-padding"></div>
			<div v-for="item in dataAr" :key="item" @click="$router.push('/list/dbase/Trending ' + item.title)">
				<div class="category-card scroll-item" :style="{ 'background-image': 'url(' + item.image + ')' }">
					<h3 class="category-name">{{ item.title }}</h3>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useMainStore } from "../../store/useMainStore.js";
import { storeToRefs } from "pinia";

const main = useMainStore();
const { currentLanguage } = storeToRefs(main);

const props = defineProps({
	rem: { type: Number, default: 2 },
	title: { type: String, default: "Popular Categories" },
});

const data = ref([
	{ title: "Smartphones", image: "https://i.imgur.com/Kv4PuQ9.png" },
	{ title: "Tablets", image: "https://i.imgur.com/U3UVSJJ.png" },
	{ title: "Cases", image: "https://i.imgur.com/lqRWKWr.png" },
	{ title: "Smartwatches", image: "https://i.imgur.com/Paoc3IC.png" },
	{ title: "Headphones", image: "https://i.imgur.com/xIO4U8C.png" },
	{ title: "Smartbands", image: "https://i.imgur.com/enCMTwG.png" },
]);

const dataAr = ref([
	{ title: "الهواتف", image: "https://i.imgur.com/Kv4PuQ9.png" },
	{ title: "الأجهزة اللوحية", image: "https://i.imgur.com/U3UVSJJ.png" },
	{ title: "غطاء الهاتف", image: "https://i.imgur.com/lqRWKWr.png" },
	{ title: "الساعات الذكية", image: "https://i.imgur.com/Paoc3IC.png" },
	{ title: "سماعات الرأس", image: "https://i.imgur.com/xIO4U8C.png" },
	{ title: "العصابات الذكية", image: "https://i.imgur.com/enCMTwG.png" },
]);
</script>

<style scoped>
.scroll-wrapper {
	background-color: #ffffff;
	width: 100%;
	height: 10rem;
}

.title {
	font-size: 1rem;
	font-family: Poppins;
	font-weight: 600;
	line-height: 1.5rem;
	color: #2b2b2f;
	margin-left: 0.8rem;
	margin-right: 0.8rem;
	position: relative;
	top: 0.88rem;
	margin-bottom: 0rem;
}

.scroll-container {
	scroll-padding: 3rem;
	display: flex;
	scroll-snap-points-x: repeat(300px);
	scroll-snap-type: x mandatory;
	overflow-y: scroll;
	-ms-overflow-style: none;
	scrollbar-width: none;
	scroll-behavior: smooth;
	margin-top: 1.5rem;
}

/* To hide scrollbar in Chromium */
.scroll-container::-webkit-scrollbar {
	display: none;
}

.scroll-padding {
	padding: 0.4rem;
	scroll-snap-align: start;
}

.scroll-item {
	margin-right: 0.6rem;
	scroll-snap-align: start;
	scroll-snap-stop: always;
}

.category-card {
	height: 5.625rem;
	min-width: 13.125rem;
	max-width: 13.125rem;
	width: 13.125rem;
	border-radius: 0.813rem;
	background-size: cover;
	box-shadow: inset 0px 0px 4px 100px rgba(0, 0, 0, 0.4);
}

.category-name {
	text-align: left;
	position: relative;
	top: 52%;
	margin-left: 0.8rem;
	font-size: 0.75rem;
	font-family: Poppins;
	font-weight: 500;
	line-height: 1.125rem;
	color: #ffffff;
}
</style>
