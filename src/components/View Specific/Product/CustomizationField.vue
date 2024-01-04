<template>
	<div class="wrapper" :style="{ 'margin-bottom': props.rem + 'rem' }">
		<h1 class="title">Device Color</h1>
		<div class="options">
			<div v-for="color in props.data" :key="color" class="option" :class="{ selected: selectedColor == color }"
				@click="selectColor(color)">
				{{ color }}
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["changeColor"])

let selectedColor = ref(props.data[0]);

const props = defineProps({
	rem: { type: Number, default: 2 },
	data: { type: Array },
});

function selectColor(color) {
	selectedColor.value = color;
	emit("changeColor", color)
}
</script>

<style scoped>
.wrapper {
	display: flex;
	flex-direction: column;
	font-family: Poppins;
	padding-left: 0.8rem;
	padding-right: 0.8rem;
}

.title {
	font-weight: 600;
	color: #454545;
	font-size: 1rem;
	margin-bottom: 0.8rem;
}

.options {
	font-size: 0.85rem;
	display: flex;
	flex-flow: row wrap;
}

.option {
	padding: 0.8rem;
	background-color: #f3f3f3;
	border-radius: 0.6rem;
	width: max-content;
	margin-right: 0.5rem;
	margin-bottom: 0.5rem;
}

.selected {
	border: 1px solid #f97a46;
}
</style>
