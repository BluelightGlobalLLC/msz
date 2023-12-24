<template>
	<div class="spec-container" :style="{ 'margin-bottom': props.rem + 'rem' }">
		<div class="scroll-container">
			<div class="initial-scroll-padding"></div>
			<div v-for="specification in props.specifications" :key="specification">
				<div class="spec-box scroll-item">
					<h1 class="spec-value">{{ specification[1] }}</h1>
					<h1 class="spec-heading">{{ specification[0] }}</h1>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	rem: { type: Number, default: 2 },
	specifications: { type: Array },
});
</script>

<style scoped>
.initial-scroll-padding {
	padding: 0.4rem;
	scroll-snap-align: start;
}

.spec-container {
	width: 100%;
	background-color: #ffffff;
	margin-bottom: 1rem;
}

.subheading {
	font-size: 1rem;
	font-weight: 600;
	color: #2b2b2f;
	margin-top: 0.625rem;
	line-height: 1.688rem;
	margin-bottom: 0.75rem;
	margin-left: 0.8rem;
}

.spec-box {
	height: 6.875rem;
	width: max-content;
	padding-left: 0.625rem;
	padding-right: 2rem;
	background-color: red;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	background-color: #f7f7f7;
	border-radius: 0.2rem;
}

.spec-value {
	font-family: Poppins;
	font-weight: 600;
	font-size: 1.125rem;
	line-height: 1.688rem;
	color: #6159ff;
}

.spec-heading {
	font-family: Poppins;
	font-weight: 400;
	font-size: 0.75rem;
	line-height: 1.688rem;
	color: #464646;
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

.scroll-item {
	margin-right: 0.5rem;
	scroll-snap-align: start;
	scroll-snap-stop: always;
}
</style>
