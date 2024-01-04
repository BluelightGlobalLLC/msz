<template>
	<div :style="{ 'margin-bottom': props.rem + 'rem' }">
		<h1 class="title">Recommended for you</h1>
		<div class="wrapper">
			<div class="column">
				<div v-for="item in dataOne" :key="item" class="product">
					<filler :data="item" />
				</div>
			</div>

			<div class="column">
				<div v-for="item in dataTwo" :key="item" class="product">
					<filler :data="item" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import Filler from "../Cards/Filler.vue";
import axios from "axios";
import { ref } from "vue";
import { useMainStore } from "../../store/useMainStore.js";
import { storeToRefs } from "pinia";

const main = useMainStore();
const { toggleViewLoaded } = main;
const { hasViewLoaded, currentLanguage } = storeToRefs(main);

const props = defineProps({
	rem: { type: Number, default: 2 },
});

const data = ref(null);
let dataOne = ref(null);
let dataTwo = ref(null);

async function getData() {
	try {
		const response = await axios.get(`https://api-fnt8.onrender.com/v1/${currentLanguage.value}/scrolls/filler`);
		data.value = response.data;
		const middleIndex = Math.ceil(data.value.length / 2); // split list into two to pass into two columns
		dataOne.value = data.value.splice(0, middleIndex);
		dataTwo.value = data.value.splice(-middleIndex);
		if (!hasViewLoaded.value.cart) {
			toggleViewLoaded("cart");
		}
	} catch (error) {
		console.error(error);
	}
}
getData();
</script>

<style scoped>
.title {
	font-size: 1rem;
	font-family: Poppins;
	font-weight: 600;
	color: #2b2b2f;
	margin-left: 0.8rem;
	margin-right: 0.8rem;
	z-index: 10;
	background-color: #fff;
}

.wrapper {
	display: flex;
	padding-left: 0.8rem;
	padding-right: 0.8rem;
	padding-top: 0.5rem;
	gap: 0.5rem;
	background: linear-gradient(180deg, #ffffff 0%, #f8f8f8 1.56%);
}

.column {
	display: flex;
	flex-direction: column;
}

.product {
	height: max-content;
	width: 46.2vw;
	border-radius: 0.3rem;
	margin-bottom: 0.5rem;
	display: flex;
	flex-direction: column;
	background-color: #fff;
	padding: 0 0.8rem 0.6rem;
	font-family: Poppins;
}
</style>
