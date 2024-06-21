<template>
	<div v-auto-animate class="container" :style="{ 'margin-bottom': props.rem + 'rem' }">
		<h1 class="title">Order details</h1>
		<item v-for="item in cartItems" :item="item" :key="item" />
		<div class="line"></div>
	</div>
</template>

<script setup>
import Item from "./Item.vue";
import { useMainStore } from "../../../store/useMainStore";
import { storeToRefs } from "pinia";

const main = useMainStore();
const { cartItems } = storeToRefs(main);

const props = defineProps({
	rem: { type: Number, default: 2 },
});
</script>

<style scoped>
.container {
	padding-left: 0.8rem;
	padding-right: 0.8rem;
	padding-bottom: 1rem;
	background-color: #ffffff;
}

.title {
	font-family: Poppins;
	font-weight: 600;
	font-size: 1.125rem;
	line-height: 1.68rem;
	color: #2b2b2f;
	margin-bottom: 0rem;
	margin-top: 1.5rem;
}

.line {
	height: 0.2rem;
	width: calc(100% - 1rem);
	margin-left: 0.8rem;
	margin-right: 0.8rem;
	border-radius: 0.2rem;
	background-color: #f5f5f8;
	margin-left: 0rem;
	margin-bottom: 0.3rem;
}
</style>
