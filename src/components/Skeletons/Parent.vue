<template>
	<div class="skeleton-base" :style="{
		height: props.height,
		width: props.width,
		marginBottom: props.bmargin,
		marginTop: props.tmargin,
		marginLeft: props.lmargin,
	}"></div>
</template>

<script setup>
const props = defineProps({
	height: { type: String, default: "0rem" },
	width: { type: String, default: "0rem" },
	tmargin: { type: String, default: "0rem" },
	bmargin: { type: String, default: "0rem" },
	lmargin: { type: String, default: "0rem" },
});
</script>

<style scoped>
.skeleton-base {
	background-color: #fafafa;
	color: transparent;
	background-image: linear-gradient(to right, transparent, #b9b9b965, transparent);
	background-size: 200% 100%;
	animation: loading 1.6s linear infinite;
	border-radius: 0.2rem;
}

@keyframes loading {
	100% {
		background-position: -200% 0%;
	}
}
</style>
