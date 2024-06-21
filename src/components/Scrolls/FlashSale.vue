<template>
	<div v-if="data" class="linear-bg" :style="{ 'margin-bottom': props.rem + 'rem' }">
		<img src="../../assets/FlashSale/fallingstar.png" class="falling-stars" v-if="currentLanguage == 'en'" />
		<img src="../../assets/FlashSale/fallingstar.png" class="falling-stars-ar" v-if="currentLanguage == 'ar'" />
		<div class="header-wrapper">
			<span>
				<h1 class="title" v-if="currentLanguage == 'en'">Limited Time Grabs</h1>
				<h1 class="title" v-if="currentLanguage == 'ar'">عربة التسوق</h1>
				<h1 class="subtitle" v-if="currentLanguage == 'en'">Ends in {{ hoursC }}h:{{ minutesC }}m:{{ secondsC
					}}s
				</h1>
				<h1 class="subtitle" v-if="currentLanguage == 'ar'">تنتهي صلاحيته خلال {{ hoursC }}h:{{ minutesC }}m:{{
		secondsC }}s</h1>
			</span>
		</div>
		<div class="scroll-container">
			<div class="scroll-padding"></div>

			<div v-for="item in data.products" :key="item" class="discount-wrapper"
				@click="$router.push('/product/' + item.productId)">
				<img :src="item.productThumbnail" />
				<div class="discount-tag">{{ item.discount }}</div>
			</div>

			<div class="scroll-padding"></div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useMainStore } from "../../store/useMainStore.js";
import { storeToRefs } from "pinia";

const main = useMainStore();
const { currentLanguage } = storeToRefs(main);

const props = defineProps({
	rem: { type: Number, default: 2 },
});

var endDate = null;

const seconds = 1000;
const minutes = seconds * 60;
const hours = minutes * 60;
const hoursC = ref("");
const minutesC = ref("");
const secondsC = ref("");

const countdown = function () {
	let now = new Date().getTime();
	const difference = endDate - now;
	hoursC.value =
		Math.floor(difference / hours).toString().length >= 2
			? Math.floor(difference / hours).toString()
			: "0" + Math.floor(difference / hours).toString();
	minutesC.value =
		Math.floor((difference % hours) / minutes).toString().length >= 2
			? Math.floor((difference % hours) / minutes).toString()
			: "0" + Math.floor((difference % hours) / minutes).toString();
	secondsC.value =
		Math.floor((difference % minutes) / seconds).toString().length >= 2
			? Math.floor((difference % minutes) / seconds).toString()
			: "0" + Math.floor((difference % minutes) / seconds).toString();
};

// get data for flashsale
const data = ref(null);
async function getFlashsaleData() {
	try {
		const response = await axios.get(`https://api-fnt8.onrender.com/v1/${currentLanguage.value}/scrolls/flashsale`);
		data.value = response.data;
		endDate = new Date(data.value.endDate).getTime();
		setInterval(countdown, seconds);
	} catch (error) {
		console.error(error);
	}
}
getFlashsaleData();
</script>

<style scoped>
.scroll-container {
	scroll-padding: 3rem;
	display: flex;
	overflow-y: scroll;
	-ms-overflow-style: none;
	scrollbar-width: none;
	scroll-behavior: smooth;
}

/* To hide scrollbar in Chromium based browsers*/
.scroll-container::-webkit-scrollbar {
	display: none;
}

.scroll-padding {
	padding: 0.4rem;
	scroll-snap-align: start;
}

.title {
	font-size: 3.5vw;
	font-family: Poppins;
	font-weight: 600;
	line-height: 1.5rem;
	color: #4e0000;
	margin-left: 0.8rem;
	margin-right: 0.8rem;
	margin-bottom: 0.1rem;
}

.subtitle {
	font-size: 0.8rem;
	font-family: Poppins;
	font-weight: 500;
	color: #3b0000;
	margin-left: 0.8rem;
	margin-right: 0.8rem;
	margin-bottom: 1rem;
}

.discount-wrapper {
	height: 9.4rem;
	min-width: 8rem;
	background-color: #ffffff;
	border-radius: 0.4rem;
	margin-right: 0.6rem;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	padding-bottom: 0.3rem;
	padding-top: 0.4rem;
	z-index: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.discount-wrapper img {
	height: 7rem;
	max-height: 7rem;
	min-height: 7rem;
	width: auto;
	margin-bottom: 0.3rem;
}

.discount-tag {
	font-size: 0.9rem;
	font-family: Poppins;
	font-weight: 500;
	color: rgb(255, 255, 255);
	width: 90%;
	min-height: 1.4rem;
	background-color: rgb(238, 152, 24);
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.2rem;
}

.linear-bg {
	width: 100%;
	height: max-content;
	padding: 1rem 0rem 1rem 0rem;
	background: linear-gradient(251.34deg, rgba(255, 204, 153, 0.92) -34.83%, rgba(255, 204, 153, 0.43) 106.01%);
}

.header-wrapper {
	display: flex;
	justify-content: space-between;
	z-index: 20;
}

.falling-stars {
	max-height: 14.3rem;
	max-width: 48vw;
	position: absolute;
	margin-top: -1rem;
	left: 45vw;
	z-index: -10;
}

.falling-stars-ar {
	max-height: 14.3rem;
	max-width: 48vw;
	position: absolute;
	margin-top: -1rem;
	right: 45vw;
	z-index: -10;
}
</style>
