<template>
	<!-- prettier-ignore -->
	<div class="main-scroll-container" :style="{ 'margin-bottom': props.rem + 'rem' }">
		<Splide :options="{
			rewind: true,
			gap: '0rem',
			autoplay: true,
			lazyLoad: 'sequential',
			pauseOnHover: false,
			arrows: false,
			type: 'loop',
			pagination: false,
		}" class="scroll-container">

			<SplideSlide v-for="image in data" :key="image">
				<a :href="image[1]" target="_blank">
					<div class="banner-img-wrapper">
						<img :src="image[0]" class="banner" />
					</div>
				</a>
			</SplideSlide>
		</Splide>
	</div>
</template>

<script setup>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { ref } from "vue";
import axios from "axios";

const props = defineProps({
	rem: { type: Number, default: 2 },
});

const data = ref(null);
data.value = [["https://i.imgur.com/rtpuNsm.png", ""]]

async function getData() {
	try {
		const response = await axios.get(`https://api.jeswinsunsi.repl.co/v1/banners/autoplay`);
		data.value = response.data;
	} catch (error) {
		console.error(error);
	}
}
getData();
</script>

<style scoped>
.main-scroll-container {
	/* this extra div makes sure that even if the images take time to load, the app will start at the top */
	min-height: 40.4vw;
	min-width: 95.5vw;
}

.scroll-container {
	margin-left: 2.2vw;
}

.banner {
	height: 40.4vw;
	width: 95.5vw;
	background-size: cover;
	border-radius: 0.5rem;
	background-color: #fff;
	margin-top: 0rem;
	background-color: #ececec;
}

.banner-img-wrapper {
	height: 40.4vw;
	width: 95.5vw;
}
</style>
