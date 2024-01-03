<template>
	<div v-if="data" :style="{ 'margin-bottom': props.rem + 'rem' }">
		<div class="scroll-head">
			<h1 class="scroll-title">{{ data.title }}</h1>
			<div class="scroll-dots">
				<div class="dot" :class="{ coloredDot: coloredDot == 0 }"></div>
				<div class="dot" :class="{ coloredDot: coloredDot == 1 }"></div>
				<div class="dot" :class="{ coloredDot: coloredDot == 2 }"></div>
			</div>
		</div>
		<div class="scroll-container" @scroll.passive="dotColor($event)">
			<div class="scroll-padding"></div>
			<div v-for="cardData in data.products" :key="cardData.productId">
				<product-card class="scroll-item" :data="cardData" />
			</div>
			<div class="scroll-padding"></div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import ProductCard from "../Cards/NormalProduct.vue";
import axios from "axios";
import { useMainStore } from "../../store/useMainStore.js";
import { storeToRefs } from "pinia";

const main = useMainStore();
const { hasViewLoaded, currentLanguage } = storeToRefs(main);
const { toggleViewLoaded } = main;


const props = defineProps({
	rem: { type: Number, default: 2 },
	num: { type: String },
});

// change which of the three dots is colored
const coloredDot = ref(0);
function dotColor(event) {
	const leftCord = event.target.scrollLeft;
	const totalScrollSize = event.target.scrollWidth - event.target.clientWidth;
	if (leftCord < totalScrollSize / 3 && coloredDot.value != 0) {
		coloredDot.value = 0;
	} else if (leftCord > totalScrollSize / 3 && leftCord < (totalScrollSize / 3) * 2 && coloredDot.value != 1) {
		coloredDot.value = 1;
	} else if (leftCord > (totalScrollSize / 3) * 2 && coloredDot.value != 2) {
		coloredDot.value = 2;
	}
}

// get data
const data = ref(null);
async function getData() {
	try {
		const response = await axios.get(`https://api.jeswinsunsi.repl.co/v1/${currentLanguage.value}/scrolls/product/${props.num}`);
		data.value = response.data;
		if (!hasViewLoaded.value.home) {
			toggleViewLoaded("home");
		}
	} catch (error) {
		console.error(error);
	}
}
getData();
</script>

<style scoped>
.scroll-head {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.scroll-title {
	font-size: 1rem;
	font-family: Poppins;
	font-weight: 600;
	line-height: 1.5rem;
	color: #2b2b2f;
	margin-left: 0.8rem;
	margin-bottom: 0.8rem;
}

.scroll-dots {
	display: flex;
	justify-content: space-between;
	width: 2.875rem;
	margin-right: 1.75rem;
	margin-top: -0.8rem;
}

.dot {
	height: 0.375rem;
	width: 0.375rem;
	background-color: #b9b9bb;
	border-radius: 100%;
}

.coloredDot {
	background-color: #2b2b2f;
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
</style>
