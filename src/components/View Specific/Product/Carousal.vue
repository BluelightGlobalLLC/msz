<template>
	<div class="container">
		<Splide :options="{
			rewind: true,
			gap: '0rem',
			autoplay: true,
			lazyLoad: 'sequential',
			pauseOnHover: false,
			arrows: false,
			type: 'loop',
			autoHeight: true,
		}" class="scroll-container">
			<SplideSlide v-for="image in props.images" :key="image" class="banner-wrapper">
				<div class="bg-blur" :style="{ 'background-image': `url(${image})` }"></div>

				<img :src="image" class="banner" />
			</SplideSlide>
		</Splide>
	</div>
</template>

<script setup>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/splide.min.css";

const props = defineProps({
	images: { type: Array },
});
</script>

<style scoped>
.banner-wrapper {
	position: relative;
	display: flex;
	justify-content: center;
}

.container {
	height: 75vw;
	width: 100vw;
	background-color: #f3f3f3;
}

.bg-blur {
	height: 75vw;
	width: 100vw;
	filter: blur(8px);
	transform: scale(1.1);
	z-index: -1;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-size: fill;
	background-color: #ececec;
}

.banner {
	height: 75vw;
	width: 100vw;
	object-fit: scale-down;
	background-color: transparent;
}
</style>
