<template>
	<div class="categories" :style="{ 'margin-bottom': props.rem + 'rem' }">
		<div class="text">
			<h1 class="title">Trending Categories</h1>
		</div>

		<Splide :extensions="{ AutoScroll }" :options="{
			rewind: true,
			gap: '2.5rem',
			type: 'loop',
			drag: 'free',
			focus: 'left',
			perPage: '4',
			lazyLoad: 'sequential',
			pauseOnHover: false,
			pauseOnFocus: false,
			arrows: false,
			pagination: false,
			autoScroll: { speed: 0.7 },
		}" class="scroll-container">
			<SplideSlide v-for="category in categoriesOne" :key="category">
				<div class="category">
					<img :src="category" />
				</div>
			</SplideSlide>
		</Splide>

		<Splide :extensions="{ AutoScroll }" :options="{
			rewind: true,
			gap: '2.5rem',
			type: 'loop',
			drag: 'free',
			focus: 'center',
			perPage: '4',
			lazyLoad: 'sequential',
			pauseOnHover: false,
			pauseOnFocus: false,
			arrows: false,
			pagination: false,
			autoScroll: { speed: 0.7 },
		}" class="scroll-container">
			<SplideSlide v-for="category in categoriesTwo" :key="category">
				<div class="category">
					<img :src="category" />
				</div>
			</SplideSlide>
		</Splide>
	</div>
</template>

<script setup>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";
import { ref } from "vue";

const props = defineProps({
	rem: { type: Number, default: 2 },
});

const categoriesOne = ref([
	"https://i.imgur.com/vCeoiHe.png",
	"https://i.imgur.com/RZtvLjp.png",
	"https://i.imgur.com/tcZDNgx.png",
	"https://i.imgur.com/i8avJLN.png",
	"https://i.imgur.com/dd5dOu3.png",
	"https://i.imgur.com/8dtAUOY.png",
	"https://i.imgur.com/l0VDl9Y.png",
	"https://i.imgur.com/8YVuO97.png",
]);
const categoriesTwo = ref([
	"https://i.imgur.com/PcW9oRH.png",
	"https://i.imgur.com/FdEjcAv.png",
	"https://i.imgur.com/HIG1LOz.png",
	"https://i.imgur.com/7M083b1.png",
	"https://i.imgur.com/HfLw7OR.png",
	"https://i.imgur.com/IRhJGZy.png",
	"https://i.imgur.com/20qdKOJ.png",
	"https://i.imgur.com/j6o0uvC.png",
]);
</script>

<style scoped>
.scroll-container {
	margin-left: 0vw;
	margin-bottom: 0.5rem;
}

.categories {
	width: 100%;
	padding: 0 0;
}

.cat-row {
	display: flex;
}

.category {
	height: 6rem;
	width: 7.55rem;
	background-color: rgb(243, 242, 242);
	border-radius: 0.3rem;
	margin-left: 1rem;
}

.category img {
	height: 6rem;
	width: 7.55rem;
}

.text {
	font-family: Poppins;
	line-height: 1.5rem;
	margin-bottom: 0.8rem;
	margin-left: 0.8rem;
}

.title {
	font-size: 1rem;
	font-weight: 600;
	color: #2b2b2f;
}
</style>
