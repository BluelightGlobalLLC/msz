<template>
	<div class="wrapper" :style="{ 'margin-bottom': props.rem + 'rem', height: props.height + 'vw' }">
		<div class="banner" :style="`background-image: url(${data})`"></div>
	</div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

import { useMainStore } from "../../store/useMainStore.js";
import { storeToRefs } from "pinia";

const main = useMainStore();
const { currentLanguage } = storeToRefs(main);

const props = defineProps({
	rem: { type: Number, default: 2 },
	height: { type: Number, default: 34 },
	num: { type: String },
});

const data = ref(null);
async function getData() {
	try {
		const response = await axios.get(`https://api-fnt8.onrender.com/v1/${currentLanguage.value}/banners/static/${props.num}`);
		data.value = response.data;
	} catch (error) {
		console.error(error);
	}
}
getData();
</script>

<style scoped>
.wrapper {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: -100;
}

.banner {
	width: 100%;
	background-size: cover;
	background-color: #ececec;
	height: inherit;
}
</style>
